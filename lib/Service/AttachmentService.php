<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\Attachment;
use OCA\Agora\Db\AttachmentMapper;
use OCP\Files\File;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\Share\Share;

use OCP\IUserSession;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;
use OCP\IURLGenerator;
use Psr\Log\LoggerInterface;
use OCP\Share\IManager as IShareManager;
use OCP\Share\IShare;
use OCA\Agora\Model\Group\Group;

class AttachmentService
{
    private IRootFolder $rootFolder;
    private IUserSession $userSession;
    private AttachmentMapper $attachmentMapper;
    private IURLGenerator $urlGenerator;
    private LoggerInterface $logger;        
    private IShareManager $shareManager;

    public function __construct(
        IRootFolder $rootFolder,
        IUserSession $userSession,
        AttachmentMapper $attachmentMapper,
        IURLGenerator $urlGenerator,
        LoggerInterface $logger,
        IShareManager $shareManager
    ) {
        $this->rootFolder = $rootFolder;
        $this->userSession = $userSession;
        $this->attachmentMapper = $attachmentMapper;
        $this->urlGenerator = $urlGenerator;
        $this->logger = $logger;
        $this->shareManager = $shareManager;
    }

    /**
     * Get Agora root folder storage folder
     */
    private function getAgoraRootFolder()
    {
        $userId = $this->userSession->getUser()->getUID();
        $userFolder = $this->rootFolder->getUserFolder($userId);

        if (!$userFolder->nodeExists(Group::GROUP_FOLDER)) {
            $agoraFolder = $userFolder->newFolder(Group::GROUP_FOLDER);
        } else {
            $agoraFolder = $userFolder->get(Group::GROUP_FOLDER);
        }

        return $agoraFolder;
    }    

    /**
     * Ensure a file is shared with all Agora users
     */
    private function ensureFileSharedWithGroups(File $file): void
    {
        $ownerUid = $this->userSession->getUser()->getUID();

        $groups = [
            Group::GROUP_USERS => \OCP\Constants::PERMISSION_READ,         
            Group::GROUP_MODERATOR => \OCP\Constants::PERMISSION_ALL,     
            Group::GROUP_OFFICIAL => \OCP\Constants::PERMISSION_ALL   
        ];

        foreach ($groups as $groupName => $permissions) {
            $shares = $this->shareManager->getSharesBy(
                $ownerUid,
                IShare::TYPE_GROUP,
                $file,
                false,
                -1
            );

            $alreadyShared = false;
            foreach ($shares as $share) {
                if ($share->getSharedWith() === $groupName) {
                    $alreadyShared = true;
                    break;
                }
            }

            if (!$alreadyShared) {
                try {
                    $share = $this->shareManager->newShare();
                    $share->setNode($file);
                    $share->setShareType(IShare::TYPE_GROUP);
                    $share->setSharedWith($groupName);
                    $share->setPermissions($permissions);
                    $share->setSharedBy($ownerUid);
                    $this->shareManager->createShare($share);
                    $this->logger->info('File shared with group: ' . $groupName . ' - ' . $file->getPath());
                } catch (\Exception $e) {
                    $this->logger->error('Error sharing file with group ' . $groupName . ': ' . $e->getMessage());
                }
            }
        }
    }

    /**
     * Get or create inquiry-specific folder
     */
    private function getInquiryFolder(int $inquiryId)
    {
        $agoraRoot = $this->getAgoraRootFolder();
        $inquiryFolderName = 'inquiry___' . (string)$inquiryId;

        if (!$agoraRoot->nodeExists($inquiryFolderName)) {
            $inquiryFolder = $agoraRoot->newFolder($inquiryFolderName);
        } else {
            $inquiryFolder = $agoraRoot->get($inquiryFolderName);
        }

        return $inquiryFolder; 
    }

    /**
     * Sanitize file name to prevent issues
     */
    private function sanitizeFileName(string $fileName): string
    {
        $fileName = preg_replace('/[\/\\\?%*:|"<>]/', '_', $fileName);
        if (strlen($fileName) > 200) {
            $extension = pathinfo($fileName, PATHINFO_EXTENSION);
            $name = pathinfo($fileName, PATHINFO_FILENAME);
            $fileName = substr($name, 0, 200 - strlen($extension) - 1) . '.' . $extension;
        }
        return $fileName;
    }

    /**
     * Add a new attachment (both file and database record)
     */
    public function add(int $inquiryId, array $uploadedFile): Attachment
    {
        $inquiryFolder = $this->getInquiryFolder($inquiryId);
        $user = $this->userSession->getUser();

        // Copy file to inquiry folder
        $fileName = $this->sanitizeFileName($uploadedFile['name']);
        $content = file_get_contents($uploadedFile['tmp_name']);
        $targetFile = $inquiryFolder->newFile($fileName, $content);

        // Share the file with groups
        $this->ensureFileSharedWithGroups($targetFile);

        // Create database record
        $attachment = new Attachment();
        $attachment->setInquiryId($inquiryId);
        $attachment->setName($uploadedFile['name']);
        $attachment->setMimeType($uploadedFile['type'] ?? 'application/octet-stream');
        $attachment->setSize($uploadedFile['size']);
        $attachment->setFileId((string)$targetFile->getId());
        $attachment->setCreated(time());

        return $this->attachmentMapper->insert($attachment);
    }

    /**
     * Remove an attachment (both file and database record)
     */
    public function remove(int $attachmentId): Attachment
    {
        $attachment = $this->attachmentMapper->findById($attachmentId);

        try {
            $file = $this->rootFolder->getById((int)$attachment->getFileId())[0];
            
            // Delete all shares for this file before deleting the file
            $shares = $this->shareManager->getSharesBy(
                $this->userSession->getUser()->getUID(),
                IShare::TYPE_GROUP,
                $file,
                false,
                -1
            );
            
            foreach ($shares as $share) {
                $this->shareManager->deleteShare($share);
            }
            
            $file->delete();
        } catch (NotFoundException $e) {
            // File already deleted, continue with DB removal
        }

        return $this->attachmentMapper->deleteById($attachmentId);
    }

    /**
     * Get all attachments for an inquiry
     *
     * @return array[]
     */
    public function getAll(int $inquiryId): array
    {
        $attachments = $this->attachmentMapper->findByInquiryId($inquiryId);
        $result = [];

        $currentUser = $this->userSession->getUser()->getUID();

        foreach ($attachments as $attachment) {
            try {
                $fileId = (int)$attachment->getFileId();

                $nodes = $this->rootFolder->getById((int)$attachment->getFileId());
                if (empty($nodes)) {
                    continue; 
                }
                $file = $nodes[0];
                $result[] = [
                    'id' => $attachment->getId(),
                    'name' => $attachment->getName(),
                    'type' => $attachment->getMimeType(),
                    'size' => $attachment->getSize(),
                    'created' => $attachment->getCreated(),
                    'file_id' => $attachment->getFileId(),
                    'url'  => $this->urlGenerator->linkToRouteAbsolute('files.View.showFile', ['fileid' => $file->getId()])
                ];
            } catch (NotFoundException $e) {
                // File missing but DB record exists, skip or handle as needed
                continue;
            }
        }

        $this->logger->debug(
            'Attachment processing', [
            'inquiryId' => $inquiryId,
            'totalAttachmentsInDb' => count($attachments),
            'validAttachmentsWithFiles' => count($result),
            'invalidAttachments' => count($attachments) - count($result)
            ]
        );
        return $result;
    }

    /**
     * Get attachment by ID
     *
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function get(int $attachmentId): Attachment
    {
        return $this->attachmentMapper->findById($attachmentId);
    }

    /**
     * Get direct download URL for an attachment
     */
    public function getDownloadUrl(int $attachmentId): string
    {
        $attachment = $this->attachmentMapper->findById($attachmentId);
        $fileId = (int)$attachment->getFileId();

        $nodes = $this->rootFolder->getById($fileId);
        if (empty($nodes)) {
            throw new NotFoundException('File not found');
        }

        $file = $nodes[0];
        return $this->urlGenerator->linkToRouteAbsolute('files.View.showFile', ['fileid' => $file->getId()]);
    }
}
