<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<script setup lang="ts">
// ============================================================
// EXISTING IMPORTS
// ============================================================
import { computed, onUnmounted, ref, watch, nextTick } from 'vue'
import { emit, unsubscribe } from '@nextcloud/event-bus'
import { t } from '@nextcloud/l10n'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { showError, showSuccess } from '@nextcloud/dialogs'
import NcAppContent from '@nextcloud/vue/components/NcAppContent'
import InquiryHeaderButtons from '../components/Inquiry/InquiryHeaderButtons.vue'
import InquiryGroupEditViewForm from '../components/InquiryGroup/InquiryGroupEditViewForm.vue'
import InquiryGroupCreateDlg from '../components/Create/InquiryGroupCreateDlg.vue'
import { useInquiryGroupStore } from '../stores/inquiryGroup.ts'
import { useInquiryGroupsStore } from '../stores/inquiryGroups.ts'
import { useSessionStore } from '../stores/session.ts'
import Collapsible from '../components/Base/modules/Collapsible.vue'
import type { CollapsibleProps } from '../components/Base/modules/Collapsible.vue'
import InquiryInfoCards from '../components/Cards/InquiryInfoCards.vue'

// ============================================================
// NEW IMPORTS - Experience System
// ============================================================
import ExperienceRenderer from '../components/Experience/ExperienceRenderer.vue'
import ExperienceSwitcher from '../components/Experience/ExperienceSwitcher.vue'
import { useGroupExperience } from '../composables/useGroupExperience'
import type { ExperienceKey, DisplayMode } from '../composables/useExperience'
import type { Inquiry } from '../Types/index.ts'
import type { Option } from '../types'

// ============================================================
// EXISTING STORE INITIALIZATION
// ============================================================
const forceRenderKey = ref(0)
const route = useRoute()
const router = useRouter()
const inquiryGroupStore = useInquiryGroupStore()
const inquiryGroupsStore = useInquiryGroupsStore()
const sessionStore = useSessionStore()
const isAppLoaded = ref(false)

const createGroupDlgToggle = ref(false)
const selectedInquiryGroupTypeForCreation = ref('')

// ============================================================
// EXPERIENCE STATE
// ============================================================
const currentGroup = computed(() => inquiryGroupStore.groupData || null)
const { 
    experience,
    displayMode,
    displayArchitecture,
    layoutConfig,
    hasCustomArchitecture,
    availableExperiences,
    switchExperience,
    switchDisplay
} = useGroupExperience(currentGroup)

// ============================================================
// EXISTING COMPUTED
// ============================================================
const availableGroups = computed(() => {
    const groups = sessionStore.currentUser.groups || {}
    if (typeof groups === 'object' && !Array.isArray(groups)) {
        return Object.keys(groups)
    }
    return groups
})

// ============================================================
// GROUP INQUIRIES
// ============================================================
const groupInquiries = computed(() => {
    if (!inquiryGroupStore.inquiryIds) return []
    // Fetch from inquiries store
    // This would need to be implemented based on your store structure
    return []
})

const groupOptions = computed(() => {
    const options: Option[] = []
    groupInquiries.value.forEach(inquiry => {
        if (inquiry.options) {
            options.push(...inquiry.options)
        }
    })
    return options
})

// ============================================================
// EXISTING FUNCTIONS
// ============================================================
async function loadInquiry(id: string) {
    try {
        await inquiryGroupStore.load(id)
        const result = inquiryGroupsStore.inquiryGroups.filter(i => 
            i.parentId === Number(id)
        )
        inquiryGroupStore.childs = result
        await nextTick()
        forceRenderKey.value += 1
    } catch  {
        showError(t('agora', 'Failed to load inquiry group'))
    } finally {
        isAppLoaded.value = true
    }
}

watch(
    () => route.params.id,
    async (newId) => {
        isAppLoaded.value = false
        await loadInquiry(newId as string)
    },
    { immediate: true }
)

onBeforeRouteUpdate(async (to, from, next) => {
    if (to.params.id) {
        inquiryGroupStore.reset()
    }
    next()
    emit('transitions-off', 500)
})

onUnmounted(() => {
    inquiryGroupStore.reset()
    unsubscribe('load-inquiry', () => {})
})

const collapsibleProps = computed<CollapsibleProps>(() => ({
    noCollapse: !inquiryGroupStore.configuration.collapseDescription || isShortDescription.value,
    initialState: inquiryGroupStore.currentUserStatus.countInquiries === 0 ? 'max' : 'min',
}))

// ============================================================
// isShortDescription computed
// ============================================================
const isShortDescription = computed(() => {
    const desc = inquiryGroupStore.description || ''
    return desc.length < 200
})

// ============================================================
// EXISTING FUNCTIONS
// ============================================================
const handleCloseDialog = () => {
    createGroupDlgToggle.value = false
    selectedInquiryGroupTypeForCreation.value = ''
}

const inquiryAdded = (inquiry) => {
    showSuccess(t('agora', 'Inquiry group {title} added', { title: inquiry.title }))
    createGroupDlgToggle.value = false
    selectedInquiryGroupTypeForCreation.value = ''
    router.push({
        name: 'group',
        params: { id: inquiry.id },
    })
}

// ============================================================
// EXPERIENCE HANDLERS
// ============================================================
function handleExperienceChange(key: ExperienceKey) {
    switchExperience(key)
}

function handleDisplayChange(mode: DisplayMode) {
    switchDisplay(mode)
}

function handleViewInquiry(inquiry: Inquiry) {
    router.push({
        name: 'inquiry',
        params: { id: inquiry.id }
    })
}

function handleViewOption(option: Option) {
    router.push({
        name: 'option',
        params: { id: option.id }
    })
}

function handleCreateInquiry() {
    // Open create dialog
    createGroupDlgToggle.value = true
    selectedInquiryGroupTypeForCreation.value = 'inquiry'
}
</script>

<template>
  <NcAppContent v-if="isAppLoaded" :key="forceRenderKey" class="inquiry-list">
    <!-- Collapsible description -->
    <Collapsible 
      v-if="inquiryGroupStore.description" 
      class="sticky-left" 
      v-bind="collapsibleProps" 
    />
    
    <!-- Header with Experience Switcher -->
    <div class="inquiry-group-header">
      <InquiryHeaderButtons />
      
      <!-- ============================================================ -->
      <!-- Experience Switcher - Only when group has custom architecture -->
      <!-- ============================================================ -->
      <div v-if="hasCustomArchitecture" class="experience-controls">
        <ExperienceSwitcher
          :current-experience="experience"
          :available-experiences="availableExperiences"
          @change="handleExperienceChange"
        />
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="area__main">
      <div class="view-content">
        <!-- ============================================================ -->
        <!-- Experience Renderer - For groups with display_architecture -->
        <!-- ============================================================ -->
        <div v-if="hasCustomArchitecture" class="experience-container">
          <ExperienceRenderer
            :group="inquiryGroupStore.groupData"
            :inquiries="groupInquiries"
            :options="groupOptions"
            :experience="experience"
            :display-mode="displayMode"
            :display-architecture="displayArchitecture"
            :layout-config="layoutConfig"
            :ui-config="inquiryGroupStore.ui"
            :show-header="false"
            :show-stats="true"
            :show-resources="true"
            :show-comments="true"
            @view-inquiry="handleViewInquiry"
            @view-option="handleViewOption"
            @create-inquiry="handleCreateInquiry"
          />
        </div>
        
        <!-- ============================================================ -->
        <!-- Fallback - Original view -->
        <!-- ============================================================ -->
        <InquiryGroupEditViewForm v-else /> 
      </div>

      <InquiryInfoCards class="sticky-left" />
    </div>
    
    <!-- Create Dialog -->
    <InquiryGroupCreateDlg
      v-if="createGroupDlgToggle"
      :inquiry-group-type="selectedInquiryGroupTypeForCreation"
      :parent-group-id="inquiryGroupStore.id"
      :available-groups="availableGroups"
      @close="handleCloseDialog"
      @added="inquiryAdded"
    />
  </NcAppContent>
</template>

<style lang="scss">
// ============================================================
// EXISTING STYLES (kept as is)
// ============================================================
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

// ============================================================
// NEW STYLES - Experience Integration
// ============================================================
.inquiry-group-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    flex-wrap: wrap;
    gap: 12px;

    .experience-controls {
        flex-shrink: 0;
    }
}

.experience-container {
    padding: 16px 0;
    width: 100%;
    min-height: 400px;
}

// ============================================================
// RESPONSIVE
// ============================================================
@media (max-width: 768px) {
    .inquiry-group-header {
        flex-direction: column;
        align-items: stretch;
        gap: 8px;

        .experience-controls {
            align-self: flex-start;
        }
    }
}
</style>
