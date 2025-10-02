<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { t } from '@nextcloud/l10n'

import SpeakerIcon from 'vue-material-design-icons/Bullhorn.vue'
import SpeakerBigIcon from 'vue-material-design-icons/BullhornVariant.vue'
import DescriptionIcon from 'vue-material-design-icons/TextBox.vue'

import { ConfigBox } from '../Base/index.ts'

import { useInquiryGroupsStore } from '../../stores/inquiryGroups.ts'
import { showError, showInfo } from '@nextcloud/dialogs'
import { useRoute } from 'vue-router'
import { router } from '../../router.ts'
import ConfigTitleInquiryGroup from './ConfigNameInquiryGroup.vue'
import ConfigTitleExtInquiryGroup from './ConfigTitleExtInquiryGroup.vue'
import ConfigDescriptionInquiryGroup from './ConfigDescriptionInquiryGroup.vue'

const inquiryGroupsStore = useInquiryGroupsStore()

const route = useRoute()

async function updateInquiryGroup() {
  try {
    // block the modal to prevent double submission
    inquiryGroupsStore.updating = true
    const inquiryGroup = await inquiryGroupsStore.writeCurrentInquiryGroup()
    if (inquiryGroup) {
      if (route.name === 'group' && inquiryGroup.slug !== route.params.slug) {
        // if the slug has changed, we need to reroute
        router.push({
          name: 'group',
          params: { slug: inquiryGroup.slug },
        })
        showInfo(t('inquiries', 'Note: Based on the name change, the URL has also changed'))
      }
    }
  } catch {
    showError(t('agora', 'Error updating inquiry group'))
  } finally {
    inquiryGroupsStore.updating = false
  }
}
</script>

<template>
  <div class="edit-inquiry-group">
    <ConfigBox :name="t('agora', 'Name')">
      <template #icon>
        <SpeakerIcon />
      </template>

      <ConfigTitleInquiryGroup @change="updateInquiryGroup" />
    </ConfigBox>

    <ConfigBox :name="t('agora', 'Extended title')">
      <template #icon>
        <SpeakerBigIcon />
      </template>
      <ConfigTitleExtInquiryGroup @change="updateInquiryGroup" />
    </ConfigBox>

    <ConfigBox :name="t('agora', 'Description')">
      <template #icon>
        <DescriptionIcon />
      </template>
      <ConfigDescriptionInquiryGroup @change="updateInquiryGroup" />
    </ConfigBox>
  </div>
</template>

<style lang="scss">
.edit-inquiry-group {
  background-color: var(--color-main-background);
  padding: 8px 20px;

  .create-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }

  .input-textarea {
    width: 99%;
    resize: vertical;
  }

  .helper {
    min-height: 1.5rem;
    font-size: 0.8em;
    opacity: 0.8;
  }
}
</style>
