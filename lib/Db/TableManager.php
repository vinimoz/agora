<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */


namespace OCA\Agora\Db;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\DBAL\Types\Type;
use Exception;
use OCA\Agora\AppConstants;
use OCA\Agora\Migration\TableSchema;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IConfig;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use PDO;
use Psr\Log\LoggerInterface;

class TableManager
{

    private string $dbPrefix;

    /**
     * @psalm-suppress PossiblyUnusedMethod 
     */
    public function __construct(
        private IConfig $config,
        private IDBConnection $connection,
        private LoggerInterface $logger,
        private OptionMapper $optionMapper,
        private SupportMapper $supportMapper,
        private Schema $schema,
        private WatchMapper $watchMapper,
    ) {
        $this->setUp();
    }

    /**
     * setUp
     */
    private function setUp(): void
    {
        $this->dbPrefix = $this->config->getSystemValue('dbtableprefix', 'oc_');
    }

    public function setSchema(Schema &$schema): void
    {
        $this->schema = $schema;
    }

    public function setConnection(IDBConnection &$connection): void
    {
        $this->connection = $connection;
    }

    /**
     * @return string[]
     *
     * @psalm-return non-empty-list<string>
     */
    public function purgeTables(): array
    {
        $messages = [];

        // drop all child tables
        $droppedTables = [];

        // First drop all tables that have foreign key constraints
        foreach (TableSchema::FK_INDICES as $parent => $child) {
            // drop all child tables referencing the parent table
            foreach (array_keys($child) as $table) {
                if ($this->connection->tableExists($table)) {
                    $this->connection->dropTable($table);
                    $droppedTables[] = $this->dbPrefix . $table;
                    $messages[] = 'Dropped ' . $this->dbPrefix . $table;
                }
            }
            // drop the parent table
            if ($this->connection->tableExists($parent)) {
                $this->connection->dropTable($parent);
                $droppedTables[] = $this->dbPrefix . $parent;
                $messages[] = 'Dropped ' . $this->dbPrefix . $parent;
            }
        }

        // Then if there are any tables left, drop them
        foreach (array_keys(TableSchema::TABLES) as $tableName) {
            if ($this->connection->tableExists($tableName)) {
                $this->connection->dropTable($tableName);
                $droppedTables[] = $this->dbPrefix . $tableName;
                $messages[] = 'Dropped ' . $this->dbPrefix . $tableName;
            }
        }

        if (!$droppedTables) {
            $this->logger->info('Dropped tables', $droppedTables);
        }

        // delete all migration records
        // ATTENTION: This is more or less an illegal access
        // to the migrations table which belong to the core
        $query = $this->connection->getQueryBuilder();
        $query->delete('migrations')
            ->where('app = :appName')
            ->setParameter('appName', AppConstants::APP_ID)
            ->executeStatement();

        $this->logger->info('Removed all migration records from {dbPrefix}migrations', ['dbPrefix' => $this->dbPrefix]);
        $messages[] = 'Removed all migration records from ' . $this->dbPrefix . 'migrations';

        // delete all app configs
        // ATTENTION: This is more or less an illegal access
        // to the migrations table which belong to the core
        $query->delete('appconfig')
            ->where('appid = :appid')
            ->setParameter('appid', AppConstants::APP_ID)
            ->executeStatement();

        $this->logger->info('Removed all app config records from {dbPrefix}appconfig', ['dbPrefix' => $this->dbPrefix]);
        $messages[] = 'Removed all app config records from ' . $this->dbPrefix . 'appconfig';
        $messages[] = 'Done.';
        $messages[] = '';
        $messages[] = 'Please call \'occ app:remove inquiries\' now!';

        return $messages;
    }

    /**
     * @return string[]
     */
    public function removeWatch(): array
    {
        $messages = [];
        $tableName = $this->dbPrefix . Watch::TABLE;

        if ($this->connection->tableExists(Watch::TABLE)) {
            $this->connection->dropTable(Watch::TABLE);
            $messages[] = 'Dropped ' . $tableName;
        }
        return $messages;
    }

    /**
     * @return string[]
     *
     * @psalm-return non-empty-list<string>
     */
    public function createTable(string $tableName, array $columns): array
    {
        $messages = [];

        $tableName = $this->dbPrefix . $tableName;

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
     * @return string[]
     *
     * @psalm-return non-empty-list<string>
     */
    public function createTables(): array
    {
        $messages = [];

        foreach (TableSchema::TABLES as $tableName => $columns) {
            $messages = array_merge($messages, $this->createTable($tableName, $columns));
        }
        return $messages;
    }

    /**
     * Remove obsolete tables if they still exist
     */
    public function removeObsoleteTables(): array
    {
        $dropped = false;
        $messages = [];

        foreach (TableSchema::GONE_TABLES as $tableName) {
            if ($this->connection->tableExists($tableName)) {
                $dropped = true;
                $this->connection->dropTable($tableName);
                $messages[] = 'Dropped ' . $this->dbPrefix . $tableName;
            }
        }

        if (!$dropped) {
            $messages[] = 'No orphaned tables found';
        }
        return $messages;
    }

    public function removeObsoleteColumns(): array
    {
        $messages = [];
        $dropped = false;

        foreach (TableSchema::GONE_COLUMNS as $tableName => $columns) {
            $tableName = $this->dbPrefix . $tableName;
            if ($this->schema->hasTable($tableName)) {
                $table = $this->schema->getTable($tableName);

                foreach ($columns as $columnName) {
                    if ($table->hasColumn($columnName)) {
                        $dropped = true;
                        $table->dropColumn($columnName);
                        $messages[] = 'Dropped ' . $columnName . ' from ' . $tableName;
                    }
                }
            }
        }

        if (!$dropped) {
            $messages[] = 'No orphaned columns found';
        }

        return $messages;
    }

    /**
     * delete all orphaned entries by selecting all rows
     * those inquiry_ids are not present in the inquiries table
     *
     * Because we allowed nullish inquiry_ids between version 8.0.0 and 8.1.0,
     * we also delete all entries with a nullish inquiry_id.
     *
     * This method is used to clean up orphaned entries in the database and
     * is used by the occ command `occ inquiries:db:rebuild and while updating
     */
    public function removeOrphaned(): array
    {
        // collects all inquiryIds
        $subqueryInquiries = $this->connection->getQueryBuilder();
        $subqueryInquiries->selectDistinct('id')->from(Inquiry::TABLE);

        // collects all groupIds
        $subqueryGroups = $this->connection->getQueryBuilder();
        $subqueryGroups->selectDistinct('id')->from(InquiryGroup::TABLE);

        // delete all orphaned entries without a corresponding inquiry (inquiry_id is NULL or not in the inquiries table)
        foreach (TableSchema::FK_INDICES as $children) {
            foreach (array_keys($children) as $tableName) {
                $query = $this->connection->getQueryBuilder();
                $query->delete($tableName)
                    ->where(
                        $query->expr()->orX(
                            $query->expr()->notIn('inquiry_id', $query->createFunction($subqueryInquiries->getSQL()), IQueryBuilder::PARAM_INT_ARRAY),
                            $query->expr()->isNull('inquiry_id')
                        )
                    );
                $executed = $query->executeStatement();
                if (isset($orphaned[$tableName])) {
                       $orphaned[$tableName] += $executed;
                } else {
                    $orphaned[$tableName] = $executed;
                }
            }
        }

        // delete all orphaned shares without corresponding inquiry group and inquiry (group_id and inquiry_id are NULL or not in the inquiries or inquiry groups table)
        $query = $this->connection->getQueryBuilder();
        $query->delete(Share::TABLE)
            ->where(
                $query->expr()->orX(
                    $query->expr()->notIn('inquiry_id', $query->createFunction($subqueryInquiries->getSQL()), IQueryBuilder::PARAM_INT_ARRAY),
                    $query->expr()->isNull('inquiry_id')
                )
            );
        $query->andWhere(
            $query->expr()->orX(
                $query->expr()->notIn('group_id', $query->createFunction($subqueryGroups->getSQL()), IQueryBuilder::PARAM_INT_ARRAY),
                $query->expr()->isNull('group_id')
            )
        );
        $orphaned[Share::TABLE] = $query->executeStatement();

        // delete all orphaned entries from the inquiry-group-relation (group_id or inquiry_id are NULL or not in the inquiries or inquiry groups table)
        $query = $this->connection->getQueryBuilder();
        $query->delete(InquiryGroup::RELATION_TABLE)
            ->where(
                $query->expr()->orX(
                    $query->expr()->notIn('inquiry_id', $query->createFunction($subqueryInquiries->getSQL()), IQueryBuilder::PARAM_INT_ARRAY),
                    $query->expr()->isNull('inquiry_id')
                )
            );
        $query->orWhere(
            $query->expr()->orX(
                $query->expr()->notIn('group_id', $query->createFunction($subqueryGroups->getSQL()), IQueryBuilder::PARAM_INT_ARRAY),
                $query->expr()->isNull('group_id')
            )
        );
        $orphaned[InquiryGroup::RELATION_TABLE] = $query->executeStatement();


        // finally delete all inquiries with id === null
        $query = $this->connection->getQueryBuilder();
        $query->delete(Inquiry::TABLE)
            ->where($query->expr()->isNull('id'));
        $orphaned[Inquiry::TABLE] = $query->executeStatement();

        return $orphaned;
    }

    /**
     * @return string[]
     *
     * @psalm-return list<string>
     */
    public function deleteAllDuplicates(?IOutput $output = null): array
    {
        $messages = [];
        foreach (TableSchema::UNIQUE_INDICES as $tableName => $index) {
            $count = $this->deleteDuplicates($tableName, $index['columns']);

            if ($count) {
                $messages[] = 'Removed ' . $count . ' duplicate records from ' . $this->dbPrefix . $tableName;
                $this->logger->info(end($messages));
            }

            if ($output && $count) {
                $output->info(end($messages));
            }
        }
        return $messages;

    }

    private function deleteDuplicates(string $table, array $columns):int
    {
        $this->watchMapper->deleteOldEntries(time());

        $qb = $this->connection->getQueryBuilder();

        if ($this->schema->hasTable($this->dbPrefix . $table)) {
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
        return 0;
    }

    /**
     * Tidy migrations table and remove obsolete migration entries.
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

    public function fixSupports(): void
    {
        if ($this->schema->hasTable($this->dbPrefix . OptionMapper::TABLE)) {
            $table = $this->schema->getTable($this->dbPrefix . OptionMapper::TABLE);
            if ($table->hasColumn('duration')) {
                $foundOptions = $this->optionMapper->findOptionsWithDuration();
                foreach ($foundOptions as $option) {
                    $this->supportMapper->fixSupportOptionText(
                        $option->getInquiryId(),
                        $option->getId(),
                        $option->getInquiryOptionTextStart(),
                        $option->getInquiryOptionText(),
                    );
                }
            }
        }
    }

    public function resetLastInteraction(?int $timestamp = null): array
    {
        $messages = [];
        $timestamp = $timestamp ?? time();
        $query = $this->connection->getQueryBuilder();

        $query->update(Inquiry::TABLE)
            ->set('last_interaction', $query->createNamedParameter($timestamp))
            ->where($query->expr()->eq('last_interaction', $query->expr()->literal(0, IQueryBuilder::PARAM_INT)));
        $count = $query->executeStatement();

        if ($count > 0) {
            $this->logger->info('Updated {number} inquiries in {db} and set last_interaction to current timestamp {timestamp}', ['number' => $count, 'db' => $this->dbPrefix . InquiryMapper::TABLE, 'timestamp' => $timestamp]);
            $messages[] = 'Updated ' . $count . ' inquiries';
        } else {
            $this->logger->info('No inquiries needed to get updated with last interaction info');
            $messages[] = 'No inquiries needed to get updated with last interaction info';
        }

        return $messages;
    }

    public function migrateOptionsToHash(): array
    {
        $messages = [];

        if ($this->schema->hasTable($this->dbPrefix . OptionMapper::TABLE)) {
            $table = $this->schema->getTable($this->dbPrefix . OptionMapper::TABLE);
            $count = 0;
            if ($table->hasColumn('inquiry_option_hash')) {
                foreach ($this->optionMapper->getAll(includeNull: true) as $option) {
                    try {
                        $option->syncOption();
                        // $option->setInquiryOptionHash(hash('md5', $option->getInquiryId() . $option->getInquiryOptionText() . $option->getTimestamp()));

                        $this->optionMapper->update($option);
                        $count++;
                    } catch (Exception $e) {
                        $messages[] = 'Skip hash update - Error updating option hash for optionId ' . $option->getId();
                        $this->logger->error('Error updating option hash for optionId {id}', ['id' => $option->getId(), 'message' => $e->getMessage()]);
                    }
                }

                $this->logger->info('Updated {number} hashes in {db}', ['number' => $count,'db' => $this->dbPrefix . OptionMapper::TABLE]);
                $messages[] = 'Updated ' . $count . ' option hashes';

            } else {
                $this->logger->error('{db} is missing column \'inquiry_option_hash\' - aborted recalculating hashes', [ 'db' => $this->dbPrefix . OptionMapper::TABLE]);
            }
        } else {
            $this->logger->error('{db} is missing - aborted recalculating hashes', [ 'db' => $this->dbPrefix . OptionMapper::TABLE]);
        }

        if ($this->schema->hasTable($this->dbPrefix . SupportMapper::TABLE)) {
            $table = $this->schema->getTable($this->dbPrefix . SupportMapper::TABLE);
            $count = 0;

            $this->logger->info('Updated {number} hashes in {db}', ['number' => $count, 'db' => $this->dbPrefix . SupportMapper::TABLE]);
            $messages[] = 'Updated ' . $count . ' support hashes';

        } else {
            $this->logger->error('{db} is missing- aborted recalculating hashes', ['db' => $this->dbPrefix . SupportMapper::TABLE]);
        }
        return $messages;
    }

    /**
     * Get a concatenated array of values from a column in the query builder.
     *
     * @param IQueryBuilder $qb           The query builder instance per reference
     * @param string        $concatColumn The column to concatenate
     * @param string        $asColumn     The alias for the concatenated column
     * @param string        $dbProvider   The database provider (default: IDBConnection::PLATFORM_MYSQL)
     * @param string        $separator    The separator for concatenation (default: ',')
     *
     * @psalm-param IDBConnection::PLATFORM_* $dbProvider
     */
    public static function getConcatenatedArray(
        IQueryBuilder &$qb,
        string $concatColumn,
        string $asColumn,
        string $dbProvider,
        string $separator = ',',
    ): void {
        $qb->addSelect(
            match ($dbProvider) {
                IDBConnection::PLATFORM_POSTGRES => $qb->createFunction('string_agg(distinct ' . $concatColumn . '::varchar, \'' . $separator . '\') AS ' . $asColumn),
                IDBConnection::PLATFORM_ORACLE => $qb->createFunction('listagg(distinct ' . $concatColumn . ', \'' . $separator . '\') WITHIN GROUP (ORDER BY ' . $concatColumn . ') AS ' . $asColumn),
                IDBConnection::PLATFORM_SQLITE => $qb->createFunction('group_concat(replace(distinct ' . $concatColumn . ' ,\'\',\'\'), \'' . $separator . '\') AS ' . $asColumn),
                default => $qb->createFunction('group_concat(distinct ' . $concatColumn . ' SEPARATOR "' . $separator . '") AS ' . $asColumn),
            }
        );
    }

}
