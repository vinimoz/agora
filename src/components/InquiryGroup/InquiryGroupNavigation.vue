<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="inquiry-group-navigation">
    <!-- Header -->
    <div class="nav-header">
      <div class="header-left">
        <component :is="Icons.Folder" :size="18" class="header-icon" />
        <span class="header-title">{{ t('agora', 'Groups') }}</span>
        <span class="nav-count">{{ groups.length }}</span>
      </div>
      <div class="header-right">
        <button 
          v-if="showCreateButton && canCreateGroup"
          class="create-btn"
          :title="t('agora', 'Create group')"
          @click="handleCreate"
        >
          <component :is="Icons.Plus" :size="16" />
        </button>
      </div>
    </div>

    <!-- Search -->
    <div v-if="groups.length > 5" class="nav-search">
      <component :is="Icons.Search" :size="14" class="search-icon" />
      <input
        v-model="searchQuery"
        type="text"
        class="search-input"
        :placeholder="t('agora', 'Search groups...')"
        @input="handleSearch"
      />
    </div>

    <!-- Navigation List -->
    <div ref="navListRef" class="nav-list">
      <!-- Root Groups -->
      <div
        v-for="group in filteredGroups"
        :key="group.id"
        class="nav-item-wrapper"
      >
        <div
          class="nav-item"
          :class="{
            active: isActive(group),
            'has-children': getChildren(group).length > 0,
            'expanded': expandedGroups.has(group.id),
            'level-0': getDepth(group) === 0,
            'level-1': getDepth(group) === 1,
            'level-2': getDepth(group) >= 2
          }"
          @click="handleClick(group)"
        >
          <!-- Expand/Collapse Toggle -->
          <button
            v-if="getChildren(group).length > 0"
            class="toggle-btn"
            :title="expandedGroups.has(group.id) ? t('agora', 'Collapse') : t('agora', 'Expand')"
            @click.stop="toggleGroup(group.id)"
          >
            <component 
              :is="expandedGroups.has(group.id) ? Icons.ChevronDown : Icons.ChevronRight" 
              :size="14" 
            />
          </button>
          <span v-else class="toggle-placeholder"></span>

          <!-- Group Icon -->
          <div class="nav-icon" :class="getIconClass(group)">
            <component :is="getGroupIcon(group.type)" :size="16" />
          </div>

          <!-- Group Info -->
          <div class="nav-content">
            <div class="nav-label">
              <span class="group-title">{{ group.title }}</span>
              <span v-if="group.groupStatus === 'archived'" class="status-badge archived">
                {{ t('agora', 'Archived') }}
              </span>
              <span v-if="group.groupStatus === 'draft'" class="status-badge draft">
                {{ t('agora', 'Draft') }}
              </span>
            </div>
            <div v-if="group.description" class="nav-description">
              {{ truncateText(group.description, 60) }}
            </div>
          </div>

          <!-- Badges -->
          <div class="nav-badges">
            <span v-if="group.inquiryIds?.length" class="nav-badge" :title="t('agora', 'Inquiries')">
              <component :is="Icons.ClipboardList" :size="12" />
              {{ group.inquiryIds.length }}
            </span>
            <span v-if="getChildren(group).length > 0" class="nav-badge children" :title="t('agora', 'Subgroups')">
              <component :is="Icons.Folder" :size="12" />
              {{ getChildren(group).length }}
            </span>
          </div>
        </div>

        <!-- Children -->
        <div 
          v-if="getChildren(group).length > 0 && expandedGroups.has(group.id)"
          class="nav-children"
        >
          <InquiryGroupNavigation
            v-if="getChildren(group).length > 0"
            :groups="getChildren(group)"
            :active-id="activeId"
            :depth="getDepth(group) + 1"
            :max-depth="maxDepth"
            :show-create-button="false"
            @click="handleChildClick"
            @create="handleCreate"
          />
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredGroups.length === 0" class="empty-state">
        <component :is="Icons.FolderOpen" :size="32" class="empty-icon" />
        <p>{{ searchQuery ? t('agora', 'No groups match your search') : t('agora', 'No groups available') }}</p>
        <NcButton 
          v-if="showCreateButton && canCreateGroup"
          type="primary"
          size="small"
          @click="handleCreate"
        >
          <template #icon>
            <component :is="Icons.Plus" :size="14" />
          </template>
          {{ t('agora', 'Create group') }}
        </NcButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import { InquiryGeneralIcons as Icons } from '../../utils/icons'
import { getInquiryGroupTypeData } from '../../helpers/modules/InquiryHelper'
import { useSessionStore } from '../../stores/session'
import type { InquiryGroup } from '../../stores/inquiryGroups.types'

// ============================================================
// PROPS
// ============================================================
const props = defineProps<{
  groups: InquiryGroup[]
  activeId?: number
  depth?: number
  maxDepth?: number
  showCreateButton?: boolean
}>()

// ============================================================
// EMITS
// ============================================================
const emit = defineEmits<{
  click: [group: InquiryGroup]
  create: []
}>()

// ============================================================
// STORES
// ============================================================
const sessionStore = useSessionStore()

// ============================================================
// STATE
// ============================================================
const searchQuery = ref('')
const expandedGroups = ref<Set<number>>(new Set())
const navListRef = ref<HTMLElement | null>(null)

// ============================================================
// COMPUTED
// ============================================================
const canCreateGroup = computed(() => sessionStore.currentUser.isAdmin || sessionStore.currentUser.isGroupEditor)

const filteredGroups = computed(() => {
  if (!searchQuery.value) return props.groups
  
  const query = searchQuery.value.toLowerCase()
  return props.groups.filter(group => {
    const titleMatch = group.title.toLowerCase().includes(query)
    const descMatch = group.description?.toLowerCase().includes(query) || false
    return titleMatch || descMatch
  })
})

// ============================================================
// METHODS
// ============================================================
function getGroupIcon(type: string) {
  const typeData = getInquiryGroupTypeData(type, sessionStore.appSettings.inquiryGroupTypeTab)
  return typeData?.icon || Icons.Folder
}

function getIconClass(group: InquiryGroup): string {
  const type = group.type?.toLowerCase() || 'default'
  return `icon-${type}`
}

function getChildren(group: InquiryGroup): InquiryGroup[] {
  // Find children from the full groups list
  // This assumes the parent component has access to all groups
  // If not, we need to use the store
  return props.groups.filter(g => g.parentId === group.id)
}

function getDepth(group: InquiryGroup): number {
  let depth = 0
  let current = group
  while (current.parentId) {
    const parent = props.groups.find(g => g.id === current.parentId)
    if (!parent) break
    depth++
    current = parent
  }
  return depth + (props.depth || 0)
}

function isActive(group: InquiryGroup): boolean {
  return props.activeId === group.id
}

function toggleGroup(id: number) {
  if (expandedGroups.value.has(id)) {
    expandedGroups.value.delete(id)
  } else {
    expandedGroups.value.add(id)
  }
}

function handleClick(group: InquiryGroup) {
  emit('click', group)
}

function handleChildClick(group: InquiryGroup) {
  emit('click', group)
}

function handleCreate() {
  emit('create')
}

function handleSearch() {
  // Search is handled by the computed property
}

function truncateText(text: string, maxLength: number): string {
  if (!text) return ''
  return text.length > maxLength ? `${text.substring(0, maxLength)  }…` : text
}

// ============================================================
// LIFECYCLE
// ============================================================
onMounted(() => {
  // Auto-expand the active group's parents
  if (props.activeId) {
    const activeGroup = props.groups.find(g => g.id === props.activeId)
    if (activeGroup) {
      let current = activeGroup
      while (current.parentId) {
        const parent = props.groups.find(g => g.id === current.parentId)
        if (parent) {
          expandedGroups.value.add(parent.id)
          current = parent
        } else {
          break
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.inquiry-group-navigation {
  background: var(--color-main-background);
  border-radius: 8px;
  border: 1px solid var(--color-border);
  overflow: hidden;
}

/* ============================================================ */
/* HEADER                                                       */
/* ============================================================ */
.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--color-background-dark);
  border-bottom: 1px solid var(--color-border);

  .header-left {
    display: flex;
    align-items: center;
    gap: 8px;

    .header-icon {
      color: var(--color-primary-element);
    }

    .header-title {
      font-weight: 600;
      font-size: 14px;
      color: var(--color-main-text);
    }

    .nav-count {
      font-size: 12px;
      font-weight: 500;
      background: var(--color-background-darker);
      padding: 0 10px;
      border-radius: 12px;
      color: var(--color-text-lighter);
    }
  }

  .header-right {
    .create-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border: none;
      border-radius: 6px;
      background: var(--color-primary-element);
      color: white;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: var(--color-primary-element-hover);
        transform: scale(1.05);
      }
    }
  }
}

/* ============================================================ */
/* SEARCH                                                       */
/* ============================================================ */
.nav-search {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--color-border-light);
  background: var(--color-background-hover);

  .search-icon {
    color: var(--color-text-lighter);
    flex-shrink: 0;
  }

  .search-input {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 13px;
    color: var(--color-main-text);
    outline: none;

    &::placeholder {
      color: var(--color-text-lighter);
    }
  }
}

/* ============================================================ */
/* NAVIGATION LIST                                              */
/* ============================================================ */
.nav-list {
  max-height: 500px;
  overflow-y: auto;
  padding: 4px 0;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: 4px;
  }

  &:hover::-webkit-scrollbar-thumb {
    background: var(--color-text-lighter);
  }
}

/* ============================================================ */
/* NAV ITEM                                                     */
/* ============================================================ */
.nav-item-wrapper {
  .nav-item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px 8px 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    border-left: 3px solid transparent;
    position: relative;

    &:hover {
      background: var(--color-background-hover);
    }

    &.active {
      background: var(--color-primary-light);
      border-left-color: var(--color-primary-element);

      .group-title {
        color: var(--color-primary-element);
        font-weight: 600;
      }
    }

    &.level-0 {
      padding-left: 6px;
    }

    &.level-1 {
      padding-left: 26px;
    }

    &.level-2 {
      padding-left: 46px;
    }

    .toggle-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      padding: 0;
      border: none;
      background: transparent;
      color: var(--color-text-lighter);
      cursor: pointer;
      transition: all 0.2s ease;
      flex-shrink: 0;
      border-radius: 4px;

      &:hover {
        background: var(--color-background-hover);
        color: var(--color-main-text);
      }
    }

    .toggle-placeholder {
      width: 20px;
      flex-shrink: 0;
    }

    .nav-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 6px;
      flex-shrink: 0;
      color: white;

      &.icon-project { background: #3b82f6; }
      &.icon-consultation { background: #8b5cf6; }
      &.icon-decision { background: #10b981; }
      &.icon-initiative { background: #f59e0b; }
      &.icon-commission { background: #ec4899; }
      &.icon-chapter { background: #06b6d4; }
      &.icon-default { background: #6b7280; }
    }

    .nav-content {
      flex: 1;
      min-width: 0;

      .nav-label {
        display: flex;
        align-items: center;
        gap: 6px;

        .group-title {
          font-size: 14px;
          font-weight: 500;
          color: var(--color-main-text);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .status-badge {
          font-size: 9px;
          font-weight: 600;
          text-transform: uppercase;
          padding: 1px 6px;
          border-radius: 8px;
          flex-shrink: 0;

          &.archived {
            background: rgba(148, 163, 184, 0.2);
            color: #64748b;
          }

          &.draft {
            background: rgba(245, 158, 11, 0.2);
            color: #f59e0b;
          }
        }
      }

      .nav-description {
        font-size: 12px;
        color: var(--color-text-lighter);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 1px;
      }
    }

    .nav-badges {
      display: flex;
      gap: 4px;
      flex-shrink: 0;
      margin-left: 4px;

      .nav-badge {
        display: inline-flex;
        align-items: center;
        gap: 3px;
        font-size: 11px;
        font-weight: 500;
        color: var(--color-text-lighter);
        background: var(--color-background-dark);
        padding: 1px 6px;
        border-radius: 10px;

        &.children {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }
      }
    }

    &.has-children {
      .nav-content .nav-label .group-title {
        font-weight: 600;
      }
    }
  }

  .nav-children {
    margin: 0;
    padding: 0;

    :deep(.inquiry-group-navigation) {
      border: none;
      border-radius: 0;
      
      .nav-header {
        display: none;
      }

      .nav-search {
        display: none;
      }

      .nav-list {
        max-height: none;
      }
    }
  }
}

/* ============================================================ */
/* EMPTY STATE                                                  */
/* ============================================================ */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 32px 20px;
  text-align: center;
  color: var(--color-text-lighter);

  .empty-icon {
    opacity: 0.3;
    color: var(--color-text-lighter);
  }

  p {
    margin: 0;
    font-size: 14px;
    max-width: 200px;
  }
}
</style>
