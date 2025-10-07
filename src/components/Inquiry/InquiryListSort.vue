<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { SortDirection, sortTitlesMapping, useInquiriesStore } from '../../stores/inquiries.ts'
import { SortType } from '../../Types'

import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import NcActionSeparator from '@nextcloud/vue/components/NcActionSeparator'

import { NcActionButtonGroup } from '@nextcloud/vue'
import { computed } from 'vue'
import { InquiryGeneralIcons } from '../../utils/icons.ts'


const inquiriesStore = useInquiriesStore()

const sortDirection = computed({
  get() {
    return inquiriesStore.sort.reverse ? 'desc' : 'asc'
  },
  set(direction: SortDirection) {
  if (direction === 'asc') {
    inquiriesStore.sort.reverse = false
  } else {
    inquiriesStore.sort.reverse = true
    }
  }
})

/**
 *
 * @param sort
 * @param sort.by
 * @param sort.reverse
 */
function setSort(sort: { by?: SortType; reverse?: boolean }) {
  if (sort.by !== undefined) {
    inquiriesStore.sort.by = sort.by
  }
  if (sort.reverse !== undefined) {
    inquiriesStore.sort.reverse = sort.reverse
  }
}
</script>

<template>
  <NcActions primary :menu-name="sortTitlesMapping[inquiriesStore.sort.by]">
    <template #icon>
	<component :is="InquiryGeneralIcons.sortDescending" v-if="inquiriesStore.sort.reverse" :size="20" decorative/>
	<component :is="InquiryGeneralIcons.sortAscending" v-else :size="20" decorative/>

    </template>

    <NcActionButton
      :name="sortTitlesMapping['title']"
      :aria-label="t('agora', 'Sort by title')"
      @click="setSort({ by: 'title' })"
    >
      <template #icon>
	<component :is="InquiryGeneralIcons.alpahabetical" />
      </template>
    </NcActionButton>

    <NcActionButton
      :name="sortTitlesMapping['type']"
      :aria-label="t('agora', 'Sort by type')"
      @click="setSort({ by: 'type' })"
    >
      <template #icon>
	<component :is="InquiryGeneralIcons.type" />
      </template>
    </NcActionButton>

    <NcActionButton
      :name="sortTitlesMapping['countComments']"
      :aria-label="t('agora', 'Sort by comments')"
      @click="setSort({ by: 'countComments' })"
    >
      <template #icon>
	<component :is="InquiryGeneralIcons.comment" />
      </template>
    </NcActionButton>
    <NcActionButton
      :name="sortTitlesMapping['countSupports']"
      :aria-label="t('agora', 'Sort by supports')"
      @click="setSort({ by: 'type' })"
    >
      <template #icon>
	<component :is="InquiryGeneralIcons.thumb" />
      </template>
    </NcActionButton>

    <NcActionButton
      :name="sortTitlesMapping['interaction']"
      :aria-label="t('agora', 'Sort by last interaction')"
      @click="setSort({ by: 'interaction' })"
    >
      <template #icon>
	<component :is="InquiryGeneralIcons.update" />
      </template>
    </NcActionButton>

    <NcActionButton
      :name="sortTitlesMapping['created']"
      :aria-label="t('agora', 'Sort by creation date')"
      @click="setSort({ by: 'created' })"
    >
      <template #icon>
	<component :is="InquiryGeneralIcons.creation" />
      </template>
    </NcActionButton>

    <NcActionButton
      :name="sortTitlesMapping['expire']"
      :aria-label="t('agora', 'Sort by expiration date')"
      @click="setSort({ by: 'expire' })"
    >
      <template #icon>
	<component :is="InquiryGeneralIcons.expiration" />
      </template>
    </NcActionButton>

    <NcActionButton
      :name="sortTitlesMapping['owner']"
      :aria-label="t('agora', 'Sort by owner name')"
      @click="setSort({ by: 'owner' })"
    >
      <template #icon>
	<component :is="InquiryGeneralIcons.accountCircle" />
      </template>
    </NcActionButton>

    <NcActionSeparator />

    <NcActionButtonGroup :name="t('agora', 'Direction')">
      <NcActionButton
        v-model="sortDirection"
        :value="'desc'"
        type="radio"
        :aria-label="t('agora', 'Descending')"
      >
        <template #icon>
	<component :is="InquiryGeneralIcons.sortDescending" />
        </template>
      </NcActionButton>

      <NcActionButton
        v-model="sortDirection"
        :value="'asc'"
        type="radio"
        :aria-label="t('agora', 'Ascending')"
      >
        <template #icon>
	<component :is="InquiryGeneralIcons.sortAscending" />
        </template>
      </NcActionButton>
    </NcActionButtonGroup>
  </NcActions>
</template>
