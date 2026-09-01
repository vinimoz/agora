<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\Inquiry;
use OCA\Agora\Db\InquiryMapper;
use OCA\Agora\Db\InquiryStatusMapper;
use OCA\Agora\Db\InquiryTypeMapper;
use OCA\Agora\Db\ParticipationMapper;
use OCA\Agora\Dto\InquiryDto;
use OCA\Agora\Db\UserMapper;
use OCA\Agora\Db\SupportMapper;
use OCA\Agora\Service\TrendingService;
use OCA\Agora\Service\ParticipationService;
use OCA\Agora\Event\InquiryArchivedEvent;
use OCA\Agora\Event\InquiryCloseEvent;
use OCA\Agora\Event\InquiryCreatedEvent;
use OCA\Agora\Event\InquiryDeletedEvent;
use OCA\Agora\Event\InquiryOwnerChangeEvent;
use OCA\Agora\Event\InquiryReopenEvent;
use OCA\Agora\Event\InquiryRestoredEvent;
use OCA\Agora\Event\InquiryUpdatedEvent;
use OCA\Agora\Exceptions\AlreadyDeletedException;
use OCA\Agora\Exceptions\EmptyTitleException;
use OCA\Agora\Exceptions\ForbiddenException;
use OCA\Agora\Exceptions\InvalidAccessException;
use OCA\Agora\Exceptions\InvalidShowResultsException;
use OCA\Agora\Exceptions\InvalidUsernameException;
use OCA\Agora\Exceptions\NotFoundException;
use OCA\Agora\Exceptions\UserNotFoundException;
use OCA\Agora\Model\Settings\AppSettings;
use OCA\Agora\Model\UserBase;
use OCA\Agora\UserSession;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\Search\ISearchQuery;
use OCP\IGroupManager; 
use Psr\Log\LoggerInterface;

class InquiryService
{
	public function __construct(
		private AppSettings $appSettings,
		private IEventDispatcher $eventDispatcher,
		private Inquiry $inquiry,
		private InquiryMapper $inquiryMapper,
		private InquiryStatusMapper $inquiryStatusMapper,
		private InquiryTypeMapper $inquiryTypeMapper,
		private ParticipationMapper $participationMapper,
		private UserMapper $userMapper,
		private UserSession $userSession,
		private SupportMapper $supportMapper,
		private SettingsService $settings,
		private TrendingService $trendingService,
		private ParticipationService $participationService,
		private IGroupManager $groupManager, 
		private OptionService $optionService,
		private LoggerInterface $logger,
	) {
	}

	/**
	 * Get list of inquiries
	 */
	public function listInquiries(): array
	{
		$inquiryList = $this->inquiryMapper->findForMe($this->userSession->getCurrentUserId());

		

		if ($this->userSession->getCurrentUser()->getIsAdmin()) {
			return $inquiryList;
		}

		return array_values(
			array_filter(
				$inquiryList,
				function (Inquiry $inquiry): bool {
					return $inquiry->getIsAllowed(Inquiry::PERMISSION_INQUIRY_VIEW);
				}
		)
		);
	}

	public function get(int $inquiryId, $lightweight = false)
	{
		try {
			if ($lightweight) {
				$this->inquiry = $this->inquiryMapper->get($inquiryId, withRoles: true);
			} else {
				$this->inquiry = $this->inquiryMapper->find($inquiryId);
			}

			$this->inquiry->request(Inquiry::PERMISSION_INQUIRY_VIEW);
			/*
			// No more setting family here - it's already joined in the query!
			if ($inquiry->getParticipationPolicy() === null) {
				$participation = $this->participationMapper->findByTarget('inquiry', $inquiryId);
				if ($participation !== null) {
					$inquiry->setParticipationPolicy($participation);
				}
			}*/
			return $this->inquiry;
		} catch (DoesNotExistException $e) {
			throw new NotFoundException('Inquiry not found');
		}
	}

	public function getChildsInquiryIds(int $inquiryId)
	{
		try {
			$childInquiryIds = $this->inquiryMapper->getChildInquiryIds($inquiryId);

			$children = [];
			foreach ($childInquiryIds as $childId) {
				$childInquiry = $this->inquiryMapper->find($childId, true);
				// No more setting family here either!
				$children[] = $childInquiry;
			}

			return $children;
		} catch (DoesNotExistException $e) {
			throw new NotFoundException('Inquiry children not found for inquiry parent');
		}
	}


	/**
	 * Get list of inquiries
	 */
	public function search(ISearchQuery $query): array
	{
		$inquiryList = [];
		try {
			$inquiries = $this->inquiryMapper->search($query);

			foreach ($inquiries as $inquiry) {
				try {
					$inquiry->request(Inquiry::PERMISSION_INQUIRY_VIEW);
					$inquiryList[] = $inquiry;
				} catch (ForbiddenException $e) {
					continue;
				}
			}
		} catch (DoesNotExistException $e) {
			// silent catch
		}
		return $inquiryList;
	}

	/**
	 * Get list of inquiries
	 *
	 * @return Inquiry[]
	 */
	public function listForAdmin(): array
	{
		$inquiryList = [];
		if ($this->userSession->getCurrentUser()->getIsAdmin()) {
			try {
				$inquiryList = $this->inquiryMapper->findForAdmin($this->userSession->getCurrentUserId());
			} catch (DoesNotExistException $e) {
				// silent catch
			}
		}
		return $inquiryList;
	}

	/**
	 * @return       Inquiry[]
	 * @psalm-return array<Inquiry>
	 */
	public function transferInquiries(string $sourceUserId, string $targetUserId): array
	{
		try {
			$targetUser = $this->userMapper->getUserFromUserBase($targetUserId);
		} catch (UserNotFoundException $e) {
			throw new InvalidUsernameException('The user id "' . $targetUserId . '" for the target user is not valid.');
		}

		$inquiriesToTransfer = $this->inquiryMapper->listByOwner($sourceUserId);

		foreach ($inquiriesToTransfer as &$inquiry) {
			$inquiry = $this->transferInquiry($inquiry, $targetUser);
		}
		return $inquiriesToTransfer;
	}

	/**
	 * Update inquiry configuration
	 *
	 * @return Inquiry
	 */
	public function takeover(int $inquiryId, ?UserBase $targetUser = null): Inquiry
	{
		if ($targetUser === null) {
			$targetUser = $this->userSession->getCurrentUser();
		}
		return $this->transferInquiry($inquiryId, $targetUser);
	}

	/**
	 * Transfer ownership of a inquiry
	 *
	 * @param int|Inquiry     $inquiry    inquiry or inquiryId of inquiry to transfer ownership
	 * @param string|UserBase $targetUser User to transfer inquiries to. If null the current user will be used
	 */
	public function transferInquiry(int|Inquiry $inquiry, string|UserBase $targetUser): Inquiry
	{
		if (!($inquiry instanceof Inquiry)) {
			$inquiry = $this->inquiryMapper->get($inquiry, withRoles: true);
		}

		$inquiry->request(Inquiry::PERMISSION_INQUIRY_CHANGE_OWNER);

		if (!($targetUser instanceof UserBase)) {
			$userId = $targetUser;
			try {
				$targetUser = $this->userMapper->getUserFromUserBase($userId);
			} catch (UserNotFoundException $e) {
				// to keep psalm quiet
				throw new InvalidUsernameException('The user id "' . $userId . '" for the target user is not valid.');
			}
		}

		$oldOwner = $inquiry->getOwner();

		$inquiry->setOwner($targetUser->getId());
		$inquiry = $this->inquiryMapper->update($inquiry);

		$this->eventDispatcher->dispatchTyped(new InquiryOwnerChangeEvent($inquiry, $oldOwner, $inquiry->getOwner()));

		return $inquiry;
	}

	public function getInquiryOwnerFromDB(int $inquiryId): UserBase
	{
		try {
			$inquiry = $this->inquiryMapper->get($inquiryId, withRoles: true);
			return $inquiry->getUser();
		} catch (DoesNotExistException $e) {
			throw new NotFoundException('Inquiry not found');
		}
	}

	/**
	 * Get fields configuration for specific inquiry type
	 */
	public function getFields(string $inquiryType): array
	{
		return $this->inquiryTypeMapper->getFields($inquiryType);
	}

	/**
	 * Get allowed response configuration for specific inquiry type
	 */
	public function getAllowedResponse(string $inquiryType): array
	{
		return $this->inquiryTypeMapper->getAllowedResponse($inquiryType);
	}

	/**
	 * Get allowed option type configuration for specific inquiry type
	 */
	public function getAllowedOptionType(string $inquiryType): array
	{
		return $this->inquiryTypeMapper->getAllowedOptiontype($inquiryType);
	}

	/**
	 * Get allowed transformation configuration for specific inquiry type
	 */
	public function getAllowedTransformation(string $inquiryType): array
	{
		return $this->inquiryTypeMapper->getAllowedTransformation($inquiryType);
	}

	/**
	 * Create a new inquiry from DTO
	 *
	 * @param  InquiryDto $dto
	 * @return Inquiry
	 * @throws \RuntimeException
	 */
	public function createFromDto(InquiryDto $dto): Inquiry
	{

		if (!$this->appSettings->getInquiryCreationAllowed()) {
			throw new ForbiddenException('Inquiry creation is disabled');
		}

		if (!$dto->title) {
			throw new EmptyTitleException('Title must not be empty');
		}


		$timestamp = time();
		$this->inquiry = new Inquiry();
		$this->inquiry->setTitle($dto->title);
		$this->inquiry->setType($dto->type);
		$this->inquiry->setFamily($dto->family);
		$this->inquiry->setOwnedGroup($dto->ownedGroup);
		$this->inquiry->setCreated($timestamp);
		$this->inquiry->setLastInteraction($timestamp);
		$this->inquiry->setOwner($this->userSession->getCurrentUserId());
		$this->inquiry->setParentId($dto->parentId);
		$this->inquiry->setLocationId($dto->locationId);
		$this->inquiry->setCategoryId($dto->categoryId);
		$this->inquiry->setVisibility(Inquiry::VISIBILITY_PRIVATE); 
		// Optional fields with defaults
		$this->inquiry->setDescription($dto->description ?? '');
		if ($this->appSettings->getAutoExpireEnabled()) {
			$expireDays = $this->appSettings->getAutoExpireOffsetDays();
			$expireTimestamp = $timestamp + ($expireDays * 24 * 60 * 60);
		} else {
			$expireTimestamp = 0;
		}
		$this->inquiry->setExpire($expireTimestamp);
		$this->inquiry->setShowResults(Inquiry::SHOW_RESULTS_ALWAYS);

		$this->inquiry = $this->inquiryMapper->insert($this->inquiry);


		// Get fields configuration for this inquiry type
		$fieldsDefinition = $this->getFields($dto->type);
		$inquiryId = $this->inquiry->getId();

		if (!empty($fieldsDefinition) && is_array($fieldsDefinition) && !empty($dto->miscFields)) {
			foreach ($fieldsDefinition as &$fieldDef) {
				$key = $fieldDef['key'];
				if (array_key_exists($key, $dto->miscFields)) {
					$fieldDef['default'] = $dto->miscFields[$key];
				}
			}
			unset($fieldDef);
		}


		$this->inquiryMapper->saveDynamicFields($this->inquiry, $fieldsDefinition);

		$this->eventDispatcher->dispatchTyped(new InquiryCreatedEvent($this->inquiry));

		return $this->inquiry;
	}

	/**
	 * Validate that group IDs exist in Nextcloud
	 */
	private function validateGroups(array $groupIds): array
	{
		$validGroups = [];
		foreach ($groupIds as $groupId) {
			if ($this->groupManager->groupExists($groupId)) {
				$validGroups[] = $groupId;
			}
		}
		return $validGroups;
	}


	public function updateVisibility(int $inquiryId, string $visibility, ?array $groups = null): Inquiry
	{
		$this->inquiry = $this->inquiryMapper->find($inquiryId);
		$this->inquiry->request(Inquiry::PERMISSION_INQUIRY_EDIT);

		if (!in_array($visibility, $this->getValidVisibility())) {
			throw new InvalidAccessException('Invalid visibility type');
		}

		$this->inquiry->setVisibility($visibility);

		if ($visibility === Inquiry::VISIBILITY_GROUPS && is_array($groups)) {
			$validGroups = $this->validateGroups($groups);
			$this->inquiry->setVisibilityGroups($validGroups);
			$this->inquiryMapper->saveVisibilityGroups($this->inquiry);
		} else {
			$this->inquiry->setVisibilityGroups([]);
			$this->inquiryMapper->saveVisibilityGroups($this->inquiry);
		}

		// Clear user visibility if switching from users
		if ($visibility !== Inquiry::VISIBILITY_USERS) {
			$this->inquiry->setVisibilityUsers([]);
			$this->inquiryMapper->saveUserVisibility($this->inquiry);
		}

		$this->inquiry = $this->inquiryMapper->update($this->inquiry);
		$this->eventDispatcher->dispatchTyped(new InquiryUpdatedEvent($this->inquiry));

		return $this->inquiry;
	}

	/**
	 * Partially update an inquiry from DTO
	 *
	 * @param  int        $id
	 * @param  InquiryDto $dto
	 * @return Inquiry
	 * @throws DoesNotExistException|MultipleObjectsReturnedException|\RuntimeException
	 */
	public function updatePartial(int $inquiryId, InquiryDto $dto): Inquiry
	{
		$this->inquiry = $this->inquiryMapper->find($inquiryId);
		if ($dto->type != Inquiry::TYPE_DEBATE) {
			$this->inquiry->request(Inquiry::PERMISSION_INQUIRY_EDIT);
		}

		$inquiryConfiguration = $dto->configuration ?? [];

		// Validate values
		if (isset($inquiryConfiguration['showResults']) && !in_array($inquiryConfiguration['showResults'], $this->getValidShowResults())) {
			throw new InvalidShowResultsException('Invalid value for prop showResults');
		}

		if (isset($inquiryConfiguration['title']) && !$inquiryConfiguration['title']) {
			throw new EmptyTitleException('Title must not be empty');
		}

		// Set the expiry time to the actual servertime to avoid an
		// expiry misinterpration when using permission checks
		if (isset($inquiryConfiguration['expire']) && $inquiryConfiguration['expire'] < 0) {
			$inquiryConfiguration['expire'] = time();
		}

		$timestamp = time();

		// Update only provided fields
		if ($dto->title !== null) {
			$this->inquiry->setTitle($dto->title);
		}

		if ($dto->description !== null) {
			$this->inquiry->setDescription($dto->description);
		}

		$this->inquiry->setLastInteraction($timestamp);
		$this->inquiry->setParentId($dto->parentId);
		$this->inquiry->setLocationId($dto->locationId);
		$this->inquiry->setCategoryId($dto->categoryId);
		$this->inquiry = $this->inquiryMapper->update($this->inquiry);

		// Update misc fields if provided
		$fields = $this->getFields($this->inquiry->getType());
		if ($dto->miscFields) {
			$this->inquiryMapper->updateDynamicFields($this->inquiry, $dto->miscFields, $fields);
		}

		$this->eventDispatcher->dispatchTyped(new InquiryUpdatedEvent($this->inquiry));

		return $this->inquiry;
	}


	/**
	 * Get valid values for visibility - FIXED
	 */
	private function getValidVisibility(): array
	{
		return [
			Inquiry::VISIBILITY_PRIVATE,
			Inquiry::VISIBILITY_EVERYONE,
			Inquiry::VISIBILITY_GROUPS,
			Inquiry::VISIBILITY_PARTICIPANTS
		];
	}

	/**
	 * Get valid values for showResult
	 */
	private function getValidShowResults(): array
	{
		return [
			Inquiry::SHOW_RESULTS_ALWAYS,
			Inquiry::SHOW_RESULTS_CLOSED,
			Inquiry::SHOW_RESULTS_NEVER
		];
	}

	/**
	 * Update inquiry configuration
	 *
	 * @return Inquiry
	 */
	public function updateConfig(int $inquiryId, array $inquiryConfiguration): Inquiry
	{
		$this->inquiry = $this->inquiryMapper->find($inquiryId);
		$this->inquiry->request(Inquiry::PERMISSION_INQUIRY_EDIT);

		// Validate values
		if (isset($inquiryConfiguration['showResults']) && !in_array($inquiryConfiguration['showResults'], $this->getValidShowResults())) {
			throw new InvalidShowResultsException('Invalid value for prop showResults');
		}


		if (isset($inquiryConfiguration['visibility'])) {
			$visibility = $inquiryConfiguration['visibility'];
			if (!in_array($visibility, $this->getValidVisibility())) {
				throw new InvalidAccessException('Invalid value for prop visibility: ' . $visibility);
			}
			$this->inquiry->setVisibility($visibility);
		}

		if ($visibility === Inquiry::VISIBILITY_GROUPS && isset($inquiryConfiguration['visibilityGroups'])) {
			$groups = $inquiryConfiguration['visibilityGroups'];
			if (is_array($groups)) {
				// Validate group IDs exist
				$validGroups = $this->validateGroups($groups);
				$this->inquiry->setVisibilityGroups($validGroups);
				$this->inquiryMapper->saveVisibilityGroups($this->inquiry);
			}
		} elseif ($visibility !== Inquiry::VISIBILITY_GROUPS) {
			// Clear groups if visibility is not 'groups'
			$this->inquiry->setVisibilityGroups([]);
			$this->inquiryMapper->saveVisibilityGroups($this->inquiry);
		}

	$this->logger->debug(
		'DEBUG allowComment = ' . var_export($inquiryConfiguration['allowComment'] ?? 'KEY_MISSING', true),
		['app' => 'agora']
	);

	if (array_key_exists('allowComment', $inquiryConfiguration)) {
		$value = $inquiryConfiguration['allowComment'];

		if ($value === null) {
			$this->inquiry->setAllowComment(null);
		} elseif (!$value) {
			$this->inquiry->setAllowComment(0);
		} else {
			$this->inquiry->setAllowComment(1);
		}
	}


	if (isset($inquiryConfiguration['expire'])) {
		$this->inquiry->setExpire($inquiryConfiguration['expire']);
	}


	if (isset($inquiryConfiguration['forceConfidentialComments'])) {
		$this->inquiry->setForceConfidentialComments($inquiryConfiguration['forceConfidentialComments'] ? 1 : 0);
	}


	if (isset($inquiryConfiguration['supportFeature'])) {
		$this->inquiry->setSupportFeature($inquiryConfiguration['supportFeature']);
	}

	if (isset($inquiryConfiguration['showResults'])) {
		$this->inquiry->setShowResults($inquiryConfiguration['showResults']);
	}


	$this->inquiry = $this->inquiryMapper->update($this->inquiry);

	$this->eventDispatcher->dispatchTyped(new InquiryUpdatedEvent($this->inquiry));

	return $this->inquiry;
}

/**
 * Manually lock anonymization
 *
 * @return Inquiry
 */
public function lockAnonymous(int $inquiryId): Inquiry
{
	$this->inquiry = $this->inquiryMapper->find($inquiryId);

	// Only possible, if inquiry is already anonymized
	if ($this->inquiry->getAnonymous() < 1) {
		throw new ForbiddenException('Anonymization is not allowed');
	}

	// Only possible, if user is allowed to deanonymize
	$this->inquiry->request(Inquiry::PERMISSION_DEANONYMIZE);

	$this->inquiry->setAnonymous(-1);
	$this->inquiry = $this->inquiryMapper->update($this->inquiry);

	$this->eventDispatcher->dispatchTyped(new InquiryUpdatedEvent($this->inquiry));

	return $this->inquiry;
}

/**
 * Update timestamp for last interaction with inquiries
 */
public function setLastInteraction(int $inquiryId): void
{
	if ($inquiryId) {
		$this->inquiryMapper->setLastInteraction($inquiryId);
	}
}

/**
 * Move to archive or restore with optional recursive functionality
 *
 * @return array [inquiry: Inquiry, archivedCount: int]
 */
public function toggleArchiveRecursive(int $inquiryId, bool $archiveState = null): array
{
    // Get the inquiry
    $this->inquiry = $this->inquiryMapper->find($inquiryId);
    $this->inquiry->request(Inquiry::PERMISSION_INQUIRY_DELETE);

    // Determine archive state if not provided
    if ($archiveState === null) {
        $archiveState = !$this->inquiry->getArchived();
    }

    $archivedTime = $archiveState ? time() : 0;
    $archivedCount = 1;

    try {
        // Archive/restore this inquiry - ONLY set archived, NOT deleted!
        $this->inquiry->setArchived($archivedTime);
        // DO NOT setDeleted() - that's for permanent deletion
        $this->inquiry->setLastInteraction(time());

        if ($archiveState) {
            $this->eventDispatcher->dispatchTyped(new InquiryArchivedEvent($this->inquiry));
        } else {
            $this->eventDispatcher->dispatchTyped(new InquiryRestoredEvent($this->inquiry));
        }

        $this->inquiry = $this->inquiryMapper->update($this->inquiry);

        // Archive/restore all options for this inquiry
        $options = $this->optionService->getByTargetId($inquiryId);
        foreach ($options as $option) {
            try {
                $result = $this->optionService->toggleArchiveRecursive($option->getId(), $archiveState);
                $archivedCount += $result['archivedCount'];
            } catch (\Exception $e) {
                $this->logger->error("Failed to archive/restore option {$option->getId()}: " . $e->getMessage());
            }
        }

        // RECURSION: Call the same method on each child inquiry
        $childIds = $this->inquiryMapper->getChildInquiryIds($inquiryId);
        foreach ($childIds as $childId) {
            try {
                $result = $this->toggleArchiveRecursive($childId, $archiveState);
                $archivedCount += $result['archivedCount'];
            } catch (ForbiddenException $e) {
                $this->logger->error("Permission denied for child inquiry {$childId}: " . $e->getMessage());
                continue;
            } catch (\Exception $e) {
                $this->logger->error("Error processing child inquiry {$childId}: " . $e->getMessage());
                continue;
            }
        }

        return [
            'inquiry' => $this->inquiry,
            'archivedCount' => $archivedCount
        ];
    } catch (\Exception $e) {
        throw $e;
    }
}

/**
 * Move to archive or restore
 *
 * @return Inquiry
 */
public function toggleArchive(int $inquiryId): Inquiry
{
	$this->inquiry = $this->inquiryMapper->find($inquiryId);
	$this->inquiry->request(Inquiry::PERMISSION_INQUIRY_DELETE);

	$this->inquiry->setArchived($this->inquiry->getArchived() ? 0 : time());

	if ($this->inquiry->getArchived()) {
		$this->eventDispatcher->dispatchTyped(new InquiryArchivedEvent($this->inquiry));
		$this->inquiry->setPublicationStatus('archived');
	} else {
		$this->eventDispatcher->dispatchTyped(new InquiryRestoredEvent($this->inquiry));
		$this->inquiry->setPublicationStatus('published');
	}
	$this->inquiry = $this->inquiryMapper->update($this->inquiry);

	return $this->inquiry;
}

/**
 * Delete inquiry
 *
 * @return Inquiry
 */
/**
 * Delete inquiry with recursive deletion
 * Simple recursion: calls itself on each child
 *
 * @return Inquiry
 */
public function delete(int $inquiryId): Inquiry
{
    try {
        $this->inquiry = $this->inquiryMapper->get($inquiryId, withRoles: true);
    } catch (DoesNotExistException $e) {
        throw new AlreadyDeletedException('Inquiry not found, assume already deleted');
    }

    $this->inquiry->request(Inquiry::PERMISSION_INQUIRY_DELETE);

    // RECURSION: Delete all child inquiries first (bottom-up)
    $childIds = $this->inquiryMapper->getChildInquiryIds($inquiryId);
    foreach ($childIds as $childId) {
        try {
            $this->delete($childId); // Recursive call
        } catch (ForbiddenException $e) {
            $this->logger->error("Permission denied for child inquiry {$childId}: " . $e->getMessage());
            continue;
        } catch (\Exception $e) {
            $this->logger->error("Error deleting child inquiry {$childId}: " . $e->getMessage());
            continue;
        }
    }

    // Delete all options for this inquiry
    $options = $this->optionService->getByTargetId($inquiryId);
    foreach ($options as $option) {
        try {
            $this->optionService->delete($option->getId()); // Recursive delete for options
        } catch (\Exception $e) {
            $this->logger->error("Failed to delete option {$option->getId()}: " . $e->getMessage());
            continue;
        }
    }

    // Finally delete this inquiry
    $this->eventDispatcher->dispatchTyped(new InquiryDeletedEvent($this->inquiry));
    $this->inquiry->setDeleted(time());
    $this->inquiry->setArchived(time());
    $this->inquiry->setLastInteraction(time());

    $this->inquiryMapper->delete($this->inquiry);
    return $this->inquiry;
}

/**
 * Close inquiry
 *
 * @return Inquiry
 */
public function close(int $inquiryId): Inquiry
{
	$this->inquiryMapper->get($inquiryId, withRoles: true)->request(Inquiry::PERMISSION_INQUIRY_EDIT);
	return $this->toggleClose($inquiryId, time() - 5);
}

/**
 * Reopen inquiry
 *
 * @return Inquiry
 */
public function reopen(int $inquiryId): Inquiry
{
	$this->inquiryMapper->get($inquiryId, withRoles: true)->request(Inquiry::PERMISSION_INQUIRY_EDIT);
	return $this->toggleClose($inquiryId, 0);
}

/**
 * Find  inquiry by id
 *
 * @return Inquiry
 */
public function findById(int $inquiryId): Inquiry
{
	return    $this->inquiryMapper->get($inquiryId, withRoles: true)->request(Inquiry::PERMISSION_INQUIRY_EDIT);
}

/**
 * Update  Form id in inquiry
 *
 * @return Inquiry
 */
public function updateFormId(int $inquiryId, int $formId): bool
{
	return    $this->inquiryMapper->updateFormById($inquiryId, $formId);
}

/**
 * Close inquiry
 *
 * @return Inquiry
 */
private function toggleClose(int $inquiryId, int $expiry): Inquiry
{
	$this->inquiry = $this->inquiryMapper->find($inquiryId);
	$this->inquiry->request(Inquiry::PERMISSION_INQUIRY_EDIT);

	$this->inquiry->setExpire($expiry);
	if ($expiry > 0) {
		$this->eventDispatcher->dispatchTyped(new InquiryCloseEvent($this->inquiry));
	} else {
		$this->eventDispatcher->dispatchTyped(new InquiryReopenEvent($this->inquiry));
	}

	$this->inquiry = $this->inquiryMapper->update($this->inquiry);

	return $this->inquiry;
}

/**
 * Set status of inquiry
 *
 * @return Inquiry
 */
public function setInquiryStatus(int $inquiryId, string $mstatus): void
{
	$this->inquiryMapper->setInquiryStatus($inquiryId, $mstatus);
}

/**
 * Set Moderation status of inquiry
 *
 * @return Inquiry
 */
public function setModerationStatus(int $inquiryId, string $mstatus): void
{
	$this->inquiryMapper->setModerationStatus($inquiryId, $mstatus);
}

/**
 * Clone inquiry
 *
 * @return Inquiry
 */
public function clone(int $inquiryId, string $inquiryType): Inquiry
{
	$origin = $this->inquiryMapper->get($inquiryId, withRoles: true);
	$origin->request(Inquiry::PERMISSION_INQUIRY_VIEW);
	$this->appSettings->getInquiryCreationAllowed();

	$this->inquiry = new Inquiry();
	$this->inquiry->setCreated(time());
	$this->inquiry->setOwner($this->userSession->getCurrentUserId());
	$this->inquiry->setTitle('Clone of ' . $origin->getTitle());
	$this->inquiry->setDeleted(0);
	$this->inquiry->setVisibility(Inquiry::VISIBILITY_PRIVATE);

	if ($inquiryType) {
		$this->inquiry->setType($inquiryType);
	} else {
		$this->inquiry->setType($origin->getType());
	}

	$this->inquiry->setDescription($origin->getDescription());
	$this->inquiry->setExpire($origin->getExpire());
	// deanonymize cloned inquiries by default, to avoid locked anonymous inquiries
	$this->inquiry->setShowResults($origin->getShowResults());

	$this->inquiry = $this->inquiryMapper->insert($this->inquiry);
	$this->eventDispatcher->dispatchTyped(new InquiryUpdatedEvent($this->inquiry));
	return $this->inquiry;
}

/**
 * Get inquiry with trending scores included
 */
public function getWithTrending(int $inquiryId): array
{
	$inquiry = $this->get($inquiryId);


	$inquiryData = $inquiry->jsonSerialize();
	$inquiryData['trending'] = $trendingScores;

	// Add trending scores to each option
	if (isset($inquiryData['childs']) && is_array($inquiryData['childs'])) {
		foreach ($inquiryData['childs'] as &$option) {
			if (isset($option['id']) && isset($trendingScores[$option['id']])) {
				$option['trendingScore'] = $trendingScores[$option['id']];
			}
		}
	}

	return $inquiryData;

}


/**
 * Collect email addresses from particitipants
 */
public function getParticipantsEmailAddresses(int $inquiryId): array
{
	$this->inquiry = $this->inquiryMapper->get($inquiryId, withRoles: true);
	$this->inquiry->request(Inquiry::PERMISSION_INQUIRY_EDIT);

	$supports = $this->inquiryMapper->findParticipantsByInquiry($this->inquiry->getId());
	$list = [];
	foreach ($supports as $support) {
		$user = $support->getUser();
		$list[] = [
			'displayName' => $user->getDisplayName(),
			'emailAddress' => $user->getEmailAddress(),
			'combined' => $user->getEmailAndDisplayName(),
		];
	}
	return $list;
}

/**
 * Get valid values for configuration options
 *
 * @return array
 *
 * @psalm-return array{inquiryType: mixed, access: mixed, showResults: mixed}
 */
public function getValidEnum(): array
{
	return [
		'visibility' => $this->getValidVisibility(),
		'showResults' => $this->getValidShowResults()
	];
}

public function applyAction(int $inquiryId, string $action): Inquiry
{
	$inquiry = $this->inquiryMapper->find($inquiryId);

	if (!$inquiry) {
		throw new \Exception('Inquiry not found');
	}

	$timestamp = time();

	switch ($action) {
	case 'save_draft':
		$inquiry->setVisibility('private');
		$inquiry->setPublicationStatus('draft');
		$inquiry->setInquiryStatus('draft');
		$inquiry->setModerationStatus('draft');
		$inquiry->setLastInteraction($timestamp);
		$inquiry = $this->inquiryMapper->update($inquiry);
		break;

	case 'submit_for_moderate':
		$inquiry->setPublicationStatus('pending');
		$inquiry->setInquiryStatus('waiting_approval');
		$inquiry->setModerationStatus('pending');
		$inquiry->setLastInteraction($timestamp);
		$inquiry = $this->inquiryMapper->update($inquiry);
		break;

	case 'submit_for_accepted':
		$inquiry->setVisibility('everyone');
		$inquiry->setPublicationStatus('published');
		$inquiry->setModerationStatus('accepted');
		$inquiry->setLastInteraction($timestamp);
		//We find the first status available in inquiry type status definition
		$statuses = $this->inquiryStatusMapper->findByInquiryType($inquiry->getType());
		if (!empty($statuses)) {
			usort($statuses, fn($a, $b) => $a->getSortOrder() <=> $b->getSortOrder());
			$firstStatus = $statuses[0] ?? null;
		}
		if ($firstStatus) {
			$inquiry->setInquiryStatus($firstStatus->getStatusKey());
		}
		$inquiry = $this->inquiryMapper->update($inquiry);
		break;

	case 'submit_for_rejected':
		$inquiry->setVisibility('private');
		$inquiry->setPublicationStatus('draft');
		$inquiry->setModerationStatus('rejected');
		$inquiry->setInquiryStatus('rejected');
		$inquiry->setLastInteraction($timestamp);
		$inquiry = $this->inquiryMapper->update($inquiry);
		break;

	default:
		throw new \InvalidArgumentException("Unknown action '$action'");
	}

	return $inquiry;
}


}
