<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use OCA\Agora\UserSession;
use OCA\Agora\Helper\SqlHelper;
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

    public function __construct(
        IDBConnection $db,
        private UserSession $userSession,
    ) {
        parent::__construct($db, Inquiry::TABLE, Inquiry::class);
    }

    public function get(int $id, bool $getDeleted = false, bool $withRoles = false): Inquiry
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select(self::TABLE . '.*')
            ->from($this->getTableName(), self::TABLE)
            ->where($qb->expr()->eq(self::TABLE . '.id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));

        if (!$getDeleted) {
            $qb->andWhere($qb->expr()->eq(self::TABLE . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));
        }

        if ($withRoles) {
            $inquiryGroupsAlias = 'inquiry_groups';
            $currentUserId = $this->userSession->getCurrentUserId();
        
            $this->joinUserRole($qb, self::TABLE, $currentUserId);
            $this->joinGroupShares($qb, self::TABLE);
            $this->joinHasSupported($qb, self::TABLE, $currentUserId);
            $this->joinInquiryGroups($qb, self::TABLE, $inquiryGroupsAlias);
            $this->joinInquiryGroupShares($qb, $inquiryGroupsAlias, $currentUserId, $inquiryGroupsAlias);
            $this->joinSupportValue($qb, self::TABLE, $currentUserId);
            $this->joinParticipantsCount($qb, self::TABLE);
            $this->joinSupportsCount($qb, self::TABLE);
            $this->joinNegativeSupportsCount($qb, self::TABLE);
            $this->joinPositiveSupportsCount($qb, self::TABLE);
            $this->joinNeutralSupportsCount($qb, self::TABLE);
            $this->joinCommentsCount($qb, self::TABLE);
            $this->joinMiscs($qb, self::TABLE);
        }
        return $this->findEntity($qb);
    }

    public function getChildInquiryIds(int $parentId): array
    {
        $currentUserId = $this->userSession->getCurrentUserId();
        $qb = $this->db->getQueryBuilder();
        $qb->select(self::TABLE . '.id')
           ->from($this->getTableName(), self::TABLE)
           ->where($qb->expr()->eq(self::TABLE . '.parent_id', $qb->createNamedParameter($parentId, IQueryBuilder::PARAM_INT)));

        $qb->andWhere($qb->expr()->neq(self::TABLE . '.access', $qb->createNamedParameter('private')));

        if ($currentUserId !== null) {
            $qb->andWhere($qb->expr()->neq(self::TABLE . '.owner', $qb->createNamedParameter($currentUserId)));
        }

        $stmt = $qb->executeQuery();
        $rows = $stmt->fetchAll();
        $stmt->closeCursor();

        if (empty($rows)) {
            return [];
        }

        return array_map(static fn(array $row): int => (int)$row['id'], $rows);
    }

    public function find(int $id): Inquiry
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));

        $inquiry = $this->findEntity($qb);

        return $inquiry;
    }

    public function findAutoReminderInquiries(): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
           ->from($this->getTableName())
           ->where($qb->expr()->eq('deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));

        $inquiries = $this->findEntities($qb);

        // Load dynamic fields for all inquiries
        foreach ($inquiries as $inquiry) {
            $this->loadDynamicFields($inquiry);
        }

        return $inquiries;
    }

    public function findForMe(string $userId): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)))
           ->orWhere($qb->expr()->eq(self::TABLE . '.owner', $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR)));

        $inquiries = $this->findEntities($qb);

        // Load dynamic fields for all inquiries
        foreach ($inquiries as $inquiry) {
            $this->loadDynamicFields($inquiry);
        }

        return $inquiries;
    }

    public function listByOwner(string $userId): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->eq(self::TABLE . '.owner', $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR)));

        $inquiries = $this->findEntities($qb);

        // Load dynamic fields for all inquiries
        foreach ($inquiries as $inquiry) {
            $this->loadDynamicFields($inquiry);
        }

        return $inquiries;
    }

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

        $inquiries = $this->findEntities($qb);

        // Load dynamic fields for all inquiries
        foreach ($inquiries as $inquiry) {
            $this->loadDynamicFields($inquiry);
        }

        return $inquiries;
    }

    public function findForAdmin(string $userId): array
    {
        $qb = $this->buildQuery();
        $qb->where($qb->expr()->neq(self::TABLE . '.owner', $qb->createNamedParameter($userId, IQueryBuilder::PARAM_STR)));

        $inquiries = $this->findEntities($qb);

        // Load dynamic fields for all inquiries
        foreach ($inquiries as $inquiry) {
            $this->loadDynamicFields($inquiry);
        }

        return $inquiries;
    }

    public function archiveExpiredInquiries(int $offset): int
    {
        $archiveDate = time();
        $qb = $this->db->getQueryBuilder();
        $qb->update($this->getTableName())
           ->set('archived', $qb->createNamedParameter($archiveDate))
           ->where($qb->expr()->lt('expire', $qb->createNamedParameter($offset)))
           ->andWhere($qb->expr()->gt('expire', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)))
           ->andWhere($qb->expr()->eq('archived', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));
        return $qb->executeStatement();
    }

    public function setInquiryStatus(int $inquiryId, string $mstatus): void
    {
        $qb = $this->db->getQueryBuilder();
        $qb->update($this->getTableName())
           ->set('inquiry_status', $qb->createNamedParameter($mstatus))
           ->where($qb->expr()->eq('id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));
        $qb->executeStatement();
    }

    public function setModerationStatus(int $inquiryId, string $mstatus): void
    {
        $qb = $this->db->getQueryBuilder();
        $qb->update($this->getTableName())
           ->set('moderation_status', $qb->createNamedParameter($mstatus))
           ->where($qb->expr()->eq('id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));
        $qb->executeStatement();
    }

    public function deleteArchivedInquiries(int $offset): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
           ->where($qb->expr()->lt('archived', $qb->createNamedParameter($offset)))
           ->andWhere($qb->expr()->gt('archived', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)));
        return $qb->executeStatement();
    }

    public function setLastInteraction(int $inquiryId): void
    {
        $timestamp = time();
        $qb = $this->db->getQueryBuilder();
        $qb->update($this->getTableName())
           ->set('last_interaction', $qb->createNamedParameter($timestamp, IQueryBuilder::PARAM_INT))
           ->where($qb->expr()->eq('id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));
        $qb->executeStatement();
    }

    public function deleteByUserId(string $userId): void
    {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
           ->where('owner = :userId')
           ->setParameter('userId', $userId);
        $qb->executeStatement();
    }

    protected function buildQuery(): IQueryBuilder
    {
        $qb = $this->db->getQueryBuilder();

        $qb->select(self::TABLE . '.*')
           ->from($this->getTableName(), self::TABLE);

        $currentUserId = $this->userSession->getCurrentUserId();
        $inquiryGroupsAlias = 'inquiry_groups';
        $this->joinUserRole($qb, self::TABLE, $currentUserId);
        $this->joinGroupShares($qb, self::TABLE);
        $this->joinHasSupported($qb, self::TABLE, $currentUserId);
        $this->joinSupportValue($qb, self::TABLE, $currentUserId);
        $this->joinInquiryGroups($qb, self::TABLE, $inquiryGroupsAlias);
        $this->joinInquiryGroupShares($qb, $inquiryGroupsAlias, $currentUserId, $inquiryGroupsAlias);
        $this->joinParticipantsCount($qb, self::TABLE);
        $this->joinSupportsCount($qb, self::TABLE);
        $this->joinNegativeSupportsCount($qb, self::TABLE);
        $this->joinPositiveSupportsCount($qb, self::TABLE);
        $this->joinNeutralSupportsCount($qb, self::TABLE);
        $this->joinCommentsCount($qb, self::TABLE);
        $this->joinMiscs($qb, self::TABLE);

	return $qb;
    }

protected function joinSupportValue(
    IQueryBuilder &$qb,
    string $fromAlias,
    ?string $currentUserId,
    string $joinAlias = 'current_user_support_value'
): void {
    if ($currentUserId === null) {
        $qb->addSelect($qb->createFunction('NULL AS support_value'));
        return;
    }

    $qb->leftJoin(
        $fromAlias,
        Support::TABLE,
        $joinAlias,
        $qb->expr()->andX(
            $qb->expr()->eq($joinAlias . '.inquiry_id', $fromAlias . '.id'),
            $qb->expr()->eq($joinAlias . '.user_id', $qb->createNamedParameter($currentUserId, IQueryBuilder::PARAM_STR))
        )
    );

    $dbProvider = $this->db->getDatabaseProvider();
    
    if ($dbProvider === IDBConnection::PLATFORM_POSTGRES) {
        // For PostgreSQL, use MAX() to make it an aggregate function
        $qb->addSelect($qb->createFunction('MAX(' . $joinAlias . '.value) AS support_value'));
    } else {
        // For MySQL, keep as is
        $qb->addSelect($qb->createFunction($joinAlias . '.value AS support_value'));
    }
}

    /**
     * Join misc settings from InquiryMisc table
     */
    protected function joinMiscs(
	    IQueryBuilder &$qb,
	    string $fromAlias,
	    string $joinAlias = 'inquiry_misc_settings'
    ): void {
	    $dbProvider = $this->db->getDatabaseProvider();

	    // Build the concatenation expression based on database type
	    if ($dbProvider === IDBConnection::PLATFORM_POSTGRES) {
		    // PostgreSQL uses || for concatenation
		    $concatExpr = $joinAlias . '.key || \':\' || ' . $joinAlias . '.value';
	    } else {
		    // MySQL uses CONCAT()
		    $concatExpr = 'CONCAT(' . $joinAlias . '.key, \':\', ' . $joinAlias . '.value)';
	    }

	    SqlHelper::getConcatenatedArray(
		    qb: $qb,
		    concatColumn: $concatExpr,
		    asColumn: 'misc_settings_concat',
		    dbProvider: $dbProvider,
		    separator: ','
	    );

	    $qb->leftJoin(
		    $fromAlias,
		    InquiryMisc::TABLE,
		    $joinAlias,
		    $qb->expr()->andX(
			    $qb->expr()->eq($joinAlias . '.inquiry_id', $fromAlias . '.id'),
		    )
	    );
    }

    private function loadDynamicFields(Inquiry $inquiry): void
    {
	    $inquiryId = $inquiry->getId();

	    $qb = $this->db->getQueryBuilder();
	    $qb->select('*')
	->from(InquiryMisc::TABLE)
	->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)));

	    $stmt = $qb->executeQuery();
	    $storedData = $stmt->fetchAll();
	    $stmt->closeCursor();

	    $miscFields = [];

	    foreach ($storedData as $data) {
		    if (is_array($data) && isset($data['key'], $data['value'])) {
			    $key = (string) $data['key'];
			    $value = $data['value']; 

			    $miscFields[$key] = $value;

			    $inquiry->setMiscField($key, $value);
		    }
	    }

    }

    /**
     * Convert a value to the type defined in fields
     */
    private function castValueByType($value, array $fieldDef)
    {
	    $type = $fieldDef['type'] ?? 'string';

	    // Si la valeur est null, retourner null
	    if ($value === null) {
		    return null;
	    }

	    switch ($type) {
	    case 'integer':
	    case 'int':
		    return (int)$value;

	    case 'boolean':
	    case 'bool':
		    return (bool)$value;

	    case 'float':
	    case 'double':
		    return (float)$value;

	    case 'datetime':
		    return is_numeric($value) ? (int)$value : $value;

	    case 'json':
		    if (is_array($value) || is_object($value)) {
			    return json_encode($value);
		    }
		    // Si c'est déjà du JSON, le garder tel quel
		    return $value;

	    case 'enum':
		    $allowed = $fieldDef['allowed_values'] ?? [];
		    if (in_array($value, $allowed, true)) {
			    return $value;
		    }
		    return $fieldDef['default'] ?? null;

	    case 'string':
	    default:
	    return (string)$value;
	    }
    }

    /**
     * Save dynamic fields to InquiryMisc and update miscFields in Inquiry
     */
    public function saveDynamicFields(Inquiry $inquiry, array $fieldsDefinition): void
    {
	    $inquiryId = $inquiry->getId();
	    if (empty($fieldsDefinition)) {
		    return;
	    }

	    $qb = $this->db->getQueryBuilder();

	    $qb->delete(InquiryMisc::TABLE)
	->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)))
	->executeStatement();

	    foreach ($fieldsDefinition as $fieldDef) {
		    $key = $fieldDef['key'];
		    $value = $this->castValueByType($fieldDef['default'] ?? null, $fieldDef);

		    $qb->insert(InquiryMisc::TABLE)
	 ->values(
		 [
			 'inquiry_id' => $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT),
			 'key'        => $qb->createNamedParameter($key, IQueryBuilder::PARAM_STR),
			 'value'      => $qb->createNamedParameter((string)$value, IQueryBuilder::PARAM_STR),
		 ]
	 )
	 ->executeStatement();

		    $inquiry->setMiscField($key, $value);
	    }
    }

    /**
     * Update only specified dynamic fields in InquiryMisc and miscFields
     */
    public function updateDynamicFields(Inquiry $inquiry, array $fieldsToUpdate, array $fieldsDefinition): void
    {
	    $inquiryId = $inquiry->getId();
	    if (empty($fieldsToUpdate)) {
		    return;
	    }

	    $qb = $this->db->getQueryBuilder();

	    foreach ($fieldsToUpdate as $key => $value) {
		    $key = (string)$key;

		    $fieldDef = array_filter($fieldsDefinition, fn($f) => $f['key'] === $key);
		    $fieldDef = array_shift($fieldDef) ?: ['type'=>'string', 'default'=>null];

		    $value = $this->castValueByType($value ?? $fieldDef['default'], $fieldDef);

		    $existing = $qb->select('id')
		     ->from(InquiryMisc::TABLE)
		     ->where($qb->expr()->eq('inquiry_id', $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT)))
		     ->andWhere($qb->expr()->eq('key', $qb->createNamedParameter($key, IQueryBuilder::PARAM_STR)))
		     ->executeQuery()
		     ->fetchOne();

		    if ($existing) {
			    $qb->update(InquiryMisc::TABLE)
	  ->set('value', $qb->createNamedParameter((string)$value, IQueryBuilder::PARAM_STR))
	  ->where($qb->expr()->eq('id', $qb->createNamedParameter($existing, IQueryBuilder::PARAM_INT)))
	  ->executeStatement();
		    } else {
			    $qb->insert(InquiryMisc::TABLE)
	  ->values(
		  [
			  'inquiry_id' => $qb->createNamedParameter($inquiryId, IQueryBuilder::PARAM_INT),
			  'key'        => $qb->createNamedParameter($key, IQueryBuilder::PARAM_STR),
			  'value'      => $qb->createNamedParameter((string)$value, IQueryBuilder::PARAM_STR),
		  ]
	  )
	  ->executeStatement();
		    }

		    $inquiry->setMiscField($key, $value);
	    }
    }

protected function joinUserRole(
    IQueryBuilder &$qb,
    string $fromAlias,
    string $currentUserId,
    string $joinAlias = 'user_shares',
): void {
    $dbProvider = $this->db->getDatabaseProvider();
    
    if ($dbProvider === IDBConnection::PLATFORM_POSTGRES) {
        // For PostgreSQL, use MAX() to make it an aggregate function
        $qb->addSelect($qb->createFunction('MAX(coalesce(' . $joinAlias . '.type, \'\')) AS user_role'));
        $qb->addSelect($qb->createFunction('MAX(coalesce(' . $joinAlias . '.token, \'\')) AS share_token'));
    } else {
        // For MySQL, keep as is
        $emptyString = $qb->expr()->literal('');
        $qb->addSelect($qb->createFunction('coalesce(' . $joinAlias . '.type, ' . $emptyString . ') AS user_role'));
        $qb->addSelect($qb->createFunction('coalesce(' . $joinAlias . '.token, ' . $emptyString . ') AS share_token'));
    }

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

  protected function joinHasSupported(
    IQueryBuilder &$qb,
    string $fromAlias,
    string $currentUserId,
    string $joinAlias = 'current_user_support'
): void {
    if ($currentUserId === null) {
        $qb->addSelect($qb->createFunction('0 AS has_supported'));
        return;
    }

    $qb->leftJoin(
        $fromAlias,
        Support::TABLE,
        $joinAlias,
        $qb->expr()->andX(
            $qb->expr()->eq($joinAlias . '.inquiry_id', $fromAlias . '.id'),
            $qb->expr()->eq($joinAlias . '.user_id', $qb->createNamedParameter($currentUserId, IQueryBuilder::PARAM_STR))
        )
    );

    $dbProvider = $this->db->getDatabaseProvider();
    
    if ($dbProvider === IDBConnection::PLATFORM_POSTGRES) {
        // For PostgreSQL, use MAX() to make CASE an aggregate function
        $qb->addSelect(
            $qb->createFunction('MAX(CASE WHEN ' . $joinAlias . '.user_id IS NOT NULL THEN 1 ELSE 0 END) AS has_supported')
        );
    } else {
        // For MySQL, keep as is
        $qb->addSelect(
            $qb->createFunction('CASE WHEN ' . $joinAlias . '.user_id IS NOT NULL THEN 1 ELSE 0 END AS has_supported')
        );
    }
}

    protected function joinGroupShares(
	    IQueryBuilder &$qb,
	    string $fromAlias,
	    string $joinAlias = 'group_shares',
    ): void {
	    $dbProvider = $this->db->getDatabaseProvider();

	    SqlHelper::getConcatenatedArray(
		    qb: $qb,
		    concatColumn: $joinAlias . '.user_id',
		    asColumn: 'group_shares',
		    dbProvider: $dbProvider,
		    separator: ','
	    );

	    $qb->leftJoin(
		    $fromAlias,
		    Share::TABLE,
		    $joinAlias,
		    $qb->expr()->andX(
			    $qb->expr()->eq($joinAlias . '.inquiry_id', $fromAlias . '.id'),
			    $qb->expr()->eq($joinAlias . '.type', $qb->expr()->literal('group')),
			    $qb->expr()->eq($joinAlias . '.deleted', $qb->expr()->literal(0, IQueryBuilder::PARAM_INT)),
		    )
	    );
    }
    protected function joinInquiryGroups(
	    IQueryBuilder $qb,
	    string $fromAlias,
	    string $joinAlias = 'inquiry_groups',
    ): void {
	    $dbProvider = $this->db->getDatabaseProvider();

	    SqlHelper::getConcatenatedArray(
		    qb: $qb,
		    concatColumn: $joinAlias . '.group_id',
		    asColumn: 'inquiry_groups',
		    dbProvider: $dbProvider,
		    separator: ','
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
    protected function joinInquiryGroupShares(
	    IQueryBuilder $qb,
	    string $fromAlias,
	    string $currentUserId,
	    string $inquiryGroupsAlias,
	    string $joinAlias = 'inquiry_group_shares',
    ): void {
	    $dbProvider = $this->db->getDatabaseProvider();

	    SqlHelper::getConcatenatedArray(
		    qb: $qb,
		    concatColumn: $joinAlias . '.type',
		    asColumn: 'inquiry_group_user_shares',
		    dbProvider: $dbProvider,
		    separator: ','
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



protected function joinSupportsCount(
    IQueryBuilder &$qb,
    string $fromAlias,
    string $joinAlias = 'supports',
): void {
    $qb->leftJoin(
        $fromAlias,
        Support::TABLE,
        $joinAlias,
        $qb->expr()->andX(
            $qb->expr()->eq($joinAlias . '.inquiry_id', $fromAlias . '.id')
        )
    )
    ->addSelect(
        $qb->createFunction(
            'COUNT(DISTINCT CASE WHEN ' . $joinAlias . '.option_id = 0 THEN ' . $joinAlias . '.user_id ELSE NULL END) AS count_supports'
        )
    )
    ->groupBy($fromAlias . '.id');
}

// Comments of the inquiry
protected function joinCommentsCount(
	IQueryBuilder $qb,
	string $fromAlias,
	string $joinAlias = 'comments',
): void {
	$qb->leftJoin(
		$fromAlias,
		Comment::TABLE,
		$joinAlias,
		$qb->expr()->andX(
			$qb->expr()->eq($joinAlias . '.inquiry_id', $fromAlias . '.id'),
			$qb->expr()->eq($joinAlias . '.option_id', $qb->createNamedParameter(0)),
			$qb->expr()->eq($joinAlias . '.deleted', $qb->createNamedParameter(0))
		)
	);

	$qb->addSelect(
		$qb->createFunction(
			'COUNT(DISTINCT ' . $joinAlias . '.id) AS count_comments'
		)
	);
}

protected function joinNegativeSupportsCount(
	IQueryBuilder $qb,
	string $fromAlias,
	string $joinAlias = 'supports_negative',
): void {
	$qb->leftJoin(
		$fromAlias,
		Support::TABLE,
		$joinAlias,
		$qb->expr()->andX(
			$qb->expr()->eq($joinAlias . '.inquiry_id', $fromAlias . '.id'),
            $qb->expr()->eq($joinAlias . '.value', $qb->createNamedParameter(-1)),
            $qb->expr()->eq($joinAlias . '.option_id', $qb->createNamedParameter(0))
		)
	);

	$qb->addSelect(
		$qb->createFunction(
			'COUNT(DISTINCT ' . $joinAlias . '.user_id) AS count_negative_supports'
		)
	);
}


protected function joinPositiveSupportsCount(
	IQueryBuilder $qb,
	string $fromAlias,
	string $joinAlias = 'supports_positive',
): void {
	$qb->leftJoin(
		$fromAlias,
		Support::TABLE,
		$joinAlias,
		$qb->expr()->andX(
			$qb->expr()->eq($joinAlias . '.inquiry_id', $fromAlias . '.id'),
            $qb->expr()->eq($joinAlias . '.value', $qb->createNamedParameter(1)),
            $qb->expr()->eq($joinAlias . '.option_id', $qb->createNamedParameter(0))
		)
	);

	$qb->addSelect(
		$qb->createFunction(
			'COUNT(DISTINCT ' . $joinAlias . '.user_id) AS count_positive_supports'
		)
	);
}

protected function joinNeutralSupportsCount(
	IQueryBuilder $qb,
	string $fromAlias,
	string $joinAlias = 'supports_neutral',
): void {
	$qb->leftJoin(
		$fromAlias,
		Support::TABLE,
		$joinAlias,
		$qb->expr()->andX(
			$qb->expr()->eq($joinAlias . '.inquiry_id', $fromAlias . '.id'),
            $qb->expr()->eq($joinAlias . '.value', $qb->createNamedParameter(0)),
            $qb->expr()->eq($joinAlias . '.option_id', $qb->createNamedParameter(0))
		)
	);

	$qb->addSelect(
		$qb->createFunction(
			'COUNT(DISTINCT ' . $joinAlias . '.user_id) AS count_neutral_supports'
		)
	);
}

protected function joinParticipantsCount(
	    IQueryBuilder &$qb,
	    string $fromAlias,
	    string $joinAlias = 'participants',
    ): void {
	    $qb->leftJoin(
		    $fromAlias,
		    Inquiry::TABLE,
		    $joinAlias,
		    $qb->expr()->andX(
			    $qb->expr()->eq($joinAlias . '.parent_id', $fromAlias . '.id'),
			    $qb->expr()->orX(
				    $qb->expr()->eq($joinAlias . '.access', $qb->createNamedParameter('open')),
				    $qb->expr()->eq($joinAlias . '.access', $qb->createNamedParameter('moderate'))
			    )
		    )
	    );
	    $qb->addSelect($qb->createFunction('COUNT(DISTINCT(' . $joinAlias . '.id)) AS count_participants'));
    }
}
