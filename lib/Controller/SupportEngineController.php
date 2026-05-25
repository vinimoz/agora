<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCP\AppFramework\Controller;  // ← ADD THIS IMPORT
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;
use OCP\AppFramework\Http;
use OCA\Agora\Service\SupportEngineService;
use OCA\Agora\Db\SupportEngineMapper;
use OCA\Agora\Db\SupportResultMapper;
use Psr\Log\LoggerInterface;

class SupportEngineController extends Controller  // Now extends the correct Controller class
{
    private SupportEngineService $engineService;
    private SupportEngineMapper $engineMapper;
    private SupportResultMapper $resultMapper;
    private LoggerInterface $logger;

    public function __construct(
        string $appName,
        IRequest $request,
        SupportEngineService $engineService,
        SupportEngineMapper $engineMapper,
        SupportResultMapper $resultMapper,
        LoggerInterface $logger
    ) {
        parent::__construct($appName, $request);
        $this->engineService = $engineService;
        $this->engineMapper = $engineMapper;
        $this->resultMapper = $resultMapper;
        $this->logger = $logger;
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
            $engines = $this->engineMapper->findByInquiryId($inquiryId);
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
            $engines = $this->engineMapper->findByInquiryGroupId($inquiryGroupId);
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
            $engine = $this->engineMapper->find($id);
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
            $requiredFields = ['engine', 'type', 'title', 'target_type', 'target_ids'];
            foreach ($requiredFields as $field) {
                if (!isset($data[$field])) {
                    return new JSONResponse(['error' => "Missing required field: {$field}"], Http::STATUS_BAD_REQUEST);
                }
            }

            $engine = $this->engineService->createEngine([
                'engine' => $data['engine'],
                'type' => $data['type'],
                'title' => $data['title'],
                'description' => $data['description'] ?? '',
                'inquiry_group_id' => $data['inquiry_group_id'] ?? 0,
                'inquiry_id' => $data['inquiry_id'] ?? 0,
                'status' => $data['status'] ?? 'draft',
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

            $engine = $this->engineMapper->find($id);
            if (!$engine) {
                return new JSONResponse(['error' => 'Engine not found'], Http::STATUS_NOT_FOUND);
            }

            // Check if engine can be modified (has votes?)
            if (isset($data['engine']) && $data['engine'] !== $engine->getEngine()) {
                $hasVotes = $this->engineService->hasVotes($id);
                if ($hasVotes) {
                    return new JSONResponse(['error' => 'Cannot change engine type after votes have been cast'], Http::STATUS_CONFLICT);
                }
            }

            // Update fields
            if (isset($data['title'])) {
                $engine->setTitle($data['title']);
            }
            if (isset($data['description'])) {
                $engine->setDescription($data['description']);
            }
            if (isset($data['engine'])) {
                $engine->setEngine($data['engine']);
            }
            if (isset($data['config'])) {
                $engine->setConfig($data['config']);
            }
            if (isset($data['status'])) {
                $engine->setStatus($data['status']);
            }
            if (isset($data['metadata'])) {
                $engine->setMetadata($data['metadata']);
            }

            $updatedEngine = $this->engineMapper->update($engine);
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
            $engine = $this->engineMapper->find($id);
            if (!$engine) {
                return new JSONResponse(['error' => 'Engine not found'], Http::STATUS_NOT_FOUND);
            }

            // Check if there are votes before deletion
            $hasVotes = $this->engineService->hasVotes($id);
            if ($hasVotes) {
                return new JSONResponse(['error' => 'Cannot delete engine with existing votes'], Http::STATUS_CONFLICT);
            }

            $this->engineMapper->delete($engine);
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
