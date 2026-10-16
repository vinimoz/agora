<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <div class="experience-switcher">
    <NcCheckboxRadioSwitch
      v-for="exp in availableExperiencesList"
      :key="exp.key"
      v-model="selected"
      :value="exp.key"
      :name="'experience-switcher'"
      type="radio"
      :button-variant="true"
      button-variant-grouped="horizontal"
      @update:model-value="onChange"
    >
      <template #icon>
        <component :is="getIcon(exp.icon)" :size="20" />
      </template>
      {{ exp.label }}
    </NcCheckboxRadioSwitch>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import {
  EXPERIENCE_DEFINITIONS,
  type ExperienceKey,
} from '../../composables/useExperience'
import { InquiryGeneralIcons as Icons } from '../../utils/icons'

const props = defineProps<{
  currentExperience: ExperienceKey
  availableExperiences: ExperienceKey[]
}>()

const emit = defineEmits<{
  change: [experience: ExperienceKey]
}>()

// Never show container-level experiences in a per-group switcher
const HIDDEN = new Set<ExperienceKey>(['home'])

const availableExperiencesList = computed(() =>
  props.availableExperiences
    .filter((key) => !HIDDEN.has(key))
    .map((key) => EXPERIENCE_DEFINITIONS[key])
    .filter(Boolean),
)

// Local writable proxy – NcCheckboxRadioSwitch needs a v-model
const selected = computed<ExperienceKey>({
  get: () => props.currentExperience,
  set: (val) => emit('change', val),
})

function getIcon(iconName: string) {
  return Icons[iconName] ?? Icons.Home
}

function onChange(val: ExperienceKey) {
  if (val === props.currentExperience) return
  emit('change', val)
}
</script>

<style lang="scss" scoped>
.experience-switcher {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;

  // Optional: horizontal scroll on narrow screens instead of wrap
  @media (max-width: 768px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    scrollbar-width: thin;
  }
}
</style>
