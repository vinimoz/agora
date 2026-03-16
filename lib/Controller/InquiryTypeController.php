<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\InquiryTypeService;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\IRequest;

/**
 * @psalm-api
 */
class InquiryTypeController extends BaseController
{
    public function __construct(
        string $appName,
        IRequest $request,
        private InquiryTypeService $inquiryTypeService,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Display the main inquiry types page
     *
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function index(): TemplateResponse
    {
        return new TemplateResponse(
            $this->appName,
            'inquiry-types',
            [
                'inquiryTypes' => $this->inquiryTypeService->findAll(),
                'pageTitle' => 'Inquiry Types'
            ]
        );
    }

    /**
     * Display inquiry types by family
     *
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function byFamily(string $family): TemplateResponse
    {
        return new TemplateResponse(
            $this->appName,
            'inquiry-types-family',
            [
                'inquiryTypes' => $this->inquiryTypeService->findByFamily($family),
                'family' => $family,
                'pageTitle' => 'Inquiry Types - ' . ucfirst($family)
            ]
        );
    }

    /**
     * Display a specific inquiry type
     *
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function show(string $inquiryType): TemplateResponse
    {
        $typeData = $this->inquiryTypeService->findByInquiryType($inquiryType);

        return new TemplateResponse(
            $this->appName,
            'inquiry-type-detail',
            [
                'inquiryType' => $typeData,
                'pageTitle' => 'Inquiry Type - ' . ($typeData['label'] ?? $inquiryType)
            ]
        );
    }

    /**
     * Display the form to create a new inquiry type
     *
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function createForm(): TemplateResponse
    {
        return new TemplateResponse(
            $this->appName,
            'inquiry-type-create',
            [
                'pageTitle' => 'Create New Inquiry Type',
                'families' => $this->getAvailableFamilies()
            ]
        );
    }

    /**
     * Process the creation of a new inquiry type
     *
     * @NoAdminRequired
     */
    public function create(
        string $type,
        string $inquiryType,
        string $family,
        string $label,
        ?string $description = null,
        ?array $fields = null,
        ?array $allowedResponse = null,
        ?string $icon = null,
        ?array $allowedTransformation = null,
        ?array $allowedOptionType = null,
    ): TemplateResponse {
        try {
            $type = $this->inquiryTypeService->create(
                $type,
                $inquiryType,
                $family,
                $label,
                $description,
                $fields,
                $allowedResponse,
                $icon,
                $allowedTransformation,
                $allowedOptionType,
            );

            return new TemplateResponse(
                $this->appName,
                'inquiry-type-created',
                [
                    'type' => $type,
                    'pageTitle' => 'Inquiry Type Created',
                    'success' => true
                ]
            );
        } catch (\Exception $e) {
            return new TemplateResponse(
                $this->appName,
                'inquiry-type-create',
                [
                    'pageTitle' => 'Create New Inquiry Type',
                    'families' => $this->getAvailableFamilies(),
                    'error' => $e->getMessage(),
                    'formData' => [
                        'type' => $type,
                        'inquiryType' => $inquiryType,
                        'family' => $family,
                        'label' => $label,
                        'description' => $description,
                        'fields' => $fields,
                        'allowedResponse' => $allowedResponse,
                        'icon' => $icon,
                        'allowedTransformation' => $allowedTransformation,
                        'allowedOptionType' => $allowedOptionType,
                    ]
                ]
            );
        }
    }

    /**
     * Display the form to edit an inquiry type
     *
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function editForm(int $id): TemplateResponse
    {
        $type = $this->inquiryTypeService->find($id);

        return new TemplateResponse(
            $this->appName,
            'inquiry-type-edit',
            [
                'type' => $type,
                'pageTitle' => 'Edit Inquiry Type',
                'families' => $this->getAvailableFamilies()
            ]
        );
    }

    /**
     * Process the update of an inquiry type
     *
     * @NoAdminRequired
     */
    public function update(
        int $id,
        string $type,
        string $inquiryType,
        string $family,
        string $label,
        ?string $description = null,
        ?array $fields = null,
        ?array $allowedResponse = null,
        ?string $icon = null,
        ?array $allowedTransformation = null,
        ?array $allowedOptionType = null,
    ): TemplateResponse {
        try {
            $type = $this->inquiryTypeService->update(
                $id,
                $type,
                $inquiryType,
                $family,
                $label,
                $description,
                $fields,
                $allowedResponse,
                $icon,
                $allowedTransformation,
                $allowedOptionType,
            );

            return new TemplateResponse(
                $this->appName,
                'inquiry-type-updated',
                [
                    'type' => $type,
                    'pageTitle' => 'Inquiry Type Updated',
                    'success' => true
                ]
            );
        } catch (\Exception $e) {
            $type = $this->inquiryTypeService->find($id);

            return new TemplateResponse(
                $this->appName,
                'inquiry-type-edit',
                [
                    'type' => $type,
                    'pageTitle' => 'Edit Inquiry Type',
                    'families' => $this->getAvailableFamilies(),
                    'error' => $e->getMessage()
                ]
            );
        }
    }

    /**
     * Display the confirmation page for deleting an inquiry type
     *
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function deleteConfirm(int $id): TemplateResponse
    {
        $type = $this->inquiryTypeService->find($id);

        return new TemplateResponse(
            $this->appName,
            'inquiry-type-delete-confirm',
            [
                'type' => $type,
                'pageTitle' => 'Delete Inquiry Type'
            ]
        );
    }

    /**
     * Process the deletion of an inquiry type
     *
     * @NoAdminRequired
     */
    public function delete(int $id): TemplateResponse
    {
        try {
            $result = $this->inquiryTypeService->delete($id);

            return new TemplateResponse(
                $this->appName,
                'inquiry-type-deleted',
                [
                    'success' => $result,
                    'pageTitle' => 'Inquiry Type Deleted'
                ]
            );
        } catch (\Exception $e) {
            $type = $this->inquiryTypeService->find($id);

            return new TemplateResponse(
                $this->appName,
                'inquiry-type-detail',
                [
                    'inquiryType' => $type,
                    'pageTitle' => 'Inquiry Type - ' . ($type['label'] ?? 'Unknown'),
                    'error' => $e->getMessage()
                ]
            );
        }
    }

    /**
     * Get available families for dropdown
     */
    private function getAvailableFamilies(): array
    {
        $inquiryTypes = $this->inquiryTypeService->findAll();
        $families = [];

        foreach ($inquiryTypes as $type) {
            if (isset($type['family']) && !in_array($type['family'], $families)) {
                $families[] = $type['family'];
            }
        }

        return array_unique($families);
    }

    /**
     * Display inquiry types as JSON for AJAX requests
     *
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function jsonAll(): TemplateResponse
    {
        return new TemplateResponse(
            $this->appName,
            'inquiry-types-json',
            [
                'inquiryTypes' => $this->inquiryTypeService->findAll(),
                'pageTitle' => 'Inquiry Types JSON'
            ],
            'blank'
        );
    }

    /**
     * Display fields configuration for a specific inquiry type
     *
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function fieldsConfig(string $inquiryType): TemplateResponse
    {
        $typeData = $this->inquiryTypeService->findByInquiryType($inquiryType);
        $fields = $typeData['fields'] ?? [];

        return new TemplateResponse(
            $this->appName,
            'inquiry-type-fields',
            [
                'inquiryType' => $typeData,
                'fields' => $fields,
                'pageTitle' => 'Fields Configuration - ' . ($typeData['label'] ?? $inquiryType)
            ]
        );
    }
}
