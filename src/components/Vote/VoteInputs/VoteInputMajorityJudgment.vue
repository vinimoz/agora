<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div class="vote-input-majority">
    <select v-model="localGrade" class="grade-select" @change="handleChange">
      <option :value="null">{{ t('agora', 'No grade') }}</option>
      <option v-for="(grade, index) in grades" :key="index" :value="grade">
        {{ grade }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'

const props = defineProps<{
  engineConfig: Record<string, unknown>
  gradeb?: string | null
}>()

const emit = defineEmits<{
  'changeGrade': [grade: string | null]
}>()

const grades = computed(() => {
  const g = props.engineConfig.grades as string[]
  return g || ['Reject', 'Poor', 'Fair', 'Good', 'Excellent']
})

const localGrade = computed({
  get: () => props.gradeb ?? null,
  set: (value) => {
    emit('changeGrade', value)
  }
})

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  const value = target.value === 'null' ? null : target.value
  emit('changeGrade', value)
}
</script>

<style scoped lang="scss">
.vote-input-majority {
  .grade-select {
    padding: 4px 8px;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    background: var(--color-main-background);
    font-size: 12px;
    cursor: pointer;
    max-width: 120px;
    transition: all 0.2s ease;

    &:hover {
      border-color: var(--color-primary-element);
    }

    &:focus {
      outline: none;
      border-color: var(--color-primary-element);
      box-shadow: 0 0 0 2px rgba(var(--color-primary-element-rgb), 0.1);
    }
  }
}
</style>
