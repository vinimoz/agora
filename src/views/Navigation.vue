<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { showError } from '@nextcloud/dialogs'
import { emit } from '@nextcloud/event-bus'
import { t } from '@nextcloud/l10n'
import NcAppNavigation from '@nextcloud/vue/components/NcAppNavigation'
import NcAppNavigationNew from '@nextcloud/vue/components/NcAppNavigationNew'
import NcAppNavigationItem from '@nextcloud/vue/components/NcAppNavigationItem'
import NcCounterBubble from '@nextcloud/vue/components/NcCounterBubble'
import InquiryNavigationItems from '../components/Navigation/InquiryNavigationItems.vue'
import { NavigationIcons } from '../utils/icons.ts'
import InquiryCreateDlg from '../components/Create/InquiryCreateDlg.vue'
import { FilterType, useInquiriesStore } from '../stores/inquiries.ts'
import { useInquiryGroupsStore } from '../stores/inquiryGroups.ts'
import { useSessionStore } from '../stores/session.ts'
import ActionAddInquiry from '../components/Actions/modules/ActionAddInquiry.vue'
import { usePreferencesStore } from '../stores/preferences.ts'
import { Event } from '../Types/index.ts'
import { useRouter } from 'vue-router'
import { NcAppNavigationSpacer } from '@nextcloud/vue'

const router = useRouter()

const inquiriesStore = useInquiriesStore()
const inquiryGroupsStore = useInquiryGroupsStore()
const sessionStore = useSessionStore()
const preferencesStore = usePreferencesStore()

const iconSize = 20

const icons = {
  relevant: {
    id: 'relevant',
    iconComponent: NavigationIcons.relevant,
  },
  my: {
    id: 'my',
    iconComponent: NavigationIcons.myInquiries,
  },
  private: {
    id: 'private',
    iconComponent: NavigationIcons.private,
  },
  participated: {
    id: 'participated',
    iconComponent: NavigationIcons.participated,
  },
  open: {
    id: 'open',
    iconComponent: NavigationIcons.open,
  },
  all: {
    id: 'all',
    iconComponent: NavigationIcons.all,
  },
  closed: {
    id: 'closed',
    iconComponent: NavigationIcons.closed,
  },
  archived: {
    id: 'archived',
    iconComponent: NavigationIcons.archived,
  },
  admin: {
    id: 'admin',
    iconComponent: NavigationIcons.administration,
  },
}

const createDlgToggle = ref(false)

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
    showError(t('agora', 'Error archiving/restoring inquiry.'))
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
    showError(t('agora', 'Error deleting inquiry.'))
  }
}

/**
 * Show the settings dialog
 */
function showSettings() {
  emit(Event.ShowSettings, null)
}

/**
 * Handle inquiry creation
 * @param payLoad
 * @param payLoad.id
 * @param payLoad.title
 */
async function inquiryAdded(payLoad: { id: number; title: string }) {
  createDlgToggle.value = false
  router.push({
    name: 'inquiry',
    params: { id: payLoad.id },
  })
}

onMounted(() => {
  inquiriesStore.load(false)
})
</script>

<template>
  <NcAppNavigation class="agora-navigation" aria-label="Agora Navigation">
    <!-- New Inquiry Button -->
    <ActionAddInquiry
      v-if="
        preferencesStore.useActionAddInquiryInNavigation &&
        sessionStore.appPermissions.inquiryCreation
      "
      :button-mode="'navigation'"
    />

    <div class="agora-navigation__header">
      <NcAppNavigationNew
        v-if="preferencesStore.useNcAppNavigationNew && sessionStore.appPermissions.inquiryCreation"
        :text="t('agora', 'New inquiry')"
        button-class="icon-add"
        class="agora-navigation__new-btn"
        @click="createDlgToggle = !createDlgToggle"
      >
        <template #icon>
          <Component :is="NavigationIcons.add" />
        </template>
      </NcAppNavigationNew>
    </div>

    <InquiryCreateDlg
      v-show="createDlgToggle"
      @added="inquiryAdded"
      @close="createDlgToggle = false"
    />

    <!-- Navigation List -->
    <template #list>
      <!-- Groups Section -->
      <div
        v-if="inquiryGroupsStore.inquiryGroupsSorted.length > 0"
        class="agora-navigation__section"
      >
        <h3 class="agora-navigation__section-title">
          {{ t('agora', 'Categories') }}
        </h3>
        <NcAppNavigationItem
          v-for="inquiryGroup in inquiryGroupsStore.inquiryGroupsSorted"
          :key="inquiryGroup.id"
          :name="inquiryGroup.name"
          :title="inquiryGroup.titleExt"
          allow-collapse
          :to="{
            name: 'group',
            params: { slug: inquiryGroup.slug },
          }"
          class="agora-navigation__group-item"
          :open="false"
        >
          <template #icon>
            <Component :is="NavigationIcons.group" />
          </template>
          <template #counter>
            <NcCounterBubble
              :count="inquiryGroupsStore.countInquiriesInInquiryGroups[inquiryGroup.id]"
              class="agora-navigation__counter"
            />
          </template>
          <ul
            v-if="sessionStore.appSettings.navigationInquiriesInList"
            class="agora-navigation__sub-list"
          >
            <InquiryNavigationItems
              v-for="inquiry in inquiriesStore.groupList(inquiryGroup.inquiryIds)"
              :key="inquiry.id"
              :inquiry="inquiry"
              @toggle-archive="toggleArchive(inquiry.id)"
              @delete-inquiry="deleteInquiry(inquiry.id)"
            />
            <NcAppNavigationItem
              v-if="inquiriesStore.groupList(inquiryGroup.inquiryIds).length === 0"
              :name="t('agora', 'No inquiries found')"
              class="agora-navigation__empty"
            />
            <NcAppNavigationItem
              v-if="inquiryGroup.inquiryIds.length > inquiriesStore.meta.maxInquiriesInNavigation"
              class="force-not-active"
              :to="{
                name: 'group',
                params: { slug: inquiryGroup.slug },
              }"
              :name="t('agora', 'View all')"
            >
              <template #icon>
                <Component :is="NavigationIcons.goTo" />
              </template>
            </NcAppNavigationItem>
          </ul>
        </NcAppNavigationItem>
      </div>

      <NcAppNavigationSpacer v-if="inquiryGroupsStore.inquiryGroups.length" />

      <!-- Filters Section -->
      <div class="agora-navigation__section">
        <h3 class="agora-navigation__section-title">
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
          class="agora-navigation__filter-item"
          :open="false"
        >
          <template #icon>
            <Component :is="getIconComponent(inquiryCategory.id)" :size="iconSize" />
          </template>
          <template #counter>
            <NcCounterBubble
              :count="inquiriesStore.inquiriesCount[inquiryCategory.id]"
              class="agora-navigation__counter"
            />
          </template>
          <ul
            v-if="sessionStore.appSettings.navigationInquiriesInList"
            class="agora-navigation__sub-list"
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
              class="agora-navigation__empty"
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
                <Component :is="NavigationIcons.goTo" />
              </template>
            </NcAppNavigationItem>
          </ul>
        </NcAppNavigationItem>
      </div>
    </template>

    <!-- Footer -->
    <template #footer>
      <ul class="agora-navigation__footer">
        <NcAppNavigationItem
          :name="t('agora', 'Settings')"
          class="agora-navigation__footer-item"
          @click="showSettings()"
        >
          <template #icon>
            <Component :is="NavigationIcons.settings" />
          </template>
        </NcAppNavigationItem>
      </ul>
    </template>
  </NcAppNavigation>
</template>

<style lang="scss">
.agora-navigation {
  &__header {
    padding: 12px;
    border-bottom: 1px solid var(--color-border);
  }

  &__new-btn {
    width: 100%;
    justify-content: center;
  }

  &__section {
    margin-top: 12px;

    &-title {
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      color: var(--color-text-lighter);
      margin: 0 12px 8px;
      letter-spacing: 0.5px;
    }
  }

  &__group-item,
  &__filter-item {
    margin: 2px 8px;
    border-radius: 8px;

    &:hover {
      background-color: var(--color-background-hover);
    }

    &.active {
      background-color: var(--color-primary-light);

      .app-navigation-entry__title {
        font-weight: 600;
      }
    }
  }

  &__counter {
    font-weight: 600;
  }

  &__sub-list {
    margin-left: 12px;
    border-left: 1px solid var(--color-border);
  }

  &__empty {
    opacity: 0.7;
    font-style: italic;
  }

  &__view-all {
    color: var(--color-primary);
    font-weight: 500;

    &:hover {
      color: var(--color-primary-text);
    }
  }

  &__footer {
    border-top: 1px solid var(--color-border);
    padding: 8px 0;

    &-item {
      margin: 0 8px;
      border-radius: 8px;

      &:hover {
        background-color: var(--color-background-hover);
      }
    }
  }
}

// Override default navigation styles
.app-agora {
  .app-navigation {
    &__body {
      overflow: revert;
    }

    &-entry {
      &-icon,
      &__title {
        transition: opacity 0.2s ease;
      }

      &.active {
        .app-navigation-entry-icon,
        .app-navigation-entry__title {
          opacity: 1;
        }
      }
    }
  }
}

.closed {
  .app-navigation-entry-icon,
  .app-navigation-entry__title {
    opacity: 0.6;
  }
}

.app-navigation-entry-wrapper.force-not-active .app-navigation-entry.active {
  background-color: transparent !important;
  * {
    color: unset !important;
  }
}
</style>
