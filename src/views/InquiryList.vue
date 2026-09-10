<!-- Updated InquiryList.vue with correct NcCheckboxRadioSwitch usage -->
<!--
    - SPDX-FileCopyrightText: 2018 Nextcloud contributors
    - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
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
import type { ViewMode } from '../stores/preferences.ts'
import { useSessionStore } from '../stores/session.ts'
import ActionToggleSidebar from '../components/Actions/modules/ActionToggleSidebar.vue'
import { useInquiryGroupsStore } from '../stores/inquiryGroups.ts'
import LoadingOverlay from '../components/Base/modules/LoadingOverlay.vue'
import { InquiryGeneralIcons } from '../utils/icons.ts'
import InquiryReel from '../components/Inquiry/InquiryReel.vue'

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

// Main mode (create/view) and sub mode (table/list/reel)
const mainMode = ref('view') // 'create' or 'view'
const subMode = ref<ViewMode>('table-view') // 'table-view', 'list-view', or 'reel-view'

// Reel orientation
const reelOrientation = ref<'vertical' | 'horizontal'>('vertical')
const showReelArrows = ref(true)

// Computed properties for view modes
const isGridView = computed(() => subMode.value === 'table-view')
const isListView = computed(() => subMode.value === 'list-view')
const isReelView = computed(() => subMode.value === 'reel-view')

// Handle main mode change
function handleMainModeChange(mode: string) {
  mainMode.value = mode

  if (mode === 'create') {
    router.push({
      name: 'menu',
      query: {
        viewMode: 'create',
      }
    })
  } else if (mode === 'group') {
    router.push({
      name: 'group-list',
      params: {
        slug: '' 
      },
      query: {
        ...route.query,
        viewMode: 'group',
      }
    })
  } else {
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
function handleSubModeChange(mode: ViewMode) {
  subMode.value = mode
  // Save preference
  if (preferencesStore.user) {
    preferencesStore.setUserPreference('defaultViewInquiry', mode)
  }
}

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
    inquiriesStore.meta.status !== 'loading' &&
    !isReelView.value
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

onMounted(() => {
  inquiriesStore.load(false)
  // Initialize modes from route query
  if (route.query.viewMode === 'create') {
    mainMode.value = 'create' 
  } else if (route.query.viewMode === 'group') { 
    mainMode.value = 'group'
  } else {
    mainMode.value = 'view'
  }

  // Initialize subMode from app settings
  if (preferencesStore.user?.defaultViewInquiry) {
    subMode.value = preferencesStore.user.defaultViewInquiry
  } else {
    subMode.value = 'table-view'
  }
})

watch(subMode, (newMode) => {
  if (newMode === 'reel-view' && inquiriesStore.chunkedList.length === 0) {
    inquiriesStore.addChunk()
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
        <div class="header-controls">
            <div class="mode-switchers">
                <div class="main-mode-switcher">
                    <!-- Create mode button -->
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

                    <!-- Group mode button -->
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

                    <!-- Table view button -->
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

                    <!-- List view button -->
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

                    <!-- Reel view button -->
                    <NcCheckboxRadioSwitch
                        :button-variant="true"
                        :model-value="subMode"
                        value="reel-view"
                        name="sub_mode_radio"
                        type="radio"
                        button-variant-grouped="horizontal"
                        class="mode-switch sub-mode"
                        @update:model-value="handleSubModeChange"
                    >
                        <template #icon>
                            <component :is="InquiryGeneralIcons.ViewCarousel" size="16" />
                        </template>
                    </NcCheckboxRadioSwitch>
                </div>
            </div>

            <div class="right-controls">
                <InquiryListSort />
                
                <!-- Reel controls -->
                <template v-if="isReelView">
                    <!-- Vertical orientation button -->
                    <NcCheckboxRadioSwitch
                        :button-variant="true"
                        :model-value="reelOrientation"
                        value="vertical"
                        name="reel_orientation"
                        type="radio"
                        button-variant-grouped="horizontal"
                        class="mode-switch"
                        @update:model-value="reelOrientation = $event"
                    >
                        <template #icon>
                            <component :is="InquiryGeneralIcons.ViewVertical" size="16" />
                        </template>
                    </NcCheckboxRadioSwitch>

                    <!-- Horizontal orientation button -->
                    <NcCheckboxRadioSwitch
                        :button-variant="true"
                        :model-value="reelOrientation"
                        value="horizontal"
                        name="reel_orientation"
                        type="radio"
                        button-variant-grouped="horizontal"
                        class="mode-switch"
                        @update:model-value="reelOrientation = $event"
                    >
                        <template #icon>
                            <component :is="InquiryGeneralIcons.ViewHorizontal" size="16" />
                        </template>
                    </NcCheckboxRadioSwitch>

                    <NcCheckboxRadioSwitch
                        :button-variant="true"
                        :model-value="showReelArrows"
                        type="button"
                        class="mode-switch"
                        @click="showReelArrows = !showReelArrows"
                    >
                        <template #icon>
                            <component :is="InquiryGeneralIcons.ArrowLeftRight" size="16" />
                        </template>
                    </NcCheckboxRadioSwitch>

                </template>

                <ActionToggleSidebar
                    v-if="inquiryGroupsStore.currentInquiryGroup?.owner.id === sessionStore.currentUser.id"
                />
            </div>
        </div>
    </template>
    </HeaderBar>

    <InquiryFilter :family-type="selectedFamily" />

    <div class="area__main">
        <!-- Reel View -->
        <div v-if="!emptyInquiryListnoInquiries && isReelView" class="reel-wrapper">
            <InquiryReel
                :inquiries="inquiriesStore.chunkedList"
                :orientation="reelOrientation"
                :show-arrows="showReelArrows"
                :show-progress="true"
                @change="(index) => { /* Track current index if needed */ }"
            />
        </div>

        <!-- Table and List Views -->
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
        height: 100%;
        min-height: 400px;
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

.header-controls {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    justify-content: flex-end;
}

.mode-switchers {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
}

.right-controls {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
}

.reel-wrapper {
    width: 100%;
    height: 600px;
    max-height: calc(100vh - 250px);
    padding: 16px;
    box-sizing: border-box;

    @media (max-width: 768px) {
        height: 500px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        height: 400px;
        padding: 4px;
    }
}

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
            cursor: pointer;

            &:hover {
                background: var(--color-background-hover);
            }
        }

        :deep(input:checked + .checkbox-radio-switch__label) {
            background: var(--color-primary-element);
            color: var(--color-primary-text);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        // For button type (checkbox toggles)
        :deep(.checkbox-radio-switch--button) {
            &.active {
                background: var(--color-primary-element);
                color: var(--color-primary-text);
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
        }

        :deep(.material-design-icon) {
            width: 16px;
            height: 16px;
        }
    }
}

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

@media (max-width: 1024px) {
    .header-controls {
        flex-direction: row;
        gap: 12px;
        align-items: center;
        justify-content: flex-end;
    }

    .reel-wrapper {
        height: 500px;
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
        flex-wrap: wrap;
    }

    .reel-wrapper {
        height: 400px;
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

    .reel-wrapper {
        height: 350px;
        padding: 4px;
    }
}
</style>
