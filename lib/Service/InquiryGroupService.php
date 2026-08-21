<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\Inquiry;
use OCA\Agora\Db\InquiryGroup;
use OCA\Agora\Db\InquiryGroupTypeMapper;
use OCA\Agora\Db\InquiryGroupMapper;
use OCA\Agora\Db\InquiryGroupMisc;
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
use OCP\IUserManager;
use Psr\Log\LoggerInterface;

class InquiryGroupService
{
    /**
     * @psalm-suppress PossiblyUnusedMethod
     */
    public function __construct(
        private AppSettings $appSettings,
        private IEventDispatcher $eventDispatcher,
        private InquiryMapper $inquiryMapper,
        private UserSession $userSession,
        private InquiryGroupMapper $inquiryGroupMapper,
        private InquiryGroupTypeMapper $inquiryGroupTypeMapper,
        private IUserManager $userManager,
        private LoggerInterface $logger,
    ) {
    }

    /**
     * Get a single inquiry group
     */
    public function get(int $inquiryGroupId, bool $withMiscFields = true, bool $withChildren = true): InquiryGroup
    {
        $inquiryGroup = $this->inquiryGroupMapper->get($inquiryGroupId, false, $withMiscFields);
        $this->enrichInquiryGroup($inquiryGroup, $withMiscFields, $withChildren);
        return $inquiryGroup;
    }

    /**
     * List all inquiry groups
     */
    public function listInquiryGroups(bool $withMiscFields = false, bool $withChildren = true): array
    {
        $inquiryGroups = $this->inquiryGroupMapper->list();
        foreach ($inquiryGroups as $inquiryGroup) {
            $this->enrichInquiryGroup($inquiryGroup, $withMiscFields, $withChildren);
        }
        return $inquiryGroups;
    }
/**
 * Create a new inquiry group
 */
/**
 * Create a new inquiry group
 */
    public function createGroup(
        string $title,
        string $type = 'default',
        ?int $parentId = null,
        ?bool $protected = false,
        ?string $ownedGroup = '',
        ?string $groupStatus = 'draft',
        ?string $titleExt = '',
        ?string $description = '',
        ?array $miscFields = null,
    ): InquiryGroup {
        if (!$this->appSettings->getInquiryCreationAllowed()) {
            throw new ForbiddenException('Inquiry group creation is disabled');
        }

        $inquiryGroup = new InquiryGroup();
        $inquiryGroup->setTitle($title);
        $inquiryGroup->setTitleExt($titleExt ?: $title);
        $inquiryGroup->setType($type);
        $inquiryGroup->setParentId($parentId ?? null);
        $inquiryGroup->setProtected($protected ? 1 : 0);
        $inquiryGroup->setGroupStatus($groupStatus ?? 'draft');
        $inquiryGroup->setOwnedGroup($ownedGroup ?? '');
        $inquiryGroup->setDescription($description ?? '');
        $inquiryGroup->setCreated(time());

        // Set owner from current user session
        $currentUser = $this->userSession->getCurrentUser();
        if ($currentUser) {
            $inquiryGroup->setOwner($this->userSession->getCurrentUserId());
        }

        $inquiryGroup = $this->inquiryGroupMapper->insert($inquiryGroup);

        // Get field definitions for this type
        $fieldsDefinition = $this->getFields($type);

        // Initialize misc fields structure only if we have field definitions
        if (is_array($fieldsDefinition) && !empty($fieldsDefinition)) {
            // Prepare field definitions with values from miscFields or defaults
            $preparedFieldDefinitions = [];

            foreach ($fieldsDefinition as $fieldDef) {
                // Make sure fieldDef has the 'key' property
                if (!isset($fieldDef['key'])) {
                    continue;
                }

                $key = $fieldDef['key'];
                $preparedFieldDef = $fieldDef;

                // If miscFields were provided and contain this key, use that value
                if (is_array($miscFields) && array_key_exists($key, $miscFields)) {
                    $preparedFieldDef['default'] = $miscFields[$key];
                }
                // Otherwise use the default from field definition if it exists
                elseif (!isset($preparedFieldDef['default'])) {
                    // Initialize with empty value based on type
                    $fieldType = $fieldDef['type'] ?? 'text';
                    switch ($fieldType) {
                        case 'number':
                        case 'integer':
                            $preparedFieldDef['default'] = 0;
                            break;
                        case 'boolean':
                        case 'checkbox':
                            $preparedFieldDef['default'] = false;
                            break;
                        case 'array':
                        case 'multiselect':
                        case 'users':
                            $preparedFieldDef['default'] = [];
                            break;
                        case 'datetime':
                            $preparedFieldDef['default'] = null;
                            break;
                        default:
                            $preparedFieldDef['default'] = '';
                            break;
                    }
                }

                $preparedFieldDefinitions[] = $preparedFieldDef;
            }

            // Save the dynamic fields
            if (!empty($preparedFieldDefinitions)) {
                $this->inquiryGroupMapper->saveDynamicFields($inquiryGroup, $preparedFieldDefinitions);
            }
        }

        // Do NOT call enrichInquiryGroup here - it causes dirty reads
        // Just set basic permissions
        $this->setBasicPermissions($inquiryGroup);

        return $inquiryGroup;
    }

/**
 * Update an inquiry group with all possible fields
 */
    public function updateGroup(
        int $inquiryGroupId,
        ?string $title = null,
        ?string $titleExt = null,
        ?string $description = null,
        ?string $type = null,
        ?int $parentId = null,
        ?bool $protected = null,
        ?string $ownedGroup = null,
        ?string $groupStatus = null,
        ?int $expire = null,
        ?array $miscFields = null,
    ): InquiryGroup {
        try {
            $inquiryGroup = $this->inquiryGroupMapper->find($inquiryGroupId);

            // Check permissions
            if (!$inquiryGroup->getAllowEdit() && !$this->userSession->isAdmin()) {
                throw new ForbiddenException('You do not have permission to edit this inquiry group');
            }

            // Update basic fields
            if ($title !== null) {
                $inquiryGroup->setTitle($title);
            }
            if ($titleExt !== null) {
                $inquiryGroup->setTitleExt($titleExt);
            }
            if ($description !== null) {
                $inquiryGroup->setDescription($description);
            }
            if ($type !== null) {
                $inquiryGroup->setType($type);
            }
            if ($parentId !== null) {
                $inquiryGroup->setParentId($parentId);
            }
            if ($protected !== null) {
                $inquiryGroup->setProtected($protected ? 1 : 0);
            }
            if ($ownedGroup !== null) {
                $inquiryGroup->setOwnedGroup($ownedGroup);
            }
            if ($groupStatus !== null) {
                $inquiryGroup->setGroupStatus($groupStatus);
            }
            if ($expire !== null) {
                $inquiryGroup->setExpire($expire);
            }

            $inquiryGroup = $this->inquiryGroupMapper->update($inquiryGroup);

            // Update misc fields if provided
            if ($miscFields !== null && !empty($miscFields)) {
                $currentType = $type ?? $inquiryGroup->getType();
                $fieldsDefinition = $this->getFields($currentType);
                $this->inquiryGroupMapper->updateDynamicFields($inquiryGroup, $miscFields, $fieldsDefinition);
            }

            // Enrich with minimal data (no children to avoid dirty reads)
            $this->enrichInquiryGroup($inquiryGroup, true, false);
            return $inquiryGroup;
        } catch (DoesNotExistException $e) {
            throw new NotFoundException('Inquiry group not found');
        }
    }

/**
 * Update specific inquiry group fields (legacy method)
 */
    public function updateInquiryGroup(
        int $inquiryGroupId,
        string $name,
        ?string $titleExt = null,
        ?string $description = null,
        ?array $miscFields = null
    ): InquiryGroup {
        return $this->updateGroup(
            $inquiryGroupId,
            title: $name,
            titleExt: $titleExt,
            description: $description,
            miscFields: $miscFields
        );
    }

/**
 * Delete an inquiry group
 */
    public function deleteGroup(int $inquiryGroupId): bool
    {
        try {
            $inquiryGroup = $this->inquiryGroupMapper->find($inquiryGroupId);

            // Check permissions
            if (!$inquiryGroup->getAllowEdit() && !$this->userSession->isAdmin()) {
                throw new ForbiddenException('You do not have permission to delete this inquiry group');
            }

            // Check if group is protected
            if ($inquiryGroup->getProtected() === 1) {
                throw new ForbiddenException('Cannot delete a protected inquiry group');
            }

            $this->inquiryGroupMapper->delete($inquiryGroup);
            return true;
        } catch (DoesNotExistException $e) {
            throw new NotFoundException('Inquiry group not found');
        }
    }


/**
 * Soft delete an inquiry group (mark as deleted)
 */
    public function softDeleteInquiryGroup(int $inquiryGroupId): InquiryGroup
    {
        $inquiryGroup = $this->inquiryGroupMapper->find($inquiryGroupId);

        // Check permissions
        if (!$inquiryGroup->getAllowEdit() && !$this->userSession->isAdmin()) {
            throw new ForbiddenException('You do not have permission to delete this inquiry group');
        }

        $inquiryGroup->setDeleted(time());
        $inquiryGroup = $this->inquiryGroupMapper->update($inquiryGroup);
        $this->enrichInquiryGroup($inquiryGroup, true, false);
        return $inquiryGroup;
    }

/**
 * Archive an inquiry group
 */
    public function archiveGroup(int $inquiryGroupId): InquiryGroup
    {
        return $this->updateGroup($inquiryGroupId, groupStatus: 'archived');
    }

/**
 * Restore an archived inquiry group
 */
    public function restoreGroup(int $inquiryGroupId): InquiryGroup
    {
        return $this->updateGroup($inquiryGroupId, groupStatus: 'active');
    }

/**
 * Reorder inquiries in a group
 */
    public function reorderInquiries(int $inquiryGroupId, array $inquiryIds): InquiryGroup
    {
        $inquiryGroup = $this->inquiryGroupMapper->find($inquiryGroupId);

        // Check permissions
        if (!$inquiryGroup->getAllowEdit() && !$this->userSession->isAdmin()) {
            throw new ForbiddenException('You do not have permission to reorder inquiries in this group');
        }

        $this->inquiryGroupMapper->updateInquiryOrder($inquiryGroupId, $inquiryIds);

        // Refresh the group to get updated inquiry IDs
        $inquiryGroup = $this->inquiryGroupMapper->find($inquiryGroupId);
        $this->enrichInquiryGroup($inquiryGroup, true, false);
        return $inquiryGroup;
    }

/**
 * Change owner of an inquiry group
 */
    public function changeOwner(int $inquiryGroupId, string $newOwnerId): InquiryGroup
    {
        $inquiryGroup = $this->inquiryGroupMapper->find($inquiryGroupId);

        // Check permissions - only owner or admin can change owner
        $currentUser = $this->userSession->getCurrentUser();
        if ($inquiryGroup->getOwner() !== $this->userSession->getCurrentUserId() && !$this->userSession->isAdmin()) {
            throw new ForbiddenException('Only the owner or admin can change the owner of this inquiry group');
        }

        // Verify new owner exists
        $newOwner = $this->userManager->get($newOwnerId);
        if (!$newOwner) {
            throw new NotFoundException('New owner not found');
        }

        $inquiryGroup->setOwner($newOwnerId);
        $inquiryGroup = $this->inquiryGroupMapper->update($inquiryGroup);
        $this->enrichInquiryGroup($inquiryGroup, true, false);
        return $inquiryGroup;
    }

/**
 * Clone an inquiry group
 */
    public function cloneGroup(int $inquiryGroupId, ?array $miscFields = null): InquiryGroup
    {
        $originalGroup = $this->inquiryGroupMapper->find($inquiryGroupId);

        // Check permissions - anyone can clone if they can view
        if (!$originalGroup->getAllowEdit() && !$this->userSession->getCurrentUser()) {
            throw new ForbiddenException('You do not have permission to clone this inquiry group');
        }

        // Create new group with similar properties
        $clonedGroup = new InquiryGroup();
        $clonedGroup->setTitle($originalGroup->getTitle() . ' (Copy)');
        $clonedGroup->setTitleExt($originalGroup->getTitleExt());
        $clonedGroup->setType($originalGroup->getType());
        $clonedGroup->setParentId($originalGroup->getParentId());
        $clonedGroup->setProtected($originalGroup->getProtected());
        $clonedGroup->setGroupStatus('draft');
        $clonedGroup->setOwnedGroup($originalGroup->getOwnedGroup());
        $clonedGroup->setDescription($originalGroup->getDescription());
        $clonedGroup->setCreated(time());

        // Set current user as owner
        $currentUser = $this->userSession->getCurrentUser();
        if ($currentUser) {
            $clonedGroup->setOwner($this->userSession->getCurrentUserId());
        }

        $clonedGroup = $this->inquiryGroupMapper->insert($clonedGroup);

        // Save misc fields if provided, otherwise copy from original
        if ($miscFields !== null) {
            $fieldsDefinition = $this->getFields($clonedGroup->getType());
            $this->inquiryGroupMapper->saveDynamicFields($clonedGroup, $fieldsDefinition, $miscFields);
        }

        // Clone inquiries if any
        if (!empty($originalGroup->getInquiryIds())) {
            foreach ($originalGroup->getInquiryIds() as $inquiryId) {
                try {
                    $this->inquiryGroupMapper->addInquiryToGroup($inquiryId, $clonedGroup->getId());
                } catch (Exception $e) {
                    // Skip if there's an error adding an inquiry
                    continue;
                }
            }
        }

        // Set basic permissions only
        $this->setBasicPermissions($clonedGroup);
        return $clonedGroup;
    }

/**
 * Add inquiry to inquiry group
 */
    public function addInquiryToInquiryGroup(
        int $inquiryId,
        ?int $inquiryGroupId = null,
        ?string $inquiryGroupName = null,
    ): InquiryGroup {
        $inquiry = $this->inquiryMapper->get($inquiryId);

        // Without inquiry group id, create a new inquiry group
        if ($inquiryGroupId === null && $inquiryGroupName !== null && $inquiryGroupName !== '') {
            if (!$this->appSettings->getInquiryCreationAllowed()) {
                throw new ForbiddenException('Inquiry group creation is disabled');
            }

            // Create new inquiry group WITHOUT enrichment
            $inquiryGroup = new InquiryGroup();
            $inquiryGroup->setTitle($inquiryGroupName);
            $inquiryGroup->setTitleExt($inquiryGroupName);
            $inquiryGroup->setType('default');
            $inquiryGroup->setParentId(0);
            $inquiryGroup->setProtected(0);
            $inquiryGroup->setGroupStatus('draft');
            $inquiryGroup->setOwnedGroup('');
            $inquiryGroup->setDescription('');
            $inquiryGroup->setCreated(time());

            $currentUser = $this->userSession->getCurrentUser();
            if ($currentUser) {
                $inquiryGroup->setOwner($this->userSession->getCurrentUserId());
            }

            $inquiryGroup = $this->inquiryGroupMapper->insert($inquiryGroup);
            // Set basic permissions only
            $this->setBasicPermissions($inquiryGroup);
        } elseif ($inquiryGroupId !== null) {
            $inquiryGroup = $this->inquiryGroupMapper->find($inquiryGroupId);
            $this->enrichInquiryGroup($inquiryGroup, false, false);
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

        // Reload with minimal enrichment
        $inquiryGroup = $this->inquiryGroupMapper->find($inquiryGroup->getId());
        $this->enrichInquiryGroup($inquiryGroup, false, false);
        return $inquiryGroup;
    }

/**
 * Remove inquiry from inquiry group
 */
    public function removeInquiryFromInquiryGroup(
        int $inquiryId,
        int $inquiryGroupId,
    ): ?InquiryGroup {
        $inquiry = $this->inquiryMapper->get($inquiryId);

    // Check if user has permission to edit the inquiry
        if (!$inquiry->getAllowEdit() && !$this->userSession->isAdmin()) {
            throw new ForbiddenException('You do not have permission to edit this inquiry');
        }

        $inquiryGroup = $this->inquiryGroupMapper->find($inquiryGroupId);
        $this->enrichInquiryGroup($inquiryGroup, false, false);

    // Check if user has permission to remove from this group
        if (!$inquiryGroup->getAllowEdit() && !$this->userSession->isAdmin()) {
            throw new ForbiddenException('You do not have permission to remove inquiries from this group');
        }

        if ($inquiryGroup->hasInquiry($inquiryId)) {
            $this->inquiryGroupMapper->removeInquiryFromGroup($inquiryId, $inquiryGroupId);
            $this->eventDispatcher->dispatchTyped(new InquiryUpdatedEvent($inquiry));
        } else {
            throw new NotFoundException('Inquiry not found in group');
        }

    // Check if group is now empty and should be deleted
        $remainingInquiries = $this->inquiryGroupMapper->countInquiriesInGroup($inquiryGroupId);
        if ($remainingInquiries === 0) {
            $this->inquiryGroupMapper->delete($inquiryGroup);
            return null;
        }

        $inquiryGroup = $this->inquiryGroupMapper->find($inquiryGroupId);
        $this->enrichInquiryGroup($inquiryGroup, false, false);
        return $inquiryGroup;
    }

/**
 * Enrich inquiry group with additional data
 */
    private function enrichInquiryGroup(InquiryGroup $inquiryGroup, bool $withMiscFields = true, bool $withChildren = false): void
    {
        // Load misc fields if requested
        if ($withMiscFields) {
            $this->inquiryGroupMapper->loadFieldsMisc($inquiryGroup);
        }

        // Get inquiry IDs for this group
        $inquiryIds = $this->inquiryGroupMapper->getInquiryIdsForGroup($inquiryGroup->getId());
        $inquiryGroup->setInquiryIds($inquiryIds);

        // Get child groups only if explicitly requested (to avoid dirty reads)
        if ($withChildren) {
            $childGroups = $this->inquiryGroupMapper->findByParentId($inquiryGroup->getId());
            $inquiryGroup->setChilds($childGroups);
        } else {
            $inquiryGroup->setChilds([]);
        }

        // Set basic permissions
        $this->setBasicPermissions($inquiryGroup);
    }

/**
 * Set basic permissions on inquiry group
 */
    private function setBasicPermissions(InquiryGroup $inquiryGroup): void
    {
        $currentUser = $this->userSession->getCurrentUser();
        $isOwner = $currentUser && $inquiryGroup->getOwner() === $this->userSession->getCurrentUserId();
        $isAdmin = $this->userSession->isAdmin();

        // Set allowEdit based on permissions
        $allowEdit = $isOwner || $isAdmin;
        $inquiryGroup->setAllowEdit($allowEdit);

        // Initialize empty misc fields if not set
        if ($inquiryGroup->getMiscFields() === null) {
            $inquiryGroup->setMiscFields([]);
        }
    }

/**
 * List inquiry groups by type
 */
    public function listInquiryGroupsByType(string $type, bool $withMiscFields = false, bool $withChildren = false): array
    {
        $inquiryGroups = $this->inquiryGroupMapper->findByType($type);
        foreach ($inquiryGroups as $inquiryGroup) {
            $this->enrichInquiryGroup($inquiryGroup, $withMiscFields, $withChildren);
        }
        return $inquiryGroups;
    }

/**
 * List inquiry groups by status
 */
    public function listInquiryGroupsByStatus(string $status, bool $withMiscFields = false, bool $withChildren = false): array
    {
        $inquiryGroups = $this->inquiryGroupMapper->findByStatus($status);
        foreach ($inquiryGroups as $inquiryGroup) {
            $this->enrichInquiryGroup($inquiryGroup, $withMiscFields, $withChildren);
        }
        return $inquiryGroups;
    }

/**
 * List active (non-deleted) inquiry groups
 */
    public function listActiveInquiryGroups(bool $withMiscFields = false, bool $withChildren = false): array
    {
        $inquiryGroups = $this->inquiryGroupMapper->findActive();
        foreach ($inquiryGroups as $inquiryGroup) {
            $this->enrichInquiryGroup($inquiryGroup, $withMiscFields, $withChildren);
        }
        return $inquiryGroups;
    }

/**
 * List expired inquiry groups
 */
    public function listExpiredInquiryGroups(bool $withMiscFields = false, bool $withChildren = false): array
    {
        $inquiryGroups = $this->inquiryGroupMapper->findExpired();
        foreach ($inquiryGroups as $inquiryGroup) {
            $this->enrichInquiryGroup($inquiryGroup, $withMiscFields, $withChildren);
        }
        return $inquiryGroups;
    }

/**
 * Get child groups of a parent group
 */
    public function getChildGroups(int $parentId, bool $withMiscFields = false): array
    {
        $inquiryGroups = $this->inquiryGroupMapper->findByParentId($parentId);
        foreach ($inquiryGroups as $inquiryGroup) {
            $this->enrichInquiryGroup($inquiryGroup, $withMiscFields, false); // Don't load nested children
        }
        return $inquiryGroups;
    }

/**
 * Get fields configuration for specific inquiry group type
 */
    public function getFields(string $inquiryGroupType): array
    {
        return $this->inquiryGroupTypeMapper->getFields($inquiryGroupType);
    }

/**
 * Get allowed response configuration for specific inquiry type
 */
    public function getAllowedResponse(string $inquiryGroupType): array
    {
        return $this->inquiryGroupTypeMapper->getAllowedResponse($inquiryGroupType);
    }


/**
 * Update misc fields for an inquiry group
 */
    public function updateMiscFields(int $inquiryGroupId, array $miscFields): InquiryGroup
    {
        $inquiryGroup = $this->inquiryGroupMapper->find($inquiryGroupId);

        // Check permissions
        if (!$inquiryGroup->getAllowEdit() && !$this->userSession->isAdmin()) {
            throw new ForbiddenException('You do not have permission to edit this inquiry group');
        }

        $fieldsDefinition = $this->getFields($inquiryGroup->getType());
        $this->inquiryGroupMapper->updateDynamicFields($inquiryGroup, $miscFields, $fieldsDefinition);

        // Refresh the group with misc fields
        $inquiryGroup = $this->inquiryGroupMapper->get($inquiryGroupId, false, true);
        $this->enrichInquiryGroup($inquiryGroup, true, false);
        return $inquiryGroup;
    }

/**
 * Save misc fields for an inquiry group
 */
    public function saveMiscFields(int $inquiryGroupId, array $miscFields): InquiryGroup
    {
        $inquiryGroup = $this->inquiryGroupMapper->find($inquiryGroupId);

        // Check permissions
        if (!$inquiryGroup->getAllowEdit() && !$this->userSession->isAdmin()) {
            throw new ForbiddenException('You do not have permission to edit this inquiry group');
        }

        $fieldsDefinition = $this->getFields($inquiryGroup->getType());
        $this->inquiryGroupMapper->saveDynamicFields($inquiryGroup, $fieldsDefinition, $miscFields);

        // Refresh the group with misc fields
        $inquiryGroup = $this->inquiryGroupMapper->get($inquiryGroupId, false, true);
        $this->enrichInquiryGroup($inquiryGroup, true, false);
        return $inquiryGroup;
    }

/**
 * Get misc fields for an inquiry group
 */
    public function getMiscFields(int $inquiryGroupId): array
    {
        $inquiryGroup = $this->inquiryGroupMapper->get($inquiryGroupId, false, true);
        $this->enrichInquiryGroup($inquiryGroup, true, false);
        return $inquiryGroup->getMiscFields() ?? [];
    }

/**
 * Get inquiry group with full enrichment (for when transaction is complete)
 */
    public function getWithFullEnrichment(int $inquiryGroupId): InquiryGroup
    {
        $inquiryGroup = $this->inquiryGroupMapper->get($inquiryGroupId, false, true);
        $this->enrichInquiryGroup($inquiryGroup, true, true);
        return $inquiryGroup;
    }
}
