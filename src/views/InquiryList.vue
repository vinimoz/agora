<!--
	- SPDX-FileCopyrightText: 2018 Nextcloud contributors
	- SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { showError } from '@nextcloud/dialogs'
import { t, n } from '@nextcloud/l10n'

import NcAppContent from '@nextcloud/vue/components/NcAppContent'
import NcEmptyContent from '@nextcloud/vue/components/NcEmptyContent'

import { HeaderBar, IntersectionObserver } from '../components/Base/index.ts'
import { AgoraAppIcon } from '../components/AppIcons/index.ts'
import InquiryItem from '../components/Inquiry/InquiryItem.vue'
import InquiryFilter from '../components/Inquiry/InquiryFilter.vue'
import { FilterType, useInquiriesStore } from '../stores/inquiries.ts'
import InquiryListSort from '../components/Inquiry/InquiryListSort.vue'
import InquiryItemActions from '../components/Inquiry/InquiryItemActions.vue'
import ActionAddInquiry from '../components/Actions/modules/ActionAddInquiry.vue'
import { usePreferencesStore } from '../stores/preferences.ts'
import { useSessionStore } from '../stores/session.ts'
import ActionToggleSidebar from '../components/Actions/modules/ActionToggleSidebar.vue'
import { useInquiryGroupsStore } from '../stores/inquiryGroups.ts'
import LoadingOverlay from '../components/Base/modules/LoadingOverlay.vue'

const inquiriesStore = useInquiriesStore()
const inquiryGroupsStore = useInquiryGroupsStore()
const preferencesStore = usePreferencesStore()
const sessionStore = useSessionStore()
const route = useRoute()

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

const isGridView = computed(() => preferencesStore.user.defaultViewInquiry === 'table-view')

const loadingOverlayProps = {
  name: t('agora', 'Loading overview'),
  teleportTo: '#content-vue',
  loadingTexts: [
    t('agora', 'Fetching inquiries…'),
    t('agora', 'Checking access…'),
    t('agora', 'Almost ready…'),
    t('agora', 'Do not go away…'),
    t('agora', 'Please be patient…'),
  ],
}

const emptyContentProps = computed(() => ({
  name: t('agora', 'No inquiries found for this category'),
  description: t('agora', 'Add one or change category!'),
}))

/**
 *
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
        <ActionAddInquiry v-if="preferencesStore.user.useNewInquiryInInquiryist" />
        <InquiryListSort />
        <ActionToggleSidebar
          v-if="inquiryGroupsStore.currentInquiryGroup?.owner.id === sessionStore.currentUser.id"
        />
      </template>
    </HeaderBar>
    <InquiryFilter />

    <div class="area__main">
      <TransitionGroup
        v-if="!emptyInquiryListnoInquiries"
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

<style lang="scss">
.inquiry-list {
  .area__main {
    width: 100%;
  }
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
</style>
