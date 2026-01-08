<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { onMounted } from 'vue'
import { showError } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'
import NcAppNavigation from '@nextcloud/vue/components/NcAppNavigation'
import NcAppNavigationItem from '@nextcloud/vue/components/NcAppNavigationItem'
import NcAppNavigationList from '@nextcloud/vue/components/NcAppNavigationList'
import NcCounterBubble from '@nextcloud/vue/components/NcCounterBubble'
import InquiryNavigationItems from '../components/Navigation/InquiryNavigationItems.vue'
import { NavigationIcons } from '../utils/icons.ts'
import { FilterType, useInquiriesStore } from '../stores/inquiries.ts'
import { useInquiryGroupsStore } from '../stores/inquiryGroups.ts'
import { useSessionStore } from '../stores/session.ts'
import { NcAppNavigationSpacer } from '@nextcloud/vue'


const inquiriesStore = useInquiriesStore()
const inquiryGroupsStore = useInquiryGroupsStore()
const sessionStore = useSessionStore()

const iconSize = 20

const icons = {
  relevant: {
    id: 'relevant',
    iconComponent: NavigationIcons.Relevant,
  },
  my: {
    id: 'my',
    iconComponent: NavigationIcons.MyInquiries,
  },
  private: {
    id: 'private',
    iconComponent: NavigationIcons.Private,
  },
  participated: {
    id: 'participated',
    iconComponent: NavigationIcons.Participated,
  },
  open: {
    id: 'open',
    iconComponent: NavigationIcons.Open,
  },
  all: {
    id: 'all',
    iconComponent: NavigationIcons.All,
  },
  closed: {
    id: 'closed',
    iconComponent: NavigationIcons.Closed,
  },
  archived: {
    id: 'archived',
    iconComponent: NavigationIcons.Archive,
  },
  admin: {
    id: 'admin',
    iconComponent: NavigationIcons.Administration,
  },
  moderate: {
    id: 'moderate',
    iconComponent: NavigationIcons.Moderate,
  },
}

/**
 * Get icon component for a specific filter type
 * @param iconId
 */
function getIconComponent(iconId: FilterType) {
  return icons[iconId].iconComponent
}

/**
 * Toggle archive status of an inquiry
 * @param inquiryId
 */
function toggleArchive(inquiryId: number) {
  try {
    inquiriesStore.toggleArchive({ inquiryId })
  } catch {
    showError(t('agora', 'Failed to archive or restore the inquiry'))
  }
}

/**
 * Delete a inquiry
 * @param inquiryId inquiry id to delete
 */
function deleteInquiry(inquiryId: number) {
  try {
    inquiriesStore.delete({ inquiryId })
  } catch {
    showError(t('agora', 'Error deleting inquiry'))
  }
}

// Methods
function navigateToHome() {
  router.push({ name: 'menu', 
  query: {} })
}

onMounted(() => {
  inquiriesStore.load(false)
})
</script>

<template>
  <NcAppNavigation class="agora-navigation" aria-label="Agora Navigation"  >
    <!-- Navigation List -->
    <template #list>
      <!-- Groups Section -->
      <NcAppNavigationList v-if="inquiryGroupsStore.inquiryGroupsSorted.length > 0">
        <h3 class="navigation-caption">
          {{ t('agora', 'Categories') }}
        </h3>
        <NcAppNavigationItem
          v-for="inquiryGroup in inquiryGroupsStore.inquiryGroupsSorted"
          :key="inquiryGroup.id"
          :name="inquiryGroup.title"
          :title="inquiryGroup.titleExt"
          allow-collapse
          :to="{
            name: 'group',
            params: { id: inquiryGroup.id },
          }"
          class="navigation-item"
          :open="false"
        >
          <template #icon>
            <Component :is="NavigationIcons.Group" />
          </template>
          <template #counter>
            <NcCounterBubble
              :count="inquiryGroupsStore.countInquiriesInInquiryGroups[inquiryGroup.id]"
              class="navigation-counter"
            />
          </template>
          <ul
            v-if="sessionStore.appSettings.navigationInquiriesInList"
            class="navigation-sublist"
          >
            <!-- <InquiryNavigationItems
              v-for="inquiry in inquiriesStore.groupList(inquiryGroup.inquiryIds)"
              :key="inquiry.id"
              :inquiry="inquiry"
              @toggle-archive="toggleArchive(inquiry.id)"
              @delete-inquiry="deleteInquiry(inquiry.id)"
	      /> -->
            <NcAppNavigationItem
              v-if="inquiriesStore.groupList(inquiryGroup.inquiryIds).length === 0"
              :name="t('agora', 'No inquiries found')"
              class="navigation-empty"
            />
            <NcAppNavigationItem
              v-if="inquiryGroup.inquiryIds.length > inquiriesStore.meta.maxInquiriesInNavigation"
              class="force-not-active"
              :to="{
                name: 'group',
                params: { id : inquiryGroup.id },
              }"
              :name="t('agora', 'View all')"
            >
              <template #icon>
                <Component :is="NavigationIcons.GoTo" />
              </template>
            </NcAppNavigationItem>
          </ul>
        </NcAppNavigationItem>
      </NcAppNavigationList>

      <NcAppNavigationSpacer v-if="inquiryGroupsStore.inquiryGroups.length" />

      <!-- Filters Section -->
      <NcAppNavigationList>
        <h3 class="navigation-caption">
          {{ t('agora', 'Filters') }}
        </h3>
        <NcAppNavigationItem
          v-for="inquiryCategory in inquiriesStore.navigationCategories"
          :key="inquiryCategory.id"
          :name="inquiryCategory.title"
          :title="inquiryCategory.titleExt"
          :allow-collapse="sessionStore.appSettings.navigationInquiriesInList"
          :pinned="inquiryCategory.pinned"
          :to="{
            name: 'list',
            params: { type: inquiryCategory.id },
          }"
          class="navigation-item"
          :open="false"
        >
          <template #icon>
            <Component :is="getIconComponent(inquiryCategory.id)" :size="iconSize" />
          </template>
          <template #counter>
            <NcCounterBubble
              :count="inquiriesStore.inquiriesCount[inquiryCategory.id]"
              class="navigation-counter"
            />
          </template>
          <ul
            v-if="sessionStore.appSettings.navigationInquiriesInList"
            class="navigation-sublist"
          >
            <InquiryNavigationItems
              v-for="inquiry in inquiriesStore.navigationList(inquiryCategory.id)"
              :key="inquiry.id"
              :inquiry="inquiry"
              @toggle-archive="toggleArchive(inquiry.id)"
              @delete-inquiry="deleteInquiry(inquiry.id)"
            />
            <NcAppNavigationItem
              v-if="inquiriesStore.navigationList(inquiryCategory.id).length === 0"
              :name="t('agora', 'No inquiries found')"
              class="navigation-empty"
            />
            <NcAppNavigationItem
              v-if="
                inquiriesStore.navigationList(inquiryCategory.id) >
                inquiriesStore.meta.maxInquiriesInNavigation
              "
              class="force-not-active"
              :to="{
                name: 'list',
                params: { type: inquiryCategory.id },
              }"
              :name="t('agora', 'View all')"
            >
              <template #icon>
                <Component :is="NavigationIcons.GoTo" />
              </template>
            </NcAppNavigationItem>
          </ul>
        </NcAppNavigationItem>
      </NcAppNavigationList>
      <NcAppNavigationSpacer />

      <!-- Quick Actions Section -->
      <NcAppNavigationList>
      <h3 class="navigation-caption">
          {{ t('agora', 'Quick Actions') }}
      </h3>

      <NcAppNavigationItem
              :name="t('agora', 'Home')"
              :to="{
                   name: 'menu',
                   }"
              :exact="true"
              class="navigation-item"
              >
              <template #icon>
                  <component :is="NavigationIcons.Home" />
              </template>
      </NcAppNavigationItem>
      </NcAppNavigationList>
    </template>
  </NcAppNavigation>
</template>


<style lang="scss">
.agora-navigation {
    padding: 12px 0;
}

.navigation-header {
    padding: 12px;
    border-bottom: 1px solid var(--color-border);
}

.navigation-new-btn {
    width: 100%;
    justify-content: center;
}

.navigation-caption {
    font-size: 12px;
    font-weight: 600;
    color: var(--color-text-lighter);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0 12px 8px 12px;
    padding: 0;
}

  .navigation-item {
      margin: 2px 8px;
      border-radius: 8px;

      &:hover {
          background-color: var(--color-background-hover);
      }

      &.active {
          background-color: var(--color-primary-light);

          :deep(.app-navigation-entry__title) {
              font-weight: 600;
          }
      }
  }

  .navigation-counter {
      font-weight: 600;
  }

  .navigation-sublist {
      margin-left: 12px;
      border-left: 1px solid var(--color-border);
      padding: 0;

      :deep(.app-navigation-entry) {
          padding-left: 20px;

          .app-navigation-entry__description {
              font-size: 12px;
              color: var(--color-text-lighter);
              margin-top: 2px;
          }
      }
  }

  .navigation-empty {
      opacity: 0.7;
      font-style: italic;
  }


  // Override default navigation styles without :deep() nesting
      :deep(.app-navigation__body) {
      overflow: revert;
  }

  :deep(.app-navigation-entry-icon),
  :deep(.app-navigation-entry__title) {
      transition: opacity 0.2s ease;
  }

  :deep(.app-navigation-entry.active .app-navigation-entry-icon),
  :deep(.app-navigation-entry.active .app-navigation-entry__title) {
      opacity: 1;
  }

  .closed {
      :deep(.app-navigation-entry-icon),
      :deep(.app-navigation-entry__title) {
          opacity: 0.6;
      }
  }

  .force-not-active {
      :deep(.app-navigation-entry.active) {
          background-color: transparent !important;

          * {
              color: unset !important;
          }
      }
  }

  // Responsive adjustments
@media (max-width: 768px) {
      .agora-navigation {
          padding: 8px 0;
      }
  }

  // Dark theme adjustments
      .theme--dark {
      .navigation-sublist {
          background: var(--color-background-darker);
      }
  }
</style>
