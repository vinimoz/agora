<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Db\Inquiry;
use OCA\Agora\Service\CommentService;
use OCA\Agora\Service\AttachmentService;
use OCA\Agora\Service\OptionService;
use OCA\Agora\Service\InquiryService;
use OCA\Agora\Service\ShareService;
use OCA\Agora\Service\SubscriptionService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\ApiRoute;
use OCP\AppFramework\Http\Attribute\CORS;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;

/**
 * @psalm-api
 * @psalm-import-type InquiriesInquiry from \OCA\Agora\ResponseDefinitions
 *  */
class InquiryApiController extends BaseApiV2Controller
{
    public function __construct(
        string $appName,
        IRequest $request,
        private CommentService $commentService,
        private InquiryService $inquiryService,
        private OptionService $optionService,
        private ShareService $shareService,
        private SubscriptionService $subscriptionService,
        private AttachmentService $attachmentService,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Get list of inquiries
     *
     * psalm-return DataResponse<array{inquiries: InquiriesInquiry[]}>
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/inquiries', requirements: ['apiVersion' => '(v2)'])]
    public function listInquiries(): DataResponse
    {
        return $this->response(fn () => ['inquiries' => $this->inquiryService->listInquiries()]);
    }

    /**
     * get complete inquiry
  *
     * @param int $inquiryId Inquiry id
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/inquiry/{inquiryId}', requirements: ['apiVersion' => '(v2)'])]
    public function get(int $inquiryId): DataResponse
    {
        return $this->response(
            fn () => [
                'inquiry' => $this->inquiryService->get($inquiryId),
                'options' => $this->optionService->list($inquiryId),
                'comments' => $this->commentService->list($inquiryId),
                'shares' => $this->shareService->list($inquiryId),
                'subscribed' => $this->subscriptionService->get($inquiryId),
                'attachments' => $this->attachmentService->getAll($inquiryId),
            ]
        );
    }

    /**
     * Add inquiry
  *
     * @param string $title Inquiry title
     * @param string $type  Inquiry type ('dateInquiry', 'textInquiry')
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'POST', url: '/api/v1.0/inquiry', requirements: ['apiVersion' => '(v2)'])]
    public function add(string $type, string $title): DataResponse
    {
        return $this->response(fn () => ['inquiry' => $this->inquiryService->add($type, $title)], Http::STATUS_CREATED);
    }

    /**
     * Update inquiry configuration
  *
     * @param int   $inquiryId            Inquiry id
     * @param array $inquiryConfiguration inquiry config
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'PUT', url: '/api/v1.0/inquiry/updateconfig/{inquiryId}', requirements: ['apiVersion' => '(v2)'])]
    public function updateConfiguration(int $inquiryId, array $inquiryConfiguration): DataResponse
    {
        return $this->response(fn () => ['inquiry' => $this->inquiryService->updateConfig($inquiryId, $inquiryConfiguration)]);
    }
    /**
     * Update inquiry configuration
  *
     * @param int   $inquiryId            Inquiry id
     * @param array $inquiryConfiguration inquiry config
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'PUT', url: '/api/v1.0/inquiry/{inquiryId}', requirements: ['apiVersion' => '(v2)'])]
    public function update(int $inquiryId): DataResponse
    {
        return $this->response(fn () => ['inquiry' => $this->inquiryService->updatePartial($inquiryId)]);
    }

    /**
       /**
     * Switch deleted status (move to deleted inquiries)
  *
     * @param int $inquiryId Inquiry id
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'PUT', url: '/api/v1.0/inquiry/{inquiryId}/archive/toggle', requirements: ['apiVersion' => '(v2)'])]
    public function toggleArchive(int $inquiryId): DataResponse
    {
        return $this->response(fn () => ['inquiry' => $this->inquiryService->toggleArchive($inquiryId)]);
    }

    /**
     * Close inquiry
  *
     * @param int $inquiryId Inquiry id
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'PUT', url: '/api/v1.0/inquiry/{inquiryId}/close', requirements: ['apiVersion' => '(v2)'])]
    public function close(int $inquiryId): DataResponse
    {
        return $this->response(fn () => ['inquiry' => $this->inquiryService->close($inquiryId)]);
    }

    /**
     * Reopen inquiry
  *
     * @param int $inquiryId Inquiry id
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'PUT', url: '/api/v1.0/inquiry/{inquiryId}/reopen', requirements: ['apiVersion' => '(v2)'])]
    public function reopen(int $inquiryId): DataResponse
    {
        return $this->response(fn () => ['inquiry' => $this->inquiryService->reopen($inquiryId)]);
    }

    /**
     * Delete inquiry
  *
     * @param int $inquiryId Inquiry id
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'DELETE', url: '/api/v1.0/inquiry/{inquiryId}', requirements: ['apiVersion' => '(v2)'])]
    public function delete(int $inquiryId): DataResponse
    {
        return $this->response(fn () => ['inquiry' => $this->inquiryService->delete($inquiryId)]);
    }

    /**
     * Clone inquiry
  *
     * @param int $inquiryId Inquiry id
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'POST', url: '/api/v1.0/inquiry/{inquiryId}/clone', requirements: ['apiVersion' => '(v2)'])]
    public function clone(int $inquiryId): DataResponse
    {
        return $this->response(fn () => ['inquiry' => $this->inquiryService->clone($inquiryId)], Http::STATUS_CREATED);
    }

    /**
     * Transfer all inquiries from one user to another (change owner of inquiry)
  *
     * @param string $sourceUserId User id to transfer inquiries from
     * @param string $targetUserId User id to transfer inquiries to
     */
    #[CORS]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'PUT', url: '/api/v1.0/inquiry/transfer/{sourceUserId}/{targetUserId}', requirements: ['apiVersion' => '(v2)'])]
    public function transferInquiries(string $sourceUserId, string $targetUserId): DataResponse
    {
        return $this->response(fn () => ['transferred' => $this->inquiryService->transferInquiries($sourceUserId, $targetUserId)]);
    }

    /**
     * Transfer single inquiry to another user (change owner of inquiry)
  *
     * @param int    $inquiryId    Inquiry to transfer
     * @param string $targetUserId User id to transfer the inquiry to
     */
    #[CORS]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'PUT', url: '/api/v1.0/inquiry/{inquiryId}/transfer/{targetUserId}', requirements: ['apiVersion' => '(v2)'])]
    public function transferInquiry(int $inquiryId, string $targetUserId): DataResponse
    {
        return $this->response(fn () => ['transferred' => $this->inquiryService->transferInquiry($inquiryId, $targetUserId)]);
    }

    /**
     * Collect email addresses from particitipants
  *
     * @param int $inquiryId Inquiry id
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/inquiry/{inquiryId}/addresses', requirements: ['apiVersion' => '(v2)'])]
    public function getParticipantsEmailAddresses(int $inquiryId): DataResponse
    {
        return $this->response(fn () => ['addresses' => $this->inquiryService->getParticipantsEmailAddresses($inquiryId)]);
    }

    /**
     * Get valid values for configuration options
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/enum', requirements: ['apiVersion' => '(v2)'])]
    public function enum(): DataResponse
    {
        return $this->response(fn () => ['enum' => $this->inquiryService->getValidEnum()]);
    }
}
