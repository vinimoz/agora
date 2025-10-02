<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2023 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Db\Support;
use OCA\Agora\Service\SupportService;
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
    public function __construct(
        string $appName,
        IRequest $request,
        private SupportService $supportService,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Add support for an inquiry
     *
     * @param int $inquiryId ID of the inquiry to support
     *
     * @psalm-return JSONResponse<array{status: string, support: Support}>
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/inquiry/support/{inquiryId}/{userId}')]
    public function add(int $inquiryId,string $userId): JSONResponse
    {
        return $this->response(
            fn () => [
                'support' => $this->supportService->addSupport($inquiryId, $userId)
                ]
        );
    }

     /**
       * Remove support from an user of an inquiry
       *
       * @param int $inquiryId ID and userId f the inquiry to remove support from
       *
       * @psalm-return JSONResponse<array{status: string}>
S>
*/
      #[NoAdminRequired]
      #[FrontpageRoute(verb: 'DELETE', url: '/inquiry/support/{inquiryId}/{userId}')]
    public function remove(int $inquiryId, string $userId): JSONResponse
    {
        return $this->response(
            fn () => [
                'support' => $this->supportService->removeSupport($inquiryId, $userId)
                ]
        );
    }
    /**
     * Remove all supports for an inquiry
     *
     * @param int $inquiryId ID of the inquiry
     *
     * @psalm-return JSONResponse<array{status: string}>
     */
    #[FrontpageRoute(verb: 'DELETE', url: '/inquiry/support/inquiry/{inquiryId}/all')]
    public function removeAll(int $inquiryId): JSONResponse
    {
        return $this->response(
            function () use ($inquiryId) {
                $this->supportService->removeAllSupportForInquiry($inquiryId);
                return ['status' => 'success'];
            }
        );
    }

    /**
     * Get support for an inquiry
    /**
     * Get supports by user
     *
     * @param string $userId User ID
     *
     * @psalm-return JSONResponse<array{supports: array<Support>}>
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
     * Get supports for an inquiry
     *
     * @param int $inquiryId ID of the inquiry
     *
     * @psalm-return JSONResponse<array{supports: array<Support>}>
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
     *
     * @psalm-return JSONResponse<array<string, int>>
     */
    #[FrontpageRoute(verb: 'GET', url: '/inquiry/support/stats/grouped')]
    public function getGroupedStats(): JSONResponse
    {
        return $this->response(
            fn () => $this->supportService->getStatsGroupedByType()
        );
    }

}
