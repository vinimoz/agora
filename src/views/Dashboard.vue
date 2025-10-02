<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { onMounted } from 'vue'
import { generateUrl } from '@nextcloud/router'
import { showError } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'
import DOMPurify from 'dompurify'

import NcDashboardWidget from '@nextcloud/vue/components/NcDashboardWidget'

import { InquiryTypesUI } from '../helpers/modules/InquiryHelper.ts'
import { AgoraAppIcon } from '../components/AppIcons/index.ts'
import { Logger } from '../helpers/index.ts'
import { useInquiriesStore } from '../stores/inquiries.ts'

const dashboardWidgetProperties = {
  emptyContentMessage: t('agora', 'No inquiries found for this category'),
  showMoreText: t('agora', 'Relevant inquiries'),
}

const inquiriesStore = useInquiriesStore()

/**
 * Load the inquiries
 */
function loadInquiries(): void {
  Logger.debug('Loading inquiries in dashboard widget')

  try {
    inquiriesStore.load()
  } catch {
    showError(t('agora', 'Error setting dashboard list'))
  }
}

onMounted(() => {
  loadInquiries()
})
</script>

<template>
  <div>
    <NcDashboardWidget
      :items="inquiriesStore.dashboardList"
      :empty-content-message="dashboardWidgetProperties.emptyContentMessage"
      :show-more-text="dashboardWidgetProperties.showMoreText"
      :loading="inquiriesStore.inquiriesLoading"
    >
      <template #emptyContentIcon>
        <AgoraAppIcon />
      </template>

      <template #default="{ item }">
        <a :href="generateUrl(`/apps/agora/inquiry/${item.id}`)">
          <div class="inquiry-item__item">
            <div class="type-icon">
              <component :is="InquiryTypesUI[item.type].icon" />
            </div>

            <div class="item__title">
              <div class="item__title__title">
                {{ item.title }}
              </div>

              <div class="item__title__description">
                {{
                  DOMPurify.sanitize(
                    item.description ? item.description : t('agora', 'No description provided')
                  )
                }}
              </div>
            </div>
          </div>
        </a>
      </template>
    </NcDashboardWidget>
  </div>
</template>

<style lang="scss" scoped>
.inquiry-item__item {
  display: flex;
  padding: 4px 0;

  &.active {
    background-color: var(--color-primary-element-light);
  }

  &:hover {
    background-color: var(--color-background-hover);
  }
}

.item__title {
  display: flex;
  flex-direction: column;
  overflow: hidden;

  * {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item__title__description {
    opacity: 0.5;
  }
}

.item__icon-spacer {
  width: 44px;
  min-width: 44px;
}
</style>
