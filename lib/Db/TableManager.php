<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use Doctrine\DBAL\Types\Type;
use Exception;
use OCA\Agora\AppConstants;
use OCA\Agora\Db\Option;
use OCA\Agora\Db\OptionMapper;
use OCA\Agora\Db\Inquiry;
use OCA\Agora\Db\InquiryGroup;
use OCA\Agora\Db\InquiryMapper;
use OCA\Agora\Db\Share;
use OCA\Agora\Db\Support;
use OCA\Agora\Db\SupportMapper;
use OCA\Agora\Command\Db\InitDbDefault;
use OCA\Agora\Db\Watch;
use OCA\Agora\Exceptions\PreconditionException;
use OCA\Agora\Helper\Hash;
use OCA\Agora\Migration\TableSchema;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IConfig;
use OCP\DB\ISchemaWrapper;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\DB\Types;
use PDO;
use Psr\Log\LoggerInterface;

class TableManager extends DbManager
{
    /** @psalm-suppress PossiblyUnusedMethod */
    public function __construct(
        protected IConfig $config,
        protected IDBConnection $connection,
        protected LoggerInterface $logger,
        private OptionMapper $optionMapper,
        private SupportMapper $supportMapper,
        private InitDbDefault $initDbDefault
    ) {
        parent::__construct($config, $connection, $logger);
    }

    /**
     * Disable foreign key checks for the current session (MySQL only)
     * On PostgreSQL, this is a no-op as TRUNCATE with CASCADE handles dependencies
     */
    private function disableForeignKeyChecks(): void
    {
        $platform = $this->connection->getDatabasePlatform()->getName();
        if ($platform === 'mysql') {
            $this->connection->executeStatement('SET FOREIGN_KEY_CHECKS = 0');
        }
        // PostgreSQL doesn't need this - use CASCADE instead
    }

    /**
     * Enable foreign key checks for the current session (MySQL only)
     */
    private function enableForeignKeyChecks(): void
    {
        $platform = $this->connection->getDatabasePlatform()->getName();
        if ($platform === 'mysql') {
            $this->connection->executeStatement('SET FOREIGN_KEY_CHECKS = 1');
        }
    }

    /**
     * Purge all tables and all data
     * @return string[] Messages as array
     */
    public function purgeTables(): array
    {
        $messages = [];
        $droppedTables = [];

        $platform = $this->connection->getDatabasePlatform()->getName();
        $tables = array_keys(TableSchema::TABLES);

        $this->disableForeignKeyChecks();

        try {
            foreach ($tables as $tableName) {
                if (!$this->connection->tableExists($tableName)) {
                    continue;
                }

                $fullTableName = $this->dbPrefix . $tableName;

                try {
                    if ($platform === 'postgresql') {
                        $this->connection->executeStatement(
                            'DROP TABLE IF EXISTS ' . $fullTableName . ' CASCADE'
                        );
                    } else {
                        $this->connection->dropTable($tableName);
                    }

                    $droppedTables[] = $fullTableName;
                    $messages[] = 'Dropped ' . $fullTableName;
                } catch (\Throwable $e) {
                    $messages[] = 'Failed to drop ' . $fullTableName . ': ' . $e->getMessage();
                }
            }

            if ($droppedTables) {
                $this->logger->info('Dropped tables', $droppedTables);
            }

            // Delete migration records
            $this->connection->executeStatement(
                'DELETE FROM ' . $this->dbPrefix . 'migrations WHERE app = ?',
                [AppConstants::APP_ID]
            );
            $messages[] = 'Removed all migration records from ' . $this->dbPrefix . 'migrations';

            // Delete app config records
            $this->connection->executeStatement(
                'DELETE FROM ' . $this->dbPrefix . 'appconfig WHERE appid = ?',
                [AppConstants::APP_ID]
            );
            $messages[] = 'Removed all app config records from ' . $this->dbPrefix . 'appconfig';
        } finally {
            $this->enableForeignKeyChecks();
        }

        $messages[] = 'Done.';
        $messages[] = '';
        $messages[] = 'Please call \'occ app:remove agora\' now!';

        return $messages;
    }

    /**
     * Create or update a table defined in TableSchema::TABLES
     *
     * @return string[] Messages as array
     */
    public function createTable(string $tableName): array
    {
        $this->needsSchema();

        $messages = [];
        $columns = TableSchema::TABLES[$tableName];

        // Ensure the table name is prefixed correctly
        $tableName = $this->getTableName($tableName);

        if ($this->schema->hasTable($tableName)) {
            $table = $this->schema->getTable($tableName);
            $messages[] = 'Validating table ' . $table->getName();
            $tableCreated = false;
        } else {
            $table = $this->schema->createTable($tableName);
            $tableCreated = true;
            $messages[] = 'Creating table ' . $table->getName();
        }

        foreach ($columns as $columnName => $columnDefinition) {
            if ($table->hasColumn($columnName)) {
                $column = $table->getColumn($columnName);
                if (Type::lookupName($column->getType()) !== $columnDefinition['type']) {
                    $messages[] = 'Migrated type of ' . $table->getName() . '[\'' . $columnName . '\'] from ' . Type::lookupName($column->getType()) . ' to ' . $columnDefinition['type'];
                    $column->setType(Type::getType($columnDefinition['type']));
                }
                $column->setOptions($columnDefinition['options']);

                // force change to current options definition
                $table->modifyColumn($columnName, $columnDefinition['options']);
            } else {
                $table->addColumn($columnName, $columnDefinition['type'], $columnDefinition['options']);
                $messages[] = "Added {$table->getName()}, {$columnName} ({$columnDefinition['type']})";
            }
        }

        if ($tableCreated) {
            $table->setPrimaryKey(['id']);
        }
        return $messages;
    }

    /**
     * Create all tables defined in TableSchema::TABLES
     *
     * @return string[] Messages as array
     */
    public function createTables(): array
    {
        $this->needsSchema();
        $messages = [];

        foreach (array_keys(TableSchema::TABLES) as $tableName) {
            $messages = array_merge($messages, $this->createTable($tableName));
        }
        return $messages;
    }

    /**
     * Initialize default data like during installation
     *
     * @return string[] Messages as array
     */
    public function initDefaultData(IOutput $output): array
    {
        $messages = [];

        try {
            $this->initDbDefault->runCommands($output);
            $messages[] = 'Default data initialization completed';
        } catch (\Exception $e) {
            $messages[] = 'Failed to initialize default data: ' . $e->getMessage();
        }

        return $messages;
    }

    /**
     * Remove obsolete tables if they still exist
     *
     * @return string[] Messages as array
     */
    public function removeObsoleteTables(): array
    {
        $dropped = false;
        $messages = [];
        $platform = $this->connection->getDatabasePlatform()->getName();

        foreach (TableSchema::GONE_TABLES as $tableName) {
            try {
                $this->disableForeignKeyChecks();

                if ($platform === 'postgresql') {
                    $this->connection->executeStatement('DROP TABLE IF EXISTS "' . $tableName . '" CASCADE');
                } else {
                    $this->connection->executeStatement('DROP TABLE IF EXISTS `' . $tableName . '`');
                }

                $this->enableForeignKeyChecks();
                $dropped = true;
                $messages[] = 'Dropped obsolete table ' . $tableName;
                $this->logger->info('Dropped obsolete table {table}', ['table' => $tableName]);
            } catch (\Exception $e) {
                $messages[] = 'Failed to drop obsolete table ' . $tableName . ': ' . $e->getMessage();
                $this->logger->error('Failed to drop obsolete table {table}: {error}', [
                    'table' => $tableName,
                    'error' => $e->getMessage()
                ]);
                $this->enableForeignKeyChecks();
            }
        }

        if (!$dropped) {
            $messages[] = 'No obsolete tables found';
            $this->logger->info('No obsolete tables found');
        }
        return $messages;
    }

    /**
     * Transfer data from mod_status to inq_status table
     *
     * @return string[] Messages as array
     */
    public function transferModStatusToInqStatus(): array
    {
        $messages = [];

        try {
            if (!$this->connection->tableExists('oc_agora_mod_status')) {
                $messages[] = 'Source table oc_agora_mod_status does not exist - nothing to transfer';
                return $messages;
            }

            if (!$this->connection->tableExists('oc_agora_inq_status')) {
                $messages[] = 'Destination table oc_agora_inq_status does not exist - cannot transfer';
                return $messages;
            }

            $existingCount = $this->connection->executeQuery(
                'SELECT COUNT(*) FROM oc_agora_inq_status'
            )->fetchOne();

            if ($existingCount > 0) {
                $messages[] = 'Data already exists in inq_status table - skipping transfer';
                return $messages;
            }

            $sourceCount = $this->connection->executeQuery(
                'SELECT COUNT(*) FROM oc_agora_mod_status'
            )->fetchOne();

            if ($sourceCount === 0) {
                $messages[] = 'No data found in mod_status table - nothing to transfer';
                return $messages;
            }

            // Transfer data
            $this->connection->executeStatement('
                INSERT INTO oc_agora_inq_status
                (inquiry_type, status_key, label, description, is_final, icon, sort_order, created, updated)
                SELECT
                    inquiry_type,
                    status_key,
                    label,
                    description,
                    is_final,
                    icon,
                    sort_order,
                    created,
                    updated
                FROM oc_agora_mod_status
            ');

            $messages[] = "Transferred $sourceCount records from mod_status to inq_status";
            $this->logger->info('Transferred {count} records from mod_status to inq_status', ['count' => $sourceCount]);
        } catch (\Exception $e) {
            $messages[] = 'Failed to transfer mod_status data: ' . $e->getMessage();
            $this->logger->error('Failed to transfer mod_status data: {error}', ['error' => $e->getMessage()]);
        }

        $this->logger->info('transferModStatusToInqStatus returning messages: ' . count($messages));

        return $messages;
    }

    /**
     * Remove obsolete columns if they still exist - Database-agnostic version
     */
    public function removeObsoleteColumns(): array
    {
        $messages = [];
        $dropped = false;
        $platform = $this->connection->getDatabasePlatform()->getName();

        foreach (TableSchema::GONE_COLUMNS as $tableName => $columns) {
            $prefixedTableName = $this->dbPrefix . $tableName;
            
            if (!$this->connection->tableExists($prefixedTableName)) {
                continue;
            }

            foreach ($columns as $columnName) {
                try {
                    if ($platform === 'postgresql') {
                        $this->connection->executeStatement(
                            'ALTER TABLE "' . $prefixedTableName . '" DROP COLUMN IF EXISTS "' . $columnName . '" CASCADE'
                        );
                    } else {
                        $this->connection->executeStatement(
                            'ALTER TABLE `' . $prefixedTableName . '` DROP COLUMN IF EXISTS `' . $columnName . '`'
                        );
                    }
                    $dropped = true;
                    $messages[] = 'Dropped obsolete column ' . $columnName . ' from ' . $prefixedTableName;
                } catch (\Exception $e) {
                    $messages[] = 'Failed to drop column ' . $columnName . ' from ' . $prefixedTableName . ': ' . $e->getMessage();
                }
            }
        }

        if (!$dropped) {
            $messages[] = 'No obsolete columns found';
        }
        return $messages;
    }

    /**
     * Delete all orphaned entries by selecting all rows
     * those inquiry_ids are not present in the inquiry table
     *
     * @return string[] Messages as array
     */
    public function removeOrphaned(): array
    {
        $orphanedCount = [];

        // collects all inquiryIds
        $subqueryInquiry = $this->connection->getQueryBuilder();
        $subqueryInquiry->selectDistinct('id')->from(Inquiry::TABLE);

        // Only process essential tables that definitely have inquiry_id
        $essentialTables = [
            Support::TABLE,
            Share::TABLE,
            InquiryGroup::RELATION_TABLE
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
                // Skip tables that don't have inquiry_id column
                $this->logger->info('Skipping table {table} - no inquiry_id column', ['table' => $tableName]);
            }
        }

        $messages = [];
        foreach ($orphanedCount as $tableName => $count) {
            if ($count > 0) {
                $this->logger->info(
                    'Removed {count} orphaned record(s) from {tableName}',
                    ['count' => $count, 'tableName' => $this->dbPrefix . $tableName]
                );
                $messages[] = 'Removed ' . $count . ' orphaned record(s) from ' . $this->dbPrefix . $tableName;
            } else {
                $messages[] = 'No orphaned records found in ' . $this->dbPrefix . $tableName;
            }
        }

        if (empty($messages)) {
            $messages[] = 'No orphaned records found in any tables';
        }

        return $messages;
    }

    /**
     * Set last interaction to current timestamp for all agora
     * where last interaction is 0
     *
     * @param int|null $timestamp
     * @return string
     */
    public function setLastInteraction(?int $timestamp = null): string
    {
        $timestamp = $timestamp ?? time();
        $query = $this->connection->getQueryBuilder();

        $query->update(Inquiry::TABLE)
            ->set('last_interaction', $query->createNamedParameter($timestamp))
            ->where($query->expr()->eq('last_interaction', $query->expr()->literal(0, IQueryBuilder::PARAM_INT)));
        $count = $query->executeStatement();

        if ($count > 0) {
            $this->logger->info('Updated {number} agora in {db} and set last_interaction to current timestamp {timestamp}', ['number' => $count, 'db' => $this->dbPrefix . InquiryMapper::TABLE, 'last_interaction' => $timestamp]);
            return 'Updated last interaction in ' . $count . ' agora';
        }

        $this->logger->info('No agora needed to get updated with last interaction info');
        return 'Last interaction all set';
    }

    public function updateHashes(): array
    {
        $messages = [];

        try {
            $messages[] = 'Starting hash updates...';

            // Update support hashes
            $supportCount = $this->updateSupportHashes();
            $messages[] = "Updated hashes for {$supportCount} support entries";

            // Update option hashes if needed
            $optionCount = $this->updateOptionHashes();
            $messages[] = "Updated hashes for {$optionCount} option entries";

            $messages[] = 'Hash updates completed successfully';
        } catch (\Exception $e) {
            $messages[] = 'Error during hash updates: ' . $e->getMessage();
            $this->logger->error('Hash update failed', ['exception' => $e]);
        }

        return $messages;
    }

    private function updateSupportHashes(): int
    {
        $updatedCount = 0;
        $supports = $this->supportMapper->getAll();

        foreach ($supports as $support) {
            try {
                // Skip if hash already exists and looks valid
                $currentHash = $support->getSupportHash();
                if ($currentHash && $this->isValidHash($currentHash)) {
                    continue;
                }

                // Generate new hash
                $newHash = $this->generateSupportHash(
                    $support->getUserId(),
                    $support->getOptionId(),
                    $support->getInquiryId()
                );

                $support->setSupportHash($newHash);
                $this->supportMapper->update($support);
                $updatedCount++;
            } catch (\Exception $e) {
                $this->logger->error('Failed to update hash for support ID: ' . $support->getId(), [
                    'exception' => $e
                ]);
                // Continue with next record
            }
        }

        return $updatedCount;
    }

    private function updateOptionHashes(): int
    {
        $updatedCount = 0;

        try {
            // If you have an option mapper, use it here
            if (method_exists($this, 'getOptionMapper')) {
                $options = $this->getOptionMapper()->getAll();

                foreach ($options as $option) {
                    try {
                        // Skip if hash already exists
                        if ($option->getOptionHash()) {
                            continue;
                        }

                        // Generate hash based on option text and inquiry ID
                        $newHash = $this->generateOptionHash(
                            $option->getText(),
                            $option->getInquiryId()
                        );

                        $option->setOptionHash($newHash);
                        $this->getOptionMapper()->update($option);
                        $updatedCount++;
                    } catch (\Exception $e) {
                        $this->logger->error('Failed to update hash for option ID: ' . $option->getId());
                    }
                }
            }
        } catch (\Exception $e) {
            // Option hash update is optional, just log and continue
            $this->logger->info('Option hash update skipped: ' . $e->getMessage());
        }

        return $updatedCount;
    }

    /**
     * Generate support hash without external helper
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
     * Generate option hash without external helper
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

    /**
     * Delete all duplicate entries in all tables based on the unique indices defined in TableSchema::UNIQUE_INDICES
     *
     * @return string[] Messages as array
     */
    public function deleteAllDuplicates(?IOutput $output = null): array
    {
        $messages = [];
        foreach (TableSchema::UNIQUE_INDICES as $tableName => $uniqueIndices) {
            foreach ($uniqueIndices as $definition) {
                // delete all duplicates based on the unique index definition
                $count = $this->deleteDuplicates($tableName, $definition['columns']);

                if ($count) {
                    $messages[] = 'Removed ' . $count . ' duplicate records from ' . $this->dbPrefix . $tableName;
                    $this->logger->info(end($messages));
                }

                if ($output && $count) {
                    $output->info(end($messages));
                }
            }
        }
        return $messages;
    }

    /**
     * Delete duplicate entries in $table based on $columns
     * Keep the entry with the lowest id
     *
     * @param string $table
     * @param array $columns
     * @return int number of deleted entries
     */
    private function deleteDuplicates(string $table, array $columns): int
    {
        $this->needsSchema();
        if (!$this->schema->hasTable($this->dbPrefix . $table)) {
            return 0;
        }

        $qb = $this->connection->getQueryBuilder();

        // identify duplicates
        $selection = $qb->selectDistinct('t1.id')
            ->from($table, 't1')
            ->innerJoin('t1', $table, 't2', $qb->expr()->lt('t1.id', 't2.id'));

        $i = 0;

        foreach ($columns as $column) {
            if ($i > 0) {
                $selection->andWhere($qb->expr()->eq('t1.' . $column, 't2.' . $column));
            } else {
                $selection->where($qb->expr()->eq('t1.' . $column, 't2.' . $column));
            }
            $i++;
        }

        $duplicates = $qb->executeQuery()->fetchAll(PDO::FETCH_COLUMN);

        $this->connection->getQueryBuilder()
            ->delete($table)
            ->where('id in (:ids)')
            ->setParameter('ids', $duplicates, IQueryBuilder::PARAM_INT_ARRAY)
            ->executeStatement();
        return count($duplicates);
    }

    /**
     * Delete entries per timestamp
     *
     * @return string Message
     */
    public function tidyWatchTable(int $offset): string
    {
        $query = $this->connection->getQueryBuilder();
        $query->delete(Watch::TABLE)
            ->where(
                $query->expr()->lt('updated', $query->createNamedParameter($offset))
            );
        $count = $query->executeStatement();

        if ($count > 0) {
            $this->logger->info('Removed {number} old watch records', ['number' => $count, 'db' => $this->dbPrefix . Watch::TABLE]);
            return 'Removed ' . $count . ' old watch records';
        }

        $this->logger->info('Watch table is clean');
        return 'Watch table is clean';
    }

    /**
     * Fix all shares with nullish group_id or inquiry_id
     * Precondition have to be checked before
     *
     * @return string[] Messages as array
     */
    public function fixNullishShares(): array
    {
        $messages = [];

        try {
            $tableName = Share::TABLE;
            $affectedColumns = ['group_id', 'inquiry_id'];
            $this->checkPrecondition($tableName, $affectedColumns);

            // set all nullish group_id and inquiry_id to 0
            foreach ($affectedColumns as $affectedColumn) {
                $count = $this->migrateNullishColumnToZero($tableName, $affectedColumn);

                if ($count > 0) {
                    $messages[] = 'Updated ' . $count . ' shares with nullish ' . $affectedColumn . ' to 0';
                }
            }
        } catch (PreconditionException $e) {
            $messages[] = $e->getMessage() . ' - aborted fix nullish shares';
            return $messages;
        }

        if (empty($messages)) {
            $messages[] = 'All shares are valid';
        }

        return $messages;
    }

    /**
     * Tidy migrations table and remove obsolete migration entries.
     *
     * @return string[] Messages as array
     */
    public function removeObsoleteMigrations(): array
    {
        $messages = [];
        $query = $this->connection->getQueryBuilder();
        $messages[] = 'tidy migration entries';
        foreach (TableSchema::GONE_MIGRATIONS as $version) {
            $query->delete('migrations')
                ->where('app = :appName')
                ->andWhere('version = :version')
                ->setParameter('appName', AppConstants::APP_ID)
                ->setParameter('version', $version)
                ->executeStatement();
        }
        return $messages;
    }

    /**
     * Fix all inquiry group relations with nullish group_id or inquiry_id
     * Precondition have to be checked before
     *
     * @return string[] Messages as array
     */
    public function fixNullishPollGroupRelations(): array
    {
        $messages = [];

        try {
            $tableName = InquiryGroup::RELATION_TABLE;
            $affectedColumns = ['group_id', 'inquiry_id'];
            $this->checkPrecondition($tableName, $affectedColumns);

            $countAll = 0;
            // set all nullish group_id and inquiry_id to 0
            foreach ($affectedColumns as $affectedColumn) {
                $updateCount = $this->migrateNullishColumnToZero($tableName, $affectedColumn);

                if ($updateCount > 0) {
                    $countAll += $updateCount;
                    $messages[] = 'Updated ' . $updateCount . ' inquirygroup relations and set ' . $affectedColumn . ' to 0 for nullish values';
                }
            }
        } catch (PreconditionException $e) {
            $messages[] = $e->getMessage() . ' - aborted fix nullish inquiry group relations';
            return $messages;
        }

        if ($countAll === 0) {
            $messages[] = 'All inquiry group relations are valid';
        }

        return $messages;
    }

    /**
     * Migrate all share labels to display_name
     *
     * @return string[] Messages as array
     */
    public function migrateShareLabels(): array
    {
        $messages = [];

        $tableName = Share::TABLE;
        $affectedColumn = 'label';

        try {
            $this->checkPrecondition($tableName, $affectedColumn);
        } catch (PreconditionException $e) {
            $messages[] = $e->getMessage() . ' - aborted migrating labels';
            return $messages;
        }

        $prefixedTableName = $this->dbPrefix . $tableName;
        $qb = $this->connection->getQueryBuilder();

        $qb->update($tableName)
            ->set('display_name', $affectedColumn)
            ->andWhere($qb->expr()->isNotNull($prefixedTableName . '.' . $affectedColumn))
            ->andWhere($qb->expr()->eq($prefixedTableName . '.' . $affectedColumn, $qb->expr()->literal('')));
        $updated = $qb->executeStatement();

        if ($updated === 0) {
            $this->logger->info('Verified all share labels in {db}', [
                'db' => $prefixedTableName
            ]);
            $messages[] = 'No share labels to update';
        } else {
            $this->logger->info('Updated {updated} share labels in {db}', [
                'updated' => $updated,
                'db' => $prefixedTableName
            ]);
            $messages[] = 'Updated ' . $updated . ' labels';
        }

        return $messages;
    }

    /**
     * Migrate all nullish values in $columnName of $tableName to 0
     *
     * @param string $tableName Unprefixed tablename
     * @param string $columnName Column name to update
     *
     * @return int number of updated entries
     */
    private function migrateNullishColumnToZero(string $tableName, string $columnName): int
    {
        $query = $this->connection->getQueryBuilder();
        $query->update($tableName)
            ->set($columnName, $query->createNamedParameter(0, IQueryBuilder::PARAM_INT))
            ->where($query->expr()->isNull($columnName));

        $count = $query->executeStatement();
        return $count;
    }

    /**
     * Migrate all agora with access 'public' to access 'open'
     *
     * @return string[] Messages as array
     */
    public function migratePublicToOpen(): array
    {
        $messages = [];

        $tableName = Inquiry::TABLE;
        $affectedColumn = 'access';
        $prefixedTableName = $this->dbPrefix . $tableName;

        try {
            $this->checkPrecondition($tableName, $affectedColumn);
        } catch (PreconditionException $e) {
            $messages[] = $e->getMessage() . ' - aborted migrating public to open';
            return $messages;
        }

        $qb = $this->connection->getQueryBuilder();

        $qb->update($tableName)
            ->set('access', $qb->expr()->literal(Inquiry::ACCESS_OPEN))
            ->where($qb->expr()->eq($prefixedTableName . '.' . $affectedColumn, $qb->expr()->literal(Inquiry::ACCESS_PUBLIC)));
        $updated = $qb->executeStatement();

        if ($updated === 0) {
            $this->logger->info('Verified inquiry access to be \'open\' instead of \'public\' in {db}', [
                'db' => $prefixedTableName
            ]);
            $messages[] = 'No inquiry access values to update';
        } else {
            $this->logger->info('Updated {updated} access values in {db}', [
                'updated' => $updated,
                'db' => $prefixedTableName
            ]);
            $messages[] = 'Updated ' . $updated . ' inquiry access value';
        }

        return $messages;
    }

    /**
     * Tables containing user-created content
     */
    private const USER_CONTENT_TABLES = [
        Inquiry::TABLE,
        Option::TABLE,
        InquiryGroup::TABLE,
        InquiryGroup::RELATION_TABLE,
        Support::TABLE,
        'agora_comments',
        Share::TABLE,
        'agora_attachments',
        'agora_notif',
        'agora_quorums',
        'agora_inq_misc',
        'agora_opt_misc',
        'agora_inq_group_misc',
        'agora_inq_links',
    ];

    /**
     * Tables containing configuration/schema data (pre-installed)
     */
    private const CONFIGURATION_TABLES = [
        'agora_category',
        'agora_location',
        'agora_inq_type',
        'agora_inq_families',
        'agora_inq_status',
        'agora_inq_option_type',
        'agora_inq_group_type',
    ];

    /**
     * Tables containing support/session data
     */
    private const SUPPORT_TABLES = [
        'agora_log',
        'agora_preferences',
        Watch::TABLE,
    ];

    /**
     * Clean instance data by category
     *
     * @param string $category One of: 'user_content', 'configuration', 'support', 'all'
     * @return string[] Messages as array
     */
    public function cleanInstanceData(string $category): array
    {
        $messages = [];

        $tables = match ($category) {
            'user_content' => self::USER_CONTENT_TABLES,
            'configuration' => self::CONFIGURATION_TABLES,
            'support' => self::SUPPORT_TABLES,
            'all' => array_merge(
                self::USER_CONTENT_TABLES,
                self::CONFIGURATION_TABLES,
                self::SUPPORT_TABLES
            ),
            default => [],
        };

        if (empty($tables)) {
            $messages[] = 'Unknown category: ' . $category;
            return $messages;
        }

        // Disable foreign key checks to allow truncation in any order (MySQL only)
        $this->disableForeignKeyChecks();

        try {
            foreach ($tables as $tableName) {
                $messages = array_merge($messages, $this->truncateTable($tableName));
            }
        } finally {
            // Re-enable foreign key checks (MySQL only)
            $this->enableForeignKeyChecks();
        }

        return $messages;
    }

    /**
     * Truncate a single table - Database-agnostic version
     *
     * @param string $tableName The table name (without prefix)
     * @return string[] Messages as array
     */
    private function truncateTable(string $tableName): array
    {
        $messages = [];
        $fullTableName = $this->dbPrefix . $tableName;
        $platform = $this->connection->getDatabasePlatform()->getName();

        if (!$this->connection->tableExists($fullTableName)) {
            $messages[] = 'Table ' . $fullTableName . ' does not exist, skipping';
            return $messages;
        }

        try {
            if ($platform === 'postgresql') {
                // PostgreSQL uses TRUNCATE with CASCADE to handle foreign key dependencies
                $this->connection->executeStatement('TRUNCATE TABLE "' . $fullTableName . '" CASCADE');
            } else {
                $this->connection->executeStatement('TRUNCATE TABLE `' . $fullTableName . '`');
            }
            $messages[] = 'Truncated ' . $fullTableName;
            $this->logger->info('Truncated table {table}', ['table' => $fullTableName]);
        } catch (\Exception $e) {
            // Fallback: try DELETE FROM if TRUNCATE fails
            try {
                if ($platform === 'postgresql') {
                    $this->connection->executeStatement('DELETE FROM "' . $fullTableName . '"');
                } else {
                    $this->connection->executeStatement('DELETE FROM `' . $fullTableName . '`');
                }
                $messages[] = 'Cleared ' . $fullTableName;
                $this->logger->info('Cleared table {table}', ['table' => $fullTableName]);
            } catch (\Exception $e2) {
                $messages[] = 'Failed to clean ' . $fullTableName . ': ' . $e2->getMessage();
                $this->logger->error('Failed to clean table {table}: {error}', [
                    'table' => $fullTableName,
                    'error' => $e2->getMessage()
                ]);
            }
        }

        return $messages;
    }

    /**
     * Add new columns to existing tables and migrate data
     *
     * @return string[] Messages as array
     */
    public function addNewColumns(): array
    {
        $messages = [];

        try {
            // Check and add support_feature to Inquiry table
            $this->addColumnIfNotExists(
                Inquiry::TABLE,
                'support_feature',
                ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => 'binary', 'length' => 20]]
            );
            $messages[] = 'Added support_feature column to Inquiry table';

            // MIGRATE DATA: Convert allow_support (BIGINT) to support_feature (STRING)
            $this->migrateAllowSupportToSupportFeature(Inquiry::TABLE);
            $messages[] = 'Migrated allow_support to support_feature in Inquiry table';

            // Check and add allowed_option_type to InquiryType table
            $this->addColumnIfNotExists(
                InquiryType::TABLE,
                'allowed_option_type',
                ['type' => Types::TEXT, 'options' => ['notnull' => false]]
            );
            $messages[] = 'Added allowed_option_type column to InquiryType table';

            // Check and add support_feature to InquiryType table
            $this->addColumnIfNotExists(
                InquiryType::TABLE,
                'support_feature',
                ['type' => Types::STRING, 'options' => ['notnull' => true, 'default' => 'binary', 'length' => 20]]
            );
            $messages[] = 'Added support_feature column to InquiryType table';

            // MIGRATE DATA: Convert allow_support to support_feature in InquiryType table too
            $this->migrateAllowSupportToSupportFeature(InquiryType::TABLE);
            $messages[] = 'Migrated allow_support to support_feature in InquiryType table';
        } catch (\Exception $e) {
            $messages[] = 'Error adding new columns: ' . $e->getMessage();
            $this->logger->error('Failed to add new columns', ['exception' => $e]);
        }

        return $messages;
    }

    /**
     * Main migration method that orchestrates all changes
     */
    public function migrateToNewSchema(): array
    {
        $messages = [];
        $messages = array_merge($messages, $this->addNewColumns());
        $messages = array_merge($messages, $this->migrateSupportUniqueIndex());
        $messages = array_merge($messages, $this->generateMissingSupportHashes());
        $messages = array_merge($messages, $this->removeOldAllowSupportColumn());

        return $messages;
    }

    /**
     * Migrate support table to use unique index - Database-agnostic version
     *
     * @return string[] Messages as array
     */
    public function migrateSupportUniqueIndex(): array
    {
        $messages = [];

        try {
            $tableName = Support::TABLE;
            $fullTableName = $this->dbPrefix . $tableName;
            $platform = $this->connection->getDatabasePlatform()->getName();

            if (!$this->connection->tableExists($fullTableName)) {
                $messages[] = "Support table does not exist, skipping unique index migration";
                return $messages;
            }

            // Check if unique index already exists
            $schema = $this->connection->getSchema();
            $table = $schema->getTable($fullTableName);

            $hasUniqueIndex = false;
            $indexes = $table->getIndexes();
            foreach ($indexes as $index) {
                if (
                    $index->isUnique() &&
                    in_array('inquiry_id', $index->getColumns()) &&
                    in_array('option_id', $index->getColumns()) &&
                    in_array('user_id', $index->getColumns())
                ) {
                    $hasUniqueIndex = true;
                    break;
                }
            }

            if (!$hasUniqueIndex) {
                // Create unique index if it doesn't exist
                if ($platform === 'postgresql') {
                    $this->connection->executeStatement(
                        'CREATE UNIQUE INDEX "UNIQ_supports" ON "' . $fullTableName . '" (inquiry_id, option_id, user_id)'
                    );
                } else {
                    $this->connection->executeStatement(
                        'CREATE UNIQUE INDEX `UNIQ_supports` ON `' . $fullTableName . '` (inquiry_id, option_id, user_id)'
                    );
                }
                $messages[] = "Created unique index UNIQ_supports on Support table";
            } else {
                $messages[] = "Support table already has unique index";
            }
        } catch (\Exception $e) {
            $messages[] = "Error migrating support unique index: " . $e->getMessage();
            $this->logger->error('Failed to migrate support unique index', ['exception' => $e]);
        }

        return $messages;
    }

    /**
     * Generate missing support hashes - Database-agnostic version
     *
     * @return string[] Messages as array
     */
    public function generateMissingSupportHashes(): array
    {
        $messages = [];

        try {
            $tableName = Support::TABLE;
            $fullTableName = $this->dbPrefix . $tableName;
            $platform = $this->connection->getDatabasePlatform()->getName();

            if (!$this->connection->tableExists($fullTableName)) {
                $messages[] = "Support table does not exist, skipping hash generation";
                return $messages;
            }

            // Count supports without hash or with empty hash
            $countQuery = $this->connection->getQueryBuilder();
            $count = $countQuery->select('COUNT(*)')
                ->from($tableName)
                ->where($countQuery->expr()->orX(
                    $countQuery->expr()->isNull('support_hash'),
                    $countQuery->expr()->eq('support_hash', $countQuery->expr()->literal(''))
                ))
                ->executeQuery()
                ->fetchOne();

            if ($count > 0) {
                // Generate hashes for supports without them
                if ($platform === 'postgresql') {
                    // PostgreSQL uses double quotes for identifiers and different hash function
                    $this->connection->executeStatement('
                        UPDATE "' . $fullTableName . '"
                        SET support_hash = encode(digest(CONCAT(user_id, \'-\', option_id, \'-\', inquiry_id, \'-\', gen_random_uuid()), \'sha256\'), \'hex\')
                        WHERE support_hash IS NULL OR support_hash = \'\'
                    ');
                } else {
                    $this->connection->executeStatement('
                        UPDATE `' . $fullTableName . '`
                        SET support_hash = SHA2(CONCAT(user_id, \'-\', option_id, \'-\', inquiry_id, \'-\', RAND()), 256)
                        WHERE support_hash IS NULL OR support_hash = \'\'
                    ');
                }
                $messages[] = "Generated hashes for {$count} support entries";
            } else {
                $messages[] = "All support entries already have hashes";
            }
        } catch (\Exception $e) {
            $messages[] = "Error generating support hashes: " . $e->getMessage();
            $this->logger->error('Failed to generate support hashes', ['exception' => $e]);
        }

        return $messages;
    }

    /**
     * Add a column to a table if it doesn't already exist - Database-agnostic version
     *
     * @param string $tableName The table name
     * @param string $columnName The column name
     * @param array $columnDefinition The column definition
     * @return void
     */
    private function addColumnIfNotExists(string $tableName, string $columnName, array $columnDefinition): void
    {
        $fullTableName = $this->dbPrefix . $tableName;

        // Check if table exists
        if (!$this->connection->tableExists($fullTableName)) {
            $this->logger->warning("Table {$fullTableName} does not exist, cannot add column");
            return;
        }

        // Check if column already exists
        $schema = $this->connection->getSchema();
        $table = $schema->getTable($fullTableName);
        $columnExists = $table->hasColumn($columnName);

        // Add column if it doesn't exist
        if (!$columnExists) {
            try {
                // Build the SQL to add the column
                $type = $columnDefinition['type'];
                $options = $columnDefinition['options'];

                // Create the column using Doctrine DBAL
                $newColumn = new \Doctrine\DBAL\Schema\Column($columnName, \Doctrine\DBAL\Types\Type::getType($type), $options);

                // Generate SQL to add the column
                $platform = $this->connection->getDatabasePlatform();
                $sql = $platform->getAddColumnSQL($fullTableName, $newColumn);

                $this->connection->executeStatement($sql);

                $this->logger->info("Added column {$columnName} to table {$fullTableName}");
            } catch (\Exception $e) {
                $this->logger->error("Failed to add column {$columnName} to table {$fullTableName}: " . $e->getMessage());
                throw $e;
            }
        } else {
            $this->logger->info("Column {$columnName} already exists in table {$fullTableName}");
        }
    }

    /**
     * Migrate allow_support (BIGINT) values to support_feature (STRING)
     *
     * Rules:
     * - If allow_support = 0 → support_feature = 'none'
     * - If allow_support = 1 → support_feature = 'binary' (default)
     * - If allow_support > 1 → support_feature = 'binary' (treat as enabled)
     *
     * @param string $tableName The table to migrate
     */
    private function migrateAllowSupportToSupportFeature(string $tableName): void
    {
        // Check if allow_support column exists
        $this->needsSchema();
        $fullTableName = $this->dbPrefix . $tableName;

        if (!$this->schema->hasTable($fullTableName)) {
            return;
        }

        $table = $this->schema->getTable($fullTableName);

        if (!$table->hasColumn('allow_support')) {
            $this->logger->info("Table $tableName doesn't have allow_support column, skipping migration");
            return;
        }

        // Perform the migration in SQL for efficiency
        $query = $this->connection->getQueryBuilder();

        // First, set all to 'binary' (default)
        $query->update($tableName)
            ->set('support_feature', $query->expr()->literal('binary'))
            ->executeStatement();

        // Then update rows where allow_support = 0 to 'none'
        $query = $this->connection->getQueryBuilder();
        $query->update($tableName)
            ->set('support_feature', $query->expr()->literal('none'))
            ->where($query->expr()->eq('allow_support', $query->expr()->literal(0, IQueryBuilder::PARAM_INT)))
            ->executeStatement();

        $this->logger->info("Migrated allow_support to support_feature in $tableName");

        // Also migrate allow_comment if needed (for consistency)
        if ($table->hasColumn('allow_comment')) {
            // Update comment-related logic if needed
            // Note: allow_comment stays as BIGINT, just log that it's still there
            $this->logger->info("allow_comment column remains in $tableName");
        }
    }

    /**
     * Remove allow_support column after migration (optional)
     *
     * @return string[] Messages as array
     */
    public function removeOldAllowSupportColumn(): array
    {
        $messages = [];

        try {
            $tablesToCheck = [Inquiry::TABLE, InquiryType::TABLE];

            foreach ($tablesToCheck as $tableName) {
                $messages[] = "Checking allow_support column in $tableName for removal";
            }

            // The actual removal will happen in removeObsoleteColumns()
            // based on TableSchema::GONE_COLUMNS configuration
        } catch (\Exception $e) {
            $messages[] = 'Error checking old allow_support columns: ' . $e->getMessage();
        }

        return $messages;
    }

    /**
     * Rename unique indices to use app-specific prefix to avoid collisions with other apps.
     * Drops old indices (with generic names) and adds new ones with 'agora_' prefix.
     *
     * @param ISchemaWrapper $schema The schema to modify
     * @return string[] Messages
     */
    public function renameUniqueIndices(ISchemaWrapper $schema): array
    {
        $messages = [];

        // Mapping from old index name to new index name and columns per table
        $indexMapping = [
            'oc_agora_log' => [
                'old' => 'UNIQ_unprocessed',
                'new' => 'agora_uniq_log_unprocessed',
                'columns' => ['processed', 'inquiry_id', 'user_id', 'message_id'],
            ],
            'oc_agora_share' => [
                [
                    'old' => 'UNIQ_shares',
                    'new' => 'agora_uniq_shares',
                    'columns' => ['inquiry_id', 'group_id', 'user_id'],
                ],
                [
                    'old' => 'UNIQ_token',
                    'new' => 'agora_uniq_token',
                    'columns' => ['token'],
                ],
            ],
            'oc_agora_support' => [
                'old' => 'UNIQ_supports',
                'new' => 'agora_uniq_supports',
                'columns' => ['inquiry_id', 'option_id', 'user_id'],
            ],
            'oc_agora_subscription' => [
                'old' => 'UNIQ_subscription',
                'new' => 'agora_uniq_subscription',
                'columns' => ['inquiry_id', 'user_id'],
            ],
            'oc_agora_watch' => [
                'old' => 'UNIQ_watch',
                'new' => 'agora_uniq_watch',
                'columns' => ['inquiry_id', 'table', 'session_id'],
            ],
            'oc_agora_preferences' => [
                'old' => 'UNIQ_preferences',
                'new' => 'agora_uniq_preferences',
                'columns' => ['user_id'],
            ],
            'oc_agora_inq_group_misc' => [
                'old' => 'UNIQ_group_misc',
                'new' => 'agora_uniq_group_misc',
                'columns' => ['inquiry_group_id', 'key'],
            ],
            'oc_agora_inq_type' => [
                'old' => 'UNIQ_inquiry_type',
                'new' => 'agora_uniq_inquiry_type',
                'columns' => ['inquiry_type'],
            ],
            'oc_agora_inq_option_type' => [
                'old' => 'UNIQ_option_type',
                'new' => 'agora_uniq_option_type',
                'columns' => ['option_type'],
            ],
            'oc_agora_inq_group_type' => [
                'old' => 'UNIQ_group_type',
                'new' => 'agora_uniq_group_type',
                'columns' => ['group_type'],
            ],
            'oc_agora_inq_group_relation' => [
                'old' => 'UNIQ_inquiry_group_relation',
                'new' => 'agora_uniq_inquiry_group_relation',
                'columns' => ['inquiry_id', 'group_id'],
            ],
            'oc_agora_inq_misc' => [
                'old' => 'UNIQ_inquiry_misc',
                'new' => 'agora_uniq_inquiry_misc',
                'columns' => ['inquiry_id', 'key'],
            ],
            'oc_agora_opt_misc' => [
                'old' => 'UNIQ_option_misc',
                'new' => 'agora_uniq_option_misc',
                'columns' => ['option_id', 'key'],
            ],
            'oc_agora_inq_families' => [
                'old' => 'UNIQ_family_inquiry_type',
                'new' => 'agora_uniq_family_inquiry_type',
                'columns' => ['family_type'],
            ],
            'oc_agora_opt_families' => [
                'old' => 'UNIQ_family_option_type',
                'new' => 'agora_uniq_family_option_type',
                'columns' => ['family_type'],
            ],
            'oc_agora_inq_status' => [
                'old' => 'UNIQ_inquiry_status',
                'new' => 'agora_uniq_inquiry_status',
                'columns' => ['inquiry_type', 'status_key'],
            ],
        ];

        foreach ($indexMapping as $tableName => $mapping) {
            if (!$schema->hasTable($tableName)) {
                continue;
            }
            $table = $schema->getTable($tableName);

            // Normalize to array of mappings (handles tables with multiple indices)
            if (isset($mapping['old'])) {
                $mapping = [$mapping];
            }

            foreach ($mapping as $idx) {
                $oldName = $idx['old'];
                $newName = $idx['new'];
                $columns = $idx['columns'];

                // Drop old index if it exists
                if ($table->hasIndex($oldName)) {
                    $table->dropIndex($oldName);
                    $messages[] = "Dropped old unique index $oldName from $tableName";
                }

                // Add new unique index if not already present
                if (!$table->hasIndex($newName)) {
                    $table->addUniqueIndex($columns, $newName);
                    $messages[] = "Added new unique index $newName to $tableName";
                }
            }
        }

        return $messages;
    }
}
