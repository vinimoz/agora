<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Model\Sequence;
use OCA\Agora\Model\SimpleOption;
use OCA\Agora\Service\OptionService;
use OCA\Agora\Service\SupportService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\ApiRoute;
use OCP\AppFramework\Http\Attribute\CORS;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;

/**
 * @psalm-api
 */
class OptionApiController extends BaseApiV2Controller
{
    public function __construct(
        string $appName,
        IRequest $request,
        private OptionService $optionService,
        private SupportService $supportService,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Get all options of given inquiry
  *
     * @param int $inquiryId Inquiry id
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/inquiry/{inquiryId}/options', requirements: ['apiVersion' => '(v2)'])]
    public function list(int $inquiryId): DataResponse
    {
        return $this->response(fn () => ['options' => $this->optionService->list($inquiryId)]);
    }

    /**
     * Add a new option
  *
     * @param int   $inquiryId  inquiry id
     * @param array $option     Options text for text inquiry
     * @param array $sequence   Sequence of the option
     * @param bool  $supportYes Support yes
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'POST', url: '/api/v1.0/inquiry/{inquiryId}/option', requirements: ['apiVersion' => '(v2)'])]
    public function add(
        int $inquiryId,
        array $option,
        bool $supportYes = false,
        ?array $sequence = null,
    ): DataResponse {
        return $this->response(
            fn () => array_merge(
                $this->optionService->addWithSequenceAndAutoSupport(
                    $inquiryId,
                    SimpleOption::fromArray($option),
                    $supportYes,
                    Sequence::fromArray($sequence),
                ),
                ['options' => $this->optionService->list($inquiryId)],
                ['supports' => $this->supportService->list($inquiryId)],
            ), Http::STATUS_CREATED
        );
    }


    /**
     * Add mulitple new options
  *
     * @param int    $inquiryId inquiry id
     * @param string $text      Options text for text inquiry
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'POST', url: '/api/v1.0/inquiry/{inquiryId}/options', requirements: ['apiVersion' => '(v2)'])]
    public function addBulk(int $inquiryId, string $text = ''): DataResponse
    {
        return $this->response(fn () => ['options' => $this->optionService->addBulk($inquiryId, $text)], Http::STATUS_CREATED);
    }

    /**
     * Update option
  *
     * @param int                             $optionId  Share token
     * @param int                             $timestamp timestamp for dateinquiry
     * @param string                          $text      Option text for text inquiry
     * @param int duration duration of option
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'PUT', url: '/api/v1.0/option/{optionId}', requirements: ['apiVersion' => '(v2)'])]
    public function update(int $optionId, int $timestamp = 0, string $text = '', int $duration = 0): DataResponse
    {
        return $this->response(fn () => ['option' => $this->optionService->update($optionId, $timestamp, $text, $duration)]);
    }

    /**
     * Delete option
  *
     * @param int $optionId option id
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'DELETE', url: '/api/v1.0/option/{optionId}', requirements: ['apiVersion' => '(v2)'])]
    public function delete(int $optionId): DataResponse
    {
        return $this->response(fn () => ['option' => $this->optionService->delete($optionId)]);
    }

    /**
     * Restore option
  *
     * @param int $optionId option id
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'PUT', url: '/api/v1.0/option/{optionId}/restore', requirements: ['apiVersion' => '(v2)'])]
    public function restore(int $optionId): DataResponse
    {
        return $this->response(fn () => ['option' => $this->optionService->delete($optionId, true)]);
    }

    /**
     * Switch option confirmation
  *
     * @param int $optionId option id
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'PUT', url: '/api/v1.0/option/{optionId}/confirm', requirements: ['apiVersion' => '(v2)'])]
    public function confirm(int $optionId): DataResponse
    {
        return $this->response(fn () => ['option' => $this->optionService->confirm($optionId)]);
    }

    /**
     * Set order position for option
  *
     * @param int $optionId option id
     * @param int $order    option's new position
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'PUT', url: '/api/v1.0/option/{optionId}/order/{order}', requirements: ['apiVersion' => '(v2)'])]
    public function setOrder(int $optionId, int $order): DataResponse
    {
        return $this->response(fn () => ['option' => $this->optionService->setOrder($optionId, $order)]);
    }
}
