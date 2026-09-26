<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div ref="group" class="vote-input-majority" role="group" :aria-label="option.title">
    <NcButton
      v-for="choice in grades"
      :key="choice"
      size="large"
      :pressed="choice === grade"
      :disabled="disabled"
      @click="emit('changeGrade', choice === grade ? null : choice)"
    >
      <template v-if="choice === grade" #icon>
        <CheckIcon :size="20" />
      </template>
      {{ translateGrade(choice) }}
    </NcButton>
  </div>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import NcButton from '@nextcloud/vue/components/NcButton'
import CheckIcon from 'vue-material-design-icons/Check.vue'
import { translateGrade } from '../../../../Types/votingType'
import type { Option } from '../../../../Types/index'

const props = defineProps<{
  option: Option
  engineConfig: Record<string, unknown>
  grade?: string | null
  disabled?: boolean
}>()

const emit = defineEmits<{
  'changeGrade': [grade: string | null]
}>()

const grades = computed(() => {
  const g = props.engineConfig.grades as string[]
  return g || ['Reject', 'Poor', 'Fair', 'Good', 'Excellent']
})

// A label wraps between words, so a button only needs room for its
// longest word, measured in pixels in the font of the button labels.
const group = useTemplateRef<HTMLElement>('group')
const longestWord = computed(() => {
  const label = group.value?.querySelector('.button-vue__text')
  const context = document.createElement('canvas').getContext('2d')
  if (!label || !context) {
    return 0
  }
  const style = getComputedStyle(label)
  context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
  return Math.max(...grades.value.flatMap((g) => translateGrade(g).split(/\s+/)).map((w) => context.measureText(w).width))
})

// Buttons per row in the grid step: two for an even count, otherwise the
// whole count so that the step never leaves one button alone on a row.
const perRow = computed(() => (grades.value.length % 2 ? grades.value.length : 2))
</script>

<style scoped lang="scss">
$gap: 8px;
// Borders, inline paddings and check mark box of a pressed large NcButton
// (@nextcloud/vue 9.6.0), plus 1px of safety.
$button-extra: calc(2px + 2 * var(--default-grid-baseline) + var(--border-radius-element) + var(--clickable-area-large) - 4px + 1px);

.vote-input-majority {
  // Width of a button holding the longest word and the check mark.
  --button-width: calc(v-bind(longestWord) * 1px + #{$button-extra});
  // Width of one row holding every button, then of a row of the grid step.
  --row-width: calc(v-bind('grades.length') * var(--button-width) + (v-bind('grades.length') - 1) * #{$gap});
  --pair-width: calc(v-bind(perRow) * var(--button-width) + (v-bind(perRow) - 1) * #{$gap});
  display: flex;
  flex: 1 1 100%;
  flex-wrap: wrap;
  gap: $gap;

  // All grades share one row in equal widths when it is wide enough,
  // otherwise two per row in equal widths (40% leaves room for two, not
  // three), otherwise the basis overflows and every button takes a full row.
  // The basis never falls below the button width, so that the pressed
  // button, whose paddings are smaller, still gets an equal share.
  > .button-vue {
    flex: 1 1 clamp(var(--button-width), (var(--row-width) - 100%) * 999, max(40%, (var(--pair-width) - 100%) * 999));
  }

  // Never truncate a grade: NcButton ends its label with an ellipsis.
  :deep(.button-vue__text) {
    overflow: visible;
    white-space: normal;
    overflow-wrap: anywhere;
  }
}
</style>
