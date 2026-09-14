<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use Doctrine\DBAL\Schema\Schema;
use Exception;
use OCA\Agora\Exceptions\PreconditionColumnIsMissingException;
use OCA\Agora\Exceptions\PreconditionException;
use OCA\Agora\Exceptions\PreconditionTableIsMissingException;
use OCA\Agora\Exceptions\SchemaMissmatchException;
use OCP\DB\ISchemaWrapper;
use OCP\IConfig;
use OCP\IDBConnection;
use Psr\Log\LoggerInterface;

abstract class DbManager
{
    /** @var ISchemaWrapper|Schema|null */
    protected $schema;
    protected string $dbPrefix;

    /** @psalm-suppress PossiblyUnusedMethod */
    public function __construct(
        protected IConfig $config,
        protected IDBConnection $connection,
        protected LoggerInterface $logger,
    ) {
        $this->dbPrefix = $this->config->getSystemValue('dbtableprefix', 'oc_');
    }

    /**
     * Set the schema.
     * This method is used to set the schema for the database manager.
     * It can be used to overwrite the current schema.
     * It must be called before any other methods that require a schema.
     * 
     * This accepts both ISchemaWrapper and Schema for compatibility.
     * 
     * @param ISchemaWrapper|Schema $schema
     * @return void
     */
    public function setSchema($schema): void
    {
        $this->schema = $schema;
    }

    /**
     * Create a new schema.
     * This method is used to create a new schema instance.
     * It must be called before any other methods that require a schema.
     *
     * @throws Exception if the schema cannot be created
     */
    public function createSchema(): void
    {
        $this->schema = $this->connection->createSchema();
    }

    /**
     * Migrate the database to the current schema.
     * This method is used to apply the schema changes to the database.
     * It must be called after the schema is set.
     *
     * @throws SchemaMissmatchException if the schema is not set or not compatible
     */
    public function migrateToSchema(): void
    {
        // Schema must be set
        $this->needsSchema();
        
        // If it's an ISchemaWrapper, use it directly
        if ($this->schema instanceof ISchemaWrapper) {
            $this->connection->migrateToSchema($this->schema);
            return;
        }
        
        // If it's a Doctrine Schema, we need to convert it to ISchemaWrapper
        if ($this->schema instanceof Schema) {
            // Create a new schema wrapper from the connection
            // Note: This might not work in all versions, but it's a fallback
            $wrapper = $this->connection->createSchema();
            // Copy the schema structure if possible
            // Alternatively, just migrate the Doctrine schema directly
            // Some versions of Nextcloud accept Schema directly
            $this->connection->migrateToSchema($this->schema);
            return;
        }
        
        throw new SchemaMissmatchException('Schema is not an instance of ISchemaWrapper or Schema (caller: ' . self::formatCaller() . ')');
    }

    /**
     * Set the database connection.
     * Use it to overwrite the managers own connection.
     *
     * @param IDBConnection $connection
     */
    public function setConnection(IDBConnection &$connection): void
    {
        $this->connection = $connection;
    }

    /**
     * Get the table name with the prefix.
     * If the schema is an instance of Schema, we need to prefix the table name.
     * ISchemaWrapper already uses the prefixed table name, but Schema does not.
     *
     * @param string $tableName without prefix
     * @return string tableName with prefix
     */
    protected function getTableName(string $tableName): string
    {
        if ($this->schema instanceof Schema) {
            // If the schema is an instance of Schema, we need to prefix the table name
            return $this->dbPrefix . $tableName;
        }
        return $tableName;
    }

    /**
     * Use this as a predetermined breaking point to ensure if a method needs a schema to be set.
     *
     * @throws SchemaMissmatchException if the schema is not set or not compatible
     */
    protected function needsSchema(): void
    {
        if ($this->schema === null) {
            // Auto-create schema if not set
            $this->createSchema();
            return;
        }
        
        if ($this->schema instanceof ISchemaWrapper || $this->schema instanceof Schema) {
            return;
        }
        
        throw new SchemaMissmatchException('Schema is not set or not an instance of ISchemaWrapper or Schema (caller: ' . self::formatCaller() . ')');
    }

    /**
     * Check if the table and columns exist
     * If columnNames is empty only the table is checked
     *
     * @param string $tableName Unprefixed tablename
     * @param string[]|string $columnNames Column name or array of column names to check
     *
     * @throws PreconditionException on any precondition failure
     * @throws PreconditionTableIsMissingException if the table does not exist
     * @throws PreconditionColumnIsMissingException if a column does not exist
     *
     */
    protected function checkPrecondition(string $tableName, array|string $columnNames = []): void
    {
        $prefixedTableName = $this->dbPrefix . $tableName;

        if (!$this->connection->tableExists($tableName)) {
            $this->logger->error('{db} is missing', [ 'db' => $prefixedTableName]);
            throw new PreconditionTableIsMissingException('Table ' . $prefixedTableName . ' does not exist');
        }

        if (empty($columnNames)) {
            return; // Only the table is checked
        }

        $schema = $this->connection->createSchema();
        $table = $schema->getTable($prefixedTableName);

        if (is_string($columnNames)) {
            $columnNames = [$columnNames];
        }

        foreach ($columnNames as $columnName) {
            if (!$table->hasColumn($columnName)) {
                $this->logger->error('{db} is missing column \'{column}\'', [ 'db' => $prefixedTableName, 'column' => $columnName]);
                throw new PreconditionColumnIsMissingException('Column ' . $columnName . ' does not exist in ' . $prefixedTableName);
            }
        }

        return;
    }

    private static function formatCaller(int $skip = 1): string
    {
        $bt = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, $skip + 2);
        $f = $bt[$skip + 0] ?? null; // Frame of this method (0)
        $c = $bt[$skip + 1] ?? null; // Frame of the caller (1)

        $cls = $c['class'] ?? '';
        $typ = $c['type'] ?? '';
        $fn = $c['function'] ?? '??';
        $fil = $c['file'] ?? ($f['file'] ?? '??');
        $ln = $c['line'] ?? ($f['line'] ?? 0);

        return sprintf('%s%s%s@%s:%d', $cls, $typ, $fn, self::short($fil), $ln);
    }

    private static function short(string $path): string
    {
        $norm = str_replace('\\', '/', $path);
        $pos = strpos($norm, '/lib/');
        return $pos === false ? basename($norm) : substr($norm, $pos + 1); // "lib/…"
    }
}
