<?php

declare(strict_types=1);

namespace OCA\Agora\Controller;

use OCA\Agora\Service\ParticipationService;
use OCA\Agora\Service\LotteryService;
use OCA\Agora\Db\ParticipationMapper;
use OCA\Agora\Db\LotteryRunMapper;
use OCA\Agora\Exceptions\Exception;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http;
use OCP\IRequest;

class ParticipationController extends BaseController
{
    public function __construct(
        string $appName,
        IRequest $request,
        private ParticipationService $participationService,
        private ParticipationMapper $participationMapper,
        private LotteryRunMapper $lotteryRunMapper,
        private LotteryService $lotteryService,
    ) {
        parent::__construct($appName, $request);
    }

    // ============================================================
    // PARTICIPATION ENDPOINTS
    // ============================================================

    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/participation/{targetType}/{targetId}')]
    public function getPolicy(string $targetType, int $targetId): JSONResponse
    {
        return $this->response(
            fn () => [
                'participation' => $this->participationService->getPolicyWithRelations($targetType, $targetId)
            ]
        );
    }

    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/participation/{targetType}/{targetId}')]
    public function setPolicy(
        string $targetType,
        int $targetId,
        string $policyType,
        array $policyConfig = []
    ): JSONResponse {
        return $this->response(
            fn () => [
                'participation' => $this->participationService->setPolicy(
                    $targetType,
                    $targetId,
                    $policyType,
                    $policyConfig
                )
            ]
        );
    }

    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'DELETE', url: '/participation/{targetType}/{targetId}')]
    public function deletePolicy(string $targetType, int $targetId): JSONResponse
    {
        return $this->response(
            fn () => [
                'deleted' => $this->participationService->deletePolicy($targetType, $targetId)
            ]
        );
    }

    // ============================================================
    // LOTTERY ENDPOINTS
    // ============================================================

    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/participation/{targetType}/{targetId}/lottery/status')]
    public function getLotteryStatus(string $targetType, int $targetId): DataResponse
    {
        try {
            $status = $this->participationService->getLotteryStatus($targetType, $targetId);
            return new DataResponse($status);
        } catch (\Exception $e) {
            return new DataResponse(['error' => $e->getMessage()], Http::STATUS_BAD_REQUEST);
        }
    }

    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/participation/{targetType}/{targetId}/lottery/pool')]
    public function getEligiblePool(string $targetType, int $targetId): DataResponse
    {
        try {
            $pool = $this->lotteryService->getEligiblePool($targetType, $targetId);
            return new DataResponse($pool);
        } catch (\Exception $e) {
            return new DataResponse(['error' => $e->getMessage()], Http::STATUS_BAD_REQUEST);
        }
    }

    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/participation/{targetType}/{targetId}/lottery/run')]
    public function runLottery(string $targetType, int $targetId, ?string $seed = null): DataResponse
    {
        try {
            $run = $this->participationService->runLotteryForTarget($targetType, $targetId, $seed);
            return new DataResponse($run->jsonSerialize());
        } catch (\Exception $e) {
            return new DataResponse(['error' => $e->getMessage()], Http::STATUS_BAD_REQUEST);
        }
    }

    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/participation/{targetType}/{targetId}/lottery/validate')]
    public function validateLottery(string $targetType, int $targetId): DataResponse
    {
        try {
            $run = $this->participationService->validateLotteryForTarget($targetType, $targetId);
            return new DataResponse($run->jsonSerialize());
        } catch (\Exception $e) {
            return new DataResponse(['error' => $e->getMessage()], Http::STATUS_BAD_REQUEST);
        }
    }

    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/participation/{targetType}/{targetId}/lottery/cancel')]
    public function cancelLottery(string $targetType, int $targetId, string $reason): DataResponse
    {
        try {
            $participation = $this->participationMapper->findByTarget($targetType, $targetId);
            if ($participation === null) {
                throw new Exception('Participation policy not found');
            }

            $latestRun = $this->lotteryRunMapper->findLatestByParticipationId($participation->getId());
            if ($latestRun === null) {
                throw new Exception('No lottery run found to cancel');
            }

            $run = $this->lotteryService->cancelLottery($latestRun->getId(), $reason);
            return new DataResponse($run->jsonSerialize());
        } catch (\Exception $e) {
            return new DataResponse(['error' => $e->getMessage()], Http::STATUS_BAD_REQUEST);
        }
    }

    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/participation/{targetType}/{targetId}/lottery/results')]
    public function getLotteryResults(string $targetType, int $targetId): JSONResponse
    {
        return $this->response(
            fn () => [
                'results' => $this->participationService->getLotteryResults($targetType, $targetId)
            ]
        );
    }

    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/lottery/selection/{selectionId}/accept')]
    public function acceptSelection(int $selectionId): JSONResponse
    {
        return $this->response(
            fn () => [
                'selection' => $this->participationService->acceptSelection($selectionId)
            ]
        );
    }

    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/lottery/selection/{selectionId}/decline')]
    public function declineSelection(int $selectionId): JSONResponse
    {
        return $this->response(
            fn () => [
                'selection' => $this->participationService->declineSelection($selectionId)
            ]
        );
    }
}
