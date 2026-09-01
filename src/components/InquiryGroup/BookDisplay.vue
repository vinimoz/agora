<!-- BookDisplay.vue - Wrapper for Book mode -->
<template>
  <div class="book-display">
    <div v-if="inquiry" class="book-container">
      <!-- Navigation breadcrumb -->
      <div class="book-navigation">
        <button class="nav-btn" @click="goBack">
          <component :is="Icons.ArrowLeft" :size="20" />
          <span>{{ t('agora', 'Back') }}</span>
        </button>
        <div class="book-location">
          <span v-if="parentGroup">{{ parentGroup.name }}</span>
          <span v-if="parentGroup" class="separator">/</span>
          <span class="current">{{ inquiry.title }}</span>
        </div>
        <div class="book-actions">
          <button class="action-btn" @click="toggleFullscreen" :title="t('agora', 'Fullscreen')">
            <component :is="Icons.Fullscreen" :size="20" />
          </button>
          <button class="action-btn" @click="toggleTOC" :title="t('agora', 'Table of Contents')">
            <component :is="Icons.Menu" :size="20" />
          </button>
        </div>
      </div>

      <!-- Main content as a book page -->
      <div class="book-page">
        <InquiryRichHTML
          :inquiry="inquiry"
          :display-mode="'book'"
          :show-cover="true"
          :show-meta="true"
          :show-stats="true"
          :show-author="true"
          :show-description="true"
          :show-expiry="true"
          :show-type="true"
          :show-status="true"
          :show-comments="true"
          :show-support="true"
          :show-participants="true"
          @click="handleInquiryClick"
        />
      </div>

      <!-- Table of Contents sidebar -->
      <div v-if="showTOC" class="book-toc">
        <div class="toc-header">
          <h4>{{ t('agora', 'Contents') }}</h4>
          <button class="close-btn" @click="showTOC = false">
            <component :is="Icons.Close" :size="16" />
          </button>
        </div>
        <div class="toc-items">
          <div
            v-for="item in tableOfContents"
            :key="item.id"
            class="toc-item"
            :class="{ active: item.id === inquiry.id }"
            @click="navigateTo(item.id)"
          >
            <span class="toc-indent" :style="{ paddingLeft: (item.level * 16) + 'px' }" />
            <component :is="getTocIcon(item)" :size="14" class="toc-icon" />
            <span class="toc-title">{{ item.title }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <component :is="Icons.BookOpen" :size="48" class="empty-icon" />
      <h3>{{ t('agora', 'No inquiry selected') }}</h3>
      <p>{{ t('agora', 'Select an inquiry from the table of contents to read it like a book') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { t } from '@nextcloud/l10n'
import { InquiryGeneralIcons as Icons } from '../../utils/icons'
import InquiryRichHTML from './InquiryRichHTML.vue'
import type { Inquiry, InquiryGroup } from '../../Types'

interface Props {
  inquiry: Inquiry | null
  inquiries?: Inquiry[]
  groups?: InquiryGroup[]
  parentGroup?: InquiryGroup | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  navigate: [inquiryId: number]
  back: []
}>()

const showTOC = ref(false)
const isFullscreen = ref(false)

// Build table of contents from inquiries and groups
const tableOfContents = computed(() => {
  const items: any[] = []

  // Add groups
  if (props.groups) {
    props.groups.forEach(group => {
      items.push({
        id: `group-${group.id}`,
        title: group.name,
        level: 0,
        type: 'group',
        icon: Icons.Folder
      })

      // Add inquiries under the group
      if (props.inquiries) {
        props.inquiries
          .filter(inq => inq.inquiryGroups?.includes(group.id))
          .forEach(inq => {
            items.push({
              id: inq.id,
              title: inq.title,
              level: 1,
              type: 'inquiry',
              icon: getInquiryIcon(inq)
            })
          })
      }
    })
  }

  // Add any inquiries not in groups
  if (props.inquiries && !props.groups) {
    props.inquiries.forEach(inq => {
      items.push({
        id: inq.id,
        title: inq.title,
        level: 0,
        type: 'inquiry',
        icon: getInquiryIcon(inq)
      })
    })
  }

  return items
})

function getInquiryIcon(inquiry: Inquiry): any {
  const iconMap: Record<string, any> = {
    'survey': Icons.ClipboardList,
    'poll': Icons.CheckCircle,
    'question': Icons.Question,
    'discussion': Icons.MessageSquare,
    'news': Icons.Newspaper,
    'announcement': Icons.Megaphone,
    'meeting': Icons.Users,
    'document': Icons.Document,
    'proposal': Icons.Scale,
  }
  return iconMap[inquiry.type?.toLowerCase()] || Icons.File
}

function getTocIcon(item: any): any {
  return item.icon || Icons.File
}

function navigateTo(id: number | string) {
  if (typeof id === 'number') {
    emit('navigate', id)
    showTOC.value = false
  }
}

function goBack() {
  emit('back')
}

function toggleFullscreen() {
  isFullscreen.value = !isFullscreen.value
  if (isFullscreen.value) {
    document.documentElement.requestFullscreen?.()
  } else {
    document.exitFullscreen?.()
  }
}

function toggleTOC() {
  showTOC.value = !showTOC.value
}

function handleInquiryClick(inquiry: Inquiry) {
  emit('navigate', inquiry.id)
}
</script>

<style lang="scss" scoped>
.book-display {
  background: var(--color-main-background);
  min-height: 500px;
  border-radius: 16px;
  border: 1px solid var(--color-border);
  overflow: hidden;
  position: relative;
}

.book-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.book-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-background-dark);

  .nav-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    background: var(--color-main-background);
    color: var(--color-text-lighter);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: var(--color-background-hover);
      border-color: var(--color-primary-element);
      color: var(--color-primary-element);
    }
  }

  .book-location {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: var(--color-text-lighter);

    .separator {
      color: var(--color-text-maxcontrast);
    }

    .current {
      font-weight: 600;
      color: var(--color-main-text);
    }
  }

  .book-actions {
    display: flex;
    gap: 4px;

    .action-btn {
      padding: 8px;
      border: 1px solid transparent;
      border-radius: 8px;
      background: transparent;
      color: var(--color-text-lighter);
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: var(--color-background-hover);
        color: var(--color-main-text);
      }
    }
  }
}

.book-page {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  max-height: 650px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: 4px;
  }
}

.book-toc {
  position: absolute;
  top: 0;
  right: 0;
  width: 320px;
  height: 100%;
  background: var(--color-main-background);
  border-left: 1px solid var(--color-border);
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.08);
  z-index: 10;
  animation: slideIn 0.3s ease;

  .toc-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid var(--color-border);

    h4 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: var(--color-main-text);
    }

    .close-btn {
      padding: 4px;
      border: none;
      background: transparent;
      color: var(--color-text-lighter);
      cursor: pointer;
      border-radius: 4px;

      &:hover {
        background: var(--color-background-hover);
        color: var(--color-main-text);
      }
    }
  }

  .toc-items {
    padding: 8px 0;
    overflow-y: auto;
    max-height: calc(100% - 60px);

    .toc-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: var(--color-background-hover);
      }

      &.active {
        background: var(--color-primary-light);
        border-right: 3px solid var(--color-primary-element);

        .toc-title {
          color: var(--color-primary-element);
          font-weight: 600;
        }
      }

      .toc-indent {
        flex-shrink: 0;
      }

      .toc-icon {
        color: var(--color-text-lighter);
        flex-shrink: 0;
      }

      .toc-title {
        font-size: 13px;
        color: var(--color-text-lighter);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: var(--color-text-lighter);

  .empty-icon {
    opacity: 0.3;
    margin-bottom: 16px;
  }

  h3 {
    margin: 0 0 8px 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--color-main-text);
  }

  p {
    margin: 0;
    font-size: 14px;
    text-align: center;
    max-width: 400px;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .book-navigation {
    flex-wrap: wrap;
    gap: 12px;
    padding: 12px 16px;

    .book-location {
      order: 3;
      width: 100%;
      justify-content: center;
      font-size: 13px;
    }
  }

  .book-page {
    padding: 16px;
  }

  .book-toc {
    width: 280px;
  }
}

@media (max-width: 480px) {
  .book-navigation .nav-btn span {
    display: none;
  }

  .book-toc {
    width: 100%;
  }
}
</style>
