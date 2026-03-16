<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\AppConstants;
use OCA\Agora\Cron\AutoReminderCron;
use OCA\Agora\Cron\JanitorCron;
use OCA\Agora\Db\TableManager;
use OCA\Agora\Cron\NotificationCron;
use OCA\Agora\Service\InquiryService;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\Attribute\OpenAPI;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\Collaboration\Resources\LoadAdditionalScriptsEvent;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\IRequest;
use OCP\IURLGenerator;
use OCP\Util;
use OCP\IDBConnection;

/**
 * @psalm-api
 */
class AdminController extends BaseController
{
    private IDBConnection $connection;

    public function __construct(
        string $appName,
        IRequest $request,
        private IURLGenerator $urlGenerator,
        private InquiryService $inquiryService,
        private IEventDispatcher $eventDispatcher,
        private AutoReminderCron $autoReminderCron,
        private TableManager $tableManager,
        private JanitorCron $janitorCron,
        private NotificationCron $notificationCron,
        IDBConnection $connection, 
    ) {
        parent::__construct($appName, $request);
         $this->connection = $connection;
    }

    /**
     * Load admin page
     */
    #[NoCSRFRequired]
    #[OpenAPI(OpenAPI::SCOPE_IGNORE)]
    #[FrontpageRoute(verb: 'GET', url: '/administration')]
    public function index(): TemplateResponse
    {
        Util::addScript(AppConstants::APP_ID, 'agora-main');
        $this->eventDispatcher->dispatchTyped(new LoadAdditionalScriptsEvent());
        return new TemplateResponse(AppConstants::APP_ID, 'main', ['urlGenerator' => $this->urlGenerator]);
    }

    /**
     * Get list of inquiries for administrative purposes
     */
    #[FrontpageRoute(verb: 'GET', url: '/administration/inquiries')]
    public function list(): JSONResponse
    {
        return $this->response(fn () => $this->inquiryService->listForAdmin());
    }

    /**
     * Takeover ownership of a inquiry
  *
     * @param int $inquiryId InquiryId to take over
     */
    #[FrontpageRoute(verb: 'PUT', url: '/administration/inquiry/{inquiryId}/takeover')]
    public function takeover(int $inquiryId): JSONResponse
    {
        return $this->response(
            fn () => [
                'inquiry' => $this->inquiryService->takeover($inquiryId)
            ]
        );
    }

    /**
     * Run reset refresh data
     */
    #[FrontpageRoute(verb: 'GET', url: '/administration/cleaninstance/run')]
    public function runCleanInstance(): JSONResponse
    {
         $this->tableManager->setConnection($this->connection);

        $messages = [];

        $messages[] = $this->tableManager->cleanInstanceData('user_content');
        $messages[] = $this->tableManager->cleanInstanceData('configuration');
        $messages[] = $this->tableManager->cleanInstanceData('support');

        return new JSONResponse([
            'status' => 'success',
            'messages' => $messages
        ]);
    }


    /**
     * Run auto reminder job
     */
    #[FrontpageRoute(verb: 'GET', url: '/administration/autoreminder/run')]
    public function runAutoReminderJob(): JSONResponse
    {
        return $this->response(fn () => $this->autoReminderCron->manuallyRun());
    }

    /**
     * Run janitor job
     */
    #[FrontpageRoute(verb: 'GET', url: '/administration/janitor/run')]
    public function runJanitorJob(): JSONResponse
    {
        return $this->response(fn () => $this->janitorCron->manuallyRun());
    }

    /**
     * Run notification job
     */
    #[FrontpageRoute(verb: 'GET', url: '/administration/notification/run')]
    public function runNotificationJob(): JSONResponse
    {
        return $this->response(fn () => $this->notificationCron->manuallyRun());
    }
}
