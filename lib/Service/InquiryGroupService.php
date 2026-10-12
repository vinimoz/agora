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

	public function get(int $inquiryGroupId, bool $withMiscFields = true, bool $withChildren = true): InquiryGroup
	{
		$inquiryGroup = $this->inquiryGroupMapper->get($inquiryGroupId, false, $withMiscFields);
		$this->enrichInquiryGroup($inquiryGroup, $withMiscFields, $withChildren);
		return $inquiryGroup;
	}

	/**
	 * @return InquiryGroup[]
	 */
	public function listInquiryGroups(bool $withMiscFields = false, bool $withChildren = true): array
	{
		$inquiryGroups = $this->inquiryGroupMapper->list();

		foreach ($inquiryGroups as $inquiryGroup) {
			$this->enrichInquiryGroup($inquiryGroup, $withMiscFields, $withChildren);
		}
		return $inquiryGroups;
	}

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
		$inquiryGroup->setProtected((bool) ($protected ?? false));
		$inquiryGroup->setGroupStatus($groupStatus ?? 'draft');
		$inquiryGroup->setOwnedGroup($ownedGroup ?? '');
		$inquiryGroup->setDescription($description ?? '');
		$inquiryGroup->setCreated(time());

		$currentUser = $this->userSession->getCurrentUser();
		if ($currentUser) {
			$inquiryGroup->setOwner($this->userSession->getCurrentUserId());
		}

		$inquiryGroup = $this->inquiryGroupMapper->insert($inquiryGroup);

		$fieldsDefinition = $this->getFields($type);

		if (is_array($fieldsDefinition) && !empty($fieldsDefinition)) {
			$preparedFieldDefinitions = [];

			foreach ($fieldsDefinition as $fieldDef) {
				if (!isset($fieldDef['key'])) {
					continue;
				}

				$key = $fieldDef['key'];
				$preparedFieldDef = $fieldDef;

				if (is_array($miscFields) && array_key_exists($key, $miscFields)) {
					$preparedFieldDef['default'] = $miscFields[$key];
				} elseif (!array_key_exists('default', $preparedFieldDef)) {
					$fieldType = $fieldDef['type'] ?? 'text';
					$preparedFieldDef['default'] = match ($fieldType) {
						'number', 'integer', 'int' => 0,
						'boolean', 'bool', 'checkbox' => false,
						'array', 'multiselect', 'users', 'json' => [],
						'datetime' => null,
						default => '',
					};
				}

				$preparedFieldDefinitions[] = $preparedFieldDef;
			}

			if (!empty($preparedFieldDefinitions)) {
				$this->inquiryGroupMapper->saveDynamicFields($inquiryGroup, $preparedFieldDefinitions);
			}
		}

		$this->setBasicPermissions($inquiryGroup);

		return $inquiryGroup;
	}

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
		?string $visibility = null,
		?array $visibilityGroups = null,
		?array $visibilityUsers = null,
	): InquiryGroup {
		try {
			$inquiryGroup = $this->inquiryGroupMapper->find($inquiryGroupId);

			if (!$inquiryGroup->getAllowEdit() && !$this->userSession->isAdmin()) {
				throw new ForbiddenException('You do not have permission to edit this inquiry group');
			}

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
				$inquiryGroup->setProtected($protected);
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
			if ($visibility !== null) {
				$inquiryGroup->setVisibility($visibility);
			}

			if ($visibilityGroups !== null) {
				$inquiryGroup->setVisibilityGroups($visibilityGroups);
				$this->inquiryGroupMapper->saveVisibilityGroups($inquiryGroup);
			}

			if ($visibilityUsers !== null) {
				$inquiryGroup->setVisibilityUsers($visibilityUsers);
				$this->inquiryGroupMapper->saveVisibilityUsers($inquiryGroup);
			}

			$inquiryGroup = $this->inquiryGroupMapper->update($inquiryGroup);

			if ($miscFields !== null && !empty($miscFields)) {
				$currentType = $type ?? $inquiryGroup->getType();
				$fieldsDefinition = $this->getFields($currentType);
				$this->inquiryGroupMapper->updateDynamicFields($inquiryGroup, $miscFields, $fieldsDefinition);
			}

			$this->enrichInquiryGroup($inquiryGroup, true, false);

			return $inquiryGroup;
		} catch (DoesNotExistException $e) {
			throw new NotFoundException('Inquiry group not found');
		}
	}

	public function updateInquiryGroup(
		int $inquiryGroupId,
		string $name,
		?string $titleExt = null,
		?string $description = null,
		?array $miscFields = null,
	): InquiryGroup {
		return $this->updateGroup(
			$inquiryGroupId,
			title: $name,
			titleExt: $titleExt,
			description: $description,
			miscFields: $miscFields
		);
	}

	public function deleteGroup(int $inquiryGroupId): bool
	{
		try {
			$inquiryGroup = $this->inquiryGroupMapper->find($inquiryGroupId);

			if (!$inquiryGroup->getAllowEdit() && !$this->userSession->isAdmin()) {
				throw new ForbiddenException('You do not have permission to delete this inquiry group');
			}

			if ($inquiryGroup->getProtected()) {
				throw new ForbiddenException('Cannot delete a protected inquiry group');
			}

			$this->inquiryGroupMapper->delete($inquiryGroup);
			return true;
		} catch (DoesNotExistException $e) {
			throw new NotFoundException('Inquiry group not found');
		}
	}

	public function softDeleteInquiryGroup(int $inquiryGroupId): InquiryGroup
	{
		try {
			$inquiryGroup = $this->inquiryGroupMapper->find($inquiryGroupId);
		} catch (DoesNotExistException $e) {
			throw new NotFoundException('Inquiry group not found');
		}

		if (!$inquiryGroup->getAllowEdit() && !$this->userSession->isAdmin()) {
			throw new ForbiddenException('You do not have permission to delete this inquiry group');
		}

		$inquiryGroup->setDeleted(time());
		$inquiryGroup = $this->inquiryGroupMapper->update($inquiryGroup);
		$this->enrichInquiryGroup($inquiryGroup, true, false);

		return $inquiryGroup;
	}

	public function archiveGroup(int $inquiryGroupId): InquiryGroup
	{
		return $this->updateGroup($inquiryGroupId, groupStatus: InquiryGroup::STATUS_ARCHIVED);
	}

	public function restoreGroup(int $inquiryGroupId): InquiryGroup
	{
		return $this->updateGroup($inquiryGroupId, groupStatus: InquiryGroup::STATUS_ACTIVE);
	}

	public function reorderInquiries(int $inquiryGroupId, array $inquiryIds): InquiryGroup
	{
		try {
			$inquiryGroup = $this->inquiryGroupMapper->find($inquiryGroupId);
		} catch (DoesNotExistException $e) {
			throw new NotFoundException('Inquiry group not found');
		}

		if (!$inquiryGroup->getAllowEdit() && !$this->userSession->isAdmin()) {
			throw new ForbiddenException('You do not have permission to reorder inquiries in this group');
		}

		$this->inquiryGroupMapper->updateInquiryOrder($inquiryGroupId, $inquiryIds);

		$inquiryGroup = $this->inquiryGroupMapper->find($inquiryGroupId);
		$this->enrichInquiryGroup($inquiryGroup, true, false);

		return $inquiryGroup;
	}

	public function changeOwner(int $inquiryGroupId, string $newOwnerId): InquiryGroup
	{
		try {
			$inquiryGroup = $this->inquiryGroupMapper->find($inquiryGroupId);
		} catch (DoesNotExistException $e) {
			throw new NotFoundException('Inquiry group not found');
		}

		if ($inquiryGroup->getOwner() !== $this->userSession->getCurrentUserId() && !$this->userSession->isAdmin()) {
			throw new ForbiddenException('Only the owner or admin can change the owner of this inquiry group');
		}

		$newOwner = $this->userManager->get($newOwnerId);
		if (!$newOwner) {
			throw new NotFoundException('New owner not found');
		}

		$inquiryGroup->setOwner($newOwnerId);
		$inquiryGroup = $this->inquiryGroupMapper->update($inquiryGroup);
		$this->enrichInquiryGroup($inquiryGroup, true, false);

		return $inquiryGroup;
	}

	public function cloneGroup(int $inquiryGroupId, ?array $miscFields = null): InquiryGroup
	{
		try {
			$originalGroup = $this->inquiryGroupMapper->find($inquiryGroupId);
		} catch (DoesNotExistException $e) {
			throw new NotFoundException('Inquiry group not found');
		}

		if (!$originalGroup->getAllowEdit() && $this->userSession->getCurrentUser() === null) {
			throw new ForbiddenException('You do not have permission to clone this inquiry group');
		}

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

		$currentUser = $this->userSession->getCurrentUser();
		if ($currentUser) {
			$clonedGroup->setOwner($this->userSession->getCurrentUserId());
		}

		$clonedGroup = $this->inquiryGroupMapper->insert($clonedGroup);

		$fieldsDefinition = $this->getFields($clonedGroup->getType());
		if (!empty($fieldsDefinition)) {
			$this->inquiryGroupMapper->saveDynamicFields(
				$clonedGroup,
				$fieldsDefinition,
				$miscFields
			);
		}

		foreach ($originalGroup->getInquiryIds() as $inquiryId) {
			try {
				$this->inquiryGroupMapper->addInquiryToGroup($inquiryId, $clonedGroup->getId());
			} catch (Exception $e) {
				$this->logger->warning('Failed to clone inquiry into cloned group', [
					'inquiryId' => $inquiryId,
					'groupId' => $clonedGroup->getId(),
					'exception' => $e,
				]);
			}
		}

		$this->setBasicPermissions($clonedGroup);

		return $clonedGroup;
	}

	public function addInquiryToInquiryGroup(
		int $inquiryId,
		?int $inquiryGroupId = null,
		?string $inquiryGroupName = null,
	): InquiryGroup {
		$inquiry = $this->inquiryMapper->get($inquiryId, withRoles: true);
		$inquiry->request(Inquiry::PERMISSION_INQUIRY_VIEW);

		if ($inquiryGroupId === null && $inquiryGroupName !== null && $inquiryGroupName !== '') {
			if (!$this->appSettings->getInquiryCreationAllowed()) {
				throw new ForbiddenException('Inquiry group creation is disabled');
			}

			$inquiryGroup = new InquiryGroup();
			$inquiryGroup->setTitle($inquiryGroupName);
			$inquiryGroup->setTitleExt($inquiryGroupName);
			$inquiryGroup->setType('default');
			$inquiryGroup->setParentId(0);
			$inquiryGroup->setProtected(false);
			$inquiryGroup->setGroupStatus('draft');
			$inquiryGroup->setOwnedGroup('');
			$inquiryGroup->setDescription('');
			$inquiryGroup->setCreated(time());

			$currentUser = $this->userSession->getCurrentUser();
			if ($currentUser) {
				$inquiryGroup->setOwner($this->userSession->getCurrentUserId());
			}

			$inquiryGroup = $this->inquiryGroupMapper->insert($inquiryGroup);
			$this->setBasicPermissions($inquiryGroup);
		} elseif ($inquiryGroupId !== null) {
			try {
				$inquiryGroup = $this->inquiryGroupMapper->find($inquiryGroupId);
			} catch (DoesNotExistException $e) {
				throw new NotFoundException('Inquiry group not found');
			}
			$inquiryGroup->request(InquiryGroup::PERMISSION_EDIT);
			$this->enrichInquiryGroup($inquiryGroup, false, false);
		} else {
			throw new InsufficientAttributesException('An existing inquiry group id must be provided or a new inquiry group name must be given.');
		}

		if (!$inquiryGroup->hasInquiry($inquiryId)) {
			try {
				$this->inquiryGroupMapper->addInquiryToGroup($inquiryId, $inquiryGroup->getId());
			} catch (Exception $e) {
				if ($e->getReason() !== Exception::REASON_UNIQUE_CONSTRAINT_VIOLATION) {
					throw $e;
				}
			}

			$this->eventDispatcher->dispatchTyped(new InquiryUpdatedEvent($inquiry));
		}

		$inquiryGroup = $this->inquiryGroupMapper->find($inquiryGroup->getId());
		$this->enrichInquiryGroup($inquiryGroup, false, false);

		return $inquiryGroup;
	}

	public function removeInquiryFromInquiryGroup(
		int $inquiryId,
		int $inquiryGroupId,
	): ?InquiryGroup {
		$inquiry = $this->inquiryMapper->get($inquiryId);

		try {
			$inquiryGroup = $this->inquiryGroupMapper->find($inquiryGroupId);
		} catch (DoesNotExistException $e) {
			throw new NotFoundException('Inquiry group not found');
		}

		$this->enrichInquiryGroup($inquiryGroup, false, false);

		if (!$inquiryGroup->getAllowEdit() && !$this->userSession->isAdmin()) {
			throw new ForbiddenException('You do not have permission to remove inquiries from this group');
		}

		if (!$inquiryGroup->hasInquiry($inquiryId)) {
			throw new NotFoundException('Inquiry not found in group');
		}

		$this->inquiryGroupMapper->removeInquiryFromGroup($inquiryId, $inquiryGroupId);
		$this->eventDispatcher->dispatchTyped(new InquiryUpdatedEvent($inquiry));

		if ($this->inquiryGroupMapper->countInquiriesInGroup($inquiryGroupId) === 0) {
			$this->inquiryGroupMapper->delete($inquiryGroup);
			return null;
		}

		$inquiryGroup = $this->inquiryGroupMapper->find($inquiryGroupId);
		$this->enrichInquiryGroup($inquiryGroup, false, false);

		return $inquiryGroup;
	}

	private function enrichInquiryGroup(InquiryGroup $inquiryGroup, bool $withMiscFields = true, bool $withChildren = false): void
	{
		if ($withMiscFields) {
			$this->inquiryGroupMapper->loadFieldsMisc($inquiryGroup);
		}

		$inquiryIds = $this->inquiryGroupMapper->getInquiryIdsForGroup($inquiryGroup->getId());
		$inquiryGroup->setInquiryIds($inquiryIds);

		if ($withChildren) {
			$childGroups = $this->inquiryGroupMapper->findByParentId($inquiryGroup->getId());
			$inquiryGroup->setChilds($childGroups);
		} else {
			$inquiryGroup->setChilds([]);
		}

		$this->setBasicPermissions($inquiryGroup);
	}

	private function setBasicPermissions(InquiryGroup $inquiryGroup): void
	{
		$currentUser = $this->userSession->getCurrentUser();
		$isOwner = $currentUser && $inquiryGroup->getOwner() === $this->userSession->getCurrentUserId();
		$isAdmin = $this->userSession->isAdmin();

		$allowEdit = $isOwner || $isAdmin;
		$inquiryGroup->setAllowEdit($allowEdit);
	}

	/**
	 * @return InquiryGroup[]
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
	 * @return InquiryGroup[]
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
	 * @return InquiryGroup[]
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
	 * @return InquiryGroup[]
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
	 * @return InquiryGroup[]
	 */
	public function getChildGroups(int $parentId, bool $withMiscFields = false): array
	{
		$inquiryGroups = $this->inquiryGroupMapper->findByParentId($parentId);
		foreach ($inquiryGroups as $inquiryGroup) {
			$this->enrichInquiryGroup($inquiryGroup, $withMiscFields, false);
		}
		return $inquiryGroups;
	}

	public function getFields(string $inquiryGroupType): array
	{
		return $this->inquiryGroupTypeMapper->getFields($inquiryGroupType);
	}

	public function getAllowedResponse(string $inquiryGroupType): array
	{
		return $this->inquiryGroupTypeMapper->getAllowedResponse($inquiryGroupType);
	}

	public function updateMiscFields(int $inquiryGroupId, array $miscFields): InquiryGroup
	{
		try {
			$inquiryGroup = $this->inquiryGroupMapper->find($inquiryGroupId);
		} catch (DoesNotExistException $e) {
			throw new NotFoundException('Inquiry group not found');
		}

		if (!$inquiryGroup->getAllowEdit() && !$this->userSession->isAdmin()) {
			throw new ForbiddenException('You do not have permission to edit this inquiry group');
		}

		$fieldsDefinition = $this->getFields($inquiryGroup->getType());
		$this->inquiryGroupMapper->updateDynamicFields($inquiryGroup, $miscFields, $fieldsDefinition);

		$inquiryGroup = $this->inquiryGroupMapper->get($inquiryGroupId, false, true);
		$this->enrichInquiryGroup($inquiryGroup, true, false);

		return $inquiryGroup;
	}

	public function saveMiscFields(int $inquiryGroupId, array $miscFields): InquiryGroup
	{
		try {
			$inquiryGroup = $this->inquiryGroupMapper->find($inquiryGroupId);
		} catch (DoesNotExistException $e) {
			throw new NotFoundException('Inquiry group not found');
		}

		if (!$inquiryGroup->getAllowEdit() && !$this->userSession->isAdmin()) {
			throw new ForbiddenException('You do not have permission to edit this inquiry group');
		}

		$fieldsDefinition = $this->getFields($inquiryGroup->getType());
		$this->inquiryGroupMapper->saveDynamicFields($inquiryGroup, $fieldsDefinition, $miscFields);

		$inquiryGroup = $this->inquiryGroupMapper->get($inquiryGroupId, false, true);
		$this->enrichInquiryGroup($inquiryGroup, true, false);

		return $inquiryGroup;
	}

	public function getMiscFields(int $inquiryGroupId): array
	{
		$inquiryGroup = $this->inquiryGroupMapper->get($inquiryGroupId, false, true);
		$this->enrichInquiryGroup($inquiryGroup, true, false);
		return $inquiryGroup->getMiscArray();
	}

	public function getWithFullEnrichment(int $inquiryGroupId): InquiryGroup
	{
		$inquiryGroup = $this->inquiryGroupMapper->get($inquiryGroupId, false, true);
		$this->enrichInquiryGroup($inquiryGroup, true, true);
		return $inquiryGroup;
	}
}
