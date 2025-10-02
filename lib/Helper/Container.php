<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Helper;

use OCA\Agora\AppConstants;
use OCA\Agora\Db\Inquiry;
use OCA\Agora\Db\InquiryMapper;
use OCA\Agora\Db\Share;
use OCA\Agora\Db\ShareMapper;
use OCP\App\IAppManager;
use OCP\IL10N;
use OCP\L10N\IFactory;
use OCP\Server;
use Psr\Log\LoggerInterface;

abstract class Container
{
    /**
     * @param  string $class
     * @return mixed
     */
    public static function queryClass(string $class): mixed
    {
        return Server::get($class);
    }

    /**
     * @psalm-suppress PossiblyUnusedMethod 
     */
    public static function logger(): LoggerInterface
    {
        return Server::get(LoggerInterface::class);
    }

    public static function getInquiry(int $inquiryId, bool $getDeleted = false): Inquiry
    {
        return Server::get(InquiryMapper::class)->get($inquiryId, $getDeleted);
    }

    public static function queryInquiry(int $inquiryId): Inquiry
    {
        return Server::get(InquiryMapper::class)->get($inquiryId);
    }

    public static function findShare(int $inquiryId, string $userId): Share
    {
        return Server::get(ShareMapper::class)->findByInquiryAndUser($inquiryId, $userId);
    }

    public static function getL10N(?string $lang = null): IL10N
    {
        return Server::get(IFactory::class)->get(AppConstants::APP_ID, $lang);
    }
    public static function isAppEnabled(string $app): bool
    {
        return Server::get(IAppManager::class)->isEnabledForUser($app);
    }
}
