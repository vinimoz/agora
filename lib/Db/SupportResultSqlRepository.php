<?php

declare(strict_types=1);

namespace OCA\Agora\Db;

use OCP\IDBConnection;
use OCP\DB\QueryBuilder\IQueryBuilder;
use Psr\Log\LoggerInterface;

class SupportResultSqlRepository
{
    public function __construct(
        private IDBConnection $db,
        private LoggerInterface $logger,
    ) {
    }

    /**
     * Insert result with JSON casting
     */
    public function insertResultWithJson(
        string $table,
        ?int $engineId,
        string $targetType,
        int $targetId,
        array $result
    ): int {
        $isPostgres = ($this->db->getDatabaseProvider() === IDBConnection::PLATFORM_POSTGRES);
        $now = time();
        $jsonValue = json_encode($result);
        $data = [
            'target_type' => $targetType,
            'target_id' => $targetId,
            'result' => $jsonValue,
            'updated' => $now,
            'support_engine_id' => $engineId,
        ];
        
        $columns = array_keys($data);
        $placeholders = array_map(function ($col) use ($isPostgres) {
            $placeholder = ':' . $col;
            if ($isPostgres && $col === 'result') {
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
        
        $stmt = $this->db->executeQuery($sql, $data);
        
        if ($isPostgres) {
            return (int)$stmt->fetchOne();
        }
        
        return (int)$this->db->lastInsertId();
    }

    /**
     * Update result with JSON casting
     */
    public function updateResultWithJson(
        string $table,
        int $id,
        array $result,
        ?int $updated = null
    ): void {
        $isPostgres = ($this->db->getDatabaseProvider() === IDBConnection::PLATFORM_POSTGRES);
        $now = $updated ?? time();
        $jsonValue = json_encode($result);
        
        $prefixedTable='*PREFIX*'.$table; 
        if ($isPostgres) {
            $sql = sprintf(
                'UPDATE %s SET result = :result::json, updated = :updated WHERE id = :id',
                $prefixedTable
            );
        } else {
            $sql = sprintf(
                'UPDATE %s SET result = :result, updated = :updated WHERE id = :id',
                $prefixedTable
            );
        }
        
        $data = [
            'result' => $jsonValue,
            'updated' => $now,
            'id' => $id
        ];
        
        $this->logger->debug('Executing result update with JSON', [
            'table' => $table,
            'is_postgres' => $isPostgres,
            'id' => $id
        ]);
        
        $this->db->executeQuery($sql, $data);
    }

    /**
     * Upsert (insert or update) result with JSON casting
     */
    public function upsertResultWithJson(
        string $table,
        ?int $engineId,
        string $targetType,
        int $targetId,
        array $result
    ): int {
        $existingId = $this->findExistingResultId($table, $targetType, $targetId, $engineId);
        
        if ($existingId !== null) {
            $this->updateResultWithJson($table, $existingId, $result);
            return $existingId;
        }
        
        return $this->insertResultWithJson($table, $engineId, $targetType, $targetId, $result);
    }
    
    private function findExistingResultId(string $table, string $targetType, int $targetId, ?int $engineId): ?int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('id')
            ->from($table)
            ->where($qb->expr()->eq('target_type', $qb->createNamedParameter($targetType)))
            ->andWhere($qb->expr()->eq('target_id', $qb->createNamedParameter($targetId, IQueryBuilder::PARAM_INT)));
        
        if ($engineId === null) {
            $qb->andWhere($qb->expr()->isNull('support_engine_id'));
        } else {
            $qb->andWhere($qb->expr()->eq('support_engine_id', $qb->createNamedParameter($engineId, IQueryBuilder::PARAM_INT)));
        }
        
        $result = $qb->executeQuery()->fetchOne();
        return $result !== false ? (int)$result : null;
    }
}
