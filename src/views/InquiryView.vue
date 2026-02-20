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
import { createInquiryContext, ContentType, canEdit } from '../utils/permissions.ts'



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

// Context for permissions
const context = computed(() => createInquiryContext(inquiryStore, sessionStore.appSettings))

const availableGroups = computed(() => {
  const groups = sessionStore.currentUser.groups || {}
  if (typeof groups === 'object' && !Array.isArray(groups)) {
    return Object.keys(groups)
  }
  return groups
})

async function routeChild(childId: string) {
  router.push({ name: 'inquiry', params: { id: childId } })
}

async function loadInquiry(id: string) {
  try {
    await inquiryStore.load(id)
    const result = inquiriesStore.inquiries.filter(i => 
      i.parentId === Number(id) &&
      i.configuration.access !== 'private'
    )
    inquiryStore.childs = result

    if (inquiryStore.childs.length === 0) {
      inquiryStore.status.forceEditMode = true
      editMode.value = true
    } else {
      inquiryStore.status.forceEditMode = false
      editMode.value = false
   } 
    inquiriesStore.setFamilyType(inquiryStore.family)

    await nextTick()
    forceRenderKey.value += 1
  } catch  {
    showError(t('agora', 'Failed to load inquiry'))
  } finally {
    isAppLoaded.value = true
  }
}

watch(
  () => route.params.id,
  async (newId) => {
    isAppLoaded.value = false
    await loadInquiry(newId as string)
    handleSave
  },
  { immediate: true }
)

// Compute isReadonly
const isReadonly = computed(() => {
  const user = sessionStore.currentUser
  if (inquiryStore.status.moderationStatus === 'rejected' || inquiryStore.status.moderationStatus === 'pending') return true
  if (!user) {
    return true
  }
  const canEditResult = canEdit(context.value)

  return !canEditResult
})

const isReadonlyDescription = computed(() => {

  if (inquiryStore.type === 'debate') {
    return false
  }
   return isReadonly.value
})

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

const handleSave = async () => {
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
  selectedMode.value = 'response' 
  selectedInquiryTypeForCreation.value = responseType
  createDlgToggle.value = true
}

const handleAllowedTransformation = (transformType: string) => {
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
  
  // Navigate to the new inquiry
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
  <NcAppContent v-if="isAppLoaded" :key="forceRenderKey" class="inquiry-list">
    <Collapsible v-if="inquiryStore.description" class="sticky-left" v-bind="collapsibleProps" />
    <InquiryHeaderButtons />
    <!-- Action toolbar component -->
    <InquiryActionToolbar
      v-if="editMode"
      :inquiry-store="inquiryStore"
      :session-store="sessionStore"
      :is-saving="isSaving"
      :is-readonly-description="isReadonlyDescription"
      @save="handleSave"
      @allowed-response="handleAllowedResponse"
      @allowed-transformation="handleAllowedTransformation"
    />

    <div class="area__main">

      <div class="view-content">
        <InquiryEditViewForm 
	  v-if="editMode" 
	  :is-readonly-description="isReadonlyDescription"
	  :is-readonly="isReadonly"
	  />
        <InquiryTransition
          v-else
          :is-loaded-parent="isAppLoaded"
          @route-child="routeChild"
          @edit-parent="enableEditMode"
        />
      </div>

      <InquiryInfoCards class="sticky-left" />
    </div>

    <InquiryCreateDlg
      v-if="createDlgToggle"
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
