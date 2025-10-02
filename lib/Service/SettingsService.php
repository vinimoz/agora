<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Model\Settings\AppSettings;
use OCA\Agora\Service\LocationService;
use OCA\Agora\Service\CategoryService;
use OCA\Agora\Service\ModerationStatusService;



class SettingsService
{

    private LocationService $locationService;
    private CategoryService $categoryService;
    private ModerationStatusService $moderationStatusService;
    private AppSettings $appSettings;

    /**
     * @psalm-suppress PossiblyUnusedMethod 
     */
    public function __construct(
        AppSettings $appSettings,
        LocationService $locationService,
        CategoryService $categoryService,
        ModerationStatusService $moderationStatusService
    ) {
        $this->appSettings = $appSettings;
              $this->locationService = $locationService;
                  $this->categoryService = $categoryService;
                  $this->moderationStatusService = $moderationStatusService;
    }

    /**
     * Get app settings with extended group information
     */
    public function getAppSettings(): AppSettings
    {
        return $this->appSettings;
    }

    /**
     * Write app settings
     */
    public function writeAppSettings(array $settingsArray): void
    {
        // Boolean settings
        $this->appSettings->setBooleanSetting(AppSettings::SETTING_SHOW_MAIL_ADDRESSES, $settingsArray[AppSettings::SETTING_SHOW_MAIL_ADDRESSES]);
        $this->appSettings->setBooleanSetting(AppSettings::SETTING_ALLOW_PUBLIC_SHARES, $settingsArray[AppSettings::SETTING_ALLOW_PUBLIC_SHARES]);
        $this->appSettings->setBooleanSetting(AppSettings::SETTING_ALLOW_COMBO, $settingsArray[AppSettings::SETTING_ALLOW_COMBO]);
        $this->appSettings->setBooleanSetting(AppSettings::SETTING_ALLOW_ALL_ACCESS, $settingsArray[AppSettings::SETTING_ALLOW_ALL_ACCESS]);
        $this->appSettings->setBooleanSetting(AppSettings::SETTING_ALLOW_INQUIRY_CREATION, $settingsArray[AppSettings::SETTING_ALLOW_INQUIRY_CREATION]);
        $this->appSettings->setBooleanSetting(AppSettings::SETTING_ALLOW_INQUIRY_DOWNLOAD, $settingsArray[AppSettings::SETTING_ALLOW_INQUIRY_DOWNLOAD]);
        $this->appSettings->setBooleanSetting(AppSettings::SETTING_AUTO_ARCHIVE, $settingsArray[AppSettings::SETTING_AUTO_ARCHIVE]);
        $this->appSettings->setBooleanSetting(AppSettings::SETTING_AUTO_DELETE, $settingsArray[AppSettings::SETTING_AUTO_DELETE]);
        $this->appSettings->setBooleanSetting(AppSettings::SETTING_SHOW_LOGIN, $settingsArray[AppSettings::SETTING_SHOW_LOGIN]);
        $this->appSettings->setBooleanSetting(AppSettings::SETTING_USE_ACTIVITY, $settingsArray[AppSettings::SETTING_USE_ACTIVITY]);
        $this->appSettings->setBooleanSetting(AppSettings::SETTING_USE_SITE_LEGAL, $settingsArray[AppSettings::SETTING_USE_SITE_LEGAL]);
        $this->appSettings->setBooleanSetting(AppSettings::SETTING_LEGAL_TERMS_IN_EMAIL, $settingsArray[AppSettings::SETTING_LEGAL_TERMS_IN_EMAIL]);
        $this->appSettings->setBooleanSetting(AppSettings::SETTING_LOAD_INQUIRIES_IN_NAVIGATION, $settingsArray[AppSettings::SETTING_LOAD_INQUIRIES_IN_NAVIGATION]);
        $this->appSettings->setBooleanSetting(AppSettings::SETTING_UNRESTRICTED_INQUIRY_OWNER, $settingsArray[AppSettings::SETTING_UNRESTRICTED_INQUIRY_OWNER]);
        $this->appSettings->setBooleanSetting(AppSettings::SETTING_USE_COLLABORATION, $settingsArray[AppSettings::SETTING_USE_COLLABORATION]);

        // Group settings
        $this->appSettings->setGroupSetting(AppSettings::SETTING_SHOW_MAIL_ADDRESSES_GROUPS, array_column($settingsArray[AppSettings::SETTING_SHOW_MAIL_ADDRESSES_GROUPS], 'id'));
        $this->appSettings->setGroupSetting(AppSettings::SETTING_ALLOW_ALL_ACCESS_GROUPS, array_column($settingsArray[AppSettings::SETTING_ALLOW_ALL_ACCESS_GROUPS], 'id'));
        $this->appSettings->setGroupSetting(AppSettings::SETTING_ALLOW_PUBLIC_SHARES_GROUPS, array_column($settingsArray[AppSettings::SETTING_ALLOW_PUBLIC_SHARES_GROUPS], 'id'));
        $this->appSettings->setGroupSetting(AppSettings::SETTING_ALLOW_COMBO_GROUPS, array_column($settingsArray[AppSettings::SETTING_ALLOW_COMBO_GROUPS], 'id'));
        $this->appSettings->setGroupSetting(AppSettings::SETTING_ALLOW_INQUIRY_CREATION_GROUPS, array_column($settingsArray[AppSettings::SETTING_ALLOW_INQUIRY_CREATION_GROUPS], 'id'));
        $this->appSettings->setGroupSetting(AppSettings::SETTING_ALLOW_INQUIRY_DOWNLOAD_GROUPS, array_column($settingsArray[AppSettings::SETTING_ALLOW_INQUIRY_DOWNLOAD_GROUPS], 'id'));
        $this->appSettings->setGroupSetting(AppSettings::SETTING_UNRESTRICTED_INQUIRY_OWNER_GROUPS, array_column($settingsArray[AppSettings::SETTING_UNRESTRICTED_INQUIRY_OWNER_GROUPS], 'id'));

        // Integer settings
        $this->appSettings->setIntegerSetting(AppSettings::SETTING_AUTO_ARCHIVE_OFFSET_DAYS, intval($settingsArray[AppSettings::SETTING_AUTO_ARCHIVE_OFFSET_DAYS]));
        $this->appSettings->setIntegerSetting(AppSettings::SETTING_AUTO_DELETE_OFFSET_DAYS, intval($settingsArray[AppSettings::SETTING_AUTO_DELETE_OFFSET_DAYS]));

        // String settings
        $this->appSettings->setStringSetting(AppSettings::SETTING_UPDATE_TYPE, $settingsArray[AppSettings::SETTING_UPDATE_TYPE]);
        $this->appSettings->setStringSetting(AppSettings::SETTING_PRIVACY_URL, $settingsArray[AppSettings::SETTING_PRIVACY_URL]);
        $this->appSettings->setStringSetting(AppSettings::SETTING_IMPRINT_URL, $settingsArray[AppSettings::SETTING_IMPRINT_URL]);
        $this->appSettings->setStringSetting(AppSettings::SETTING_DISCLAIMER, $settingsArray[AppSettings::SETTING_DISCLAIMER]);
        $this->appSettings->setStringSetting(AppSettings::SETTING_DEFAULT_PRIVACY_URL, $settingsArray[AppSettings::SETTING_DEFAULT_PRIVACY_URL]);
        $this->appSettings->setStringSetting(AppSettings::SETTING_DEFAULT_IMPRINT_URL, $settingsArray[AppSettings::SETTING_DEFAULT_IMPRINT_URL]);
        $this->appSettings->setStringSetting(AppSettings::SETTING_FINAL_PRIVACY_URL, $settingsArray[AppSettings::SETTING_FINAL_PRIVACY_URL]);
        $this->appSettings->setStringSetting(AppSettings::SETTING_FINAL_IMPRINT_URL, $settingsArray[AppSettings::SETTING_FINAL_IMPRINT_URL]);

        // New: Inquiry type settings
        $this->appSettings->setArraySetting(AppSettings::SETTING_INQUIRY_TYPE_RIGHTS, $settingsArray[AppSettings::SETTING_INQUIRY_TYPE_RIGHTS]);

        // New: Role rights settings
        $this->appSettings->setArraySetting(AppSettings::SETTING_MODERATOR_RIGHTS, $settingsArray[AppSettings::SETTING_MODERATOR_RIGHTS]);
        $this->appSettings->setArraySetting(AppSettings::SETTING_OFFICIAL_RIGHTS, $settingsArray[AppSettings::SETTING_OFFICIAL_RIGHTS]);
    }


    /**
     * Add a location
     */
    public function addLocation(array $locationData)
    {
        return $this->locationService->create(
            $locationData['name'] ?? '',
            $locationData['parentId'] ?? 0
        );
    }

    /**
     * Update a location
     */
    public function updateLocation(string $locationId, array $locationData)
    {
        return $this->locationService->update(
            (int)$locationId,
            $locationData['name'] ?? '',
            $locationData['parentId'] ?? 0
        );
    }

    /**
     * Delete a location
     */
    public function deleteLocation(string $locationId): void
    {
        $this->locationService->delete((int)$locationId);
    }

    /**
     * Add a moderation status
     */
    public function addModerationStatus(array $statusData)
    {
        return $this->moderationStatusService->create(
            $statusData['inquiryType'] ?? '',
            $statusData['statusKey'] ?? '',
            $statusData['label'] ?? '',
            $statusData['description'] ?? null,
            $statusData['isFinal'] ?? false,
            $statusData['icon'] ?? ''
        );
    }

    /**
     * Update a moderation status
     */
    public function updateModerationStatus(string $statusId, array $statusData)
    {
        return $this->moderationStatusService->update(
            (int)$statusId,
            $statusData['statusKey'] ?? '',
            $statusData['label'] ?? '',
            $statusData['description'] ?? null,
            $statusData['isFinal'] ?? false,
            $statusData['icon'] ?? ''
        );
    }

    /**
     * Delete a moderation status
     */
    public function deleteModerationStatus(string $statusId): void
    {
        $this->moderationStatusService->delete((int)$statusId);
    }

    /**
     * Add a category
     */
    public function addCategory(array $categoryData)
    {
        return $this->categoryService->create(
            $categoryData['name'] ?? '',
            $categoryData['parentId'] ?? 0
        );
    }

    /**
     * Update a category
     */
    public function updateCategory(string $categoryId, array $categoryData)
    {
        return $this->categoryService->update(
            (int)$categoryId,
            $categoryData['name'] ?? '',
            $categoryData['parentId'] ?? 0
            // Ajoutez d'autres paramètres selon votre implémentation CategoryService
        );
    }


    /**
     * Delete a category
     */
    public function deleteCategory(string $categoryId): void
    {
        $this->categoryService->delete((int)$categoryId);
    }

}
