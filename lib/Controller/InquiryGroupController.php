<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\InquiryGroupService;
use OCA\Agora\Service\InquiryService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCA\Agora\Service\SupportEngineService;
use OCA\Agora\Service\SupportResultService;
use OCA\Agora\Service\InquiryGroupMiscService;
use OCP\AppFramework\Http\JSONResponse;
use Psr\Log\LoggerInterface;
use OCP\IRequest;

/**
 * @psalm-api
 */
class InquiryGroupController extends BaseController
{
    public function __construct(
        string $appName,
        IRequest $request,
        private InquiryService $inquiryService,
        private InquiryGroupService $inquiryGroupService,
        private InquiryGroupMiscService $inquiryGroupMiscService,
        private SupportResultService $supportResultService,
        private SupportEngineService $supportEngineService,
        private LoggerInterface $logger,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Get list of inquirygroups
     *
     * psalm-return JSONResponse<array{inquiryGroups: array<int, InquiryGroup>}>
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/inquirygroups')]
    public function list(): JSONResponse
    {
        return $this->response(
            function () {
                return [
                    'inquiryGroups' => $this->inquiryGroupService->listInquiryGroups(true, true),
                ];
            }
        );
    }

    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/inquirygroup/{inquiryId}/updatemiscfield')]
    public function updateMiscField(int $inquiryId): JSONResponse
    {
        $data = $this->request->getParams();

        if (!isset($data['key']) || empty(trim($data['key']))) {
            $this->logger->error('Missing or empty key in misc field update', ['data' => $data]);
            return new JSONResponse([
                'error' => 'Key cannot be null or empty for misc field update'
            ], Http::STATUS_BAD_REQUEST);
        }

        try {
            $result = $this->inquiryGroupMiscService->setValue($inquiryId, $data['key'], $data['value'] ?? null);

            return new JSONResponse([
                'success' => true,
                'misc' => $result
            ]);
        } catch (\Exception $e) {
            $this->logger->error('Error updating misc field: ' . $e->getMessage(), [
                'inquiryId' => $inquiryId,
                'key' => $data['key'],
                'value' => $data['value'] ?? null
            ]);

            return new JSONResponse([
                'error' => $e->getMessage()
            ], Http::STATUS_BAD_REQUEST);
        }
    }


    /**
     * Get a single inquirygroup by ID
     *
     * @param int $inquiryGroupId Inquiry group id
     *
     * psalm-return JSONResponse<array{inquiryGroup: InquiryGroup}>
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/inquirygroup/{inquiryGroupId}')]
    public function get(int $inquiryGroupId): JSONResponse
    {
	    $inquiryGroup = $this->inquiryGroupService->get($inquiryGroupId, true, true);
	    $supportEngine = $this->supportEngineService->getEnginesByInquiryGroup($inquiryGroupId);
	    $supportResult = $this->supportResultService->getResultsByInquiryGroup($inquiryGroupId);


        return $this->response(
            fn () => [
                'inquiryGroup' => $inquiryGroup,
                'supportEngine' => $supportResult,
                'supportResult' => $supportEngine,
            ]
        );
    }

    /**
     * Create a new inquirygroup
     *
     * psalm-return JSONResponse<array{inquiryGroup: InquiryGroup}>
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/inquirygroup/new')]
    public function addGroup(): JSONResponse
    {
        try {
            $rawData = $this->request->getParams('data');
            $data = $rawData;


            if (empty($data['title'])) {
                throw new \InvalidArgumentException('Title is required');
            }

            return $this->response(
                fn () => [
                    'inquiryGroup' => $this->inquiryGroupService->createGroup(
                        $data['title'],
                        $data['type'] ?? 'default',
                        $data['parentId'] ?? 0,
                        $data['protected'] ?? false,
                        $data['ownedGroup'] ?? '',
                        $data['groupStatus'] ?? 'draft',
                        $data['titleExt'] ?? '',
                        $data['description'] ?? ''
                    ),
                ]
            );
        } catch (\InvalidArgumentException $e) {
            return new JSONResponse(
                ['error' => 'VALIDATION_ERROR', 'message' => $e->getMessage()],
                Http::STATUS_BAD_REQUEST
            );
        } catch (\Exception $e) {
            $this->logger->critical(
                'Server error',
                [
                    'exception' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]
            );
            return new JSONResponse(
                ['error' => 'SERVER_ERROR', 'message' => 'An unexpected error occurred'],
                Http::STATUS_INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * Update an inquirygroup
     *
     * @param int $inquiryGroupId Inquiry group id
     *
     * psalm-return JSONResponse<array{inquiryGroup: InquiryGroup}>
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/inquirygroup/update/{inquiryGroupId}')]
    public function updateGroup(int $inquiryGroupId): JSONResponse
    {
        try {
            $rawData = $this->request->getParams('updateData');
            $data = $rawData;


            return $this->response(
                fn () => [
                    'inquiryGroup' => $this->inquiryGroupService->updateGroup(
                        $inquiryGroupId,
                        $data['title'] ?? null,
                        $data['titleExt'] ?? null,
                        $data['description'] ?? null,
                        $data['type'] ?? null,
                        $data['parentId'] ?? null,
                        $data['protected'] ?? null,
                        $data['ownedGroup'] ?? null,
                        $data['groupStatus'] ?? null,
                        $data['expire'] ?? null
                    ),
                ]
            );
        } catch (\InvalidArgumentException $e) {
            return new JSONResponse(
                ['error' => 'VALIDATION_ERROR', 'message' => $e->getMessage()],
                Http::STATUS_BAD_REQUEST
            );
        } catch (\Exception $e) {
            $this->logger->critical(
                'Server error updating inquiry group',
                [
                    'exception' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]
            );
            return new JSONResponse(
                ['error' => 'SERVER_ERROR', 'message' => 'An unexpected error occurred'],
                Http::STATUS_INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * Delete an inquirygroup
     *
     * @param int $inquiryGroupId Inquiry group id
     *
     * psalm-return JSONResponse<array{success: bool}>
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'DELETE', url: '/inquirygroup/delete/{inquiryGroupId}')]
    public function deleteGroup(int $inquiryGroupId): JSONResponse
    {
        return $this->response(
            fn () => [
                'success' => $this->inquiryGroupService->deleteGroup($inquiryGroupId),
            ]
        );
    }

    /**
     * Create a new inquirygroup with its title and add a inquiry to it
     *
     * @param int    $inquiryId        Inquiry id to add to the new inquirygroup
     * @param string $inquiryGroupName Name of the new inquirygroup
     *
     * psalm-return JSONResponse<array{inquiryGroup: InquiryGroup, inquiry: Inquiry}>
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/inquirygroup/new/inquiry/{inquiryId}')]
    public function add(int $inquiryId, string $inquiryGroupName = ''): JSONResponse
    {
        return $this->response(
            fn () => [
                'inquiryGroup' => $this->inquiryGroupService->addInquiryToInquiryGroup($inquiryId, inquiryGroupName: $inquiryGroupName),
                'inquiry' => $this->inquiryService->get($inquiryId),
            ]
        );
    }

    /**
     * Add inquiry to inquirygroup
     *
     * @param int $inquiryId      Inquiry id
     * @param int $inquiryGroupId Inquiry group id
     *
     * psalm-return JSONResponse<array{inquiryGroup: InquiryGroup, inquiry: Inquiry}>
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/inquirygroup/{inquiryGroupId}/inquiry/{inquiryId}')]
    public function addInquiry(int $inquiryId, int $inquiryGroupId): JSONResponse
    {
        return $this->response(
            fn () => [
                'inquiryGroup' => $this->inquiryGroupService->addInquiryToInquiryGroup($inquiryId, $inquiryGroupId),
                'inquiry' => $this->inquiryService->get($inquiryId),
            ]
        );
    }

    /**
     * Update Inquirygroup details
     *
     * @param int    $inquiryGroupId Inquiry group id
     * @param string $name           Group name
     * @param string $titleExt       Extended title
     * @param string $description    Description
     *
     * psalm-return JSONResponse<array{inquiryGroup: InquiryGroup}>
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/inquirygroup/{inquiryGroupId}/update')]
    public function update(
        int $inquiryGroupId,
        string $name,
        string $titleExt,
        ?string $description,
    ): JSONResponse {
        return $this->response(
            fn () => [
                'inquiryGroup' => $this->inquiryGroupService->updateInquiryGroup($inquiryGroupId, $name, $titleExt, $description),
            ]
        );
    }

    /**
     * Remove inquiry from inquirygroup
     *
     * @param int $inquiryId      Inquiry id
     * @param int $inquiryGroupId Inquiry group id
     *
     * psalm-return JSONResponse<array{inquiryGroup: InquiryGroup | null, inquiry: Inquiry}>
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'DELETE', url: '/inquirygroup/{inquiryGroupId}/inquiry/{inquiryId}')]
    public function removeInquiry(int $inquiryId, int $inquiryGroupId): JSONResponse
    {
        return $this->response(
            fn () => [
                'inquiryGroup' => $this->inquiryGroupService->removeInquiryFromInquiryGroup($inquiryId, $inquiryGroupId),
                'inquiry' => $this->inquiryService->get($inquiryId),
            ]
        );
    }

    /**
     * Reorder inquiries in a group
     *
     * @param int   $inquiryGroupId Inquiry group id
     * @param array $inquiryIds     Ordered list of inquiry ids
     *
     * psalm-return JSONResponse<array{inquiryGroup: InquiryGroup}>
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/inquirygroup/{inquiryGroupId}/reorder')]
    public function reorderInquiries(int $inquiryGroupId): JSONResponse
    {
        try {
            $rawData = $this->request->getParams('data');
            $data = $rawData;

            if (!isset($data['inquiryIds']) || !is_array($data['inquiryIds'])) {
                throw new \InvalidArgumentException('inquiryIds array is required');
            }

            return $this->response(
                fn () => [
                    'inquiryGroup' => $this->inquiryGroupService->reorderInquiries($inquiryGroupId, $data['inquiryIds']),
                ]
            );
        } catch (\InvalidArgumentException $e) {
            return new JSONResponse(
                ['error' => 'VALIDATION_ERROR', 'message' => $e->getMessage()],
                Http::STATUS_BAD_REQUEST
            );
        }
    }

    /**
     * Change owner of an inquiry group
     *
     * @param int    $inquiryGroupId Inquiry group id
     * @param string $newOwnerId     New owner user id
     *
     * psalm-return JSONResponse<array{inquiryGroup: InquiryGroup}>
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/inquirygroup/{inquiryGroupId}/change-owner')]
    public function changeOwner(int $inquiryGroupId): JSONResponse
    {
        try {
            $rawData = $this->request->getParams('data');
            $data = $rawData;

            if (empty($data['newOwnerId'])) {
                throw new \InvalidArgumentException('newOwnerId is required');
            }

            return $this->response(
                fn () => [
                    'inquiryGroup' => $this->inquiryGroupService->changeOwner($inquiryGroupId, $data['newOwnerId']),
                ]
            );
        } catch (\InvalidArgumentException $e) {
            return new JSONResponse(
                ['error' => 'VALIDATION_ERROR', 'message' => $e->getMessage()],
                Http::STATUS_BAD_REQUEST
            );
        }
    }

    /**
     * Clone an inquiry group
     *
     * @param int $inquiryGroupId Inquiry group id
     *
     * psalm-return JSONResponse<array{inquiryGroup: InquiryGroup}>
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/inquirygroup/{inquiryGroupId}/clone')]
    public function cloneGroup(int $inquiryGroupId): JSONResponse
    {
        return $this->response(
            fn () => [
                'inquiryGroup' => $this->inquiryGroupService->cloneGroup($inquiryGroupId),
            ]
        );
    }
}
