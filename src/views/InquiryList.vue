<!--
    - SPDX-FileCopyrightText: 2018 Nextcloud contributors
    - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showError } from '@nextcloud/dialogs'
import { t, n } from '@nextcloud/l10n'

import NcAppContent from '@nextcloud/vue/components/NcAppContent'
import NcEmptyContent from '@nextcloud/vue/components/NcEmptyContent'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'

import { HeaderBar, IntersectionObserver } from '../components/Base/index.ts'
import { AgoraAppIcon } from '../components/AppIcons/index.ts'
import InquiryItem from '../components/Inquiry/InquiryItem.vue'
import InquiryFilter from '../components/Inquiry/InquiryFilter.vue'
import { FilterType, useInquiriesStore } from '../stores/inquiries.ts'
import InquiryListSort from '../components/Inquiry/InquiryListSort.vue'
import InquiryItemActions from '../components/Inquiry/InquiryItemActions.vue'
import { usePreferencesStore } from '../stores/preferences.ts'
import { useSessionStore } from '../stores/session.ts'
import ActionToggleSidebar from '../components/Actions/modules/ActionToggleSidebar.vue'
import { useInquiryGroupsStore } from '../stores/inquiryGroups.ts'
import LoadingOverlay from '../components/Base/modules/LoadingOverlay.vue'
import { InquiryGeneralIcons } from '../utils/icons.ts'
import InquiryTimeline from '../components/Inquiry/InquiryTimeline.vue'
import InquiryKanban from '../components/Inquiry/InquiryKanban.vue'

const inquiriesStore = useInquiriesStore()
const inquiryGroupsStore = useInquiryGroupsStore()
const preferencesStore = usePreferencesStore()
const sessionStore = useSessionStore()
const route = useRoute()
const router = useRouter()

const selectedFamily = computed({
  get: () => inquiriesStore.advancedFilters.familyType || null,
  set: (value) => inquiriesStore.setFamilyType(value || '')
})

// Main mode (create/view) and sub mode (table/list)
const mainMode = ref('view') // 'create' or 'view'
const subMode = ref('table-view') 


// Handle main mode change
function handleMainModeChange(mode: string) {
  mainMode.value = mode

  if (mode === 'create') {
    // Navigate to create mode with familyType
    router.push({
      name: 'menu',
      query: {
        viewMode: 'create',
      }
    })
  }else if (mode === 'group') {
  router.push({
    name: 'group-list',
    params: {
        slug: 'none' 
    },
    query: {
      ...route.query,
      viewMode: 'group',
    }
  })
  } else {
    // Stay in view mode, just update the query
    router.push({
      ...route,
      query: {
        ...route.query,
        viewMode: 'view',
      }
    })
  }
}

// Handle sub mode change
function handleSubModeChange(mode: string) {
  subMode.value = mode
}

const isGridView = computed(() => subMode.value === 'table-view')

const title = computed(() => {
  if (route.name === 'group') {
    return (
      inquiryGroupsStore.currentInquiryGroup?.titleExt ||
      inquiryGroupsStore.currentInquiryGroup?.name ||
      ''
    )
  }
  return inquiriesStore.categories[route.params.type as FilterType].titleExt
})

const showMore = computed(
  () =>
    inquiriesStore.chunkedList.length < inquiriesStore.inquiriesFilteredSorted.length &&
    inquiriesStore.meta.status !== 'loading'
)

const countLoadedInquiries = computed(() =>
  Math.min(inquiriesStore.chunkedList.length, inquiriesStore.inquiriesFilteredSorted.length)
)

const infoLoaded = computed(() =>
  n(
    'agora',
    '{loadedInquiries} of {countInquiries} inquiry loaded.',
    '{loadedInquiries} of {countInquiries} inquiries loaded.',
    inquiriesStore.inquiriesFilteredSorted.length,
    {
      loadedInquiries: countLoadedInquiries.value,
      countInquiries: inquiriesStore.inquiriesFilteredSorted.length,
    }
  )
)

const description = computed(() => {
  if (route.name === 'group') {
    return inquiryGroupsStore.currentInquiryGroup?.description || ''
  }

  return inquiriesStore.categories[route.params.type as FilterType].description
})

const emptyInquiryListnoInquiries = computed(
  () => inquiriesStore.inquiriesFilteredSorted.length < 1
)

const loadingOverlayProps = {
  name: t('agora', 'Loading overview'),
  teleportTo: '#content-vue',
  loadingTexts: [
    t('agora', 'Fetching inquiries'),
    t('agora', 'Checking access'),
    t('agora', 'Almost ready'),
    t('agora', 'Do not go away'),
    t('agora', 'Please be patient'),
  ],
}

const emptyContentProps = computed(() => ({
  name: t('agora', 'No inquiries found for this category'),
  description: t('agora', 'Add one or change category!'),
}))

/**
 * Load more inquiries
 */
async function loadMore() {
  try {
    inquiriesStore.addChunk()
  } catch {
    showError(t('agora', 'Error loading more inquiries'))
  }
}

const openInquiryDetail = (inquiryId: number) => {
    router.push({ name: 'inquiry', params: { id: inquiryId } })
}

const refreshInquiries = () => {
    inquiriesStore.load(true)
}


onMounted(() => {
//  inquiriesStore.load(false)
// Initialize modes from route query
if (route.query.viewMode === 'create') {
  mainMode.value = 'create' 
}
else if (route.query.viewMode === 'group') { 
  mainMode.value = 'group'
} else {
  mainMode.value = 'view'
}


  // Initialize subMode from app settings
  if (preferencesStore.user.defaultViewInquiry) {
    subMode.value = preferencesStore.user.defaultViewInquiry
  }
  else {
    subMode.value = 'table-view'
    }
})

</script>

<template>
    <NcAppContent class="inquiry-list">
    <HeaderBar>
    <template #title>
        {{ title }}
    </template>
    {{ description }}

    <template #right>
        <!-- All controls in one line -->
        <div class="header-controls">
            <!-- Mode Switchers -->
            <div class="mode-switchers">
                <!-- Main Mode (Create/View) -->
                <div class="main-mode-switcher">
                    <NcCheckboxRadioSwitch
                            :button-variant="true"
                            :model-value="mainMode"
                            value="create"
                            name="main_mode_radio"
                            type="radio"
                            button-variant-grouped="horizontal"
                            class="mode-switch"
                            @update:model-value="handleMainModeChange"
                            >
                            <template #icon>
                                <component :is="InquiryGeneralIcons.Plus" size="32" />
                            </template>
                    </NcCheckboxRadioSwitch>

                    <NcCheckboxRadioSwitch
                            :button-variant="true"
                            :model-value="mainMode"
                            value="group"
                            name="main_mode_radio"
                            type="radio"
                            button-variant-grouped="horizontal"
                            class="mode-switch"
                            @update:model-value="handleMainModeChange"
                            >
                            <template #icon>
                                <component :is="InquiryGeneralIcons.Bank" size="32" />
                            </template>
                    </NcCheckboxRadioSwitch>

                    <NcCheckboxRadioSwitch
                            :button-variant="true"
                            :model-value="subMode"
                            value="table-view"
                            name="sub_mode_radio"
                            type="radio"
                            button-variant-grouped="horizontal"
                            class="mode-switch sub-mode"
                            @update:model-value="handleSubModeChange"
                            >
                            <template #icon>
                                <component :is="InquiryGeneralIcons.Table" size="16" />
                            </template>
                    </NcCheckboxRadioSwitch>

                    <NcCheckboxRadioSwitch
                            :button-variant="true"
                            :model-value="subMode"
                            value="list-view"
                            name="sub_mode_radio"
                            type="radio"
                            button-variant-grouped="horizontal"
                            class="mode-switch sub-mode"
                            @update:model-value="handleSubModeChange"
                            >
                            <template #icon>
                                <component :is="InquiryGeneralIcons.ViewListOutline" size="16" />
                            </template>
                    </NcCheckboxRadioSwitch>
                    <!-- 
                    <NcCheckboxRadioSwitch
                            :button-variant="true"
                            :model-value="subMode"
                            value="timeline-view"
                            name="sub_mode_radio"
                            type="radio"
                            button-variant-grouped="horizontal"
                            class="mode-switch sub-mode"
                            @update:model-value="handleSubModeChange"
                            >
                            <template #icon>
                                <component :is="InquiryGeneralIcons.Timeline" size="16" />
                            </template>
                    </NcCheckboxRadioSwitch>

                    <NcCheckboxRadioSwitch
                            :button-variant="true"
                            :model-value="subMode"
                            value="kanban-view"
                            name="sub_mode_radio"
                            type="radio"
                            button-variant-grouped="horizontal"
                            class="mode-switch sub-mode"
                            @update:model-value="handleSubModeChange"
                            >
                            <template #icon>
                                <component :is="InquiryGeneralIcons.ViewKanban" size="16" />
                            </template>
                    </NcCheckboxRadioSwitch> 
                    -->
                </div>
            </div>

            <!-- Sort and other controls -->
            <div class="right-controls">
                <InquiryListSort />
                <ActionToggleSidebar
                        v-if="inquiryGroupsStore.currentInquiryGroup?.owner.id === sessionStore.currentUser.id"
                        />
            </div>
        </div>
    </template>
    </HeaderBar>

    <InquiryFilter :family-type="selectedFamily" />

    <div class="area__main">
   <TransitionGroup
        v-if="!emptyInquiryListnoInquiries && (subMode === 'table-view' || subMode === 'list-view')"
        tag="div"
        name="list"
        :class="[
            'inquiry-list__container',
            isGridView ? 'inquiry-list__grid' : 'inquiry-list__list',
        ]"
    >
        <InquiryItem
            v-for="inquiry in inquiriesStore.chunkedList"
            :key="inquiry.id"
            :inquiry="inquiry"
            :grid-view="isGridView"
        >
            <template #actions>
                <InquiryItemActions
                    v-if="inquiry.permissions.edit || sessionStore.appPermissions.inquiryCreation"
                    :key="`actions-${inquiry.id}`"
                    :inquiry="inquiry"
                />
            </template>
        </InquiryItem>
    </TransitionGroup>

    <!-- Timeline view -->
    <InquiryTimeline
        v-else-if="!emptyInquiryListnoInquiries && subMode === 'timeline-view'"
        :inquiries="inquiriesStore.inquiriesFilteredSorted"
        @open-detail="openInquiryDetail"
    />

    <!-- Kanban view -->
    <InquiryKanban
        v-else-if="!emptyInquiryListnoInquiries && subMode === 'kanban-view'"
        :inquiries="inquiriesStore.inquiriesFilteredSorted"
        @open-detail="openInquiryDetail"
        @status-changed="refreshInquiries"
    />
        
        <IntersectionObserver
                v-if="showMore"
                key="observer"
                class="observer_section"
                @visible="loadMore"
                >
                <div class="clickable_load_more" @click="loadMore">
                    {{ infoLoaded }}
                    {{ t('agora', 'Click here to load more') }}
                </div>
        </IntersectionObserver>

        <NcEmptyContent v-if="emptyInquiryListnoInquiries" v-bind="emptyContentProps">
        <template #icon>
            <AgoraAppIcon />
        </template>
        </NcEmptyContent>
    </div>

    <LoadingOverlay :show="inquiriesStore.meta.status === 'loading'" v-bind="loadingOverlayProps" />
    </NcAppContent>
</template>
<style lang="scss" scoped>
.inquiry-list {
    .area__main {
        width: 100%;
    }
}

.family-type-badge {
    display: inline-block;
    background: var(--color-primary-element-light);
    color: var(--color-primary-text);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 28px;
    font-weight: 500;
    margin: 0 0 16px 0;
    letter-spacing: 2px;
    animation: slideIn 0.3s ease-out;
}

// Header controls container - all elements aligned to the right
    .header-controls {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    justify-content: flex-end; // Align everything to the right
}

// Mode switchers container - on the right side
    .mode-switchers {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
}

// Right controls container - on the right side after mode switchers
    .right-controls {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
}

                                          // Main mode switcher - contains Create, Grid, List buttons
                                              .main-mode-switcher {
                                              display: flex;
                                              align-items: center;
                                              gap: 0;
                                              background: var(--color-background-dark);
                                              border-radius: 10px;
                                              padding: 4px;
                                              border: 1px solid var(--color-border);

                                              .mode-switch {
                                                  margin: 0;

                                                  :deep(.checkbox-radio-switch__label) {
                                                      display: flex;
                                                      align-items: center;
                                                      gap: 6px;
                                                      padding: 8px 12px;
                                                      border-radius: 8px;
                                                      font-weight: 500;
                                                      font-size: 13px;
                                                      transition: all 0.2s ease;

                                                      &:hover {
                                                          background: var(--color-background-hover);
                                                      }
                                                  }

                                                  :deep(input:checked + .checkbox-radio-switch__label) {
                                                      background: var(--color-primary-element);
                                                      color: var(--color-primary-text);
                                                      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                                                  }

                                                  :deep(.material-design-icon) {
                                                      width: 16px;
                                                      height: 16px;
                                                  }
                                              }
                                          }

                                          // Header right area alignment
                                              :deep(.header-bar__right) {
                                              display: flex;
                                              align-items: center;
                                              gap: 12px;
                                              width: 100%;
                                          }

                                          .inquiry-list__container {
                                              width: 100%;
                                              padding-bottom: 14px;
                                              box-sizing: border-box;
                                          }

                                          .inquiry-list__list {
                                              display: flex;
                                              flex-direction: column;
                                              gap: 12px;
                                          }

                                          .inquiry-list__grid {
                                              display: grid;
                                              grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                                              gap: 20px;
                                              padding: 16px;
                                              width: 100%;
                                              box-sizing: border-box;
                                              align-items: stretch;

                                              .inquiry-item {
                                                  border: 1px solid var(--color-border);
                                                  border-radius: 12px;
                                                  padding: 10px;
                                                  background-color: var(--color-main-background);
                                                  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
                                                  transition: all 0.2s ease;
                                                  height: 100%;
                                                  min-height: 80px;
                                                  display: flex;
                                                  flex-direction: column;

                                                  &:hover {
                                                      transform: translateY(-2px);
                                                      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
                                                  }

                                                  .inquiry-item__header {
                                                      margin-bottom: 16px;
                                                      flex-grow: 1;

                                                      .inquiry-item__title {
                                                          font-size: 16px;
                                                          font-weight: 600;
                                                          line-height: 1.4;
                                                          margin-bottom: 12px;
                                                          color: var(--color-main-text);
                                                          word-break: break-word;
                                                      }
                                                  }

                                                  .inquiry-item__meta {
                                                      display: flex;
                                                      flex-wrap: wrap;
                                                      gap: 10px;
                                                      margin-bottom: 16px;
                                                      font-size: 13px;
                                                      color: var(--color-text-lighter);

                                                      .meta-item {
                                                          display: flex;
                                                          align-items: center;
                                                          gap: 6px;

                                                          .material-design-icon {
                                                              width: 16px;
                                                              height: 16px;
                                                              flex-shrink: 0;
                                                          }
                                                      }
                                                  }

                                                  .inquiry-item__actions {
                                                      margin-top: auto;
                                                      padding-top: 16px;
                                                      border-top: 1px solid var(--color-border-light);
                                                      display: flex;
                                                      justify-content: flex-end;
                                                      gap: 10px;
                                                  }
                                              }

                                              @media (max-width: 1400px) {
                                                  grid-template-columns: repeat(3, 1fr);
                                              }

                                              @media (max-width: 1024px) {
                                                  grid-template-columns: repeat(2, 1fr);
                                                  gap: 16px;
                                                  padding: 12px;
                                              }

                                              @media (max-width: 768px) {
                                                  grid-template-columns: 1fr;
                                                  gap: 12px;
                                                  padding: 8px;

                                                  .inquiry-item {
                                                      padding: 16px;
                                                      min-height: 160px;
                                                  }
                                              }
                                          }

                                          .observer_section {
                                              display: flex;
                                              justify-content: center;
                                              align-items: center;
                                              padding: 20px 0;
                                              grid-column: 1 / -1;
                                              width: 100%;
                                          }

                                          .clickable_load_more {
                                              cursor: pointer;
                                              font-weight: 600;
                                              text-align: center;
                                              padding: 20px;
                                              background-color: var(--color-background-dark);
                                              border-radius: 12px;
                                              margin: 0 16px;
                                              color: var(--color-text-lighter);
                                              transition: background-color 0.2s ease;

                                              &:hover {
                                                  background-color: var(--color-background-darker);
                                                  color: var(--color-main-text);
                                              }
                                          }

                                          .app-content {
                                              width: 100%;

                                              .app-content-wrapper {
                                                  width: 100%;
                                                  max-width: none;
                                              }
                                          }

                                          @media (min-width: 1600px) {
                                              .inquiry-list__grid {
                                                  grid-template-columns: repeat(4, 1fr);
                                              }
                                          }

                                          // Responsive adjustments
                                      @media (max-width: 1024px) {
                                              .header-controls {
                                                  flex-direction: row; // Keep horizontal on tablet
                                                      gap: 12px;
                                                  align-items: center;
                                                  justify-content: flex-end;
                                              }
                                          }

                                          @media (max-width: 768px) {
                                              :deep(.header-bar__right) {
                                                  flex-wrap: wrap;
                                                  justify-content: flex-end;
                                                  gap: 8px;
                                              }

                                              .header-controls {
                                                  flex-direction: column;
                                                  gap: 8px;
                                                  align-items: stretch;
                                              }

                                              .mode-switchers {
                                                  flex-direction: column;
                                                  gap: 8px;
                                                  width: 100%;
                                              }

                                              .main-mode-switcher {
                                                  width: 100%;
                                                  justify-content: center;
                                              }

                                              .mode-switch {
                                                  :deep(.checkbox-radio-switch__label) {
                                                      flex: 1;
                                                      justify-content: center;
                                                  }
                                              }

                                              .right-controls {
                                                  justify-content: center;
                                              }
                                          }

                                          @media (max-width: 480px) {
                                              .main-mode-switcher .mode-switch :deep(.checkbox-radio-switch__label) {
                                                  padding: 8px 10px;
                                                  font-size: 12px;

                                                  .material-design-icon {
                                                      width: 14px;
                                                      height: 14px;
                                                  }
                                              }

                                              .right-controls {
                                                  flex-wrap: wrap;
                                                  justify-content: center;
                                                  gap: 6px;
                                              }
                                          }
</style>
