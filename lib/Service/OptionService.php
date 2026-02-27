<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\Option;
use OCA\Agora\Db\OptionMapper;
use OCA\Agora\Db\InquiryOptionTypeMapper;
use OCA\Agora\Db\InquiryMapper;
use OCA\Agora\Db\UserMapper;
use OCA\Agora\Db\SupportMapper;
use OCA\Agora\Event\OptionArchivedEvent;
use OCA\Agora\Event\OptionCreatedEvent;
use OCA\Agora\Event\OptionDeletedEvent;
use OCA\Agora\Event\OptionOwnerChangeEvent;
use OCA\Agora\Event\OptionRestoredEvent;
use OCA\Agora\Event\OptionUpdatedEvent;
use OCA\Agora\Exceptions\AlreadyDeletedException;
use OCA\Agora\Exceptions\EmptyTextException;
use OCA\Agora\Exceptions\ForbiddenException;
use OCA\Agora\Exceptions\InvalidAccessException;
use OCA\Agora\Exceptions\InvalidOptionTypeException;
use OCA\Agora\Exceptions\InvalidShowResultsException;
use OCA\Agora\Exceptions\InvalidUsernameException;
use OCA\Agora\Exceptions\NotFoundException;
use OCA\Agora\Exceptions\UserNotFoundException;
use OCA\Agora\Model\Settings\AppSettings;
use OCA\Agora\Model\UserBase;
use OCA\Agora\Service\SettingsService;
use OCA\Agora\UserSession;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\Search\ISearchQuery;
use Psr\Log\LoggerInterface;

class OptionService
{
    /**
     * @psalm-suppress PossiblyUnusedMethod
     */
    public function __construct(
        private AppSettings $appSettings,
        private IEventDispatcher $eventDispatcher,
        private Option $option,
        private OptionMapper $optionMapper,
        private InquiryOptionTypeMapper $optionTypeMapper,
        private InquiryMapper $inquiryMapper,
        private UserMapper $userMapper,
        private UserSession $userSession,
        private SupportMapper $supportMapper,
        private SettingsService $settings,
        private LoggerInterface $logger,
    ) {
    }

    /**
     * Get list of options including hierarchical structure
     */
    public function listOptions(): array
    {
        $optionList = $this->optionMapper->findForMe($this->userSession->getCurrentUserId());

        foreach ($optionList as $option) {
            $type = $option->getType();
            $family = $this->optionTypeMapper->getFamilyFromType($type);
            $option->setFamily($family);
        }

        if ($this->userSession->getCurrentUser()->getIsAdmin()) {
            return $optionList;
        }

        return array_values(
            array_filter(
                $optionList, function (Option $option): bool {
                    return $option->getIsAllowed(Option::PERMISSION_OPTION_VIEW);
                }
            )
        );
    }

    /**
     * Get options by target inquiry ID
     */
    public function listByTargetId(int $targetId): array
    {
        $options = $this->optionMapper->findByTargetId($targetId);

        foreach ($options as $option) {
            $type = $option->getType();
            $family = $this->optionTypeMapper->getFamilyFromType($type);
            $option->setFamily($family);
        }

        /*return array_values(
            array_filter(
                $options, function (Option $option): bool {
                    return $option->getIsAllowed(Option::PERMISSION_OPTION_VIEW);
                }
            )
        ); */
        return $options;
    }

    /**
     * Get options with hierarchical structure (parent with children)
     */
    public function listWithChildren(int $targetId): array
    {
        $options = $this->optionMapper->findWithChildren($targetId);

        foreach ($options as $option) {
            $type = $option->getType();
            $family = $this->optionTypeMapper->getFamilyFromType($type);
            $option->setFamily($family);
        }

        return array_values(
            array_filter(
                $options, function (Option $option): bool {
                    return $option->getIsAllowed(Option::PERMISSION_OPTION_VIEW);
                }
            )
        );
    }

    /**
     * Get options by type
     */
    public function listByType(string $type, int $targetId = 0): array
    {
        $options = $this->optionMapper->findByType($type, $targetId);

        foreach ($options as $option) {
            $family = $this->optionTypeMapper->getFamilyFromType($type);
            $option->setFamily($family);
        }

        return array_values(
            array_filter(
                $options, function (Option $option): bool {
                    return $option->getIsAllowed(Option::PERMISSION_OPTION_VIEW);
                }
            )
        );
    }

    /**
     * Search options
     */
    public function search(ISearchQuery $query): array
    {
        $optionList = [];
        try {
            $options = $this->optionMapper->search($query);

            foreach ($options as $option) {
                try {
                    $option->request(Option::PERMISSION_OPTION_VIEW);
                    $optionList[] = $option;
                } catch (ForbiddenException $e) {
                    continue;
                }
            }
        } catch (DoesNotExistException $e) {
            // silent catch
        }
        return $optionList;
    }

    /**
     * Get list of options for admin
     *
     * @return Option[]
     */
    public function listForAdmin(): array
    {
        $optionList = [];
        if ($this->userSession->getCurrentUser()->getIsAdmin()) {
            try {
                $optionList = $this->optionMapper->findForAdmin($this->userSession->getCurrentUserId());
            } catch (DoesNotExistException $e) {
                // silent catch
            }
        }
        return $optionList;
    }

    /**
     * Transfer options
     *
     * @return Option[]
     */
    public function transferOptions(string $sourceUserId, string $targetUserId): array
    {
        try {
            $targetUser = $this->userMapper->getUserFromUserBase($targetUserId);
        } catch (UserNotFoundException $e) {
            throw new InvalidUsernameException('The user id "' . $targetUserId . '" for the target user is not valid.');
        }

        $optionsToTransfer = $this->optionMapper->listByOwner($sourceUserId);

        foreach ($optionsToTransfer as &$option) {
            $option = $this->transferOption($option, $targetUser);
        }
        return $optionsToTransfer;
    }

    /**
     * Takeover option
     *
     * @return Option
     */
    public function takeover(int $optionId, ?UserBase $targetUser = null): Option
    {
        if ($targetUser === null) {
            $targetUser = $this->userSession->getCurrentUser();
        }
        return $this->transferOption($optionId, $targetUser);
    }

    /**
     * Transfer ownership of an option
     */
    public function transferOption(int|Option $option, string|UserBase $targetUser): Option
    {
        if (!($option instanceof Option)) {
            $option = $this->optionMapper->get($option, withRoles: true);
        }

        $option->request(Option::PERMISSION_OPTION_CHANGE_OWNER);

        if (!($targetUser instanceof UserBase)) {
            $userId = $targetUser;
            try {
                $targetUser = $this->userMapper->getUserFromUserBase($userId);
            } catch (UserNotFoundException $e) {
                throw new InvalidUsernameException('The user id "' . $userId . '" for the target user is not valid.');
            }
        }

        $oldOwner = $option->getOwner();

        $option->setOwner($targetUser->getId());
        $option = $this->optionMapper->update($option);

        $this->eventDispatcher->dispatchTyped(new OptionOwnerChangeEvent($option, $oldOwner, $option->getOwner()));

        return $option;
    }

    /**
     * Get option
     *
     * @return Option
     */
    public function get(int $optionId, bool $lightweight = false): Option
    {
        try {
            if ($lightweight) {
                $this->option = $this->optionMapper->get($optionId, withRoles: true);
            } else {
                $this->option = $this->optionMapper->find($optionId);
            }

            $this->option->request(Option::PERMISSION_OPTION_VIEW);

            $family = $this->optionTypeMapper->getFamilyFromType($this->option->getType());
            $this->option->setFamily($family);

            return $this->option;
        } catch (DoesNotExistException $e) {
            throw new NotFoundException('Option not found');
        }
    }

    /**
     * Get options by parent ID
     */
    public function getByParentId(int $parentId): array
    {
        try {
            $options = $this->optionMapper->findByParentId($parentId);

            foreach ($options as $option) {
                $family = $this->optionTypeMapper->getFamilyFromType($option->getType());
                $option->setFamily($family);
            }

            return $options;
        } catch (DoesNotExistException $e) {
            throw new NotFoundException('Options not found for parent');
        }
    }

    /**
     * Get option owner from DB
     */
    public function getOptionOwnerFromDB(int $optionId): UserBase
    {
        try {
            $option = $this->optionMapper->get($optionId, withRoles: true);
            return $option->getUser();
        } catch (DoesNotExistException $e) {
            throw new NotFoundException('Option not found');
        }
    }

    /**
     * Get fields configuration for specific option type
     */
    public function getFields(string $optionType): array
    {
        return $this->optionTypeMapper->getFields($optionType);
    }

    /**
     * Get allowed response configuration for specific option type
     */
    public function getAllowedResponse(string $optionType): array
    {
        return $this->optionTypeMapper->getAllowedResponse($optionType);
    }

    /**
     * Create a new option
     *
     * @param array $data Option data
     * @return Option
     */
    public function create(array $data): Option
    {

        if (empty($data['text'])) {
            throw new EmptyTextException('Text must not be empty');
        }

        if (empty($data['type'])) {
            throw new InvalidOptionTypeException('Option type must be specified');
        }

        // Validate target inquiry exists and user has access
        if (!empty($data['targetId'])) {
            try {
                $inquiry = $this->inquiryMapper->get($data['targetId'], withRoles: true);
                $inquiry->request(\OCA\Agora\Db\Inquiry::PERMISSION_INQUIRY_VIEW);
            } catch (DoesNotExistException $e) {
                throw new NotFoundException('Target inquiry not found');
            } catch (ForbiddenException $e) {
                throw new ForbiddenException('No access to target inquiry');
            }
        }
        
        $title = $data['title'] ?? '';

        $timestamp = time();
        $this->option = new Option();
        $this->option->setText($data['text']);
        $this->option->setType($data['type']);
        $this->option->setTitle($data['title']);
        $this->option->setTargetId($data['targetId'] ?? 0);
        $this->option->setParentId($data['parentId'] ?? 0);
        $this->option->setOwnedGroup($data['ownedGroup'] ?? '');
        $this->option->setCreated($timestamp);
        $this->option->setUpdated($timestamp);
        $this->option->setAllowComment($data['allowComment']);
        $this->option->setSupportFeature($data['supportFeature']);

        $this->option->setOwner($this->userSession->getCurrentUserId());

        // Set defaults
        $this->option->setAccess($data['access'] ?? Option::ACCESS_PRIVATE);
        $this->option->setShowResults($data['showResults'] ?? Option::SHOW_RESULTS_ALWAYS);
        $this->option->setFamily($data['family'] ?? 'deliberative');
        $this->option->setStatus($data['status'] ?? Option::DEFAULT_STATUS_DRAFT);

        // Set sort order
        $maxSortOrder = $this->optionMapper->getMaxSortOrder($data['targetId'] ?? 0);
        $this->option->setSortOrder($maxSortOrder + 1);

        $this->option = $this->optionMapper->insert($this->option);

        // Get fields configuration for this option type
        $fieldsDefinition = $this->getFields($data['type']);
        $optionId = $this->option->getId();

        if (!empty($fieldsDefinition) && is_array($fieldsDefinition) && !empty($data['miscFields'])) {
            foreach ($fieldsDefinition as &$fieldDef) {
                $key = $fieldDef['key'];
                if (array_key_exists($key, $data['miscFields'])) {
                    $fieldDef['default'] = $data['miscFields'][$key];
                }
            }
            unset($fieldDef);
        }

        $this->optionMapper->saveDynamicFields($this->option, $fieldsDefinition);

        //$this->eventDispatcher->dispatchTyped(new OptionCreatedEvent($this->option));

        return $this->option;
    }

    /**
     * Partially update an option
     *
     * @param int $optionId
     * @param array $data
     * @return Option
     */
    public function updatePartial(int $optionId, array $data): Option
    {
        $this->option = $this->optionMapper->find($optionId);
        //$this->option->request(Option::PERMISSION_OPTION_EDIT);

        // Validate values
        if (isset($data['showResults']) && !in_array($data['showResults'], $this->getValidShowResults())) {
            throw new InvalidShowResultsException('Invalid value for prop showResults');
        }

        if (isset($data['text']) && empty($data['text'])) {
            throw new EmptyTextException('Text must not be empty');
        }

        if (isset($data['access'])) {
            if (!in_array($data['access'], $this->getValidAccess())) {
                throw new InvalidAccessException('Invalid value for prop access ' . $data['access']);
            }
        }

        $timestamp = time();

        // Update only provided fields
        if (isset($data['title'])) {
            $this->option->setTitle($data['title']);
        }

        // Update only provided fields
        if (isset($data['text'])) {
            $this->option->setText($data['text']);
        }

        if (isset($data['type'])) {
            $this->option->setType($data['type']);
        }

        if (isset($data['targetId'])) {
            $this->option->setTargetId($data['targetId']);
        }

        if (isset($data['parentId'])) {
            $this->option->setParentId($data['parentId']);
        }

        if (isset($data['ownedGroup'])) {
            $this->option->setOwnedGroup($data['ownedGroup']);
        }

        if (isset($data['access'])) {
            $this->option->setAccess($data['access']);
        }

        if (isset($data['showResults'])) {
            $this->option->setShowResults($data['showResults']);
        }

        if (isset($data['allowComment'])) {
            $this->option->setAllowComment($data['allowComment']);
        }

        if (isset($data['supportFeature'])) {
            $this->option->setSupportFeature($data['supportFeature']);
        }

        if (isset($data['family'])) {
            $this->option->setFamily($data['family']);
        }

        if (isset($data['status'])) {
            $this->option->setStatus($data['status']);
        }

        $this->option->setUpdated($timestamp);
        $this->option = $this->optionMapper->update($this->option);

        // Update misc fields if provided
        $fields = $this->getFields($this->option->getType());
        if (isset($data['miscFields']) && is_array($data['miscFields'])) {
            $this->optionMapper->updateDynamicFields($this->option, $data['miscFields'], $fields);
        }

        //$this->eventDispatcher->dispatchTyped(new OptionUpdatedEvent($this->option));

        return $this->option;
    }

    /**
     * Update option configuration
     *
     * @return Option
     */
    public function updateConfig(int $optionId, array $optionConfiguration): Option
    {
        $this->option = $this->optionMapper->find($optionId);
        $this->option->request(Option::PERMISSION_OPTION_EDIT);

        // Validate values
        if (isset($optionConfiguration['showResults']) && !in_array($optionConfiguration['showResults'], $this->getValidShowResults())) {
            throw new InvalidShowResultsException('Invalid value for prop showResults');
        }

        if (isset($optionConfiguration['access'])) {
            if (!in_array($optionConfiguration['access'], $this->getValidAccess())) {
                throw new InvalidAccessException('Invalid value for prop access ' . $optionConfiguration['access']);
            }
        }

        $this->option->deserializeArray($optionConfiguration);
        $this->option->setUpdated(time());
        $this->option = $this->optionMapper->update($this->option);

        $this->eventDispatcher->dispatchTyped(new OptionUpdatedEvent($this->option));

        return $this->option;
    }

    /**
     * Update timestamp for last interaction with option
     */
    public function setLastInteraction(int $optionId): void
    {
        if ($optionId) {
            $this->optionMapper->update($this->option);
        }
    }

    /**
     * Move to archive or restore with optional recursive functionality
     *
     * @return array [option: Option, archivedCount: int]
     */
    public function toggleArchiveRecursive(int $optionId, bool $recursive = true): array
    {
        $this->option = $this->optionMapper->find($optionId);
        $this->option->request(Option::PERMISSION_OPTION_DELETE);

        $archiveState = !$this->option->getDeleted();
        $deletedTime = $archiveState ? time() : 0;

        try {
            $this->option->setArchived($deletedTime);
            $this->option->setDeleted($deletedTime);
            $this->option->setUpdated(time());
            $this->option = $this->optionMapper->update($this->option);

            $archivedCount = 1;

            if ($recursive) {
                $childCount = $this->archiveChildrenRecursive($this->option, $archiveState);
                $archivedCount += $childCount;
            }

            if ($archiveState) {
                $this->eventDispatcher->dispatchTyped(new OptionArchivedEvent($this->option));
            } else {
                $this->eventDispatcher->dispatchTyped(new OptionRestoredEvent($this->option));
            }

            return [
                'option' => $this->option,
                'archivedCount' => $archivedCount
            ];

        } catch (\Exception $e) {
            throw $e;
        }
    }

    /**
     * Archive recursively all children
     */
    private function archiveChildrenRecursive(Option $parent, bool $archiveState): int
    {
        $count = 0;
        $children = $this->optionMapper->findByParentId($parent->getId());

        foreach ($children as $child) {
            try {
                $child->request(Option::PERMISSION_OPTION_DELETE);
                $child->setArchived($archiveState ? time() : 0);
                $child->setDeleted($archiveState ? time() : 0);
                $child->setUpdated(time());
                $this->optionMapper->update($child);
                $count++;
                
                if ($archiveState) {
                    $this->eventDispatcher->dispatchTyped(new OptionArchivedEvent($child));
                } else {
                    $this->eventDispatcher->dispatchTyped(new OptionRestoredEvent($child));
                }

                $count += $this->archiveChildrenRecursive($child, $archiveState);

            } catch (ForbiddenException $e) {
                $this->logger->error("Permission denied for child option {$child->getId()}");
                continue;
            }
        }

        return $count;
    }

    /**
     * Move to archive or restore
     *
     * @return Option
     */
    public function toggleArchive(int $optionId): Option
    {
        $this->option = $this->optionMapper->find($optionId);
        $this->option->request(Option::PERMISSION_OPTION_DELETE);

        $this->option->setArchived($this->option->getArchived() ? 0 : time());
        $this->option->setUpdated(time());
        $this->option = $this->optionMapper->update($this->option);

        if ($this->option->getArchived()) {
            $this->eventDispatcher->dispatchTyped(new OptionArchivedEvent($this->option));
        } else {
            $this->eventDispatcher->dispatchTyped(new OptionRestoredEvent($this->option));
        }

        return $this->option;
    }

    /**
     * Delete option
     *
     * @return Option
     */
    public function delete(int $optionId): Option
    {
        try {
            $this->option = $this->optionMapper->get($optionId, withRoles: true);
        } catch (DoesNotExistException $e) {
            throw new AlreadyDeletedException('Option not found, assume already deleted');
        }

        $this->option->request(Option::PERMISSION_OPTION_DELETE);
        $this->eventDispatcher->dispatchTyped(new OptionDeletedEvent($this->option));

        $this->optionMapper->delete($this->option);
        return $this->option;
    }

    /**
     * Update option status
     */
    public function setOptionStatus(int $optionId, string $status): void
    {
        $this->optionMapper->setOptionStatus($optionId, $status);
    }

    /**
     * Find option by id
     *
     * @return Option
     */
    public function findById(int $optionId): Option
    {
        return $this->optionMapper->get($optionId, withRoles: true);
    }

    /**
     * Reorder options
     */
    public function reorderOptions(array $optionIds): void
    {
        if (empty($optionIds)) {
            return;
        }

        // Check permissions for first option to ensure user can reorder
        $firstOption = $this->optionMapper->get($optionIds[0], withRoles: true);
        $firstOption->request(Option::PERMISSION_OPTIONS_REORDER);

        $this->optionMapper->reorderOptions($optionIds);
    }

    /**
     * Update sort order for a single option
     */
    public function updateSortOrder(int $optionId, int $sortOrder): void
    {
        $option = $this->optionMapper->get($optionId, withRoles: true);
        $option->request(Option::PERMISSION_OPTIONS_REORDER);

        $this->optionMapper->updateSortOrder($optionId, $sortOrder);
    }

    /**
     * Clone option
     *
     * @return Option
     */
    public function clone(int $optionId, string $optionType = ''): Option
    {
        $origin = $this->optionMapper->get($optionId, withRoles: true);
        $origin->request(Option::PERMISSION_OPTION_VIEW);
        
        if (!$this->appSettings->getOptionCreationAllowed()) {
            throw new ForbiddenException('Option creation is disabled');
        }

        $this->option = new Option();
        $timestamp = time();
        $this->option->setCreated($timestamp);
        $this->option->setUpdated($timestamp);
        $this->option->setOwner($this->userSession->getCurrentUserId());
        $this->option->setText('Clone of ' . $origin->getText());
        $this->option->setDeleted(0);
        $this->option->setArchived(0);
        $this->option->setAccess(Option::ACCESS_PRIVATE);

        if ($optionType) {
            $this->option->setType($optionType);
        } else {
            $this->option->setType($origin->getType());
        }

        $this->option->setTargetId($origin->getTargetId());
        $this->option->setParentId($origin->getParentId());
        $this->option->setOwnedGroup($origin->getOwnedGroup());
        $this->option->setShowResults($origin->getShowResults());
        $this->option->setAllowComment($origin->getAllowComment());
        $this->option->setSupportFeature($origin->getSupportFeature());
        $this->option->setFamily($origin->getFamily());
        $this->option->setStatus($origin->getStatus());

        // Set sort order
        $maxSortOrder = $this->optionMapper->getMaxSortOrder($origin->getTargetId());
        $this->option->setSortOrder($maxSortOrder + 1);

        $this->option = $this->optionMapper->insert($this->option);

        // Clone misc fields
        $fieldsDefinition = $this->getFields($this->option->getType());
        if (!empty($fieldsDefinition)) {
            $miscFields = [];
            foreach ($fieldsDefinition as $fieldDef) {
                $key = $fieldDef['key'];
                $value = $origin->getMiscField($key) ?? $fieldDef['default'] ?? null;
                if ($value !== null) {
                    $miscFields[$key] = $value;
                }
            }
            $this->optionMapper->saveDynamicFields($this->option, $fieldsDefinition);
        }

        $this->eventDispatcher->dispatchTyped(new OptionCreatedEvent($this->option));
        return $this->option;
    }

    /**
     * Collect email addresses from participants
     */
    public function getParticipantsEmailAddresses(int $optionId): array
    {
        $this->option = $this->optionMapper->get($optionId, withRoles: true);
        $this->option->request(Option::PERMISSION_OPTION_EDIT);

        // This would need a method to find participants by option
        // For now, return empty array
        return [];
    }

    /**
     * Get valid values for configuration options
     */
    public function getValidEnum(): array
    {
        return [
            'access' => $this->getValidAccess(),
            'showResults' => $this->getValidShowResults(),
            'types' => $this->getValidOptionTypes()
        ];
    }

    /**
     * Apply action to option (draft, submit, etc.)
     */
    public function applyAction(int $optionId, string $action): Option
    {
        $option = $this->optionMapper->find($optionId);

        if (!$option) {
            throw new \Exception('Option not found');
        }

        $timestamp = time();

        switch ($action) {
            case 'save_draft':
                $option->setAccess(Option::ACCESS_PRIVATE);
                $option->setStatus('draft');
                $option->setUpdated($timestamp);
                $option = $this->optionMapper->update($option);
                break;

            case 'submit':
                $option->setAccess(Option::ACCESS_PUBLIC);
                $option->setStatus('published');
                $option->setUpdated($timestamp);
                $option = $this->optionMapper->update($option);
                break;

            case 'archive':
                $option->setArchived($timestamp);
                $option->setUpdated($timestamp);
                $option = $this->optionMapper->update($option);
                $this->eventDispatcher->dispatchTyped(new OptionArchivedEvent($option));
                break;

            case 'restore':
                $option->setArchived(0);
                $option->setUpdated($timestamp);
                $option = $this->optionMapper->update($option);
                $this->eventDispatcher->dispatchTyped(new OptionRestoredEvent($option));
                break;

            default:
                throw new \InvalidArgumentException("Unknown action '$action'");
        }

        return $option;
    }

    /**
     * Get valid values for access
     */
    private function getValidAccess(): array
    {
        return [Option::ACCESS_PRIVATE, Option::ACCESS_PUBLIC, Option::ACCESS_OPEN, Option::ACCESS_HIDDEN];
    }

    /**
     * Get valid values for showResult
     */
    private function getValidShowResults(): array
    {
        return [Option::SHOW_RESULTS_ALWAYS, Option::SHOW_RESULTS_CLOSED, Option::SHOW_RESULTS_NEVER];
    }

    /**
     * Get valid option types
     */
    private function getValidOptionTypes(): array
    {
        return [
            Option::TYPE_ARGUMENT_FOR,
            Option::TYPE_ARGUMENT_AGAINST,
            Option::TYPE_PROPOSAL,
            Option::TYPE_QUESTION,
            Option::TYPE_IDEA
        ];
    }

    /**
     * Set access
     */
    public function setOptionAccess(int $optionId, string $access): string
    {
        $option = $this->optionMapper->find($optionId);
        $option->request(Option::PERMISSION_OPTION_EDIT);
        
        if (!in_array($access, $this->getValidAccess())) {
            throw new InvalidAccessException('Invalid access value');
        }
        
        $option->setAccess($access);
        $option->setUpdated(time());
        $this->optionMapper->update($option);
        
        return $access;
    }

    /**
     * Delete options by target ID (when inquiry is deleted)
     */
    public function deleteByTargetId(int $targetId): void
    {
        $this->optionMapper->deleteByTargetId($targetId);
    }
}
