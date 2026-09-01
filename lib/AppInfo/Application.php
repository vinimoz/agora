<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\AppInfo;

use OCA\Agora\AppConstants;
use OCA\Agora\Dashboard\AgoraWidget;
use OCA\Agora\Db\CommentMapper;
use OCA\Agora\Db\SupportMapper;
use OCA\Agora\Db\SupporResultMapper;
use OCA\Agora\Db\SupportSqlRepository;
use OCA\Agora\Db\SupportResultSqlRepository;
use OCA\Agora\Db\AttachmentMapper;
use OCA\Agora\Db\GroupRelationMapper;
use OCA\Agora\Db\UserRelationMapper;
use OCA\Agora\Db\LogMapper;
use OCA\Agora\Db\LotteryRunMapper;
use OCA\Agora\Db\LotterySelectionMapper;
use OCA\Agora\Db\OptionMapper;
use OCA\Agora\Db\ParticipationMapper;
use OCA\Agora\Db\InquiryMapper;
use OCA\Agora\Db\InquiryLinkMapper;
use OCA\Agora\Db\SubscriptionMapper;
use OCA\Agora\Db\UserMapper;
use OCA\Agora\Event\CommentAddEvent;
use OCA\Agora\Event\CommentDeleteEvent;
use OCA\Agora\Event\CommentEvent;
use OCA\Agora\Event\SupportAddEvent;
use OCA\Agora\Event\SupportDeleteEvent;
use OCA\Agora\Event\SupportEvent;
use OCA\Agora\Event\AttachmentAddEvent;
use OCA\Agora\Event\AttachmentDeleteEvent;
use OCA\Agora\Event\AttachmentEvent;
use OCA\Agora\Event\InquiryLinkAddEvent;
use OCA\Agora\Event\InquiryLinkDeleteEvent;
use OCA\Agora\Event\InquiryLinkEvent;
use OCA\Agora\Event\OptionConfirmedEvent;
use OCA\Agora\Event\OptionCreatedEvent;
use OCA\Agora\Event\OptionDeletedEvent;
use OCA\Agora\Event\OptionEvent;
use OCA\Agora\Event\InquiryCloseEvent;
use OCA\Agora\Event\InquiryEvent;
use OCA\Agora\Event\InquiryExpiredEvent;
use OCA\Agora\Event\InquiryOptionReorderedEvent;
use OCA\Agora\Event\InquiryOwnerChangeEvent;
use OCA\Agora\Event\InquiryReopenEvent;
use OCA\Agora\Event\InquiryRestoredEvent;
use OCA\Agora\Event\InquiryUpdatedEvent;
use OCA\Agora\Event\ShareChangedDisplayNameEvent;
use OCA\Agora\Event\ShareChangedEmailEvent;
use OCA\Agora\Event\ShareChangedLabelEvent;
use OCA\Agora\Event\ShareChangedRegistrationConstraintEvent;
use OCA\Agora\Event\ShareCreateEvent;
use OCA\Agora\Event\ShareDeletedEvent;
use OCA\Agora\Event\ShareEvent;
use OCA\Agora\Event\ShareLockedEvent;
use OCA\Agora\Event\ShareRegistrationEvent;
use OCA\Agora\Event\ShareTypeChangedEvent;
use OCA\Agora\Listener\CommentListener;
use OCA\Agora\Listener\SupportListener;
use OCA\Agora\Listener\AttachmentListener;
use OCA\Agora\Listener\GroupDeletedListener;
use OCA\Agora\Listener\InquiryLinkListener;
use OCA\Agora\Listener\OptionListener;
use OCA\Agora\Listener\InquiryListener;
use OCA\Agora\Listener\AgoraReferenceListener;
use OCA\Agora\Listener\ShareListener;
use OCA\Agora\Listener\UserDeletedListener;
use OCA\Agora\Middleware\RequestAttributesMiddleware;
use OCA\Agora\Model\Settings\AppSettings;
use OCA\Agora\Model\Settings\SystemSettings;
use OCA\Agora\Notification\Notifier;
use OCA\Agora\Provider\ReferenceProvider;
use OCA\Agora\Provider\SearchProvider;
use OCA\Agora\UserSession;
use OCA\Agora\Service\CategoryService;
use OCA\Agora\Service\LocationService;
use OCA\Agora\Service\ParticipationService;
use OCA\Agora\Service\InquiryStatusService;
use OCA\Agora\Service\InquiryTypeService;
use OCA\Agora\Service\InquiryGroupTypeService;
use OCA\Agora\Service\InquiryOptionTypeService;
use OCA\Agora\Service\InquiryFamilyService;
use OCA\Agora\Service\OptionFamilyService;
use OCA\Agora\Service\InquiryLinkService;
use OCA\Agora\Db\TrendingScore;
use OCA\Agora\Db\TrendingScoreMapper;

// ============ AI SERVICES ============
use OCP\TaskProcessing\IManager;
use OCA\Agora\Service\AIService;
use OCA\Agora\Service\Ai\AgoraService;
use OCA\Agora\Service\Ai\PromptRepository;
use OCA\Agora\Service\Ai\Document\DocumentParser;
use OCA\Agora\Service\Ai\Document\StructureAnalyzer;
use OCA\Agora\Service\Ai\GeneralAssistant;
use OCA\Agora\Service\Ai\OptionGenerator;
use OCA\Agora\Service\Ai\Summarizer;
use OCA\Agora\Service\Ai\Classifier;
use OCA\Agora\Service\Ai\DuplicateDetector;
use OCA\Agora\Service\Ai\DebateAssistant;
use OCA\Agora\Service\Ai\Translator;
use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCP\Collaboration\Reference\RenderReferenceEvent;
use OCP\Group\Events\GroupDeletedEvent;
use OCP\IAppConfig;
use OCP\IDBConnection;
use OCP\IUserManager;
use OCP\IGroupManager; 
use OCP\User\Events\UserDeletedEvent;
use OCP\Http\Client\IClientService;
use Psr\Container\ContainerInterface;
use Psr\Log\LoggerInterface;

/**
 * @psalm-api
 */
class Application extends App implements IBootstrap
{
    /**
     * @var string
     */
    public const APP_ID = AppConstants::APP_ID;

    public function __construct(array $urlParams = [])
    {
        parent::__construct(AppConstants::APP_ID, $urlParams);
    }

    public function boot(IBootContext $context): void
    {
        // empty method, but is mandatory as defined in the interface
    }

    public function register(IRegistrationContext $context): void
    {
        include_once __DIR__ . '/../../vendor/autoload.php';
        $this->registerServices($context);

        $context->registerEventListener(RenderReferenceEvent::class, AgoraReferenceListener::class);
        $context->registerMiddleWare(RequestAttributesMiddleware::class);
        $context->registerNotifierService(Notifier::class);

        $context->registerEventListener(CommentEvent::class, CommentListener::class);
        $context->registerEventListener(CommentAddEvent::class, CommentListener::class);
        $context->registerEventListener(CommentDeleteEvent::class, CommentListener::class);

        $context->registerEventListener(SupportEvent::class, SupportListener::class);
        $context->registerEventListener(SupportAddEvent::class, SupportListener::class);
        $context->registerEventListener(SupportDeleteEvent::class, SupportListener::class);

        $context->registerEventListener(AttachmentEvent::class, AttachmentListener::class);
        $context->registerEventListener(AttachmentAddEvent::class, AttachmentListener::class);
        $context->registerEventListener(AttachmentDeleteEvent::class, AttachmentListener::class);

        $context->registerEventListener(InquiryLinkEvent::class, InquiryLinkListener::class);
        $context->registerEventListener(InquiryLinkAddEvent::class, InquiryLinkListener::class);
        $context->registerEventListener(InquiryLinkDeleteEvent::class, InquiryLinkListener::class);

        $context->registerEventListener(OptionEvent::class, OptionListener::class);
        $context->registerEventListener(OptionConfirmedEvent::class, OptionListener::class);
        $context->registerEventListener(OptionCreatedEvent::class, OptionListener::class);
        $context->registerEventListener(OptionDeletedEvent::class, OptionListener::class);

        $context->registerEventListener(InquiryEvent::class, InquiryListener::class);
        $context->registerEventListener(InquiryExpiredEvent::class, InquiryListener::class);
        $context->registerEventListener(InquiryOptionReorderedEvent::class, InquiryListener::class);
        $context->registerEventListener(InquiryOwnerChangeEvent::class, InquiryListener::class);
        $context->registerEventListener(InquiryRestoredEvent::class, InquiryListener::class);
        $context->registerEventListener(InquiryUpdatedEvent::class, InquiryListener::class);
        $context->registerEventListener(InquiryReopenEvent::class, InquiryListener::class);
        $context->registerEventListener(InquiryCloseEvent::class, InquiryListener::class);

        $context->registerEventListener(ShareEvent::class, ShareListener::class);
        $context->registerEventListener(ShareChangedDisplayNameEvent::class, ShareListener::class);
        $context->registerEventListener(ShareChangedLabelEvent::class, ShareListener::class);
        $context->registerEventListener(ShareChangedEmailEvent::class, ShareListener::class);
        $context->registerEventListener(ShareChangedRegistrationConstraintEvent::class, ShareListener::class);
        $context->registerEventListener(ShareCreateEvent::class, ShareListener::class);
        $context->registerEventListener(ShareDeletedEvent::class, ShareListener::class);
        $context->registerEventListener(ShareLockedEvent::class, ShareListener::class);
        $context->registerEventListener(ShareRegistrationEvent::class, ShareListener::class);
        $context->registerEventListener(ShareTypeChangedEvent::class, ShareListener::class);

        $context->registerSearchProvider(SearchProvider::class);
        $context->registerDashboardWidget(AgoraWidget::class);
        $context->registerReferenceProvider(ReferenceProvider::class);
    }

    /**
     * Register some Services
     */
    private function registerServices(IRegistrationContext $context): void
    {
        $context->registerService(
            UserMapper::class,
            function (ContainerInterface $c): UserMapper {
                return new UserMapper(
                    $c->get(IDBConnection::class),
                    $c->get(IUserManager::class),
                    $c->get(LoggerInterface::class),
                );
            }
        );

        $context->registerService(
            AppSettings::class,
            function (ContainerInterface $c): AppSettings {
                return new AppSettings(
                    $c->get(IAppConfig::class),
                    $c->get(UserSession::class),
                    $c->get(SystemSettings::class),
                    $c->get(LoggerInterface::class),
                    $c->get(CategoryService::class),
                    $c->get(LocationService::class),
                    $c->get(InquiryStatusService::class),
                    $c->get(InquiryTypeService::class),
                    $c->get(InquiryGroupTypeService::class),
                    $c->get(InquiryOptionTypeService::class),
                    $c->get(InquiryFamilyService::class),
                    $c->get(OptionFamilyService::class),
                );
            }
        );

        $context->registerService(
            InquiryMapper::class,
            function (ContainerInterface $c): InquiryMapper {
                return new InquiryMapper(
                    $c->get(IDBConnection::class),
                    $c->get(UserSession::class),
                    $c->get(IGroupManager::class),
                    $c->get(GroupRelationMapper::class),
                    $c->get(UserRelationMapper::class),
                    $c->get(LoggerInterface::class),
                );
            }
        );

        $context->registerService(
            ParticipationMapper::class,
            function (ContainerInterface $c): ParticipationMapper {
                return new ParticipationMapper(
                    $c->get(IDBConnection::class),
                    $c->get(GroupRelationMapper::class),
                    $c->get(UserRelationMapper::class),
                    $c->get(IGroupManager::class),
                    $c->get(LotteryRunMapper::class),
                    $c->get(LotterySelectionMapper::class),
                );
            }
        );

        $context->registerService(
            CommentMapper::class,
            function (ContainerInterface $c): CommentMapper {
                return new CommentMapper(
                    $c->get(IDBConnection::class),
                    $c->get(UserSession::class),
                );
            }
        );

        $context->registerService(
            AttachmentMapper::class,
            function (ContainerInterface $c): AttachmentMapper {
                return new AttachmentMapper(
                    $c->get(IDBConnection::class),
                    $c->get(UserSession::class),
                );
            }
        );

        $context->registerService(
            InquiryLinkMapper::class,
            function (ContainerInterface $c): InquiryLinkMapper {
                return new InquiryLinkMapper(
                    $c->get(IDBConnection::class),
                    $c->get(UserSession::class),
                );
            }
        );

        $context->registerService(
            SupportResultMapper::class,
            function (ContainerInterface $c): SupportMapper {
                return new SupportResultMapper(
                    $c->get(IDBConnection::class),
                    $c->get(SupportSqlRepository::class),
                );
            }
        );

        $context->registerService(
            SupportMapper::class,
            function (ContainerInterface $c): SupportMapper {
                return new SupportMapper(
                    $c->get(IDBConnection::class),
                    $c->get(UserSession::class),
                    $c->get(SupportSqlRepository::class),
                );
            }
        );

        $context->registerService(
            OptionMapper::class,
            function (ContainerInterface $c): OptionMapper {
                return new OptionMapper(
                    $c->get(IDBConnection::class),
                    $c->get(UserSession::class),
                    $c->get(IGroupManager::class),
                    $c->get(InquiryMapper::class),
                    $c->get(GroupRelationMapper::class),
                    $c->get(UserRelationMapper::class),
                    $c->get(LoggerInterface::class),
                );
            }
        );

        $context->registerService(
            SubscriptionMapper::class,
            function (ContainerInterface $c): SubscriptionMapper {
                return new SubscriptionMapper(
                    $c->get(IDBConnection::class),
                );
            }
        );

        $context->registerService(
            LogMapper::class,
            function (ContainerInterface $c): LogMapper {
                return new LogMapper(
                    $c->get(IDBConnection::class),
                );
            }
        );

        // ============ AI SERVICES ============
        
        // Register AIService (Nextcloud AI integration)
        $context->registerService(
            AIService::class,
            function (ContainerInterface $c): AIService {
                return new AIService(
                    $c->get(IManager::class),
                    $c->get(LoggerInterface::class),
                );
            }
        );

        // Register PromptRepository
        $context->registerService(
            PromptRepository::class,
            function (ContainerInterface $c): PromptRepository {
                return new PromptRepository();
            }
        );

        // Register DocumentParser
        $context->registerService(
            DocumentParser::class,
            function (ContainerInterface $c): DocumentParser {
                return new DocumentParser();
            }
        );

	$context->registerService(TrendingScoreMapper::class, function ($c) {
        return new TrendingScoreMapper(
            $c->get(IDBConnection::class)
        );
    	});

        // Register AgoraService (main AI service)
        $context->registerService(
            AgoraService::class,
            function (ContainerInterface $c): AgoraService {
                return new AgoraService(
                    $c->get(PromptRepository::class),
                    $c->get(AIService::class),
                    $c->get(DocumentParser::class),
                    $c->get(StructureAnalyzer::class)
                );
            }
        );

        // Register individual AI services
        $context->registerService(
            GeneralAssistant::class,
            function (ContainerInterface $c): GeneralAssistant {
                return $c->get(AgoraService::class)->getGeneralAssistant();
            }
        );

        $context->registerService(
            OptionGenerator::class,
            function (ContainerInterface $c): OptionGenerator {
                return $c->get(AgoraService::class)->getOptionGenerator();
            }
        );

        $context->registerService(
            Summarizer::class,
            function (ContainerInterface $c): Summarizer {
                return $c->get(AgoraService::class)->getSummarizer();
            }
        );

        $context->registerService(
            Classifier::class,
            function (ContainerInterface $c): Classifier {
                return $c->get(AgoraService::class)->getClassifier();
            }
        );

        $context->registerService(
            DuplicateDetector::class,
            function (ContainerInterface $c): DuplicateDetector {
                return new DuplicateDetector(
                    $c->get(PromptRepository::class),
                );
            }
        );

        $context->registerService(
            DebateAssistant::class,
            function (ContainerInterface $c): DebateAssistant {
                return new DebateAssistant(
                    $c->get(PromptRepository::class),
                );
            }
        );

        $context->registerService(
            Translator::class,
            function (ContainerInterface $c): Translator {
                return new Translator(
                    $c->get(PromptRepository::class),
                );
            }
        );
    }
}
