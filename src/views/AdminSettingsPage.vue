<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { t } from '@nextcloud/l10n'

import NcSettingsSection from '@nextcloud/vue/components/NcSettingsSection'
import NcButton from '@nextcloud/vue/components/NcButton'

import { FlexSettings } from '../components/Base/index.ts'
import TemplateSetupWizard from '../components/Wizard/TemplateSetupWizard.vue'
import {
  AdminActivities,
  AdminArchiveInquiries,
  AdminExpireInquiries,
  AdminDeleteInquiries,
  AdminEmail,
  AdminModeration,
  AdminJobs,
  AdminLegal,
  AdminSettings,
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
import { useTemplateWizardStore } from '../stores/templateWizard.ts'
import '../assets/scss/markdown.scss'

const appSettingsStore = useAppSettingsStore()
const wizardStore = useTemplateWizardStore()
const isLoaded = ref(false)

const launchWizard = () => {
	wizardStore.openWizard()
}

const sections = {
  templateSetup: {
    name: t('agora', 'Template Setup Wizard'),
    description: t('agora', 'Configure your Agora instance using pre-built templates'),
  },
  inquiryCategoryLocation: {
    name: t('agora', 'Categories and Locations Management'),
    description: t('agora', 'Change globally location and category (for all accounts)'),
  },
  inquirySettings: {
    name: t('agora', 'Inquiry settings'),
    description: t('agora', 'Change inquiry settings globally (for all accounts)'),
  },
  shareSettings: {
    name: t('agora', 'Share settings'),
    description: t('agora', 'Change share settings globally (for all accounts)'),
  },
  otherSettings: {
    name: t('agora', 'Other settings'),
    description: t('agora', 'Enable or disable individual features'),
  },
  performanceSettings: {
    name: t('agora', 'Performance settings'),
    description: t(
      'agora',
      'If you are experiencing connection problems, change how auto updates are retrieved.'
    ),
  },
  globalSettings: {
    name: t('agora', 'Global inquiry settings'),
    description: t(
      'agora',
      'Let you configure, family, type of inquiries and associed rights, like comment, supports, status...'
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
  inquiryRights: {
    name: t('agora', 'Inquiry rights'),
    description: t('agora', 'Change inquiry rights globally (for all accounts)'),
  },
  moderationSettings: {
    name: t('agora', 'Moderation settings'),
    description: t('agora', 'Change moderation settings'),
  },
  jobSettings: {
    name: t('agora', 'Job control'),
    description: t('agora', 'Manually start backgropund jobs independent from the cron schedule'),
  },
}

onMounted(async () => {
  try {
    await appSettingsStore.load()

    // Check if database is empty for auto-launch
    await wizardStore.checkDatabaseEmpty()
    if (wizardStore.isDatabaseEmpty) {
      // Auto-launch wizard if database is empty
      wizardStore.openWizard()
    }
  } catch (error) {
    console.error('Failed to load data:', error)
  } finally {
    isLoaded.value = true
  }
})
</script>

<template>
	<div v-if="isLoaded">
		<!-- Template Setup Wizard -->
		<TemplateSetupWizard />

		<FlexSettings>
		<NcSettingsSection>
		<!-- Template Setup Wizard Section -->
		<NcSettingsSection v-bind="sections.templateSetup">
			<p>{{ t('agora', 'Use the setup wizard to quickly configure your Agora instance with pre-built templates for citizen participation, enterprise, or education use cases.') }}</p>
			<NcButton
				type="primary"
				@click="launchWizard">
				{{ t('agora', 'Launch Setup Wizard') }}
			</NcButton>
		</NcSettingsSection>

		<NcSettingsSection v-bind="sections.globalSettings">
		<AdminSettings />
		</NcSettingsSection>
		<NcSettingsSection v-bind="sections.inquirySettings">
		<AdminInquiryCreation />
		<AdminUnrescrictedOwners />
		<AdminExpireInquiries />
		<AdminArchiveInquiries />
		<AdminDeleteInquiries />
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
		</NcSettingsSection>
		<NcSettingsSection>
		<NcSettingsSection v-bind="sections.inquiryCategoryLocation">
		<AdminCategoryLocation />
		</NcSettingsSection>
		<NcSettingsSection v-bind="sections.moderationSettings">
		<AdminModeration />
		</NcSettingsSection>
	        <NcSettingsSection v-bind="sections.inquiryRights">
        	  <AdminModeratorRights />
          	  <AdminOfficialRights />
                </NcSettingsSection>
		<NcSettingsSection v-bind="sections.emailSettings">
		<AdminEmail />
		</NcSettingsSection>
		<NcSettingsSection v-bind="sections.performanceSettings">
		<AdminPerformance />
		<AdminInquiriesInNavigation />
		</NcSettingsSection>
		<NcSettingsSection v-bind="sections.jobSettings">
		<AdminJobs />
		</NcSettingsSection>
		</NcSettingsSection>
		</FlexSettings>
	</div>
</template>
