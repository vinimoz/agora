<!-- vote-inputs/VoteInputApproval.vue -->
<template>
  <div class="vote-input-approval">
    <label class="approval-checkbox">
      <input
        type="checkbox"
        :checked="isSelected"
        @change="handleToggle"
      />
      <span class="checkmark"></span>
      <span class="label-text">{{ t('agora', 'Approve') }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import type { SupportData } from '../../Types/index'

const props = defineProps<{
  engineConfig: Record<string, unknown>
  option: any
  userVote?: SupportData
  isSelected?: boolean
}>()

const emit = defineEmits<{
  toggle: []
}>()

function handleToggle() {
  emit('toggle')
}
</script>

<style scoped lang="scss">
.vote-input-approval {
  .approval-checkbox {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    user-select: none;

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    .checkmark {
      position: relative;
      height: 18px;
      width: 18px;
      background-color: var(--color-background-dark);
      border: 2px solid var(--color-border);
      border-radius: 4px;
      transition: all 0.2s ease;
    }

    input:checked ~ .checkmark {
      background-color: var(--color-primary-element);
      border-color: var(--color-primary-element);
    }

    input:checked ~ .checkmark:after {
      content: '';
      position: absolute;
      left: 5px;
      top: 2px;
      width: 4px;
      height: 8px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }

    .label-text {
      font-size: 12px;
      font-weight: 500;
      color: var(--color-text-light);
    }

    &:hover .checkmark {
      border-color: var(--color-primary-element);
    }
  }
}
</style>
