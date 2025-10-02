<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */


namespace OCA\Agora\Model\Mail;

use OCA\Agora\AppConstants;
use OCA\Agora\Db\Share;

class InvitationMail extends MailBase
{
    protected const TEMPLATE_CLASS = AppConstants::APP_ID . '.Invitation';

    public function __construct(
        protected string $recipientId,
        protected Share $share,
    ) {
        parent::__construct($recipientId, $share->getInquiryId());
    }

    protected function getSubject(): string
    {
        return $this->l10n->t('Inquiry invitation "%s"', $this->inquiry->getTitle());
    }

    protected function getFooter(): string
    {
        return $this->l10n->t('This email is sent to you, because you are invited to support in this inquiry by the inquiry owner. At least your name or your email address is recorded in this inquiry. If you want to get removed from this inquiry, contact the site administrator or the initiator of this inquiry, where the mail is sent from.');
    }

    protected function buildBody(): void
    {
        if ($this->share->getType() === Share::TYPE_GROUP) {
            $this->emailTemplate->addBodyText(
                str_replace(
                    ['{owner}', '{title}', '{group_name}'],
                    [$this->owner->getDisplayName(), $this->inquiry->getTitle(), $this->share->getDisplayName()],
                    $this->l10n->t('{owner} invited you to take part in the inquiry "{title}" as a member of the group {group_name}')
                )
            );
        } else {
            $this->emailTemplate->addBodyText(
                str_replace(
                    ['{owner}', '{title}'],
                    [$this->owner->getDisplayName(), $this->inquiry->getTitle()],
                    $this->l10n->t('{owner} invited you to take part in the inquiry "{title}"')
                )
            );
        }

        $this->emailTemplate->addBodyText($this->getRichDescription(), $this->inquiry->getDescription());

        $this->addButtonToInquiry();

        $this->emailTemplate->addBodyText($this->l10n->t('This link gives you personal access to the inquiry named above. Press the button above or copy the following link and add it in your browser\'s location bar:'));
        $this->emailTemplate->addBodyText($this->url);
        $this->emailTemplate->addBodyText($this->l10n->t('Do not share this link with other people, because it is connected to your supports.'));
    }
}
