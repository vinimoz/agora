<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcAppNavigationItem from '@nextcloud/vue/components/NcAppNavigationItem'
import InquiryNavigationItems from './InquiryNavigationItems.vue'
import { NavigationIcons } from '../../utils/icons.ts'
import { useInquiriesStore, type FilterType } from '../../stores/inquiries.ts'
import { useSessionStore } from '../../stores/session.ts'

const props = defineProps<{
  categoryId: FilterType
}>()

const inquiriesStore = useInquiriesStore()
const sessionStore = useSessionStore()

// Computed ONCE per category component instance — not 5x per render.
const inquiries = computed(() => inquiriesStore.navigationList(props.categoryId))

const isEmpty = computed(() => inquiries.value.length === 0)

const hasMore = computed(
  () => inquiries.value.length > inquiriesStore.meta.maxInquiriesInNavigation
)
</script>

<template>
  <ul
    v-if="sessionStore.appSettings.navigationInquiriesInList"
    class="navigation-sublist"
  >
    <InquiryNavigationItems
      v-for="inquiry in inquiries"
      :key="inquiry.id"
      :inquiry="inquiry"
    />

    <NcAppNavigationItem
      v-if="isEmpty"
      :name="t('agora', 'No inquiries found')"
      class="navigation-empty"
    />

    <NcAppNavigationItem
      v-if="hasMore"
      class="force-not-active"
      :to="{ name: 'list', params: { type: categoryId } }"
      :name="t('agora', 'View all')"
    >
      <template #icon>
        <component :is="NavigationIcons.GoTo" />
      </template>
    </NcAppNavigationItem>
  </ul>
</template>
