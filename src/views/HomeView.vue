<template>
  <NcAppContent>
    <ExperienceRenderer
      :experience="experience"
      :available-experiences="HOME_EXPERIENCES"
      :default-experience="'home'"
      :inquiries="inquiries"
      :groups="groups"
      :selected-inquiry="null"
      :selected-group="null"
      @select-inquiry="onSelectInquiry"
      @select-group="onSelectGroup"
      @view-inquiry="onViewInquiry"
      @view-group="onViewGroup"
      @navigate-to="onNavigate"
      @experience-change="onExperienceChange"
    />
  </NcAppContent>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NcAppContent from '@nextcloud/vue/components/NcAppContent'
import ExperienceRenderer from '../components/Experience/ExperienceRenderer.vue'

import { useInquiriesStore } from '../stores/inquiries'
import { useInquiryGroupsStore } from '../stores/inquiryGroups'
import type { Inquiry, InquiryGroup } from '../Types'
import type { ExperienceKey } from '../Types/experience.types'

const router = useRouter()
const route = useRoute()

const inquiriesStore = useInquiriesStore()
const groupsStore = useInquiryGroupsStore()

const inquiries = computed<Inquiry[]>(() =>
  inquiriesStore.inquiries.filter((i) => !i.status?.isArchived && i.permissions?.view),
)

const groups = computed<InquiryGroup[]>(() =>
  groupsStore.inquiryGroupsSorted.filter((g) => g.parentId === null),
)

const HOME_EXPERIENCES: ExperienceKey[] = [
  'home',
  'social',
  'marketplace',
  'timeline',
  'classic',
]

const experience = computed<ExperienceKey>(() => {
  const q = route.query.experience as ExperienceKey | undefined
  return q && HOME_EXPERIENCES.includes(q) ? q : 'home'
})

onMounted(() => {
  inquiriesStore.load(false)
  groupsStore.fetchAllGroups()
})

function onSelectInquiry(inquiry: Inquiry) {
  inquiriesStore.setCurrentInquiryId?.(inquiry.id)
}

function onSelectGroup(_group: InquiryGroup) {
  /* optional: highlight in sidebar */
}

function onViewInquiry(inquiry: Inquiry) {
  router.push({ name: 'inquiry', params: { id: inquiry.id } })
}

function onViewGroup(group: InquiryGroup) {
  router.push({ name: 'group', params: { id: group.id } })
}

function onNavigate(target: any) {
  if (target?.id && target?.type === 'inquiry') return onViewInquiry(target)
  if (target?.id) return onViewGroup(target)
  router.push({ name: 'home', query: { experience: target } })
}

function onExperienceChange(key: ExperienceKey) {
  router.push({ name: 'home', query: { experience: key } })
}
</script>
