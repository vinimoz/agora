<!--
	- SPDX-FileCopyrightText: 2018 Nextcloud contributors
	- SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed, onUnmounted, ref, watch, nextTick } from 'vue'
import { emit, unsubscribe } from '@nextcloud/event-bus'
import { n, t } from '@nextcloud/l10n'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { showError } from '@nextcloud/dialogs'
import  moment  from 'moment'

import NcAppContent from '@nextcloud/vue/components/NcAppContent'
import NcUserBubble from '@nextcloud/vue/components/NcUserBubble'

import InquiryInfoLine from '../components/Inquiry/InquiryInfoLine.vue'
import InquiryHeaderButtons from '../components/Inquiry/InquiryHeaderButtons.vue'
import LoadingOverlay from '../components/Base/modules/LoadingOverlay.vue'
import HeaderBar from '../components/Base/modules/HeaderBar.vue'
import InquiryEditViewForm from '../components/Inquiry/InquiryEditViewForm.vue'
import InquiryTransition from '../components/Inquiry/InquiryTransition.vue'
import { useInquiryStore } from '../stores/inquiry.ts'
import { useInquiriesStore } from '../stores/inquiries.ts'
import Collapsible from '../components/Base/modules/Collapsible.vue'
import type { CollapsibleProps } from '../components/Base/modules/Collapsible.vue'
import IntersectionObserver from '../components/Base/modules/IntersectionObserver.vue'
import InquiryInfoCards from '../components/Cards/InquiryInfoCards.vue'
import { DateTime } from 'luxon'
import {  StatusIcons, InquiryGeneralIcons } from '../utils/icons.ts'

const forceRenderKey = ref(0)
const route = useRoute()
const router = useRouter()
const inquiryStore = useInquiryStore()
const inquiriesStore = useInquiriesStore()
const tableSticky = ref(false)
const editMode = ref(false)
const isAppLoaded = ref(false)

const showMore = computed(
  () =>
    inquiriesStore.chunkedList.length < inquiriesStore.inquiriesFilteredSorted.length &&
    inquiriesStore.meta.status !== 'loading'
)

const formatDate = (timestamp: number) =>
  DateTime.fromMillis(timestamp * 1000).toLocaleString(DateTime.DATE_SHORT)

const countLoadedInquiries = computed(() =>
  Math.min(inquiriesStore.chunkedList.length, inquiriesStore.inquiriesFilteredSorted.length)
)

const closeToClosing = computed(() => {
  if (!inquiryStore.configuration.expire) return false
  const expireTime = inquiryStore.configuration.expire * 1000
  const timeUntilExpire = expireTime - Date.now()
  return timeUntilExpire < 86400000 && timeUntilExpire > 0
})

const timeExpirationRelative = computed(() => {
  if (inquiryStore.configuration.expire) {
    return moment.unix(inquiryStore.configuration.expire).fromNow()
  }
  return t('agora', 'never')
})

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

async function routeChild(childId: string) {
  router.push({ name: 'inquiry', params: { id: childId } })
}

async function loadInquiry(id: string) {
  try {
    await inquiryStore.load(id)
    const result=inquiriesStore.inquiries.filter(i => 
               i.parentId === Number(id) &&
	       i.configuration.access !== 'private'
     )
    inquiryStore.childs=result

    if (inquiryStore.childs.length === 0) {
      inquiryStore.status.forceEditMode = true
      editMode.value = true
    } else {
      inquiryStore.status.forceEditMode = false
      editMode.value = false
    }
    await nextTick()
    forceRenderKey.value+=1
  } catch (error) {
    console.error('Loading error:', error)
    showError(t('agora', 'Failed to load inquiry'))
  } finally {
    isAppLoaded.value = true
  }
}

function loadMore() {
  // console.log('Load more functionality to be implemented')
}

watch(
  () => route.params.id,
  async (newId) => {
    isAppLoaded.value = false
    await loadInquiry(newId as string)
  },
  { immediate: true }
)

const enableEditMode = () => {
  editMode.value = true
  inquiryStore.status.forceEditMode = true
}

onBeforeRouteUpdate(async (to, from, next) => {
  if (to.params.id) {
    inquiryStore.reset()
  }
  next()
  emit('transitions-off', 500)
})

onUnmounted(() => {
  inquiryStore.reset()
  unsubscribe('load-inquiry', () => {})
})

const loadingOverlayProps = {
  name: t('agora', 'Loading inquiry…'),
  teleportTo: '#content-vue',
  loadingTexts: [
    t('agora', 'Fetching configuration…'),
    t('agora', 'Collecting elements…'),
    t('agora', 'Checking access…'),
    t('agora', 'Almost ready…'),
    t('agora', 'Do not go away…'),
    t('agora', 'This seems to be a huge inquiry, please be patient…'),
  ],
}

const isShortDescription = computed(() => {
  if (!inquiryStore.description) return true
  return (
    inquiryStore.description.split(' ').length < 20 &&
    inquiryStore.description.split(/\r\n|\r|\n/).length < 5
  )
})

const collapsibleProps = computed<CollapsibleProps>(() => ({
  noCollapse: !inquiryStore.configuration.collapseDescription || isShortDescription.value,
  initialState: inquiryStore.currentUserStatus.countInquiries === 0 ? 'max' : 'min',
}))
</script>

<template>
  <NcAppContent v-if="isAppLoaded" :key="forceRenderKey" class="inquiry-list">
    <HeaderBar v-if="editMode">
      <template #avatar>
        <div class="header-left-content">
          <component
            :is="NcUserBubble"
            :user="inquiryStore.owner.id"
            :display-name="inquiryStore.owner.displayName"
            :size="32"
          />
        </div>
      </template>
      <template #right>
        <div class="header-right-content">
          <div class="dates-container">
            <div
              v-if="inquiryStore.status?.created"
              class="metadata-item"
              :title="
                t('agora', 'Created on {date}', {
                  date: formatDate(inquiryStore.status.created),
                })
              "
            >
              <component :is="StatusIcons.Calendar" :size="16" />
              <span class="date-label">
                {{ formatDate(inquiryStore.status.created) }}
              </span>
            </div>

            <div
              v-if="inquiryStore.status?.lastInteraction"
              class="metadata-item"
              :title="
                t('agora', 'Last interaction on {date}', {
                  date: formatDate(inquiryStore.status.lastInteraction),
                })
              "
            >
              <component :is="StatusIcons.Updated" :size="16" />
              <span class="date-label">
                {{ formatDate(inquiryStore.status.lastInteraction) }}
              </span>
            </div>

            <div
              id="expiring"
              class="metadata-item"
              :class="closeToClosing ? 'closing' : 'open'"
              :title="
                t('agora', 'Closing {relativeExpirationTime}', {
                  relativeExpirationTime: timeExpirationRelative,
                })
              "
            >
              <component :is="InquiryGeneralIcons.expiration" :size="16" />
              <span class="date-label">
                {{
                  t('agora', 'Closing {relativeExpirationTime}', {
                    relativeExpirationTime: timeExpirationRelative,
                  })
                }}
              </span>
            </div>
          </div>
        </div>

        <InquiryHeaderButtons />
      </template>
    </HeaderBar>

    <InquiryInfoLine v-if="editMode" />

    <div class="area__main">
      <IntersectionObserver
        v-if="inquiryStore.viewMode === 'table-view'"
        id="table-observer"
        v-model="tableSticky"
      />

      <Collapsible v-if="inquiryStore.description" class="sticky-left" v-bind="collapsibleProps" />

      <div class="view-content">
        <InquiryEditViewForm v-if="editMode" />
        <InquiryTransition
          v-else
          :is-loaded-parent="isAppLoaded"
          @route-child="routeChild"
          @edit-parent="enableEditMode"
        />
      </div>

      <InquiryInfoCards class="sticky-left" />

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
    </div>

    <LoadingOverlay :show="inquiryStore.meta.status === 'loading'" v-bind="loadingOverlayProps" />
  </NcAppContent>
</template>

<style lang="scss">
.type-display {
  display: flex;
  align-items: center;
  gap: 8px;

  .type-icon {
    flex-shrink: 0;
  }

  .type-label {
    font-weight: bold;
    text-transform: capitalize;
  }
}

.header-left-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 8px;
  width: 100%;
}
.dates-container {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;

  @media (max-width: 1000px) {
    gap: 8px;

    .metadata-item {
      font-size: 0.8em;
    }
  }
}

.header-right-content {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.dates-container {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0;
  margin-right: 16px;
}

.metadata-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9em;
  color: var(--color-text-lighter);
  white-space: nowrap;
}

.date-label {
  white-space: nowrap;
}

.inquiry-list__list {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  padding-bottom: 14px;
}

.observer_section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px 0;
}

.clickable_load_more {
  cursor: pointer;
  font-weight: bold;
}

#expiring.closing {
  color: var(--color-warning);
  font-weight: bold;
}

#expiring.open {
  color: var(--color-text-lighter);
}
</style>
