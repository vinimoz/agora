<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="group-tools-view">
    <!-- Tab Navigation -->
    <div class="tab-navigation">
      <div class="tab-container">
        <button
          v-for="tab in availableTabs"
          :key="tab.id"
          class="tab-button"
          :class="{ active: activeTab === tab.id }"
          @click="switchTab(tab.id)"
        >
          <component :is="tab.icon" :size="18" class="tab-icon" />
          <span class="tab-label">{{ tab.label }}</span>
          <span v-if="tab.badge" class="tab-badge">{{ tab.badge }}</span>
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      <!-- Overview Tab -->
      <div v-show="activeTab === 'overview'" class="tab-panel">
        <InquiryGroupViewMain 
          :inquiry-ids="group.inquiryIds" 
          @view-inquiry="handleViewInquiry"
        />
      </div>

      <!-- Vote Tab -->
      <div v-show="activeTab === 'vote'" class="tab-panel">
        <FamilyLayoutVote
          target-type="inquiry"
          :parent-id="groupId"
          :can-manage-vote="canManageVote"
          :is-readonly="isReadonly"
          :can-add-options="canAddInquiries"
          @option-family-changed="handleInquiryFamilyChanged"
          @add-option="handleAddInquiry"
          @select-option="handleSelectInquiry"
        />
      </div>

      <!-- Kanban Tab -->
      <div v-show="activeTab === 'kanban'" class="tab-panel">
        <div class="kanban-controls">
          <NcSelect
            v-model="kanbanGroupBy"
            :options="kanbanGroupOptions"
            label="label"
            :placeholder="t('agora', 'Group by...')"
            class="group-by-select"
          />
        </div>
        <InquiryKanban
          :inquiries="groupInquiries"
          :group-by="kanbanGroupBy"
          @open-detail="handleViewInquiry"
          @status-changed="refreshGroup"
        />
      </div>

      <!-- Timeline Tab -->
      <div v-show="activeTab === 'timeline'" class="tab-panel">
        <InquiryTimeline
          :inquiries="groupInquiries"
          @open-detail="handleViewInquiry"
        />
      </div>

      <!-- Calendar Tab (Future) -->
      <div v-show="activeTab === 'calendar'" class="tab-panel">
        <div class="coming-soon">
          <Calendar :size="48" />
          <h3>{{ t('agora', 'Calendar View') }}</h3>
          <p>{{ t('agora', 'Coming soon!') }}</p>
        </div>
      </div>

      <!-- Tree Tab (Future) -->
      <div v-show="activeTab === 'tree'" class="tab-panel">
        <div class="coming-soon">
          <Tree :size="48" />
          <h3>{{ t('agora', 'Tree View') }}</h3>
          <p>{{ t('agora', 'Coming soon!') }}</p>
        </div>
      </div>

      <!-- Stats Tab (Future) -->
      <div v-show="activeTab === 'stats'" class="tab-panel">
        <div class="coming-soon">
          <BarChart :size="48" />
          <h3>{{ t('agora', 'Statistics') }}</h3>
          <p>{{ t('agora', 'Coming soon!') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { t } from '@nextcloud/l10n'
import NcSelect from '@nextcloud/vue/components/NcSelect'
import { 
  LayoutDashboard, 
  Vote, 
  Kanban, 
  Calendar, 
  GitBranch, 
  BarChart,
  Clock
} from 'lucide-vue-next'

import { useInquiryGroupsStore } from '../stores/inquiryGroups'
import { useInquiriesStore } from '../stores/inquiries'
import { useSessionStore } from '../stores/session'
import { useInquiryGroupStore } from '../stores/inquiryGroup'

import InquiryGroupViewMain from '../components/InquiryGroupViewMain.vue'
import FamilyLayoutVote from '../components/FamilyLayoutVote.vue'
import InquiryKanban from '../components/InquiryKanban.vue'
import InquiryTimeline from '../components/InquiryTimeline.vue'

// Props
const props = defineProps<{
  groupId: number
}>()

// Stores
const groupStore = useInquiryGroupStore()
const groupsStore = useInquiryGroupsStore()
const inquiriesStore = useInquiriesStore()
const sessionStore = useSessionStore()
const route = useRoute()
const router = useRouter()

// State
const activeTab = ref('overview')
const kanbanGroupBy = ref('status')

// Computed
const group = computed(() => groupStore.group)
const groupInquiries = computed(() => {
  if (!group.value?.inquiryIds) return []
  return group.value.inquiryIds
    .map(id => inquiriesStore.byId[id])
    .filter(Boolean)
})

const canManageVote = computed(() => {
  // Check if user can manage vote for this group
  return sessionStore.currentUser?.isAdmin || false
})

const isReadonly = computed(() => {
  // Check if group is readonly
  return group.value?.groupStatus === 'archived'
})

const canAddInquiries = computed(() => {
  return canManageVote.value && !isReadonly.value
})

// Tab configuration
const availableTabs = computed(() => [
  { 
    id: 'overview', 
    label: t('agora', 'Overview'), 
    icon: LayoutDashboard,
    badge: null
  },
  { 
    id: 'vote', 
    label: t('agora', 'Vote'), 
    icon: Vote,
    badge: group.value?.inquiryIds?.length || 0
  },
  { 
    id: 'kanban', 
    label: t('agora', 'Kanban'), 
    icon: Kanban,
    badge: null
  },
  { 
    id: 'timeline', 
    label: t('agora', 'Timeline'), 
    icon: Clock,
    badge: null
  },
  { 
    id: 'calendar', 
    label: t('agora', 'Calendar'), 
    icon: Calendar,
    badge: null
  },
  { 
    id: 'tree', 
    label: t('agora', 'Tree'), 
    icon: GitBranch,
    badge: null
  },
  { 
    id: 'stats', 
    label: t('agora', 'Stats'), 
    icon: BarChart,
    badge: null
  }
])

// Kanban grouping options
const kanbanGroupOptions = [
  { value: 'status', label: t('agora', 'Status') },
  { value: 'type', label: t('agora', 'Type') },
  { value: 'category', label: t('agora', 'Category') },
  { value: 'owner', label: t('agora', 'Owner') },
  { value: 'tag', label: t('agora', 'Tag') },
  { value: 'engine', label: t('agora', 'Voting Engine') }
]

// Methods
function switchTab(tabId: string) {
  activeTab.value = tabId
  // Update URL query parameter for shareability
  router.replace({ query: { ...route.query, tab: tabId } })
}

function handleViewInquiry(inquiryId: number) {
  router.push({ name: 'inquiry', params: { id: inquiryId } })
}

function handleInquiryFamilyChanged(payload: any) {
  // Handle inquiry family changes
  console.log('Inquiry family changed:', payload)
  refreshGroup()
}

function handleAddInquiry() {
  // Open add inquiry modal or navigate to create
  router.push({ name: 'inquiry-create', query: { groupId: props.groupId } })
}

function handleSelectInquiry(inquiry: any) {
  // Handle inquiry selection
  handleViewInquiry(inquiry.id)
}

async function refreshGroup() {
  await groupStore.load(props.groupId)
  await groupsStore.fetchAllGroups()
}

// Watch URL for tab parameter
watch(
  () => route.query.tab,
  (tab) => {
    if (tab && typeof tab === 'string' && availableTabs.value.some(t => t.id === tab)) {
      activeTab.value = tab
    }
  },
  { immediate: true }
)

// Lifecycle
onMounted(async () => {
  await refreshGroup()
  
  // Set initial tab from URL or default
  const tabParam = route.query.tab as string
  if (tabParam && availableTabs.value.some(t => t.id === tabParam)) {
    activeTab.value = tabParam
  }
})
</script>

<style scoped lang="scss">
.group-tools-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color-main-background);
  
  .tab-navigation {
    background: var(--color-background-dark);
    border-bottom: 1px solid var(--color-border);
    padding: 0 24px;
    flex-shrink: 0;
    
    .tab-container {
      display: flex;
      gap: 4px;
      overflow-x: auto;
      padding: 8px 0;
      
      .tab-button {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        border: none;
        background: transparent;
        color: var(--color-text-lighter);
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        border-radius: 8px;
        transition: all 0.2s ease;
        white-space: nowrap;
        
        &:hover {
          background: var(--color-background-hover);
          color: var(--color-main-text);
        }
        
        &.active {
          background: var(--color-primary-element);
          color: white;
          
          .tab-icon {
            color: white;
          }
        }
        
        .tab-icon {
          flex-shrink: 0;
        }
        
        .tab-badge {
          background: var(--color-primary-element);
          color: white;
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 12px;
          font-weight: 600;
          min-width: 20px;
          text-align: center;
        }
      }
    }
  }
  
  .tab-content {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
    
    .tab-panel {
      animation: fadeIn 0.3s ease;
    }
    
    .coming-soon {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 40px;
      color: var(--color-text-lighter);
      
      svg {
        color: var(--color-primary-element);
        margin-bottom: 24px;
        opacity: 0.5;
      }
      
      h3 {
        font-size: 24px;
        margin-bottom: 12px;
        color: var(--color-main-text);
      }
      
      p {
        font-size: 16px;
      }
    }
  }
  
  .kanban-controls {
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
    
    .group-by-select {
      width: 200px;
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .group-tools-view {
    .tab-navigation {
      padding: 0 12px;
      
      .tab-button {
        padding: 8px 12px;
        font-size: 13px;
        
        .tab-label {
          display: none;
        }
        
        .tab-badge {
          display: none;
        }
      }
    }
    
    .tab-content {
      padding: 16px;
    }
    
    .kanban-controls {
      .group-by-select {
        width: 100%;
      }
    }
  }
}
</style>
