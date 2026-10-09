<template>
  <NcAppContent>
    <ExperienceRenderer
      :experience="experience"
      :inquiries="inquiries"
      :groups="groups"
      :selected-inquiry="null"
      :selected-group="null"
      @select-inquiry="onSelectInquiry"
      @select-group="onSelectGroup"
      @view-inquiry="onViewInquiry"
      @view-group="onViewGroup"
      @navigate-to="onNavigate"
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
import { useViewableInquiries } from '../composables/useViewableInquiries.ts'

const router = useRouter()
const route = useRoute()

const inquiriesStore = useInquiriesStore()
const groupsStore = useInquiryGroupsStore()

// The landing is always rendered with the `home` experience. The route can
// still override it via `?experience=` for debugging or future variants, but
// anything unknown falls back to `home`.
const experience = computed<ExperienceKey>(() => {
  const q = route.query.experience
  if (typeof q === 'string' && q.length > 0) {
    return q as ExperienceKey
  }
  return 'home' as ExperienceKey
})

// The landing only ever wants the viewable, non-archived set. Per-zone
// filtering / sorting / pagination is applied downstream by
// ExperienceRenderer through each zone's `scope`.
const inquiries = useViewableInquiries()

const groups = computed<InquiryGroup[]>(() =>
  groupsStore.inquiryGroupsSorted.filter((g) => g.parentId === null),
)

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
  if (!target) return

  switch (target.type) {
    // ---- Direct entity navigation ----
    case 'inquiry':
      return onViewInquiry(target.inquiry)
    case 'group':
      return onViewGroup(target.group)

    // ---- Hero actions ----
    case 'hero-action':
      return handleHeroAction(target.key)

    // ---- Search (reserved for a future unified search wiring) ----
    case 'search':
      return router.push({ name: 'explore', query: { q: target.query } })

    // ---- News ----
    case 'news':
      return onViewInquiry(target.item)
    case 'news-all':
      return router.push({
        name: 'explore',
        params: { type: 'relevant' },
        query: { family: 'collective', display: 'feed' },
      })

    // ---- Services ----
    case 'service':
      return router.push({
        name: 'explore',
        params: { type: 'relevant' },
        query: { family: 'service', group_type: target.key },
      })
    case 'services-all':
      return router.push({ name: 'menu', params: { family: 'service' } })

    // ---- Events / agenda ----
    case 'event':
      return onViewInquiry(target.item)
    case 'events-all':
      return router.push({
        name: 'explore',
        params: { type: 'relevant' },
        query: { display: 'timeline' },
      })

    // ---- Explore ----
    case 'category':
      return router.push({
        name: 'explore',
        params: { type: 'relevant' },
        query: { type: target.key },
      })
    case 'explore-all':
      return router.push({ name: 'menu' })
    case 'create':
      return handleCreateInquiry()
    case 'promo-action':
      return handleCreateInquiry()

    // ---- Zone-level "view all" ----
    case 'inquiries-all':
      if (target.zone === 'agenda') {
        return router.push({
          name: 'explore',
          params: { type: 'relevant' },
          query: { display: 'timeline' },
        })
      }
      return router.push({
        name: 'explore',
        params: { type: 'relevant' },
        query: { sort: 'lastInteraction' },
      })

    case 'groups-all':
      return router.push({ name: 'explore-spaces' })

    // ---- Fallback ----
    default:
      return router.push({ name: 'home' })
  }
}

function handleHeroAction(key: string) {
  switch (key) {
    case 'participate':
      return router.push({
        name: 'explore',
        params: { type: 'relevant' },
        query: { filter: 'for_you' },
      })
    case 'decide':
      return router.push({
        name: 'explore',
        params: { type: 'relevant' },
        query: { filter: 'to_vote' },
      })
    case 'propose':
      return handleCreateInquiry()
    case 'debate':
      return router.push({
        name: 'explore',
        params: { type: 'relevant' },
        query: { filter: 'debates' },
      })
    default:
      return router.push({ name: 'explore' })
  }
}

function handleCreateInquiry() {
  router.push({ name: 'menu', query: { viewMode: 'create' } })
}
</script>
