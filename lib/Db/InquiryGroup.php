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
 * @method    int getCreated()
 * @method    void setCreated(int $value)
 * @method    int getDeleted()
 * @method    void setDeleted(int $value)
 * @method    ?string getDescription()
 * @method    void setDescription(?string $value)
 * @method    string getOwner()
 * @method    void setOwner(string $value)
 * @method    string getTitle()
 * @method    void setTitle(string $value)
 * @method    ?string getTitleExt()
 * @method    void setTitleExt(?string $value)
 */

class InquiryGroup extends EntityWithUser implements JsonSerializable
{
    public const TABLE = 'agora_groups';
    public const RELATION_TABLE = 'agora_groups_inquiries';
    public const CONCAT_SEPARATOR = ',';
    public const PERMISSION_INQUIRY_GROUP_EDIT = 'inquiry_group_edit';

    protected UserSession $userSession;

    // schema columns
    public $id = null;
    protected int $created = 0;
    protected int $deleted = 0;
    protected string $title = '';
    protected string $owner = '';
    protected ?string $description = '';
    protected ?string $titleExt = '';
    // joined inquiries
    protected ?string $inquiryIds = '';

    public function __construct()
    {
        $this->addType('created', 'integer');
        $this->addType('deleted', 'integer');

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

    // alias of setOwner($value)
    public function setUserId(string $userId): void
    {
        $this->setOwner($userId);
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
        'created' => $this->getCreated(),
        'deleted' => $this->getDeleted(),
        'description' => $this->getDescription(),
        'owner' => $this->getUser(),
        'name' => $this->getName(),
        'title' => $this->getTitle(),
        'titleExt' => $this->getTitleExt(),
        'inquiryIds' => $this->getInquiryIds(),
        'slug' => $this->getSlug(),
        'allowEdit' => $this->getAllowEdit(),
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
