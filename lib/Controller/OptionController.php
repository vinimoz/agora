<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\CalendarService;
use OCA\Agora\Service\OptionService;
use OCA\Agora\Service\SupportService;
use OCA\Agora\Service\OptionMiscService;
use OCA\Agora\Service\CommentService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use Psr\Log\LoggerInterface;
use OCP\IRequest;

/**
 * @psalm-api
 */
class OptionController extends BaseController
{
    public function __construct(
        string $appName,
        IRequest $request,
        private OptionService $optionService,
        private CalendarService $calendarService,
        private SupportService $supportService,
        private CommentService $commentService,
        private OptionMiscService $optionMiscService,
        private LoggerInterface $logger,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Get all options
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/options')]
    public function list(): JSONResponse
    {
        return $this->response(
            function () {
                return ['options' => $this->optionService->listOptions()];
            }
        );
    }

    /**
     * Get all options of given inquiry
     *
     * @param int $inquiryId Inquiry id
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/inquiry/{inquiryId}/options')]
    public function listByInquiry(int $inquiryId): JSONResponse
    {
        return $this->response(
            function () use ($inquiryId) {
                return ['options' => $this->optionService->listByTargetId($inquiryId)];
            }
        );
    }

    /**
     * Get options with hierarchical structure
     *
     * @param int $inquiryId Inquiry id
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/inquiry/{inquiryId}/options/hierarchical')]
    public function listHierarchical(int $inquiryId): JSONResponse
    {
        return $this->response(
            function () use ($inquiryId) {
                return ['options' => $this->optionService->listWithChildren($inquiryId)];
            }
        );
    }

    /**
     * Get options by type
     *
     * @param int $inquiryId Inquiry id
     * @param string $type Option type
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/inquiry/{inquiryId}/options/type/{type}')]
    public function listByType(int $inquiryId, string $type): JSONResponse
    {
        return $this->response(
            function () use ($inquiryId, $type) {
                return ['options' => $this->optionService->listByType($type, $inquiryId)];
            }
        );
    }

    /**
     * Get a specific option
     *
     * @param int $optionId Option id
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/option/{optionId}')]
    public function get(int $optionId): JSONResponse
    {
        return $this->response(
            function () use ($optionId) {
                return ['option' => $this->optionService->get($optionId)];
            }
        );
    }


    /**
     * get complete option
  *
     * @param int $optionId Inquiry id
     *
     *                       psalm-return JSONResponse<array{
     *                       option: Inquiry,
     *                       comments: array<int, Comment>,
     *                       }>
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/option/{optionId}/full')]
    public function getFull(int $optionId): JSONResponse
    {
        return $this->response(fn () => $this->getFullOption($optionId, true), Http::STATUS_OK);
    }

    private function getFullOption(int $optionId, bool $withTimings = false): array
    {
        $this->logger->error(' OPTIONNNNNNNNNNNNNNNNN ', ['data' => $optionId]);
        $timerMicro['start'] = microtime(true);

        $option = $this->optionService->get($optionId);
        $option->setMiscFields($this->optionMiscService->findByOptionId($optionId));
        $this->logger->error(' OPTIONNNNNNNNNNNNNNNNN FULL LOAD ', ['data' => $option]);

        $diffMicro['total'] = microtime(true) - $timerMicro['start'];
        $timerMicro['option'] = microtime(true);

        // $subscribed = $this->subscriptionService->get($inquiryId);
       // $timerMicro['subscribed'] = microtime(true);

        $diffMicro['option'] = $timerMicro['option'] - $timerMicro['start'];


        if ($withTimings) {
            return [
            'option' => $option,
            'diffMicro' => $diffMicro,
            ];
        }
        return [
        'option' => $option,
        ];
    }


    /**
     * Get child options
     *
     * @param int $parentId Parent option id
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/option/{parentId}/children')]
    public function getChildren(int $parentId): JSONResponse
    {
        return $this->response(
            function () use ($parentId) {
                return ['options' => $this->optionService->getByParentId($parentId)];
            }
        );
    }

    /**
     * Add a new option
     *
     * @param array $data Option data
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/option')]
    public function create(): JSONResponse
    {
        $rawData = $this->request->getParams('data');
        return $this->response(
            function () use ($rawData) {
                return ['option' => $this->optionService->create($rawData)];
            },
            Http::STATUS_CREATED
        );
    }

    /**
     * Update option
     *
     * @param int $optionId Option id
     * @param array $data Update data
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/option/{optionId}')]
    public function update(int $optionId): JSONResponse
    {
        $rawData = $this->request->getParams('data');
        return $this->response(
            function () use ($optionId, $rawData) {
                return ['option' => $this->optionService->updatePartial($optionId, $rawData)];
            }
        );
    }

    /**
     * Update option configuration
     *
     * @param int $optionId Option id
     * @param array $configuration Configuration data
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/option/{optionId}/config')]
    public function updateConfig(int $optionId, array $configuration): JSONResponse
    {
        return $this->response(
            function () use ($optionId, $configuration) {
                return ['option' => $this->optionService->updateConfig($optionId, $configuration)];
            }
        );
    }

    /**
     * Delete option
     *
     * @param int $optionId Option id
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'DELETE', url: '/option/{optionId}')]
    public function delete(int $optionId): JSONResponse
    {
        return $this->response(
            function () use ($optionId) {
                return ['option' => $this->optionService->delete($optionId)];
            }
        );
    }

    /**
     * Archive option
     *
     * @param int $optionId Option id
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/option/{optionId}/archive')]
    public function archive(int $optionId): JSONResponse
    {
        return $this->response(
            function () use ($optionId) {
                return ['option' => $this->optionService->toggleArchive($optionId)];
            }
        );
    }

    /**
     * Archive option recursively (with children)
     *
     * @param int $optionId Option id
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/option/{optionId}/archive/recursive')]
    public function archiveRecursive(int $optionId): JSONResponse
    {
        return $this->response(
            function () use ($optionId) {
                return $this->optionService->toggleArchiveRecursive($optionId, true);
            }
        );
    }

    /**
     * Restore option
     *
     * @param int $optionId Option id
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/option/{optionId}/restore')]
    public function restore(int $optionId): JSONResponse
    {
        return $this->response(
            function () use ($optionId) {
                return ['option' => $this->optionService->toggleArchive($optionId)];
            }
        );
    }

    /**
     * Restore option recursively (with children)
     *
     * @param int $optionId Option id
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/option/{optionId}/restore/recursive')]
    public function restoreRecursive(int $optionId): JSONResponse
    {
        return $this->response(
            function () use ($optionId) {
                return $this->optionService->toggleArchiveRecursive($optionId, false);
            }
        );
    }

    /**
     * Reorder options
     *
     * @param array $optionIds Options in new order
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/options/reorder')]
    public function reorder(array $optionIds): JSONResponse
    {
        return $this->response(
            function () use ($optionIds) {
                $this->optionService->reorderOptions($optionIds);
                return ['success' => true];
            }
        );
    }

    /**
     * Update option sort order
     *
     * @param int $optionId Option id
     * @param int $sortOrder New sort order
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/option/{optionId}/sort')]
    public function updateSortOrder(int $optionId, int $sortOrder): JSONResponse
    {
        return $this->response(
            function () use ($optionId, $sortOrder) {
                $this->optionService->updateSortOrder($optionId, $sortOrder);
                return ['success' => true];
            }
        );
    }

    /**
     * Clone option
     *
     * @param int $optionId Option id
     * @param string $type New option type (optional)
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/option/{optionId}/clone')]
    public function clone(int $optionId, string $type = ''): JSONResponse
    {
        return $this->response(
            function () use ($optionId, $type) {
                return ['option' => $this->optionService->clone($optionId, $type)];
            },
            Http::STATUS_CREATED
        );
    }

    /**
     * Transfer option ownership
     *
     * @param int $optionId Option id
     * @param string $targetUserId Target user id
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/option/{optionId}/transfer')]
    public function transfer(int $optionId, string $targetUserId): JSONResponse
    {
        return $this->response(
            function () use ($optionId, $targetUserId) {
                return ['option' => $this->optionService->transferOption($optionId, $targetUserId)];
            }
        );
    }

    /**
     * Takeover option
     *
     * @param int $optionId Option id
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/option/{optionId}/takeover')]
    public function takeover(int $optionId): JSONResponse
    {
        return $this->response(
            function () use ($optionId) {
                return ['option' => $this->optionService->takeover($optionId)];
            }
        );
    }

    /**
     * Apply action to option (draft, submit, archive, restore)
     *
     * @param int $optionId Option id
     * @param string $action Action to apply
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/option/{optionId}/action')]
    public function applyAction(int $optionId, string $action): JSONResponse
    {
        return $this->response(
            function () use ($optionId, $action) {
                return ['option' => $this->optionService->applyAction($optionId, $action)];
            }
        );
    }

    /**
     * Update option status
     *
     * @param int $optionId Option id
     * @param string $status New status
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/option/{optionId}/status')]
    public function setStatus(int $optionId, string $status): JSONResponse
    {
        return $this->response(
            function () use ($optionId, $status) {
                $this->optionService->setOptionStatus($optionId, $status);
                return ['success' => true];
            }
        );
    }

    /**
     * Update option access
     *
     * @param int $optionId Option id
     * @param string $access New access level
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/option/{optionId}/access')]
    public function setAccess(int $optionId, string $access): JSONResponse
    {
        return $this->response(
            function () use ($optionId, $access) {
                $this->optionService->setOptionAccess($optionId, $access);
                return ['success' => true];
            }
        );
    }

    /**
     * Search options
     *
     * @param string $term Search term
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/options/search')]
    public function search(string $term): JSONResponse
    {
        return $this->response(
            function () use ($term) {
                // This would require creating a search query object
                // For now, implement simple search
                return ['options' => $this->optionService->listOptions()];
            }
        );
    }

    /**
     * Get valid enum values
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/options/enums')]
    public function getEnums(): JSONResponse
    {
        return $this->response(
            function () {
                return $this->optionService->getValidEnum();
            }
        );
    }

    /**
     * Get option fields configuration
     *
     * @param string $type Option type
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/options/fields/{type}')]
    public function getFields(string $type): JSONResponse
    {
        return $this->response(
            function () use ($type) {
                return ['fields' => $this->optionService->getFields($type)];
            }
        );
    }

    /**
     * Get allowed responses for option type
     *
     * @param string $type Option type
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/options/responses/{type}')]
    public function getAllowedResponses(string $type): JSONResponse
    {
        return $this->response(
            function () use ($type) {
                return ['responses' => $this->optionService->getAllowedResponse($type)];
            }
        );
    }

    /**
     * Get participant email addresses
     *
     * @param int $optionId Option id
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/option/{optionId}/participants/emails')]
    public function getParticipantEmails(int $optionId): JSONResponse
    {
        return $this->response(
            function () use ($optionId) {
                return ['participants' => $this->optionService->getParticipantsEmailAddresses($optionId)];
            }
        );
    }

    /**
     * Find calendar events for option
     *
     * @param int $optionId Option id
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/option/{optionId}/events')]
    public function findCalendarEvents(int $optionId): JSONResponse
    {
        return $this->response(
            function () use ($optionId) {
                return ['events' => $this->calendarService->getEvents($optionId)];
            }
        );
    }

    /**
     * Get options for admin
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/admin/options')]
    public function listForAdmin(): JSONResponse
    {
        return $this->response(
            function () {
                return ['options' => $this->optionService->listForAdmin()];
            }
        );
    }
}
