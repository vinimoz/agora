<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2020 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\AppConstants;
use OCA\Agora\Attributes\ShareTokenRequired;
use OCA\Agora\Model\SentResult;
use OCA\Agora\Model\Sequence;
use OCA\Agora\Model\Settings\AppSettings;
use OCA\Agora\Model\SimpleOption;
use OCA\Agora\Service\CommentService;
use OCA\Agora\Service\MailService;
use OCA\Agora\Service\OptionService;
use OCA\Agora\Service\InquiryService;
use OCA\Agora\Service\ShareService;
use OCA\Agora\Service\SubscriptionService;
use OCA\Agora\Service\SystemService;
use OCA\Agora\Service\SupportService;
use OCA\Agora\Service\WatchService;
use OCA\Agora\UserSession;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\Attribute\OpenAPI;
use OCP\AppFramework\Http\Attribute\PublicPage;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http\Template\PublicTemplateResponse;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\IAppConfig;
use OCP\IRequest;
use OCP\Util;

/**
 * Always use parent's class response* methods to make sure, the token gets set correctly.
 * Requesting the token inside the controller is not possible, because the token is submitted
 * as a paramter and not known while contruction time
 *
 * @psalm-api
 */
class PublicController extends BaseController
{
    public function __construct(
        string $appName,
        IRequest $request,
        private IAppConfig $appConfig,
        private UserSession $userSession,
        private AppSettings $appSettings,
        private CommentService $commentService,
        private MailService $mailService,
        private OptionService $optionService,
        private InquiryService $inquiryService,
        private ShareService $shareService,
        private SubscriptionService $subscriptionService,
        private SystemService $systemService,
        private SupportService $supportService,
        private WatchService $watchService,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * @return TemplateResponse|PublicTemplateResponse
     */
    #[PublicPage]
    #[NoCSRFRequired]
    #[ShareTokenRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'GET', url: '/s/{token}')]
    public function supportPage()
    {
        Util::addScript(AppConstants::APP_ID, 'agora-main');
        if ($this->userSession->getIsLoggedIn()) {
            return new TemplateResponse(AppConstants::APP_ID, 'main');
        } else {
            $template = new PublicTemplateResponse(AppConstants::APP_ID, 'main');
            $template->setFooterVisible($this->appConfig->getValueBool('agora', AppSettings::SETTING_USE_SITE_LEGAL, true));
            return $template;
        }
    }

    /**
     * get complete inquiry via token
     */
    #[PublicPage]
    #[ShareTokenRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'GET', url: '/s/{token}/inquiry')]
    public function getInquiry(): JSONResponse
    {
        return $this->response(
            function () {
                return [
                'inquiry' => $this->inquiryService->get($this->userSession->getShare()->getInquiryId()),
                'options' => $this->optionService->list($this->userSession->getShare()->getInquiryId()),
                'supports' => $this->supportService->list($this->userSession->getShare()->getInquiryId()),
                'comments' => $this->commentService->list($this->userSession->getShare()->getInquiryId()),
                'shares' => $this->shareService->list($this->userSession->getShare()->getInquiryId()),
                'subscribed' => $this->subscriptionService->get($this->userSession->getShare()->getInquiryId()),
                ];
            }
        );
    }

    /**
     * get session information
     */
    #[PublicPage]
    #[ShareTokenRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'GET', url: '/s/{token}/session')]
    public function getSession(): JSONResponse
    {
        return $this->response(
            fn () => [
                'token' => $this->request->getParam('token'),
                'currentUser' => $this->userSession->getCurrentUser(),
                'appPermissions' => $this->appSettings->getPermissionsArray(),
                'appSettings' => $this->appSettings->getAppSettings(),
                'share' => $this->userSession->getShare(),
            ]
        );
    }


    /**
     * Watch inquiry for updates
  *
     * @param int|null $offset only watch changes after this timestamp
     */
    #[PublicPage]
    #[NoCSRFRequired]
    #[ShareTokenRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'GET', url: '/s/{token}/watch')]
    public function watchInquiry(?int $offset): JSONResponse
    {
        return $this->response(
            fn () => [
                'updates' => $this->watchService->watchUpdates($this->userSession->getShare()->getInquiryId(), $offset)
            ]
        );
    }

    /**
     * Get share
  *
     * @param string $token Share token
     */
    #[PublicPage]
    #[ShareTokenRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'GET', url: '/s/{token}/share')]
    public function getShare(string $token): JSONResponse
    {
        return $this->response(
            fn () => [
                'share' => $this->shareService->request($token)
            ]
        );
    }

    /**
     * Get supports
     */
    #[PublicPage]
    #[ShareTokenRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'GET', url: '/s/{token}/supports')]
    public function getSupports(): JSONResponse
    {
        return $this->response(
            fn () => [
                'supports' => $this->supportService->list($this->userSession->getShare()->getInquiryId())
            ]
        );
    }

    /**
     * Delete current user's supports
     */
    #[PublicPage]
    #[ShareTokenRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'DELETE', url: '/s/{token}/user')]
    public function deleteUser(): JSONResponse
    {
        $inquiryId = $this->userSession->getShare()->getInquiryId();
        $this->supportService->deleteUserFromInquiry($inquiryId);
        return $this->response(
            fn () => [
                'inquiry' => $this->inquiryService->get($inquiryId),
                'options' => $this->optionService->list($inquiryId),
                'supports' => $this->supportService->list($inquiryId)
            ]
        );
    }

    /**
     * Delete current user's orphaned supports
     */
    #[PublicPage]
    #[ShareTokenRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'DELETE', url: '/s/{token}/supports/orphaned')]
    public function deleteOrphanedSupports(): JSONResponse
    {
        $inquiryId = $this->userSession->getShare()->getInquiryId();
        $this->supportService->deleteUserFromInquiry($inquiryId, deleteOnlyOrphaned: true);
        return $this->response(
            fn () => [
                'inquiry' => $this->inquiryService->get($inquiryId),
                'options' => $this->optionService->list($inquiryId),
                'supports' => $this->supportService->list($inquiryId)
            ]
        );
    }

    /**
     * Get options
     */
    #[PublicPage]
    #[ShareTokenRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'GET', url: '/s/{token}/options')]
    public function getOptions(): JSONResponse
    {
        return $this->response(
            fn () => [
                'options' => $this->optionService->list($this->userSession->getShare()->getInquiryId())
            ]
        );
    }

    /**
     * Add options
  *
     * @param array $option     Options text for text inquiry
     * @param array $sequence   Sequence of the option
     * @param bool  $supportYes Support yes
     */
    #[PublicPage]
    #[ShareTokenRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'POST', url: '/s/{token}/option')]
    public function addOption(
        array $option,
        bool $supportYes = false,
        ?array $sequence = null,
    ): JSONResponse {
        $inquiryId = $this->userSession->getShare()->getInquiryId();
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
     * Delete option
  *
     * @param int $optionId Option Id to delete
     */
    #[PublicPage]
    #[ShareTokenRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'DELETE', url: '/s/{token}/option/{optionId}')]
    public function deleteOption(int $optionId): JSONResponse
    {
        return $this->response(
            fn () => [
                'option' => $this->optionService->delete($optionId)
            ]
        );
    }

    /**
     * Restore option
  *
     * @param int $optionId Option Id to restore
     */
    #[PublicPage]
    #[ShareTokenRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'POST', url: '/s/{token}/option/{optionId}/restore')]
    public function restoreOption(int $optionId): JSONResponse
    {
        return $this->response(
            fn () => [
                'option' => $this->optionService->delete($optionId, true)
            ]
        );
    }

    /**
     * Set Support
  *
     * @param int    $optionId inquiry id
     * @param string $setTo    Answer string
     */
    #[PublicPage]
    #[ShareTokenRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'PUT', url: '/s/{token}/support')]
    public function setSupport(int $optionId, string $setTo): JSONResponse
    {
        $option = $this->optionService->get($optionId);
        $support = $this->supportService->set($optionId, $setTo);
        return $this->response(
            fn () => [
                'support' => $support,
                'inquiry' => $this->inquiryService->get($option->getInquiryId()),
                'options' => $this->optionService->list($option->getInquiryId()),
                'supports' => $this->supportService->list($option->getInquiryId())
            ]
        );
    }

    /**
     * Get Comments
     */
    #[PublicPage]
    #[ShareTokenRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'GET', url: '/s/{token}/comments')]
    public function getComments(): JSONResponse
    {
        return $this->response(
            fn () => [
                'comments' => $this->commentService->list($this->userSession->getShare()->getInquiryId())
            ]
        );
    }

    /**
     * Write a new comment to the db and returns the new comment as array
  *
     * @param string $message Comment text to add
     */
    #[PublicPage]
    #[ShareTokenRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'POST', url: '/s/{token}/comment')]
    public function addComment(string $message): JSONResponse
    {
        return $this->response(
            fn () => [
                'comment' => $this->commentService->add($message, $this->userSession->getShare()->getInquiryId())
            ]
        );
    }
    /**
     * Delete Support
  *
     * @param int $commentId Id of comment to delete
     */
    #[PublicPage]
    #[ShareTokenRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'DELETE', url: '/s/{token}/support/{commentId}')]
    public function deleteSupport(int $supportId): JSONResponse
    {
        return $this->response(
            fn () => [
                'comment' => $this->supportService->delete($supportId)
            ]
        );
    }

    /**
       /**
     * Delete Comment
  *
     * @param int $commentId Id of comment to delete
     */
    #[PublicPage]
    #[ShareTokenRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'DELETE', url: '/s/{token}/comment/{commentId}')]
    public function deleteComment(int $commentId): JSONResponse
    {
        return $this->response(
            fn () => [
                'comment' => $this->commentService->delete($commentId)
            ]
        );
    }

    /**
     * Restore deleted Comment
  *
     * @param int $commentId Id of comment to restore
     */
    #[PublicPage]
    #[ShareTokenRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'PUT', url: '/s/{token}/comment/{commentId}/restore')]
    public function restoreComment(int $commentId): JSONResponse
    {
        return $this->response(
            fn () => [
                'comment' => $this->commentService->delete($commentId, true)
            ]
        );
    }

    /**
     * Get subscription status
     */
    #[PublicPage]
    #[ShareTokenRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'GET', url: '/s/{token}/subscription')]
    public function getSubscription(): JSONResponse
    {
        return $this->response(
            fn () => [
                'subscribed' => $this->subscriptionService->get($this->userSession->getShare()->getInquiryId())
            ]
        );
    }

    /**
     * subscribe
     */
    #[PublicPage]
    #[ShareTokenRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'POST', url: '/s/{token}/subscribe')]
    public function subscribe(): JSONResponse
    {
        return $this->response(
            fn () => [
                'subscribed' => $this->subscriptionService->set(true, $this->userSession->getShare()->getInquiryId())
            ]
        );
    }

    /**
     * Unsubscribe
     */
    #[PublicPage]
    #[ShareTokenRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'POST', url: '/s/{token}/unsubscribe')]
    public function unsubscribe(): JSONResponse
    {
        return $this->response(
            fn () => [
                'subscribed' => $this->subscriptionService->set(false, $this->userSession->getShare()->getInquiryId())
            ]
        );
    }

    /**
     * Validate it the user name is reserved
     * return false, if this username already exists as a user or as a participant of the inquiry
  *
     * @param string $displayName Name string to check for validation
     * @param string $token       Share token
     */
    #[PublicPage]
    #[ShareTokenRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'POST', url: '/check/username')]
    public function validatePublicDisplayName(string $displayName, string $token): JSONResponse
    {
        return $this->response(
            fn () => [
                'name' => $this->systemService->validatePublicUsernameByToken($displayName, $token)
            ]
        );
    }

    /**
     * Validate email address (simple validation)
  *
     * @param string $emailAddress Email address string to check for validation
     */
    #[PublicPage]
    #[ShareTokenRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'GET', url: '/check/emailaddress/{emailAddress}')]
    public function validateEmailAddress(string $emailAddress): JSONResponse
    {
        return $this->response(
            fn () => [
                'result' => MailService::validateEmailAddress($emailAddress), 'emailAddress' => $emailAddress
            ]
        );
    }

    /**
     * Change displayName
  *
     * @param string $displayName New name
     * @param string $token       Share token
     */
    #[PublicPage]
    #[ShareTokenRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'PUT', url: '/s/{token}/name/{displayName}')]
    public function setDisplayName(string $token, string $displayName): JSONResponse
    {
        return $this->response(
            fn () => [
                'share' => $this->shareService->setDisplayname($displayName, $token)
            ]
        );
    }


    /**
     * Set EmailAddress
  *
     * @param string $token        Share token
     * @param string $emailAddress New email address
     */
    #[PublicPage]
    #[ShareTokenRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'PUT', url: '/s/{token}/email/{emailAddress}')]
    public function setEmailAddress(string $token, string $emailAddress = ''): JSONResponse
    {
        return $this->response(
            fn () => [
                'share' => $this->shareService->setEmailAddress($this->shareService->get($token), $emailAddress)
            ]
        );
    }

    /**
     * Set EmailAddress
  *
     * @param string $token Share token
     */
    #[PublicPage]
    #[ShareTokenRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'DELETE', url: '/s/{token}/email')]
    public function deleteEmailAddress(string $token): JSONResponse
    {
        return $this->response(
            fn () => [
                'share' => $this->shareService->deleteEmailAddress($this->shareService->get($token))
            ]
        );
    }

    /**
     * Create a personal share from a public share
     * or update an email share with the username
  *
     * @param string $token        Share token
     * @param string $displayName  Name
     * @param string $emailAddress Email address
     * @param string $timeZone     timezone string
     */
    #[PublicPage]
    #[ShareTokenRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'POST', url: '/s/{token}/register')]
    public function register(string $token, string $displayName, string $emailAddress = '', string $timeZone = ''): JSONResponse
    {
        return $this->response(
            fn () => [
                'share' => $this->shareService->register($token, $displayName, $emailAddress, $timeZone),
            ], Http::STATUS_CREATED
        );
    }

    /**
     * Sent invitation mails for a share
     * Additionally send notification via notifications
  *
     * @param string $token Share token
     */
    #[PublicPage]
    #[ShareTokenRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'POST', url: '/s/{token}/resend')]
    public function resendInvitation(string $token): JSONResponse
    {
        $share = $this->shareService->get($token);
        return $this->response(
            fn () => [
                'share' => $share,
                'sentResult' => $this->mailService->sendInvitation($share, new SentResult()),
            ]
        );
    }
}
