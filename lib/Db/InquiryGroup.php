<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use JsonSerializable;
use OCA\Agora\Exceptions\ForbiddenException;
use OCA\Agora\Helper\Container;
use OCA\Agora\UserSession;

/**
 * @psalm-api
 * @method    int getId()
 * @method    void setId(int $value)
 * @method    int getParentId()
 * @method    void setParentId(int $value)
 * @method    int getCreated()
 * @method    void setCreated(int $value)
 * @method    int getDeleted()
 * @method    void setDeleted(int $value)
 * @method    ?string getDescription()
 * @method    void setDescription(?string $value)
 * @method    string getGroupStatus()
 * @method    void setAccess(string $value)
 * @method    string getAccess()
 * @method    void setGroupStatus(string $value)
 * @method    string getType()
 * @method    void setType(string $value)
 * @method    string getOwner()
 * @method    void setOwner(string $value)
 * @method    string getTitle()
 * @method    void setTitle(string $value)
 * @method    ?string getTitleExt()
 * @method    void setTitleExt(?string $value)
 * @method    ?string getOwnedGroup()
 * @method    void setOwnedGroup(?string $value)
 * @method    int getOrder()
 * @method    void setOrder(int $value)
 * @method    ?int getExpire()
 * @method    void setExpire(?int $value)
 * @method    ?string getMetadata()
 * @method    void setMetadata(?string $value)
 * @method    ?int getCoverId()
 * @method    void setCoverId(?int $value)
 * @method    bool getProtected()
 * @method    void setProtected(bool $value)
 * @method    bool getAllowEdit()
 * @method    void setAllowEdit(bool $value)
 */

class InquiryGroup extends EntityWithUser implements JsonSerializable
{
    public const TABLE = 'agora_inq_group';
    public const RELATION_TABLE = 'agora_groups_inquiries';
    public const CONCAT_SEPARATOR = ',';
    public const PERMISSION_INQUIRY_GROUP_EDIT = 'inquiry_group_edit';

    protected UserSession $userSession;

    // schema columns
    public $id = null;
    public $parentId = null;
    protected int $created = 0;
    protected int $deleted = 0;
    protected string $title = '';
    protected string $owner = '';
    protected string $type = 'default';
    protected string $groupStatus = 'draft';
    protected ?string $description = null;
    protected ?string $titleExt = null;
    protected ?string $ownedGroup = null;
    protected int $order = 0;
    protected ?int $expire = null;
    protected ?string $metadata = null;
    protected ?int $coverId = null;
    protected ?bool $protected = false;
    protected ?bool $allowEdit = false;
    // joined inquiries
    protected ?string $inquiryIds = '';
    protected array $miscFields = [];
    protected array $childs = [];
    protected ?string $miscGroupSettingsConcat = '';

    public function __construct()
    {
        $this->addType('title', 'string');
        $this->addType('titleExt', 'string');
        $this->addType('description', 'string');
        $this->addType('owner', 'string');
        $this->addType('type', 'string');
        $this->addType('parentId', 'integer');
        $this->addType('protected', 'integer');
        $this->addType('groupStatus', 'string');
        $this->addType('ownedGroup', 'string');
        $this->addType('created', 'integer');
        $this->addType('deleted', 'integer');
        $this->addType('expire', 'integer');
        $this->addType('allowEdit', 'integer');
        $this->addType('inquiryIds', 'string');
        $this->addType('miscFields', 'json');
        $this->addType('childs', 'json');
        $this->addType('miscGroupSettingsConcat', 'string');


        $this->userSession = Container::queryClass(UserSession::class);
    }

    /**
     * @return int[]
     *
     * @psalm-return list<int>
     */
    public function getInquiryIds(): array
    {
        if (!$this->inquiryIds) {
            return [];
        }
        return array_map('intval', explode(self::CONCAT_SEPARATOR, $this->inquiryIds));
    }

    public function getName(): string
    {
        return $this->getTitle();
    }

    public function setName(string $name): void
    {
        $this->setTitle($name);
    }

    public function setInquiryIds(array $inquiryIds): void
    {
        $this->inquiryIds = implode(self::CONCAT_SEPARATOR, $inquiryIds);
    }

    public function hasInquiry(int $inquiryId): bool
    {
        $inquiries = $this->getInquiryIds();
        return in_array($inquiryId, $inquiries, true);
    }

    public function getSlug(): string
    {
        // sanitize the title to remove any unwanted characters
        $slug = preg_replace('/[^a-zA-Z0-9\s]/', '', $this->getName());
        // in case the title is empty, use a default slug
        if ($slug === '') {
            $slug = 'group';
        }
        return strtolower(str_replace(' ', '-', $slug)) . '-' . $this->getId();
    }

    // alias of getOwner()
    public function getUserId(): string
    {
        return $this->getOwner();
    }

    public function getMiscArray(): array
    {
        $prefixedMiscFields = [];
        foreach ($this->miscFields as $key => $value) {
            $prefixedMiscFields["$key"] = $value;
        }
        return $prefixedMiscFields;
    }

    // alias of setOwner($value)
    public function setUserId(string $userId): void
    {
        $this->setOwner($userId);
    }

    public function setMiscField(string $key, mixed $value): void
    {
        $this->miscFields[$key] = $value;
    }




    public function setMiscFields(array $misc): void
    {
        foreach ($misc as $field) {
            $key = $field->getKey();
            $this->miscFields[$key] = $field->getValue() ?? null;
        }
    }

    public function initializeMiscFields(array $fieldsDefinition): void
    {
        foreach ($fieldsDefinition as $field) {
            $key = $field['key'];
            $this->miscFields[$key] = $field['default'] ?? null;
        }
    }

    public function getMiscField(string $key): mixed
    {
        return $this->miscFields[$key] ?? null;
    }

    public function getMiscFields(): mixed
    {
        return $this->miscFields ?? null;
    }


    /**
     * @return array
     *
     * @psalm-suppress PossiblyUnusedMethod
     */
    public function jsonSerialize(): array
    {
        return [
            'id' => $this->getId(),
            'parentId' => $this->getParentId(),
            'created' => $this->getCreated(),
            'deleted' => $this->getDeleted(),
            'description' => $this->getDescription(),
            'owner' => $this->getOwner(),
            'type' => $this->getType(),
            'groupStatus' => $this->getGroupStatus(),
            'title' => $this->getTitle(),
            'titleExt' => $this->getTitleExt(),
            'ownedGroup' => $this->getOwnedGroup(),
            'order' => $this->getOrder(),
            'expire' => $this->getExpire(),
            'metadata' => $this->getMetadata(),
            'coverId' => $this->getCoverId(),
            'protected' => $this->getProtected(),
            'allowEdit' => $this->getAllowEdit(),
            'inquiryIds' => $this->getInquiryIds(),
            'childs' => $this->getChilds(),
            'childs' => $this->getChilds(),
            'slug' => $this->getSlug(),
            'miscFields' => $this->getMiscArray(),
        ];
    }

    private function getAllowEdit(): bool
    {
        return $this->getUserId() === $this->userSession->getCurrentUser()->getId();
    }

    /**
     * Check particular rights and inform via boolean value, if the right is granted or denied
     */
    public function getIsAllowed(string $permission): bool
    {
        return match ($permission) {
            self::PERMISSION_INQUIRY_GROUP_EDIT => $this->getAllowEdit(),
            default => false,
        };
    }

    /**
     * Request a permission level and get exception if denied
     *
     * @throws ForbiddenException Thrown if access is denied
     */
    public function request(string $permission): bool
    {
        if (!$this->getIsAllowed($permission)) {
            throw new ForbiddenException('denied permission ' . $permission);
        }
        return true;
    }
}
