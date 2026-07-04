/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

<?php

declare(strict_types=1);

namespace OCA\Agora\Db;

use OCP\IDBConnection;
use OCP\DB\QueryBuilder\IQueryBuilder;
use Psr\Log\LoggerInterface;

class SupportSqlRepository
{
    public function __construct(
        private IDBConnection $db,
        private LoggerInterface $logger,
    ) {
    }

    /**
     * Insert with proper JSON handling for PostgreSQL and MariaDB
     */
    public function insertSupportWithJson(
        string $table,
        array $data,
        string $jsonColumn,
        bool $isJsonColumn = true // Set to false for integer columns
    ): int {
        $isPostgres = ($this->db->getDatabaseProvider() === IDBConnection::PLATFORM_POSTGRES);
        $isMariadb = ($this->db->getDatabaseProvider() === IDBConnection::PLATFORM_MYSQL);
        
        // Handle the column value based on type
        if (isset($data[$jsonColumn])) {
            if ($isJsonColumn) {
                // For JSON columns - encode as JSON string
                $data[$jsonColumn] = $this->normalizeToJsonString($data[$jsonColumn]);
            } else {
                // For integer columns - convert to integer
                if (is_array($data[$jsonColumn])) {
                    $data[$jsonColumn] = (int)($data[$jsonColumn]['value'] ?? 0);
                } else {
                    $data[$jsonColumn] = (int)$data[$jsonColumn];
                }
            }
        }
        
        $columns = array_keys($data);
        $placeholders = array_map(function ($col) use ($jsonColumn, $isPostgres, $isJsonColumn) {
            $placeholder = ':' . $col;
            // Only add ::json casting for PostgreSQL JSON columns
            if ($isPostgres && $col === $jsonColumn && $isJsonColumn) {
                return $placeholder . '::json';
            }
            return $placeholder;
        }, $columns);
        
        $prefixedTable = '*PREFIX*' . $table;
        $sql = sprintf(
            'INSERT INTO %s (%s) VALUES (%s)',
            $prefixedTable,
            implode(', ', $columns),
            implode(', ', $placeholders)
        );
        
        if ($isPostgres) {
            $sql .= ' RETURNING id';
        }
        
        $this->logger->debug('Executing insert', [
            'table' => $table,
            'is_postgres' => $isPostgres,
            'is_mariadb' => $isMariadb,
            'json_column' => $jsonColumn,
            'is_json_column' => $isJsonColumn
        ]);
        
        $stmt = $this->db->executeQuery($sql, $data);
        
        if ($isPostgres) {
            return (int)$stmt->fetchOne();
        }
        
        // For MariaDB/MySQL
        return (int)$this->db->lastInsertId($table . '_id_seq');
    }

    /**
     * Update with JSON handling for PostgreSQL and MariaDB
     */
    public function updateSupportWithJson(
        string $table,
        array $data,
        string $jsonColumn,
        int $id,
        bool $isJsonColumn = true
    ): void {
        $isPostgres = ($this->db->getDatabaseProvider() === IDBConnection::PLATFORM_POSTGRES);
        
        // Handle the column value based on type
        if (isset($data[$jsonColumn])) {
            if ($isJsonColumn) {
                // For JSON columns - encode as JSON string
                $data[$jsonColumn] = $this->normalizeToJsonString($data[$jsonColumn]);
            } else {
                // For integer columns - convert to integer
                if (is_array($data[$jsonColumn])) {
                    $data[$jsonColumn] = (int)($data[$jsonColumn]['value'] ?? 0);
                } else {
                    $data[$jsonColumn] = (int)$data[$jsonColumn];
                }
            }
        }
        
        $sets = [];
        foreach ($data as $column => $value) {
            $paramName = ':' . $column;
            // Only add ::json casting for PostgreSQL JSON columns
            if ($isPostgres && $column === $jsonColumn && $isJsonColumn) {
                $sets[] = "$column = $paramName::json";
            } else {
                $sets[] = "$column = $paramName";
            }
        }
        
        $data['id'] = $id;
        $prefixedTable = '*PREFIX*' . $table;
        $sql = sprintf(
            'UPDATE %s SET %s WHERE id = :id',
            $prefixedTable,
            implode(', ', $sets)
        );
        
        $this->logger->debug('Executing JSON update', [
            'table' => $table,
            'is_postgres' => $isPostgres,
            'json_column' => $jsonColumn,
            'is_json_column' => $isJsonColumn,
            'id' => $id
        ]);

        $this->db->executeQuery($sql, $data);
    }

    /**
     * Normalize value to JSON string for all databases
     */
    private function normalizeToJsonString(mixed $value): string
    {
        return json_encode(
            $value,
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR
        );
    }

}
