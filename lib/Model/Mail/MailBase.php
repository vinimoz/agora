<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */


namespace OCA\Agora\Model\Mail;

use League\CommonMark\Environment\Environment;
use League\CommonMark\Extension\CommonMark\CommonMarkCoreExtension;
use League\CommonMark\Extension\Table\TableExtension;
use League\CommonMark\MarkdownConverter;
use OCA\Agora\AppConstants;
use OCA\Agora\Db\OptionMapper;
use OCA\Agora\Db\Inquiry;
use OCA\Agora\Db\UserMapper;
use OCA\Agora\Exceptions\InvalidEmailAddress;
use OCA\Agora\Helper\Container;
use OCA\Agora\Model\Settings\AppSettings;
use OCA\Agora\Model\UserBase;
use OCP\IL10N;
use OCP\L10N\IFactory;
use OCP\Mail\IEMailTemplate;
use OCP\Mail\IMailer;
use Psr\Log\LoggerInterface;

abstract class MailBase
{
    /**
     * @var string 
     */
    protected const TEMPLATE_CLASS = AppConstants::APP_ID . '.Mail';

    protected AppSettings $appSettings;
    protected IEmailTemplate $emailTemplate;
    protected IL10N $l10n;
    protected LoggerInterface $logger;
    protected IMailer $mailer;
    protected OptionMapper $optionMapper;
    protected UserBase $owner;
    protected Inquiry $inquiry;
    protected UserBase $recipient;
    protected IFactory $transFactory;
    protected UserMapper $userMapper;

    public function __construct(
        protected string $recipientId,
        protected int $inquiryId,
        protected string $url = '',
    ) {
        $this->setup();
    }

    /**
     * setUp
     */
    private function setUp(): void
    {
        $this->appSettings = Container::queryClass(AppSettings::class);
        $this->logger = Container::queryClass(LoggerInterface::class);
        $this->mailer = Container::queryClass(IMailer::class);
        $this->optionMapper = Container::queryClass(OptionMapper::class);
        $this->transFactory = Container::queryClass(IFactory::class);
        $this->userMapper = Container::queryClass(UserMapper::class);
        $this->inquiry = $this->getInquiry($this->inquiryId);
        $this->recipient = $this->getUser($this->recipientId);
        $this->url = $this->url === '' ? $this->inquiry->getSupportUrl() : '';
        $this->owner = $this->getUser($this->inquiry->getOwner());

        $this->owner = $this->getUser($this->inquiry->getOwner());

        if ($this->recipient->getIsNoUser()) {
            $this->url = $this->getShareURL();
        }

        $languageCode = $this->recipient->getLanguageCode() !== '' ? $this->recipient->getLanguageCode() : $this->transFactory->findGenericLanguage();

        $this->l10n = $this->transFactory->get(
            AppConstants::APP_ID,
            $languageCode,
            $this->recipient->getLocaleCode()
        );
    }

    public function send(): void
    {
        $this->validateEmailAddress();

        try {
            $message = $this->mailer->createMessage();
            $message->setTo([$this->recipient->getEmailAddress() => $this->recipient->getDisplayName()]);
            $message->useTemplate($this->getEmailTemplate());
            $this->mailer->send($message);
        } catch (\Exception $e) {
            $this->logger->error('Error sending Mail to {recipient}', ['recipient' => json_encode($this->recipient)]);
            $this->logger->alert($e->getMessage());
            throw $e;
        }
    }

    private function getEmailTemplate() : IEMailTemplate
    {
        $this->emailTemplate = $this->mailer->createEMailTemplate(
            self::TEMPLATE_CLASS, [
            'owner' => $this->owner->getDisplayName(),
            'title' => $this->inquiry->getTitle(),
            'link' => $this->url
            ]
        );

        $this->emailTemplate->setSubject($this->getSubject());

        // add heading
        $this->emailTemplate->addHeader();
        $this->emailTemplate->addHeading($this->getHeading(), false);

        $this->buildBody();

        // add footer
        $footerText = $this->getFooter();
        if ($this->appSettings->getUseLegalTermsInEmail()) {
            $footerText = $footerText . '<br>' . $this->getLegalLinks();
        }

        if ($this->appSettings->getDisclaimer()) {
            $footerText = $footerText . '<br>' . $this->getParsedMarkDown($this->appSettings->getDisclaimer());
        }

        $this->emailTemplate->addFooter($footerText);
        return $this->emailTemplate;
    }

    protected function getSubject(): string
    {
        return $this->l10n->t('Notification for inquiry "%s"', $this->inquiry->getTitle());
    }

    protected function getHeading(): string
    {
        return $this->getSubject();
    }

    protected function getButtonText(): string
    {
        return $this->l10n->t('Go to inquiry');
    }

    protected function addButtonToInquiry(): void
    {
        if ($this->getButtonText() && $this->url) {
            $this->emailTemplate->addBodyButton($this->getButtonText(), $this->url);
        }
    }

    protected function getFooter(): string
    {
        return $this->l10n->t('This email is sent to you, because you subscribed to notifications of this inquiry. To opt out, visit the inquiry and remove your subscription.');
    }

    protected function buildBody(): void
    {
        $this->emailTemplate->addBodyText('Sorry. This eMail has no text and this should not happen.');
    }

    protected function getLegalLinks(): string
    {
        $legal = '';

        if ($this->appSettings->getFinalImprintUrl()) {
            $legal = '<a href="' . $this->appSettings->getFinalImprintUrl() . '">' . $this->l10n->t('Legal Notice') . '</a>';
        }
        if ($this->appSettings->getFinalPrivacyUrl()) {
            if ($this->appSettings->getFinalImprintUrl()) {
                $legal = $legal . ' | ';
            }

            $legal = $legal . '<a href="' . $this->appSettings->getFinalPrivacyUrl() . '">' . $this->l10n->t('Privacy Policy') . '</a>';
        }
        return $legal;
    }

    protected function getUser(string $userId) : UserBase
    {
        return $this->userMapper->getParticipant($userId, $this->inquiry->getId());
    }

    protected function getRichDescription() : string
    {
        return $this->getParsedMarkDown($this->inquiry->getDescription());
    }

    protected function getParsedMarkDown(string $source) : string
    {
        $config = [
        'renderer' => [
        'soft_break' => '<br />',
        ],
        'html_input' => 'strip',
        'allow_unsafe_links' => false,
        ];

        $environment = new Environment($config);
        $environment->addExtension(new CommonMarkCoreExtension());
        $environment->addExtension(new TableExtension());
        $converter = new MarkdownConverter($environment);
        return $converter->convert($source)->getContent();
    }

    private function getShareURL() : string
    {
        return Container::findShare($this->inquiry->getId(), $this->recipient->getId())->getURL();
    }

    private function getInquiry(int $inquiryId) : Inquiry
    {
        return Container::getInquiry($inquiryId);
    }

    private function validateEmailAddress(): void
    {
        if (!$this->recipient->getEmailAddress()
            || !filter_var($this->recipient->getEmailAddress(), FILTER_VALIDATE_EMAIL)
        ) {
            throw new InvalidEmailAddress('Invalid email address (' . $this->recipient->getEmailAddress() . ')');
        }
    }
}
