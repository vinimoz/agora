<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Db\Inquiry;
use OCA\Agora\Dto\InquiryDto;
use OCA\Agora\Service\CommentService;
use OCA\Agora\Service\AttachmentService;
use OCA\Agora\Service\OptionService;
use OCA\Agora\Service\InquiryService;
use OCA\Agora\Service\InquiryMiscService;
use OCA\Agora\Service\InquiryLinkService;
use OCA\Agora\Service\ShareService;
use OCA\Agora\Service\SubscriptionService;
use OCA\Agora\Service\MailService;
use OCA\Agora\Model\Settings\AppSettings;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\ApiRoute;
use OCP\AppFramework\Http\Attribute\CORS;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;
use Psr\Log\LoggerInterface;

/**
 * @psalm-api
 * @psalm-import-type InquiriesInquiry from \OCA\Agora\ResponseDefinitions
 */
class InquiryApiController extends BaseApiV2Controller
{
    public function __construct(
        string $appName,
        IRequest $request,
        private CommentService $commentService,
        private InquiryService $inquiryService,
        private InquiryMiscService $inquiryMiscService,
        private InquiryLinkService $inquiryLinkService,
        private OptionService $optionService,
        private ShareService $shareService,
        private SubscriptionService $subscriptionService,
        private AttachmentService $attachmentService,
        private MailService $mailService,
        private AppSettings $appSettings,
        private LoggerInterface $logger,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Get list of inquiries
     *
     * psalm-return DataResponse<array{
     *     inquiries: array<int, Inquiry>,
     *     permissions: array{
     *         inquiryCreationAllowed: bool
     *     },
     *     inquiryGroups: array<int, InquiryGroup>
     * }>
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/inquiries', requirements: ['apiVersion' => '(v2)'])]
    public function listInquiries(): DataResponse
    {
        return $this->response(fn () => [
            'inquiries' => $this->inquiryService->listInquiries(),
            'permissions' => [
                'inquiryCreationAllowed' => $this->appSettings->getInquiryCreationAllowed(),
            ],
            'inquiryGroups' => $this->inquiryGroupService->listInquiryGroups(),
        ]);
    }

    /**
     * Get child inquiries
     *
     * @param int $inquiryId Inquiry id
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/inquiry/{inquiryId}/childs', requirements: ['apiVersion' => '(v2)'])]
    public function getChildInquiryIds(int $inquiryId): DataResponse
    {
        return $this->response(fn () => [
            'childs' => $this->inquiryService->getChildInquiryIds($inquiryId)
        ]);
    }

    /**
     * Get complete inquiry (full details)
     *
     * @param int $inquiryId Inquiry id
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/inquiry/{inquiryId}', requirements: ['apiVersion' => '(v2)'])]
    public function getFull(int $inquiryId): DataResponse
    {
        return $this->response(fn () => $this->getFullInquiry($inquiryId));
    }

    /**
     * Get basic inquiry
     *
     * @param int $inquiryId Inquiry id
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/inquiry/{inquiryId}/basic', requirements: ['apiVersion' => '(v2)'])]
    public function get(int $inquiryId): DataResponse
    {
        return $this->response(fn () => [
            'inquiry' => $this->inquiryService->get($inquiryId)
        ]);
    }

    /**
     * Add inquiry
     *
     * @param string $title Inquiry title
     * @param string $type Inquiry type
     * @param string $ownedGroup Owner group
     * @param string $description Inquiry description
     * @param int $parentId Parent inquiry ID
     * @param int $locationId Location ID
     * @param int $categoryId Category ID
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'POST', url: '/api/v1.0/inquiry', requirements: ['apiVersion' => '(v2)'])]
    public function add(
        string $title,
        string $type,
        ?string $ownedGroup = '',
        ?string $description = '',
        ?int $parentId = 0,
        ?int $locationId = 0,
        ?int $categoryId = 0
    ): DataResponse {
        try {
            $dto = new InquiryDto(
                $title,
                $type,
                $ownedGroup ?? '',
                $description ?? '',
                $parentId ?? 0,
                $locationId ?? 0,
                $categoryId ?? 0,
                []
            );

            $inquiry = $this->inquiryService->createFromDto($dto);

            return new DataResponse(
                ['inquiry' => $inquiry->jsonSerialize()],
                Http::STATUS_CREATED
            );
        } catch (\InvalidArgumentException $e) {
            return new DataResponse(
                ['error' => 'VALIDATION_ERROR', 'message' => $e->getMessage()],
                Http::STATUS_BAD_REQUEST
            );
        } catch (\Exception $e) {
            $this->logger->error('Error creating inquiry: ' . $e->getMessage(), [
                'exception' => $e
            ]);
            return new DataResponse(
                ['error' => 'SERVER_ERROR', 'message' => 'An unexpected error occurred'],
                Http::STATUS_INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * Update inquiry
     *
     * @param int $inquiryId Inquiry id
     * @param string $title Inquiry title
     * @param string $type Inquiry type
     * @param string $ownedGroup Owner group
     * @param string $description Inquiry description
     * @param int $parentId Parent inquiry ID
     * @param int $locationId Location ID
     * @param int $categoryId Category ID
     * @param array|null $miscFields Misc fields
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'PUT', url: '/api/v1.0/inquiry/{inquiryId}', requirements: ['apiVersion' => '(v2)'])]
    public function update(
        int $inquiryId,
        string $title,
        string $type,
        ?string $ownedGroup = '',
        ?string $description = '',
        ?int $parentId = 0,
        ?int $locationId = 0,
        ?int $categoryId = 0,
        ?array $miscFields = null
    ): DataResponse {
        try {
            $dto = new InquiryDto(
                $title,
                $type,
                $ownedGroup ?? '',
                $description ?? '',
                $parentId ?? 0,
                $locationId ?? 0,
                $categoryId ?? 0,
                $miscFields
            );

            $updatedInquiry = $this->inquiryService->updatePartial($inquiryId, $dto);

            return new DataResponse(
                ['inquiry' => $updatedInquiry->jsonSerialize()],
                Http::STATUS_OK
            );
        } catch (\InvalidArgumentException $e) {
            return new DataResponse(
                ['error' => $e->getMessage()],
                Http::STATUS_BAD_REQUEST
            );
        } catch (\Exception $e) {
            $this->logger->error('Error updating inquiry: ' . $e->getMessage(), [
                'inquiryId' => $inquiryId,
                'exception' => $e
            ]);
            return new DataResponse(
                ['error' => 'Internal server error in update'],
                Http::STATUS_INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * Update misc field
     *
     * @param int $inquiryId Inquiry id
     * @param string $key Field key
     * @param mixed $value Field value
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'PUT', url: '/api/v1.0/inquiry/{inquiryId}/miscfield', requirements: ['apiVersion' => '(v2)'])]
    public function updateMiscField(int $inquiryId, string $key, $value = null): DataResponse
    {
        if (empty(trim($key))) {
            return new DataResponse([
                'error' => 'Key cannot be null or empty for misc field update'
            ], Http::STATUS_BAD_REQUEST);
        }

        try {
            $result = $this->inquiryMiscService->setValue($inquiryId, $key, $value);

            return new DataResponse([
                'success' => true,
                'misc' => $result
            ]);
        } catch (\Exception $e) {
            $this->logger->error('Error updating misc field: ' . $e->getMessage(), [
                'inquiryId' => $inquiryId,
                'key' => $key
            ]);

            return new DataResponse([
                'error' => $e->getMessage()
            ], Http::STATUS_BAD_REQUEST);
        }
    }

    /**
     * Update inquiry configuration
     *
     * @param int $inquiryId Inquiry id
     * @param array $inquiryConfiguration Inquiry config
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'PUT', url: '/api/v1.0/inquiry/{inquiryId}/config', requirements: ['apiVersion' => '(v2)'])]
    public function updateConfiguration(int $inquiryId, array $inquiryConfiguration): DataResponse
    {
        return $this->response(fn () => [
            'inquiry' => $this->inquiryService->updateConfig($inquiryId, $inquiryConfiguration)
        ]);
    }

    /**
     * Update inquiry status
     *
     * @param int $inquiryId Inquiry id
     * @param string $status New status
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'PUT', url: '/api/v1.0/inquiry/{inquiryId}/status/{status}', requirements: ['apiVersion' => '(v2)'])]
    public function updateInquiryStatus(int $inquiryId, string $status): DataResponse
    {
        return $this->response(fn () => [
            'inquiry' => $this->inquiryService->setInquiryStatus($inquiryId, $status)
        ]);
    }

    /**
     * Submit inquiry for workflow moderation
     *
     * @param int $inquiryId Inquiry id
     * @param string $action Action to apply
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'PUT', url: '/api/v1.0/inquiry/{inquiryId}/submit', requirements: ['apiVersion' => '(v2)'])]
    public function submitInquiry(int $inquiryId, string $action): DataResponse
    {
        return $this->response(fn () => [
            'inquiry' => $this->inquiryService->applyAction($inquiryId, $action)
        ]);
    }

    /**
     * Lock anonymous access
     *
     * @param int $inquiryId Inquiry id
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'PUT', url: '/api/v1.0/inquiry/{inquiryId}/lockAnonymous', requirements: ['apiVersion' => '(v2)'])]
    public function lockAnonymous(int $inquiryId): DataResponse
    {
        return $this->response(fn () => [
            'inquiry' => $this->inquiryService->lockAnonymous($inquiryId)
        ]);
    }

    /**
     * Send confirmation mails
     *
     * @param int $inquiryId Inquiry id
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'POST', url: '/api/v1.0/inquiry/{inquiryId}/confirmation', requirements: ['apiVersion' => '(v2)'])]
    public function sendConfirmation(int $inquiryId): DataResponse
    {
        return $this->response(fn () => [
            'confirmations' => $this->mailService->sendConfirmations($inquiryId)
        ]);
    }

    /**
     * Toggle archive status
     *
     * @param int $inquiryId Inquiry id
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'PUT', url: '/api/v1.0/inquiry/{inquiryId}/archive/toggle', requirements: ['apiVersion' => '(v2)'])]
    public function toggleArchive(int $inquiryId): DataResponse
    {
        return $this->response(fn () => [
            'inquiry' => $this->inquiryService->toggleArchiveRecursive($inquiryId)
        ]);
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
        return $this->response(fn () => [
            'inquiry' => $this->inquiryService->close($inquiryId)
        ]);
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
        return $this->response(fn () => [
            'inquiry' => $this->inquiryService->reopen($inquiryId)
        ]);
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
        return $this->response(fn () => [
            'inquiry' => $this->inquiryService->delete($inquiryId)
        ]);
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
        return $this->response(fn () => [
            'inquiry' => $this->cloneInquiry($inquiryId)
        ], Http::STATUS_CREATED);
    }

    /**
     * Transfer all inquiries from one user to another
     *
     * @param string $sourceUserId User id to transfer inquiries from
     * @param string $targetUserId User id to transfer inquiries to
     */
    #[CORS]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'PUT', url: '/api/v1.0/inquiry/transfer/{sourceUserId}/{targetUserId}', requirements: ['apiVersion' => '(v2)'])]
    public function transferInquiries(string $sourceUserId, string $targetUserId): DataResponse
    {
        return $this->response(fn () => [
            'transferred' => $this->inquiryService->transferInquiries($sourceUserId, $targetUserId)
        ]);
    }

    /**
     * Transfer single inquiry to another user
     *
     * @param int $inquiryId Inquiry to transfer
     * @param string $targetUserId User id to transfer the inquiry to
     */
    #[CORS]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'PUT', url: '/api/v1.0/inquiry/{inquiryId}/transfer/{targetUserId}', requirements: ['apiVersion' => '(v2)'])]
    public function transferInquiry(int $inquiryId, string $targetUserId): DataResponse
    {
        return $this->response(fn () => [
            'transferred' => $this->inquiryService->transferInquiry($inquiryId, $targetUserId)
        ]);
    }

    /**
     * Get participants email addresses
     *
     * @param int $inquiryId Inquiry id
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/inquiry/{inquiryId}/addresses', requirements: ['apiVersion' => '(v2)'])]
    public function getParticipantsEmailAddresses(int $inquiryId): DataResponse
    {
        return $this->response(fn () => [
            'addresses' => $this->inquiryService->getParticipantsEmailAddresses($inquiryId)
        ]);
    }

    /**
     * Get valid enum values for configuration options
     */
    #[CORS]
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[ApiRoute(verb: 'GET', url: '/api/v1.0/enum', requirements: ['apiVersion' => '(v2)'])]
    public function enum(): DataResponse
    {
        return $this->response(fn () => [
            'enum' => $this->inquiryService->getValidEnum()
        ]);
    }

    /**
     * Private helper methods
     */
    private function getFullInquiry(int $inquiryId, bool $withTimings = false): array
    {
        $timerMicro['start'] = microtime(true);

        $inquiry = $this->inquiryService->get($inquiryId, true);
        $inquiry->setMiscFields($this->inquiryMiscService->findByInquiryId($inquiryId));

        $diffMicro['total'] = microtime(true) - $timerMicro['start'];
        $timerMicro['inquiry'] = microtime(true);

        $options = $this->optionService->listByTargetId($inquiryId);
        $timerMicro['options'] = microtime(true);

        $comments = $this->commentService->list($inquiryId);
        $timerMicro['comments'] = microtime(true);

        $shares = $this->shareService->list($inquiryId);
        $timerMicro['shares'] = microtime(true);

        $subscribed = $this->subscriptionService->get($inquiryId);
        $timerMicro['subscribed'] = microtime(true);

        $attachments = $this->attachmentService->getAll($inquiryId, 0);
        $timerMicro['attachments'] = microtime(true);

        $inquiryLink = $this->inquiryLinkService->findByInquiryId($inquiryId);
        $timerMicro['inquiryLink'] = microtime(true);

        $diffMicro['inquiry'] = $timerMicro['inquiry'] - $timerMicro['start'];
        $diffMicro['options'] = $timerMicro['options'] - $timerMicro['inquiry'];
        $diffMicro['comments'] = $timerMicro['comments'] - $timerMicro['options'];
        $diffMicro['shares'] = $timerMicro['shares'] - $timerMicro['comments'];
        $diffMicro['subscribed'] = $timerMicro['subscribed'] - $timerMicro['shares'];
        $diffMicro['attachments'] = $timerMicro['attachments'] - $timerMicro['subscribed'];
        $diffMicro['inquiryLink'] = $timerMicro['inquiryLink'] - $timerMicro['attachments'];

        $result = [
            'inquiry' => $inquiry,
            'options' => $options,
            'comments' => $comments,
            'shares' => $shares,
            'subscribed' => $subscribed,
            'attachments' => $attachments,
            'inquiryLink' => $inquiryLink,
        ];

        if ($withTimings) {
            $result['diffMicro'] = $diffMicro;
        }

        return $result;
    }

    private function cloneInquiry(int $inquiryId): Inquiry
    {
        $inquiry = $this->inquiryService->clone($inquiryId);
        $this->optionService->clone($inquiryId, $inquiry->getId());
        return $this->inquiryService->get($inquiry->getId());
    }
}
