<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Db\Inquiry;
use OCA\Agora\Dto\InquiryDto;
use OCA\Agora\Model\Settings\AppSettings;
use OCA\Agora\Service\CommentService;
use OCA\Agora\Service\MailService;
use OCA\Agora\Service\OptionService;
use OCA\Agora\Service\InquiryGroupService;
use OCA\Agora\Service\AttachmentService;
use OCA\Agora\Service\InquiryService;
use OCA\Agora\Service\InquiryMiscService;
use OCA\Agora\Service\InquiryLinkService;
use OCA\Agora\Service\ShareService;
use OCA\Agora\Service\SubscriptionService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;
use Psr\Log\LoggerInterface;

/**
 * @psalm-api
 */
class InquiryController extends BaseController
{

    public function __construct(
        string $appName,
        IRequest $request,
        private MailService $mailService,
        private OptionService $optionService,
        private InquiryService $inquiryService,
        private InquiryMiscService $inquiryMiscService,
        private InquiryGroupService $inquiryGroupService,
        private InquiryLinkService $inquiryLinkService,
        private CommentService $commentService,
        private SubscriptionService $subscriptionService,
        private ShareService $shareService,
        private AttachmentService $attachmentService,
            private AppSettings $appSettings,
        private LoggerInterface $logger,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Get list of inquiries
     * psalm-return JSONResponse<array{
     *     inquiries: array<int, Inquiry>,
     *         permissions: array{
     *             inquiryCreationAllowed: bool,
     *             comboAllowed: bool
     *         },
     *     inquiryGroups: array<int, InquiryGroup>
     * }>
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/inquiries')]
    public function listInquiries(): JSONResponse
    {
        return $this->response(
            function () {
                $appSettings = $this->appSettings;
                return [
                'inquiries' => $this->inquiryService->listInquiries(),
                'permissions' => [
                'inquiryCreationAllowed' => $appSettings->getInquiryCreationAllowed(),
                ],
                'inquiryGroups' => $this->inquiryGroupService->listInquiryGroups(),
                ];
            }
        );
    }
    /**
     * get childs from an inquiry
  *
     * @param int $inquiryId Inquiry id
     *
     *                       psalm-return JSONResponse<array{inquiry: Inquiry}>
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/inquiry/{inquiryId}/childs')]
    public function getChildInquiryIds(int $inquiryId): JSONResponse
    {
        return $this->response(
            fn () => [
                'childs' => $this->inquiryService->getChildInquiryIds($inquiryId),
            ]
        );
    }



    /**
     * get inquiry
  *
     * @param int $inquiryId Inquiry id
     *
     *                       psalm-return JSONResponse<array{inquiry: Inquiry}>
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/inquiry/{inquiryId}/inquiry')]
    public function get(int $inquiryId): JSONResponse
    {
        return $this->response(
            fn () => [
                'inquiry' => $this->inquiryService->get($inquiryId),
            ]
        );
    }


    /**
     * get complete inquiry
     *
     * @param int $inquiryId Inquiry id
     *
     *                       psalm-return JSONResponse<array{
     *                       inquiry: Inquiry,
     *                       options: array<int, Option>,
     *                       comments: array<int, Comment>,
     *                       shares: array<int, Share>,
     *                       subscribed: Subscription|null
     *                       }>
     */

     #[NoAdminRequired]
     #[FrontpageRoute(verb: 'GET', url: '/inquiry/{inquiryId}')]
     public function getFull(int $inquiryId): JSONResponse
     {
         return $this->response(fn () => $this->getFullInquiry($inquiryId, true), Http::STATUS_OK);
    }

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

        $attachments = $this->attachmentService->getAll($inquiryId,0);
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


        if ($withTimings) {
            return [
                'inquiry' => $inquiry,
                'options' => $options,
                'comments' => $comments,
                'shares' => $shares,
                'subscribed' => $subscribed,
                'attachments' => $attachments,
                'inquiryLink' => $inquiryLink,
                'diffMicro' => $diffMicro,
            ];
        }
        return [
            'inquiry' => $inquiry,
            'options' => $options,
            'comments' => $comments,
            'shares' => $shares,
            'subscribed' => $subscribed,
            'attachments' => $attachments,
        ];
    }

    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/inquiry/add')]
    public function add(): JSONResponse
    {
        try {
            $rawData = $this->request->getParams('data');
            $data =$rawData;

            if (empty($data['title'])) {
                throw new \InvalidArgumentException('Title is required');
            }

            /*if (empty($data['type']) || !in_array($data['type'], Inquiry::INQ_VALID_TYPE::true)) {
            throw new \InvalidArgumentException('Invalid inquiry type');
            }*/

            $dto = new InquiryDto(
                (string) $data['title'],
                (string) $data['type'],
                isset($data['ownedGroup']) ? (string) $data['ownedGroup'] : '',
                isset($data['description']) ? (string) $data['description'] : '',
                isset($data['parentId']) ? (int) $data['parentId'] : 0,
                isset($data['locationId']) ? (int) $data['locationId'] : 0,
                isset($data['categoryId']) ? (int) $data['categoryId'] : 0,
                [],
            );

            $inquiry = $this->inquiryService->createFromDto($dto);

            return new JSONResponse(
                ['inquiry' => $inquiry->jsonSerialize()],
                Http::STATUS_CREATED
            );

        } catch (\InvalidArgumentException $e) {
            return new JSONResponse(
                ['error' => 'VALIDATION_ERROR', 'message' => $e->getMessage()],
                Http::STATUS_BAD_REQUEST
            );
        } catch (\Exception $e) {
            $this->logger->critical(
                'Server error', [
                    'exception' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]
            );

        }
        return new JSONResponse(
            ['error' => 'SERVER_ERROR', 'message' => 'An unexpected error occurred'],
            Http::STATUS_INTERNAL_SERVER_ERROR
        );
    }

    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/inquiry/{inquiryId}/updatemiscfield')]
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
            $result = $this->inquiryMiscService->setValue($inquiryId, $data['key'], $data['value'] ?? null);

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
     * Update inquiry with all possible fields
     *
     * @param  int $id Inquiry ID to update
     * @return JSONResponse<array{inquiry: Inquiry}>
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/inquiry/{inquiryId}')]
    public function update(int $inquiryId): JSONResponse
    {
        try {
            $rawData = $this->request->getParams('updateData');
            $data =$rawData;

            if (empty($data['title'])) {
                throw new \InvalidArgumentException('Title is required');
            }

        /*if (empty($data['type']) || !in_array($data['type'], Inquiry::INQ_VALID_TYPE::true)) {
        throw new \InvalidArgumentException('Invalid inquiry type');
        }*/

            $dto = new InquiryDto(
                (string) $data['title'],
                (string) $data['type'],
                isset($data['ownedGroup']) ? (string) $data['ownedGroup'] : '',
                isset($data['description']) ? (string) $data['description'] : '',
                isset($data['parentId']) ? (int) $data['parentId'] : 0,
                isset($data['locationId']) ? (int) $data['locationId'] : 0,
                isset($data['categoryId']) ? (int) $data['categoryId'] : 0,
                isset($data['miscFields']) && is_array($data['miscFields']) ? $data['miscFields'] : null,
            );

            // Partial update - only changed fields
            $updatedInquiry = $this->inquiryService->updatePartial($inquiryId, $dto);

            return new JSONResponse(
                ['inquiry' => $updatedInquiry->jsonSerialize()],
                Http::STATUS_OK
            );

        } catch (\InvalidArgumentException $e) {
            return new JSONResponse(
                ['error' => $e->getMessage()],
                Http::STATUS_BAD_REQUEST
            );
        } catch (\Exception $e) {
            return new JSONResponse(
                ['error' => 'Internal server error in update'],
                Http::STATUS_INTERNAL_SERVER_ERROR
            );
        }
    }


    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/inquiry/updateconfig/{inquiryId}')]
    public function updateConfiguration(int $inquiryId): JSONResponse
    {
        $rawData = $this->request->getParams('data');


        $this->logger->error('RAWWWWWWWWWWWWWWDATaAAAAAAAAAAAAAAAAAAA', ['data' => $rawData]);
        return $this->response(
            fn () => [
                'inquiry' => $this->inquiryService->updateConfig($inquiryId, $rawData['inquiryConfiguration']),
            ]
        );
    }

    /*
     * Update inquiry status 
     *
     * @param int $inquiryId Inquiry id
     * @param status $inquirg
     *
     * psalm-return JSONResponse<boolean>
     * */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/inquiry/updatestatus/{inquiryId}/{status}')]
    public function updateInquiryStatus(int $inquiryId, string $status): JSONResponse
    {
        return $this->response(
            fn () => [
                'inquiry' => $this->inquiryService->setInquiryStatus($inquiryId, $status),
            ]
        );
    }

    /*
     * Submit Inquiry for workflow moderation 
     *
     * @param int $inquiryId Inquiry id
     * @param status $action
     *
     * psalm-return JSONResponse<boolean>
     * */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/inquiry/submitinquiry/{inquiryId}')]
    public function submitInquiry(int $inquiryId): JSONResponse
    {
        $rawData = $this->request->getParams('data');
        return $this->response(
            fn () => [
                'inquiry' => $this->inquiryService->applyAction($inquiryId, $rawData['action']),
            ]
        );
    }


    /**
     * Lock Anonymous
     *
     * @param int $inquiryId Inquiry id
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/inquiry/{inquiryId}/lockAnonymous')]
    public function lockAnonymous(int $inquiryId): JSONResponse
    {
        return $this->response(
            fn () => [
                'inquiry' => $this->inquiryService->lockAnonymous($inquiryId),
            ]
        );
    }

    /**
     * Send confirmation mails
     *
     * @param int $inquiryId Inquiry id
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/inquiry/{inquiryId}/confirmation')]
    public function sendConfirmation(int $inquiryId): JSONResponse
    {
        return $this->response(
            fn () => [
                'confirmations' => $this->mailService->sendConfirmations($inquiryId),
            ]
        );
    }

    /**
     * Switch archived status (move to archive inquiries)
     *
     * @param int $inquiryId Inquiry id
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/inquiry/{inquiryId}/toggleArchive')]
    public function toggleArchive(int $inquiryId): JSONResponse
    {
        return $this->response(
            fn () => [
                'inquiry' => $this->inquiryService->toggleArchiveRecursive($inquiryId)
            ]
        );
    }

    /**
     * Delete inquiry
     *
     * @param int $inquiryId Inquiry id
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'DELETE', url: '/inquiry/{inquiryId}')]
    public function delete(int $inquiryId): JSONResponse
    {
        return $this->response(
            fn () => [
                'inquiry' => $this->inquiryService->delete($inquiryId)
            ]
        );
    }

    /**
     * Close inquiry
     *
     * @param int $inquiryId Inquiry id
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/inquiry/{inquiryId}/close')]
    public function close(int $inquiryId): JSONResponse
    {
        return $this->response(
            fn () => [
                'inquiry' => $this->inquiryService->close($inquiryId),
            ]
        );
    }

    /**
     * Reopen inquiry
     *
     * @param int $inquiryId Inquiry id
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/inquiry/{inquiryId}/reopen')]
    public function reopen(int $inquiryId): JSONResponse
    {
        return $this->response(
            fn () => [
                'inquiry' => $this->inquiryService->reopen($inquiryId),
            ]
        );
    }

    /**
     * Clone inquiry
     *
     * @param int $inquiryId Inquiry id
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/inquiry/{inquiryId}/clone')]
    public function clone(int $inquiryId): JSONResponse
    {
        $rawData = $this->request->getParams('data');
        return $this->response(
            fn () => [
                'inquiry' => $this->cloneInquiry($inquiryId, $rawData['type'])
            ]
        );
    }

    private function cloneInquiry(int $inquiryId): Inquiry
    {
        $inquiry = $this->inquiryService->clone($inquiryId);
        $this->optionService->clone($inquiryId, $inquiry->getId());
        return $this->inquiryService->get($inquiryId);
    }

    /**
     * Transfer inquiries between users
     *
     * @param string $sourceUserId User id to transfer inquiries from
     * @param string $targetUserId User id to transfer inquiries to
     */
    #[FrontpageRoute(verb: 'PUT', url: '/inquiry/transfer/{sourceUserId}/{targetUserId}')]
    public function transferInquiries(string $sourceUserId, string $targetUserId): JSONResponse
    {
        return $this->response(fn () => $this->inquiryService->transferInquiries($sourceUserId, $targetUserId));
    }

    /**
     * Transfer ownership of one inquiry
     *
     * @param int    $inquiryId    inquiry to transfer ownership
     * @param string $targetUserId User to transfer inquiries to
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/inquiry/{inquiryId}/changeowner/{targetUserId}')]
    public function changeOwner(int $inquiryId, string $targetUserId): JSONResponse
    {
        return $this->response(fn () => $this->inquiryService->transferInquiry($inquiryId, $targetUserId));
    }

    /**
     * Collect email addresses from particitipants
     *
     * @param int $inquiryId Inquiry id
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/inquiry/{inquiryId}/addresses')]
    public function getParticipantsEmailAddresses(int $inquiryId): JSONResponse
    {
        return $this->response(fn () => $this->inquiryService->getParticipantsEmailAddresses($inquiryId));
    }


    /**
     * Get echance Text for inquiry
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/inquiry/get-text-ai')]
    public function getTextAi(string $text): JSONResponse
    {
        $rawData = $this->request->getParams('data');
        return $this->response(fn () => $this->aiService->echanceText($rawData));
    }
}
