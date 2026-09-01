<!--
- SPDX-FileCopyrightText: 2025 Nextcloud contributors
- SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="inquiry-group-catalog">
    <!-- Family Filter Tabs -->
    <div v-if="families.length > 1" class="catalog-filters">
      <div class="family-tabs">
        <button
          v-for="family in families"
          :key="family.key"
          class="family-tab"
          :class="{ active: selectedFamily === family.key }"
          @click="selectFamily(family.key)"
        >
          <component :is="family.icon" :size="18" />
          <span>{{ family.label }}</span>
          <span class="count">{{ getFamilyCount(family.key) }}</span>
        </button>
      </div>
    </div>

    <!-- Active Groups -->
    <div class="catalog-section">
      <div class="section-header">
        <h2>{{ t('agora', 'Active Groups') }}</h2>
        <span class="section-count">{{ filteredGroups.length }}</span>
      </div>

      <div class="catalog-grid">
        <div
          v-for="group in filteredGroups"
          :key="group.id"
          class="catalog-item"
          @click="selectGroup(group)"
        >
          <div class="group-card">
            <div class="card-header">
              <div class="card-icon">
                <component :is="getGroupTypeIcon(group.type)" :size="24" />
              </div>
              <h3 class="card-title">{{ group.title }}</h3>
            </div>
            
            <p v-if="group.description" class="card-description">
              {{ truncateText(group.description, 100) }}
            </p>
            
            <div class="card-stats">
              <span class="stat">
                <span class="stat-icon">📝</span>
                <span class="stat-value">{{ group.inquiryIds?.length || 0 }}</span>
                <span class="stat-label">{{ t('agora', 'inquiries') }}</span>
              </span>
              <span v-if="getGroupChildren(group).length > 0" class="stat">
                <span class="stat-icon">👥</span>
                <span class="stat-value">{{ getGroupChildren(group).length }}</span>
                <span class="stat-label">{{ t('agora', 'subgroups') }}</span>
              </span>
            </div>

            <!-- Experience badge -->
            <div v-if="group.ui?.displayArchitecture" class="card-badge experience-badge">
              ✨ {{ t('agora', 'Custom experience') }}
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-if="filteredGroups.length === 0" class="empty-state">
          <div class="empty-icon">📂</div>
          <h4>{{ t('agora', 'No groups found') }}</h4>
          <p>{{ t('agora', 'There are no active groups in this category') }}</p>
        </div>
      </div>
    </div>

    <!-- Archived Groups -->
    <div v-if="archivedGroups.length > 0" class="catalog-section archived-section">
      <div class="section-header">
        <h2>{{ t('agora', 'Archived Groups') }}</h2>
        <span class="section-count archived">{{ archivedGroups.length }}</span>
      </div>

      <div class="archived-grid">
        <div
          v-for="group in archivedGroups"
          :key="group.id"
          class="archived-item"
          @click="selectGroup(group)"
        >
          <span class="archived-icon">📁</span>
          <span class="archived-title">{{ group.title }}</span>
          <span class="archived-date">{{ formatDate(group.updated_at) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { t } from '@nextcloud/l10n'
import { useRouter } from 'vue-router'
import { DateTime } from 'luxon'
import { getInquiryGroupTypeData } from '../../helpers/modules/InquiryHelper.ts'
import { useSessionStore } from '../../stores/session.ts'
import { useInquiryGroupsStore } from '../../stores/inquiryGroups.ts'
import type { InquiryGroup } from '../../stores/inquiryGroups.types.ts'

const props = defineProps<{
  groups: InquiryGroup[]
  families?: Array<{ key: string; label: string; icon: any }>
}>()

const emit = defineEmits<{
  select: [group: InquiryGroup]
}>()

const router = useRouter()
const sessionStore = useSessionStore()
const inquiryGroupsStore = useInquiryGroupsStore()

const selectedFamily = ref<string | null>(null)

// Get all unique families from groups
const availableFamilies = computed(() => {
  if (props.families) return props.families
  
  const familiesSet = new Set<string>()
  props.groups.forEach(group => {
    const typeData = getInquiryGroupTypeData(group.type, sessionStore.appSettings.inquiryGroupTypeTab)
    if (typeData?.family) {
      familiesSet.add(typeData.family)
    }
  })
  
  return Array.from(familiesSet).map(key => ({
    key,
    label: key,
    icon: 'div'
  }))
})

// Filter groups by selected family
const filteredGroups = computed(() => {
  let result = props.groups.filter(g => g.groupStatus !== 'archived')
  
  if (selectedFamily.value) {
    result = result.filter(group => {
      const typeData = getInquiryGroupTypeData(group.type, sessionStore.appSettings.inquiryGroupTypeTab)
      return typeData?.family === selectedFamily.value
    })
  }
  
  return result.sort((a, b) => a.title.localeCompare(b.title))
})

// Archived groups
const archivedGroups = computed(() => props.groups
    .filter(g => g.groupStatus === 'archived')
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()))

function getGroupTypeIcon(type: string) {
  const typeData = getInquiryGroupTypeData(type, sessionStore.appSettings.inquiryGroupTypeTab)
  return typeData?.icon || 'div'
}

function getGroupChildren(group: InquiryGroup) {
  return inquiryGroupsStore.inquiryGroups.filter(g => g.parentId === group.id)
}

function getFamilyCount(familyKey: string): number {
  return props.groups.filter(group => {
    const typeData = getInquiryGroupTypeData(group.type, sessionStore.appSettings.inquiryGroupTypeTab)
    return typeData?.family === familyKey && group.groupStatus !== 'archived'
  }).length
}

function selectFamily(key: string) {
  selectedFamily.value = selectedFamily.value === key ? null : key
}

function selectGroup(group: InquiryGroup) {
  emit('select', group)
  if (group.slug) {
    router.push({ name: 'group-list', params: { slug: group.slug } })
  }
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)  }…`
}

function formatDate(timestamp: number) {
  return DateTime.fromMillis(timestamp * 1000).toLocaleString(DateTime.DATE_SHORT)
}
</script>

<style lang="scss" scoped>
.inquiry-group-catalog {
  padding: 16px 0;
}

.catalog-filters {
  margin-bottom: 24px;
  padding: 0 4px;

  .family-tabs {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;

    .family-tab {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border: 2px solid var(--color-border);
      border-radius: 20px;
      background: var(--color-main-background);
      color: var(--color-text-lighter);
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 14px;
      font-weight: 500;

      &:hover {
        border-color: var(--color-primary-element);
        color: var(--color-main-text);
        background: var(--color-background-hover);
      }

      &.active {
        border-color: var(--color-primary-element);
        background: var(--color-primary-light);
        color: var(--color-primary-element);
      }

      .count {
        font-size: 12px;
        background: var(--color-background-dark);
        padding: 2px 8px;
        border-radius: 10px;
        font-weight: 600;
        color: var(--color-text-lighter);
      }
    }
  }
}

.catalog-section {
  margin-bottom: 32px;

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4px 12px 4px;
    border-bottom: 2px solid var(--color-border);

    h2 {
      font-size: 20px;
      font-weight: 700;
      color: var(--color-main-text);
      margin: 0;
    }

    .section-count {
      font-size: 14px;
      font-weight: 600;
      background: var(--color-background-dark);
      padding: 4px 12px;
      border-radius: 12px;
      color: var(--color-text-lighter);

      &.archived {
        background: var(--color-warning-light);
        color: var(--color-warning);
      }
    }
  }

  &.archived-section {
    opacity: 0.8;
  }
}

.catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding-top: 16px;
}

.group-card {
  background: var(--color-main-background);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    border-color: var(--color-primary-element);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;

    .card-icon {
      width: 40px;
      height: 40px;
      background: var(--color-primary-light);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: var(--color-primary-element);
    }

    .card-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--color-main-text);
      margin: 0;
      flex: 1;
      line-height: 1.3;
    }
  }

  .card-description {
    color: var(--color-text-lighter);
    font-size: 14px;
    line-height: 1.5;
    margin: 0 0 16px 0;
    flex: 1;
  }

  .card-stats {
    display: flex;
    gap: 20px;
    padding-top: 12px;
    border-top: 1px solid var(--color-border-light);

    .stat {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 13px;
      color: var(--color-text-lighter);

      .stat-icon {
        font-size: 14px;
      }

      .stat-value {
        font-weight: 600;
        color: var(--color-main-text);
      }

      .stat-label {
        font-size: 12px;
      }
    }
  }

  .card-badge {
    margin-top: 12px;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
    align-self: flex-start;

    &.experience-badge {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
  }
}

.archived-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 16px;

  .archived-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: var(--color-background-dark);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: var(--color-background-hover);
    }

    .archived-icon {
      font-size: 18px;
      opacity: 0.6;
    }

    .archived-title {
      flex: 1;
      font-weight: 500;
      color: var(--color-main-text);
    }

    .archived-date {
      font-size: 12px;
      color: var(--color-text-lighter);
    }
  }
}

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  background: var(--color-background-dark);
  border-radius: 12px;
  border: 2px dashed var(--color-border);

  .empty-icon {
    font-size: 48px;
    opacity: 0.3;
    margin-bottom: 16px;
  }

  h4 {
    font-size: 18px;
    color: var(--color-main-text);
    margin: 0 0 8px 0;
  }

  p {
    color: var(--color-text-lighter);
    margin: 0;
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .catalog-grid {
    grid-template-columns: 1fr;
  }

  .catalog-filters .family-tabs {
    gap: 4px;

    .family-tab {
      padding: 6px 12px;
      font-size: 13px;

      .count {
        font-size: 11px;
        padding: 1px 6px;
      }
    }
  }
}
</style>
