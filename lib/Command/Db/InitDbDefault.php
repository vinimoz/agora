<?php
declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Command\Db;

use OCP\IGroupManager;
use OCA\Agora\Command\Command;
use OCP\IDBConnection;
use OCA\Agora\Db\Category;
use OCA\Agora\Db\Location;
use OCA\Agora\Db\ModerationStatus;
use OCP\Migration\IOutput;

class InitDbDefault extends Command
{
    protected string $name = parent::NAME_PREFIX . 'db:init-default';
    protected string $description = 'Initialize default Agora categories and locations';
    private IGroupManager $groupManager;

    private array $categories = [
    // 1. Ecology & Resources
    ['name' => 'Ecology & Resources', 'parent' => 0],
    ['name' => 'Biodiversity', 'parent' => 'Ecology & Resources'],
    ['name' => 'Water & Lagoon', 'parent' => 'Ecology & Resources'],
    ['name' => 'Land & Farming', 'parent' => 'Ecology & Resources'],
    ['name' => 'Energy', 'parent' => 'Ecology & Resources'],
    ['name' => 'Waste & Recycling', 'parent' => 'Ecology & Resources'],

    // 2. Planning & Development
    ['name' => 'Planning & Development', 'parent' => 0],
    ['name' => 'Housing & Urbanism', 'parent' => 'Planning & Development'],
    ['name' => 'Transport', 'parent' => 'Planning & Development'],
    ['name' => 'Public Works', 'parent' => 'Planning & Development'],
    ['name' => 'Tourism', 'parent' => 'Planning & Development'],
    ['name' => 'Local Economy', 'parent' => 'Planning & Development'],

    // 3. Health & Wellbeing
    ['name' => 'Health & Wellbeing', 'parent' => 0],
    ['name' => 'Care & Prevention', 'parent' => 'Health & Wellbeing'],
    ['name' => 'Health Access', 'parent' => 'Health & Wellbeing'],
    ['name' => 'Sports', 'parent' => 'Health & Wellbeing'],
    ['name' => 'Food & Nutrition', 'parent' => 'Health & Wellbeing'],
    ['name' => 'Healthy Environment', 'parent' => 'Health & Wellbeing'],

    // 4. Citizenship & Society
    ['name' => 'Citizenship & Society', 'parent' => 0],
    ['name' => 'Participation', 'parent' => 'Citizenship & Society'],
    ['name' => 'Associations', 'parent' => 'Citizenship & Society'],
    ['name' => 'Culture & Heritage', 'parent' => 'Citizenship & Society'],
    ['name' => 'Safety', 'parent' => 'Citizenship & Society'],
    ['name' => 'Youth & Seniors', 'parent' => 'Citizenship & Society'],

    // 5. Education & Spirituality
    ['name' => 'Education & Spirituality', 'parent' => 0],
    ['name' => 'School', 'parent' => 'Education & Spirituality'],
    ['name' => 'Training', 'parent' => 'Education & Spirituality'],
    ['name' => 'Language & Identity', 'parent' => 'Education & Spirituality'],
    ['name' => 'Spirituality', 'parent' => 'Education & Spirituality'],
    ['name' => 'Arts & Creativity', 'parent' => 'Education & Spirituality'],
    ];

    private array $locations = [
    ['name' => 'Country', 'parent' => 0],

    ['name' => 'State 1', 'parent' => 'Country'],
    ['name' => 'State 2', 'parent' => 'Country'],
    ['name' => 'State3 ', 'parent' => 'Country'],
    ];


    private array $moderationStatuses = [
    'proposal' => [
    ['status_key' => 'under_process',      'label' => 'Under Process',      'description' => 'The proposal is being reviewed.',              'is_final' => false, 'icon' => 'ClockOutline',   'order' => 1],
    ['status_key' => 'need_revised',       'label' => 'Need Revised',       'description' => 'The proposal requires changes.',               'is_final' => false, 'icon' => 'ClockOutline',   'order' => 2],
    ['status_key' => 'rejected',           'label' => 'Rejected',           'description' => 'The proposal was not accepted.',               'is_final' => true,  'icon' => 'Cancel',        'order' => 3],
    ['status_key' => 'collecting_support', 'label' => 'Collecting Support', 'description' => 'The proposal is open for support.',             'is_final' => false, 'icon' => 'Offer',         'order' => 4],
    ['status_key' => 'quorum_reached',     'label' => 'Quorum Reached',     'description' => 'The proposal reached required support.',       'is_final' => true,  'icon' => 'Check',         'order' => 5],
    ],
    'suggestion' => [
    ['status_key' => 'under_process',      'label' => 'Under Process',      'description' => 'The suggestion is under review.',              'is_final' => false, 'icon' => 'ClockOutline',   'order' => 1],
    ['status_key' => 'need_revised',       'label' => 'Need Revised',       'description' => 'The suggestion needs modifications.',          'is_final' => false, 'icon' => 'ClockOutline',   'order' => 2],
    ['status_key' => 'rejected',           'label' => 'Rejected',           'description' => 'The suggestion was not accepted.',             'is_final' => true,  'icon' => 'Cancel',        'order' => 3],
    ['status_key' => 'integrated',         'label' => 'Integrated',         'description' => 'The suggestion has been included.',            'is_final' => true,  'icon' => 'Check',         'order' => 4],
    ['status_key' => 'discarded',          'label' => 'Discarded',          'description' => 'The suggestion will not be used.',             'is_final' => true,  'icon' => 'Cancel',        'order' => 5],
    ],
    'project' => [
    ['status_key' => 'under_process',      'label' => 'Under Process',      'description' => 'The project is under examination.',            'is_final' => false, 'icon' => 'ClockOutline',   'order' => 1],
    ['status_key' => 'need_revised',       'label' => 'Need Revised',       'description' => 'The project requires updates.',                'is_final' => false, 'icon' => 'ClockOutline',   'order' => 2],
    ['status_key' => 'rejected',           'label' => 'Rejected',           'description' => 'The project was not validated.',               'is_final' => true,  'icon' => 'Cancel',        'order' => 3],
    ['status_key' => 'feasibility_review', 'label' => 'Feasibility Review', 'description' => 'The project is being checked for feasibility.', 'is_final' => false, 'icon' => 'EyeOutline',    'order' => 4],
    ['status_key' => 'funded',             'label' => 'Funded',             'description' => 'The project will receive funding.',            'is_final' => true,  'icon' => 'Check',         'order' => 5],
    ['status_key' => 'not_funded',         'label' => 'Not Funded',         'description' => 'The project will not be financed.',            'is_final' => true,  'icon' => 'Cancel',        'order' => 6],
    ],
    'grievance' => [
    ['status_key' => 'under_process',        'label' => 'Under Process',        'description' => 'The grievance is being processed.',              'is_final' => false, 'icon' => 'ClockOutline',  'order' => 1],
    ['status_key' => 'need_revised',         'label' => 'Need Revised',         'description' => 'The grievance requires more details.',           'is_final' => false, 'icon' => 'ClockOutline',  'order' => 2],
    ['status_key' => 'rejected',             'label' => 'Rejected',             'description' => 'The grievance was not accepted.',                'is_final' => true,  'icon' => 'Cancel',       'order' => 3],
    ['status_key' => 'under_investigation',  'label' => 'Under Investigation',  'description' => 'The grievance is under investigation.',          'is_final' => false, 'icon' => 'Magnify',      'order' => 4],
    ['status_key' => 'resolved_by_proposal', 'label' => 'Resolved by Proposal', 'description' => 'The grievance was resolved via proposal.',        'is_final' => true,  'icon' => 'Check',        'order' => 5],
    ['status_key' => 'resolved_directly',    'label' => 'Resolved Directly',    'description' => 'The grievance was resolved without a proposal.',  'is_final' => true,  'icon' => 'Check',        'order' => 6],
    ['status_key' => 'unresolved',           'label' => 'Unresolved',           'description' => 'The grievance could not be resolved.',           'is_final' => true,  'icon' => 'AlertCircleOutline', 'order' => 7],
    ],
    'petition' => [
    ['status_key' => 'under_process',      'label' => 'Under Process',      'description' => 'The petition is under examination.',            'is_final' => false, 'icon' => 'ClockOutline',   'order' => 1],
    ['status_key' => 'need_revised',       'label' => 'Need Revised',       'description' => 'The petition needs improvements.',              'is_final' => false, 'icon' => 'ClockOutline',   'order' => 2],
    ['status_key' => 'rejected',           'label' => 'Rejected',           'description' => 'The petition was not accepted.',                'is_final' => true,  'icon' => 'Cancel',        'order' => 3],
    ['status_key' => 'collecting_support', 'label' => 'Collecting Support', 'description' => 'The petition is open for signatures.',           'is_final' => false, 'icon' => 'Offer',         'order' => 4],
    ['status_key' => 'quorum_reached',     'label' => 'Quorum Reached',     'description' => 'The petition reached the required signatures.',  'is_final' => true,  'icon' => 'Check',         'order' => 5],
    ],
    'debate' => [
    ['status_key' => 'under_process',    'label' => 'Under Process',    'description' => 'The debate is currently active.',          'is_final' => false, 'icon' => 'ClockOutline',   'order' => 1],
    ['status_key' => 'need_revised',     'label' => 'Need Revised',     'description' => 'The debate description must be updated.',  'is_final' => false, 'icon' => 'ClockOutline',   'order' => 2],
    ['status_key' => 'rejected',         'label' => 'Rejected',         'description' => 'The debate was cancelled.',                'is_final' => true,  'icon' => 'Cancel',        'order' => 3],
    ['status_key' => 'discussion_open',  'label' => 'Discussion Open',  'description' => 'The debate is open for contributions.',    'is_final' => false, 'icon' => 'ForumOutline',  'order' => 4],
    ['status_key' => 'concluded',        'label' => 'Concluded',        'description' => 'The debate has ended with conclusions.',   'is_final' => true,  'icon' => 'Check',         'order' => 5],
    ],
    ];

    

    public function __construct(IDBConnection $connection, IGroupManager $groupManager)
    {
        parent::__construct();
        $this->connection = $connection;
        $this->groupManager = $groupManager;
    }

    private function log(?IOutput $output, string $message): void
    {
        if ($output !== null) {
            $output->info($message);
        } else {
            $this->output->writeln('[InitDbDefault] ' . $message);
        }
    }


    public function runCommands(?IOutput $output = null): int
    {
        $this->log($output, 'Initializing default statuses...');


        $this->insertDefaultCategories($output);
        $this->insertDefaultLocations($output);
        $this->insertDefaultModerationStatuses($output);
        $this->createDefaultGroups($output);
        return 0;
    }

    private function insertDefaultCategories(?IOutput $output = null): void
    {
        $this->log($output, 'Inserting default categories...');

        $inserted = [];

        foreach ($this->categories as $category) {
            $query = $this->connection->prepare('SELECT `id` FROM `*PREFIX*'.Category::TABLE.'` WHERE `name` = ?');
            $cursor = $query->execute([$category['name']]);
            $row = $cursor->fetch();

            if ($row !== false) {
                $this->log($output, 'Category already exists: ' . $category['name']);
                $inserted[$category['name']] = (int) $row['id'];
                continue;
            }

            $parentId = $category['parent'] !== 0 && isset($inserted[$category['parent']]) ? $inserted[$category['parent']] : 0;

            $insert = $this->connection->prepare('INSERT INTO `*PREFIX*'.Category::TABLE.'` (`name`, `parent_id`) VALUES (?, ?)');
            $insert->execute([$category['name'], $parentId]);

            $id = (int) $this->connection->lastInsertId('*PREFIX*'.Category::TABLE);

            $inserted[$category['name']] = $id;
                  
            
            $this->log($output, 'Inserted category: ' . $category['name']);
        }
    }

    private function insertDefaultLocations(?IOutput $output = null): void
    {
        $this->log($output, 'Inserting default locations...');

        $inserted = [];

        foreach ($this->locations as $location) {
            $query = $this->connection->prepare('SELECT `id` FROM `*PREFIX*'.Location::TABLE.'` WHERE `name` = ?');
            $cursor = $query->execute([$location['name']]);
            $row = $cursor->fetch();

            if ($row !== false) {
                  $this->log($output, 'Location already exists: ' . $location['name']);
                $inserted[$location['name']] = (int) $row['id'];
                continue;
            }

            $parentId = $location['parent'] !== 0 && isset($inserted[$location['parent']]) ? $inserted[$location['parent']] : 0;

            $insert = $this->connection->prepare('INSERT INTO `*PREFIX*'.Location::TABLE.'` (`name`, `parent_id`) VALUES (?, ?)');
            $insert->execute([$location['name'], $parentId]);

            $id = (int) $this->connection->lastInsertId('*PREFIX*'.Location::TABLE);
            $inserted[$location['name']] = $id;

                $this->log($output, 'Inserted location: ' . $location['name']);
        }
    }

    private function insertDefaultModerationStatuses(?IOutput $output = null): void
    {
        $this->log($output, 'Inserting default moderation statuses...');

        foreach ($this->moderationStatuses as $inquiryType => $statuses) {
            foreach ($statuses as $status) {
                $query = $this->connection->prepare(
                    'SELECT `id` FROM `*PREFIX*'.ModerationStatus::TABLE.'`
				    WHERE `inquiry_type` = ? AND `status_key` = ?'
                );
                $cursor = $query->execute([$inquiryType, $status['status_key']]);
                $row = $cursor->fetch();

                if ($row !== false) {
                           $this->log($output, 'Moderation status already exists: ' . $inquiryType . ' -> ' . $status['status_key']);
                       continue;
                }
                $insert = $this->connection->prepare(
                    'INSERT INTO `*PREFIX*'.ModerationStatus::TABLE.'` 
				    (`inquiry_type`, `status_key`, `label`, `description`, `icon`, `is_final`, `order`) 
				    VALUES (?, ?, ?, ?, ?, ?, ?)'
                );

                $insert->execute(
                    [
                    $inquiryType,
                    $status['status_key'],
                    $status['label'],
                    $status['description'],
                    $status['icon'],
                    (int) $status['is_final'],
                    $status['order'],
                    ]
                );


            }
        }
    }


    private function createDefaultGroups(?IOutput $output = null): void
    {

        $this->log($output, 'Creating default Nextcloud groups...');

        $groups = ['Agora Users','Agora Moderator', 'Agora Official'];

        foreach ($groups as $groupName) {
            $group = $this->groupManager->get($groupName);
            if ($group !== null) {
                $this->log($output, 'Group already exists: ' . $groupName);
                continue;
            }
            $this->groupManager->createGroup($groupName);
        }
    }
}

