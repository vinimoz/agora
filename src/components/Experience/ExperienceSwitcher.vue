<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="experience-switcher">
    <button
      class="switcher-trigger"
      :aria-expanded="isOpen"
      :title="t('agora', 'Switch experience')"
      @click="isOpen = !isOpen"
    >
      <component :is="getIcon(currentDefinition.icon)" :size="20" class="trigger-icon" />
      <span class="trigger-label">{{ currentDefinition.label }}</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        class="trigger-chevron"
        :class="{ rotated: isOpen }"
      >
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
      </svg>
    </button>

    <Transition name="dropdown">
      <div v-if="isOpen" class="switcher-dropdown" @click.stop>
        <div class="dropdown-header">
          <h4>{{ t('agora', 'Switch Experience') }}</h4>
          <p class="dropdown-hint">{{ t('agora', 'Change how you view this content') }}</p>
        </div>

        <div class="dropdown-experiences">
          <div
            v-for="exp in availableExperiencesList"
            :key="exp.key"
            class="experience-option"
            :class="{ active: exp.key === currentExperience }"
            @click="selectExperience(exp.key)"
          >
            <div class="option-icon" :class="{ active: exp.key === currentExperience }">
              <component :is="getIcon(exp.icon)" :size="18" />
            </div>
            <div class="option-content">
              <div class="option-label">{{ exp.label }}</div>
              <div class="option-verb">{{ exp.verb }}</div>
              <div class="option-description">{{ exp.description }}</div>
            </div>
            <div v-if="exp.key === currentExperience" class="option-check">
              <component :is="Icons.Check" :size="16" />
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <div v-if="isOpen" class="switcher-overlay" @click="isOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
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

const isOpen = ref(false)

const currentDefinition = computed(() => 
  EXPERIENCE_DEFINITIONS[props.currentExperience] || EXPERIENCE_DEFINITIONS.dashboard
)

const availableExperiencesList = computed(() =>
  props.availableExperiences
    .map(key => EXPERIENCE_DEFINITIONS[key])
    .filter(Boolean)
)

function getIcon(iconName: string) {
  return Icons[iconName] || Icons.Home
}

function selectExperience(key: ExperienceKey) {
  emit('change', key)
  isOpen.value = false
}
</script>

<style lang="scss" scoped>
.experience-switcher {
  position: relative;
  z-index: 100;
}

.switcher-trigger {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  background: var(--color-main-background);
  border: 2px solid var(--color-border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 44px;
  font-family: inherit;

  &:hover {
    border-color: var(--color-primary-element);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }

  .trigger-icon {
    color: var(--color-primary-element);
    flex-shrink: 0;
  }

  .trigger-label {
    font-weight: 600;
    font-size: 15px;
    color: var(--color-main-text);
    white-space: nowrap;
  }

  .trigger-chevron {
    transition: transform 0.3s ease;
    fill: var(--color-text-lighter);
    flex-shrink: 0;

    &.rotated {
      transform: rotate(180deg);
    }
  }
}

.switcher-dropdown {
  position: absolute;
  top: calc(100% + 12px);
  left: 0;
  min-width: 340px;
  max-width: 420px;
  background: var(--color-main-background);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
  padding: 20px;
  max-height: 520px;
  overflow-y: auto;
  animation: slideDown 0.3s ease;

  .dropdown-header {
    padding-bottom: 16px;
    border-bottom: 2px solid var(--color-border);

    h4 {
      margin: 0 0 4px 0;
      font-size: 18px;
      font-weight: 700;
      color: var(--color-main-text);
    }

    .dropdown-hint {
      margin: 0;
      font-size: 13px;
      color: var(--color-text-lighter);
    }
  }

  .dropdown-experiences {
    padding: 12px 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .experience-option {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 14px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: var(--color-background-hover);
    }

    &.active {
      background: var(--color-primary-light);
      border: 1px solid var(--color-primary-element);
      padding: 11px 13px;
    }

    .option-icon {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-background-dark);
      color: var(--color-text-lighter);
      transition: all 0.2s ease;

      &.active {
        background: var(--color-primary-element);
        color: white;
      }
    }

    .option-content {
      flex: 1;
      min-width: 0;

      .option-label {
        font-size: 15px;
        font-weight: 600;
        color: var(--color-main-text);
      }

      .option-verb {
        font-size: 12px;
        font-weight: 500;
        color: var(--color-primary-element);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .option-description {
        font-size: 13px;
        color: var(--color-text-lighter);
        margin-top: 2px;
      }
    }

    .option-check {
      flex-shrink: 0;
      color: var(--color-primary-element);
    }
  }
}

.switcher-overlay {
  position: fixed;
  inset: 0;
  z-index: -1;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-enter-active {
  animation: slideDown 0.3s ease;
}

.dropdown-leave-active {
  animation: slideDown 0.2s ease reverse;
}

@media (max-width: 768px) {
  .switcher-trigger {
    padding: 8px 14px;
    min-height: 38px;

    .trigger-label {
      font-size: 13px;
    }
  }

  .switcher-dropdown {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 0;
    width: calc(100% - 32px);
    max-width: 400px;
    max-height: 70vh;
    animation: slideUp 0.3s ease;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
</style>
