<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Migration;

use OCP\DB\ISchemaWrapper;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Agora 1.7.13
 *
 * Update inquiries.access from 'moderate' to 'private'.
 */
class Version01071320260104120000 extends SimpleMigrationStep
{
    private ?IOutput $output = null;

    public function __construct(
        private IDBConnection $connection,
    ) {
    }

    public function changeSchema(IOutput $output, \Closure $schemaClosure, array $options): ?ISchemaWrapper
    {
        // No schema changes – only data update.
        return null;
    }

    public function postSchemaChange(IOutput $output, \Closure $schemaClosure, array $options): void
    {
        $this->output = $output;
        $this->log('Updating inquiries.access: moderate → private');

        try {
            $qb = $this->connection->getQueryBuilder();
            $qb->update('agora_inquiries')
                ->set('access', $qb->createNamedParameter('private'))
                ->where($qb->expr()->eq('access', $qb->createNamedParameter('moderate')));

            $affected = $qb->executeStatement();

            $this->log("Updated {$affected} row(s)");
        } catch (\Throwable $e) {
            $this->log('Error during update: ' . $e->getMessage());
            throw $e;
        }
    }

    private function log(string $message): void
    {
        if ($this->output !== null) {
            $this->output->info('Agora 1.7.13 - ' . $message);
        }
    }
}
