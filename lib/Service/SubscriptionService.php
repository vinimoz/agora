<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\Inquiry;
use OCA\Agora\Db\InquiryMapper;
use OCA\Agora\Db\Subscription;
use OCA\Agora\Db\SubscriptionMapper;
use OCA\Agora\Exceptions\ForbiddenException;
use OCA\Agora\UserSession;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\DB\Exception;

class SubscriptionService
{
    /**
     * @psalm-suppress PossiblyUnusedMethod 
     */
    public function __construct(
        private SubscriptionMapper $subscriptionMapper,
        private InquiryMapper $inquiryMapper,
        private UserSession $userSession,
    ) {
    }

    public function get(int $inquiryId): bool
    {
        $this->inquiryMapper->get($inquiryId, withRoles: true)->request(Inquiry::PERMISSION_INQUIRY_VIEW);

        try {
            $this->subscriptionMapper->findByInquiryAndUser($inquiryId, $this->userSession->getCurrentUserId());
            // Subscription exists
            return true;
        } catch (DoesNotExistException $e) {
            return false;
        } catch (ForbiddenException $e) {
            return false;
        }
    }

    public function set(bool $setToSubscribed, int $inquiryId): bool
    {
        if (!$setToSubscribed) {
            // user wants to unsubscribe, allow unsubscribe neverteheless the permissions are set
            try {
                $subscription = $this->subscriptionMapper->findByInquiryAndUser($inquiryId, $this->userSession->getCurrentUserId());
                $this->subscriptionMapper->delete($subscription);
            } catch (DoesNotExistException $e) {
                // Not found, assume already unsubscribed
                return false;
            }
        } else {
            try {
                // $this->inquiryMapper->get($inquiryId, withRoles: true);
                $this->inquiryMapper->get($inquiryId, withRoles: true)->request(Inquiry::PERMISSION_INQUIRY_SUBSCRIBE);
                $this->add($inquiryId, $this->userSession->getCurrentUserId());
            } catch (ForbiddenException $e) {
                return false;
            } catch (Exception $e) {
                if ($e->getReason() === Exception::REASON_UNIQUE_CONSTRAINT_VIOLATION) {
                    // Already subscribed
                    return true;
                } else {
                    throw $e;
                }
            }
        }
        return $setToSubscribed;
    }

    private function add(int $inquiryId, string $userId): void
    {
        $subscription = new Subscription();
        $subscription->setInquiryId($inquiryId);
        $subscription->setUserId($userId);
        $this->subscriptionMapper->insert($subscription);
    }
}
