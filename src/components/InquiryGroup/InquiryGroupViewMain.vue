<!--
- SPDX-FileCopyrightText: 2025 Nextcloud contributors
- SPDX-License-Identifier: AGPL-3.0-or-later
-->
<!-- InquiryGroupViewMain.vue -->
<template>
  <div class="inquiry-group-view-main">
    <!-- Main Layout Container -->
    <div class="layout-container">
      <!-- Main Content Area -->
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
              <!-- Type Inquiries Grid -->
              <div class="type-inquiries">
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

      <!-- Right Sidebar -->
      <aside v-if="hasSidebarInquiries" class="layout-sidebar">
        <!-- Sidebar Inquiries - Grouped by Type -->
        <div class="sidebar-type-groups">
          <div
            v-for="(typeGroup, typeKey) in sidebarInquiriesByType"
            :key="typeKey"
            class="sidebar-type-group"
          >

            <!-- Sidebar Type Inquiries -->
            <div class="sidebar-inquiries">
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
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import NcModal from '@nextcloud/vue/components/NcModal'

import type { Inquiry } from '../../Types/index.ts'

// Import stores
import { useInquiriesStore } from '../../stores/inquiries.ts'

// Import all inquiry display components
import InquiryCard from './InquiryCard.vue'
import InquiryListItem from './InquiryListItem.vue'
import InquiryFull from './InquiryFull.vue'
import InquiryRichHTML from './InquiryRichHTML.vue'
import InquirySummary from './InquirySummary.vue'

interface Props {
  inquiryIds: number[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  viewInquiry: [id: number]
}>()

// Initialize stores and router
const inquiriesStore = useInquiriesStore()
const router = useRouter()

const showModal = ref(false)
const showPopup = ref(false)
const modalInquiry = ref<Inquiry | null>(null)
const popupInquiry = ref<Inquiry | null>(null)

// Get inquiries from store using the IDs
const inquiries = computed(() => {
  const allInquiries = inquiriesStore.inquiries || []
  return props.inquiryIds
    .map(id => allInquiries.find(inquiry => inquiry.id === id))
    .filter(Boolean) as Inquiry[]
})

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
  return getMiscField(inquiry, 'open_mode', 'page') // Default to 'page'
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

  // If it's a full inquiry, always put it in main
  if (isFullInquiry(inquiry)) {
    return 'main'
  }

  // Determine by render mode
  const renderMode = getMiscField(inquiry, 'render_mode', 'cards')

  // Find compatible layout
  const compatibleLayouts = Object.entries(layoutCompatibility)
    .filter(([, modes]) => modes.includes(renderMode))
    .map(([layout]) => layout)

  // Priority order
  const priorityOrder = ['main', 'header', 'sidebar', 'footer']
  return priorityOrder.find(layout => compatibleLayouts.includes(layout)) || 'main'
}

// Get appropriate render mode for layout zone
function getRenderMode(inquiry: Inquiry, layoutZone: string): string {
  const preferredMode = getMiscField(inquiry, 'render_mode', 'cards')

  // Check if preferred mode is compatible
  if (layoutCompatibility[layoutZone]?.includes(preferredMode)) {
    return preferredMode
  }

  // Fallback to first compatible mode
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

// Handle inquiry click - with open_mode support
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
      // Navigate to edit page using router
      router.push({
        name: 'inquiry',
        params: { id: inquiry.id }
      })
      break
  }
  
  // Emit the viewInquiry event for parent components
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
</script>

<style lang="scss" scoped>

.inquiry-group-view-main {
  min-height: 100vh;
}

/* Envelope Styles - Applied to ALL inquiry items */
.header-item,
.sidebar-item,
.footer-item,
.main-item {
  border: 8px solid var(--inquiry-gray-200);
  border-radius: var(--inquiry-border-radius-lg);
  box-shadow: var(--inquiry-shadow-sm);
  transition: var(--inquiry-transition-slow);
  cursor: pointer;
  overflow: hidden;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(37, 99, 235, 0.05) 0%,
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 1;
  }
  
  &:hover {
    border-color: var(--inquiry-primary);
    box-shadow: var(--inquiry-shadow-xl);
    transform: translateY(-4px);
    
    &::before {
      opacity: 1;
    }
  }
  
  &.active {
    border-color: var(--inquiry-primary);
    background: rgba(37, 99, 235, 0.03);
    box-shadow: 0 4px 16px rgba(37, 99, 235, 0.1);
  }
  
  /* Zone-specific hover effects */
  &.header-item:hover {
    border-color: var(--inquiry-zone-header);
    box-shadow: 0 12px 24px rgba(59, 130, 246, 0.15);
  }
  
  &.main-item:hover {
    border-color: var(--inquiry-zone-main);
    box-shadow: 0 12px 24px rgba(37, 99, 235, 0.15);
  }
  
  &.footer-item:hover {
    border-color: var(--inquiry-zone-footer);
    box-shadow: 0 12px 24px rgba(16, 185, 129, 0.15);
  }
  
  &.sidebar-item:hover {
    border-color: var(--inquiry-zone-sidebar);
    box-shadow: 0 12px 24px rgba(139, 92, 246, 0.15);
  }
  
}

/* Layout Container */
.layout-container {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 1.5rem;
  max-width: 1600px;
  margin: 0 auto;
  padding: 1.5rem;
  min-height: calc(100vh - 120px);
  align-items: start;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    padding: 1.25rem;
  }
}

/* Main Content Area */
.layout-main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Inquiry Sections */
.inquiry-section {
  
  &.header-section {
    margin-bottom: 1rem;
  }
  
  &.main-section {
    margin-bottom: 1.5rem;
  }
  
  &.footer-section {
    margin-top: 1rem;
  }
}

/* Type Groups */
.type-groups {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.type-group {
 /* background: var(--color-main-background); */
}

.type-header {
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--inquiry-gray-200);
  
  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--inquiry-gray-700);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

/* Inquiry Grids */
.inquiry-grid {
  &.main-grid {
      background: transparent;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
    
    .full-width {
      grid-column: 1 / -1;
    }
    
    &.single-full-item {
      grid-template-columns: 1fr;
    }
  }
  
  &.header-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.25rem;
  }
  
  &.footer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.25rem;
  }
}

/* Sidebar */
.layout-sidebar {
  position: sticky;
  top: 2rem;
  height: fit-content;
  
  .sidebar-type-groups {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .sidebar-type-group {
  /*background: var(--color-main-background); */
    
    .sidebar-type-header {
      margin-bottom: 0.75rem;
      
      h4 {
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--inquiry-gray-600);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    }
  }
  
  .sidebar-inquiries {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
}

/* Sidebar items */
.sidebar-item {
  border-width: 5px;
  border-radius: var(--inquiry-border-radius);
  box-shadow: var(--inquiry-shadow-sm);
  
  &:hover {
    transform: translateY(-2px);
  }
}

/* Modal Styles */
:deep(.modal-inquiry-content) {
  padding: 2rem;
  max-height: 80vh;
  overflow-y: auto;
}

:deep(.popup-inquiry-content) {
  padding: 1.5rem;
}

.inquiry-grid.main-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, max-content));
  gap: 1.5rem;
  justify-content: start; /* Align items to start instead of stretching */
  
  .full-width {
    grid-column: 1 / -1;
    width: 100%; /* Full width items still stretch */
  }
}


/* Responsive */
@media (max-width: 768px) {
  .header-item,
  .sidebar-item,
  .footer-item,
  .main-item {
    border-width: 1.5px;
    border-radius: var(--inquiry-border-radius);
    
    &:hover {
      transform: translateY(-2px);
    }
  }
  
  .inquiry-grid.main-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  
  .layout-container {
    padding: 1rem;
  }
}
</style>
