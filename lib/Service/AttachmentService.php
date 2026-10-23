<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\Attachment;
use OCA\Agora\Db\AttachmentMapper;
use OCA\Agora\Db\InquiryMapper;
use OCA\Agora\Db\InquiryGroupMapper;
use OCP\Files\File;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\Share\Share;
use OCP\IUserSession;
use OCA\Agora\Db\Inquiry;
use OCA\Agora\Db\InquiryGroup;
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
    private InquiryMapper $inquiryMapper;
    private InquiryGroupMapper $inquiryGroupMapper;
    private IURLGenerator $urlGenerator;
    private LoggerInterface $logger;
    private IShareManager $shareManager;

    public function __construct(
        IRootFolder $rootFolder,
        IUserSession $userSession,
        AttachmentMapper $attachmentMapper,
        InquiryMapper $inquiryMapper,
        InquiryGroupMapper $inquiryGroupMapper,
        IURLGenerator $urlGenerator,
        LoggerInterface $logger,
        IShareManager $shareManager
    ) {
        $this->rootFolder = $rootFolder;
        $this->userSession = $userSession;
        $this->attachmentMapper = $attachmentMapper;
        $this->inquiryMapper = $inquiryMapper;
        $this->inquiryGroupMapper = $inquiryGroupMapper;
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

        if (!$userFolder->nodeExists(Group::AGORA_FOLDER)) {
            $agoraFolder = $userFolder->newFolder(Group::AGORA_FOLDER);
        } else {
            $agoraFolder = $userFolder->get(Group::AGORA_FOLDER);
        }

        return $agoraFolder;
    }

    /**
     * Add a new attachment (both file and database record)
     * Handles cover image replacement if coverId is true
     *
     * @param  int   $inquiryId    ID of the inquiry (0 if group attachment)
     * @param  int   $groupId      ID of the group (0 if inquiry attachment)
     * @param  array $uploadedFile Uploaded file data from $_FILES
     * @param  bool  $coverId      Whether this is a cover image
     * @return Attachment
     * @throws \Exception
     */
    public function add(int $id, array $uploadedFile, bool $coverId, bool $state): Attachment
    {
        // Validate that either inquiryId or groupId is provided
        if ($id === 0) {
            throw new \InvalidArgumentException('Either inquiryId or groupId must be provided');
        }

        // Determine if this is a group or inquiry attachment
        $isGroupAttachment = $state;

        if ($isGroupAttachment) {
            $entityFolder = $this->getGroupFolder($id);
            $entity = $this->inquiryGroupMapper->find($id);
        } else {
            $entityFolder = $this->getInquiryFolder($id);
            $entity = $this->inquiryMapper->find($id);
        }

        $user = $this->userSession->getUser();

        // If coverId is true, handle old cover removal
        if ($coverId === true) {
            // If entity already has a coverId, remove the old file
            if ($entity->getCoverId() !== null) {
                try {
                    // Check if old attachment exists before attempting removal
                    if ($isGroupAttachment) {
                        $oldAttachment = $this->attachmentMapper->findByFileIdForGroup($id, $entity->getCoverId());
                    } else {
                        $oldAttachment = $this->attachmentMapper->findByFileId($id, $entity->getCoverId());
                    }

                    // If we get here, attachment exists and can be removed
                    $this->remove($oldAttachment->getId());

                } catch (DoesNotExistException $e) {
                    // Attachment doesn't exist in database, just clean up the coverId
                    $this->logger->warning('Old cover attachment not found, cleaning coverId: ' . $entity->getCoverId());
                    $entity->setCoverId(null);
                    if ($isGroupAttachment) {
                        $this->inquiryGroupMapper->update($entity);
                    } else {
                        $this->inquiryMapper->update($entity);
                    }
                } catch (\Exception $e) {
                    // Log other errors but continue with new upload
                    $this->logger->error('Failed to remove old cover file: ' . $e->getMessage());
                }
            }
        }

        // Copy file to entity folder
        $fileName = $this->sanitizeFileName($uploadedFile['name']);
        $content = file_get_contents($uploadedFile['tmp_name']);
        $targetFile = $entityFolder->newFile($fileName, $content);

        usleep(500000); // 0.5 second delay
        $targetNodes = $this->rootFolder->getById($targetFile->getId());
        if (!empty($targetNodes)) {
            $targetFile = $targetNodes[0];
        }
        // Share the file with groups (with error handling)
	try {
	    $this->ensureFileSharedWithGroups($targetFile, $entity, $isGroupAttachment);
        } catch (\Exception $e) {
            // Log error but continue
            $this->logger->error('Error sharing file with groups: ' . $e->getMessage());
            // File is still created, just sharing failed
        }

        // Create database record
        $attachment = new Attachment();
        if ($isGroupAttachment) {
            $attachment->setGroupId($id);
            $attachment->setInquiryId(0);
        } else {
            $attachment->setGroupId(0);
            $attachment->setInquiryId($id);
        }
        $attachment->setName($uploadedFile['name']);
        $attachment->setMimeType($uploadedFile['type'] ?? 'application/octet-stream');
        $attachment->setSize($uploadedFile['size']);
        $attachment->setFileId((string)$targetFile->getId());
        $attachment->setCreated(time());

        $attachment = $this->attachmentMapper->insert($attachment);

        // If coverId is true, update entity with new attachmentId
        if ($coverId === true) {
            $entity->setCoverId($attachment->getFileId());
            if ($isGroupAttachment) {
                $this->inquiryGroupMapper->update($entity);
            } else {
                $this->inquiryMapper->update($entity);
            }
        }

        return $attachment;
    }

    /**
     * Get or create group-specific folder
     */
    private function getGroupFolder(int $groupId)
    {
        $agoraRoot = $this->getAgoraRootFolder();
        $groupFolderName = 'group___' . (string)$groupId;

        if (!$agoraRoot->nodeExists($groupFolderName)) {
            $groupFolder = $agoraRoot->newFolder($groupFolderName);
        } else {
            $groupFolder = $agoraRoot->get($groupFolderName);
        }

        return $groupFolder;
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
 * Re-sync attachment shares for an entity.
 * Call this whenever an inquiry/group's access level changes
 * (private → open, open → groups, groups → private, etc.).
 *
 * @param Inquiry|InquiryGroup $entity
 * @param bool                 $isGroupAttachment
 */
public function syncSharesForEntity(Inquiry|InquiryGroup $entity, bool $isGroupAttachment = false): void
{
    $id = $entity->getId();

    $attachments = $isGroupAttachment
        ? $this->attachmentMapper->findByGroupId($id)
        : $this->attachmentMapper->findByInquiryId($id);

    foreach ($attachments as $attachment) {
        try {
            $nodes = $this->rootFolder->getById((int)$attachment->getFileId());
            if (empty($nodes)) {
                continue;
            }
            /** @var File $file */
            $file = $nodes[0];
            $this->ensureFileSharedWithGroups($file, $entity, $isGroupAttachment);
        } catch (\Exception $e) {
            $this->logger->error(
                'Failed to sync shares for attachment ' . $attachment->getId() . ': ' . $e->getMessage()
            );
        }
    }
}

/**
 * Compute the desired share targets for the given entity.
 *
 *  - Group attachment  AGORA_USERS (READ only) + moderators + officials
 *  - ACCESS_OPEN       AGORA_USERS + moderators + officials
 *  - ACCESS_GROUP      entity.ownedGroup + moderators + officials
 *  - ACCESS_PRIVATE    owner (user share) only + moderators + officials
 *
 * @param Inquiry|InquiryGroup $entity
 * @return array<int, array{type:int, with:string, permissions:int}>
 */
private function getTargetSharesForEntity(
    Inquiry|InquiryGroup $entity,
    bool $isGroupAttachment,
): array {
    $ownerUid   = (string) $entity->getOwner();
    $access     = $isGroupAttachment
        ? null
        : (string) $entity->getAccess();
    $ownedGroup = $isGroupAttachment
        ? ''
        : (string) ($entity->getOwnedGroup() ?? '');


    $targets = [
        [
            'type'        => IShare::TYPE_GROUP,
            'with'        => Group::GROUP_MODERATOR,
            'permissions' => \OCP\Constants::PERMISSION_READ
                           | \OCP\Constants::PERMISSION_UPDATE
                           | \OCP\Constants::PERMISSION_SHARE,
        ],
        [
            'type'        => IShare::TYPE_GROUP,
            'with'        => Group::GROUP_OFFICIAL,
            'permissions' => \OCP\Constants::PERMISSION_READ
                           | \OCP\Constants::PERMISSION_UPDATE
                           | \OCP\Constants::PERMISSION_SHARE,
        ],
    ];

    if ($isGroupAttachment) {
        $targets[] = [
            'type'        => IShare::TYPE_GROUP,
            'with'        => Group::GROUP_USERS,
            'permissions' => \OCP\Constants::PERMISSION_READ,
        ];
        return $targets;
    }

    switch ($access) {
        case Inquiry::ACCESS_OPEN:
            $targets[] = [
                'type'        => IShare::TYPE_GROUP,
                'with'        => Group::GROUP_USERS,
                'permissions' => \OCP\Constants::PERMISSION_READ,
            ];
            break;

        case Inquiry::ACCESS_GROUP:
            if ($ownedGroup !== '') {
                $targets[] = [
                    'type'        => IShare::TYPE_GROUP,
                    'with'        => $ownedGroup,
                    'permissions' => \OCP\Constants::PERMISSION_READ,
                ];
            } else {
                $targets[] = [
                    'type'        => IShare::TYPE_USER,
                    'with'        => $ownerUid,
                    'permissions' => \OCP\Constants::PERMISSION_READ
                                   | \OCP\Constants::PERMISSION_UPDATE
                                   | \OCP\Constants::PERMISSION_SHARE,
                ];
            }
            break;

        case Inquiry::ACCESS_PRIVATE:
        default:
            $targets[] = [
                'type'        => IShare::TYPE_USER,
                'with'        => $ownerUid,
                'permissions' => \OCP\Constants::PERMISSION_READ
                               | \OCP\Constants::PERMISSION_UPDATE
                               | \OCP\Constants::PERMISSION_SHARE,
            ];
            break;
    }

    return $targets;
}

/**
 * Ensure file is shared with required groups
 * Uses basic permissions to avoid create/delete permission errors
 *
 * @param File $file File to share
 * Reconcile the file's shares to exactly match the entity's access model.
 *
 * - adds missing shares
 * - updates permissions if they drifted
 * - removes our stale shares (open → private, groups → private, etc.)
 */
private function ensureFileSharedWithGroups(
	File $file,
	Inquiry|InquiryGroup $entity,
	bool $isGroupAttachment,
): void {
	$ownerUid = method_exists($entity, 'getOwner')
		? (string) $entity->getOwner()
		: $this->userSession->getUser()->getUID();

	$targets = $this->getTargetSharesForEntity($entity, $isGroupAttachment);

	// Index the shares we own on this file by "type:with"
	$existing = [];
	foreach ([IShare::TYPE_GROUP, IShare::TYPE_USER] as $type) {
		foreach ($this->shareManager->getSharesBy($ownerUid, $type, $file, false, -1) as $share) {
			$existing[$share->getShareType() . ':' . $share->getSharedWith()] = $share;
		}
	}

	$desired = [];
	foreach ($targets as $t) {
		$desired[$t['type'] . ':' . $t['with']] = $t;
	}

	// Add or update
	foreach ($desired as $key => $t) {
		if (!isset($existing[$key])) {
			try {
				$share = $this->shareManager->newShare();
				$share->setNode($file);
				$share->setShareType($t['type']);
				$share->setSharedWith($t['with']);
				$share->setSharedBy($ownerUid);
				$share->setPermissions($t['permissions']);
				$this->shareManager->createShare($share);
			} catch (\Exception $e) {
				$this->logger->error("Share {$key} failed: " . $e->getMessage());
			}
		} else {
			$share = $existing[$key];
			if ($share->getPermissions() !== $t['permissions']) {
				try {
					$share->setPermissions($t['permissions']);
					$this->shareManager->updateShare($share);
				} catch (\Exception $e) {
					$this->logger->error("Update share {$key} failed: " . $e->getMessage());
				}
			}
			unset($existing[$key]); // still wanted
		}
	}

	// Remove stale
	foreach ($existing as $key => $share) {
		try {
			if ($share->getShareOwner() === $ownerUid || $share->getSharedBy() === $ownerUid) {
				$this->shareManager->deleteShare($share);
			}
		} catch (\Exception $e) {
			$this->logger->error("Delete stale share {$key} failed: " . $e->getMessage());
		}
	}
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
 * Remove an attachment (both file and database record)
 */
public function remove(int $attachmentId): Attachment
{
	$attachment = $this->attachmentMapper->findById($attachmentId);
	$ownerUid   = $this->userSession->getUser()->getUID();

	try {
		$nodes = $this->rootFolder->getById((int)$attachment->getFileId());
		if (!empty($nodes)) {
			$file = $nodes[0];

			// Delete group + user shares before deleting the file
			$shares = array_merge(
				$this->shareManager->getSharesBy($ownerUid, IShare::TYPE_GROUP, $file, false, -1),
				$this->shareManager->getSharesBy($ownerUid, IShare::TYPE_USER,  $file, false, -1)
			);

			foreach ($shares as $share) {
				try {
					$this->shareManager->deleteShare($share);
				} catch (\Exception $e) {
					$this->logger->error('Failed to delete share: ' . $e->getMessage());
				}
			}

			$file->delete();
		}
	} catch (NotFoundException $e) {
		// File already deleted, continue with DB removal
	} catch (\Exception $e) {
		$this->logger->error('Error removing file: ' . $e->getMessage());
	}

	return $this->attachmentMapper->deleteById($attachmentId);
}

/**
 * Get all attachments for an inquiry or group
 *
 * @param int $inquiryId ID of the inquiry (0 for group attachments)
 * @param int $groupId ID of the group (0 for inquiry attachments)
 * @return array[]
 * @throws \InvalidArgumentException if both inquiryId and groupId are 0
 */
public function getAll(int $inquiryId, int $groupId): array
{
	if ($inquiryId === 0 && $groupId === 0) {
		throw new \InvalidArgumentException('Either inquiryId or groupId must be provided');
	}

	$attachments = $inquiryId > 0
		? $this->attachmentMapper->findByInquiryId($inquiryId)
		: $this->attachmentMapper->findByGroupId($groupId);

	$result = [];

	foreach ($attachments as $attachment) {
		try {
			$fileId = (int)$attachment->getFileId();
			$nodes = $this->rootFolder->getById($fileId);

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
				'url' => $this->urlGenerator->linkToRouteAbsolute('files.View.showFile', ['fileid' => $file->getId()]),
				'inquiry_id' => $attachment->getInquiryId(),
				'group_id' => $attachment->getGroupId(),
			];
		} catch (NotFoundException $e) {
			// File missing but DB record exists, skip
			continue;
		}
	}


	return $result;
}

/**
 * Get all attachments for an inquiry
 *
 * @return array[]
 * @deprecated Use getAll() instead
 */
public function getInquiryAttachments(int $inquiryId): array
{
	return $this->getAll($inquiryId, 0);
}

/**
 * Get all attachments for a group
 *
 * @return array[]
 */
public function getGroupAttachments(int $groupId): array
{
	return $this->getAll(0, $groupId);
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

/**
 * Remove all attachments for an inquiry or group
 *
 * @param int $inquiryId ID of the inquiry (0 for group attachments)
 * @param int $groupId ID of the group (0 for inquiry attachments)
 * @return int Number of attachments removed
 */
public function removeAll(int $inquiryId, int $groupId): int
{
	if ($inquiryId === 0 && $groupId === 0) {
		throw new \InvalidArgumentException('Either inquiryId or groupId must be provided');
	}

	$attachments = $inquiryId > 0
		? $this->attachmentMapper->findByInquiryId($inquiryId)
		: $this->attachmentMapper->findByGroupId($groupId);

	$removedCount = 0;

	foreach ($attachments as $attachment) {
		try {
			$this->remove($attachment->getId());
			$removedCount++;
		} catch (\Exception $e) {
			$this->logger->error('Failed to remove attachment ' . $attachment->getId() . ': ' . $e->getMessage());
		}
	}

	return $removedCount;
}

/**
 * Check if an attachment belongs to a specific inquiry or group
 */
public function belongsTo(int $attachmentId, ?int $inquiryId = null, ?int $groupId = null): bool
{
	$attachment = $this->attachmentMapper->findById($attachmentId);

	if ($inquiryId !== null) {
		return $attachment->getInquiryId() === $inquiryId;
	}

	if ($groupId !== null) {
		return $attachment->getGroupId() === $groupId;
	}

	return false;
}
}
