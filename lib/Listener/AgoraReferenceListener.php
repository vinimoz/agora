<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Listener;

use OCA\Agora\AppInfo\Application;
use OCP\Collaboration\Reference\RenderReferenceEvent;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Util;
use OCP\ILogger;

/**
 * @template-implements IEventListener<Event>
 */
class AgoraReferenceListener implements IEventListener
{
    private ILogger $logger;
    
    public function __construct(ILogger $logger)
    {
        $this->logger = $logger;
    
    }

    public function handle(Event $event): void
    {
        $this->logger->info("REFERENCE AgoraReferenceListener triggered", ['app' => 'agora']);
        if (!$event instanceof RenderReferenceEvent) {
            return;
        }

        Util::addScript(Application::APP_ID, 'agora-reference');
    }
}
