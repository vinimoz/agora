<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<script setup lang="ts">
import { computed, onUnmounted, ref, watch, nextTick } from 'vue'
import { emit, unsubscribe } from '@nextcloud/event-bus'
import { t } from '@nextcloud/l10n'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { showError, showSuccess } from '@nextcloud/dialogs'

import NcAppContent from '@nextcloud/vue/components/NcAppContent'

import InquiryActionToolbar from '../components/Inquiry/InquiryActionToolbar.vue'
import InquiryHeaderButtons from '../components/Inquiry/InquiryHeaderButtons.vue'
import InquiryEditViewForm from '../components/Inquiry/InquiryEditViewForm.vue'
import InquiryTransition from '../components/Inquiry/InquiryTransition.vue'
import InquiryCreateDlg from '../components/Create/InquiryCreateDlg.vue'
import { useInquiryStore } from '../stores/inquiry.ts'
import { useInquiriesStore } from '../stores/inquiries.ts'
import { useSessionStore } from '../stores/session.ts'
import Collapsible from '../components/Base/modules/Collapsible.vue'
import type { CollapsibleProps } from '../components/Base/modules/Collapsible.vue'
import InquiryInfoCards from '../components/Cards/InquiryInfoCards.vue'
import { createInquiryContext, canEdit } from '../utils/permissions.ts'
import { loadContext } from '../composables/context'


const props = defineProps<{
  id?: string | number
  token?: string | number
}>()


const forceRenderKey = ref(0)
const selectedMode = ref('response')
const route = useRoute()
const router = useRouter()
const inquiryStore = useInquiryStore()
const inquiriesStore = useInquiriesStore()
const sessionStore = useSessionStore()
const editMode = ref(false)
const isAppLoaded = ref(false)

const createDlgToggle = ref(false)
const selectedInquiryTypeForCreation = ref('')
const selectedGroups = ref([])
const isSaving = ref(false)

// Add error tracking
const error = ref<Error | null>(null)

const isPublicRoute = computed(() => route.name === 'publicInquiry' || !!props.token)

const identifier = computed(() => {
  if (isPublicRoute.value) {
    return props.token || route.params.token as string
  }
  return props.id || route.params.id as string
})


// Context for permissions
const context = computed(() => createInquiryContext(inquiryStore, sessionStore.appSettings))

const availableGroups = computed(() => {
  const groups = sessionStore.currentUser?.groups || {}
  if (typeof groups === 'object' && !Array.isArray(groups)) {
    return Object.keys(groups)
  }
  return groups
})

async function routeChild(childId: string) {
  router.push({ name: 'inquiry', params: { id: childId } })
}

async function loadInquiry() {
  if (!identifier.value) {
    error.value = new Error(t('agora', 'No identifier provided'))
    return
  }

  error.value = null
  isAppLoaded.value = false

  try {
    if (isPublicRoute.value) {
      await inquiryStore.loadByToken(identifier.value as string)
    } else {
      await inquiryStore.load(identifier.value as string)
    }

    if (isPublicRoute.value) {
      inquiryStore.childs = [] 
    } else {
      const result = inquiriesStore.inquiries.filter(i =>
        i.parentId === Number(identifier.value) &&
        i.configuration.access !== 'private'
      )
      inquiryStore.childs = result
    }

    if (inquiryStore.childs?.length === 0 && !isPublicRoute.value) {
      inquiryStore.status.forceEditMode = true
      editMode.value = true
    } else {
      inquiryStore.status.forceEditMode = false
      editMode.value = false
    }

    inquiriesStore.setFamilyType(inquiryStore.family)

    await nextTick()
    forceRenderKey.value += 1
  } catch (e) {
    console.error('Error in loadInquiry:', e)
    error.value = e as Error
    
    if (isPublicRoute.value) {
      showError(t('agora', 'Failed to load public inquiry. The link may be invalid or expired.'))
    } else {
      showError(t('agora', 'Failed to load inquiry'))
    }
  } finally {
    isAppLoaded.value = true
  }
}

watch(
  identifier,
  async () => {
    isAppLoaded.value = false
    await loadInquiry()
  },
  { immediate: true }
)

// Compute isReadonly
const isReadonly = computed(() => {
  if (isPublicRoute.value) {
    return true
  }
  
  const user = sessionStore.currentUser
  if (inquiryStore.status?.moderationStatus === 'rejected' || 
      inquiryStore.status?.moderationStatus === 'pending') {
    return true
  }
  if (!user) {
    return true
  }
  const canEditResult = canEdit(context.value)

  return !canEditResult
})

const enableEditMode = () => {
  if (isPublicRoute.value) return
  
  editMode.value = true
  inquiryStore.status.forceEditMode = true
}

onBeforeRouteUpdate(async (to, from, next) => {
  if (to.name === 'publicInquiry' && to.params.token !== from.params.token) {
    loadContext(to)
  }
  if (to.params.id || to.params.token) {
    inquiryStore.reset()
  }
  next()
  emit('transitions-off', 500)
})

onUnmounted(() => {
  inquiryStore.reset()
  unsubscribe('load-inquiry', () => {})
})

const isShortDescription = computed(() => {
  if (!inquiryStore.description) return true
  return (
    inquiryStore.description.split(' ').length < 20 &&
    inquiryStore.description.split(/\r\n|\r|\n/).length < 5
  )
})

const collapsibleProps = computed<CollapsibleProps>(() => ({
  noCollapse: !inquiryStore.configuration?.collapseDescription || isShortDescription.value,
  initialState: inquiryStore.currentUserStatus?.countInquiries === 0 ? 'max' : 'min',
}))

const handleSave = async () => {
  if (isPublicRoute.value) return
  
  if (isSaving.value) return

  if (!inquiryStore.title || inquiryStore.title.trim() === '') {
    showError(t('agora', 'Title is mandatory'), { timeout: 2000 })
    return
  }

  isSaving.value = true

  try {
    await inquiryStore.update({
      id: inquiryStore.id,
      type: inquiryStore.type,
      title: inquiryStore.title,
      description: inquiryStore.description,
      categoryId: inquiryStore.categoryId,
      locationId: inquiryStore.locationId,
      parentId: inquiryStore.parentId,
    })
    showSuccess(t('agora', 'The inquiry has been saved'), { timeout: 2000 })
  } catch {
    showError(t('agora', 'Error saving inquiry!'), { timeout: 2000 })
  } finally {
    isSaving.value = false
  }
}

const handleAllowedResponse = (responseType: string) => {
  if (isPublicRoute.value) return
  
  selectedMode.value = 'response' 
  selectedInquiryTypeForCreation.value = responseType
  createDlgToggle.value = true
}

const handleAllowedTransformation = (transformType: string) => {
  if (isPublicRoute.value) return
  
  selectedMode.value = 'transform' 
  selectedInquiryTypeForCreation.value = transformType
  createDlgToggle.value = true
}

const handleCloseDialog = () => {
  createDlgToggle.value = false
  selectedInquiryTypeForCreation.value = ''
}

const inquiryAdded = (inquiry) => {
  showSuccess(t('agora', 'Inquiry {title} added', { title: inquiry.title }))
  createDlgToggle.value = false
  selectedInquiryTypeForCreation.value = ''

  router.push({
    name: 'inquiry',
    params: { id: inquiry.id },
  })
}

const handleGroupUpdate = (groups) => {
  selectedGroups.value = groups
}
</script>

<template>
  <div v-if="error" class="error-container">
    <h3>{{ t('agora', 'Error loading inquiry') }}</h3>
    <p>{{ error.message }}</p>
    <pre v-if="!isPublicRoute">{{ error.stack }}</pre>
  </div>

  <NcAppContent v-if="isAppLoaded" :key="forceRenderKey" class="inquiry-list">
    <div v-if="isPublicRoute" class="public-banner">
      <span class="public-icon">🔓</span>
      {{ t('agora', 'You are viewing a public inquiry') }}
    </div>

    <Collapsible v-if="inquiryStore.description" class="sticky-left" v-bind="collapsibleProps" />
    <InquiryHeaderButtons />
    
    <!-- Action toolbar component - caché en mode public -->
    <InquiryActionToolbar
      v-if="editMode && !isPublicRoute"
      :inquiry-store="inquiryStore"
      :session-store="sessionStore"
      :is-saving="isSaving"
      :is-readonly="isReadonly"
      @save="handleSave"
      @allowed-response="handleAllowedResponse"
      @allowed-transformation="handleAllowedTransformation"
    />

    <div class="area__main">
      <div class="view-content">
        <InquiryEditViewForm 
          v-if="editMode || isPublicRoute" 
          :is-readonly="isReadonly"
        />
        <InquiryTransition
          v-else-if="!isPublicRoute"
          :is-loaded-parent="isAppLoaded"
          @route-child="routeChild"
          @edit-parent="enableEditMode"
        />
      </div>

      <InquiryInfoCards class="sticky-left" /> 
    </div>

    <!-- Modal de création - caché en mode public -->
    <InquiryCreateDlg
      v-if="createDlgToggle && !isPublicRoute"
      :response-type="selectedInquiryTypeForCreation"
      :selected-groups="selectedGroups"
      :selected-mode="selectedMode"
      :available-groups="availableGroups"
      :parent-inquiry-id="inquiryStore.id"
      :default-title="selectedInquiryTypeForCreation === 'official' 
        ? t('agora', 'Official response for: {title}', { title: inquiryStore.title })
        : t('agora', 'Response for: {title}', { title: inquiryStore.title })"
      @close="handleCloseDialog"
      @added="inquiryAdded"
      @update:selected-groups="handleGroupUpdate"
    />
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

.public-banner {
  background-color: var(--color-background-dark);
  border-bottom: 1px solid var(--color-border);
  padding: 8px 16px;
  text-align: center;
  font-size: 0.9em;
  color: var(--color-text-lighter);
  
  .public-icon {
    margin-right: 8px;
  }
}

.error-container {
  padding: 20px;
  margin: 20px;
  background-color: var(--color-background-dark);
  border-left: 4px solid var(--color-error);
  border-radius: var(--border-radius);
  
  h3 {
    color: var(--color-error);
    margin-bottom: 10px;
  }
  
  pre {
    margin-top: 10px;
    padding: 10px;
    background-color: var(--color-background-darker);
    overflow: auto;
    font-size: 0.8em;
  }
}
</style>
