<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */


namespace OCA\Agora\Model\Mail;

use DateTime;
use OCA\Agora\AppConstants;
use OCA\Agora\Db\Inquiry;
use OCA\Agora\Exceptions\NoDeadLineException;

class ReminderMail extends MailBase
{
    protected const TEMPLATE_CLASS = AppConstants::APP_ID . '.Reminder';
    public const REASON_EXPIRATION = 'expiry';
    public const REASON_OPTION = 'option';
    public const REASON_NONE = null;
    public const FIVE_DAYS = 432000;
    public const FOUR_DAYS = 345600;
    public const THREE_DAYS = 259200;
    public const TWO_DAYS = 172800;
    public const ONE_AND_HALF_DAY = 129600;

    public function __construct(
        protected string $recipientId,
        protected int $inquiryId,
    ) {
        parent::__construct($recipientId, $inquiryId);
    }

    public function getDeadline(): int
    {
        // if expiration is set return expiration date
        if ($this->inquiry->getExpire()) {
            return $this->inquiry->getExpire();
        }

        if ($this->inquiry->getType() === Inquiry::TYPE_DATE) {
            // use lowest date option as reminder deadline threshold
            // if no options are set return is the current time
            $mindate = $this->optionMapper->getMinDate($this->inquiryId);
            if ($mindate === false) {
                return time();
            }
            return $mindate;
        }
        throw new NoDeadLineException();
    }

    protected function getTimeToDeadline(int $time = 0): int
    {
        if ($time === 0) {
            $time = time();
        }

        $deadline = $this->getDeadline();

        if ($deadline - $this->inquiry->getCreated() > self::FIVE_DAYS
            && $deadline - $time < self::TWO_DAYS
            && $deadline > $time
        ) {
            return self::TWO_DAYS;
        }

        if ($deadline - $this->inquiry->getCreated() > self::TWO_DAYS
            && $deadline - $time < self::ONE_AND_HALF_DAY
            && $deadline > $time
        ) {
            return self::ONE_AND_HALF_DAY;
        }
        throw new NoDeadLineException();
    }

    protected function getSubject(): string
    {
        return $this->l10n->t('Reminder for inquiry "%s"', $this->inquiry->getTitle());
    }

    protected function getButtonText(): string
    {
        return $this->l10n->t('Check your supports');
    }

    protected function getFooter(): string
    {
        return $this->l10n->t('This email is sent to you, because you are invited to support in this inquiry by the inquiry owner. At least your name or your email address is recorded in this inquiry. If you want to get removed from this inquiry, contact the site administrator or the initiator of this inquiry, where the mail is sent from.');
    }

    protected function buildBody(): void
    {
        $this->addBodyText();
        $this->addButtonToInquiry();
        $this->emailTemplate->addBodyText($this->l10n->t('This link gives you personal access to the inquiry named above. Press the button above or copy the following link and add it in your browser\'s location bar:'));
        $this->emailTemplate->addBodyText($this->url);
        $this->emailTemplate->addBodyText($this->l10n->t('Do not share this link with other people, because it is connected to your supports.'));
    }

    private function addBodyText(): void
    {
        $dtDeadline = new DateTime('now', $this->recipient->getTimeZone());
        $dtDeadline->setTimestamp($this->getDeadline());
        $deadlineText = (string)$this->l10n->l('datetime', $dtDeadline, ['width' => 'long']);

        if ($this->getReminderReason() === self::REASON_OPTION) {
            $this->emailTemplate->addBodyText(
                str_replace(
                    ['{leftPeriod}', '{dateTime}', '{timezone}'],
                    [($this->getTimeToDeadline() / 3600), $deadlineText, $this->recipient->getTimeZone()->getName()],
                    $this->l10n->t('The first inquiry option is away less than {leftPeriod} hours ({dateTime}, {timezone}).')
                )
            );
            return;
        }

        if ($this->getReminderReason() === self::REASON_EXPIRATION) {
            $this->emailTemplate->addBodyText(
                str_replace(
                    ['{leftPeriod}', '{dateTime}', '{timezone}'],
                    [($this->getTimeToDeadline() / 3600), $deadlineText, $this->recipient->getTimeZone()->getName()],
                    $this->l10n->t('The inquiry is about to expire in less than {leftPeriod} hours ({dateTime}, {timezone}).')
                )
            );
            return;
        }

        $this->emailTemplate->addBodyText(
            str_replace(
                ['{owner}'],
                [$this->owner->getDisplayName()],
                $this->l10n->t('{owner} sends you this reminder to make sure, your supports are set.')
            )
        );
    }

    private function getReminderReason() : ?string
    {
        if ($this->inquiry->getExpire()) {
            return self::REASON_EXPIRATION;
        } elseif ($this->inquiry->getType() === Inquiry::TYPE_DATE) {
            return self::REASON_OPTION;
        } else {
            return self::REASON_NONE;
        }
    }
}
