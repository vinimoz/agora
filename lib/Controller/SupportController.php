<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2023 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Db\Support;
use OCA\Agora\Db\SupportMapper;  
use OCA\Agora\Service\SupportService;
use OCA\Agora\Service\SupportResultService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

/**
 * @psalm-api
 */
class SupportController extends BaseController
{
    private SupportResultService $supportResultService;

    public function __construct(
        string $appName,
        IRequest $request,
        private SupportService $supportService,
        SupportResultService $supportResultService,
    ) {
        parent::__construct($appName, $request);
        $this->supportResultService = $supportResultService;
    }

    private function resultForBallot(?int $engineId, int $inquiryId, int $optionId): ?array
    {
	    if ($engineId === null) {
		    // deliberative, case 1 / 2
		    $type = $optionId > 0 ? 'option' : 'inquiry';
		    $id   = $optionId > 0 ? $optionId : $inquiryId;
		    $rows = $this->supportResultService->getResultsByTarget($type, $id, null);
		    return $rows ? array_values($rows)[0]->getResult() : null;
	    }

	    // case 4: inquiry_id = 0 && option_id = 0
	    if ($inquiryId === 0 && $optionId === 0) {
		    $engine = $this->supportResultService->resolveEngine($engineId);
		    if ($engine === null || $engine->getInquiryGroupId() <= 0) {
			    return null;
		    }
		    return $this->supportResultService->getGroupResultForEngine(
			    $engine->getInquiryGroupId(),
			    $engineId
		    );
	    }
	    // cases 3a / 3b: inquiry_id > 0, option_id may be 0 or > 0
	    $type = $optionId > 0 ? 'option' : 'inquiry';
	    $id   = $optionId > 0 ? $optionId : $inquiryId;
	    $rows = $this->supportResultService->getResultsByTarget($type, $id, $engineId);
	    return $rows ? array_values($rows)[0]->getResult() : null;
    }

    /**
     * Add support for an inquiry
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/inquiry/support/{inquiryId}/{userId}/{optionId}')]
public function add(int $inquiryId, string $userId, int $optionId): JSONResponse
{
    return $this->response(
        function () use ($inquiryId, $userId, $optionId) {
            $body = json_decode(file_get_contents('php://input'), true);
            $value = $body['value'] ?? null;
            $weight = $body['weight'] ?? 1;
            $engineId = $body['engineId'] ?? null;

            if ($value === null) {
                throw new \InvalidArgumentException('Support value is required');
            }

            $support = $this->supportService->addSupport($inquiryId, $userId, $value, $optionId, $weight, $engineId);

            return [
                'support' => $support,
                'result'  => $this->resultForBallot($engineId, $inquiryId, $optionId),
            ];
        }
    );
}
    /**
     * Update support for an inquiry
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/inquiry/support/{inquiryId}/{userId}/{optionId}')]
    public function update(int $inquiryId, string $userId, int $optionId): JSONResponse
    {
	    return $this->response(
		    function () use ($inquiryId, $userId, $optionId) {
			    $body = json_decode(file_get_contents('php://input'), true);
			    $value = $body['value'] ?? null;
			    $weight = $body['weight'] ?? 1;
			    $engineId = $body['engineId'] ?? null;

			    $support = $this->supportService->updateSupport($inquiryId, $userId, $value, $optionId, $weight, $engineId);


			    return [
				    'support' => $support,
				    'result'  => $this->resultForBallot($engineId, $inquiryId, $optionId),
			    ];
		    }
	    );
    }

    /**
     * Remove support from a user for an inquiry
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'DELETE', url: '/inquiry/support/{inquiryId}/{userId}/{optionId}')]
    public function remove(int $inquiryId, string $userId, int $optionId): JSONResponse
    {
	    return $this->response(
		    function () use ($inquiryId, $userId, $optionId) {
			    // Try to get engineId from query or body (optional)
			    $engineId = $this->request->getParam('engineId');
			    if ($engineId === null) {
				    // fallback: parse from body if sent as JSON
				    $body = json_decode(file_get_contents('php://input'), true);
				    $engineId = $body['engineId'] ?? null;
			    }

			    $success = $this->supportService->removeSupport($inquiryId, $userId, $optionId, $engineId);

			    return [
				    'success' => $success,
				    'result'  => $this->resultForBallot($engineId, $inquiryId, $optionId),
			    ];
		    }
	    );
    }

    /**
     * Remove support with engine context
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'DELETE', url: '/inquiry/support/{inquiryId}/{userId}/{optionId}/{engineId}')]
    public function removeWithEngine(int $inquiryId, string $userId, int $optionId, int $engineId): JSONResponse
    {
	    return $this->response(
		    function () use ($inquiryId, $userId, $optionId, $engineId) {
			    $success = $this->supportService->removeSupport($inquiryId, $userId, $optionId, $engineId);


			    return [
				    'success' => $success,
				    'result'  => $this->resultForBallot($engineId, $inquiryId, $optionId),
			    ];
		    }
	    );
    }

    /**
     * Remove all supports for an inquiry
     */
    #[FrontpageRoute(verb: 'DELETE', url: '/inquiry/support/inquiry/{inquiryId}/all')]
    public function removeAll(int $inquiryId): JSONResponse
    {
	    return $this->response(
		    function () use ($inquiryId) {
			    $count = $this->supportService->removeAllSupportForInquiry($inquiryId);
			    return ['success' => true, 'count' => $count];
		    }
	    );
    }

    /**
     * Get supports by user
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/inquiry/support/user/{userId}')]
    public function getByUser(string $userId): JSONResponse
    {
	    return $this->response(
		    fn () => [
			    'supports' => $this->supportService->getSupportsForUser($userId)
		    ]
	    );
    }


    /**
     * Get supports for a group (Case 4 — engine-scoped, inquiry_group_id set, inquiry_id = 0)
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/inquiry/support/group/{groupId}')]
    public function getByGroupId(int $groupId): JSONResponse
    {
	    return $this->response(
		    fn () => [
			    'supports' => $this->supportService->getSupportByGroupId($groupId)
		    ]
	    );
    }

    /**
     * Get supports for a specific engine (Case 3 and Case 4)
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/inquiry/support/engine/{engineId}')]
    public function getByEngineId(int $engineId): JSONResponse
    {
	    return $this->response(
		    fn () => [
			    'supports' => $this->supportService->getSupportByEngineId($engineId)
		    ]
	    );
    }

    /**
     * Get supports for an inquiry
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/inquiry/support/inquiry/{inquiryId}')]
    public function getByInquiryId(int $inquiryId): JSONResponse
    {
	    return $this->response(
		    fn () => [
			    'supports' => $this->supportService->getSupportByInquiryId($inquiryId)
		    ]
	    );
    }

    /**
     * Get support statistics grouped by inquiry type
     */
    #[FrontpageRoute(verb: 'GET', url: '/inquiry/support/stats/grouped')]
    public function getGroupedStats(): JSONResponse
    {
	    return $this->response(
		    fn () => $this->supportService->getStatsGroupedByType()
	    );
    }
}
