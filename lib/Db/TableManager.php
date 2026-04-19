<?php

declare(strict_types=1);

namespace OCA\Agora\Db;

use OCA\Agora\AppConstants;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IConfig;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use Psr\Log\LoggerInterface;

class TableManager extends DbManager
{
    public function __construct(
        protected IConfig $config,
        protected IDBConnection $connection,
        protected LoggerInterface $logger,
    ) {
        parent::__construct($config, $connection, $logger);
    }


    private function disableForeignKeyChecks(): void
    {
        $platform = $this->connection->getDatabasePlatform()->getName();
        if ($platform === 'mysql') {
            try {
                $this->connection->executeStatement('SET FOREIGN_KEY_CHECKS = 0');
            } catch (\Exception $e) {
                $this->logger->warning('Could not disable foreign key checks', ['error' => $e->getMessage()]);
            }
        } else {
            // PostgreSQL: Defer constraints or rely on CASCADE in TRUNCATE/DROP
            // No action needed here.
        }
    }

    private function enableForeignKeyChecks(): void
    {
        $platform = $this->connection->getDatabasePlatform()->getName();
        if ($platform === 'mysql') {
            try {
                $this->connection->executeStatement('SET FOREIGN_KEY_CHECKS = 1');
            } catch (\Exception $e) {
                $this->logger->warning('Could not enable foreign key checks', ['error' => $e->getMessage()]);
            }
        }
    }
    /**
     * Get all Agora tables by querying the database directly
     * Returns FULL table names including prefix
     */
    private function getAllAgoraTables(): array
    {
        $platform = $this->connection->getDatabasePlatform()->getName();
        $agoraTables = [];

        if ($platform === 'postgresql') {
            // PostgreSQL: search for tables ending with 'agora_%' or containing 'agora_'
            // The table names are like 'oc_agora_inquiries'
            $sql = "
                SELECT tablename 
                FROM pg_tables 
                WHERE schemaname = 'public' 
                AND tablename LIKE '%agora_%'
            ";
            $result = $this->connection->executeQuery($sql);
        } else {
            // MySQL/MariaDB
            $sql = "
                SELECT TABLE_NAME 
                FROM information_schema.TABLES 
                WHERE TABLE_SCHEMA = DATABASE() 
                AND TABLE_NAME LIKE '%agora_%'
            ";
            $result = $this->connection->executeQuery($sql);
        }

        while ($row = $result->fetchAssociative()) {
            $tableName = $platform === 'postgresql' 
                ? $row['tablename'] 
                : $row['TABLE_NAME'];
            $agoraTables[] = $tableName;
        }

        $this->logger->info('Found Agora tables', ['tables' => $agoraTables]);

        return $agoraTables;
    }

    /**
     * Purge all tables and all data
     */
    public function purgeTables(): array
    {
        $messages = [];
        $droppedTables = [];
        $platform = $this->connection->getDatabasePlatform()->getName();

        $agoraTables = $this->getAllAgoraTables();

        if (empty($agoraTables)) {
            $messages[] = 'No Agora tables found in database.';
            $this->logger->warning('No Agora tables found during purge');
        } else {
            $messages[] = 'Found ' . count($agoraTables) . ' Agora tables to drop.';
        }

        $this->disableForeignKeyChecks();

        try {
            foreach ($agoraTables as $fullTableName) {
                try {
                    if ($platform === 'postgresql') {
                        $this->connection->executeStatement(
                            'DROP TABLE IF EXISTS "' . $fullTableName . '" CASCADE'
                        );
                    } else {
                        $this->connection->executeStatement(
                            'DROP TABLE IF EXISTS `' . $fullTableName . '`'
                        );
                    }
                    $droppedTables[] = $fullTableName;
                    $messages[] = 'Dropped ' . $fullTableName;
                    $this->logger->info('Dropped table', ['table' => $fullTableName]);
                } catch (\Throwable $e) {
                    $messages[] = 'Failed to drop ' . $fullTableName . ': ' . $e->getMessage();
                    $this->logger->error('Failed to drop table', ['table' => $fullTableName, 'error' => $e->getMessage()]);
                }
            }

            // Delete migration records
            try {
                $migrationCount = $this->connection->executeStatement(
                    'DELETE FROM ' . $this->dbPrefix . 'migrations WHERE app = ?',
                    [AppConstants::APP_ID]
                );
                $messages[] = 'Removed ' . $migrationCount . ' migration record(s)';
            } catch (\Exception $e) {
                $messages[] = 'Failed to remove migration records: ' . $e->getMessage();
            }

            // Delete app config records
            try {
                $configCount = $this->connection->executeStatement(
                    'DELETE FROM ' . $this->dbPrefix . 'appconfig WHERE appid = ?',
                    [AppConstants::APP_ID]
                );
                $messages[] = 'Removed ' . $configCount . ' app config record(s)';
            } catch (\Exception $e) {
                $messages[] = 'Failed to remove app config records: ' . $e->getMessage();
            }
        } finally {
            $this->enableForeignKeyChecks();
        }

        $messages[] = 'Dropped ' . count($droppedTables) . ' tables total.';
        $messages[] = 'Done.';
        $messages[] = '';
        $messages[] = 'Please call \'occ app:remove agora\' now!';

        return $messages;
    }

    /**
     * Clean instance data by category
     */
    public function cleanInstanceData(string $category): array
    {
        $messages = [];
        $allAgoraTables = $this->getAllAgoraTables();
        $tablesToClean = [];

        foreach ($allAgoraTables as $fullTableName) {
            // Extract the base table name without prefix
            $shortName = str_replace($this->dbPrefix, '', $fullTableName);

            $include = match ($category) {
                'user_content' => $this->isUserContentTable($shortName),
                'configuration' => $this->isConfigurationTable($shortName),
                'support' => $this->isSupportTable($shortName),
                'all' => true,
                default => false,
            };

            if ($include) {
                $tablesToClean[] = $shortName;
            }
        }

        if (empty($tablesToClean)) {
            $messages[] = 'No tables found for category: ' . $category;
            return $messages;
        }

        $this->disableForeignKeyChecks();

        try {
            foreach ($tablesToClean as $tableName) {
                $messages = array_merge($messages, $this->truncateTable($tableName));
            }
        } finally {
            $this->enableForeignKeyChecks();
        }

        return $messages;
    }

    private function isUserContentTable(string $tableName): bool
    {
        $patterns = ['inquiries', 'options', 'inq_group', 'support', 'comments', 'share', 'attachments', 'quorums', '_misc', '_links'];
        foreach ($patterns as $pattern) {
            if (str_contains($tableName, $pattern)) {
                return true;
            }
        }
        return false;
    }

    private function isConfigurationTable(string $tableName): bool
    {
        $patterns = ['category', 'location', '_type', 'families', '_status'];
        foreach ($patterns as $pattern) {
            if (str_contains($tableName, $pattern)) {
                return true;
            }
        }
        return false;
    }

    private function isSupportTable(string $tableName): bool
    {
        $patterns = ['_log', 'preferences', 'watch'];
        foreach ($patterns as $pattern) {
            if (str_contains($tableName, $pattern)) {
                return true;
            }
        }
        return false;
    }

    private function truncateTable(string $tableName): array
    {
        $messages = [];
        $fullTableName = $this->dbPrefix . $tableName;
        $platform = $this->connection->getDatabasePlatform()->getName();

        if (!$this->connection->tableExists($fullTableName)) {
            return $messages;
        }

        try {
            if ($platform === 'postgresql') {
                $this->connection->executeStatement('TRUNCATE TABLE "' . $fullTableName . '" CASCADE');
            } else {
                $this->connection->executeStatement('TRUNCATE TABLE `' . $fullTableName . '`');
            }
            $messages[] = 'Truncated ' . $fullTableName;
        } catch (\Exception $e) {
            try {
                if ($platform === 'postgresql') {
                    $this->connection->executeStatement('DELETE FROM "' . $fullTableName . '"');
                } else {
                    $this->connection->executeStatement('DELETE FROM `' . $fullTableName . '`');
                }
                $messages[] = 'Cleared ' . $fullTableName;
            } catch (\Exception $e2) {
                $messages[] = 'Failed to clean ' . $fullTableName . ': ' . $e2->getMessage();
            }
        }

        return $messages;
    }

    /**
     * Remove orphaned records
     */
    public function removeOrphaned(): array
    {
        $orphanedCount = [];
        $inquiryTable = $this->dbPrefix . 'agora_inquiries';

        if (!$this->connection->tableExists($inquiryTable)) {
            return ['Inquiries table does not exist'];
        }

        $subqueryInquiry = $this->connection->getQueryBuilder();
        $subqueryInquiry->selectDistinct('id')->from($inquiryTable);

        $essentialTables = [
            $this->dbPrefix . 'agora_support',
            $this->dbPrefix . 'agora_share',
            $this->dbPrefix . 'agora_inq_group_relation'
        ];

        foreach ($essentialTables as $tableName) {
            if (!$this->connection->tableExists($tableName)) {
                continue;
            }

            try {
                $query = $this->connection->getQueryBuilder();
                $query->delete($tableName)
                      ->where(
                          $query->expr()->orX(
                              $query->expr()->notIn('inquiry_id', $query->createFunction($subqueryInquiry->getSQL()), IQueryBuilder::PARAM_INT_ARRAY),
                              $query->expr()->isNull('inquiry_id')
                          )
                      );
                $executed = $query->executeStatement();
                $orphanedCount[$tableName] = $executed;
            } catch (\Exception $e) {
                $this->logger->info('Skipping table {table} - no inquiry_id column', ['table' => $tableName]);
            }
        }

        $messages = [];
        foreach ($orphanedCount as $tableName => $count) {
            if ($count > 0) {
                $messages[] = 'Removed ' . $count . ' orphaned record(s) from ' . $tableName;
            }
        }

        if (empty($messages)) {
            $messages[] = 'No orphaned records found';
        }

        return $messages;
    }

    /**
     * Transfer data from mod_status to inq_status table
     */
    public function transferModStatusToInqStatus(): array
    {
        $messages = [];
        $sourceTable = $this->dbPrefix . 'agora_mod_status';
        $destTable = $this->dbPrefix . 'agora_inq_status';

        try {
            if (!$this->connection->tableExists($sourceTable)) {
                return ['Source table does not exist - nothing to transfer'];
            }

            if (!$this->connection->tableExists($destTable)) {
                return ['Destination table does not exist - cannot transfer'];
            }

            $existingCount = $this->connection->executeQuery(
                'SELECT COUNT(*) FROM ' . $destTable
            )->fetchOne();

            if ($existingCount > 0) {
                return ['Data already exists in inq_status table - skipping transfer'];
            }

            $sourceCount = $this->connection->executeQuery(
                'SELECT COUNT(*) FROM ' . $sourceTable
            )->fetchOne();

            if ($sourceCount == 0) {
                return ['No data found in mod_status table'];
            }

            $this->connection->executeStatement(
                'INSERT INTO ' . $destTable . '
                (inquiry_type, status_key, label, description, is_final, icon, sort_order, created, updated)
                SELECT inquiry_type, status_key, label, description, is_final, icon, sort_order, created, updated
                FROM ' . $sourceTable
            );

            $messages[] = "Transferred {$sourceCount} records from mod_status to inq_status";
        } catch (\Exception $e) {
            $messages[] = 'Failed to transfer: ' . $e->getMessage();
        }

        return $messages;
    }

    /**
     * Migrate public access to open
     */
    public function migratePublicToOpen(): array
    {
        $messages = [];
        $tableName = $this->dbPrefix . 'agora_inquiries';

        try {
            if (!$this->connection->tableExists($tableName)) {
                return ['Inquiries table does not exist'];
            }

            $qb = $this->connection->getQueryBuilder();
            $qb->update($tableName)
               ->set('access', $qb->expr()->literal('open'))
               ->where($qb->expr()->eq('access', $qb->expr()->literal('public')));
            $updated = $qb->executeStatement();

            if ($updated > 0) {
                $messages[] = 'Updated ' . $updated . ' inquiries from public to open access';
            } else {
                $messages[] = 'No inquiries needed access update';
            }
        } catch (\Exception $e) {
            $messages[] = 'Failed to migrate access: ' . $e->getMessage();
        }

        return $messages;
    }

    /**
     * Fix nullish shares
     */
    public function fixNullishShares(): array
    {
        $messages = [];
        $tableName = $this->dbPrefix . 'agora_share';

        try {
            if (!$this->connection->tableExists($tableName)) {
                return ['Share table does not exist'];
            }

            foreach (['group_id', 'inquiry_id'] as $column) {
                $qb = $this->connection->getQueryBuilder();
                $qb->update($tableName)
                   ->set($column, $qb->createNamedParameter(0, IQueryBuilder::PARAM_INT))
                   ->where($qb->expr()->isNull($column));
                $count = $qb->executeStatement();

                if ($count > 0) {
                    $messages[] = 'Updated ' . $count . ' shares with null ' . $column . ' to 0';
                }
            }
        } catch (\Exception $e) {
            $messages[] = 'Failed to fix shares: ' . $e->getMessage();
        }

        if (empty($messages)) {
            $messages[] = 'All shares are valid';
        }

        return $messages;
    }

    /**
     * Fix nullish inquiry group relations
     */
    public function fixNullishPollGroupRelations(): array
    {
        $messages = [];
        $tableName = $this->dbPrefix . 'agora_inq_group_relation';

        try {
            if (!$this->connection->tableExists($tableName)) {
                return ['Relation table does not exist'];
            }

            foreach (['group_id', 'inquiry_id'] as $column) {
                $qb = $this->connection->getQueryBuilder();
                $qb->update($tableName)
                   ->set($column, $qb->createNamedParameter(0, IQueryBuilder::PARAM_INT))
                   ->where($qb->expr()->isNull($column));
                $count = $qb->executeStatement();

                if ($count > 0) {
                    $messages[] = 'Updated ' . $count . ' relations with null ' . $column . ' to 0';
                }
            }
        } catch (\Exception $e) {
            $messages[] = 'Failed to fix relations: ' . $e->getMessage();
        }

        if (empty($messages)) {
            $messages[] = 'All inquiry group relations are valid';
        }

        return $messages;
    }

    /**
     * Migrate share labels to display_name
     */
    public function migrateShareLabels(): array
    {
        $messages = [];
        $tableName = $this->dbPrefix . 'agora_share';

        try {
            if (!$this->connection->tableExists($tableName)) {
                return ['Share table does not exist'];
            }

            $qb = $this->connection->getQueryBuilder();
            $qb->update($tableName)
               ->set('display_name', 'label')
               ->where($qb->expr()->isNotNull('label'))
               ->andWhere($qb->expr()->neq('label', $qb->expr()->literal('')))
               ->andWhere($qb->expr()->isNull('display_name'));
            $updated = $qb->executeStatement();

            if ($updated > 0) {
                $messages[] = 'Migrated ' . $updated . ' share labels to display_name';
            } else {
                $messages[] = 'No share labels needed migration';
            }
        } catch (\Exception $e) {
            $messages[] = 'Failed to migrate labels: ' . $e->getMessage();
        }

        return $messages;
    }

    /**
     * Tidy watch table
     */
    public function tidyWatchTable(int $offset): string
    {
        $tableName = $this->dbPrefix . 'agora_watch';

        if (!$this->connection->tableExists($tableName)) {
            return 'Watch table does not exist';
        }

        $query = $this->connection->getQueryBuilder();
        $query->delete($tableName)
              ->where($query->expr()->lt('updated', $query->createNamedParameter($offset)));
        $count = $query->executeStatement();

        if ($count > 0) {
            return 'Removed ' . $count . ' old watch records';
        }

        return 'Watch table is clean';
    }

    /**
     * Set last interaction for inquiries
     */
    public function setLastInteraction(?int $timestamp = null): string
    {
        $tableName = $this->dbPrefix . 'agora_inquiries';
        $timestamp = $timestamp ?? time();

        if (!$this->connection->tableExists($tableName)) {
            return 'Inquiries table does not exist';
        }

        $query = $this->connection->getQueryBuilder();
        $query->update($tableName)
              ->set('last_interaction', $query->createNamedParameter($timestamp))
              ->where($query->expr()->eq('last_interaction', $query->expr()->literal(0, IQueryBuilder::PARAM_INT)));
        $count = $query->executeStatement();

        if ($count > 0) {
            return 'Updated last interaction in ' . $count . ' inquiries';
        }

        return 'Last interaction all set';
    }

    /**
     * Reset watch table - drop and recreate
     */
    public function resetWatchTable(): array
    {
        $messages = [];
        $platform = $this->connection->getDatabasePlatform()->getName();
        $tableName = $this->dbPrefix . 'agora_watch';

        // Drop the table if it exists
        try {
            if ($this->connection->tableExists($tableName)) {
                if ($platform === 'postgresql') {
                    $this->connection->executeStatement('DROP TABLE IF EXISTS "' . $tableName . '" CASCADE');
                } else {
                    $this->connection->executeStatement('DROP TABLE IF EXISTS `' . $tableName . '`');
                }
                $messages[] = 'Dropped existing watch table';
            }
        } catch (\Exception $e) {
            $messages[] = 'Error dropping watch table: ' . $e->getMessage();
            return $messages;
        }

        // Recreate using schema
        try {
            $schema = $this->connection->createSchema();
            $table = $schema->createTable($tableName);

            $table->addColumn('id', \OCP\DB\Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'length' => 20]);
            $table->addColumn('inquiry_id', \OCP\DB\Types::BIGINT, ['notnull' => true, 'default' => 0, 'length' => 20]);
            $table->addColumn('table', \OCP\DB\Types::STRING, ['notnull' => true, 'default' => '', 'length' => 64]);
            $table->addColumn('updated', \OCP\DB\Types::BIGINT, ['notnull' => true, 'default' => 0, 'length' => 20]);
            $table->addColumn('session_id', \OCP\DB\Types::STRING, ['notnull' => false, 'default' => null]);
            $table->setPrimaryKey(['id']);
            $table->addUniqueIndex(['inquiry_id', 'table', 'session_id'], 'agora_uniq_watch');

            $this->connection->migrateToSchema($schema);
            $messages[] = 'Recreated watch table successfully';
        } catch (\Exception $e) {
            $messages[] = 'Error recreating watch table: ' . $e->getMessage();
        }

        return $messages;
    }

     /**
     * Remove obsolete tables if they still exist
     *
     * @deprecated 1.7.1 - Use Version010702 migration instead.
     *             Kept for backward compatibility with existing repair steps.
     *             Will be removed in 1.8.0.
     *
     * @return string[] Messages as array
     */
    public function removeObsoleteTables(): array
    {
        $messages = [];
        $platform = $this->connection->getDatabasePlatform()->getName();

        $goneTables = [
            'oc_agora_assembly',
            'oc_agora_assembly_inq',
            'oc_agora_mod_status',
        ];

        $this->disableForeignKeyChecks();

        try {
            foreach ($goneTables as $tableName) {
                $fullTableName = $this->dbPrefix . $tableName;

                if (!$this->connection->tableExists($fullTableName)) {
                    continue;
                }

                try {
                    if ($platform === 'postgresql') {
                        $this->connection->executeStatement(
                            'DROP TABLE IF EXISTS "' . $fullTableName . '" CASCADE'
                        );
                    } else {
                        $this->connection->executeStatement(
                            'DROP TABLE IF EXISTS `' . $fullTableName . '`'
                        );
                    }
                    $messages[] = 'Dropped obsolete table ' . $fullTableName;
                } catch (\Exception $e) {
                    $messages[] = 'Failed to drop obsolete table ' . $fullTableName . ': ' . $e->getMessage();
                }
            }
        } finally {
            $this->enableForeignKeyChecks();
        }

        if (empty($messages)) {
            $messages[] = 'No obsolete tables found';
        }

        return $messages;
    }

    /**
     * Remove obsolete columns if they still exist
     *
     * @deprecated 1.7.1 - Use Version010702 migration instead.
     *             Kept for backward compatibility with existing repair steps.
     *             Will be removed in 1.8.0.
     *
     * @return string[] Messages as array
     */
    public function removeObsoleteColumns(): array
    {
        $messages = [];
        $platform = $this->connection->getDatabasePlatform()->getName();

        $goneColumns = [
            'oc_agora_inquiries' => [
                'anonymous', 'suggestions_expire', 'support_limit', 'admin_access',
                'hide_booked_up', 'misc_settings', 'allow_support', 'level', 'slug', 'tags',
            ],
            'oc_agora_options' => [
                'inquiry_option_hash', 'timestamp', 'duration', 'order', 'confirmed',
                'allow_support', 'target_type', 'option_text', 'released'
            ],
            'oc_agora_inq_group' => ['groupStatus'],
            'oc_agora_inq_type' => ['is_option'],
        ];

        foreach ($goneColumns as $tableName => $columns) {
            $prefixedTableName = $this->dbPrefix . $tableName;

            if (!$this->connection->tableExists($prefixedTableName)) {
                continue;
            }

            foreach ($columns as $columnName) {
                try {
                    $schemaManager = $this->connection->createSchemaManager();
                    $tableColumns = $schemaManager->listTableColumns($prefixedTableName);

                    $columnExists = false;
                    foreach ($tableColumns as $col) {
                        if ($col->getName() === $columnName) {
                            $columnExists = true;
                            break;
                        }
                    }

                    if (!$columnExists) {
                        continue;
                    }

                    if ($platform === 'postgresql') {
                        $this->connection->executeStatement(
                            'ALTER TABLE "' . $prefixedTableName . '" DROP COLUMN IF EXISTS "' . $columnName . '" CASCADE'
                        );
                    } else {
                        $this->connection->executeStatement(
                            'ALTER TABLE `' . $prefixedTableName . '` DROP COLUMN IF EXISTS `' . $columnName . '`'
                        );
                    }
                    $messages[] = 'Dropped obsolete column ' . $columnName . ' from ' . $prefixedTableName;
                } catch (\Exception $e) {
                    // Column might not exist, that's fine
                }
            }
        }

        if (empty($messages)) {
            $messages[] = 'No obsolete columns found';
        }

        return $messages;
    }

    /**
     * Remove obsolete migration entries from the migrations table
     *
     * @deprecated 1.7.1 - Use Version010702::postSchemaChange() instead.
     *             Kept for backward compatibility with existing repair steps.
     *             Will be removed in 1.8.0.
     *
     * @return string[] Messages as array
     */
    public function removeObsoleteMigrations(): array
    {
        $messages = [];
        $removedCount = 0;

        $goneMigrations = [
            '20250715120000',
            '01050020251027120000',
            '01060020251115120000',
        ];

        foreach ($goneMigrations as $version) {
            try {
                $query = $this->connection->getQueryBuilder();
                $query->delete('migrations')
                    ->where('app = :appName')
                    ->andWhere('version = :version')
                    ->setParameter('appName', AppConstants::APP_ID)
                    ->setParameter('version', $version);

                $count = $query->executeStatement();
                $removedCount += $count;

                if ($count > 0) {
                    $messages[] = 'Removed obsolete migration entry: ' . $version;
                }
            } catch (\Exception $e) {
                // Migration might not exist, that's fine
            }
        }

        if ($removedCount === 0) {
            $messages[] = 'No obsolete migration entries found';
        } else {
            $messages[] = 'Total removed: ' . $removedCount . ' migration entries';
        }

        return $messages;
    }

    /**
     * Remove watch table - used by repair step
     *
     * @deprecated 1.7.1 - Kept for backward compatibility.
     *             Will be removed in 1.8.0.
     *
     * @return string[] Messages as array
     */
    public function removeWatch(): array
    {
        $messages = [];
        $platform = $this->connection->getDatabasePlatform()->getName();
        $tableName = $this->dbPrefix . 'agora_watch';

        try {
            if ($this->connection->tableExists($tableName)) {
                if ($platform === 'postgresql') {
                    $this->connection->executeStatement('DROP TABLE IF EXISTS "' . $tableName . '" CASCADE');
                } else {
                    $this->connection->executeStatement('DROP TABLE IF EXISTS `' . $tableName . '`');
                }
                $messages[] = 'Dropped watch table';
            }
        } catch (\Exception $e) {
            $messages[] = 'Error dropping watch table: ' . $e->getMessage();
        }

        return $messages;
    }

    /**
     * Reset last interaction - used by repair step
     *
     * @deprecated 1.7.1 - Use setLastInteraction() instead.
     *             Kept for backward compatibility.
     *             Will be removed in 1.8.0.
     *
     * @return string[] Messages as array
     */
    public function resetLastInteraction(): array
    {
        return [$this->setLastInteraction()];
    }


    /**
     * Update hashes for supports and options
     *
     * @return string[] Messages as array
     */
    public function updateHashes(): array
    {
        $messages = [];

        try {
            $messages[] = 'Starting hash updates...';

            // Update support hashes
            $supportCount = $this->updateSupportHashes();
            if ($supportCount > 0) {
                $messages[] = "Updated hashes for {$supportCount} support entries";
            }

            // Update option hashes if needed
            $optionCount = $this->updateOptionHashes();
            if ($optionCount > 0) {
                $messages[] = "Updated hashes for {$optionCount} option entries";
            }

            if ($supportCount === 0 && $optionCount === 0) {
                $messages[] = 'All hashes are already up to date';
            }

            $messages[] = 'Hash updates completed successfully';
        } catch (\Exception $e) {
            $messages[] = 'Error during hash updates: ' . $e->getMessage();
            $this->logger->error('Hash update failed', ['exception' => $e]);
        }

        return $messages;
    }

    /**
     * Update support hashes for entries that don't have one
     */
    private function updateSupportHashes(): int
    {
        $updatedCount = 0;
        $tableName = $this->dbPrefix . 'agora_support';

        if (!$this->connection->tableExists($tableName)) {
            return 0;
        }

        try {
            // Get all supports that need hash updates
            $qb = $this->connection->getQueryBuilder();
            $qb->select('id', 'user_id', 'option_id', 'inquiry_id')
                ->from('agora_support')
                ->where($qb->expr()->orX(
                    $qb->expr()->isNull('support_hash'),
                    $qb->expr()->eq('support_hash', $qb->expr()->literal(''))
                ));

            $supports = $qb->executeQuery()->fetchAll();

            foreach ($supports as $support) {
                $newHash = $this->generateSupportHash(
                    $support['user_id'],
                    (int)$support['option_id'],
                    (int)$support['inquiry_id']
                );

                $update = $this->connection->getQueryBuilder();
                $update->update('agora_support')
                    ->set('support_hash', $update->createNamedParameter($newHash))
                    ->where($update->expr()->eq('id', $update->createNamedParameter($support['id'])))
                    ->executeStatement();

                $updatedCount++;
            }
        } catch (\Exception $e) {
            $this->logger->error('Failed to update support hashes: ' . $e->getMessage());
        }

        return $updatedCount;
    }

    /**
     * Update option hashes for entries that don't have one
     */
    private function updateOptionHashes(): int
    {
        $updatedCount = 0;
        $tableName = $this->dbPrefix . 'agora_options';

        if (!$this->connection->tableExists($tableName)) {
            return 0;
        }

        // Check if option_hash column exists
        $schemaManager = $this->connection->createSchemaManager();
        $columns = $schemaManager->listTableColumns($tableName);
        $hasOptionHash = false;
        foreach ($columns as $column) {
            if ($column->getName() === 'option_hash') {
                $hasOptionHash = true;
                break;
            }
        }

        if (!$hasOptionHash) {
            return 0;
        }

        try {
            $qb = $this->connection->getQueryBuilder();
            $qb->select('id', 'text', 'parent_id')
                ->from('agora_options')
                ->where($qb->expr()->orX(
                    $qb->expr()->isNull('option_hash'),
                    $qb->expr()->eq('option_hash', $qb->expr()->literal(''))
                ));

            $options = $qb->executeQuery()->fetchAll();

            foreach ($options as $option) {
                $newHash = $this->generateOptionHash(
                    $option['text'] ?? '',
                    (int)$option['parent_id']
                );

                $update = $this->connection->getQueryBuilder();
                $update->update('agora_options')
                    ->set('option_hash', $update->createNamedParameter($newHash))
                    ->where($update->expr()->eq('id', $update->createNamedParameter($option['id'])))
                    ->executeStatement();

                $updatedCount++;
            }
        } catch (\Exception $e) {
            $this->logger->error('Failed to update option hashes: ' . $e->getMessage());
        }

        return $updatedCount;
    }

    /**
     * Generate support hash
     */
    private function generateSupportHash(string $userId, int $optionId, int $inquiryId): string
    {
        $data = implode('|', [
            $userId,
            (string)$optionId,
            (string)$inquiryId,
            $this->generateRandomString()
        ]);
        return hash('sha256', $data);
    }

    /**
     * Generate option hash
     */
    private function generateOptionHash(string $text, int $inquiryId): string
    {
        $normalizedText = trim(mb_strtolower($text));
        $data = $normalizedText . '|' . $inquiryId;
        return hash('sha256', $data);
    }

    /**
     * Check if hash looks valid
     */
    private function isValidHash(string $hash): bool
    {
        return preg_match('/^[a-f0-9]{64}$/', $hash) === 1;
    }

    /**
     * Generate random string for hash salting
     */
    private function generateRandomString(int $length = 16): string
    {
        $chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $result = '';
        for ($i = 0; $i < $length; $i++) {
            $result .= $chars[random_int(0, strlen($chars) - 1)];
        }
        return $result;
    }
}
