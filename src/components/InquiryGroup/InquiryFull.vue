<!--
  - SPDX-FileCopyrightText: 2018-2025 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
    import { ref, computed, watch } from 'vue'
import { t } from '@nextcloud/l10n'
import NcAvatar from '@nextcloud/vue/components/NcAvatar'
import NcModal from '@nextcloud/vue/components/NcModal'
import DOMPurify from 'dompurify'
import { DateTime } from 'luxon'

// Import icons and components
import { InquiryGeneralIcons, StatusIcons } from '../../utils/icons.ts'

// Import components
import CommentAdd from '../Comments/CommentAdd.vue'
import Comments from '../Comments/Comments.vue'
import SideBarTabResources from '../SideBar/SideBarTabResources.vue'

// Import helpers and stores
import { getInquiryTypeData } from '../../helpers/modules/InquiryHelper.ts'
import type { Inquiry, InquiryType } from '../../Types/index.ts'
import { useSessionStore } from '../../stores/session.ts'
import { useInquiriesStore } from '../../stores/inquiries.ts'
import { createInquiryContext, canSupport, canComment } from '../../utils/permissions.ts'
import { SupportFeature } from '../Base/index.ts'

interface Props {
  inquiry: Inquiry
}

const props = defineProps<Props>()


const sessionStore = useSessionStore()
const inquiriesStore = useInquiriesStore()

// State
const showSidebar = ref(false)
const currentSupportValue = ref(props.inquiry.currentUserStatus?.supportValue || null)


// Update openComments function
function openSidebar() {
  showSidebar.value = true
}

function closeSidebar() {
  showSidebar.value = false
}

// Create permission context

// Context for permissions
const context = computed(() => createInquiryContext(props.inquiry, sessionStore.appSettings))

// Computed Properties
const canSupportValue = computed(() => canSupport(context))
const canCommentValue = computed(() => canComment(context))

const inquiryTypeData = computed(() => getInquiryTypeData(props.inquiry.type, sessionStore.appSettings?.inquiryTypeTab || []))

const typeIconComponent = computed(() => {
  if (inquiryTypeData.value?.icon) {
    const iconName = inquiryTypeData.value.icon
    if (typeof iconName === 'function' || typeof iconName === 'object') {
      return iconName
    }
    if (typeof iconName === 'string' && InquiryGeneralIcons[iconName]) {
      return InquiryGeneralIcons[iconName]
    }
  }

  const iconMap = {
    'proposal': InquiryGeneralIcons.Scale,
    'survey': InquiryGeneralIcons.ClipboardList,
    'poll': InquiryGeneralIcons.CheckCircle,
    'question': InquiryGeneralIcons.Question,
    'discussion': InquiryGeneralIcons.MessageSquare,
    'news': InquiryGeneralIcons.Newspaper,
    'announcement': InquiryGeneralIcons.Megaphone,
    'meeting': InquiryGeneralIcons.Users,
    'document': InquiryGeneralIcons.Document,
  }

  return iconMap[props.inquiry.type] || InquiryGeneralIcons.FolderMultiple
})

// Status
const currentInquiryStatus = computed(() => {
   if (!storeInquiry.value.status?.inquiryStatus) return null

  const specialStatuses = {
    'draft': {
      statusKey: 'draft',
      label: 'Draft',
      icon: 'draft',
      inquiryType: props.inquiry.type,
      order: 0,
    },
    'waiting_approval': {
      statusKey: 'waiting_approval',
      label: 'Waiting Approval',
      icon: 'waitingapproval',
      inquiryType: props.inquiry.type,
      order: 1,
    }
  }

  const currentStatus = props.inquiry.status.inquiryStatus
  if (specialStatuses[currentStatus]) {
    return specialStatuses[currentStatus]
  }

  const statusesFromSettings = sessionStore.appSettings?.inquiryStatusTab
    ?.filter((status) => status.inquiryType === props.inquiry.type) || []

  return statusesFromSettings.find(
    (status) => status.statusKey === currentStatus
  ) || specialStatuses.draft
})


const statusText = computed(() => currentInquiryStatus.value?.label ? t('agora', currentInquiryStatus.value.label) : '')

const statusIconComponent = computed(() => {
  if (!currentInquiryStatus.value?.icon) return StatusIcons.Default
  const iconName = currentInquiryStatus.value.icon
  return StatusIcons[iconName] || StatusIcons.Default
})

// Support
const isSupported = computed(() => storeInquiry.value.currentUserStatus?.hasSupported || false)

// Replace all props.inquiry references with storeInquiry computed property
const storeInquiry = computed(() => {
  // First try to find the inquiry in the inquiries store
  const fromStore = inquiriesStore.inquiries.find(i => i.id === props.inquiry.id)
  // If not found, use the prop (fallback)
  return fromStore || props.inquiry
})

// Quorum

const hasQuorum = computed(() => storeInquiry.value.configuration?.quorum && storeInquiry.value.configuration.quorum > 0)
const quorumValue = computed(() => storeInquiry.value.configuration?.quorum || 0)

// Cover image
const coverUrl = computed(() => {
  if (!storeInquiry.value.coverId || storeInquiry.value.coverId === 0) return ''
  return getNextcloudPreviewUrl(storeInquiry.value.coverId)
})


function getNextcloudPreviewUrl(fileId: number, x = 1200, y = 400, autoScale = true) {
  const baseUrl = window.location.origin
  return `${baseUrl}/index.php/core/preview?fileId=${fileId}&x=${x}&y=${y}&a=${autoScale}`
}

// Get hierarchy path for location and category display
function getHierarchyPath(items, targetId) {
  if (!items || !Array.isArray(items)) return ''

  const itemMap = {}

  items.forEach((item) => {
    itemMap[item.id] = item
  })

  if (!itemMap[targetId]) {
    return itemMap[1]?.name || t('agora', 'Not defined')
  }

  function buildPath(item) {
    if (item.parentId === 0) {
      return item.name
    }
    const parent = itemMap[item.parentId]
    if (parent) {
      return `${buildPath(parent)} → ${item.name}`
    }
    return item.name
  }

  return buildPath(itemMap[targetId])
}

// Date formatting
const formattedCreationDate = computed(() => {
  if (!props.inquiry.status?.created) return ''
  try {
    return DateTime.fromMillis(props.inquiry.status.created * 1000).toLocaleString(DateTime.DATE_FULL)
  } catch {
    return ''
  }
})

const formattedLastInteraction = computed(() => {
  if (!props.inquiry.status?.lastInteraction) return ''
  try {
    const date = DateTime.fromMillis(props.inquiry.status.lastInteraction * 1000)
    const now = DateTime.now()

    if (date.hasSame(now, 'day')) {
      return `${t('agora', 'Today')  } ${  date.toLocaleString(DateTime.TIME_SIMPLE)}`
    } if (date.hasSame(now.minus({ days: 1 }), 'day')) {
      return `${t('agora', 'Yesterday')  } ${  date.toLocaleString(DateTime.TIME_SIMPLE)}`
    } 
      return date.toRelative()

  } catch {
    return ''
  }
})

// Expiration
const timeExpirationRelative = computed(() => {
  if (props.inquiry.configuration?.expire) {
    return DateTime.fromMillis(props.inquiry.configuration.expire * 1000).toRelative()
  }
  return ''
})

// Participants count
const participantsCount = computed(() => storeInquiry.value.status?.countParticipants || 0)


// Content
const sanitizedContent = computed(() => {
 const content = storeInquiry.value.descriptionSafe || storeInquiry.value.description
  if (!content || content.trim() === '') {
    return `<div class="no-content">
              <p>${t('agora', 'No description available')}</p>
            </div>`
  }

  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'strong', 'em', 'u', 's',
      'ul', 'ol', 'li',
      'blockquote', 'pre', 'code',
      'img', 'figure', 'figcaption',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'a', 'span', 'div',
      'hr'
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 'title',
      'src', 'alt', 'width', 'height', 'loading',
      'class', 'id', 'style'
    ]
  })
})

// Resources
const hasResources = computed(() => storeInquiry.value.miscFields && Object.keys(storeInquiry.value.miscFields).length > 0)

// Helper to get available fields
function getAvailableFields(inquiryType: string, inquiryTypeTab: InquiryType[]) {
  if (!inquiryTypeTab || !Array.isArray(inquiryTypeTab)) return []

  const typeConfig = inquiryTypeTab.find(tab => tab.key === inquiryType)
  if (!typeConfig || !typeConfig.fields) return []

  return typeConfig.fields
}

// Get misc field value
function getMiscValue(key: string) {
  return storeInquiry.value.miscFields?.[key] ?? null
}

type FieldType = 'text' | 'number' | 'boolean' | 'enum' | 'date' | 'array'

interface EnumValue {
  value: string
  label: string
}

interface FieldConfig {
  type: FieldType
  key: string
  allowed_values?: (string | EnumValue)[]
}

// Get display value for a field
function getDisplayValue(value: unknown, field: FieldConfig): string {
  if (value === null || value === undefined || value === '') {
    return t('agora', 'Not specified')
  }

  if (field.type === 'boolean') {
    // Handle boolean values
    if (typeof value === 'boolean') {
      return value ? t('agora', 'Yes') : t('agora', 'No')
    }
    // Handle string representations of booleans
    if (typeof value === 'string') {
      const lowerValue = value.toLowerCase()
      if (lowerValue === 'true' || lowerValue === '1' || lowerValue === 'yes') {
        return t('agora', 'Yes')
      }
      if (lowerValue === 'false' || lowerValue === '0' || lowerValue === 'no') {
        return t('agora', 'No')
      }
    }
  }

  if (field.type === 'enum' && field.allowed_values) {
    const enumValue = field.allowed_values.find(v => 
      typeof v === 'object' ? v.value === value : v === value
    )

    if (enumValue && typeof enumValue === 'object') {
      return enumValue.label
    }

    if (typeof value === 'string') {
      return value
        .replace(/_/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase())
    }
  }

  if (Array.isArray(value)) {
    return value.join(', ')
  }

  return String(value)
}

// Check if field should be displayed
function shouldDisplayField(field: FieldConfig, value: unknown): boolean {
  const hiddenFields = ['layout_mode', 'render_mode']
  if (hiddenFields.includes(field.key)) {
    return false
  }

  // Check for empty values
  if (value === null || value === undefined || value === '') {
    return false
  }

  // Handle arrays
  if (Array.isArray(value) && value.length === 0) {
    return false
  }

  // Always display boolean fields (even false)
  if (field.type === 'boolean') {
    return true
  }

  return true
}

// Get dynamic fields
const dynamicFields = computed(() => {
  try {
    if (!storeInquiry.value.type) {
      return []
    }
    const fields = getAvailableFields(
      storeInquiry.value.type,
      sessionStore.appSettings?.inquiryTypeTab || []
    )
    return Array.isArray(fields) ? fields : []
  } catch (e) {
    console.error('Error getting fields:', e)
    return []
  }
})


// Get fields that should be displayed
const displayFields = computed(() => dynamicFields.value
    .map(field => {
      const value = getMiscValue(field.key)
      return {
        ...field,
        value,
        displayValue: getDisplayValue(value, field),
        hasValue: field.type === 'boolean' ? true : shouldDisplayField(field, value)
      }
    })
    .filter(field => field.hasValue))


// Watch for changes in support value - now watching storeInquiry
watch(() => storeInquiry.value.currentUserStatus?.supportValue, (newValue) => {
  currentSupportValue.value = newValue || null
}, { immediate: true })


</script>
<!-- InquiryFull.vue - Professional Redesign -->
<template>
  <div class="inquiry-full-view professional-theme">
    <!-- Main Content -->
    <div class="full-view-wrapper">
      <div class="full-view-content">

        <!-- Cover Image with Overlay Content -->
        <div v-if="coverUrl" class="cover-hero">
          <img
            :src="coverUrl"
            :alt="t('agora', 'Inquiry cover image')"
            class="cover-image"
          />
          <div class="cover-overlay">
            <!-- Type & Status Badges -->
            <div class="cover-badges">
              <div class="type-badge">
                <component :is="typeIconComponent" class="type-icon" :size="16" />
                <span class="type-label">{{ inquiryTypeData.label }}</span>
              </div>

              <div v-if="currentInquiryStatus" class="status-badge">
                <component :is="statusIconComponent" class="status-icon" :size="12" />
                <span>{{ statusText }}</span>
              </div>
            </div>

            <!-- Title -->
            <h1 class="cover-title">{{ storeInquiry.title }}</h1>

            <!-- Quick Actions Bar -->
            <div class="cover-actions">
              <!-- Support Button -->
              <button
                v-if="canSupportValue && storeInquiry.configuration?.supportFeature === 'binary'"
                class="action-button support-button"
                :class="{ 'active': isSupported }"
                @click="onToggleSupport"
              >
                <component :is="ThumbIcon" class="action-icon" :size="18" :supported="isSupported" />
                <span class="action-text">
                  {{ isSupported ? t('agora', 'Supported') : t('agora', 'Support') }}
                </span>
                <span class="action-count">{{ storeInquiry.status?.countSupports || 0 }}</span>
              </button>

              <!-- Comments Button -->
              <button
                v-if="canCommentValue"
                class="action-button comments-button"
                @click="openSidebar"
              >
                <component :is="InquiryGeneralIcons.Comment" class="action-icon" :size="18" />
                <span class="action-text">{{ t('agora', 'Comments') }}</span>
                <span class="action-count">{{ storeInquiry.status?.countComments || 0 }}</span>
              </button>

              <!-- Participants -->
              <div class="action-button participants-button">
                <component :is="InquiryGeneralIcons.Users" class="action-icon" :size="18" />
                <span class="action-text">{{ t('agora', 'Participants') }}</span>
                <span class="action-count">{{ participantsCount }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Header without cover -->
        <div v-else class="header-section">
          <div class="header-content">
            <div class="header-badges">
              <div class="type-badge">
                <component :is="typeIconComponent" class="type-icon" :size="16" />
                <span class="type-label">{{ inquiryTypeData.label }}</span>
              </div>

              <div v-if="currentInquiryStatus" class="status-badge">
                <component :is="statusIconComponent" class="status-icon" :size="12" />
                <span>{{ statusText }}</span>
              </div>
            </div>

            <h1 class="page-title">{{ storeInquiry.title }}</h1>

            <!-- Quick Actions Bar -->
            <div class="header-actions">
              <button
                v-if="canSupportValue && storeInquiry.configuration?.supportFeature === 'binary'"
                class="action-button support-button"
                :class="{ 'active': isSupported }"
                @click="onToggleSupport"
              >
                <component :is="ThumbIcon" class="action-icon" :size="18" :supported="isSupported" />
                <span class="action-text">
                  {{ isSupported ? t('agora', 'Supported') : t('agora', 'Support') }}
                </span>
                <span class="action-count">{{ storeInquiry.status?.countSupports || 0 }}</span>
              </button>

              <button
                v-if="canCommentValue"
                class="action-button comments-button"
                @click="openSidebar"
              >
                <component :is="InquiryGeneralIcons.Comment" class="action-icon" :size="18" />
                <span class="action-text">{{ t('agora', 'Comments') }}</span>
                <span class="action-count">{{ storeInquiry.status?.countComments || 0 }}</span>
              </button>

              <div class="action-button participants-button">
                <component :is="InquiryGeneralIcons.Users" class="action-icon" :size="18" />
                <span class="action-text">{{ t('agora', 'Participants') }}</span>
                <span class="action-count">{{ participantsCount }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Author and Metadata -->
        <div class="author-meta-section">
          <div class="author-info">
            <NcAvatar
              v-if="storeInquiry.ownedGroup"
              :display-name="storeInquiry.ownedGroup"
              :show-user-status="false"
              :size="40"
              class="author-avatar"
            />
            <NcAvatar
              v-else
              :user="storeInquiry.owner?.id"
              :display-name="storeInquiry.owner?.displayName"
              :size="40"
              class="author-avatar"
            />
            <div class="author-details">
              <span class="author-name">
                {{ storeInquiry.ownedGroup || storeInquiry.owner?.displayName }}
              </span>
              <span class="meta-divider">•</span>
              <span class="creation-date">
                {{ formattedCreationDate }}
              </span>
            </div>
          </div>

          <!-- Right side metadata -->
          <div class="meta-actions">
            <div v-if="hasQuorum" class="meta-item">
              <span class="meta-label">{{ t('agora', 'Quorum') }}:</span>
              <span class="meta-value">{{ storeInquiry.status?.countSupports || 0 }} / {{ quorumValue }}</span>
            </div>

            <div v-if="timeExpirationRelative" class="meta-item">
              <component :is="InquiryGeneralIcons.Expiration" class="meta-icon" :size="14" />
              <span class="meta-value">{{ timeExpirationRelative }}</span>
            </div>

            <div class="meta-item">
              <component :is="InquiryGeneralIcons.Updated" class="meta-icon" :size="14" />
              <span class="meta-value">{{ formattedLastInteraction }}</span>
            </div>
          </div>
        </div>

        <!-- Location and Category - Simplified -->
        <div class="location-category-section">
          <div class="meta-grid">
            <!-- Location -->
            <div class="meta-card">
              <div class="meta-card-header">
                <component :is="InquiryGeneralIcons.Location" class="meta-card-icon" :size="18" />
                <span class="meta-card-title">{{ t('agora', 'Location') }}</span>
              </div>
              <div class="meta-card-content">
                {{ getHierarchyPath(sessionStore.appSettings.locationTab, storeInquiry.locationId) || t('agora', 'Inherited from parent') }}
              </div>
            </div>

            <!-- Category -->
            <div class="meta-card">
              <div class="meta-card-header">
                <component :is="InquiryGeneralIcons.Category" class="meta-card-icon" :size="18" />
                <span class="meta-card-title">{{ t('agora', 'Category') }}</span>
              </div>
              <div class="meta-card-content">
                {{ getHierarchyPath(sessionStore.appSettings.categoryTab, storeInquiry.categoryId) || t('agora', 'Inherited from parent') }}
              </div>
            </div>
          </div>
        </div>

        <!-- Description Content -->
        <div class="description-section">
          <div class="section-header">
            <h2 class="section-title">{{ t('agora', 'Description') }}</h2>
          </div>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="description-content" v-html="sanitizedContent"></div>
        </div>

        <!-- Resources Section - Only if has resources -->
        <div v-if="hasResources" class="resources-section">
          <div class="section-header">
            <h2 class="section-title">{{ t('agora', 'Resources') }}</h2>
          </div>
          <div class="resources-content">
            <SideBarTabResources :inquiry="storeInquiry" />
          </div>
        </div>

        <!-- Additional Information - Only if has fields -->
        <div v-if="displayFields.length > 0" class="additional-info-section">
          <div class="section-header">
            <h2 class="section-title">{{ t('agora', 'Additional information') }}</h2>
          </div>
          <div class="info-grid">
            <div v-for="field in displayFields" :key="field.key" class="info-item">
              <div class="info-label">{{ field.label }}</div>
              <div class="info-value">{{ field.displayValue }}</div>
            </div>
          </div>
        </div>

        <!-- Ternary Support Section - Only for ternary support -->
        <div v-if="canSupportValue && storeInquiry.configuration?.supportFeature === 'ternary'" class="ternary-support-section">
          <div class="section-header">
            <h2 class="section-title">{{ t('agora', 'Express your position') }}</h2>
          </div>

                            <SupportFeature
                                    :item="storeInquiry"
                                    item-type="inquiry"
                                    :context="context"
                                    :show-quorum="true"
                                    :show-details-on-hover="true"
                                    :icon-size="22"
                                    @click.stop
                                    />
        </div>
      </div>
    </div>

    <NcModal
      v-if="showSidebar"
      :name="storeInquiry.title"
      :size="'large'"
      @close="closeSidebar"
    >
      <template #header>
        <div class="modal-header">
          <h2 class="modal-title">{{ storeInquiry.title }}</h2>
          <span class="modal-subtitle">{{ t('agora', 'Comments') }}</span>
        </div>
      </template>

      <div class="modal-comments-container">
        <CommentAdd :inquiry-id="storeInquiry.id" />
        <Comments :inquiry-id="storeInquiry.id" />
      </div>
    </NcModal>
  </div>
</template>

<style lang="scss" scoped>
/* ===== PROFESSIONAL THEME ===== */
.professional-theme {
  --color-surface: var(--color-main-background);
  --color-surface-raised: #ffffff;
  --color-border-subtle: rgba(0, 0, 0, 0.06);
  --shadow-subtle: 0 1px 3px rgba(0, 0, 0, 0.05);
  --shadow-medium: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-large: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.inquiry-full-view {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: var(--color-surface);
  overflow: hidden;     
}

.full-view-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  border-radius: 8px;
}

.full-view-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 32px 32px;
  box-sizing: border-box;
  border-radius: 8px;

  > * + * {
    margin-top: 32px;
  }
}

/* ===== COVER HERO ===== */
.cover-hero {
  position: relative;
  margin: -32px -32px 32px;
  border-radius: 0 0 12px 12px;
  overflow: hidden;
  isolation: isolate;

  .cover-image {
    width: 100%;
    height: 320px;
    object-fit: cover;
    display: block;
    position: relative;
    z-index: 1;
  }

  .cover-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%);
    padding: 48px 48px 24px;
    color: white;
  }
}

.cover-badges {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.type-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-primary-element);

  .type-icon {
    color: var(--color-primary-element);
  }
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.cover-title {
  font-size: 40px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 32px 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.cover-actions {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

/* ===== HEADER WITHOUT COVER ===== */
.header-section {
  padding: 32px 0 0;
  border-bottom: 1px solid var(--color-border-subtle);
  margin-bottom: 32px;
}

.header-content {
  .header-badges {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
  }

  .page-title {
    font-size: 40px;
    font-weight: 700;
    line-height: 1.2;
    color: var(--color-main-text);
    margin: 0 0 32px 0;
  }
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

/* ===== ACTION BUTTONS ===== */
.action-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-main-text);
  cursor: pointer;
  transition: all 0.2s ease;

  .action-icon {
    opacity: 0.9;
  }

  .action-count {
    margin-left: 4px;
    font-weight: 600;
    opacity: 0.9;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }

  &.active {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.4);
  }
}

/* For light background (no cover) */
.header-actions .action-button {
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  color: var(--color-text-lighter);
  box-shadow: var(--shadow-subtle);

  &:hover {
    background: var(--color-background-hover);
    border-color: var(--color-primary-element);
    color: var(--color-primary-element);
    box-shadow: var(--shadow-medium);
  }

  &.active {
    background: var(--color-primary-element);
    border-color: var(--color-primary-element);
    color: white;
  }
}

/* ===== AUTHOR & METADATA ===== */
.author-meta-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: var(--color-surface-raised);
  border-radius: 8px;
  box-shadow: var(--shadow-subtle);
  margin-top: 24px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 16px;

  .author-avatar {
    border: 2px solid var(--color-surface);
    box-shadow: var(--shadow-subtle);
  }

  .author-details {
    display: flex;
    align-items: center;
    gap: 12px;

    .author-name {
      font-size: 15px;
      font-weight: 600;
      color: var(--color-main-text);
    }

    .meta-divider {
      color: var(--color-text-maxcontrast);
      opacity: 0.5;
    }

    .creation-date {
      font-size: 14px;
      color: var(--color-text-lighter);
    }
  }
}

.meta-actions {
  display: flex;
  gap: 20px;
  align-items: center;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--color-text-lighter);

  .meta-label {
    font-weight: 500;
  }

  .meta-value {
    font-weight: 600;
  }

  .meta-icon {
    color: var(--color-text-maxcontrast);
  }
}

/* ===== LOCATION & CATEGORY ===== */
.location-category-section {
  .meta-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
  }
}

.meta-card {
  padding: 20px;
  background: var(--color-surface-raised);
  border-radius: 8px;
  box-shadow: var(--shadow-subtle);
  border: 1px solid var(--color-border-subtle);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: var(--shadow-medium);
    border-color: var(--color-border);
  }

  .meta-card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;

    .meta-card-icon {
      color: var(--color-primary-element);
    }

    .meta-card-title {
      font-size: 13px;
      font-weight: 600;
      color: var(--color-text-lighter);
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
  }

  .meta-card-content {
    font-size: 15px;
    font-weight: 500;
    color: var(--color-main-text);
    line-height: 1.5;
  }
}

/* ===== SECTIONS ===== */
.section-header {
  margin-bottom: 24px;

  .section-title {
    font-size: 24px;
    font-weight: 600;
    color: var(--color-main-text);
    margin: 0;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--color-border-subtle);
  }
}

.description-section {
  .description-content {
    padding: 24px;
    background: var(--color-surface-raised);
    border-radius: 8px;
    box-shadow: var(--shadow-subtle);
    border: 1px solid var(--color-border-subtle);

    :deep(*) {
      margin: 0 0 16px 0;

      &:last-child {
        margin-bottom: 0;
      }
    }

    :deep(p) {
      line-height: 1.7;
      color: var(--color-text-lighter);
    }

    :deep(h1) {
      font-size: 22px;
      font-weight: 600;
      margin: 28px 0 16px;
      color: var(--color-main-text);
    }

    :deep(h2) {
      font-size: 20px;
      font-weight: 600;
      margin: 24px 0 14px;
      color: var(--color-main-text);
    }
  }
}

/* ===== RESOURCES ===== */
.resources-section {
  .resources-content {
    padding: 24px;
    background: var(--color-surface-raised);
    border-radius: 8px;
    box-shadow: var(--shadow-subtle);
    border: 1px solid var(--color-border-subtle);
  }
}

/* ===== ADDITIONAL INFO ===== */
.additional-info-section {
  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
  }

  .info-item {
    padding: 16px;
    background: var(--color-surface-raised);
    border-radius: 8px;
    box-shadow: var(--shadow-subtle);
    border: 1px solid var(--color-border-subtle);

    .info-label {
      font-size: 12px;
      font-weight: 600;
      color: var(--color-text-lighter);
      text-transform: uppercase;
      letter-spacing: 0.3px;
      margin-bottom: 6px;
    }

    .info-value {
      font-size: 14px;
      font-weight: 500;
      color: var(--color-main-text);
      line-height: 1.5;
    }
  }
}

/* ===== TERNARY BUTTONS ===== */
.ternary-support-section {
  padding: 24px;
  background: var(--color-surface-raised);
  border-radius: 8px;
  box-shadow: var(--shadow-subtle);
  border: 1px solid var(--color-border-subtle);

  .ternary-buttons {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .ternary-button {
    flex: 1;
    min-width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 14px 20px;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    background: var(--color-surface);
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-lighter);
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: var(--color-background-hover);
      border-color: var(--color-primary-element);
      color: var(--color-primary-element);
      transform: translateY(-1px);
      box-shadow: var(--shadow-medium);
    }

    &.active {
      &.support {
        background: #10b981;
        border-color: #10b981;
        color: white;
      }

      &.neutral {
        background: #6b7280;
        border-color: #6b7280;
        color: white;
      }

      &.oppose {
        background: #ef4444;
        border-color: #ef4444;
        color: white;
      }
    }
  }
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .full-view-content {
    padding: 0 24px 24px;
  }

  .cover-hero {
    margin: -24px -24px 24px;

    .cover-overlay {
      padding: 32px 32px 16px;
    }

    .cover-title {
      font-size: 32px;
    }
  }

  .page-title {
    font-size: 32px;
  }
}

@media (max-width: 768px) {
  .author-meta-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .meta-actions {
    width: 100%;
    justify-content: space-between;
  }

  .cover-title,
  .page-title {
    font-size: 28px;
  }

  .ternary-buttons {
    flex-direction: column;

    .ternary-button {
      width: 100%;
    }
  }
}

@media (max-width: 480px) {
  .full-view-content {
    padding: 0 16px 16px;
  }

  .cover-hero {
    margin: -16px -16px 16px;
    height: 240px;

    .cover-overlay {
      padding: 24px 24px 12px;
    }

    .cover-title {
      font-size: 24px;
    }
  }

  .cover-actions,
  .header-actions {
    flex-direction: column;
    align-items: stretch;

    .action-button {
      width: 100%;
      justify-content: center;
    }
  }

  .page-title {
    font-size: 24px;
  }
}
</style>
