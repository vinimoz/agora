<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="experience-sidebar">
    <!-- Group Info -->
    <div v-if="group" class="sidebar-group-info">
      <div class="group-avatar">
        <component :is="getGroupIcon(group.type)" :size="32" />
      </div>
      <div class="group-details">
        <h4 class="group-name">{{ group.title }}</h4>
        <span class="group-type">{{ getGroupTypeLabel(group.type) }}</span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="sidebar-nav">
      <div class="nav-section">
        <h5 class="nav-section-title">{{ t('agora', 'Content') }}</h5>
        <div 
          v-for="item in navItems" 
          :key="item.key"
          class="nav-item"
          :class="{ active: item.active }"
          @click="item.action()"
        >
          <component :is="item.icon" :size="18" class="nav-icon" />
          <span class="nav-label">{{ item.label }}</span>
          <span v-if="item.count !== undefined" class="nav-count">{{ item.count }}</span>
        </div>
      </div>

      <div class="nav-section">
        <h5 class="nav-section-title">{{ t('agora', 'Tools') }}</h5>
        <div 
          v-for="tool in toolItems" 
          :key="tool.key"
          class="nav-item tool-item"
          :class="{ active: tool.active }"
          @click="tool.action()"
        >
          <component :is="tool.icon" :size="18" class="nav-icon" />
          <span class="nav-label">{{ tool.label }}</span>
        </div>
      </div>

      <div class="nav-section">
        <h5 class="nav-section-title">{{ t('agora', 'Features') }}</h5>
        <div 
          class="nav-item toggle-item"
          :class="{ active: showResources }"
          @click="emit('toggleResources')"
        >
          <component :is="Icons.Document" :size="18" class="nav-icon" />
          <span class="nav-label">{{ t('agora', 'Resources') }}</span>
          <span class="toggle-indicator">
            <component :is="showResources ? Icons.Check : Icons.Close" :size="14" />
          </span>
        </div>
        <div 
          class="nav-item toggle-item"
          :class="{ active: showComments }"
          @click="emit('toggleComments')"
        >
          <component :is="Icons.Comment" :size="18" class="nav-icon" />
          <span class="nav-label">{{ t('agora', 'Comments') }}</span>
          <span class="toggle-indicator">
            <component :is="showComments ? Icons.Check : Icons.Close" :size="14" />
          </span>
        </div>
      </div>
    </nav>

    <!-- Quick Stats -->
    <div class="sidebar-stats">
      <div class="stat-item">
        <span class="stat-value">{{ inquiries?.length || 0 }}</span>
        <span class="stat-label">{{ t('agora', 'Inquiries') }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ options?.length || 0 }}</span>
        <span class="stat-label">{{ t('agora', 'Options') }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ group?.participantCount || 0 }}</span>
        <span class="stat-label">{{ t('agora', 'Participants') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import { InquiryGeneralIcons as Icons } from '../../utils/icons'
import { getInquiryGroupTypeData } from '../../helpers/modules/InquiryHelper'
import { useSessionStore } from '../../stores/session'
import type { InquiryGroup } from '../../stores/inquiryGroups.types'
import type { Inquiry } from '../../Types'

// Import tool vocabulary
import { ALL_TOOLS, type ToolValue } from '../Types/experience.types'

// Only include tools that are in ALL_TOOLS
const TOOL_ICON_MAP: Partial<Record<ToolValue, { icon: any; label: string }>> = {
  debate: { icon: Icons.MessageSquare, label: 'Debate' },
  vote: { icon: Icons.CheckCircle, label: 'Vote' },
  support: { icon: Icons.ThumbUp, label: 'Support' },
  kanban: { icon: Icons.Board, label: 'Kanban' },
  timeline: { icon: Icons.Clock, label: 'Timeline' },
  wiki: { icon: Icons.Book, label: 'Wiki' },
  analytics: { icon: Icons.BarChart, label: 'Analytics' },
  compare: { icon: Icons.Compare, label: 'Compare' },
  quorum: { icon: Icons.Users, label: 'Quorum' },
  consensus: { icon: Icons.Handshake, label: 'Consensus' },
  structure: { icon: Icons.FolderTree, label: 'Structure' },
  search: { icon: Icons.Magnify, label: 'Search' },
  filter: { icon: Icons.Filter, label: 'Filter' },
  resources: { icon: Icons.Document, label: 'Resources' },
}

const props = defineProps<{
  group: InquiryGroup | null
  inquiries?: Inquiry[]
  options?: any[]
  tools?: string[]
  showResources?: boolean
  showComments?: boolean
}>()

const emit = defineEmits<{
  navigate: [target: string]
  toggleResources: []
  toggleComments: []
}>()

const sessionStore = useSessionStore()

function getGroupIcon(type: string) {
  const data = getInquiryGroupTypeData(type, sessionStore.appSettings.inquiryGroupTypeTab)
  return data?.icon || Icons.FolderMultiple
}

function getGroupTypeLabel(type: string) {
  const data = getInquiryGroupTypeData(type, sessionStore.appSettings.inquiryGroupTypeTab)
  return data?.label || type
}

const navItems = computed(() => {
  const inquiryCount = props.inquiries?.length || 0
  const optionCount = props.options?.length || 0
  
  const debateCount = props.inquiries?.filter(i => i.status?.inquiryStatus === 'debate').length || 0
  const votingCount = props.inquiries?.filter(i => i.status?.inquiryStatus === 'voting').length || 0
  
  return [
    {
      key: 'dashboard',
      icon: Icons.Home,
      label: t('agora', 'Overview'),
      active: true,
      count: undefined,
      action: () => emit('navigate', 'dashboard')
    },
    {
      key: 'inquiries',
      icon: Icons.ClipboardList,
      label: t('agora', 'Inquiries'),
      active: false,
      count: inquiryCount,
      action: () => emit('navigate', 'inquiries')
    },
    {
      key: 'options',
      icon: Icons.Lightbulb,
      label: t('agora', 'Options'),
      active: false,
      count: optionCount,
      action: () => emit('navigate', 'options')
    },
    {
      key: 'debates',
      icon: Icons.MessageSquare,
      label: t('agora', 'Debates'),
      active: false,
      count: debateCount,
      action: () => emit('navigate', 'debates')
    },
    {
      key: 'votes',
      icon: Icons.CheckCircle,
      label: t('agora', 'Votes'),
      active: false,
      count: votingCount,
      action: () => emit('navigate', 'votes')
    }
  ]
})

const toolItems = computed(() => {
  const availableTools = props.tools || []
  return availableTools
    .filter(key => TOOL_ICON_MAP[key as ToolValue])
    .map(key => ({
      key,
      icon: TOOL_ICON_MAP[key as ToolValue]!.icon,
      label: TOOL_ICON_MAP[key as ToolValue]!.label,
      active: false,
      action: () => emit('navigate', key)
    }))
})
</script>

<style lang="scss" scoped>
.experience-sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 8px 0;
}

.sidebar-group-info {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  background: var(--color-background-dark);
  border-radius: 12px;
  border: 1px solid var(--color-border);

  .group-avatar {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: var(--color-primary-light);
    color: var(--color-primary-element);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .group-details {
    flex: 1;
    min-width: 0;

    .group-name {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
      color: var(--color-main-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .group-type {
      font-size: 12px;
      color: var(--color-text-lighter);
    }
  }
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .nav-section {
    .nav-section-title {
      margin: 0 0 8px 0;
      font-size: 11px;
      font-weight: 700;
      color: var(--color-text-lighter);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 0 4px;
    }
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    color: var(--color-text-lighter);

    &:hover {
      background: var(--color-background-hover);
      color: var(--color-main-text);
    }

    &.active {
      background: var(--color-primary-light);
      color: var(--color-primary-element);
      font-weight: 600;
    }

    .nav-icon {
      flex-shrink: 0;
    }

    .nav-label {
      flex: 1;
      font-size: 14px;
    }

    .nav-count {
      font-size: 12px;
      font-weight: 600;
      background: var(--color-background-dark);
      padding: 2px 8px;
      border-radius: 12px;
      color: var(--color-text-lighter);
    }

    &.tool-item {
      .nav-icon {
        opacity: 0.7;
      }
    }

    &.toggle-item {
      .toggle-indicator {
        font-size: 12px;
        opacity: 0.6;
        
        svg {
          transition: all 0.2s ease;
        }
      }

      &.active {
        .toggle-indicator {
          opacity: 1;
          color: var(--color-primary-element);
        }
      }
    }
  }
}

.sidebar-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 12px;
  background: var(--color-background-dark);
  border-radius: 12px;
  border: 1px solid var(--color-border);

  .stat-item {
    text-align: center;

    .stat-value {
      display: block;
      font-size: 20px;
      font-weight: 700;
      color: var(--color-main-text);
    }

    .stat-label {
      font-size: 11px;
      color: var(--color-text-lighter);
    }
  }
}
</style>
