<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */


namespace OCA\Agora\Model\Mail;

use OCA\Agora\AppConstants;
use OCA\Agora\Db\Option;
use OCA\Agora\Db\Inquiry;

class ConfirmationMail extends MailBase
{
    protected const TEMPLATE_CLASS = AppConstants::APP_ID . '.Confirmation';

    /**
     * @var Option[] 
     */
    protected array $confirmedOptions;

    public function __construct(
        string $recipientId,
        int $inquiryId,
    ) {
        parent::__construct($recipientId, $inquiryId);
        $this->confirmedOptions = $this->optionMapper->findConfirmed($inquiryId);
    }

    protected function getSubject(): string
    {
        return $this->l10n->t('Inquiry "%s" - Confirmation', $this->inquiry->getTitle());
    }

    protected function getFooter(): string
    {
        return $this->l10n->t('This email is sent to you to inform you about the result of a inquiry you participated in. At least your name or your email address was recorded in this inquiry. If you want to be removed from this inquiry, contact the site administrator or the inquiry initiator, where the mail is sent from.');
    }

    protected function buildBody(): void
    {
        $this->emailTemplate->addBodyText(
            str_replace(
                ['{owner}', '{title}'],
                [$this->owner->getDisplayName(), $this->inquiry->getTitle()],
                $this->l10n->t('{owner} wants to inform you about the final result of the inquiry "{title}"')
            )
        );

        $this->emailTemplate->addBodyText(
            $this->l10n->n('Confirmed option:', 'Confirmed options:', count($this->confirmedOptions))
        );

        foreach ($this->confirmedOptions as $option) {
            if ($this->inquiry->getType() === Inquiry::TYPE_DATE) {
                $this->emailTemplate->addBodyListItem($option->getDateStringLocalized($this->recipient->getTimeZone(), $this->l10n));
            } else {
                $this->emailTemplate->addBodyListItem($option->getInquiryOptionText());
            }
        }

        if ($this->inquiry->getType() === Inquiry::TYPE_DATE) {
            $this->emailTemplate->addBodyText(
                $this->l10n->t('The used time zone is "%s", based on the detected time zone at your registration time. To view the times in your current time zone, enter the inquiry by clicking the button below.', $this->recipient->getTimeZoneName())
            );
        }

        if ($this->inquiry->getDescription()) {
            $this->emailTemplate->addBodyText($this->getRichDescription(), $this->inquiry->getDescription());
        }

        $this->addButtonToInquiry();

        $this->emailTemplate->addBodyText($this->l10n->t('This link gives you personal access to the inquiry named above. Press the button above or copy the following link and add it in your browser\'s location bar:'));
        $this->emailTemplate->addBodyText($this->url);
        $this->emailTemplate->addBodyText($this->l10n->t('Do not share this link with other people, because it is connected to your supports.'));
    }
}
