<?php
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * General factory for the inquiry model.
 */
$fm->define('OCA\Agora\Db\Preferences')->setDefinitions([
	'type' => 'textInquiry',
	'timestamp' => function () {
		$date = new DateTime('today');
		return $date->getTimestamp();
	},
	'preferences' => '{"someJSON":0}'
]);
