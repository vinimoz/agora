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
      
    case 'popup':
      popupInquiry.value = inquiry
      showPopup.value = true
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
  background: transparent;
  overflow: visible;
}

/* === ENVELOPE STYLES - Applied to ALL inquiry items === */
.header-item,
.sidebar-item,
.footer-item,
.main-item {
  /* Outer container styling */
  border: 2px solid var(--color-border);
  border-radius: 16px;
  // background: var(--color-main-background);
  background: transparent;

  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.05),
    0 1px 2px rgba(0, 0, 0, 0.03);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  overflow: hidden;
  position: relative;
  
  /* Subtle gradient overlay on hover */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(var(--color-primary-rgb), 0.02) 0%,
      rgba(var(--color-primary-rgb), 0) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 1;
  }
  
  /* Hover effects - ENVELOPE ONLY */
  &:hover {
    border-color: var(--color-primary-element);
    box-shadow: 
      0 8px 24px rgba(0, 0, 0, 0.1),
      0 4px 12px rgba(var(--color-primary-rgb), 0.05);
    transform: translateY(-3px);
    
    &::before {
      opacity: 1;
    }
  }
  
  /* Active/Selected state */
  &.active {
    border-color: var(--color-primary-element);
    background: rgba(var(--color-primary-rgb), 0.03);
    box-shadow: 
      0 4px 16px rgba(var(--color-primary-rgb), 0.1),
      inset 0 0 0 1px rgba(var(--color-primary-rgb), 0.1);
  }
  
  /* Different section accents */
  &.header-item:hover {
    border-color: #3b82f6; /* Blue accent */
  }
  
  &.main-item:hover {
    border-color: var(--color-primary-element); /* Primary color */
  }
  
  &.footer-item:hover {
    border-color: #10b981; /* Green accent */
  }
  
  &.sidebar-item:hover {
    border-color: #8b5cf6; /* Purple accent */
  }
  
  /* === INSIDE THE ENVELOPE - Child components have full control === */
  /* Remove any deep styling that affects child components */
  :deep(*) {
    /* Child components control their own:
       - Padding/Margins
       - Internal borders
       - Background colors
       - Typography
       - Button styles
       - Component-specific layouts
    */
  }
  
  /* Only set the wrapper for child components */
  :deep(.inquiry-full-view),
  :deep(.inquiry-card),
  :deep(.inquiry-list-item),
  :deep(.inquiry-summary),
  :deep(.inquiry-rich-html) {
    width: 100%;
    height: 100%;
    background: transparent !important; /* Let parent control background */
    border: 2px !important; /* No borders inside */
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
    position: relative;
    z-index: 2; /* Above the envelope's ::before overlay */
  }
}

/* Layout Container */
.layout-container {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 24px;
  max-width: 1600px;
  margin: 0 auto;
  padding: 24px;
  min-height: calc(100vh - 120px);
  align-items: start;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
  }
}

/* Inquiry Grids - ENVELOPE positioning only */
.inquiry-grid {
  &.main-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 24px;
    
    .full-width {
      grid-column: 1 / -1;
    }
  }
  
  &.header-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
  
  &.footer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }
}

/* Sidebar items - special envelope sizing */
.sidebar-item {
  /* Slightly smaller for sidebar */
  border-width: 1.5px;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  
  &:hover {
    transform: translateY(-2px);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .header-item,
  .sidebar-item,
  .footer-item,
  .main-item {
    border-width: 1.5px;
    border-radius: 12px;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
  
  .inquiry-grid.main-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
