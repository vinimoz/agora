<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\InquiryTypeService;
use OCP\AppFramework\Http\Attribute\ApiRoute;
use OCP\AppFramework\Http\Attribute\CORS;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;

/**
 * @psalm-api
 */
class InquiryTypeApiController extends BaseApiV2Controller
{
    public function __construct(
        string $appName,
        IRequest $request,
        private InquirySettingService $inquirySettingService,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Get all inquiry type
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/inquiry-type', requirements: ['apiVersion' => '(v2)'])]
    public function list(): DataResponse
    {
        return $this->response(
            fn () => ['type' => $this->inquirySettingService->findAll()]
        );
    }

    /**
     * Get inquiry type by family
     *
     * @param string $family Family name
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/inquiry-type/family/{family}', requirements: ['apiVersion' => '(v2)'])]
    public function listByFamily(string $family): DataResponse
    {
        return $this->response(
            fn () => ['type' => $this->inquirySettingService->findByFamily($family)]
        );
    }

    /**
     * Get inquiry type by type
     *
     * @param string $inquiryType Inquiry type
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/inquiry-type/type/{inquiryType}', requirements: ['apiVersion' => '(v2)'])]
    public function listByInquiryType(string $inquiryType): DataResponse
    {
        return $this->response(
            fn () => ['type' => $this->inquirySettingService->findByInquiryType($inquiryType)]
        );
    }

    /**
     * Get a specific inquiry setting
     *
     * @param int $id Setting ID
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/inquiry-setting/{id}', requirements: ['apiVersion' => '(v2)'])]
    public function get(int $id): DataResponse
    {
        return $this->response(
            fn () => ['setting' => $this->inquirySettingService->find($id)]
        );
    }

    /**
     * Get inquiry setting by type
     *
     * @param string $type Setting type
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/inquiry-setting/type/{type}', requirements: ['apiVersion' => '(v2)'])]
    public function getByType(string $type): DataResponse
    {
        return $this->response(
            fn () => ['setting' => $this->inquirySettingService->findByType($type)]
        );
    }

    /**
     * Create a new inquiry setting
     *
     * @param string      $type            Setting type
     * @param string      $inquiryType     Inquiry type
     * @param string      $family          Family name
     * @param string      $label           Setting label
     * @param string|null $description     Setting description
     * @param array|null  $fields          Setting fields
     * @param array|null  $allowedResponse Allowed responses
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'POST', url: '/api/v1.0/inquiry-setting', requirements: ['apiVersion' => '(v2)'])]
    public function create(
        string $type,
        string $inquiryType,
        string $family,
        string $label,
        ?string $description = null,
        ?array $fields = null,
        ?array $allowedResponse = null
    ): DataResponse {
        return $this->response(
            fn () => [
                'setting' => $this->inquirySettingService->create(
                    $type,
                    $inquiryType,
                    $family,
                    $label,
                    $description,
                    $fields,
                    $allowedResponse
                )
            ]
        );
    }

    /**
     * Delete an inquiry setting
     *
     * @param int $id Setting ID
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'DELETE', url: '/api/v1.0/inquiry-setting/{id}', requirements: ['apiVersion' => '(v2)'])]
    public function delete(int $id): DataResponse
    {
        return $this->response(
            fn () => ['setting' => $this->inquirySettingService->delete($id)]
        );
    }
}
