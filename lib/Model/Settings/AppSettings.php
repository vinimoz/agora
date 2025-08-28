<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Model\Settings;

use JsonSerializable;
use OCA\Agora\AppConstants;
use OCA\Agora\Model\Group\Group;
use OCA\Agora\UserSession;
use OCP\IAppConfig;
use Psr\Log\LoggerInterface;

use OCA\Agora\Service\CategoryService;
use OCA\Agora\Service\LocationService;
use OCA\Agora\Service\ModerationStatusService;

class AppSettings implements JsonSerializable
{
    private const NO_GROUPCHECK = '';

    // Existing settings constants
    public const SETTING_ALLOW_PUBLIC_SHARES = 'allowPublicShares';
    public const SETTING_ALLOW_PUBLIC_SHARES_GROUPS = 'publicSharesGroups';

    public const SETTING_ALLOW_COMBO = 'allowCombo';
    public const SETTING_ALLOW_COMBO_GROUPS = 'comboGroups';

    public const SETTING_ALLOW_ALL_ACCESS = 'allowAllAccess';
    public const SETTING_ALLOW_ALL_ACCESS_GROUPS = 'allAccessGroups';

    public const SETTING_ALLOW_INQUIRY_CREATION = 'allowInquiryCreation';
    public const SETTING_ALLOW_INQUIRY_CREATION_GROUPS = 'inquiryCreationGroups';

    public const SETTING_ALLOW_INQUIRY_DOWNLOAD = 'allowInquiryDownload';
    public const SETTING_ALLOW_INQUIRY_DOWNLOAD_GROUPS = 'inquiryDownloadGroups';

    public const SETTING_SHOW_MAIL_ADDRESSES = 'showMailAddresses';
    public const SETTING_SHOW_MAIL_ADDRESSES_GROUPS = 'showMailAddressesGroups';

    public const SETTING_UNRESTRICTED_INQUIRY_OWNER = 'unrestrictedOwner';
    public const SETTING_UNRESTRICTED_INQUIRY_OWNER_GROUPS = 'unrestrictedOwnerGroups';

    public const SETTING_USE_SITE_LEGAL = 'useSiteLegalTerms';
    public const SETTING_LEGAL_TERMS_IN_EMAIL = 'legalTermsInEmail';
    public const SETTING_DISCLAIMER = 'disclaimer';
    public const SETTING_PRIVACY_URL = 'privacyUrl';
    public const SETTING_IMPRINT_URL = 'imprintUrl';

    public const SETTING_SHOW_LOGIN = 'showLogin';
    public const SETTING_USE_ACTIVITY = 'useActivity';
    public const SETTING_LOAD_INQUIRIES_IN_NAVIGATION = 'navigationInquiriesInList';

    public const SETTING_AUTO_ARCHIVE = 'autoArchive';
    public const SETTING_AUTO_ARCHIVE_DEFAULT = false;
    public const SETTING_AUTO_ARCHIVE_OFFSET_DAYS = 'autoArchiveOffset';
    public const SETTING_AUTO_ARCHIVE_OFFSET_DAYS_DEFAULT = 30;

    public const SETTING_AUTO_DELETE = 'autoDelete';
    public const SETTING_AUTO_DELETE_DEFAULT = false;
    public const SETTING_AUTO_DELETE_OFFSET_DAYS = 'autoDeleteOffset';
    public const SETTING_AUTO_DELETE_OFFSET_DAYS_DEFAULT = 30;

    public const SETTING_UPDATE_TYPE = 'updateType';
    public const SETTING_UPDATE_TYPE_LONG_INQUIRYING = 'longInquirying';
    public const SETTING_UPDATE_TYPE_NO_INQUIRYING = 'noInquirying';
    public const SETTING_UPDATE_TYPE_PERIODIC_INQUIRYING = 'periodicInquirying';
    public const SETTING_UPDATE_TYPE_DEFAULT = self::SETTING_UPDATE_TYPE_NO_INQUIRYING;

    // New settings constants
    public const SETTING_USE_COLLABORATION = 'useCollaboration';
    public const SETTING_USE_COLLABORATION_DEFAULT = true;

    public const SETTING_DEFAULT_PRIVACY_URL = 'defaultPrivacyUrl';
    public const SETTING_DEFAULT_IMPRINT_URL = 'defaultImprintUrl';
    public const SETTING_FINAL_PRIVACY_URL = 'finalPrivacyUrl';
    public const SETTING_FINAL_IMPRINT_URL = 'finalImprintUrl';

    // Array settings
    public const SETTING_CATEGORY_TAB = 'categoryTab';
    public const SETTING_LOCATION_TAB = 'locationTab';
    public const SETTING_MODERATION_STATUS = 'moderationStatusTab';
    public const SETTING_MODERATOR_RIGHTS = 'moderatorRights';
    public const SETTING_OFFICIAL_RIGHTS = 'officialRights';

    public const SETTING_INQUIRY_TYPE_RIGHTS = 'inquiryTypeRights';

    public function __construct(
        private IAppConfig $appConfig,
        private UserSession $userSession,
        private SystemSettings $systemSettings,
        protected LoggerInterface $logger,
        private ?CategoryService $categoryService,
        private ?LocationService $locationService,
        private ?ModerationStatusService $moderationStatusService,
    ) {
    }

    /**
     * Get all permissions as array
     */
    public function getPermissionsArray(): array
    {
        return [
        'allAccess' => $this->getAllAccessAllowed(),
        'addShares' => $this->systemSettings->getShareCreateAllowed(),
        'addSharesExternal' => $this->systemSettings->getShareCreateAllowed(),
        'changeForeignSupports' => $this->getIsUnrestrictedInquiryOwner(),
        'comboView' => $this->getComboAllowed(),
        'deanonymizeInquiry' => $this->getIsUnrestrictedInquiryOwner(),
        'inquiryCreation' => $this->getInquiryCreationAllowed(),
        'inquiryDownload' => $this->getInquiryDownloadAllowed(),
        'publicShares' => $this->getPublicSharesAllowed(),
        'seeMailAddresses' => $this->getAllowSeeMailAddresses(),
        'unrestrictedOwner' => $this->getIsUnrestrictedInquiryOwner(),
        'useCollaboration' => $this->getUseCollaboration(),
        ];
    }

    public function getAppSettings(): array
    {
        $appSettingsArray = [
        'finalPrivacyUrl' => '',
        'finalImprintUrl' => '',
        'useLogin' => true,
        'useSiteLegalTerms' => true,
        'useActivity' => false,
        'useCollaboration' => true,
        'navigationInquiriesInList' => false,
        'updateType' => $this->getUpdateType(),
        ];

        if ($this->userSession->getIsLoggedIn()) {
            return array_merge($appSettingsArray, $this->getInternalAppSettings());
        }

        return array_merge($appSettingsArray, $this->getPublicAppSettings());
    }
    public function getModeratorRights(): array
    {
        return $this->getArraySetting(
            self::SETTING_MODERATOR_RIGHTS, [
            'modifyInquiry' => true,
            'deleteInquiry' => true,
            'archiveInquiry' => true,
            ]
        );
    }

    public function getOfficialRights(): array
    {
        return $this->getArraySetting(
            self::SETTING_OFFICIAL_RIGHTS, [
            'modifyInquiry' => true,
            'deleteInquiry' => false,
            'archiveInquiry' => true,
            'approveInquiries' => true,
            'changeModerationStatus' => false
            ]
        );
    }
    /**
     * Get inquiry type rights
     */
    public function getInquiryTypeRights(): array
    {
        return $this->getArraySetting(
            self::SETTING_INQUIRY_TYPE_RIGHTS, [
            'proposal' => [
            'supportInquiry' => true,
            'commentInquiry' => true,
            'attachFileInquiry' => true,
            'editorType' => 'wysiwyg',
            ],
            'debate' => [
            'supportInquiry' => true,
            'commentInquiry' => true,
            'attachFileInquiry' => true,
            'editorType' => 'textarea',
            ],
            'petition' => [
            'supportInquiry' => true,
            'commentInquiry' => true,
            'attachFileInquiry' => true,
            'editorType' => 'wysiwyg',
            ],
            'project' => [
            'supportInquiry' => true,
            'commentInquiry' => true,
            'attachFileInquiry' => true,
            'editorType' => 'wysiwyg',
            ],
            'grievance' => [
            'supportInquiry' => true,
            'commentInquiry' => true,
            'attachFileInquiry' => true,
            'editorType' => 'wysiwyg',
            ],
            'suggestion' => [
            'supportInquiry' => true,
            'commentInquiry' => false,
            'attachFileInquiry' => false,
            'editorType' => 'textarea',
            ],
            'official' => [
            'supportInquiry' => false,
            'commentInquiry' => false,
            'attachFileInquiry' => false,
            'editorType' => 'textarea',
            ],
            ]
        );
    }

    /**
     * Set inquiry type rights
     */
    public function setInquiryTypeRights(array $rights): void
    {
        $this->setArraySetting(self::SETTING_INQUIRY_TYPE_RIGHTS, $rights);
    }


    public function setModeratorRights(array $rights): void
    {
        $this->setArraySetting(self::SETTING_MODERATOR_RIGHTS, $rights);
    }

    public function setOfficialRights(array $rights): void
    {
        $this->setArraySetting(self::SETTING_OFFICIAL_RIGHTS, $rights);
    }    


    /**
     * Get public app settings
     */
    private function getPublicAppSettings(): array
    {
        return [
        'finalPrivacyUrl' => $this->getFinalPrivacyUrl(),
        'finalImprintUrl' => $this->getFinalImprintUrl(),
        'useLogin' => $this->getShowLogin(),
        ];
    }

    /**
     * Get internal app settings
     */
    public function getInternalAppSettings(): array
    {
        return [
        'useActivity' => $this->getUseActivity(),
        'useCollaboration' => $this->getUseCollaboration(),
        'navigationInquiriesInList' => $this->getLoadInquiriesInNavigation(),
        // Array settings for internal use only
        'categoryTab' =>  $this->categoryService->findAll(),
        'locationTab' =>  $this->locationService->findAll(),
        'moderationStatusTab' =>  $this->moderationStatusService->findAll(),
        'inquiryTypeRights' => $this->getInquiryTypeRights(), 
        'moderatorRights' => $this->getModeratorRights(),
        'officialRights' => $this->getOfficialRights(),
        ];
    }

    private function checkSettingType(string $key, int $expectedType, string $app = AppConstants::APP_ID): bool
    {
        try {
            $actualType = $this->appConfig->getValueType($app, $key);
            if ($actualType === $expectedType || $actualType === IAppConfig::VALUE_MIXED) {
                return true;
            }

            $this->logger->debug(
                'Setting type does not match', [
                'app' => $app,
                'key' => $key,
                'expectedType' => $expectedType,
                'actualType' => $actualType,
                ]
            );

        } catch (\Exception $e) {
            $this->logger->debug(
                'Could not get setting type', [
                'app' => $app,
                'key' => $key,
                'expectedType' => $expectedType,
                'actualType' => null,
                'exception' => $e->getMessage()
                ]
            );
        }
        return false;
    }

    // Getters
    // generic Setters

    /**
     * Get the value of a boolean setting
     */
    public function getBooleanSetting(string $key, string $groupKey = self::NO_GROUPCHECK, bool $default = true, string $app = AppConstants::APP_ID): bool
    {
        // key missing or invalid, return default
        if (!$this->checkSettingType($key, IAppConfig::VALUE_BOOL, $app)) {
            return $default;
        }

        // no group check or user is not logged in, just return the boolean setting value
        if ($groupKey === self::NO_GROUPCHECK || !$this->userSession->getIsLoggedIn()) {
            return $this->appConfig->getValueBool($app, $key, $default);
        }

        // user is logged in and group check is required
        return $this->appConfig->getValueBool($app, $key, $default) || $this->isMember($this->getGroupSetting($groupKey));
    }

    /**
     * Set a boolean setting
     */
    public function setBooleanSetting(string $key, bool $value): void
    {
        $this->appConfig->setValueBool(AppConstants::APP_ID, $key, $value);
    }

    /**
     * Get the value of an group (array) setting
     */
    public function getGroupSetting(string $key, array $default = [], string $app = AppConstants::APP_ID): array
    {
        if (!$this->checkSettingType($key, IAppConfig::VALUE_ARRAY, $app)) {
            return $default;
        }
        return $this->appConfig->getValueArray($app, $key, $default);
    }

    /**
     * Set an array setting
     */
    public function setGroupSetting(string $key, array $value): void
    {
        $this->appConfig->setValueArray(AppConstants::APP_ID, $key, $value);
    }

    /**
     * Get the value of an integer setting
     */
    private function getIntegerSetting(string $key, int $default = 0, string $app = AppConstants::APP_ID): int
    {
        if (!$this->checkSettingType($key, IAppConfig::VALUE_INT, $app)) {
            return $default;
        }
        return $this->appConfig->getValueInt($app, $key, $default);
    }

    /**
     * Set a integer setting
     */
    public function setIntegerSetting(string $key, int $value): void
    {
        $this->appConfig->setValueInt(AppConstants::APP_ID, $key, $value);
    }

    /**
     * Get the value of a string setting
     */
    private function getStringSetting(string $key, string $default = '', string $app = AppConstants::APP_ID): string
    {
        if (!$this->checkSettingType($key, IAppConfig::VALUE_STRING, $app)) {
            return $default;
        }
        return $this->appConfig->getValueString($app, $key, $default);
    }

    /**
     * Set a string setting
     */
    public function setStringSetting(string $key, string $value): void
    {
        $this->appConfig->setValueString(AppConstants::APP_ID, $key, $value);
    }

    /**
     * Get array setting
     */
    public function getArraySetting(string $key, array $default = [], string $app = AppConstants::APP_ID): array
    {
        if (!$this->checkSettingType($key, IAppConfig::VALUE_ARRAY, $app)) {
            return $default;
        }

        $value = $this->appConfig->getValueArray($app, $key, []);
        if (empty($value)) {
            return $default;
        }

        return $value;
    }

    /**
     * Set array setting
     */
    public function setArraySetting(string $key, array $value): void
    {
        $this->appConfig->setValueArray(AppConstants::APP_ID, $key, $value);
    }

    // Checks
    /**
     * Inquiry creation permission is controlled by app settings
     */
    public function getInquiryCreationAllowed(): bool
    {
        return $this->getBooleanSetting(self::SETTING_ALLOW_INQUIRY_CREATION, self::SETTING_ALLOW_INQUIRY_CREATION_GROUPS);
    }

    /**
     * Inquiry creation permission is controlled by app settings
     */
    public function getIsUnrestrictedInquiryOwner(): bool
    {
        return $this->getBooleanSetting(self::SETTING_UNRESTRICTED_INQUIRY_OWNER, self::SETTING_UNRESTRICTED_INQUIRY_OWNER_GROUPS);
    }

    /**
     * Permission to see emailaddresses is controlled by app settings
     */
    public function getAllowSeeMailAddresses(): bool
    {
        return $this->getBooleanSetting(self::SETTING_SHOW_MAIL_ADDRESSES, self::SETTING_SHOW_MAIL_ADDRESSES_GROUPS);
    }

    /**
     * Permission to download emailaddresses is controlled by app settings
     */
    public function getInquiryDownloadAllowed(): bool
    {
        return $this->getBooleanSetting(self::SETTING_ALLOW_INQUIRY_DOWNLOAD, self::SETTING_ALLOW_INQUIRY_DOWNLOAD_GROUPS);
    }

    /**
     * Permission to share inquiries with all internal users is controlled by app settings (open inquiry)
     */
    public function getAllAccessAllowed(): bool
    {
        return $this->getBooleanSetting(self::SETTING_ALLOW_ALL_ACCESS, self::SETTING_ALLOW_ALL_ACCESS_GROUPS);
    }

    /**
     * Permission to create public shares is controlled by app settings
     */
    public function getPublicSharesAllowed(): bool
    {
        return $this->getBooleanSetting(self::SETTING_ALLOW_PUBLIC_SHARES, self::SETTING_ALLOW_PUBLIC_SHARES_GROUPS);
    }

    /**
     * Permission to combine inquiries is controlled by app settings and only for internal users
     */
    public function getComboAllowed(): bool
    {
        return $this->getBooleanSetting(self::SETTING_ALLOW_COMBO, self::SETTING_ALLOW_COMBO_GROUPS);
    }

    /**
     * Get whether to use collaboration features
     */
    public function getUseCollaboration(): bool
    {
        return $this->getBooleanSetting(self::SETTING_USE_COLLABORATION, default: self::SETTING_USE_COLLABORATION_DEFAULT);
    }

    /**
     * Get privacy url
     * Returns the final privacy url to use
     * Use URL from the app settings if set, otherwise use the default from the theming app
     */
    public function getFinalPrivacyUrl(): string
    {
        $privacyUrl = $this->getStringSetting(self::SETTING_PRIVACY_URL);
        if ($privacyUrl && !$this->getBooleanSetting(self::SETTING_USE_SITE_LEGAL)) {
            return $privacyUrl;
        }

        return $this->getStringSetting(key: 'privacyUrl', app: 'theming');
    }

    /**
     * Get imprint url
     * Returns the imprint url from the app settings if set,
     * otherwise the default from theming
     */
    public function getFinalImprintUrl(): string
    {
        $imprintUrl = $this->getStringSetting(self::SETTING_IMPRINT_URL);
        if ($imprintUrl && !$this->getBooleanSetting(self::SETTING_USE_SITE_LEGAL)) {
            return $imprintUrl;
        }

        return $this->getStringSetting(key: 'imprintUrl', app: 'theming');
    }

    /**
     * Get default privacy URL from theming
     */
    public function getDefaultPrivacyUrl(): string
    {
        return $this->getStringSetting(key: 'privacyUrl', app: 'theming');
    }

    /**
     * Get default imprint URL from theming
     */
    public function getDefaultImprintUrl(): string
    {
        return $this->getStringSetting(key: 'imprintUrl', app: 'theming');
    }

    /**
     * Get wether link to the imprint and privacy terms should be used in email footers
     */
    public function getUseLegalTermsInEmail(): bool
    {
        return $this->getBooleanSetting(self::SETTING_LEGAL_TERMS_IN_EMAIL);
    }

    /**
     * Get the disclaimer text
     */
    public function getDisclaimer(): string
    {
        return $this->appConfig->getValueString(AppConstants::APP_ID, self::SETTING_DISCLAIMER);
    }

    /**
     * Get the auto archive offset in days
     */
    public function getAutoArchiveOffsetDays(): int
    {
        return $this->getIntegerSetting(self::SETTING_AUTO_ARCHIVE_OFFSET_DAYS, self::SETTING_AUTO_ARCHIVE_OFFSET_DAYS_DEFAULT);
    }

    /**
     * Get the auto delete offset in days
     */
    public function getAutoDeleteOffsetDays(): int
    {
        return $this->getIntegerSetting(self::SETTING_AUTO_DELETE_OFFSET_DAYS, self::SETTING_AUTO_DELETE_OFFSET_DAYS_DEFAULT);
    }

    /**
     * Get the auto archive setting enabled or disabled
     */
    public function getAutoArchiveEnabled(): bool
    {
        return $this->getBooleanSetting(self::SETTING_AUTO_ARCHIVE, default: self::SETTING_AUTO_ARCHIVE_DEFAULT);
    }

    /**
     * Get the auto delete setting enabled or disabled
     */
    public function getAutoDeleteEnabled(): bool
    {
        return $this->getBooleanSetting(self::SETTING_AUTO_DELETE, default: self::SETTING_AUTO_DELETE_DEFAULT);
    }

    /**
     * Get the update type for frontend inquirying of new data
     * returning one of the following:
     * - longInquirying
     * - noInquirying
     * - periodicInquirying
     */
    public function getUpdateType(): string
    {
        return $this->appConfig->getValueString(AppConstants::APP_ID, self::SETTING_UPDATE_TYPE, self::SETTING_UPDATE_TYPE_DEFAULT);
    }

    /**
     * Get wether to show login button in the public register dialog
     */
    public function getShowLogin(): bool
    {
        return $this->getBooleanSetting(self::SETTING_SHOW_LOGIN);
    }

    /**
     * Get wether to use Activity app or not
     */
    public function getUseActivity(): bool
    {
        return $this->getBooleanSetting(self::SETTING_USE_ACTIVITY);
    }

    /**
     * Get wether to show inquiries in the navigation
     */
    public function getLoadInquiriesInNavigation(): bool
    {
        return $this->getBooleanSetting(self::SETTING_LOAD_INQUIRIES_IN_NAVIGATION);
    }

    /**
     * Get the group objects for the given settingsGroup
     *
     * @param        string $settingsGroup
     * @return       Group[]
     * @psalm-return array<Group>
     */
    private function getGroupObjects(string $settingsGroup): array
    {
        $groups = [];
        $groupIds = $this->getGroupSetting($settingsGroup);

        foreach ($groupIds as $group) {
            $groups[] = new Group($group);
        }

        return $groups;
    }

    /**
     * @return array
     *
     * @psalm-suppress PossiblyUnusedMethod
     */
    public function jsonSerialize(): array
    {
        return [
        // Existing settings
        self::SETTING_ALLOW_PUBLIC_SHARES => $this->getBooleanSetting(self::SETTING_ALLOW_PUBLIC_SHARES),
        self::SETTING_ALLOW_PUBLIC_SHARES_GROUPS => $this->getGroupObjects(self::SETTING_ALLOW_PUBLIC_SHARES_GROUPS),

        self::SETTING_ALLOW_COMBO => $this->getBooleanSetting(self::SETTING_ALLOW_COMBO),
        self::SETTING_ALLOW_COMBO_GROUPS => $this->getGroupObjects(self::SETTING_ALLOW_COMBO_GROUPS),

        self::SETTING_ALLOW_ALL_ACCESS => $this->getBooleanSetting(self::SETTING_ALLOW_ALL_ACCESS),
        self::SETTING_ALLOW_ALL_ACCESS_GROUPS => $this->getGroupObjects(self::SETTING_ALLOW_ALL_ACCESS_GROUPS),

        self::SETTING_ALLOW_INQUIRY_CREATION => $this->getBooleanSetting(self::SETTING_ALLOW_INQUIRY_CREATION),
        self::SETTING_ALLOW_INQUIRY_CREATION_GROUPS => $this->getGroupObjects(self::SETTING_ALLOW_INQUIRY_CREATION_GROUPS),

        self::SETTING_ALLOW_INQUIRY_DOWNLOAD => $this->getBooleanSetting(self::SETTING_ALLOW_INQUIRY_DOWNLOAD),
        self::SETTING_ALLOW_INQUIRY_DOWNLOAD_GROUPS => $this->getGroupObjects(self::SETTING_ALLOW_INQUIRY_DOWNLOAD_GROUPS),

        self::SETTING_UNRESTRICTED_INQUIRY_OWNER => $this->getBooleanSetting(self::SETTING_UNRESTRICTED_INQUIRY_OWNER),
        self::SETTING_UNRESTRICTED_INQUIRY_OWNER_GROUPS => $this->getGroupObjects(self::SETTING_UNRESTRICTED_INQUIRY_OWNER_GROUPS),

        self::SETTING_SHOW_MAIL_ADDRESSES => $this->getBooleanSetting(self::SETTING_SHOW_MAIL_ADDRESSES),
        self::SETTING_SHOW_MAIL_ADDRESSES_GROUPS => $this->getGroupObjects(self::SETTING_SHOW_MAIL_ADDRESSES_GROUPS),

        self::SETTING_AUTO_ARCHIVE => $this->getBooleanSetting(self::SETTING_AUTO_ARCHIVE, default: self::SETTING_AUTO_ARCHIVE_DEFAULT),
        self::SETTING_AUTO_ARCHIVE_OFFSET_DAYS => $this->getAutoArchiveOffsetDays(),

        self::SETTING_AUTO_DELETE => $this->getBooleanSetting(self::SETTING_AUTO_DELETE, default: self::SETTING_AUTO_DELETE_DEFAULT),
        self::SETTING_AUTO_DELETE_OFFSET_DAYS => $this->getAutoDeleteOffsetDays(),

        self::SETTING_USE_SITE_LEGAL => $this->getBooleanSetting(self::SETTING_USE_SITE_LEGAL),
        self::SETTING_LEGAL_TERMS_IN_EMAIL => $this->getBooleanSetting(self::SETTING_LEGAL_TERMS_IN_EMAIL),
        self::SETTING_DISCLAIMER => $this->appConfig->getValueString(AppConstants::APP_ID, self::SETTING_DISCLAIMER),
        self::SETTING_IMPRINT_URL => $this->appConfig->getValueString(AppConstants::APP_ID, self::SETTING_IMPRINT_URL),
        self::SETTING_PRIVACY_URL => $this->appConfig->getValueString(AppConstants::APP_ID, self::SETTING_PRIVACY_URL),
        self::SETTING_UPDATE_TYPE => $this->getUpdateType(),

        self::SETTING_USE_ACTIVITY => $this->getBooleanSetting(self::SETTING_USE_ACTIVITY),
        self::SETTING_LOAD_INQUIRIES_IN_NAVIGATION => $this->getBooleanSetting(self::SETTING_LOAD_INQUIRIES_IN_NAVIGATION),
        self::SETTING_SHOW_LOGIN => $this->getBooleanSetting(self::SETTING_SHOW_LOGIN),

        // New settings
        self::SETTING_USE_COLLABORATION => $this->getBooleanSetting(self::SETTING_USE_COLLABORATION, default: self::SETTING_USE_COLLABORATION_DEFAULT),

        'finalPrivacyUrl' => $this->getFinalPrivacyUrl(),
        'finalImprintUrl' => $this->getFinalImprintUrl(),
        'defaultPrivacyUrl' => $this->getDefaultPrivacyUrl(),
        'defaultImprintUrl' => $this->getDefaultImprintUrl(),

        // Array settings (only for internal users)
        self::SETTING_CATEGORY_TAB => $this->categoryService->findAll(),
        self::SETTING_LOCATION_TAB => $this->locationService->findAll(),
        self::SETTING_MODERATION_STATUS => $this->moderationStatusService->findAll(),
        self::SETTING_INQUIRY_TYPE_RIGHTS => $this->getInquiryTypeRights(),
        self::SETTING_MODERATOR_RIGHTS => $this->getModeratorRights(),
        self::SETTING_OFFICIAL_RIGHTS => $this->getOfficialRights(),
        ];
    }

    private function isMember(array $groups): bool
    {
        foreach ($groups as $GID) {
            if ($this->userSession->getCurrentUser()->getIsInGroup($GID)) {
                return true;
            }
        }
        return false;
    }
}
