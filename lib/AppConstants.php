<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2023 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora;

abstract class AppConstants
{
    /**
     * @var string 
     */
    public const APP_ID = 'agora';
    /**
     * @var string 
     */
    public const CLIENT_ID = 'ncAgoraClientId';
    /**
     * @var string 
     */
    public const CLIENT_TZ = 'ncAgoraClientTimeZone';
    /**
     * @var string 
     */
    public const SESSION_KEY_CRON_JOB = 'ncAgoraCronJob';

}
