/** * SPDX-FileCopyrightText: 2026 Nextcloud contributors *
SPDX-License-Identifier: AGPL-3.0-or-later */

<template>
  <div class="book-display">
    <div
      v-if="inquiry"
      class="book-container"
    >
      <!-- Reading progress -->
      <div
        class="reading-progress"
        :style="{ width: readingProgress + '%' }"
      />

      <!-- Navigation breadcrumb -->
      <div class="book-navigation">
        <button
          class="nav-btn"
          @click="goBack"
        >
          <component
            :is="Icons.ArrowLeft"
            :size="18"
          />
          <span>{{ t("agora", "Back") }}</span>
        </button>

        <div class="book-location">
          <span v-if="parentGroup">{{ parentGroup.name }}</span>
          <span
            v-if="parentGroup"
            class="separator"
          >/</span>
          <span class="current">{{ inquiry.title }}</span>
        </div>

        <div class="book-actions">
          <button
            class="action-btn"
            :title="t('agora', 'Fullscreen')"
            @click="toggleFullscreen"
          >
            <component
              :is="Icons.Fullscreen"
              :size="18"
            />
          </button>
          <button
            class="action-btn"
            :title="t('agora', 'Table of Contents')"
            @click="toggleTOC"
          >
            <component
              :is="Icons.Menu"
              :size="18"
            />
          </button>
        </div>
      </div>

      <!-- Main content as a book page -->
      <div class="book-page">
        <article class="book-article">
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
        </article>

        <!-- Page navigation -->
        <div
          v-if="sortedInquiries.length > 1"
          class="book-pagination"
        >
          <button
            class="page-btn"
            :disabled="!prevInquiry"
            @click="prevInquiry && navigateTo(prevInquiry.id)"
          >
            <component
              :is="Icons.ArrowLeft"
              :size="16"
            />
            <span
              v-if="prevInquiry"
              class="page-title"
            >
              {{ prevInquiry.title }}
            </span>
            <span v-else>{{ t("agora", "Previous") }}</span>
          </button>

          <span class="page-indicator">
            {{ currentIndex + 1 }} / {{ sortedInquiries.length }}
          </span>

          <button
            class="page-btn next"
            :disabled="!nextInquiry"
            @click="nextInquiry && navigateTo(nextInquiry.id)"
          >
            <span
              v-if="nextInquiry"
              class="page-title"
            >
              {{ nextInquiry.title }}
            </span>
            <span v-else>{{ t("agora", "Next") }}</span>
            <component
              :is="Icons.ArrowRight"
              :size="16"
            />
          </button>
        </div>
      </div>

      <!-- Table of Contents sidebar -->
      <transition name="toc-slide">
        <div
          v-if="showTOC"
          class="book-toc"
        >
          <div class="toc-header">
            <h4>{{ t("agora", "Contents") }}</h4>
            <button
              class="close-btn"
              @click="showTOC = false"
            >
              <component
                :is="Icons.Close"
                :size="16"
              />
            </button>
          </div>
          <div class="toc-items">
            <div
              v-for="(item, idx) in tableOfContents"
              :key="item.id"
              class="toc-item"
              :class="{ active: item.id === inquiry.id }"
              @click="navigateTo(item.id)"
            >
              <span class="toc-index">{{ idx + 1 }}</span>
              <component
                :is="getTocIcon(item)"
                :size="14"
                class="toc-icon"
              />
              <span class="toc-title">{{ item.title }}</span>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div
      v-else
      class="empty-state"
    >
      <component
        :is="Icons.BookOpen"
        :size="48"
        class="empty-icon"
      />
      <h3>{{ t("agora", "No inquiry selected") }}</h3>
      <p>
        {{
          t(
            "agora",
            "Select an inquiry from the table of contents to read it like a book",
          )
        }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type Component } from "vue";
import { t } from "@nextcloud/l10n";
import { InquiryGeneralIcons as Icons } from "../../utils/icons";
import InquiryRichHTML from "./InquiryRichHTML.vue";
import type { Item, Inquiry, InquiryGroup } from "../../Types";

interface Props {
  inquiry: Inquiry | null;
  inquiries?: Inquiry[];
  groups?: InquiryGroup[];
  parentGroup?: InquiryGroup | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  navigate: [inquiryId: number];
  back: [];
}>();

const showTOC = ref(false);
const isFullscreen = ref(false);

// Flat, ordered list of inquiries used for prev/next & progress.
const sortedInquiries = computed<Inquiry[]>(() => {
  const list = props.inquiries?.filter(Boolean) ?? [];
  return [...list].sort((a, b) => (a.title || "").localeCompare(b.title || ""));
});

const currentIndex = computed(() =>
  sortedInquiries.value.findIndex((i) => i.id === props.inquiry?.id),
);

const prevInquiry = computed<Inquiry | null>(() => {
  const i = currentIndex.value;
  return i > 0 ? sortedInquiries.value[i - 1] : null;
});

const nextInquiry = computed<Inquiry | null>(() => {
  const i = currentIndex.value;
  return i >= 0 && i < sortedInquiries.value.length - 1
    ? sortedInquiries.value[i + 1]
    : null;
});

const readingProgress = computed(() => {
  const total = sortedInquiries.value.length;
  if (total <= 1) return 100;
  return Math.round(((currentIndex.value + 1) / total) * 100);
});

// Simple flat TOC — groups no longer complicate navigation.
const tableOfContents = computed(() => {
  return sortedInquiries.value.map((inq) => ({
    id: inq.id,
    title: inq.title,
    type: "inquiry",
    icon: getInquiryIcon(inq),
  }));
});

function getInquiryIcon(inquiry: Inquiry): Component {
  const iconMap: Record<string, Component> = {
    survey: Icons.ClipboardList,
    poll: Icons.CheckCircle,
    question: Icons.Question,
    discussion: Icons.MessageSquare,
    news: Icons.Newspaper,
    announcement: Icons.Megaphone,
    meeting: Icons.Users,
    document: Icons.Document,
    proposal: Icons.Scale,
  };
  return iconMap[inquiry.type?.toLowerCase()] || Icons.File;
}

function getTocIcon(item: Item): Component {
  return item.icon || Icons.File;
}

function navigateTo(id: number | string) {
  if (typeof id === "number") {
    emit("navigate", id);
    showTOC.value = false;
  }
}

function goBack() {
  emit("back");
}

function toggleFullscreen() {
  isFullscreen.value = !isFullscreen.value;
  if (isFullscreen.value) {
    document.documentElement.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}

function toggleTOC() {
  showTOC.value = !showTOC.value;
}

function handleInquiryClick(inquiry: Inquiry) {
  emit("navigate", inquiry.id);
}
</script>

<style lang="scss" scoped>
.book-display {
  background: var(--color-main-background);
  min-height: 500px;
  border-radius: 18px;
  border: 1px solid var(--color-border);
  overflow: hidden;
  position: relative;
  font-family: var(--font-face, system-ui);
}

.book-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

/* Reading progress bar */
.reading-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(
    90deg,
    var(--color-primary-element),
    var(--color-primary-element-light, var(--color-primary-element))
  );
  transition: width 0.35s ease;
  z-index: 5;
}

/* Navigation bar */
.book-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 24px;
  border-bottom: 1px solid var(--color-border);
  background: linear-gradient(
    to bottom,
    var(--color-background-dark),
    var(--color-main-background)
  );
  gap: 16px;

  .nav-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 7px 14px;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    background: var(--color-main-background);
    color: var(--color-text-lighter);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.18s ease;

    &:hover {
      background: var(--color-primary-element-light);
      border-color: var(--color-primary-element);
      color: var(--color-primary-element);
      transform: translateX(-2px);
    }
  }

  .book-location {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: var(--color-text-lighter);
    min-width: 0;
    flex: 1;
    justify-content: center;

    .separator {
      opacity: 0.5;
    }

    .current {
      font-weight: 600;
      color: var(--color-main-text);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .book-actions {
    display: flex;
    gap: 4px;

    .action-btn {
      padding: 7px;
      border: 1px solid transparent;
      border-radius: 8px;
      background: transparent;
      color: var(--color-text-lighter);
      cursor: pointer;
      transition: all 0.18s ease;

      &:hover {
        background: var(--color-background-hover);
        color: var(--color-main-text);
        border-color: var(--color-border);
      }
    }
  }
}

/* Article page */
.book-page {
  flex: 1;
  padding: 36px 56px;
  overflow-y: auto;
  max-height: 680px;
  background:
    radial-gradient(
      circle at 10% 0%,
      var(--color-primary-element-light, transparent) 0%,
      transparent 40%
    ),
    radial-gradient(
      circle at 90% 100%,
      var(--color-primary-element-light, transparent) 0%,
      transparent 40%
    ),
    var(--color-main-background);
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: 4px;
  }
}

.book-article {
  max-width: 780px;
  margin: 0 auto;
  width: 100%;
  flex: 1;

  /* Serif for the reading surface */
  :deep(p),
  :deep(li),
  :deep(blockquote) {
    font-family: Georgia, "Iowan Old Style", "Palatino Linotype", serif;
    font-size: 17px;
    line-height: 1.75;
    color: var(--color-main-text);
  }

  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4) {
    font-family: var(--font-face, system-ui);
    letter-spacing: -0.01em;
    color: var(--color-main-text);
    margin-top: 1.4em;
  }

  :deep(h1) {
    font-size: 2em;
    margin-top: 0.2em;
  }
  :deep(h2) {
    font-size: 1.5em;
  }
  :deep(h3) {
    font-size: 1.2em;
  }

  :deep(blockquote) {
    margin: 1.2em 0;
    padding: 12px 20px;
    border-left: 3px solid var(--color-primary-element);
    background: var(--color-background-dark);
    border-radius: 0 8px 8px 0;
    font-style: italic;
  }

  :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    margin: 1.5em 0;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }
}

/* Prev / next pagination */
.book-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px dashed var(--color-border);

  .page-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    border: 1px solid var(--color-border);
    border-radius: 10px;
    background: var(--color-main-background);
    color: var(--color-text-lighter);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    max-width: 45%;
    transition: all 0.18s ease;

    &:hover:not(:disabled) {
      color: var(--color-primary-element);
      border-color: var(--color-primary-element);
      background: var(--color-primary-element-light);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    &.next {
      margin-left: auto;
    }

    .page-title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .page-indicator {
    font-size: 12px;
    font-weight: 600;
    color: var(--color-text-lighter);
    padding: 4px 12px;
    background: var(--color-background-dark);
    border-radius: 999px;
    flex-shrink: 0;
  }
}

/* TOC */
.book-toc {
  position: absolute;
  top: 0;
  right: 0;
  width: 340px;
  height: 100%;
  background: var(--color-main-background);
  border-left: 1px solid var(--color-border);
  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.08);
  z-index: 10;
  display: flex;
  flex-direction: column;

  .toc-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 22px;
    border-bottom: 1px solid var(--color-border);
    background: var(--color-background-dark);

    h4 {
      margin: 0;
      font-size: 15px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--color-text-lighter);
    }

    .close-btn {
      padding: 6px;
      border: none;
      background: transparent;
      color: var(--color-text-lighter);
      cursor: pointer;
      border-radius: 6px;
      transition: all 0.15s ease;

      &:hover {
        background: var(--color-background-hover);
        color: var(--color-main-text);
      }
    }
  }

  .toc-items {
    padding: 10px 0;
    overflow-y: auto;
    flex: 1;

    .toc-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 22px;
      cursor: pointer;
      transition: background 0.15s ease;

      &:hover {
        background: var(--color-background-hover);
      }

      &.active {
        background: var(--color-primary-element-light);
        border-left: 3px solid var(--color-primary-element);

        .toc-title {
          color: var(--color-primary-element);
          font-weight: 600;
        }
        .toc-index {
          background: var(--color-primary-element);
          color: white;
        }
      }

      .toc-index {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 22px;
        height: 22px;
        padding: 0 4px;
        background: var(--color-background-dark);
        border-radius: 6px;
        font-size: 11px;
        font-weight: 600;
        color: var(--color-text-lighter);
        flex-shrink: 0;
      }

      .toc-icon {
        color: var(--color-text-lighter);
        flex-shrink: 0;
      }

      .toc-title {
        font-size: 13px;
        color: var(--color-text-lighter);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

/* Empty state */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 90px 20px;
  color: var(--color-text-lighter);
  text-align: center;

  .empty-icon {
    opacity: 0.25;
    margin-bottom: 18px;
  }

  h3 {
    margin: 0 0 8px;
    font-size: 18px;
    color: var(--color-main-text);
  }
  p {
    margin: 0;
    font-size: 14px;
    max-width: 380px;
  }
}

/* Transitions */
.toc-slide-enter-active,
.toc-slide-leave-active {
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
}
.toc-slide-enter-from,
.toc-slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

@media (max-width: 768px) {
  .book-navigation {
    flex-wrap: wrap;
    padding: 10px 14px;

    .book-location {
      order: 3;
      width: 100%;
      justify-content: flex-start;
      font-size: 13px;
    }
  }

  .book-page {
    padding: 20px 18px;
  }

  .book-toc {
    width: 100%;
  }

  .book-pagination {
    .page-btn .page-title {
      display: none;
    }
  }
}

@media (max-width: 480px) {
  .book-navigation .nav-btn span {
    display: none;
  }
}
</style>
