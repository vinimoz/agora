<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use OCA\Agora\UserSession;
use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;
use OCP\Search\ISearchQuery;

/**
 * @template-extends QBMapper<Inquiry>
 */
class InquiryMapper extends QBMapper
{
    public const TABLE = Inquiry::TABLE;
    public const CONCAT_SEPARATOR = ',';

    /**
     * @psalm-suppress PossiblyUnusedMethod 
     */
    public function __construct(
        IDBConnection $db,
        private UserSession $userSession,
    ) {
        parent::__construct($db, Inquiry::TABLE, Inquiry::class);
    }

    /**
     * Get active inquiry without any joins for backend operations
     *
     * @throws \OCP\AppFramework\Db\DoesNotExistException if not found
     * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException if more than one result
     * @return Inquiry
     */
    public function get(int $id, bool $getDeleted = false, bool $withRoles = false): Inquiry
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select(self::TABLE . '.*')
            ->from($this->getTableName(), self::TABLE)
            ->where($qb->expr()->eq(self::TABLE . '.id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));
        //->groupBy(self::TABLE . '.id');


        if (!$getDeleted) {
            $qb->andWhere($qb->expr()->eq(self::TABLE . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));
        }

        if ($withRoles) {
            $inquiryGroupsAlias = 'inquiry_groups';
            $currentUserId = $this->userSession->getCurrentUserId();
            // $this->joinOptions($qb, self::TABLE);
            $this->joinUserRole($qb, self::TABLE, $currentUserId);
            $this->joinGroupShares($qb, self::TABLE);
            $this->joinInquiryGroups($qb, self::TABLE, $inquiryGroupsAlias);
            $this->joinInquiryGroupShares($qb, $inquiryGroupsAlias, $currentUserId, $inquiryGroupsAlias);
            $this->joinParticipantsCount($qb, self::TABLE);
        }
        return $this->findEntity($qb);
    }

    /**
     * Get all child inquiry IDs for a given parent inquiry.
     *
     * @param  int $parentId
     * @return int[]|  Returns an array of IDs if children exist, or empty array if none.
     */
    /**
     */
    public function findChildrenWithCounts(int $parentId): array
    {
        $qb = $this->db->getQueryBuilder();

        $qb->select(
            [
            'i.id',
            'i.title',
            'i.type',
            'i.created',
            'i.last_interaction',
            'i.description',
            'i.owner',
            $qb->createFunction('COUNT(DISTINCT c.id) AS countComments'),
            $qb->createFunction('COUNT(DISTINCT s.id) AS countSupports')
            ]
        )
            ->from($this->getTableName(), 'i')
            ->leftJoin('i', Comment::TABLE, 'c', $qb->expr()->eq('c.inquiry_id', 'i.id'))
            ->leftJoin('i', Support::TABLE, 's', $qb->expr()->eq('s.inquiry_id', 'i.id'))
            ->where(
                $qb->expr()->andX(
                    $qb->expr()->eq('i.parent_id', $qb->createNamedParameter($parentId, IQueryBuilder::PARAM_INT)),
                    $qb->expr()->eq('i.access', $qb->createNamedParameter('open'))
                )
            )->groupBy(
                'i.id',
                'i.title',
                'i.type',
                'i.created',
                'i.last_interaction',
                'i.description',
                'i.owner'
            );

        $result = $qb->execute();
        $inquiries = $result->fetchAll();
        $result->closeCursor();

        return array_map(
            function (array $row) {
                return [
                'id' => (int)$row['id'],
                'title' => (string)$row['title'],
                'type' => (string)$row['type'],
                'moderationStatus' => (string)$row['moderation_status'],
                'description' => (string)$row['description'],
                'configuration' => [
                'access' => (string)$row['access'],
                ],
                'owner' => [
                    'id' => (string)$row['owner'],
                    'displayName' => (string)$row['owner'], 
                 ],
                 'status' => [
                    'countComments' => (int)($row['countComments'] ?? 0),
                    'countSupports' => (int)($row['countSupports'] ?? 0),
                    'isExpired' => (bool)($row['expire'] ?? false),
                    'isArchived' => (bool)($row['archived'] ?? false),
                    'created' => (int)$row['created'],
                    'lastInteraction' => (int)$row['last_interaction'],
                 ],
                ];
            }, $inquiries
        );
    }    
    
    
    public function getChildInquiryIds(int $parentId)
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select(self::TABLE . '.id')
            ->from($this->getTableName(), self::TABLE)
            ->where($qb->expr()->eq(self::TABLE . '.parent_id', $qb->createNamedParameter($parentId, IQueryBuilder::PARAM_INT)));

        $stmt = $qb->executeQuery();
        $rows = $stmt->fetchAll(); // each row is ['id' => ...]
        $stmt->closeCursor();

        if (empty($rows)) {
            return [];
        }

        // Extract IDs
        return array_map(static fn(array $row): int => (int)$row['id'], $rows);
    }

    /**
     * Get inquiry with joins for operations with permissions and user informations
     *
     * @throws \OCP\AppFramework\Db\DoesNotExistException if not found
     * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException if more than one result
     * @return Inquiry
     */
    public function find(int $id): Inquiry
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));

        return $this->findEntity($qb);
    }

    /**
     * @throws \OCP\AppFramework\Db\DoesNotExistException if not found
     * @return Inquiry[]
     */
    public function findAutoReminderInquiries(): array
    {
        $autoReminderSearchString = '%"autoReminder":true%';
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->like('misc_settings', $qb->createNamedParameter($autoReminderSearchString, IQueryBuilder::PARAM_STR)))
            ->andwhere($qb->expr()->eq('deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));

        return $this->findEntities($qb);
    }

    /**
     * @throws \OCP\AppFramework\Db\DoesNotExistException if not found
     * @return Inquiry[]
     */
    public function findForMe(string $userId): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)))
            ->orWhere($qb->expr()->eq(self::TABLE . '.owner', $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR)));
        return $this->findEntities($qb);
    }

    /**
     * @throws \OCP\AppFramework\Db\DoesNotExistException if not found
     * @return Inquiry[]
     */
    public function listByOwner(string $userId): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.owner', $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR)));
        return $this->findEntities($qb);
    }

    /**
     * @throws \OCP\AppFramework\Db\DoesNotExistException if not found
     * @return Inquiry[]
     */
    public function search(ISearchQuery $query): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)))
            ->andWhere(
                $qb->expr()->orX(
                    ...array_map(
                        function (string $token) use ($qb) {
                            return $qb->expr()->orX(
                                $qb->expr()->iLike(
                                    self::TABLE . '.title',
                                    $qb->createNamedParameter('%' . $this->db->escapeLikeParameter($token) . '%', IQueryBuilder::PARAM_STR),
                                    IQueryBuilder::PARAM_STR
                                ),
                                $qb->expr()->iLike(
                                    self::TABLE . '.description',
                                    $qb->createNamedParameter('%' . $this->db->escapeLikeParameter($token) . '%', IQueryBuilder::PARAM_STR),
                                    IQueryBuilder::PARAM_STR
                                )
                            );
                        }, explode(' ', $query->getTerm())
                    )
                )
            );
        return $this->findEntities($qb);
    }

    /**
     * @throws \OCP\AppFramework\Db\DoesNotExistException if not found
     * @return Inquiry[]
     */
    public function findForAdmin(string $userId): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->neq(self::TABLE . '.owner', $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR)));

        return $this->findEntities($qb);
    }

    /**
     * Archive inquiries per timestamp
     */
    public function archiveExpiredInquiries(int $offset): int
    {
        $archiveDate = time();
        $qb = $this->db->getQueryBuilder();
        $qb->update($this->getTableName())
            ->set('deleted', $qb->createNamedParameter($archiveDate))
            ->where($qb->expr()->lt('expire', $qb->createNamedParameter($offset)))
            ->andWhere($qb->expr()->gt('expire', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));
        return $qb->executeStatement();
    }

    /**
     * Set moderation status for an inquiry
     */
    public function setModerationStatus(int $inquiryId, string $mstatus): void
    {
        $qb = $this->db->getQueryBuilder();
         $qb->update($this->getTableName())
             ->set('moderation_status', $qb->createNamedParameter($mstatus))
             ->where($qb->expr()->eq('id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));
         $qb->executeStatement();
    }


    /**
     * Delete inquiries per deletion timestamp
     */
    public function deleteArchivedInquiries(int $offset): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->lt('deleted', $qb->createNamedParameter($offset)))
            ->andWhere($qb->expr()->gt('deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));
        return $qb->executeStatement();
    }

    /**
     * Archive inquiries per timestamp
     */
    public function setLastInteraction(int $inquiryId): void
    {
        $timestamp = time();
        $qb = $this->db->getQueryBuilder();
        $qb->update($this->getTableName())
            ->set('last_interaction', $qb->createNamedParameter($timestamp, IQueryBuilder::PARAM_INT))
            ->where($qb->expr()->eq('id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));
        $qb->executeStatement();
    }

    /**
     * Delete inquiries of named owner
     */
    public function deleteByUserId(string $userId): void
    {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where('owner = :userId')
            ->setParameter('userId', $userId);
        $qb->executeStatement();
    }

    /**
     * Build the enhanced query with joined tables
     */
    protected function buildQuery(): IQueryBuilder
    {
        $qb = $this->db->getQueryBuilder();

        $qb->select(self::TABLE . '.*')
            ->from($this->getTableName(), self::TABLE);
        //->groupBy(self::TABLE . '.id');

        $currentUserId = $this->userSession->getCurrentUserId();
        $inquiryGroupsAlias = 'inquiry_groups';
        $this->joinOptions($qb, self::TABLE);
        $this->joinUserRole($qb, self::TABLE, $currentUserId);
        $this->joinGroupShares($qb, self::TABLE);
        $this->joinInquiryGroups($qb, self::TABLE, $inquiryGroupsAlias);
        $this->joinInquiryGroupShares($qb, $inquiryGroupsAlias, $currentUserId, $inquiryGroupsAlias);
        $this->joinParticipantsCount($qb, self::TABLE);
        $this->joinSupportsCount($qb, self::TABLE);
        $this->joinCommentsCount($qb, self::TABLE);
        return $qb;
    }

    /**
     * Joins shares to evaluate user role
     */
    protected function joinUserRole(
        IQueryBuilder &$qb,
        string $fromAlias,
        string $currentUserId,
        string $joinAlias = 'user_shares',
    ): void {

        $emptyString = $qb->expr()->literal('');

        $qb->addSelect($qb->createFunction('coalesce(' . $joinAlias . '.type, ' . $emptyString . ') AS user_role'))
            ->addGroupBy($joinAlias . '.type');

        $qb->selectAlias($joinAlias . '.locked', 'is_current_user_locked')
            ->addGroupBy($joinAlias . '.locked');

        $qb->addSelect($qb->createFunction('coalesce(' . $joinAlias . '.token, ' . $emptyString . ') AS share_token'))
            ->addGroupBy($joinAlias . '.token');

        $qb->leftJoin(
            $fromAlias,
            Share::TABLE,
            $joinAlias,
            $qb->expr()->andX(
                $qb->expr()->eq($joinAlias . '.inquiry_id', $fromAlias . '.id'),
                $qb->expr()->eq($joinAlias . '.user_id', $qb->createNamedParameter($currentUserId, IQueryBuilder::PARAM_STR)),
                $qb->expr()->eq($joinAlias . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)),
            )
        );

    }

    /**
     * Join group shares of this inquiry
     */
    protected function joinGroupShares(
        IQueryBuilder &$qb,
        string $fromAlias,
        string $joinAlias = 'group_shares',
    ): void {

        TableManager::getConcatenatedArray(
            qb: $qb,
            concatColumn: $joinAlias . '.user_id',
            asColumn: 'group_shares',
            dbProvider: $this->db->getDatabaseProvider(),
        );

        $qb->leftJoin(
            $fromAlias,
            Share::TABLE,
            $joinAlias,
            $qb->expr()->andX(
                $qb->expr()->eq($joinAlias . '.inquiry_id', $fromAlias . '.id'),
                $qb->expr()->eq($joinAlias . '.type', $qb->expr()->literal(Share::TYPE_GROUP)),
                $qb->expr()->eq($joinAlias . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)),
            )
        );
    }

    /**
     * Joins inquiry groups, the inquiry belongs to
     */
    protected function joinInquiryGroups(
        IQueryBuilder $qb,
        string $fromAlias,
        string $joinAlias = 'inquiry_groups',
    ): void {

        TableManager::getConcatenatedArray(
            qb: $qb,
            concatColumn: $joinAlias . '.group_id',
            asColumn: 'inquiry_groups',
            dbProvider: $this->db->getDatabaseProvider(),
        );

        $qb->leftJoin(
            $fromAlias,
            InquiryGroup::RELATION_TABLE,
            $joinAlias,
            $qb->expr()->andX(
                $qb->expr()->eq(self::TABLE . '.id', $joinAlias . '.inquiry_id'),
            )
        );
    }

    /**
     * Joins shares that are set for inquiry groups
     * Inquiry group shares are meant to inherit access
     * Higher access types will win. Currently inquiry groups are only availablke for
     * authenticated users.
     *
     * Supported share types are User and Admin
     * Groups, Teams will not work atm.
     */
    protected function joinInquiryGroupShares(
        IQueryBuilder $qb,
        string $fromAlias,
        string $currentUserId,
        string $inquiryGroupsAlias,
        string $joinAlias = 'inquiry_group_shares',
    ): void {

        TableManager::getConcatenatedArray(
            qb: $qb,
            concatColumn: $joinAlias . '.type',
            asColumn: 'inquiry_group_user_shares',
            dbProvider: $this->db->getDatabaseProvider(),
        );

        $qb->leftJoin(
            $fromAlias,
            Share::TABLE,
            $joinAlias,
            $qb->expr()->andX(
                $qb->expr()->eq($joinAlias . '.group_id', $inquiryGroupsAlias . '.group_id'),
                $qb->expr()->eq($joinAlias . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)),
                $qb->expr()->eq($joinAlias . '.user_id', $qb->createNamedParameter($currentUserId, IQueryBuilder::PARAM_STR)),
            )
        );
    }

    public function updateFormId(int $inquiryId, int $formId): void
    {
        $stmt = $this->db->prepare('UPDATE', Inquiry::Table, ' SET form_id = ? WHERE id = ?');
        $stmt->executeStatement([$formId, $inquiryId]);
    }

    /**
     * Joins options to evaluate min and max option date for date inquiries
     * if text inquiry or no options are set,
     * the min value is the current time,
     * the max value is null
     * and adds the number of available options
     */
    protected function joinOptions(
        IQueryBuilder &$qb,
        string $fromAlias,
        string $joinAlias = 'options',
    ): void {
        // add highest option date
        $qb->addSelect($qb->createFunction('MAX(' . $joinAlias . '.timestamp) AS max_date'));


        $qb->leftJoin(
            $fromAlias,
            Option::TABLE,
            $joinAlias,
            $qb->expr()->andX(
                $qb->expr()->eq($joinAlias . '.inquiry_id', $fromAlias . '.id'),
                $qb->expr()->eq($joinAlias . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)),
            ),
        );
    }
    
    /**
     * Join to count supports in inquiry
     */
    protected function joinSupportsCount(
        IQueryBuilder &$qb,
        string $fromAlias,
        string $joinAlias = 'supports',
    ): void {
        $qb->leftJoin(
            $fromAlias,
            Support::TABLE,
            $joinAlias,
            $qb->expr()->eq($joinAlias . '.inquiry_id', $fromAlias . '.id')
        )->addSelect($qb->createFunction('COUNT(DISTINCT(' . $joinAlias . '.user_id)) AS count_supports'));
                  $qb->groupBy($fromAlias . '.id');

    }

    /**
     * Join to count comments in inquiry
     */
    protected function joinCommentsCount(
        IQueryBuilder &$qb,
        string $fromAlias,
        string $joinAlias = 'comments',
    ): void {
        $qb->leftJoin(
            $fromAlias,
            Comment::TABLE,
            $joinAlias,
            $qb->expr()->eq($joinAlias . '.inquiry_id', $fromAlias . '.id')
        )->addSelect($qb->createFunction('COUNT(DISTINCT(' . $joinAlias . '.user_id)) AS count_comments'));
        $qb->groupBy($fromAlias . '.id');
    }
    
    /**
     * Join to count of participants in inquiry
     */
    protected function joinParticipantsCount(
        IQueryBuilder &$qb,
        string $fromAlias,
        string $joinAlias = 'participants',
    ): void {
        $qb->leftJoin(
            $fromAlias,
            Inquiry::TABLE, // table inquiry
            $joinAlias,
            $qb->expr()->andX(
                $qb->expr()->eq($joinAlias . '.parent_id', $fromAlias . '.id'),
                $qb->expr()->eq($joinAlias . '.access', $qb->createNamedParameter('open'))
            )
        );
        $qb->addSelect($qb->createFunction('COUNT(DISTINCT(' . $joinAlias . '.id)) AS count_participants'));
    }
}
