<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCP\IGroupManager;
use OCP\IUser;

class LotteryService
{
    private IGroupManager $groupManager;

    public function __construct(IGroupManager $groupManager)
    {
        $this->groupManager = $groupManager;
    }

    /**
     * Randomly select users
     *
     * @param string $groupId
     * @return IUser|null
     */
    public function drawRandomUserFromGroup(string $groupId): ?IUser
    {
        $group = $this->groupManager->get($groupId);
        if ($group === null) {
            return null;
        }

        $users = $group->getUsers();

        if (empty($users)) {
            return null;
        }

        $randomIndex = array_rand($users);

        return $users[$randomIndex];
    }
}
