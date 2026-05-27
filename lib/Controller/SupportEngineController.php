<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;
use OCP\AppFramework\Http;
use OCA\Agora\Service\SupportEngineService;
use Psr\Log\LoggerInterface;
use OCA\Agora\Db\SupportEngine; 

class SupportEngineController extends Controller
{
    public function __construct(
        string $appName,
        IRequest $request,
        private SupportEngineService $engineService,
        private LoggerInterface $logger,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Get all engines for an inquiry
     */
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[FrontpageRoute(verb: 'GET', url: '/support/engine/inquiry/{inquiryId}')]
    public function getByInquiry(int $inquiryId): DataResponse
    {
        try {
            $engines = $this->engineService->getEnginesByInquiry($inquiryId);
            return new DataResponse($engines);
        } catch (\Exception $e) {
            $this->logger->error('Error getting engines by inquiry', [
                'inquiryId' => $inquiryId,
                'error' => $e->getMessage()
            ]);
            return new DataResponse(['error' => $e->getMessage()], Http::STATUS_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get all engines for an inquiry group
     */
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[FrontpageRoute(verb: 'GET', url: '/support/engine/inquiry-group/{inquiryGroupId}')]
    public function getByInquiryGroup(int $inquiryGroupId): DataResponse
    {
        try {
            $engines = $this->engineService->getEnginesByInquiryGroup($inquiryGroupId);
            return new DataResponse($engines);
        } catch (\Exception $e) {
            $this->logger->error('Error getting engines by inquiry group', [
                'inquiryGroupId' => $inquiryGroupId,
                'error' => $e->getMessage()
            ]);
            return new DataResponse(['error' => $e->getMessage()], Http::STATUS_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get a single engine by ID
     */
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[FrontpageRoute(verb: 'GET', url: '/support/engine/{id}')]
    public function getEngine(int $id): DataResponse
    {
        try {
            $engine = $this->engineService->getEngine($id);
            if (!$engine) {
                return new DataResponse(['error' => 'Engine not found'], Http::STATUS_NOT_FOUND);
            }
            return new DataResponse($engine);
        } catch (\Exception $e) {
            $this->logger->error('Error getting engine', [
                'id' => $id,
                'error' => $e->getMessage()
            ]);
            return new DataResponse(['error' => $e->getMessage()], Http::STATUS_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Create a new support engine
     */
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[FrontpageRoute(verb: 'POST', url: '/support/engine')]
    public function create(): JSONResponse
    {
        try {
            // Get JSON input from request body
            $data = $this->getJsonInput();
            
            if (!$data) {
                return new JSONResponse(['error' => 'Invalid JSON data'], Http::STATUS_BAD_REQUEST);
            }

            // Validate required fields
            $requiredFields = ['engine', 'title', 'target_type', 'target_ids'];
            foreach ($requiredFields as $field) {
                if (!isset($data[$field])) {
                    return new JSONResponse(['error' => "Missing required field: {$field}"], Http::STATUS_BAD_REQUEST);
                }
            }

            $engine = $this->engineService->createEngine([
                'engine' => $data['engine'],
                'title' => $data['title'],
                'description' => $data['description'] ?? '',
                'purpose' => $data['purpose'] ?? '',
                'inquiry_group_id' => $data['inquiry_group_id'] ?? null,
                'inquiry_id' => $data['inquiry_id'] ?? 0,
                'status' => $data['status'] ?? SupportEngine::STATUS_DRAFT,
                'config' => $data['config'] ?? [],
                'target_type' => $data['target_type'],
                'target_ids' => $data['target_ids'],
                'metadata' => $data['metadata'] ?? []
            ]);

            return new JSONResponse($engine, Http::STATUS_CREATED);
        } catch (\Exception $e) {
            $this->logger->error('Error creating support engine', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update an existing support engine
     */
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/support/engine/{id}')]
    public function update(int $id): JSONResponse
    {
        try {
            $data = $this->getJsonInput();
            
            if (!$data) {
                return new JSONResponse(['error' => 'Invalid JSON data'], Http::STATUS_BAD_REQUEST);
            }

            // Check if engine can be modified (has votes?)
            if (isset($data['engine'])) {
                $hasVotes = $this->engineService->hasVotes($id);
                if ($hasVotes) {
                    return new JSONResponse(['error' => 'Cannot change engine type after votes have been cast'], Http::STATUS_CONFLICT);
                }
            }

            $updatedEngine = $this->engineService->updateEngine($id, $data);
            if (!$updatedEngine) {
                return new JSONResponse(['error' => 'Engine not found'], Http::STATUS_NOT_FOUND);
            }

            return new JSONResponse($updatedEngine);
        } catch (\Exception $e) {
            $this->logger->error('Error updating support engine', [
                'id' => $id,
                'error' => $e->getMessage()
            ]);
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete a support engine
     */
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[FrontpageRoute(verb: 'DELETE', url: '/support/engine/{id}')]
    public function delete(int $id): JSONResponse
    {
        try {
            // Check if there are votes before deletion
            $hasVotes = $this->engineService->hasVotes($id);
            if ($hasVotes) {
                return new JSONResponse(['error' => 'Cannot delete engine with existing votes'], Http::STATUS_CONFLICT);
            }

            $deleted = $this->engineService->deleteEngine($id);
            if (!$deleted) {
                return new JSONResponse(['error' => 'Engine not found'], Http::STATUS_NOT_FOUND);
            }

            return new JSONResponse(['success' => true]);
        } catch (\Exception $e) {
            $this->logger->error('Error deleting support engine', [
                'id' => $id,
                'error' => $e->getMessage()
            ]);
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Set active engine for a target
     */
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[FrontpageRoute(verb: 'POST', url: '/support/engine/active')]
    public function setActive(): JSONResponse
    {
        try {
            $data = $this->getJsonInput();
            
            if (!$data || !isset($data['target_type']) || !isset($data['target_id']) || !isset($data['engine_id'])) {
                return new JSONResponse(['error' => 'Missing required fields: target_type, target_id, engine_id'], Http::STATUS_BAD_REQUEST);
            }

            $this->engineService->setActiveEngine(
                $data['target_type'],
                $data['target_id'],
                $data['engine_id']
            );

            return new JSONResponse(['success' => true]);
        } catch (\Exception $e) {
            $this->logger->error('Error setting active engine', [
                'error' => $e->getMessage()
            ]);
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get active engine for a target
     */
    #[NoAdminRequired]
    #[NoCSRFRequired]
    #[FrontpageRoute(verb: 'GET', url: '/support/engine/active/{targetType}/{targetId}')]
    public function getActive(string $targetType, int $targetId): DataResponse
    {
        try {
            $engine = $this->engineService->getActiveEngine($targetType, $targetId);
            return new DataResponse($engine);
        } catch (\Exception $e) {
            $this->logger->error('Error getting active engine', [
                'targetType' => $targetType,
                'targetId' => $targetId,
                'error' => $e->getMessage()
            ]);
            return new DataResponse(['error' => $e->getMessage()], Http::STATUS_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Helper method to get JSON input from request body
     *
     * @return array|null
     */
    private function getJsonInput(): ?array
    {
        // Try to get from php://input (JSON requests)
        $input = file_get_contents('php://input');
        if ($input) {
            $data = json_decode($input, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                return $data;
            }
        }
        
        // Fallback to POST parameters (for form data)
        $params = $this->request->getParams();
        if (!empty($params)) {
            return $params;
        }
        
        return null;
    }
}
