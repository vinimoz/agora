<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { generateUrl } from '@nextcloud/router'
import { showError } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'
import DOMPurify from 'dompurify'
import { InquiryGeneralIcons } from '../utils/icons.ts'
import NcDashboardWidget from '@nextcloud/vue/components/NcDashboardWidget'
import { AgoraAppIcon } from '../components/AppIcons/index.ts'
import { Logger } from '../helpers/index.ts'
import { useInquiriesStore } from '../stores/inquiries.ts'
import { useSessionStore } from '../stores/session.ts'
import { 
  getInquiryTypeData,
  type InquiryType
} from '../helpers/modules/InquiryHelper.ts'

const sessionStore = useSessionStore()

const dashboardWidgetProperties = {
  emptyContentMessage: t('agora', 'No inquiries found for this category'),
  showMoreText: t('agora', 'Relevant inquiries'),
}

// Computed for all inquiry types
const allInquiryTypes = computed((): InquiryType[] => sessionStore.appSettings.inquiryTypeTab || [])
const inquiriesStore = useInquiriesStore()

/**
 * Load the store
 */
 function loadSessionStore(): void {
  try {
    sessionStore.load(null, false, false) // Ou sessionStore.load() si pas besoin de paramètres
  } catch {
    showError(t('agora', 'Error setting dashboard list'))
  }
}


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

// Function to get icon component for an inquiry based on its type
function getInquiryIconComponent(inquiry) {

  if (inquiry.type) {
    const typeData = getInquiryTypeData(inquiry.type, allInquiryTypes.value);

    // Try to determine what we're dealing with
    if (typeData?.icon) {
      return typeData.icon;
    }
  }

  return InquiryGeneralIcons.Flash;
}

onMounted(() => {
  loadSessionStore()
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
        <a :href="generateUrl(`/apps/agora/page/inquiry/${item.id}`)">
          <div class="inquiry-item__item">
            <div class="type-icon">
              <!-- Use the icon component directly -->
              <component 
                :is="getInquiryIconComponent(item)" 
                class="nav-icon" 
              />
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

.type-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  min-width: 44px;
  
  .nav-icon {
    width: 20px;
    height: 20px;
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
</style>
