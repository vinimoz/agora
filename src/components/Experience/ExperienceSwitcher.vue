<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div
    ref="containerRef"
    class="experience-selector"
  >
    <button
      type="button"
      class="experience-trigger"
      :aria-label="t('agora', 'Change experience')"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <component
        :is="currentIcon"
        :size="15"
        class="trigger-icon"
      />
      <span class="trigger-label">{{ currentLabel }}</span>
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        class="trigger-chevron"
        :class="{ 'is-open': isOpen }"
      >
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
      </svg>
    </button>

    <Transition name="experience-dropdown">
      <div
        v-if="isOpen"
        class="experience-menu"
        role="menu"
      >
        <button
          v-for="exp in allExperiences"
          :key="exp.key"
          type="button"
          role="menuitem"
          class="experience-option"
          :class="{ active: exp.key === currentExperience }"
          @click="select(exp.key)"
        >
          <component
            :is="getIcon(exp.icon)"
            :size="16"
            class="option-icon"
          />
          <span class="option-label">{{ exp.label }}</span>
          <svg
            v-if="exp.key === currentExperience"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            class="option-check"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { t } from '@nextcloud/l10n'
import { EXPERIENCE_DEFINITIONS, type ExperienceKey } from '../../composables/useExperience'
import { InquiryGeneralIcons as Icons } from '../../utils/icons'

const props = defineProps<{
  currentExperience: ExperienceKey
  availableExperiences: ExperienceKey[]
}>()

const emit = defineEmits<{
  change: [experience: ExperienceKey]
}>()

// Never offer the landing-page experience inside a group.
const HIDDEN = new Set<ExperienceKey>(['home'])

const allExperiences = computed(() =>
  props.availableExperiences
    .filter((key) => !HIDDEN.has(key))
    .map((key) => EXPERIENCE_DEFINITIONS[key])
    .filter(Boolean)
)

const currentDefinition = computed(
  () => EXPERIENCE_DEFINITIONS[props.currentExperience] ?? EXPERIENCE_DEFINITIONS.dashboard
)

const currentLabel = computed(() => currentDefinition.value?.label ?? props.currentExperience)
const currentIcon = computed(() => getIcon(currentDefinition.value?.icon ?? 'Home'))

function getIcon(iconName: string) {
  return (Icons as Record<string, unknown>)[iconName] ?? Icons.Home
}

const isOpen = ref(false)
const containerRef = ref<HTMLElement | null>(null)

function select(key: ExperienceKey) {
  isOpen.value = false
  if (key === props.currentExperience) return
  emit('change', key)
}

function handleClickOutside(e: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<style lang="scss" scoped>
.experience-selector {
  position: relative;
  display: inline-flex;
}

.experience-trigger {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 11px;
  background: var(--color-main-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-main-text);
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    background: var(--color-background-hover);
    border-color: var(--color-primary-element);
  }

  .trigger-icon {
    flex-shrink: 0;
    opacity: 0.8;
  }

  .trigger-label {
    white-space: nowrap;
  }

  .trigger-chevron {
    fill: currentColor;
    opacity: 0.6;
    transition: transform 0.18s ease;

    &.is-open {
      transform: rotate(180deg);
    }
  }
}

.experience-selector {
  position: relative;
  display: inline-flex;
}

.experience-menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 3000;
  min-width: 200px;
  padding: 4px;
  background: var(--color-main-background);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.14);
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.experience-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border: none;
  border-radius: 7px;
  background: transparent;
  color: var(--color-main-text);
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  transition: background 0.12s ease;

  &:hover {
    background: var(--color-background-hover);
  }

  &.active {
    background: var(--color-primary-light);
    color: var(--color-primary-element);
    font-weight: 600;
  }

  .option-icon {
    flex-shrink: 0;
    opacity: 0.85;
  }

  .option-label {
    flex: 1;
  }

  .option-check {
    fill: currentColor;
    flex-shrink: 0;
  }
}

.experience-dropdown-enter-active,
.experience-dropdown-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.experience-dropdown-enter-from,
.experience-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
