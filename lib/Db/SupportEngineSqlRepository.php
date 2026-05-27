<?php

declare(strict_types=1);

namespace OCA\Agora\Db;

use OCP\IDBConnection;
use OCP\DB\QueryBuilder\IQueryBuilder;
use Psr\Log\LoggerInterface;

class SupportEngineSqlRepository
{
    public function __construct(
        private IDBConnection $db,
        private LoggerInterface $logger,
    ) {
    }

    /**
     * Insert engine with proper JSON casting for all JSON columns
     * 
     * @param string $table Table name
     * @param array $data Data to insert
     * @param array $jsonColumns List of columns that are JSON type
     */
    public function insertEngineWithJson(
        string $table,
        array $data,
        array $jsonColumns = ['config', 'target_ids', 'metadata']
    ): int {
        $isPostgres = ($this->db->getDatabaseProvider() === IDBConnection::PLATFORM_POSTGRES);
        
        // Normalize all JSON columns
        foreach ($jsonColumns as $column) {
            if (isset($data[$column])) {
                $data[$column] = $this->normalizeToJsonString($data[$column]);
                $this->logger->debug('Normalized JSON column', [
                    'column' => $column,
                    'value' => substr($data[$column], 0, 200)
                ]);
            } elseif ($column === 'target_ids') {
                // Ensure target_ids is always an array, even if empty
                $data[$column] = '[]';
            } elseif ($column === 'config') {
                // Ensure config is always an object, even if empty
                $data[$column] = '{}';
            } elseif ($column === 'metadata') {
                // Ensure metadata is always an object or null
                $data[$column] = '{}';
            }
        }
        
        $columns = array_keys($data);
        $placeholders = array_map(function ($col) use ($jsonColumns, $isPostgres) {
            $placeholder = ':' . $col;
            if ($isPostgres && in_array($col, $jsonColumns)) {
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
        
        $this->logger->debug('Executing JSON insert for support engine', [
            'table' => $table,
            'is_postgres' => $isPostgres,
            'json_columns' => $jsonColumns,
            'columns' => $columns
        ]);
        
        $stmt = $this->db->executeQuery($sql, $data);
        
        if ($isPostgres) {
            return (int)$stmt->fetchOne();
        }
        
        return (int)$this->db->lastInsertId();
    }

    /**
     * Update engine with proper JSON casting for all JSON columns
     */
    public function updateEngineWithJson(
        string $table,
        array $data,
        array $jsonColumns = ['config', 'target_ids', 'metadata'],
        int $id
    ): void {
        $isPostgres = ($this->db->getDatabaseProvider() === IDBConnection::PLATFORM_POSTGRES);
        
        // Normalize all JSON columns
        foreach ($jsonColumns as $column) {
            if (isset($data[$column])) {
                $data[$column] = $this->normalizeToJsonString($data[$column]);
                $this->logger->debug('Normalized JSON column for update', [
                    'column' => $column,
                    'value' => substr($data[$column], 0, 200)
                ]);
            }
        }
        
        $sets = [];
        foreach ($data as $column => $value) {
            $paramName = ':' . $column;
            if ($isPostgres && in_array($column, $jsonColumns)) {
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
        
        $this->logger->debug('Executing JSON update for support engine', [
            'table' => $table,
            'is_postgres' => $isPostgres,
            'json_columns' => $jsonColumns,
            'id' => $id,
            'updating_columns' => array_keys($data)
        ]);
        
        $this->db->executeQuery($sql, $data);
    }

    /**
     * Normalize value to JSON string for database storage
     */
    private function normalizeToJsonString(mixed $value): string
    {
        if (is_array($value)) {
            // For empty arrays, return appropriate JSON
            if (empty($value)) {
                return '[]';
            }
            return json_encode($value);
        }
        
        if (is_string($value)) {
            // Check if already valid JSON
            $trimmed = trim($value);
            if ((str_starts_with($trimmed, '{') || str_starts_with($trimmed, '[')) && json_decode($value) !== null) {
                return $value;
            }
            return json_encode(['value' => $value]);
        }
        
        if (is_numeric($value)) {
            return json_encode($value);
        }
        
        if (is_bool($value)) {
            return json_encode($value);
        }
        
        if ($value === null) {
            return 'null';
        }
        
        // Default fallback
        return json_encode($value);
    }
}
