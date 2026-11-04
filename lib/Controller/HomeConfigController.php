<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Db\HomeConfig;
use OCA\Agora\Service\HomeConfigService;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

/**
 * @psalm-api
 */
class HomeConfigController extends BaseController
{
	public function __construct(
		string $appName,
		IRequest $request,
		private HomeConfigService $homeConfigService,
	) {
		parent::__construct($appName, $request);
	}

	// ================================================================
	// READ — public (any logged-in user)
	// ================================================================

	/**
	 * Effective home config for the given organization type.
	 *
	 * Returns the template for $organizationType deep-merged with the
	 * instance override — exactly what the frontend expects under
	 * `session.appSettings.home`.
	 *
	 * Public on purpose: the home page itself needs this.
	 *
	 * GET /apps/agora/home-config/resolve/{organizationType}
	 */
	#[NoAdminRequired]
	#[FrontpageRoute(verb: 'GET', url: '/home-config/resolve/{organizationType}')]
	public function resolve(string $organizationType): JSONResponse
	{
		return $this->response(
			fn () => [
				'organization_type' => $organizationType,
				'home' => $this->homeConfigService->resolveForOrganization($organizationType),
			]
		);
	}

	/**
	 * List available org-type templates (id + key + label only).
	 *
	 * Public: useful for admin dropdowns and for previews ("what would
	 * a university see?"). No full `data` payload — just enough to
	 * populate a picker.
	 *
	 * GET /apps/agora/home-config/templates
	 */
	#[NoAdminRequired]
	#[FrontpageRoute(verb: 'GET', url: '/home-config/templates')]
	public function templates(): JSONResponse
	{
		return $this->response(
			fn () => [
				'templates' => array_map(
					static fn (HomeConfig $c) => [
						'id' => $c->getId(),
						'config_key' => $c->getConfigKey(),
						'label' => $c->getLabel(),
						'sort_order' => $c->getSortOrder(),
					],
					$this->homeConfigService->findByRole(HomeConfig::ROLE_TEMPLATE)
				),
			]
		);
	}

	// ================================================================
	// ADMIN — full CRUD
	// ================================================================

	/**
	 * List every home config (templates + instance override), full data.
	 *
	 * GET /apps/agora/home-config
	 */
	#[FrontpageRoute(verb: 'GET', url: '/home-config')]
	public function list(): JSONResponse
	{
		return $this->response(
			fn () => [
				'configs' => $this->homeConfigService->findAll(),
			]
		);
	}

	/**
	 * Get a single config by ID.
	 *
	 * GET /apps/agora/home-config/{id}
	 */
	#[FrontpageRoute(verb: 'GET', url: '/home-config/{id}')]
	public function get(int $id): JSONResponse
	{
		return $this->response(
			fn () => [
				'config' => $this->homeConfigService->find($id),
			]
		);
	}

	/**
	 * Get a single config by (config_key, role).
	 *
	 * GET /apps/agora/home-config/by-key/{configKey}/{role}
	 */
	#[FrontpageRoute(verb: 'GET', url: '/home-config/by-key/{configKey}/{role}')]
	public function getByKey(string $configKey, string $role): JSONResponse
	{
		return $this->response(
			fn () => [
				'config' => $this->homeConfigService->findByKeyAndRole($configKey, $role),
			]
		);
	}

	/**
	 * Create a new home config.
	 *
	 * POST /apps/agora/home-config
	 */
	#[FrontpageRoute(verb: 'POST', url: '/home-config')]
	public function create(
		string $configKey,
		string $role = HomeConfig::ROLE_TEMPLATE,
		string $label = '',
		?string $description = null,
		array $data = [],
		?int $sortOrder = null,
	): JSONResponse {
		return $this->response(
			fn () => [
				'config' => $this->homeConfigService->create(
					$configKey,
					$role,
					$label,
					$description,
					$data,
					$sortOrder,
				),
			]
		);
	}

	/**
	 * Update an existing home config (partial — omitted fields untouched).
	 *
	 * PUT /apps/agora/home-config/{id}
	 */
	#[FrontpageRoute(verb: 'PUT', url: '/home-config/{id}')]
	public function update(
		int $id,
		?string $label = null,
		?string $description = null,
		?array $data = null,
		?int $sortOrder = null,
	): JSONResponse {
		return $this->response(
			fn () => [
				'config' => $this->homeConfigService->update(
					$id,
					$label,
					$description,
					$data,
					$sortOrder,
				),
			]
		);
	}

	/**
	 * Convenience: update the single instance override.
	 *
	 * Resolves to the row (config_key='default', role='instance') and
	 * patches its `data`. Creates the row if it somehow doesn't exist
	 * (e.g. after a manual DB reset) so admins never have to know the ID.
	 *
	 * PUT /apps/agora/home-config/instance
	 */
	#[FrontpageRoute(verb: 'PUT', url: '/home-config/instance')]
	public function updateInstance(
		array $data,
		?string $label = null,
		?string $description = null,
	): JSONResponse {
		return $this->response(function () use ($data, $label, $description) {
			try {
				$config = $this->homeConfigService->findByKeyAndRole(
					'default',
					HomeConfig::ROLE_INSTANCE
				);
			} catch (\OCP\AppFramework\Db\DoesNotExistException) {
				$config = $this->homeConfigService->create(
					configKey: 'default',
					role: HomeConfig::ROLE_INSTANCE,
					label: $label ?? 'Instance override',
					description: $description ?? 'Admin-specific home override (merged on top of the org-type template).',
					data: $data,
				);
				return ['config' => $config];
			}

			$updated = $this->homeConfigService->update(
				$config->getId(),
				$label,
				$description,
				$data,
			);
			return ['config' => $updated];
		});
	}

	/**
	 * Delete a home config.
	 *
	 * DELETE /apps/agora/home-config/{id}
	 */
	#[FrontpageRoute(verb: 'DELETE', url: '/home-config/{id}')]
	public function destroy(int $id): JSONResponse
	{
		return $this->response(
			fn () => [
				'config' => $this->homeConfigService->delete($id),
			]
		);
	}
}
