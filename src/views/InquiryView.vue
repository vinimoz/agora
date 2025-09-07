<!--
	- SPDX-FileCopyrightText: 2018 Nextcloud contributors
	- SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed,  onUnmounted, ref, watch, nextTick} from 'vue'
import { emit, unsubscribe } from '@nextcloud/event-bus';
import { n, t } from '@nextcloud/l10n';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import { showError } from '@nextcloud/dialogs';

import NcAppContent from '@nextcloud/vue/components/NcAppContent';

import InquiryInfoLine from '../components/Inquiry/InquiryInfoLine.vue';
import InquiryHeaderButtons from '../components/Inquiry/InquiryHeaderButtons.vue';
import LoadingOverlay from '../components/Base/modules/LoadingOverlay.vue';
import HeaderBar from '../components/Base/modules/HeaderBar.vue';
import InquiryEditViewForm from '../components/Inquiry/InquiryEditViewForm.vue';
import InquiryTransition from '../components/Inquiry/InquiryTransition.vue';
import { useInquiryStore } from '../stores/inquiry.ts';
import { useInquiriesStore } from '../stores/inquiries.ts';
import Collapsible from '../components/Base/modules/Collapsible.vue';
import type { CollapsibleProps } from '../components/Base/modules/Collapsible.vue';
import IntersectionObserver from '../components/Base/modules/IntersectionObserver.vue';
import InquiryInfoCards from '../components/Cards/InquiryInfoCards.vue';
import { InquiryTypesUI } from '../helpers/modules/InquiryHelper.ts';


const forceRenderKey = ref(0)

const route = useRoute();
const router = useRouter();
const inquiryStore = useInquiryStore();
const inquiriesStore = useInquiriesStore();
const tableSticky = ref(false);
const editMode = ref(false);
const isAppLoaded = ref(false);

const showMore = computed(
  () =>
    inquiriesStore.chunkedList.length <
      inquiriesStore.inquiriesFilteredSorted.length &&
    inquiriesStore.meta.status !== 'loading'
);

const countLoadedInquiries = computed(() =>
  Math.min(
    inquiriesStore.chunkedList.length,
    inquiriesStore.inquiriesFilteredSorted.length
  )
);

const infoLoaded = computed(() =>
  n(
    'agora',
    '{loadedInquiries} of {countInquiries} inquiry loaded.',
    '{loadedInquries} of {countInquiries} inquiries loaded.',
    inquiriesStore.inquiriesFilteredSorted.length,
    {
      loadedInquries: countLoadedInquiries.value,
      countInquiries: inquiriesStore.inquiriesFilteredSorted.length
    }
  )
);

async function routeChild(childId) {
  router.push({ name: 'inquiry', params: { id: childId } });
}

async function loadInquiry(id: string) {
  try {
    const response = await inquiryStore.load(id);
    inquiryStore.childs = response.data.childs;
    if (inquiryStore.childs.length === 0) {
      inquiryStore.status.forceEditMode = true;
      editMode.value = true;
    } else {
      inquiryStore.status.forceEditMode = false;
      editMode.value = false;
    }
    await nextTick()
    forceRenderKey.value++
  } catch (error) {
    console.error('Loading error:', error);
    showError(t('agora', 'Failed to load inquiry'));
  } finally {
    isAppLoaded.value = true;
  }
}

watch(
  () => route.params.id,
  async (newId) => {
    isAppLoaded.value=false
    await loadInquiry(newId);
  },
  { immediate: true }
);

const enableEditMode = () => {
  editMode.value = true;
  inquiryStore.status.forceEditMode = true;
};

onBeforeRouteUpdate(async (to, from, next) => {
  if (to.params.id) {
  	inquiryStore.reset();
  }
  next()
  emit(Event.TransitionsOff, 500);
});




onUnmounted(() => {
  inquiryStore.reset();
  unsubscribe(Event.LoadInquiry, () => {});
});

const loadingOverlayProps = {
  name: t('agora', 'Loading inquiry…'),
  teleportTo: '#content-vue',
  loadingTexts: [
    t('agora', 'Fetching configuration…'),
    t('agora', 'Collecting elements…'),
    t('agora', 'Checking access…'),
    t('agora', 'Almost ready…'),
    t('agora', 'Do not go away…'),
    t('agora', 'This seems to be a huge inquiry, please be patient…')
  ]
};

const isShortDescription = computed(() => {
  if (!inquiryStore.description) return true;
  return (
    inquiryStore.description.split(' ').length < 20 &&
    inquiryStore.description.split(/\r\n|\r|\n/).length < 5
  );
});

const collapsibleProps = computed<CollapsibleProps>(() => ({
  noCollapse:
    !inquiryStore.configuration.collapseDescription || isShortDescription.value,
  initialState:
    inquiryStore.currentUserStatus.countInquiries === 0 ? 'max' : 'min'
}));

// const scrolled = computed(() => !topObserverVisible.value && tableSticky.value)
</script>

<template>
  <NcAppContent v-if="isAppLoaded" :key="forceRenderKey"  class="inquiry-list">
    <HeaderBar v-if="editMode">
      <template #icon>
        <div class="type-icon">
          <component :is="InquiryTypesUI[inquiryStore.type].icon" />
        </div>
      </template>
      <template #right>
        <InquiryHeaderButtons />
      </template>
      <template #title>
        {{ inquiryStore.title }}
      </template>
      <InquiryInfoLine />
    </HeaderBar>

    <div class="area__main">
      <IntersectionObserver
        v-if="inquiryStore.viewMode === 'table-view'"
        id="table-observer"
        v-model="tableSticky"
      />

      <Collapsible
        v-if="inquiryStore.description"
        class="sticky-left"
        v-bind="collapsibleProps"
      />

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
    <LoadingOverlay
      :show="inquiryStore.meta.status === 'loading'"
      v-bind="loadingOverlayProps"
    />
  </NcAppContent>
</template>

<style lang="scss">
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
</style>
