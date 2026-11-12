<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Service\HomeImageService;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\DataDownloadResponse;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

/**
 * @psalm-api
 */
class HomeImageController extends BaseController
{
	public function __construct(
		string $appName,
		IRequest $request,
		private HomeImageService $imageService,
	) {
		parent::__construct($appName, $request);
	}

	/**
	 * Upload (or replace) the image for a given slot (hero, promo, logo, …).
	 *
	 * Admin only — no attribute means admin required.
	 *
	 * POST /apps/agora/home-config/{configId}/images/{slot}
	 */
	#[FrontpageRoute(verb: 'POST', url: '/home-config/{configId}/images/{slot}')]
	public function upload(int $configId, string $slot): JSONResponse
	{
		$upload = $this->request->getUploadedFile('image');

		return $this->response(function () use ($configId, $slot, $upload) {
			if (!is_array($upload)) {
				throw new \InvalidArgumentException('No file provided');
			}
			$config = $this->imageService->upload($configId, $slot, $upload);
			return [
				'filename' => $config->getData()[$slot]['image'] ?? null,
				'url' => $this->imageService->url($configId, $slot),
				'config' => $config,
			];
		});
	}

	/**
	 * Stream the stored image bytes.
	 *
	 * Public on purpose — home page needs it for any logged-in user.
	 *
	 * GET /apps/agora/home-config/{configId}/images/{slot}
	 */
	#[NoAdminRequired]
	#[NoCSRFRequired]
	#[FrontpageRoute(verb: 'GET', url: '/home-config/{configId}/images/{slot}')]
	public function get(int $configId, string $slot): DataDownloadResponse
	{
		$file = $this->imageService->getFile($configId, $slot);
		if ($file === null) {
			return new DataDownloadResponse('', 'not-found', 'text/plain');
		}
		return new DataDownloadResponse(
			$file->getContent(),
			$file->getName(),
			$file->getMimeType(),
		);
	}

	/**
	 * DELETE /apps/agora/home-config/{configId}/images/{slot}
	 */
	#[FrontpageRoute(verb: 'DELETE', url: '/home-config/{configId}/images/{slot}')]
	public function delete(int $configId, string $slot): JSONResponse
	{
		return $this->response(function () use ($configId, $slot) {
			$config = $this->imageService->deleteSlot($configId, $slot);
			return ['config' => $config];
		});
	}
}
