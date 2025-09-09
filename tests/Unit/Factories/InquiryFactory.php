<?php
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

use League\FactoryMuffin\Faker\Facade as Faker;

/**
 * General factory for the inquiry model.
 */
$fm->define('OCA\Agora\Db\Inquiry')->setDefinitions([
	'type' => 'textInquiry',
	'title' => Faker::text(124),
	'description' => Faker::text(255),
	'owner' => Faker::firstNameMale(),
	'created' => function () {
		$date = new DateTime('today');
		return $date->getTimestamp();
	},
	'expire' => function () {
		$date = new DateTime('tomorrow');
		return $date->getTimestamp();
	},
	'deleted' => function () {
		$date = new DateTime('+1 month');
		return $date->getTimestamp();
	},
	'access' => 'public',
	'anonymous' => 0,
	'allowComment' => 1,
	'allowMaybe' => 1,
	'allowProposals' => 1,
	'proposalsExpire' => function () {
		$date = new DateTime('tomorrow');
		return $date->getTimestamp();
	},
	'supportLimit' => 0,
	'optionLimit' => 0,
	'showResults' => 'always',
	'adminAccess' => 0,
]);
