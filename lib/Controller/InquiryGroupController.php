<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\InquiryGroupService;
use OCA\Agora\Service\InquiryService;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
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
                'inquiryGroups' => $this->inquiryGroupService->listInquiryGroups(),
                ];
            }
        );
    }

    /**
     * Create a new inquirygroup with its title and add a inquiry to it
     *
     * @param int    $inquiryId        Inquiry id to add to the new inquirygroup
     * @param string $inquiryGroupName Name of the new inquirygroup
     *
     *                                 psalm-return JSONResponse<array{inquiryGroup: InquiryGroup, inquiry: Inquiry}>
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
     *                            psalm-return JSONResponse<array{inquiryGroup: InquiryGroup, inquiry: Inquiry}>
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
     * Update Inquirygroup
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
     *                            psalm-return JSONResponse<array{inquiryGroup: InquiryGroup | null, inquiry: Inquiry}>
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
}
