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
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use PDO;
use Psr\Log\LoggerInterface;

class TableManager extends DbManager {

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
	 * Purge all tables and all data
	 *
	 * @return string[] Messages as array
	 */
	public function purgeTables(): array {
		$messages = [];
		$droppedTables = [];

		// Disable foreign key checks
		$this->connection->executeStatement('SET FOREIGN_KEY_CHECKS = 0');

		try {
			// Get all tables for this app
			$tables = array_keys(TableSchema::TABLES);

			// First, drop all tables without worrying about order
			foreach ($tables as $tableName) {
				if ($this->connection->tableExists($tableName)) {
					try {
						$this->connection->dropTable($tableName);
						$droppedTables[] = $this->dbPrefix . $tableName;
						$messages[] = 'Dropped ' . $this->dbPrefix . $tableName;
					} catch (\Exception $e) {
						// If drop fails, try truncate first then drop
						try {
							$this->connection->executeStatement("TRUNCATE TABLE `{$this->dbPrefix}{$tableName}`");
							$this->connection->dropTable($tableName);
							$droppedTables[] = $this->dbPrefix . $tableName;
							$messages[] = 'Truncated and dropped ' . $this->dbPrefix . $tableName;
						} catch (\Exception $e2) {
							$messages[] = 'Failed to drop ' . $this->dbPrefix . $tableName . ': ' . $e2->getMessage();
						}
					}
				}
			}

			if ($droppedTables) {
				$this->logger->info('Dropped tables', $droppedTables);
			}

			// Delete migration records
			$query = $this->connection->getQueryBuilder();
			$query->delete('migrations')
	 ->where('app = :appName')
	 ->setParameter('appName', AppConstants::APP_ID)
	 ->executeStatement();

			$this->logger->info('Removed all migration records from {dbPrefix}migrations', ['dbPrefix' => $this->dbPrefix]);
			$messages[] = 'Removed all migration records from ' . $this->dbPrefix . 'migrations';

			// Delete app configs
			$query->delete('appconfig')
	 ->where('appid = :appid')
	 ->setParameter('appid', AppConstants::APP_ID)
	 ->executeStatement();

			$this->logger->info('Removed all app config records from {dbPrefix}appconfig', ['dbPrefix' => $this->dbPrefix]);
			$messages[] = 'Removed all app config records from ' . $this->dbPrefix . 'appconfig';

		} finally {
			// Re-enable foreign key checks
			$this->connection->executeStatement('SET FOREIGN_KEY_CHECKS = 1');
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
	public function createTable(string $tableName): array {
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
	public function createTables(): array {
		$this->needsSchema();
		$messages = [];

		foreach (array_keys(TableSchema::TABLES) as $tableName) {
			$messages = array_merge($messages, $this->createTable($tableName));
		}
		return $messages;
	}
	/**
	 * Remove obsolete tables if they still exist
	 *
	 * @return string[] Messages as array
	 public function removeObsoleteTables(): array {
		 $dropped = false;
		 $messages = [];
		 $this->connection->executeStatement('SET FOREIGN_KEY_CHECKS = 0');
		 foreach (TableSchema::GONE_TABLES as $tableName) {
			 $this->logger->warning('INTO REMOVE table {table}: {error}', [
				 'table' => $tableName,
	    ]);
			 if ($this->connection->tableExists($tableName)) {
				 $dropped = true;
				 $this->connection->dropTable($tableName);
				 $messages[] = 'Dropped ' . $this->dbPrefix . $tableName;
}
}
$this->connection->executeStatement('SET FOREIGN_KEY_CHECKS = 1');

if (!$dropped) {
	$messages[] = 'No orphaned tables found';
}
return $messages;
}


/**
 * Initialize default data like during installation
 *
 * @return string[] Messages as array
	 */
	public function initDefaultData(IOutput $output): array {
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
	public function removeObsoleteTables(): array {
		$dropped = false;
		$messages = [];

		foreach (TableSchema::GONE_TABLES as $tableName) {
			try {
				$this->connection->executeStatement('SET FOREIGN_KEY_CHECKS = 0');

				$this->connection->executeStatement("DROP TABLE IF EXISTS `$tableName`");

				$this->connection->executeStatement('SET FOREIGN_KEY_CHECKS = 1');

				$dropped = true;
				$messages[] = 'Dropped obsolete table ' . $tableName;
				$this->logger->info('Dropped obsolete table {table}', ['table' => $tableName]);
			} catch (\Exception $e) {
				$messages[] = 'Failed to drop obsolete table ' . $tableName . ': ' . $e->getMessage();
				$this->logger->error('Failed to drop obsolete table {table}: {error}', [
					'table' => $tableName,
					'error' => $e->getMessage()
				]);

				$this->connection->executeStatement('SET FOREIGN_KEY_CHECKS = 1');
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
	/**
	 * Transfer data from mod_status to inq_status table
	 *
	 * @return string[] Messages as array
	 */
	public function transferModStatusToInqStatus(): array {
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
				"SELECT COUNT(*) FROM oc_agora_inq_status"
			)->fetchOne();

			if ($existingCount > 0) {
				$messages[] = 'Data already exists in inq_status table - skipping transfer';
				return $messages;
			}

			$sourceCount = $this->connection->executeQuery(
				"SELECT COUNT(*) FROM oc_agora_mod_status"
			)->fetchOne();

			if ($sourceCount === 0) {
				$messages[] = 'No data found in mod_status table - nothing to transfer';
				return $messages;
			}

			// Transfert des données
			$this->connection->executeStatement("
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
	");

	$messages[] = "Transferred $sourceCount records from mod_status to inq_status";
	$this->logger->info('Transferred {count} records from mod_status to inq_status', ['count' => $sourceCount]);

    } catch (\Exception $e) {
	$messages[] = 'Failed to transfer mod_status data: ' . $e->getMessage();
	$this->logger->error('Failed to transfer mod_status data: {error}', ['error' => $e->getMessage()]);
    }

    // LOG pour debug
    $this->logger->info('transferModStatusToInqStatus returning messages: ' . count($messages));

    return $messages;
}
	/**
	 * Remove obsolete columns if they still exist
	 *
	 * @return string[] Messages as array
	public function removeObsoleteColumns(): array {
		$messages = [];
		$dropped = false;

		foreach (TableSchema::GONE_COLUMNS as $tableName => $columns) {
			$prefixedTableName = $this->dbPrefix . $tableName;
			 $this->logger->error('Failed to drop obsolete column from table {table}: {error}', ['table' => $prefixedTableName]);

			if (!$this->schema->hasTable($prefixedTableName)) {
				continue;
			}

			$table = $this->schema->getTable($prefixedTableName);

			foreach ($columns as $columnName) {
			 $this->logger->error('Failed to drop obsolete column {columns}: {error}', [
		'columns' => $columnName]);

				if ($table->hasColumn($columnName)) {
					$dropped = true;
					$table->dropColumn($columnName);
					$messages[] = 'Dropped ' . $columnName . ' from ' . $prefixedTableName;
				}
			}
		}

		if (!$dropped) {
			$messages[] = 'No orphaned columns found';
		}

		return $messages;
	}

	 */
	/**
 * Remove obsolete columns if they still exist - Version ultra simple
 */
public function removeObsoleteColumns(): array {
    $messages = [];
    $dropped = false;

    foreach (TableSchema::GONE_COLUMNS as $tableName => $columns) {
	foreach ($columns as $columnName) {
	    try {
		$this->connection->executeStatement(
		    "ALTER TABLE `$tableName` DROP COLUMN IF EXISTS `$columnName`"
		);
		$dropped = true;
		$messages[] = 'Dropped obsolete column ' . $columnName . ' from ' . $tableName;
	    } catch (\Exception $e) {
		$messages[] = 'Failed to drop column ' . $columnName . ' from ' . $tableName . ': ' . $e->getMessage();
	    }
	}
    }

    if (!$dropped) {
	$messages[] = 'No obsolete columns found';
    }
    return $messages;
}
	/**
	 * delete all orphaned entries by selecting all rows
	 * those inquiry_ids are not present in the agora table
	 *
	 * Because we allowed nullish inquiry_ids between version 8.0.0 and 8.1.0,
	 * we also delete all entries with a nullish inquiry_id.
	 *
	 * This method is used to clean up orphaned entries in the database and
	 * is used by the occ command `occ agora:db:rebuild and while updating
	 *
	 * @return string[] Messages as array
	 */
	/**
	 * delete all orphaned entries by selecting all rows
	 * those inquiry_ids are not present in the inquiry table
	 *
	 * @return string[] Messages as array
	 */
	public function removeOrphaned(): array {
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
	public function setLastInteraction(?int $timestamp = null): string {
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

	public function updateHashes(): array {
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


    private function updateSupportHashes(): int {
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

    private function updateOptionHashes(): int {
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
    private function generateSupportHash(string $userId, int $optionId, int $inquiryId): string {
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
    private function generateOptionHash(string $text, int $inquiryId): string {
        $normalizedText = trim(mb_strtolower($text));
        $data = $normalizedText . '|' . $inquiryId;
        return hash('sha256', $data);
    }

    /**
     * Check if hash looks valid
     */
    private function isValidHash(string $hash): bool {
        return preg_match('/^[a-f0-9]{64}$/', $hash) === 1;
    }

    /**
     * Generate random string for hash salting
     */
    private function generateRandomString(int $length = 16): string {
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
    public function deleteAllDuplicates(?IOutput $output = null): array {
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
    private function deleteDuplicates(string $table, array $columns):int {
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
    public function tidyWatchTable(int $offset): string {
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
    public function fixNullishShares(): array {
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
    public function removeObsoleteMigrations(): array {
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
    public function fixNullishPollGroupRelations(): array {
        $messages = [];

        try {
            $tableName = PollGroup::RELATION_TABLE;
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
     *
     */
    public function migrateShareLabels(): array {
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
    private function migrateNullishColumnToZero(string $tableName, string $columnName): int {
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
     *
     */
    public function migratePublicToOpen(): array {
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
    public function cleanInstanceData(string $category): array {
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

        // Disable foreign key checks to allow truncation in any order
        $this->connection->executeStatement('SET FOREIGN_KEY_CHECKS = 0');

        try {
            foreach ($tables as $tableName) {
                $messages = array_merge($messages, $this->truncateTable($tableName));
            }
        } finally {
            // Re-enable foreign key checks
            $this->connection->executeStatement('SET FOREIGN_KEY_CHECKS = 1');
        }

        return $messages;
    }

    /**
     * Truncate a single table
     *
     * @param string $tableName The table name (without prefix)
     * @return string[] Messages as array
     */
    private function truncateTable(string $tableName): array {
        $messages = [];

        if (!$this->connection->tableExists($tableName)) {
            $messages[] = 'Table ' . $this->dbPrefix . $tableName . ' does not exist, skipping';
            return $messages;
        }

        try {
            $this->connection->executeStatement("TRUNCATE TABLE `{$this->dbPrefix}{$tableName}`");
            $messages[] = 'Truncated ' . $this->dbPrefix . $tableName;
            $this->logger->info('Truncated table {table}', ['table' => $this->dbPrefix . $tableName]);
        } catch (\Exception $e) {
            // Fallback: try DELETE FROM if TRUNCATE fails
            try {
                $this->connection->executeStatement("DELETE FROM `{$this->dbPrefix}{$tableName}`");
                $messages[] = 'Cleared ' . $this->dbPrefix . $tableName;
                $this->logger->info('Cleared table {table}', ['table' => $this->dbPrefix . $tableName]);
            } catch (\Exception $e2) {
                $messages[] = 'Failed to clean ' . $this->dbPrefix . $tableName . ': ' . $e2->getMessage();
                $this->logger->error('Failed to clean table {table}: {error}', [
                    'table' => $this->dbPrefix . $tableName,
                    'error' => $e2->getMessage()
                ]);
            }
        }

        return $messages;
    }
}

