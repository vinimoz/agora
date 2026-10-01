<?php

declare(strict_types=1);

namespace OCA\Agora\Service;

use OCA\Agora\Db\InquiryOptionType;
use OCA\Agora\Db\InquiryOptionTypeMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;

class InquiryOptionTypeService
{
    public function __construct(
        private InquiryOptionTypeMapper $optionTypeMapper
    ) {
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function find(int $id): InquiryOptionType
    {
        return $this->optionTypeMapper->find($id);
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function findByType(string $type): InquiryOptionType
    {
        return $this->optionTypeMapper->findByType($type);
    }

    public function findAll(): array
    {
        return $this->optionTypeMapper->findAll();
    }

    public function findByFamily(string $family): array
    {
        return $this->optionTypeMapper->findByFamily($family);
    }

    public function optionTypeExists(string $optionType): bool
    {
        return $this->optionTypeMapper->optionTypeExists($optionType);
    }

    /**
     * Normalize JSON-ish fields
     */
    private function normalizeJson(mixed $value, array|string $fallback): string
    {
        if ($value === null || $value === '') {
            return is_array($fallback) ? json_encode($fallback) : $fallback;
        }
        if (is_string($value)) {
            json_decode($value);
            return json_last_error() === JSON_ERROR_NONE ? $value : json_encode($fallback);
        }
        return json_encode($value);
    }

    /**
     * Normalize boolean-ish input coming from HTTP requests
     * (true/false, 0/1, "0"/"1", "true"/"false", etc.).
     */
    private function normalizeBool(mixed $value): ?bool
    {
        if ($value === null) {
            return null;
        }
        if (is_bool($value)) {
            return $value;
        }
        if (is_int($value)) {
            return $value !== 0;
        }
        if (is_string($value)) {
            $v = strtolower(trim($value));
            if (in_array($v, ['1', 'true', 'yes', 'on'], true)) {
                return true;
            }
            if (in_array($v, ['0', 'false', 'no', 'off', ''], true)) {
                return false;
            }
        }
        return (bool)$value;
    }

    public function create(
        string $optionType,
        string $icon = '',
        string $label = '',
        string $family = 'debate',
        ?string $description = null,
        mixed $fields = null,
        mixed $allowedResponse = null,
        mixed $statuses = null,
        int|bool|string|null $allowComment = null,
        string $supportFeature = 'none',
        int|bool|string|null $useTitle = false,
    ): InquiryOptionType {
        if ($this->optionTypeExists($optionType)) {
            throw new \InvalidArgumentException('Option type already exists');
        }

        $type = new InquiryOptionType();
        $type->setOptionType($optionType);
        $type->setFamily($family);
        $type->setIcon($icon);
        $type->setLabel($label);
        $type->setDescription($description ?? '');
        $type->setFields($this->normalizeJson($fields, []));
        $type->setAllowedResponse($this->normalizeJson($allowedResponse, []));
        $type->setStatuses($this->normalizeJson($statuses, []));
        $type->setSupportFeature($supportFeature);
        $type->setUseTitle(($this->normalizeBool($useTitle) ?? false) ? 1 : 0);

        $allowCommentBool = $this->normalizeBool($allowComment);
        if ($allowCommentBool !== null) {
            $type->setAllowComment($allowCommentBool ? 1 : 0);
        }
        $type->setCreated(time());

        return $this->optionTypeMapper->insert($type);
    }

    public function update(
        int $id,
        string $optionType,
        string $icon = '',
        string $label = '',
        string $family = 'debate',
        ?string $description = null,
        mixed $fields = null,
        mixed $allowedResponse = null,
        mixed $statuses = null,
        int|bool|string|null $allowComment = null,
        ?string $supportFeature = null,
        int|bool|string|null $useTitle = null,
    ): InquiryOptionType {
        $type = $this->find($id);

        $type->setOptionType($optionType);
        $type->setIcon($icon);
        $type->setLabel($label);
        $type->setFamily($family);
        $type->setDescription($description ?? '');

        if ($fields !== null) {
            $type->setFields($this->normalizeJson($fields, []));
        }
        if ($allowedResponse !== null) {
            $type->setAllowedResponse($this->normalizeJson($allowedResponse, []));
        }
        if ($statuses !== null) {
            $type->setStatuses($this->normalizeJson($statuses, []));
        }
        if ($supportFeature !== null) {
            $type->setSupportFeature($supportFeature);
        }

        $useTitleBool = $this->normalizeBool($useTitle);
        if ($useTitleBool !== null) {
            $type->setUseTitle($useTitleBool ? 1 : 0);
        }

        $allowCommentBool = $this->normalizeBool($allowComment);
        if ($allowCommentBool !== null) {
            $type->setAllowComment($allowCommentBool ? 1 : 0);
        }

        return $this->optionTypeMapper->update($type);
    }

    public function delete(int $id): InquiryOptionType
    {
        $optionType = $this->find($id);
        return $this->optionTypeMapper->delete($optionType);
    }
}
