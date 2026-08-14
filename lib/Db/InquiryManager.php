<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use Doctrine\DBAL\Schema\Exception\IndexDoesNotExist;
use Exception;
use OCA\Agora\Db\IndexDefinitions;
use OCP\IConfig;
use OCP\IDBConnection;
use Psr\Log\LoggerInterface;

/** @psalm-suppress UnusedClass */
class IndexManager extends DbManager
{
    /** @psalm-suppress PossiblyUnusedMethod */
    public function __construct(
        protected IConfig $config,
        protected IDBConnection $connection,
        protected LoggerInterface $logger,
    ) {
        parent::__construct($config, $connection, $logger);
    }

    /**
     * Create unique indices
     * Unique indices are crucial for the correct operation of the agora app.
     * This for they have to be updated on every update.
     *
     * @return string[] logged messages
     */
    public function createUniqueIndices(): array
    {
        $messages = [];

        foreach (IndexDefinitions::UNIQUE_INDICES as $tableName => $uniqueIndices) {
            foreach ($uniqueIndices as $name => $definition) {
                $messages[] = $this->createIndex($tableName, $name, $definition['columns'], true);
            }
        }
        return $messages;
    }

    /**
     * Create optional indices
     * Usually they should be created by the AddMissingIndicesListener
     * or on first time installation of agora.
     *
     * @return string[] logged messages
     */
    public function createOptionalIndices(): array
    {
        $messages = [];

        foreach (IndexDefinitions::OPTIONAL_INDICES as $table => $indices) {
            foreach ($indices as $name => $definition) {
                $messages[] = $this->createIndex($table, $name, $definition['columns']);
            }
        }

        return $messages;
    }

    /**
     * Create common indices
     *
     * @return string[] logged messages
     */
    public function createCommonIndices(): array
    {
        $messages = [];

        foreach (IndexDefinitions::COMMON_INDICES as $name => $definition) {
            $messages[] = $this->createIndex(
                $definition['table'], 
                $name, 
                $definition['columns'], 
                $definition['unique'] ?? false
            );
        }

        return $messages;
    }

    /**
     * Create support system indices (v1.7.5+)
     *
     * @return string[] logged messages
     */
    public function createSupportIndices(): array
    {
        $messages = [];

        // Support table indices
        foreach (IndexDefinitions::SUPPORT_INDICES as $table => $indices) {
            foreach ($indices as $name => $definition) {
                $messages[] = $this->createIndex($table, $name, $definition['columns']);
            }
        }

        // Support engines indices
        foreach (IndexDefinitions::SUPPORT_ENGINE_INDICES as $table => $indices) {
            foreach ($indices as $name => $definition) {
                $isUnique = $definition['unique'] ?? false;
                $messages[] = $this->createIndex($table, $name, $definition['columns'], $isUnique);
            }
        }

        // Support results indices
        foreach (IndexDefinitions::SUPPORT_RESULT_INDICES as $table => $indices) {
            foreach ($indices as $name => $definition) {
                $isUnique = $definition['unique'] ?? false;
                $messages[] = $this->createIndex($table, $name, $definition['columns'], $isUnique);
            }
        }

        return $messages;
    }

    /**
     * Create all indices
     *
     * @return string[] logged messages
     */
    public function createAllIndices(): array
    {
        $messages = [];
        $messages = array_merge($messages, $this->createUniqueIndices());
        $messages = array_merge($messages, $this->createCommonIndices());
        $messages = array_merge($messages, $this->createOptionalIndices());
        $messages = array_merge($messages, $this->createSupportIndices());
        return $messages;
    }

    /**
     * add on delete fk contraints to all tables referencing the main agora table
     * Foreign key constraints are crucial for the correct operation of the agora app.
     * This for they have to be updated on every update.
     *
     * @return string[] logged messages
     */
    public function createForeignKeyConstraints(): array
    {
        $messages = [];

        foreach (IndexDefinitions::FK_INDICES as $parent => $child) {
            foreach ($child as $table => $childTable) {
                $messages[] = $this->createForeignKeyConstraint($parent, $table, $childTable['constraintColumn']);
            }
        }

        return $messages;
    }

    /**
     * add one on delete fk contraint
     *
     * @param string $parentTableName name of referred table
     * @param string $childTableName name of referring table
     * @return string log message
     */
    public function createForeignKeyConstraint(string $parentTableName, string $childTableName, string $constraintColumn): string
    {
        $this->needsSchema();
        $parentTableName = $this->getTableName($parentTableName);
        $childTableName = $this->getTableName($childTableName);

        $parentTable = $this->schema->getTable($parentTableName);
        $childTable = $this->schema->getTable($childTableName);

        $childTable->addForeignKeyConstraint($parentTable, [$constraintColumn], ['id'], ['onDelete' => 'CASCADE']);
        return 'Added ' . $parentTableName . '[' . $constraintColumn . '] <- ' . $childTableName . '[id]';
    }

    /**
     * @return string[]
     *
     * @psalm-return list{0?: string,...}
     */
    public function listExistingIndices(): array
    {
        $this->needsSchema();
        $messages = [];

        foreach (array_keys(IndexDefinitions::getAllIndices()) as $tableName) {
            if (is_string($tableName) && $this->schema->hasTable($tableName)) {
                $table = $this->schema->getTable($tableName);

                foreach ($table->getIndexes() as $index) {
                    $messages[] = $tableName . ' - ' . $index->getName() . ' (' . implode(',', $index->getColumns()) . ')';
                }
            }
        }
        return $messages;
    }

    /**
     * Create one named index for table
     *
     * @param string $tableName name of table to add the index to
     * @param string $indexName index name
     * @param string[] $columns columns to inclue to the index
     * @param bool $unique create a unique index
     * @return string log message
     */
    public function createIndex(string $tableName, string $indexName, array $columns, bool $unique = false): string
    {
        $this->needsSchema();
        $tableName = $this->getTableName($tableName);

        if ($this->schema->hasTable($tableName)) {
            $table = $this->schema->getTable($tableName);

            if (!$table->hasIndex($indexName)) {
                if ($unique) {
                    $table->addUniqueIndex($columns, $indexName);
                    return 'Added unique index ' . $indexName . ' for ' . json_encode($columns) . ' to ' . $tableName;
                } else {
                    $table->addIndex($columns, $indexName);
                    return 'Added index ' . $indexName . ' for ' . json_encode($columns) . ' to ' . $tableName;
                }
            }
            return 'Index ' . $indexName . ' already exists in ' . $tableName;
        }
        return 'Table ' . $tableName . ' does not exist';
    }

    /**
     * remove all foreign keys
     *
     * @return string[] logged messages
     */
    public function removeAllForeignKeyConstraints(): array
    {
        $messages = [];

        foreach (IndexDefinitions::FK_INDICES as $child) {
            foreach (array_keys($child) as $table) {
                $messages = array_merge($messages, $this->removeForeignKeysFromTable($table));
            }
        }

        return $messages;
    }

    /**
     * remove all generic indices
     *
     * @return string[] logged messages
     */
    public function removeAllGenericIndices(): array
    {
        $messages = [];

        foreach (array_keys(IndexDefinitions::getAllIndices()) as $table) {
            if (is_string($table)) {
                $messages = array_merge($messages, $this->removeGenericIndicesFromTable($table));
            }
        }

        return $messages;
    }

    /**
     * remove all generic indices
     *
     * @return string[] logged messages
     */
    public function removeNamedIndices(): array
    {
        $messages = [];

        foreach (IndexDefinitions::OPTIONAL_INDICES as $table => $indices) {
            foreach (array_keys($indices) as $name) {
                $message = $this->removeNamedIndexFromTable($table, $name);
                if ($message !== null && $message !== '') {
                    $messages[] = $message;
                }
            }
        }

        return $messages;
    }

    /**
     * remove all unique indices
     *
     * @return string[] logged messages
     */
    public function removeAllUniqueIndices(): array
    {
        $messages = [];

        foreach (array_keys(IndexDefinitions::UNIQUE_INDICES) as $tableName) {
            $messages = array_merge($messages, $this->removeUniqueIndicesFromTable($tableName));
        }

        return $messages;
    }

    /**
     * remove all foreign keys from $tableName
     *
     * @param string $tableName name of table to remove fk from
     * @return string[] logged messages
     */
    public function removeForeignKeysFromTable(string $tableName): array
    {
        $this->needsSchema();
        $tableName = $this->getTableName($tableName);
        $messages = [];

        if ($this->schema->hasTable($tableName)) {
            $table = $this->schema->getTable($tableName);

            foreach ($table->getForeignKeys() as $foreignKey) {
                $table->removeForeignKey($foreignKey->getName());
                $messages[] = 'Removed ' . $foreignKey->getName() . ' from ' . $tableName;
            }
        }

        return $messages;
    }

    /**
     * remove all UNIQUE indices from $table
     *
     * @param string $tableName table name of table to remove unique incices from
     * @return string[] logged messages
     */
    public function removeUniqueIndicesFromTable(string $tableName): array
    {
        $this->needsSchema();
        $tableName = $this->getTableName($tableName);
        $messages = [];

        if ($this->schema->hasTable($tableName)) {
            $table = $this->schema->getTable($tableName);

            foreach ($table->getIndexes() as $index) {
                if (strpos($index->getName(), 'UNIQ_') === 0) {
                    $table->dropIndex($index->getName());
                    $messages[] = 'Removed ' . $index->getName() . ' from ' . $tableName;
                }
            }
        }
        return $messages;
    }

    /**
     * remove all generic indices from $table
     *
     * @param string $tableName table name of table to remove incices from
     * @return string[] logged messages
     */
    public function removeGenericIndicesFromTable(string $tableName): array
    {
        $this->needsSchema();
        $tableName = $this->getTableName($tableName);
        $messages = [];

        if ($this->schema->hasTable($tableName)) {
            $table = $this->schema->getTable($tableName);

            foreach ($table->getIndexes() as $index) {
                if (strpos($index->getName(), 'IDX_') === 0) {
                    try {
                        $messages[] = 'Removes ' . $index->getName() . ' from ' . $tableName;
                        $table->dropIndex($index->getName());
                    } catch (Exception $e) {
                        /**
                         * If this fails, it is not a generic index, skip it
                         *
                         * This can happen if the index is already removed
                         * For some strange reason, an index name is
                         * reported, although it does not exist anymore
                         */
                        continue;
                    }
                }
            }
        }
        return $messages;
    }

    /**
     * remove all generic indices from $table
     *
     * @param string $tableName table name of table to remove the index from
     * @param string $indexName name of index to remove
     *
     * @return null|string
     */
    public function removeNamedIndexFromTable(string $tableName, string $indexName): ?string
    {
        $this->needsSchema();
        $tableName = $this->getTableName($tableName);
        $message = null;

        try {
            if ($this->schema->hasTable($tableName)) {
                $table = $this->schema->getTable($tableName);
                $table->dropIndex($indexName);
                $message = 'Removed ' . $indexName . ' from ' . $tableName;
            }
        } catch (IndexDoesNotExist $e) {
            // common index does not exist, skip it
        }
        return $message;
    }

    /**
     * Create schema for the manager
     */
    public function createSchema(): void
    {
        $this->needsSchema();
    }
}
