<?php
declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Agora\Service;

use OCA\Agora\Db\LocationMapper;
use OCA\Agora\Db\Location;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;

class LocationService
{

    public function __construct(
        private LocationMapper $locationMapper
    ) {
    }

    /**
     * @return Location[]
     */
    public function findAll(): array
    {
        return $this->locationMapper->findAll();
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function find(int $id): Location
    {
        return $this->locationMapper->find($id);
    }

    public function create(string $name, ?int $parentId = null): Location
    {
        $location = new Location();
        $location->setName($name);
        $location->setParentId($parentId);
        
        return $this->locationMapper->insert($location);
    }

    public function update(int $id, string $name, ?int $parentId = null): Location
    {
        $location = $this->locationMapper->find($id);
        $location->setName($name);
        $location->setParentId($parentId);
        
        return $this->locationMapper->update($location);
    }

    public function delete(int $id): void
    {
        $location = $this->locationMapper->find($id);
        $this->locationMapper->delete($location);
        
        $this->deleteChildren($id);
    }

    private function deleteChildren(int $parentId): void
    {
        $children = $this->locationMapper->findByParentId($parentId);
        foreach ($children as $child) {
            $this->delete($child->getId());
        }
    }

    /**
     * @return Location[]
     */
    public function findByParentId(?int $parentId): array
    {
        return $this->locationMapper->findByParentId($parentId);
    }
}
