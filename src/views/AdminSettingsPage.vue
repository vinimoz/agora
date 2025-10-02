<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { t } from '@nextcloud/l10n'

import NcSettingsSection from '@nextcloud/vue/components/NcSettingsSection'

import { FlexSettings } from '../components/Base/index.ts'
import {
  AdminActivities,
  AdminArchiveInquiries,
  AdminDeleteInquiries,
  AdminEmail,
  AdminModerationStatus,
  AdminJobs,
  AdminLegal,
  AdminInquiryRights,
  AdminModeratorRights,
  AdminOfficialRights,
  AdminCategoryLocation,
  AdminPerformance,
  AdminInquiryCreation,
  AdminInquiriesInNavigation,
  AdminShareOpenInquiry,
  AdminSharePublicCreate,
  AdminSharePublicShowLogin,
  AdminShowMailAddresses,
  AdminUnrescrictedOwners,
} from '../components/Settings/AdminSettings/index.ts'
import { useAppSettingsStore } from '../stores/appSettings.ts'
import '../assets/scss/markdown.scss'

const appSettingsStore = useAppSettingsStore()
const isLoaded = ref(false)

const sections = {
  inquiryCategoryLocation: {
    name: t('agora', 'Categories and Locations Management'),
    description: t('agora', 'Change globally location and category (for all accounts)'),
  },
  inquiryModerationStatus: {
    name: t('agora', 'Moderation status settings'),
    description: t(
      'agora',
      'Configure moderation statuses for each type of inquiry. Moderators will be able to set these statuses on inquiries.'
    ),
  },
  inquirySettings: {
    name: t('agora', 'Inquiry settings'),
    description: t('agora', 'Change inquiry settings globally (for all accounts)'),
  },
  inquiryRights: {
    name: t('agora', 'Inquiry rights'),
    description: t('agora', 'Change inquiry rights globally (for all accounts)'),
  },
  shareSettings: {
    name: t('agora', 'Share settings'),
    description: t('agora', 'Change share settings globally (for all accounts)'),
  },
  otherSettings: {
    name: t('agora', 'Other settings'),
    description: t('agora', 'Enable or disable individual features.'),
  },
  performanceSettings: {
    name: t('agora', 'Performance settings'),
    description: t(
      'agora',
      'If you are experiencing connection problems, change how auto updates are retrieved.'
    ),
  },
  publicSettings: {
    name: t('agora', 'Public inquiry registration dialog options'),
    description: t(
      'agora',
      'These options regard the appearence of the registration dialog of public inquiries.'
    ),
  },
  emailSettings: {
    name: t('agora', 'Email options'),
    description: t(
      'agora',
      'Add links to legal terms, if they exist and add an optional disclaimer to emails.'
    ),
  },
  jobSettings: {
    name: t('agora', 'Job control'),
    description: t('agora', 'Manually start backgropund jobs, independent from the cron schedule.'),
  },
}

onMounted(async () => {
  try {
    await appSettingsStore.load()
  } catch (error) {
    console.error('Failed to load data:', error)
  } finally {
    isLoaded.value = true
  }
})
</script>

<template>
  <div v-if="isLoaded">
    <FlexSettings>
      <NcSettingsSection>
        <NcSettingsSection v-bind="sections.inquirySettings">
          <AdminInquiryCreation />
          <AdminUnrescrictedOwners />
          <AdminArchiveInquiries />
          <AdminDeleteInquiries />
        </NcSettingsSection>
        <NcSettingsSection v-bind="sections.inquiryRights">
          <AdminInquiryRights />
          <AdminModeratorRights />
          <AdminOfficialRights />
        </NcSettingsSection>
        <NcSettingsSection v-bind="sections.shareSettings">
          <AdminShareOpenInquiry />
          <AdminSharePublicCreate />
          <AdminSharePublicShowLogin />
          <AdminLegal />
        </NcSettingsSection>
        <NcSettingsSection v-bind="sections.otherSettings">
          <AdminActivities />
          <AdminShowMailAddresses />
        </NcSettingsSection>

        <NcSettingsSection v-bind="sections.performanceSettings">
          <AdminPerformance />
          <AdminInquiriesInNavigation />
        </NcSettingsSection>

        <NcSettingsSection v-bind="sections.emailSettings">
          <AdminEmail />
        </NcSettingsSection>
      </NcSettingsSection>
      <NcSettingsSection>
        <NcSettingsSection v-bind="sections.inquiryCategoryLocation">
          <AdminCategoryLocation />
        </NcSettingsSection>

        <NcSettingsSection v-bind="sections.inquiryModerationStatus">
          <AdminModerationStatus />
        </NcSettingsSection>
      </NcSettingsSection>
      <NcSettingsSection>
        <NcSettingsSection v-bind="sections.jobSettings">
          <AdminJobs />
        </NcSettingsSection>
      </NcSettingsSection>
    </FlexSettings>
  </div>
</template>
