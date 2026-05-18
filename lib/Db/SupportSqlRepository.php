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
     * Insert with proper JSON casting for PostgreSQL
     */
    public function insertSupportWithJson(
        string $table,
        array $data,
        string $jsonColumn
    ): int {
        // Normalize the JSON value
        $value = $data[$jsonColumn];
        $jsonValue = $this->normalizeToJsonString($value);
        $data[$jsonColumn] = $jsonValue;
        
        $isPostgres = ($this->db->getDatabaseProvider() === IDBConnection::PLATFORM_POSTGRES);
        $columns = array_keys($data);
        $placeholders = array_map(function ($col) use ($jsonColumn, $isPostgres) {
            $placeholder = ':' . $col;
            if ($isPostgres && $col === $jsonColumn) {
                return $placeholder . '::json';
            }
            return $placeholder;
        }, $columns);
        
        $prefixedTable='*PREFIX*'.$table; 
        $sql = sprintf(
            'INSERT INTO %s (%s) VALUES (%s)',
            $prefixedTable,
            implode(', ', $columns),
            implode(', ', $placeholders)
        );
        
        if ($isPostgres) {
            $sql .= ' RETURNING id';
        }
        
        $this->logger->debug('Executing JSON insert', [
            'table' => $table,
            'is_postgres' => $isPostgres,
            'json_column' => $jsonColumn
        ]);
        
        $stmt = $this->db->executeQuery($sql, $data);
        
        if ($isPostgres) {
            return (int)$stmt->fetchOne();
        }
        
        return (int)$this->db->lastInsertId();
    }

    /**
     * Update with JSON casting for PostgreSQL
     */
    public function updateSupportWithJson(
        string $table,
        array $data,
        string $jsonColumn,
        int $id
    ): void {
        // Normalize the JSON value
        if (isset($data[$jsonColumn])) {
            $data[$jsonColumn] = $this->normalizeToJsonString($data[$jsonColumn]);
        }
        
        $isPostgres = ($this->db->getDatabaseProvider() === IDBConnection::PLATFORM_POSTGRES);
        
        $sets = [];
        foreach ($data as $column => $value) {
            $paramName = ':' . $column;
            if ($isPostgres && $column === $jsonColumn) {
                $sets[] = "$column = $paramName::json";
            } else {
                $sets[] = "$column = $paramName";
            }
        }
        
        $data['id'] = $id;
        $prefixedTable='*PREFIX*'.$table; 
        $sql = sprintf(
            'UPDATE %s SET %s WHERE id = :id',
            $prefixedTable,
            implode(', ', $sets)
        );
        
        $this->logger->debug('Executing JSON update', [
            'table' => $table,
            'is_postgres' => $isPostgres,
            'json_column' => $jsonColumn,
            'id' => $id
        ]);
        
        $this->db->executeQuery($sql, $data);
    }

    private function normalizeToJsonString(mixed $value): string
    {
        if (is_array($value)) {
            return json_encode($value);
        }
        if (is_string($value)) {
            // Check if already valid JSON
            if (str_starts_with($value, '{') || str_starts_with($value, '[')) {
                return $value;
            }
            return json_encode(['value' => $value]);
        }
        if (is_numeric($value)) {
            return json_encode(['value' => (int)$value]);
        }
        if (is_bool($value)) {
            return json_encode(['value' => $value ? 1 : 0]);
        }
        return json_encode(['value' => 0]);
    }
}
