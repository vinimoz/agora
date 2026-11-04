<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Agora 1.8.2 —
 *   - create `agora_home_configs`
 *   - seed 5 org-type templates + 1 empty instance override
 *
 * Idempotent: rows are only inserted when (config_key, role) is absent.
 */

namespace OCA\Agora\Migration;

use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

class Version01080020260707120002 extends SimpleMigrationStep
{
	private const TABLE = 'agora_home_configs';

	/** @var array<string, array<string, mixed>> */
	private const TEMPLATES = [
		'municipality' => [
			'sections' => ['hero', 'news', 'current', 'spaces', 'services', 'explore', 'agenda', 'promo'],
			'hero' => [
				'cityName' => 'Take back your authority',
				'tagline' => "Together, let's build tomorrow",
				'title' => 'Welcome to Agora',
				'subtitle' => 'Your civic space for a more direct and participatory democracy',
				'showWeather' => false,
				'weather' => ['temp' => 27, 'location' => 'Moorea'],
				'actions' => [
					['key' => 'participate', 'label' => 'Participate', 'icon' => 'CheckCircle', 'color' => '#16a34a', 'hint' => 'Give your opinion', 'route' => ['name' => 'explore', 'params' => ['type' => 'relevant'], 'query' => ['filter' => 'for_you']]],
					['key' => 'decide', 'label' => 'Decide', 'icon' => 'Scale', 'color' => '#7c3aed', 'hint' => 'Vote and deliberate', 'route' => ['name' => 'explore', 'params' => ['type' => 'relevant'], 'query' => ['filter' => 'to_vote']]],
					['key' => 'propose', 'label' => 'Propose', 'icon' => 'Lightbulb', 'color' => '#f59e0b', 'hint' => 'Share your ideas', 'route' => ['name' => 'home', 'params' => ['type' => 'proposal'], 'query' => ['viewMode' => 'create']]],
					['key' => 'debate', 'label' => 'Debate', 'icon' => 'MessageSquare', 'color' => '#0ea5e9', 'hint' => 'Exchange with others', 'route' => ['name' => 'explore', 'params' => ['type' => 'relevant'], 'query' => ['filter' => 'debates']]],
				],
			],
			'sectionLabels' => ['news' => 'City news', 'services' => 'Your online services', 'explore' => 'Explore / Participate'],
			'promo' => ['title' => "Together, let's build tomorrow", 'text' => 'Participate in the life of your community!', 'cta' => 'Discover'],
			'relevance' => [
				'tiers' => [
					['key' => 'for_you', 'label' => 'For you'],
					['key' => 'local', 'label' => 'Near you'],
					['key' => 'region', 'label' => 'Your area'],
					['key' => 'public', 'label' => 'Discover'],
				],
				'weights' => ['owner' => 100, 'participant' => 60, 'space' => 40, 'locality' => 30, 'region' => 15, 'activePhase' => 20, 'new' => 10],
			],
		],
		'university' => [
			'sections' => ['hero', 'news', 'current', 'spaces', 'services', 'explore', 'agenda', 'promo'],
			'hero' => [
				'cityName' => 'Your campus, your voice',
				'tagline' => 'Participate in campus life',
				'title' => 'Welcome to your university',
				'subtitle' => 'Shape the decisions that affect your studies and student life',
				'showWeather' => false,
				'weather' => ['temp' => 22, 'location' => 'Campus'],
				'actions' => [
					['key' => 'participate', 'label' => 'Participate', 'icon' => 'CheckCircle', 'color' => '#16a34a', 'hint' => 'Get involved on campus', 'route' => ['name' => 'explore', 'params' => ['type' => 'relevant'], 'query' => ['filter' => 'for_you']]],
					['key' => 'decide', 'label' => 'Vote', 'icon' => 'Scale', 'color' => '#7c3aed', 'hint' => 'Student elections & consultations', 'route' => ['name' => 'explore', 'params' => ['type' => 'relevant'], 'query' => ['filter' => 'to_vote']]],
					['key' => 'propose', 'label' => 'Submit idea', 'icon' => 'Lightbulb', 'color' => '#f59e0b', 'hint' => 'Share a proposal with your faculty', 'route' => ['name' => 'home', 'params' => ['type' => 'proposal'], 'query' => ['viewMode' => 'create']]],
					['key' => 'debate', 'label' => 'Discuss', 'icon' => 'MessageSquare', 'color' => '#0ea5e9', 'hint' => 'Exchange with peers', 'route' => ['name' => 'explore', 'params' => ['type' => 'relevant'], 'query' => ['filter' => 'debates']]],
				],
			],
			'sectionLabels' => ['news' => 'Campus announcements', 'services' => 'Student services', 'explore' => 'Get involved', 'agenda' => 'Academic calendar'],
			'promo' => ['title' => 'Get involved in student life', 'text' => 'Your student union needs you — join a commission, propose a project, vote on the budget.', 'cta' => 'Explore'],
			'relevance' => [
				'tiers' => [
					['key' => 'for_you', 'label' => 'For you'],
					['key' => 'local', 'label' => 'Your faculty'],
					['key' => 'region', 'label' => 'Your campus'],
					['key' => 'public', 'label' => 'Discover'],
				],
				'weights' => ['owner' => 100, 'participant' => 60, 'space' => 40, 'locality' => 30, 'region' => 15, 'activePhase' => 20, 'new' => 10],
			],
		],
		'association' => [
			'sections' => ['hero', 'news', 'current', 'spaces', 'services', 'explore', 'agenda', 'promo'],
			'hero' => [
				'cityName' => 'Your association, your voice',
				'tagline' => 'Get involved',
				'title' => 'Welcome to your association',
				'subtitle' => 'Shape the projects and decisions that matter to your community',
				'showWeather' => false,
				'weather' => ['temp' => 20, 'location' => ''],
				'actions' => [
					['key' => 'participate', 'label' => 'Participate', 'icon' => 'CheckCircle', 'color' => '#16a34a', 'hint' => 'Join the conversation', 'route' => ['name' => 'explore', 'params' => ['type' => 'relevant'], 'query' => ['filter' => 'for_you']]],
					['key' => 'decide', 'label' => 'Vote', 'icon' => 'Scale', 'color' => '#7c3aed', 'hint' => 'Take part in decisions', 'route' => ['name' => 'explore', 'params' => ['type' => 'relevant'], 'query' => ['filter' => 'to_vote']]],
					['key' => 'propose', 'label' => 'Propose', 'icon' => 'Lightbulb', 'color' => '#f59e0b', 'hint' => 'Submit a project', 'route' => ['name' => 'home', 'params' => ['type' => 'proposal'], 'query' => ['viewMode' => 'create']]],
					['key' => 'debate', 'label' => 'Discuss', 'icon' => 'MessageSquare', 'color' => '#0ea5e9', 'hint' => 'Exchange with members', 'route' => ['name' => 'explore', 'params' => ['type' => 'relevant'], 'query' => ['filter' => 'debates']]],
				],
			],
			'sectionLabels' => ['news' => 'Association news', 'services' => 'Member services', 'explore' => 'Get involved', 'agenda' => 'Upcoming events'],
			'promo' => ['title' => 'Support the association', 'text' => 'Become a member, donate, or volunteer — every contribution counts.', 'cta' => 'Join'],
			'relevance' => [
				'tiers' => [
					['key' => 'for_you', 'label' => 'For you'],
					['key' => 'local', 'label' => 'Your chapter'],
					['key' => 'region', 'label' => 'Your region'],
					['key' => 'public', 'label' => 'Discover'],
				],
				'weights' => ['owner' => 100, 'participant' => 60, 'space' => 40, 'locality' => 30, 'region' => 15, 'activePhase' => 20, 'new' => 10],
			],
		],
		'cooperative' => [
			'sections' => ['hero', 'news', 'current', 'spaces', 'services', 'explore', 'agenda', 'promo'],
			'hero' => [
				'cityName' => 'Your co-op, your decisions',
				'tagline' => 'Decide together',
				'title' => 'Welcome to your cooperative',
				'subtitle' => 'One member, one vote — shape how your co-op runs',
				'showWeather' => false,
				'weather' => ['temp' => 18, 'location' => ''],
				'actions' => [
					['key' => 'participate', 'label' => 'Participate', 'icon' => 'CheckCircle', 'color' => '#16a34a', 'hint' => 'Join a working group', 'route' => ['name' => 'explore', 'params' => ['type' => 'relevant'], 'query' => ['filter' => 'for_you']]],
					['key' => 'decide', 'label' => 'Decide', 'icon' => 'Scale', 'color' => '#7c3aed', 'hint' => 'Vote on resolutions', 'route' => ['name' => 'explore', 'params' => ['type' => 'relevant'], 'query' => ['filter' => 'to_vote']]],
					['key' => 'propose', 'label' => 'Propose', 'icon' => 'Lightbulb', 'color' => '#f59e0b', 'hint' => 'Submit a motion', 'route' => ['name' => 'home', 'params' => ['type' => 'proposal'], 'query' => ['viewMode' => 'create']]],
					['key' => 'debate', 'label' => 'Discuss', 'icon' => 'MessageSquare', 'color' => '#0ea5e9', 'hint' => 'Debate with members', 'route' => ['name' => 'explore', 'params' => ['type' => 'relevant'], 'query' => ['filter' => 'debates']]],
				],
			],
			'sectionLabels' => ['news' => 'Co-op news', 'services' => 'Member services', 'explore' => 'Get involved', 'agenda' => 'Meetings & assemblies'],
			'promo' => ['title' => 'Governance is a shared responsibility', 'text' => 'Review the annual report, attend the general assembly, vote on budgets.', 'cta' => 'Participate'],
			'relevance' => [
				'tiers' => [
					['key' => 'for_you', 'label' => 'For you'],
					['key' => 'local', 'label' => 'Your working group'],
					['key' => 'region', 'label' => 'Your branch'],
					['key' => 'public', 'label' => 'Discover'],
				],
				'weights' => ['owner' => 100, 'participant' => 60, 'space' => 40, 'locality' => 30, 'region' => 15, 'activePhase' => 20, 'new' => 10],
			],
		],
		'company' => [
			'sections' => ['hero', 'news', 'current', 'spaces', 'services', 'explore', 'agenda', 'promo'],
			'hero' => [
				'cityName' => 'Your workplace, your voice',
				'tagline' => 'Have your say',
				'title' => 'Welcome to your company space',
				'subtitle' => 'Share ideas, give feedback, and participate in the decisions that affect you',
				'showWeather' => false,
				'weather' => ['temp' => 20, 'location' => ''],
				'actions' => [
					['key' => 'participate', 'label' => 'Participate', 'icon' => 'CheckCircle', 'color' => '#16a34a', 'hint' => 'Give your feedback', 'route' => ['name' => 'explore', 'params' => ['type' => 'relevant'], 'query' => ['filter' => 'for_you']]],
					['key' => 'decide', 'label' => 'Vote', 'icon' => 'Scale', 'color' => '#7c3aed', 'hint' => 'Take part in decisions', 'route' => ['name' => 'explore', 'params' => ['type' => 'relevant'], 'query' => ['filter' => 'to_vote']]],
					['key' => 'propose', 'label' => 'Propose', 'icon' => 'Lightbulb', 'color' => '#f59e0b', 'hint' => 'Share an improvement', 'route' => ['name' => 'home', 'params' => ['type' => 'proposal'], 'query' => ['viewMode' => 'create']]],
					['key' => 'debate', 'label' => 'Discuss', 'icon' => 'MessageSquare', 'color' => '#0ea5e9', 'hint' => 'Exchange with colleagues', 'route' => ['name' => 'explore', 'params' => ['type' => 'relevant'], 'query' => ['filter' => 'debates']]],
				],
			],
			'sectionLabels' => ['news' => 'Company announcements', 'services' => 'Employee services', 'explore' => 'Get involved', 'agenda' => 'Events & meetings'],
			'promo' => ['title' => 'Your voice shapes the company', 'text' => 'Propose ideas, comment on projects, and vote on what comes next.', 'cta' => 'Get involved'],
			'relevance' => [
				'tiers' => [
					['key' => 'for_you', 'label' => 'For you'],
					['key' => 'local', 'label' => 'Your team'],
					['key' => 'region', 'label' => 'Your department'],
					['key' => 'public', 'label' => 'Discover'],
				],
				'weights' => ['owner' => 100, 'participant' => 60, 'space' => 40, 'locality' => 30, 'region' => 15, 'activePhase' => 20, 'new' => 10],
			],
		],
	];

	private ?IOutput $output = null;
	private ?IDBConnection $connection = null;

	public function __construct(?IDBConnection $dbConnection = null)
	{
		$this->connection = $dbConnection;
	}

	public function changeSchema(IOutput $output, \Closure $schemaClosure, array $options): ?ISchemaWrapper
	{
		$this->output = $output;
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if ($schema->hasTable(self::TABLE)) {
			$this->log(self::TABLE . ' already exists');
			return null;
		}

		$table = $schema->createTable(self::TABLE);
		$table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'length' => 20, 'unsigned' => true]);
		$table->addColumn('config_key', Types::STRING, ['notnull' => true, 'length' => 64]);
		$table->addColumn('role', Types::STRING, ['notnull' => true, 'length' => 16]);
		$table->addColumn('label', Types::STRING, ['notnull' => true, 'length' => 255]);
		$table->addColumn('description', Types::TEXT, ['notnull' => false]);
		$table->addColumn('data', Types::JSON, ['notnull' => false]);
		$table->addColumn('sort_order', Types::INTEGER, ['notnull' => false, 'default' => 0]);
		$table->addColumn('created', Types::BIGINT, ['notnull' => true, 'length' => 20, 'unsigned' => true]);
		$table->addColumn('updated', Types::BIGINT, ['notnull' => false, 'length' => 20, 'unsigned' => true]);
		$table->setPrimaryKey(['id']);
		$table->addUniqueIndex(['config_key', 'role'], 'agora_home_cfg_key_role');
		$table->addIndex(['role'], 'agora_home_cfg_role');

		$this->log('  + ' . self::TABLE);

		return $schema;
	}

	public function postSchemaChange(IOutput $output, \Closure $schemaClosure, array $options): void
	{
		$this->output = $output;

		if (!$this->connection || !$this->connection->tableExists(self::TABLE)) {
			$this->log('  skip — table missing');
			return;
		}

		$inserted = 0;
		$skipped = 0;
		$now = time();

		foreach (self::TEMPLATES as $orgType => $template) {
			if ($this->exists($orgType, 'template')) {
				$skipped++;
				continue;
			}
			$this->insertRow($orgType, 'template', ucfirst($orgType) . ' default',
				'Default home configuration for a ' . $orgType . '.',
				$template, $this->sortOrder($orgType), $now);
			$inserted++;
		}

		if (!$this->exists('default', 'instance')) {
			$this->insertRow('default', 'instance', 'Instance override',
				'Admin-specific home override (merged on top of the org-type template).',
				[], 0, $now);
			$inserted++;
		} else {
			$skipped++;
		}

		$this->log("  seeded {$inserted}, skipped {$skipped}");
	}

	private function sortOrder(string $orgType): int
	{
		return [
			'municipality' => 1,
			'university' => 2,
			'association' => 3,
			'cooperative' => 4,
			'company' => 5,
		][$orgType] ?? 0;
	}

	private function exists(string $key, string $role): bool
	{
		$qb = $this->connection->getQueryBuilder();
		$qb->select($qb->func()->count('*'))
			->from(self::TABLE)
			->where($qb->expr()->eq('config_key', $qb->createNamedParameter($key)))
			->andWhere($qb->expr()->eq('role', $qb->createNamedParameter($role)));
		return (int) $qb->executeQuery()->fetchOne() > 0;
	}

	private function insertRow(string $key, string $role, string $label, string $desc, array $data, int $sort, int $now): void
	{
		$qb = $this->connection->getQueryBuilder();
		$qb->insert(self::TABLE)->values([
			'config_key' => $qb->createNamedParameter($key),
			'role' => $qb->createNamedParameter($role),
			'label' => $qb->createNamedParameter($label),
			'description' => $qb->createNamedParameter($desc),
			'data' => $qb->createNamedParameter(json_encode($data)),
			'sort_order' => $qb->createNamedParameter($sort, \PDO::PARAM_INT),
			'created' => $qb->createNamedParameter($now, \PDO::PARAM_INT),
			'updated' => $qb->createNamedParameter(null, \PDO::PARAM_NULL),
		]);
		$qb->executeStatement();
	}

	private function log(string $msg): void
	{
		$this->output?->info('Agora 1.8.2 - home: ' . $msg);
	}
}
