<template>
  <NcAppContent>
    <ExperienceRenderer
      :experience="experience"
      :inquiries="inquiries"
      :selected-inquiry="null"
      :selected-group="null"
      @select-inquiry="onSelectInquiry"
      @select-group="onSelectGroup"
      @view-inquiry="onViewInquiry"
      @view-group="onViewGroup"
      @openPanel="handleOpenPanel"
      @navigate-to="onNavigate"
    />
    <InquiryCreateDlg
      v-if="showCreateDialog"
      :inquiry-type="createDialogType"
      :response-type="createDialogResponseType"
      :family="createDialogFamily"
      :available-groups="availableGroups"
      @close="closeCreateDialog"
      @added="onInquiryAdded"
    />
  </NcAppContent>
  <InquiryInteractionShell ref="shellRef" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NcAppContent from '@nextcloud/vue/components/NcAppContent'
import ExperienceRenderer from '../components/Experience/ExperienceRenderer.vue'
import InquiryCreateDlg from '../components/Create/InquiryCreateDlg.vue'
import InquiryInteractionShell from '../components/Inquiry/InquiryInteractionShell.vue'

import { useInquiriesStore } from '../stores/inquiries'
import { useInquiryGroupsStore } from '../stores/inquiryGroups'
import { useSessionStore } from '../stores/session'
import type { Inquiry, InquiryGroup } from '../Types'
import type { ExperienceKey } from '../Types/experience.types'
import { useViewableInquiries } from '../composables/useViewableInquiries.ts'

const router = useRouter()
const route = useRoute()

const inquiriesStore = useInquiriesStore()
const groupsStore = useInquiryGroupsStore()
const sessionStore = useSessionStore()
const shellRef = ref()

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

const showCreateDialog = computed(() => route.query.viewMode === 'create')

function handleOpenPanel(payload: { inquiry: any; target: string }) {
  shellRef.value.open(payload)
}

const createDialogType = computed(() => {
  const key =
    (route.query.inquiryType as string | undefined) ?? (route.query.type as string | undefined)
  if (!key) return null
  const types = sessionStore.appSettings.inquiryTypeTab || []
  return types.find((t) => t.inquiry_type === key) ?? null
})

const createDialogResponseType = computed<string | null>(() => {
  const raw = route.query.responseType
  return typeof raw === 'string' && raw.length > 0 ? raw : null
})

const createDialogFamily = computed<string | null>(() => {
  const raw = route.query.family
  return typeof raw === 'string' && raw.length > 0 ? raw : null
})

const availableGroups = computed<string[]>(() => {
  const groups = sessionStore.currentUser.groups || {}
  return typeof groups === 'object' && !Array.isArray(groups)
    ? Object.keys(groups)
    : (groups as string[])
})

function closeCreateDialog() {
  const q = { ...route.query }
  delete q.viewMode
  delete q.inquiryType
  delete q.type
  delete q.responseType
  router.replace({ query: q })
}

function onInquiryAdded(inquiry: { id: number; title: string }) {
  closeCreateDialog()
  if (inquiry?.id) {
    router.push({ name: 'inquiry', params: { id: inquiry.id } })
  }
}

// ── The one entry-point every caller should use ─────────────────────
function handleCreateInquiry(options: { type?: string; family?: string } = {}) {
  const query: Record<string, string> = {
    ...route.query,
    viewMode: 'create',
  }
  console.log(' INQUIRY TYPE ', options.type)
  console.log(' INQUIRY FAMILY TYPE ', options.family)
  if (options.type) query.inquiryType = options.type
  if (options.family) query.family = options.family

  // Stay on Home. Don't push to the non-existent `group` route.
  router.push({ name: 'home', query })
}

// The landing only ever wants the viewable, non-archived set. Per-zone
// filtering / sorting / pagination is applied downstream by
// ExperienceRenderer through each zone's `scope`.
const inquiries = useViewableInquiries()

const groups = computed<InquiryGroup[]>(() =>
  groupsStore.inquiryGroupsSorted.filter((g) => g.parentId === null)
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
    case 'create':
      return handleCreateInquiry({
        type: target.inquiryType,
        family: target.family,
      })
    case 'promo-action':
      return handleCreateInquiry({
        type: target.inquiryType,
        family: target.family,
      })

    // ---- Services ----
    case 'service':
      return router.push({
        name: 'explore',
        params: { type: 'relevant' },
        query: { family: 'service', group_type: target.key },
      })
    case 'services-all':
      return router.push({ name: 'group', params: { family: 'service' } })

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
      return router.push({ name: 'group' })

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
      return handleCreateInquiry({ type: 'proposal' })
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
</script>
