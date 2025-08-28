<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Db\Share;
use OCA\Agora\Model\SentResult;
use OCA\Agora\Model\User\User;
use OCA\Agora\Service\ShareService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\OpenAPI;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

/**
 * @psalm-api
 */
class ShareController extends BaseController
{
    public function __construct(
        string $appName,
        IRequest $request,
        private ShareService $shareService,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * List shares
  *
     * @param int $inquiryId inquiry id
     */
    #[NoAdminRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'GET', url: '/inquiry/{inquiryId}/shares')]
    public function list(int $inquiryId): JSONResponse
    {
        return $this->response(fn () => ['shares' => $this->shareService->list($inquiryId, 'inquiry')]);
    }

    /**
     * List shares
  *
     * @param int $inquiryGroupId inquiry id or group id
     */
    #[NoAdminRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'GET', url: '/inquirygroup/{inquiryGroupId}/shares')]
    public function listForInquiryGroup(int $inquiryGroupId): JSONResponse
    {
        return $this->response(fn () => ['shares' => $this->shareService->list($inquiryGroupId, 'inquiryGroup')]);
    }

    /**
     * Add share
  *
     * @param int    $inquiryId    inquiry id
     * @param string $type         Share type
     * @param string $userId       User id
     * @param string $displayName  Displayname of user
     * @param string $emailAddress Email address of user
     */
    #[NoAdminRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'POST', url: '/inquiry/{inquiryId}/share')]
    public function add(int $inquiryId, string $type, string $userId = '', string $displayName = '', string $emailAddress = ''): JSONResponse
    {
        return $this->response(
            fn () => ['share' => $this->shareService->add(
                inquiryOrInquiryGroupId: $inquiryId,
                type: $type,
                userId: $userId,
                displayName: $displayName,
                emailAddress: $emailAddress,
                purpose: 'inquiry',
            )],
            Http::STATUS_CREATED,
        );
    }

    /**
     * Add share for a inquiry group
  *
     * @param int    $inquiryGroupId inquiry group id
     * @param string $userId         User id
     */
    #[NoAdminRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'POST', url: '/inquirygroup/{inquiryGroupId}/share')]
    public function addForInquiryGroup(int $inquiryGroupId, string $userId = ''): JSONResponse
    {
        return $this->response(
            fn () => ['share' => $this->shareService->add(
                inquiryOrInquiryGroupId: $inquiryGroupId,
                type: User::TYPE,
                userId: $userId,
                purpose: 'inquiryGroup'
            )],
            Http::STATUS_CREATED,
        );
    }

    /**
     * Add share
  *
     * @param int $inquiryId inquiry id
     */
    #[NoAdminRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'POST', url: '/inquiry/{inquiryId}/publicshare')]
    public function addPublicShare(int $inquiryId): JSONResponse
    {
        return $this->response(
            fn () => ['share' => $this->shareService->add($inquiryId, Share::TYPE_PUBLIC)],
            Http::STATUS_CREATED,
        );
    }

    /**
     * Change the contraints for email addresses in public inquiries
  *
     * @param string $token Share token
     * @param string $value new value
     */
    #[NoAdminRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'PUT', url: '/share/{token}/publicinquiryemail/{value}')]
    public function setPublicInquiryEmail(string $token, string $value): JSONResponse
    {
        return $this->response(fn () => ['share' => $this->shareService->setPublicInquiryEmail($token, $value)]);
    }

    /**
     * Change Label of a public share
  *
     * @param string $token Share token
     * @param string $label new label of public inquiry
     */
    #[NoAdminRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'PUT', url: '/share/{token}/setlabel')]
    public function setLabel(string $token, string $label = ''): JSONResponse
    {
        return $this->response(
            fn () => [
                'share' => $this->shareService->setLabel($label, $token)
            ]
        );
    }

    /**
     * Convert inquiry admin to user
  *
     * @param string $token Share token
     */
    #[NoAdminRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'PUT', url: '/share/{token}/user')]
    public function adminToUser(string $token): JSONResponse
    {
        return $this->response(
            fn () => ['share' => $this->shareService->setType($token, Share::TYPE_USER)],
            Http::STATUS_CREATED, 
        );
    }

    /**
     * Convert user to inquiry admin
  *
     * @param string $token Share token
     */
    #[NoAdminRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'PUT', url: '/share/{token}/admin')]
    public function userToAdmin(string $token): JSONResponse
    {
        return $this->response(
            fn () => ['share' => $this->shareService->setType($token, Share::TYPE_ADMIN)],
            Http::STATUS_CREATED,
        );
    }

    /**
     * Delete share
  *
     * @param string $token Share token
     */
    #[NoAdminRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'DELETE', url: '/share/{token}')]
    public function delete(string $token): JSONResponse
    {
        return $this->response(fn () => ['share' => $this->shareService->deleteByToken($token)]);
    }

    /**
     * Restore deleted share
  *
     * @param string $token Share token
     */
    #[NoAdminRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'PUT', url: '/share/{token}/restore')]
    public function restore(string $token): JSONResponse
    {
        return $this->response(fn () => ['share' => $this->shareService->deleteByToken($token, restore: true)]);
    }

    /**
     * Lock a share (read only)
  *
     * @param string $token Share token
     */
    #[NoAdminRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'PUT', url: '/share/{token}/lock')]
    public function lock(string $token): JSONResponse
    {
        return $this->response(fn () => ['share' => $this->shareService->lockByToken($token)]);
    }

    /**
     * Unlock share
  *
     * @param string $token Share token
     */
    #[NoAdminRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'PUT', url: '/share/{token}/unlock')]
    public function unlock(string $token): JSONResponse
    {
        return $this->response(fn () => ['share' => $this->shareService->lockByToken($token, unlock: true)]);
    }

    /**
     * Send invitation mails for a share
     * Additionally send notification via notifications
  *
     * @param string $token Share token
     */
    #[NoAdminRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'POST', url: '/share/{token}/invite')]
    public function sendInvitation(string $token): JSONResponse
    {
        $share = $this->shareService->get($token);
        return $this->response(
            fn () => [
                'share' => $share,
                'sentResult' => $this->shareService->sendInvitation($share, new SentResult()),
            ]
        );
    }

    /**
     * Send all invitation mails for a share and resolve groups
     * Additionally send notification via notifications
  *
     * @param int $inquiryId inquiry id
     */
    #[NoAdminRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'PUT', url: '/inquiry/{inquiryId}/inviteAll')]
    public function sendAllInvitations(int $inquiryId): JSONResponse
    {
        return $this->response(
            fn () => [
                'inquiry' => $inquiryId,
                'sentResult' => $this->shareService->sendAllInvitations($inquiryId),
            ]
        );
    }

    /**
     * resolve contact group to individual shares
  *
     * @param string $token Share token
     */
    #[NoAdminRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'GET', url: '/share/{token}/resolve')]
    public function resolveGroup(string $token): JSONResponse
    {
        return $this->response(
            fn () => [
                'shares' => $this->shareService->resolveGroupByToken($token)
            ]
        );
    }

    /**
     * Set email address
  *
     * @param      string $token        Share token
     * @param      string $emailAddress Email address
     * @deprecated 8.0.0 Use PUT /s/{token}/email/{emailAddress}
     */
    #[NoAdminRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'PUT', url: '/share/{token}/email')]
    public function setEmailAddress(string $token, string $emailAddress = ''): JSONResponse
    {
        return $this->response(
            fn () => [
                'share' => $this->shareService->setEmailAddress(
                    $this->shareService->get($token),
                    $emailAddress
                )
            ]
        );
    }
}
