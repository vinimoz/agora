<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */


namespace OCA\Agora\Model\Mail;

use OCA\Agora\AppConstants;
use OCA\Agora\Db\Log;
use OCA\Agora\Db\Inquiry;
use OCA\Agora\Db\Subscription;
use OCA\Agora\Event\CommentEvent;
use OCA\Agora\Event\OptionEvent;
use OCA\Agora\Event\InquiryEvent;
use OCA\Agora\Event\SupportEvent;

class NotificationMail extends MailBase
{
    protected const TEMPLATE_CLASS = AppConstants::APP_ID . '.Notification';

    public function __construct(
        protected Subscription $subscription,
    ) {
        parent::__construct($subscription->getUserId(), $subscription->getInquiryId());
    }

    protected function getSubject(): string
    {
        return $this->l10n->t('Agora App - New Activity');
    }

    protected function getFooter(): string
    {
        return $this->l10n->t('This email is sent to you, because you subscribed to notifications of this inquiry. To opt out, visit the inquiry and remove your subscription.');
    }

    protected function buildBody(): void
    {
        $this->emailTemplate->addBodyText(
            str_replace(
                ['{title}'],
                [$this->inquiry->getTitle()],
                $this->l10n->t('"{title}" has recent activity:')
            )
        );

        foreach ($this->subscription->getNotifyLogs() as $logItem) {
            $displayName = $this->evaluateDisplayName($logItem);
            $this->emailTemplate->addBodyListItem($this->getComposedLogString($logItem, $displayName));
        }

        $this->addButtonToInquiry();
    }

    private function evaluateDisplayName(Log $logItem): string
    {
        if (!$logItem->getUserId() || $this->inquiry->getAnonymous() || $this->inquiry->getShowResults() !== Inquiry::SHOW_RESULTS_ALWAYS) {
            // hide actor's name if inquiry is anonymous or results are hidden
            return $this->l10n->t('A participant');
        }

        return $this->getUser($logItem->getUserId())->getDisplayName();
    }

    private function getComposedLogString(Log $logItem, string $displayName): string
    {
        $logStrings = [
        Log::MSG_ID_SETSUPPORT => $this->l10n->t('%s has supported.', [$displayName]),
        Log::MSG_ID_UPDATEINQUIRY => $this->l10n->t('Updated inquiry configuration. Please check your supports.'),
        Log::MSG_ID_DELETEINQUIRY => $this->l10n->t('The inquiry has been deleted.'),
        Log::MSG_ID_RESTOREINQUIRY => $this->l10n->t('The inquiry has been restored.'),
        Log::MSG_ID_EXPIREINQUIRY => $this->l10n->t('The inquiry has been closed.'),
        Log::MSG_ID_ADDOPTION => $this->l10n->t('A voting option has been added.'),
        Log::MSG_ID_UPDATEOPTION => $this->l10n->t('A voting option has been changed.'),
        Log::MSG_ID_CONFIRMOPTION => $this->l10n->t('A voting option has been confirmed.'),
        Log::MSG_ID_DELETEOPTION => $this->l10n->t('A voting option has been removed.'),
        Log::MSG_ID_OWNERCHANGE => $this->l10n->t('The inquiry owner has been changed.'),
        Log::MSG_ID_ADDINQUIRY => $this->l10n->t('%s created the inquiry.', [$displayName]),
        InquiryEvent::ADD => $this->l10n->t('%s created the inquiry.', [$displayName]),
        InquiryEvent::UPDATE => $this->l10n->t('Updated inquiry configuration. Please check your supports.'),
        InquiryEvent::DELETE => $this->l10n->t('The inquiry has been deleted.'),
        InquiryEvent::RESTORE => $this->l10n->t('The inquiry has been restored.'),
        InquiryEvent::EXPIRE => $this->l10n->t('The inquiry has been closed.'),
        InquiryEvent::CLOSE => $this->l10n->t('The inquiry has been closed.'),
        InquiryEvent::REOPEN => $this->l10n->t('The inquiry has been reopened.'),
        InquiryEvent::OWNER_CHANGE => $this->l10n->t('The inquiry owner has been changed.'),
        OptionEvent::ADD => $this->l10n->t('A voting option has been added.'),
        OptionEvent::UPDATE => $this->l10n->t('A voting option has been changed.'),
        OptionEvent::CONFIRM => $this->l10n->t('A voting option has been confirmed.'),
        OptionEvent::UNCONFIRM => $this->l10n->t('A voting option has been unconfirmed.'),
        OptionEvent::DELETE => $this->l10n->t('A voting option has been removed.'),
        CommentEvent::ADD => $this->l10n->t('%s has left a comment.', [$displayName]),
        SupportEvent::SET => $this->l10n->t('%s has support.', [$displayName]),
        ];

        return $logStrings[$logItem->getMessageId()] ?? $logItem->getMessageId() . ' (' . $displayName . ')';
    }
}
