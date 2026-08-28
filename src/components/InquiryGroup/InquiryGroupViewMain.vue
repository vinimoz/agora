<!--
- SPDX-FileCopyrightText: 2025 Nextcloud contributors
- SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div class="inquiry-group-view">
    <!-- Header Section - Presentation -->
    <section class="presentation-section">
      <div class="presentation-content">
        <h1 class="presentation-title">{{ t('agora','Présentation') }}</h1>
        
        <div v-if="group.description" class="description-container">
          <div class="description-content" :class="{ expanded: isDescriptionExpanded }">
            <div ref="descriptionText" class="description-text">
              <div class="rich-text-display">
                <p>{{ group.description }}</p>
              </div>
            </div>
            
            <button 
              v-if="isTruncated" 
              class="expand-button"
              :aria-expanded="isDescriptionExpanded"
              @click="isDescriptionExpanded = !isDescriptionExpanded"
            >
              <span class="button-text">
                {{ isDescriptionExpanded ? t('agora', 'Show less') : t('agora', 'Read more') }}
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" :class="{ rotated: isDescriptionExpanded }">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Layout Container - Full width dynamic with equal height -->
    <div class="layout-container">
      <!-- Main Content Area - Takes all remaining space -->
      <main class="layout-main">
        <!-- Header Area Inquiries -->
        <section v-if="headerInquiries.length > 0" class="inquiry-section header-section">
          <div class="inquiry-grid header-grid">
            <template v-for="inquiry in headerInquiries" :key="inquiry.id">
              <component
                :is="getInquiryComponent(inquiry, 'header')"
                :inquiry="inquiry"
                :render-mode="getRenderMode(inquiry, 'header')"
                class="header-item"
              />
            </template>
          </div>
        </section>

        <!-- Main Area Inquiries - Grouped by Type -->
        <section v-if="mainInquiries.length > 0" class="inquiry-section main-section">
          <!-- Group by Inquiry Type -->
          <div class="type-groups">
            <div
              v-for="(typeGroup, typeKey) in mainInquiriesByType"
              :key="typeKey"
              class="type-group"
            >
              <!-- Type Header -->
              <div class="type-header" @click="toggleType(typeKey)">
                <div class="type-info">
                  <div class="type-icon">
                    <component :is="getInquiryTypeIcon(typeKey)" />
                  </div>
                  <h3 class="type-name">{{ getInquiryTypeLabel(typeKey) }}</h3>
                  <span class="type-badge">{{ typeGroup.length }}</span>
                </div>
                <div class="type-toggle" :class="{ rotated: expandedTypes.includes(typeKey) }">
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                  </svg>
                </div>
              </div>
              
              <!-- Type Inquiries Grid -->
              <div v-show="expandedTypes.includes(typeKey)" class="type-inquiries">
                <div class="inquiry-grid main-grid" :class="{ 'single-full-item': typeGroup.length === 1 && isFullInquiry(typeGroup[0]) }">
                  <template v-for="inquiry in typeGroup" :key="inquiry.id">
                    <component
                      :is="getInquiryComponent(inquiry, 'main')"
                      :inquiry="inquiry"
                      :render-mode="getRenderMode(inquiry, 'main')"
                      class="main-item"
                      :class="{ 'full-width': isFullInquiry(inquiry) }"
                      @click="handleInquiryClick(inquiry)"
                    />
                  </template>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Footer Area Inquiries -->
        <section v-if="footerInquiries.length > 0" class="inquiry-section footer-section">
          <div class="inquiry-grid footer-grid">
            <template v-for="inquiry in footerInquiries" :key="inquiry.id">
              <component
                :is="getInquiryComponent(inquiry, 'footer')"
                :inquiry="inquiry"
                :render-mode="getRenderMode(inquiry, 'footer')"
                class="footer-item"
                @click="handleInquiryClick(inquiry)"
              />
            </template>
          </div>
        </section>
      </main>

      <!-- Right Sidebar - Fixed width, stretches to match height -->
      <aside v-if="hasSidebarInquiries" class="layout-sidebar">
        <div class="sidebar-header">
          <h2 class="sidebar-title">{{ t('agora', 'Enquêtes') }}</h2>
          <span class="inquiry-count">{{ sidebarInquiries.length }}</span>
        </div>

        <!-- Sidebar Inquiries - Grouped by Type -->
        <div class="sidebar-type-groups">
          <div
            v-for="(typeGroup, typeKey) in sidebarInquiriesByType"
            :key="typeKey"
            class="sidebar-type-group"
          >
            <!-- Sidebar Type Header -->
            <div class="sidebar-type-header" @click="toggleSidebarType(typeKey)">
              <div class="sidebar-type-info">
                <div class="sidebar-type-icon">
                  <component :is="getInquiryTypeIcon(typeKey)" />
                </div>
                <h4 class="sidebar-type-name">{{ getInquiryTypeLabel(typeKey) }}</h4>
                <span class="sidebar-type-badge">{{ typeGroup.length }}</span>
              </div>
              <div class="sidebar-type-toggle" :class="{ rotated: expandedSidebarTypes.includes(typeKey) }">
                <svg width="14" height="14" viewBox="0 0 24 24">
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                </svg>
              </div>
            </div>

            <!-- Sidebar Type Inquiries -->
            <div v-show="expandedSidebarTypes.includes(typeKey)" class="sidebar-inquiries">
              <template v-for="inquiry in typeGroup" :key="inquiry.id">
                <component
                  :is="getInquiryComponent(inquiry, 'sidebar')"
                  :inquiry="inquiry"
                  :render-mode="getRenderMode(inquiry, 'sidebar')"
                  class="sidebar-item"
                  @click="handleInquiryClick(inquiry)"
                />
              </template>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <!-- Modal for inquiries -->
    <NcModal
      v-if="showModal && modalInquiry"
      :show="showModal"
      :name="modalInquiry.title || 'Inquiry'"
      size="large"
      @close="closeModal"
    >
      <component
        :is="getInquiryComponent(modalInquiry, 'modal')"
        :inquiry="modalInquiry"
        :render-mode="getRenderMode(modalInquiry, 'modal')"
        class="modal-inquiry-content"
      />
    </NcModal>

    <!-- Small popup modal -->
    <NcModal
      v-if="showPopup && popupInquiry"
      :show="showPopup"
      :name="popupInquiry.title || 'Inquiry'"
      size="small"
      @close="closePopup"
    >
      <component
        :is="getInquiryComponent(popupInquiry, 'popup')"
        :inquiry="popupInquiry"
        :render-mode="getRenderMode(popupInquiry, 'popup')"
        class="popup-inquiry-content"
      />
    </NcModal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { t } from '@nextcloud/l10n'
import NcModal from '@nextcloud/vue/components/NcModal'

import type { Inquiry } from '../../Types/index.ts'
import type { InquiryGroup } from '../../stores/inquiryGroups.types.ts'

// Import stores
import { useInquiriesStore } from '../../stores/inquiries.ts'
import { useAppSettingsStore } from '../../stores/appSettings.ts'

// Import all inquiry display components
import InquiryCard from './InquiryCard.vue'
import InquiryListItem from './InquiryListItem.vue'
import InquiryFull from './InquiryFull.vue'
import InquiryRichHTML from './InquiryRichHTML.vue'
import InquirySummary from './InquirySummary.vue'

// Import helpers
import { getInquiryTypeData } from '../../helpers/modules/InquiryHelper.ts'

interface Props {
  group: InquiryGroup
  inquiryIds: number[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  viewInquiry: [id: number]
}>()

// Initialize stores and router
const inquiriesStore = useInquiriesStore()
const appSettingsStore = useAppSettingsStore()
const router = useRouter()

// State
const showModal = ref(false)
const showPopup = ref(false)
const modalInquiry = ref<Inquiry | null>(null)
const popupInquiry = ref<Inquiry | null>(null)
const isDescriptionExpanded = ref(false)
const isTruncated = ref(false)
const descriptionText = ref<HTMLElement>()
const expandedTypes = ref<string[]>([])
const expandedSidebarTypes = ref<string[]>([])

// Get inquiries from store using the IDs
const inquiries = computed(() => {
  const allInquiries = inquiriesStore.inquiries || []
  return props.inquiryIds
    .map(id => allInquiries.find(inquiry => inquiry.id === id))
    .filter(Boolean) as Inquiry[]
})

// Get inquiry types from appSettings
const inquiryTypes = computed(() => appSettingsStore.inquiryTypeTab || [])

// Helper function to get miscField with fallback
function getMiscField(inquiry: Inquiry, field: string, defaultValue: undefined = null) {
  return inquiry.miscFields?.[field] || defaultValue
}

// Check if inquiry should render in full mode
function isFullInquiry(inquiry: Inquiry): boolean {
  const renderMode = getMiscField(inquiry, 'render_mode', 'cards')
  return renderMode === 'full' || renderMode === 'rich_html'
}

// Get open mode for inquiry with default to 'page'
function getOpenMode(inquiry: Inquiry): string {
  return getMiscField(inquiry, 'open_mode', 'page')
}

// Layout compatibility matrix
const layoutCompatibility = {
  sidebar: ['cards', 'list', 'summary'],
  main: ['rich_html', 'full', 'summary', 'cards', 'list'],
  footer: ['cards', 'summary', 'list'],
  header: ['cards', 'summary', 'list']
}

// Get layout zone for inquiry
function getLayoutZone(inquiry: Inquiry): string {
  const layoutZone = getMiscField(inquiry, 'layout_zone')
  if (layoutZone && ['sidebar', 'main', 'footer', 'header'].includes(layoutZone)) {
    return layoutZone
  }

  if (isFullInquiry(inquiry)) {
    return 'main'
  }

  const renderMode = getMiscField(inquiry, 'render_mode', 'cards')
  const compatibleLayouts = Object.entries(layoutCompatibility)
    .filter(([, modes]) => modes.includes(renderMode))
    .map(([layout]) => layout)

  const priorityOrder = ['main', 'header', 'sidebar', 'footer']
  return priorityOrder.find(layout => compatibleLayouts.includes(layout)) || 'main'
}

// Get appropriate render mode for layout zone
function getRenderMode(inquiry: Inquiry, layoutZone: string): string {
  const preferredMode = getMiscField(inquiry, 'render_mode', 'cards')

  if (layoutCompatibility[layoutZone]?.includes(preferredMode)) {
    return preferredMode
  }

  return layoutCompatibility[layoutZone]?.[0] || 'cards'
}

// Component mapping
const componentMap = {
  cards: InquiryCard,
  list: InquiryListItem,
  full: InquiryFull,
  rich_html: InquiryRichHTML,
  summary: InquirySummary
}

// Get component for inquiry
function getInquiryComponent(inquiry: Inquiry, layoutZone: string) {
  const renderMode = getRenderMode(inquiry, layoutZone)
  return componentMap[renderMode as keyof typeof componentMap] || InquiryCard
}

// Get inquiry type icon
function getInquiryTypeIcon(typeKey: string) {
  const typeData = getInquiryTypeData(typeKey, inquiryTypes.value)
  return typeData?.icon || '📝'
}

function getInquiryTypeLabel(typeKey: string) {
  const typeData = getInquiryTypeData(typeKey, inquiryTypes.value)
  return typeData?.label ? t('agora', typeData.label) : typeKey
}

// Group inquiries by type
function groupInquiriesByType(inquiryList: Inquiry[]) {
  const grouped: Record<string, Inquiry[]> = {}

  inquiryList.forEach(inquiry => {
    const type = inquiry.type || 'default'
    if (!grouped[type]) grouped[type] = []
    grouped[type].push(inquiry)
  })

  return grouped
}

// Get inquiries for each layout zone
const sidebarInquiries = computed(() =>
  inquiries.value.filter(inquiry => getLayoutZone(inquiry) === 'sidebar')
)

const headerInquiries = computed(() =>
  inquiries.value.filter(inquiry => getLayoutZone(inquiry) === 'header')
)

const mainInquiries = computed(() =>
  inquiries.value.filter(inquiry => getLayoutZone(inquiry) === 'main')
)

const footerInquiries = computed(() =>
  inquiries.value.filter(inquiry => getLayoutZone(inquiry) === 'footer')
)

// Grouped inquiries
const sidebarInquiriesByType = computed(() => groupInquiriesByType(sidebarInquiries.value))
const mainInquiriesByType = computed(() => groupInquiriesByType(mainInquiries.value))

// Helper computed properties
const hasSidebarInquiries = computed(() => sidebarInquiries.value.length > 0)

// Toggle functions
function toggleType(typeKey: string) {
  const index = expandedTypes.value.indexOf(typeKey)
  if (index > -1) {
    expandedTypes.value.splice(index, 1)
  } else {
    expandedTypes.value.push(typeKey)
  }
}

function toggleSidebarType(typeKey: string) {
  const index = expandedSidebarTypes.value.indexOf(typeKey)
  if (index > -1) {
    expandedSidebarTypes.value.splice(index, 1)
  } else {
    expandedSidebarTypes.value.push(typeKey)
  }
}

// Handle inquiry click
function handleInquiryClick(inquiry: Inquiry) {
  const openMode = getOpenMode(inquiry)
  
  switch (openMode) {
    case 'modal':
      modalInquiry.value = inquiry
      showModal.value = true
      break
      
    case 'none':
      break
      
    case 'page':
    default:
      router.push({
        name: 'inquiry',
        params: { id: inquiry.id }
      })
      break
  }
  
  emit('viewInquiry', inquiry.id)
}

// Close modal
function closeModal() {
  showModal.value = false
  modalInquiry.value = null
}

// Close popup
function closePopup() {
  showPopup.value = false
  popupInquiry.value = null
}

// Check if description needs truncation
onMounted(() => {
  nextTick(() => {
    if (descriptionText.value) {
      const lineHeight = parseInt(getComputedStyle(descriptionText.value).lineHeight)
      const maxHeight = lineHeight * 6
      isTruncated.value = descriptionText.value.scrollHeight > maxHeight
    }
  })

  // Auto-expand first type if only one exists
  const typeKeys = Object.keys(mainInquiriesByType.value)
  if (typeKeys.length === 1) {
    expandedTypes.value = [typeKeys[0]]
  }
  
  const sidebarTypeKeys = Object.keys(sidebarInquiriesByType.value)
  if (sidebarTypeKeys.length === 1) {
    expandedSidebarTypes.value = [sidebarTypeKeys[0]]
  }
})
</script>

<style lang="scss" scoped>
.inquiry-group-view {
  min-height: 100vh;
  background: transparent;
  overflow: hidden;
}

/* === PRESENTATION SECTION - Clean & transparent === */
.presentation-section {
  padding: 0 0 16px 0;
  margin-bottom: 0;
  background: transparent;
}

.presentation-content {
  max-width: 100%;
  padding: 0;
}

.presentation-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-main-text);
  margin: 0 0 16px 0;
  line-height: 1.2;
}

.description-container {
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: var(--color-main-background);
  overflow: hidden;
  margin: 0;
}

.description-content {
  padding: 24px;
  position: relative;
  background: var(--color-main-background);

  &.expanded {
    .description-text {
      max-height: none;
    }
  }
}

.description-text {
  font-size: 15px;
  line-height: 1.8;
  background: var(--color-main-background);
  color: var(--color-text-lighter);
  max-height: 10.8em;
  overflow: hidden;
  transition: max-height 0.3s ease;

  p {
    margin: 0 0 16px 0;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.expand-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  padding: 8px 16px;
  background: var(--color-main-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-primary-element);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;

  &:hover {
    background: var(--color-background-hover);
    border-color: var(--color-primary-element);
  }

  svg {
    transition: transform 0.2s ease;
    fill: currentColor;

    &.rotated {
      transform: rotate(180deg);
    }
  }
}

/* === LAYOUT CONTAINER - Equal height columns === */
.layout-container {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 24px;
  max-width: 100%;
  margin: 0;
  padding: 16px 0 0 0;
  min-height: calc(100vh - 120px);
  align-items: stretch; /* This makes both columns stretch to the same height */
  background: transparent;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 12px 0 0 0;
    align-items: start; /* On mobile, don't stretch */
  }
  
  @media (max-width: 768px) {
    padding: 8px 0 0 0;
  }
}

/* === MAIN CONTENT AREA === */
.layout-main {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
  padding-right: 0;
  height: 100%; /* Take full height */
}

/* === SIDEBAR - Stretch to match height === */
.layout-sidebar {
  position: sticky;
  top: 24px;
  height: fit-content;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: var(--color-main-background);
  padding: 16px;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-self: stretch; /* This makes the sidebar stretch to match the main content height */
  
  @media (max-width: 1200px) {
    position: static;
    max-height: none;
    align-self: start;
  }
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--color-border);
  flex-shrink: 0;
}

.sidebar-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-main-text);
  margin: 0;
}

.inquiry-count {
  background: var(--color-primary-element);
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  min-width: 32px;
  text-align: center;
}

.sidebar-type-groups {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1; /* Take remaining space */
}

.sidebar-type-group {
  border-radius: 8px;
  border: 1px solid var(--color-border);
  overflow: hidden;
  flex-shrink: 0;
}

.sidebar-type-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: var(--color-background-dark);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--color-background-hover);
  }
}

.sidebar-type-info {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.sidebar-type-icon {
  width: 18px;
  height: 18px;
  color: var(--color-primary-element);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;

  :deep(svg) {
    width: 100%;
    height: 100%;
  }
}

.sidebar-type-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-main-text);
  margin: 0;
  flex: 1;
}

.sidebar-type-badge {
  background: var(--color-background-darker);
  color: var(--color-text-lighter);
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  min-width: 24px;
  text-align: center;
}

.sidebar-type-toggle {
  color: var(--color-text-lighter);
  transition: transform 0.2s ease;

  svg {
    fill: currentColor;
  }

  &.rotated {
    transform: rotate(180deg);
  }
}

.sidebar-inquiries {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
}

.sidebar-item {
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: var(--color-main-background);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
}

/* === INQUIRY SECTIONS === */
.inquiry-section {
  &.header-section {
    margin-bottom: 0;
  }
  
  &.main-section {
    margin-bottom: 0;
  }
  
  &.footer-section {
    margin-top: 0;
  }
}

/* === TYPE GROUPS === */
.type-groups {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.type-group {
  background: var(--color-main-background);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  overflow: hidden;
  margin: 0;
}

.type-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  background: var(--color-background-dark);
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid var(--color-border);

  &:hover {
    background: var(--color-background-hover);
  }
}

.type-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.type-icon {
  width: 20px;
  height: 20px;
  color: var(--color-primary-element);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;

  :deep(svg) {
    width: 100%;
    height: 100%;
  }
}

.type-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-main-text);
  margin: 0;
  flex: 1;
}

.type-badge {
  background: var(--color-background-darker);
  color: var(--color-text-lighter);
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  min-width: 28px;
  text-align: center;
}

.type-toggle {
  color: var(--color-text-lighter);
  transition: transform 0.2s ease;

  svg {
    fill: currentColor;
  }

  &.rotated {
    transform: rotate(180deg);
  }
}

.type-inquiries {
  padding: 16px;
}

/* === INQUIRY GRIDS === */
.inquiry-grid {
  &.main-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
    
    .full-width {
      grid-column: 1 / -1;
    }
    
    &.single-full-item {
      grid-template-columns: 1fr;
    }
  }
  
  &.header-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
  }
  
  &.footer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
  }
}

/* === INQUIRY ITEMS === */
.header-item,
.sidebar-item,
.footer-item,
.main-item {
  border-radius: 12px;
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  overflow: hidden;
  position: relative;
  background: var(--color-main-background);
  
  &:hover {
    border-color: var(--color-primary-element);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    transform: translateY(-3px);
  }
  
  &.active {
    border-color: var(--color-primary-element);
    box-shadow: 0 4px 16px rgba(var(--color-primary-rgb), 0.15);
  }
}

/* === MODAL STYLES === */
:deep(.modal-inquiry-content) {
  padding: 24px;
  max-height: 80vh;
  overflow-y: auto;
}

:deep(.popup-inquiry-content) {
  padding: 16px;
}

/* === RESPONSIVE === */
@media (max-width: 768px) {
  .header-item,
  .sidebar-item,
  .footer-item,
  .main-item {
    border-radius: 10px;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
  
  .inquiry-grid.main-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .presentation-section {
    padding: 0 0 12px 0;
  }
  
  .presentation-title {
    font-size: 24px;
  }
  
  .description-content {
    padding: 16px;
  }
  
  .type-header {
    padding: 12px 16px;
  }
  
  .type-inquiries {
    padding: 12px;
  }
}

@media (max-width: 480px) {
  .presentation-section {
    padding: 0 0 8px 0;
  }
  
  .presentation-title {
    font-size: 20px;
  }
  
  .description-content {
    padding: 12px;
  }
  
  .description-text {
    font-size: 14px;
  }
}
</style>
