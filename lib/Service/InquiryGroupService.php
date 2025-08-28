<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\Inquiry;
use OCA\Agora\Db\InquiryGroup;
use OCA\Agora\Db\InquiryGroupMapper;
use OCA\Agora\Db\InquiryMapper;
use OCA\Agora\Event\InquiryUpdatedEvent;
use OCA\Agora\Exceptions\ForbiddenException;
use OCA\Agora\Exceptions\InsufficientAttributesException;
use OCA\Agora\Exceptions\NotFoundException;
use OCA\Agora\Model\Settings\AppSettings;
use OCA\Agora\UserSession;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\DB\Exception;
use OCP\EventDispatcher\IEventDispatcher;

class InquiryGroupService
{
    public const GROUP_MODERATOR = 'agora_moderator';
    public const GROUP_OFFICIAL  = 'agora_official';

    /**
     * @psalm-suppress PossiblyUnusedMethod 
     */
    public function __construct(
        private AppSettings $appSettings,
        private IEventDispatcher $eventDispatcher,
        private InquiryMapper $inquiryMapper,
        private UserSession $userSession,
        private InquiryGroupMapper $inquiryGroupMapper,
    ) {
    }

    public function listInquiryGroups(): array
    {
        return $this->inquiryGroupMapper->list();
    }

    public function updateInquiryGroup(
        int $inquiryGroupId,
        string $name,
        string $titleExt,
        ?string $description,
    ): InquiryGroup {
        try {
            $inquiryGroup = $this->inquiryGroupMapper->find($inquiryGroupId);
            if ($inquiryGroup->getOwner() !== $this->userSession->getCurrentUserId()) {
                throw new ForbiddenException('You do not have permission to edit this inquiry group');
            }
            $inquiryGroup->setName($name);
            $inquiryGroup->setTitleExt($titleExt);
            $inquiryGroup->setDescription($description);

            $inquiryGroup = $this->inquiryGroupMapper->update($inquiryGroup);
            return $inquiryGroup;
        } catch (DoesNotExistException $e) {
            throw new NotFoundException('Inquiry group not found');
        }
    }
    public function addInquiryToInquiryGroup(
        int $inquiryId,
        ?int $inquiryGroupId = null,
        ?string $inquiryGroupName = null,
    ): InquiryGroup {
        $inquiry = $this->inquiryMapper->get($inquiryId, withRoles: true);
        $inquiry->request(Inquiry::PERMISSION_INQUIRY_EDIT);

        // Without inquiry group id, we create a new inquiry group
        if ($inquiryGroupId === null
            && $inquiryGroupName !== null
            && $inquiryGroupName !== ''
        ) {
            if (!$this->appSettings->getInquiryCreationAllowed()) {
                // If inquiry creation is disabled, creating a inquiry group is also disabled
                throw new ForbiddenException('Inquiry group creation is disabled');
            }

            // Create new inquiry group
            $inquiryGroup = new InquiryGroup();
            $inquiryGroup->setName($inquiryGroupName);
            $inquiryGroup->setOwner($this->userSession->getCurrentUserId());
            $inquiryGroup->setCreated(time());
            $inquiryGroup = $this->inquiryGroupMapper->add($inquiryGroup);

        } elseif ($inquiryGroupId !== null) {
            $inquiryGroup = $this->inquiryGroupMapper->find($inquiryGroupId);

        } else {
            throw new InsufficientAttributesException('An existing inquiry group id must be provided or a new inquiry group name must be given.');
        }

        if (!$inquiryGroup->hasInquiry($inquiryId)) {
            try {
                $this->inquiryGroupMapper->addInquiryToGroup($inquiryId, $inquiryGroup->getId());
            } catch (Exception $e) {
                if ($e->getReason() === Exception::REASON_UNIQUE_CONSTRAINT_VIOLATION) {
                    // Inquiry is already member of this group
                } else {
                    throw $e;
                }
            }

            $this->eventDispatcher->dispatchTyped(new InquiryUpdatedEvent($inquiry));
        }

        return $this->inquiryGroupMapper->find($inquiryGroup->getId());
    }

    public function removeInquiryFromInquiryGroup(
        int $inquiryId,
        int $inquiryGroupId,
    ): ?InquiryGroup {
        $inquiry = $this->inquiryMapper->get($inquiryId, withRoles: true);
        $inquiry->request(Inquiry::PERMISSION_INQUIRY_EDIT);

        $inquiryGroup = $this->inquiryGroupMapper->find($inquiryGroupId);

        if ($inquiryGroup->hasInquiry($inquiryId)) {
            $this->inquiryGroupMapper->removeInquiryFromGroup($inquiryId, $inquiryGroupId);
            $this->eventDispatcher->dispatchTyped(new InquiryUpdatedEvent($inquiry));
        } else {
            throw new NotFoundException('Inquiry not found in group');
        }

        $this->inquiryGroupMapper->tidyInquiryGroups();
        try {
            $inquiryGroup = $this->inquiryGroupMapper->find($inquiryGroupId);
        } catch (DoesNotExistException $e) {
            // Inquiry group was deleted, return null
            return null;
        }
        return $inquiryGroup;
    }
}
