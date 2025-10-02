<?php
declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\CategoryMapper;
use OCA\Agora\Db\Category;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;
use Psr\Log\LoggerInterface;

class CategoryService
{

    public function __construct(
        private CategoryMapper $categoryMapper,
        private LoggerInterface $logger
    ) {
    }

    /**
     * @return Category[]
     */
    public function findAll(): array
    {
        return $this->categoryMapper->findAll();
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function find(int $id): Category
    {
        return $this->categoryMapper->find($id);
    }

    public function create(string $name, ?int $parentId = null): Category
    {
        $category = new Category();
        $category->setName($name);
        $category->setParentId($parentId);
        
        return $this->categoryMapper->insert($category);
    }

    public function update(int $id, string $name, ?int $parentId = null): Category
    {
        $category = $this->categoryMapper->find($id);
        $category->setName($name);
        $category->setParentId($parentId);
        
        return $this->categoryMapper->update($category);
    }

    public function delete(int $id): void
    {
        $category = $this->categoryMapper->find($id);
        $this->categoryMapper->delete($category);
        
        $this->deleteChildren($id);
    }

    private function deleteChildren(int $parentId): void
    {
        $children = $this->categoryMapper->findByParentId($parentId);
        foreach ($children as $child) {
            $this->delete($child->getId());
        }
    }

    /**
     * @return Category[]
     */
    public function findByParentId(?int $parentId): array
    {
        return $this->categoryMapper->findByParentId($parentId);
    }
}
