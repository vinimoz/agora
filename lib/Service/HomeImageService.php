<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\HomeConfig;
use OCA\Agora\Db\HomeConfigMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\Files\IAppData;
use OCP\Files\NotFoundException;
use OCP\Files\SimpleFS\ISimpleFile;
use OCP\Files\SimpleFS\ISimpleFolder;
use Psr\Log\LoggerInterface;

class HomeImageService
{
	private const ALLOWED = [
		'image/png'     => 'png',
		'image/jpeg'    => 'jpg',
		'image/webp'    => 'webp',
		'image/svg+xml' => 'svg',
	];
	private const MAX_BYTES = 5 * 1024 * 1024;

	public function __construct(
		private IAppData $appData,
		private HomeConfigMapper $mapper,
		private LoggerInterface $logger,
	) {
	}

	/**
	 * Persist an uploaded file and reflect the filename in
	 * `data[$slot]['image']` on the owning config row.
	 *
	 * @param array{name:string,tmp_name:string,size:int,error:int} $upload
	 *
	 * @throws \InvalidArgumentException on validation failure
	 * @throws DoesNotExistException when the config no longer exists
	 */
	public function upload(int $configId, string $slot, array $upload): HomeConfig
	{
		if (!preg_match('/^[a-z][a-z0-9_-]{0,31}$/', $slot)) {
			throw new \InvalidArgumentException('Invalid slot name');
		}
		if (($upload['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
			throw new \InvalidArgumentException('Upload failed');
		}
		if (($upload['size'] ?? 0) > self::MAX_BYTES) {
			throw new \InvalidArgumentException('File too large (max 5 MB)');
		}
		$mime = mime_content_type($upload['tmp_name']) ?: '';
		if (!isset(self::ALLOWED[$mime])) {
			throw new \InvalidArgumentException('Unsupported image type');
		}

		$config   = $this->mapper->find($configId);
		$folder   = $this->getFolder($configId);
		$filename = $slot . '.' . self::ALLOWED[$mime];

		// Replace existing file for this slot (any extension)
		foreach ($folder->getDirectoryListing() as $f) {
			if (str_starts_with($f->getName(), $slot . '.')) {
				$f->delete();
			}
		}

		$node = $folder->newFile($filename);
		$stream = fopen($upload['tmp_name'], 'rb');
		$node->putContent($stream);
		fclose($stream);

		$data = $config->getData() ?? [];
		if (!isset($data[$slot]) || !is_array($data[$slot])) {
			$data[$slot] = [];
		}
		$data[$slot]['image'] = $filename;
		$config->setData($data);
		$config->setUpdated(time());
		return $this->mapper->update($config);
	}

	public function deleteSlot(int $configId, string $slot): ?HomeConfig
	{
		try {
			$folder = $this->appData->getFolder($this->folderName($configId));
			foreach ($folder->getDirectoryListing() as $f) {
				if (str_starts_with($f->getName(), $slot . '.')) {
					$f->delete();
				}
			}
		} catch (NotFoundException) {
			// no folder → nothing to delete
		}

		try {
			$config = $this->mapper->find($configId);
		} catch (DoesNotExistException) {
			return null;
		}
		$data = $config->getData() ?? [];
		if (isset($data[$slot]) && is_array($data[$slot])) {
			unset($data[$slot]['image']);
		}
		$config->setData($data);
		$config->setUpdated(time());
		return $this->mapper->update($config);
	}

	public function getFile(int $configId, string $slot): ?ISimpleFile
	{
		try {
			$folder = $this->appData->getFolder($this->folderName($configId));
		} catch (NotFoundException) {
			return null;
		}
		foreach ($folder->getDirectoryListing() as $f) {
			if (str_starts_with($f->getName(), $slot . '.')) {
				return $f;
			}
		}
		return null;
	}

	public function purgeForConfig(int $configId): void
	{
		try {
			$this->appData->getFolder($this->folderName($configId))->delete();
		} catch (NotFoundException) {
			// already gone
		}
	}

	/** Public URL for a given slot — matches the route in HomeImageController. */
	public function url(int $configId, string $slot): string
	{
		return sprintf('/apps/agora/home-config/%d/images/%s', $configId, $slot);
	}

	// ── helpers ─────────────────────────────────────────────────────

	private function folderName(int $configId): string
	{
		return 'home-images-' . $configId;
	}

	private function getFolder(int $configId): ISimpleFolder
	{
		$name = $this->folderName($configId);
		try {
			return $this->appData->getFolder($name);
		} catch (NotFoundException) {
			return $this->appData->newFolder($name);
		}
	}
}
