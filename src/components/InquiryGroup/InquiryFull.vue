<!--
  - SPDX-FileCopyrightText: 2018-2025 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="inquiry-full-view">
    <!-- Main Content -->
    <div class="full-view-wrapper">
      <div class="full-view-content">
        
        <!-- Cover Image -->
        <div v-if="coverUrl" class="cover-image-section">
          <img
            :src="coverUrl"
            :alt="t('agora', 'Inquiry cover image')"
            class="cover-image"
          />
        </div>

        <!-- Title Section -->
        <div class="title-section">
          <div class="title-header">
            <div class="type-badge">
              <component :is="typeIconComponent" class="type-icon" :size="20" />
              <span class="type-label">{{ inquiryTypeData.label }}</span>
            </div>
            
            <!-- Status Badge -->
            <div v-if="currentInquiryStatus" class="status-badge">
              <component :is="statusIconComponent" class="status-icon" :size="14" />
              {{ statusText }}
            </div>
          </div>
          
          <h1 class="inquiry-title">{{ storeInquiry.title }}</h1>
          
          <!-- Author and Metadata -->
          <div class="author-meta-section">
            <div class="author-info">
              <NcAvatar
                v-if="storeInquiry.ownedGroup"
                :display-name="storeInquiry.ownedGroup"
                :show-user-status="false"
                :size="44"
                class="author-avatar"
              />
              <NcAvatar
                v-else
                :user="storeInquiry.owner?.id"
                :display-name="storeInquiry.owner?.displayName"
                :size="44"
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
          </div>
        </div>

        <!-- Location and Category Section -->
        <div class="location-category-section">
          <div class="location-category-grid">
            <!-- Location -->
            <div class="meta-item location-item">
              <div class="meta-icon-container">
                <component :is="InquiryGeneralIcons.Location" class="meta-icon" :size="20" />
              </div>
              <div class="meta-content">
                <div class="meta-label">{{ t('agora', 'Location') }}</div>
                <div class="meta-value">{{ getHierarchyPath(sessionStore.appSettings.locationTab, storeInquiry.locationId) || t('agora', 'Inherited from parent') }}</div>
              </div>
            </div>

            <!-- Category -->
            <div class="meta-item category-item">
              <div class="meta-icon-container">
                <component :is="InquiryGeneralIcons.Category" class="meta-icon" :size="20" />
              </div>
              <div class="meta-content">
                <div class="meta-label">{{ t('agora', 'Category') }}</div>
                <div class="meta-value">{{ getHierarchyPath(sessionStore.appSettings.categoryTab, storeInquiry.categoryId) || t('agora', 'Inherited from parent') }}</div>
              </div>
            </div>

            <!-- Expiration -->
            <div v-if="timeExpirationRelative" class="meta-item expiration-item">
              <div class="meta-icon-container">
                <component :is="InquiryGeneralIcons.Expiration" class="meta-icon" :size="20" />
              </div>
              <div class="meta-content">
                <div class="meta-label">{{ t('agora', 'Expires') }}</div>
                <div class="meta-value">{{ timeExpirationRelative }}</div>
              </div>
            </div>

            <!-- Last Interaction -->
            <div class="meta-item interaction-item">
              <div class="meta-icon-container">
                <component :is="InquiryGeneralIcons.Updated" class="meta-icon" :size="20" />
              </div>
              <div class="meta-content">
                <div class="meta-label">{{ t('agora', 'Last updated') }}</div>
                <div class="meta-value">{{ formattedLastInteraction }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Description Content -->
        <div class="description-section">
          <div class="section-header">
            <component :is="InquiryGeneralIcons.Presentation" class="section-icon" :size="20" />
            <h3 class="section-title">{{ t('agora', 'Description') }}</h3>
          </div>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="description-content" v-html="sanitizedContent"></div>
        </div>

        <!-- Resources Section -->
        <div v-if="hasResources" class="resources-section">
          <div class="section-header">
            <component :is="InquiryGeneralIcons.Attachment" class="section-icon" :size="20" />
            <h3 class="section-title">{{ t('agora', 'Resources') }}</h3>
          </div>
          <div class="resources-content">
            <SideBarTabResources :inquiry="storeInquiry" />
          </div>
        </div>

        <!-- Miscellaneous Fields Section -->
        <div v-if="displayFields.length > 0" class="misc-fields-section">
          <div class="section-header">
            <component :is="InquiryGeneralIcons.Info" class="section-icon" :size="20" />
            <h3 class="section-title">{{ t('agora', 'Additional Information') }}</h3>
          </div>
          <div class="misc-fields-grid">
            <div v-for="field in displayFields" :key="field.key" class="misc-field-item">
              <div class="misc-field-label">{{ field.label }}</div>
              <div class="misc-field-value">{{ field.displayValue }}</div>
            </div>
          </div>
        </div>

        <!-- Action Stats Section -->
        <div class="action-stats-section">
          <!-- Supports Counter -->
          <div v-if="canSupportValue" class="stat-item supports-stat" @click.stop="onToggleSupport">
            <div class="stat-icon-container">
              <component 
                :is="supportIconComponent" 
                class="stat-icon" 
                :size="24"
                :supported="isSupported"
                :support-value="currentSupportValue"
              />
            </div>
            <div class="stat-content">
              <div class="stat-value">
                {{ storeInquiry.status?.countSupports || 0 }}
                <span v-if="hasQuorum" class="quorum-text">
                  / {{ quorumValue }}
                </span>
              </div>
              <div class="stat-label">
                {{ t('agora', 'Supports') }}
                <span v-if="hasQuorum" class="quorum-label">
                  {{ t('agora', 'needed') }}
                </span>
              </div>
            </div>
          </div>

          <!-- Ternary Details Button -->
          <div
v-if="canSupportValue && storeInquiry.configuration?.supportFeature === 'ternary'" 
               class="ternary-details-button"
               @click.stop="openTernaryDetails">
            <NcButton
              type="tertiary"
              class="details-button"
              :title="t('agora', 'View detailed support breakdown')"
            >
              <template #icon>
                <component :is="InquiryGeneralIcons.ChartBar" :size="16" />
              </template>
              {{ t('agora', 'View detailed support breakdown') }}
            </NcButton>
          </div>

          <!-- Comments Counter -->
          <div v-if="canCommentValue" class="stat-item comments-stat" @click.stop="openSidebar">
            <div class="stat-icon-container">
              <component :is="InquiryGeneralIcons.Comment" class="stat-icon" :size="24" />
            </div>
            <div class="stat-content">
              <div class="stat-value">{{ storeInquiry.status?.countComments || 0 }}</div>
              <div class="stat-label">{{ t('agora', 'Comments') }}</div>
            </div>
          </div>

          <!-- Participants Counter -->
          <div class="stat-item participants-stat">
            <div class="stat-icon-container">
              <component :is="InquiryGeneralIcons.Users" class="stat-icon" :size="24" />
            </div>
            <div class="stat-content">
              <div class="stat-value">{{ participantsCount }}</div>
              <div class="stat-label">{{ t('agora', 'Participants') }}</div>
            </div>
          </div>
        </div>

        <!-- Ternary Support Buttons -->
        <div v-if="canSupportValue && storeInquiry.configuration?.supportFeature === 'ternary'" class="ternary-support-section">
          <div class="section-header">
            <h3 class="section-title">{{ t('agora', 'Express your position') }}</h3>
          </div>
          <div class="ternary-support-buttons">
            <NcButton
              type="secondary"
              :class="{ 'active-support': currentSupportValue === 1 }"
              class="support-button"
              @click.stop="toggleSupport(1)"
            >
              <template #icon>
                <TernarySupportIcon :support-value="currentSupportValue === 1 ? 1 : null" :size="20" />
              </template>
              {{ getSupportButtonText(1) }}
            </NcButton>

            <NcButton
              type="secondary"
              :class="{ 'active-neutral': currentSupportValue === 0 }"
              class="support-button"
              @click.stop="toggleSupport(0)"
            >
              <template #icon>
                <TernarySupportIcon :support-value="currentSupportValue === 0 ? 0 : null" :size="20" />
              </template>
              {{ getSupportButtonText(0) }}
            </NcButton>

            <NcButton
              type="secondary"
              :class="{ 'active-oppose': currentSupportValue === -1 }"
              class="support-button"
              @click.stop="toggleSupport(-1)"
            >
              <template #icon>
                <TernarySupportIcon :support-value="currentSupportValue === -1 ? -1 : null" :size="20" />
              </template>
              {{ getSupportButtonText(-1) }}
            </NcButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Ternary Support Details Modal -->
    <TernarySupportDetails
      v-if="showTernaryModal"
      :show="showTernaryModal"
      :inquiry="storeInquiry"
      @close="showTernaryModal = false"
    />

        <!-- Comments Modal -->
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

<script setup lang="ts">
    import { ref, computed, watch } from 'vue'
import { t } from '@nextcloud/l10n'
import { showSuccess, showError } from '@nextcloud/dialogs'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcAvatar from '@nextcloud/vue/components/NcAvatar'
import NcModal from '@nextcloud/vue/components/NcModal'
import DOMPurify from 'dompurify'
import { DateTime } from 'luxon'
import TernarySupportDetails from './TernarySupportDetails.vue'

// Import icons and components
import { InquiryGeneralIcons, StatusIcons } from '../../utils/icons.ts'
import { TernarySupportIcon, ThumbIcon } from '../AppIcons'

// Import components
import CommentAdd from '../Comments/CommentAdd.vue'
import Comments from '../Comments/Comments.vue'
import SideBarTabResources from '../SideBar/SideBarTabResources.vue'

// Import helpers and stores
import { getInquiryTypeData } from '../../helpers/modules/InquiryHelper.ts'
import type { Inquiry, InquiryType } from '../../Types/index.ts'
import { useSessionStore } from '../../stores/session.ts'
import { useSupportsStore } from '../../stores/supports.ts'
import { useInquiriesStore } from '../../stores/inquiries.ts'
import { canSupport, canComment } from '../../utils/permissions.ts'

interface Props {
  inquiry: Inquiry
}

const props = defineProps<Props>()


const sessionStore = useSessionStore()
const supportsStore = useSupportsStore()
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
const context = computed(() => ({
    canSupport: canSupport({
      inquiryType: props.inquiry.type,
      inquiryStatus: props.inquiry.status?.inquiryStatus || 'open',
      isOwner: props.inquiry.currentUserStatus?.isOwner || false,
      isModerator: sessionStore.currentUser.isModerator,
      isLocked: props.inquiry.status?.isLocked || false,
      isExpired: props.inquiry.status?.isExpired || false,
      isArchived: props.inquiry.status?.inquiryStatus === 'archived',
      hasDeletionDate: props.inquiry.status?.deletionDate > 0,
      isPublic: props.inquiry.configuration?.access === 'public',
      supportFeature: props.inquiry.configuration?.supportFeature,
    }),
    canComment: canComment({
      inquiryType: props.inquiry.type,
      inquiryStatus: props.inquiry.status?.inquiryStatus || 'open',
      isOwner: props.inquiry.currentUserStatus?.isOwner || false,
      isModerator: sessionStore.currentUser.isModerator,
      isLocked: props.inquiry.status?.isLocked || false,
      isExpired: props.inquiry.status?.isExpired || false,
      isArchived: props.inquiry.status?.inquiryStatus === 'archived',
      hasDeletionDate: props.inquiry.status?.deletionDate > 0,
      isPublic: props.inquiry.configuration?.access === 'public',
    }),
  }))

const showTernaryModal = ref(false)

// Computed Properties
const canSupportValue = computed(() => context.value.canSupport)
const canCommentValue = computed(() => context.value.canComment)

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

const supportIconComponent = computed(() => {
  if (props.inquiry.configuration?.supportFeature === 'ternary') {
    return TernarySupportIcon
  }
  return ThumbIcon
})

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

// Handlers

function getSupportButtonText(value: number) {
  if (value === 1) {
    return currentSupportValue.value === 1 ? t('agora', 'Supported') : t('agora', 'Support')
  } if (value === 0) {
    return currentSupportValue.value === 0 ? t('agora', 'Neutral') : t('agora', 'Neutral')
  } if (value === -1) {
    return currentSupportValue.value === -1 ? t('agora', 'Opposed') : t('agora', 'Oppose')
  }
  return ''
}
async function toggleSupport(value: number) {
  if (!canSupportValue.value) return

  try {
    // Pass null as the third parameter to prevent double updates
    await supportsStore.toggleSupport(
      props.inquiry.id, 
      sessionStore.currentUser.id, 
      null,  
      inquiriesStore
    )

    const updatedInquiry = inquiriesStore.inquiries.find(i => i.id === props.inquiry.id)
    
    // Show success messages
    const newSupportValue = updatedInquiry?.currentUserStatus?.supportValue || value
    const hadSupportedBefore = storeInquiry.value.currentUserStatus?.hasSupported
    
    if (storeInquiry.value.configuration?.supportFeature === 'binary') {
      if (newSupportValue === 1) {
        showSuccess(t('agora', 'Inquiry supported, thanks for your support!'), { timeout: 2000 })
      } else if (newSupportValue === null) {
        showSuccess(t('agora', 'Inquiry support removed!'), { timeout: 2000 })
      }
    } else if (storeInquiry.value.configuration?.supportFeature === 'ternary') {
      if (newSupportValue === 1) {
        showSuccess(t('agora', 'Inquiry supported, thanks for your support!'), { timeout: 2000 })
      } else if (newSupportValue === 0) {
        showSuccess(t('agora', 'Neutral position saved!'), { timeout: 2000 })
      } else if (newSupportValue === -1) {
        showSuccess(t('agora', 'Against position saved!'), { timeout: 2000 })
      } else if (newSupportValue === null && hadSupportedBefore) {
        showSuccess(t('agora', 'Participation removed!'), { timeout: 2000 })
      }
    }

  } catch (error) {
    console.error('Failed to toggle support:', error)
    showError(t('agora', 'Failed to update support status'))
  }
}

const onToggleSupport = async () => {
  // For simple support mode, toggle between 1 and null
  const currentValue = storeInquiry.value.currentUserStatus?.supportValue
  const newValue = currentValue === 1 ? null : 1
  await toggleSupport(newValue)
}

function openTernaryDetails() {
  showTernaryModal.value = true
}


// Watch for changes in support value
// Watch for changes in support value - now watching storeInquiry
watch(() => storeInquiry.value.currentUserStatus?.supportValue, (newValue) => {
  currentSupportValue.value = newValue || null
}, { immediate: true })


</script>
<style lang="scss" scoped>
/* This component only provides internal layout, typography, and component styling */

.inquiry-full-view {
  width: 100%;
  height: 100%;
  position: relative;
  background: transparent;
}

.full-view-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: transparent;
}

.full-view-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px;
  box-sizing: border-box;

  /* Internal spacing between sections */
  > * + * {
    margin-top: 32px;
  }
}

/* All sections get spacing only, parent handles the visual envelope */

.cover-image-section {
  width: 100%;
  margin-bottom: 0;

  .cover-image {
    width: 100%;
    height: 320px;
    object-fit: cover;
    display: block;
    border-radius: 12px; /* Match parent envelope radius */
  }
}

.title-section {
  .title-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 16px;

    .type-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 8px 16px;
      background: linear-gradient(135deg, var(--color-primary-element-light), rgba(var(--color-primary-rgb), 0.1));
      border-radius: 24px;
      font-size: 14px;
      font-weight: 600;
      color: var(--color-primary-element);
      border: 1px solid rgba(var(--color-primary-rgb), 0.2);

      .type-icon {
        color: var(--color-primary-element);
      }
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;

      &.status-open {
        background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(34, 197, 94, 0.08));
        color: #16a34a;
        border: 1px solid rgba(34, 197, 94, 0.3);
      }

      &.status-closed {
        background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.08));
        color: #dc2626;
        border: 1px solid rgba(239, 68, 68, 0.3);
      }

      &.status-draft {
        background: linear-gradient(135deg, rgba(148, 163, 184, 0.15), rgba(148, 163, 184, 0.08));
        color: #64748b;
        border: 1px solid rgba(148, 163, 184, 0.3);
      }

      &.status-waiting {
        background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.08));
        color: #f59e0b;
        border: 1px solid rgba(245, 158, 11, 0.3);
      }
    }
  }

  .inquiry-title {
    font-size: 36px;
    font-weight: 800;
    color: var(--color-main-text);
    margin: 0 0 32px 0;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  .author-meta-section {
    .author-info {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      background: var(--color-background-dark);
      border-radius: 12px;
      border: 1px solid var(--color-border);

      .author-avatar {
        flex-shrink: 0;
        border: 3px solid var(--color-main-background);
      }

      .author-details {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;

        .author-name {
          font-size: 16px;
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
          font-weight: 500;
        }
      }
    }
  }
}

/* Location and Category Grid */
.location-category-section {
  .location-category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;

    .meta-item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 24px;
      background: var(--color-main-background);
      border-radius: 16px;
      border: 2px solid var(--color-border);
      cursor: default;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        background: var(--color-background-dark);
        border-color: var(--color-primary-element-light);

        .meta-icon-container {
          transform: scale(1.1);
          background: rgba(var(--color-primary-rgb), 0.15);
        }
      }

      .meta-icon-container {
        flex-shrink: 0;
        width: 56px;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(var(--color-primary-rgb), 0.1);
        border-radius: 14px;
        transition: all 0.3s ease;

        .meta-icon {
          color: var(--color-primary-element);
        }
      }

      .meta-content {
        flex: 1;

        .meta-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--color-text-lighter);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }

        .meta-value {
          font-size: 16px;
          font-weight: 600;
          color: var(--color-main-text);
          line-height: 1.5;
          word-break: break-word;
        }
      }

      &.location-item .meta-icon {
        color: #3b82f6;
      }

      &.category-item .meta-icon {
        color: #8b5cf6;
      }

      &.expiration-item .meta-icon {
        color: #f59e0b;
      }

      &.interaction-item .meta-icon {
        color: #10b981;
      }
    }
  }
}

/* Common Section Header */
.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;

  .section-icon {
    color: var(--color-primary-element);
  }

  .section-title {
    font-size: 20px;
    font-weight: 700;
    color: var(--color-main-text);
    margin: 0;
  }
}

/* Description Content */
.description-section {
  .description-content {
    font-size: 16px;
    line-height: 1.8;
    color: var(--color-main-text);

    :deep(*) {
      margin: 0 0 20px 0;

      &:last-child {
        margin-bottom: 0;
      }
    }

    :deep(h1) {
      font-size: 24px;
      font-weight: 700;
      color: var(--color-main-text);
      margin: 32px 0 16px 0;
      padding-bottom: 8px;
      border-bottom: 2px solid var(--color-border);

      &:first-child {
        margin-top: 0;
      }
    }

    :deep(h2) {
      font-size: 20px;
      font-weight: 600;
      color: var(--color-main-text);
      margin: 28px 0 14px 0;
    }

    :deep(p) {
      margin-bottom: 20px;
      line-height: 1.8;
    }

    :deep(ul), :deep(ol) {
      padding-left: 24px;
      margin: 16px 0;

      li {
        margin-bottom: 8px;
        line-height: 1.6;
      }
    }

    :deep(a) {
      color: var(--color-primary-element);
      text-decoration: none;
      font-weight: 500;
      border-bottom: 1px solid transparent;
      transition: all 0.3s ease;

      &:hover {
        text-decoration: none;
        border-bottom-color: var(--color-primary-element);
      }
    }

    :deep(img) {
      max-width: 100%;
      height: auto;
      border-radius: 12px;
      margin: 24px 0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    :deep(.no-content) {
      text-align: center;
      padding: 60px 20px;
      color: var(--color-text-maxcontrast);
      font-style: italic;
      background: var(--color-background-darker);
      border-radius: 12px;
    }
  }
}

/* Resources Section */
.resources-section {
  .resources-content {
    :deep(.attachments-list) {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;

      .attachment-item {
        background: var(--color-background-dark);
        border-radius: 12px;
        border: 1px solid var(--color-border);
        padding: 16px;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          background: var(--color-background-darker);
          border-color: var(--color-primary-element);
        }
      }
    }
  }
}

/* Miscellaneous Fields */
.misc-fields-section {
  .misc-fields-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;

    .misc-field-item {
      padding: 20px;
      background: var(--color-background-dark);
      border-radius: 12px;
      border: 1px solid var(--color-border);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        background: var(--color-background-darker);
        border-color: var(--color-primary-element-light);
      }

      .misc-field-label {
        font-size: 12px;
        font-weight: 600;
        color: var(--color-text-lighter);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 8px;
      }

      .misc-field-value {
        font-size: 14px;
        font-weight: 500;
        color: var(--color-main-text);
        line-height: 1.5;
        word-break: break-word;
      }
    }
  }
}

/* Action Stats Section */
.action-stats-section {
  display: flex;
  gap: 24px;
  align-items: center;

  .stat-item {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    background: var(--color-background-dark);
    border-radius: 12px;
    border: 1px solid var(--color-border);
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      background: var(--color-background-darker);
      border-color: var(--color-primary-element-light);
    }

    &.supports-stat:hover {
      border-color: #10b981;
    }

    &.comments-stat:hover {
      border-color: #3b82f6;
    }

    &.participants-stat:hover {
      border-color: #8b5cf6;
    }

    .stat-icon-container {
      flex-shrink: 0;
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(var(--color-primary-rgb), 0.1);
      border-radius: 14px;
      transition: all 0.3s ease;

      .stat-icon {
        color: var(--color-primary-element);
        transition: transform 0.3s ease;
      }
    }

    &:hover .stat-icon-container {
      background: rgba(var(--color-primary-rgb), 0.15);
      transform: scale(1.05);
    }

    .stat-content {
      .stat-value {
        font-size: 28px;
        font-weight: 800;
        color: var(--color-main-text);
        margin-bottom: 4px;
        display: flex;
        align-items: baseline;
        gap: 4px;

        .quorum-text {
          font-size: 20px;
          font-weight: 600;
          color: var(--color-text-lighter);
        }
      }

      .stat-label {
        font-size: 14px;
        font-weight: 600;
        color: var(--color-text-lighter);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        display: flex;
        align-items: center;
        gap: 4px;

        .quorum-label {
          font-size: 12px;
          opacity: 0.8;
        }
      }
    }
  }

  .ternary-details-button {
    .details-button {
      white-space: nowrap;
    }
  }
}

/* Ternary Support Section */
.ternary-support-section {
  .ternary-support-buttons {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;

    .support-button {
      flex: 1;
      min-width: 120px;
      height: 48px;
      font-weight: 600;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      &.active-support {
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        border-color: #10b981;

        &:hover {
          background: linear-gradient(135deg, #059669, #047857);
        }
      }

      &.active-neutral {
        background: linear-gradient(135deg, #6b7280, #4b5563);
        color: white;
        border-color: #6b7280;
      }

      &.active-oppose {
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
        border-color: #ef4444;
      }
    }
  }
}
/* Comments Modal Styling */
.modal-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 24px;
  border-bottom: 1px solid var(--color-border);
  
  .modal-title {
    font-size: 20px;
    font-weight: 700;
    color: var(--color-main-text);
    margin: 0;
  }
  
  .modal-subtitle {
    font-size: 14px;
    color: var(--color-text-lighter);
    font-weight: 500;
  }
}

.modal-comments-container {
  padding: 24px;
  max-height: 70vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 1024px) {
  .full-view-content {
    padding: 24px;
    max-width: 100%;
  }

  .location-category-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)) !important;
  }

  .action-stats-section {
    flex-wrap: wrap;
    gap: 16px;

    .stat-item {
      min-width: calc(50% - 8px);
    }

    .ternary-details-button {
      width: 100%;
      .details-button {
        width: 100%;
      }
    }
  }

  .ternary-support-buttons {
    .support-button {
      min-width: 100px;
    }
  }
}

@media (max-width: 768px) {
  .full-view-content {
    padding: 20px;
  }

  .cover-image-section .cover-image {
    height: 240px;
  }

  .title-section {
    .inquiry-title {
      font-size: 28px;
    }

    .title-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
  }

  .location-category-grid {
    grid-template-columns: 1fr !important;
  }

  .action-stats-section {
    flex-direction: column;

    .stat-item {
      width: 100%;
      min-width: 100%;
    }
  }

  .ternary-support-buttons {
    flex-direction: column;

    .support-button {
      width: 100%;
    }
  }

  .misc-fields-grid {
    grid-template-columns: 1fr !important;
  }
}

@media (max-width: 480px) {
  .full-view-content {
    padding: 16px;
  }

  .cover-image-section .cover-image {
    height: 200px;
  }

  .title-section {
    .inquiry-title {
      font-size: 24px;
    }

    .author-meta-section .author-info {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;

      .author-details {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
    }
  }

  .meta-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;

    .meta-icon-container {
      width: 48px;
      height: 48px;
    }
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>

