<?php

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

return [
	'routes' => [
		// Page routes
		['name' => 'page#index', 'url' => '/', 'verb' => 'GET'],
		['name' => 'page#list', 'url' => '/list/{category}', 'verb' => 'GET'],
		['name' => 'page#group', 'url' => '/group/{slug}', 'verb' => 'GET'],
		['name' => 'page#inquiry', 'url' => '/page/inquiry/{id}', 'verb' => 'GET'],
		
		// REST-API calls
		['name' => 'baseApiV1#preflighted_cors', 'url' => '/api/v1.0/{path}', 'verb' => 'OPTIONS', 'requirements' => ['path' => '.+']],
	],
];
