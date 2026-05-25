<template>
  <div class="vote-input-binary">
    <NcButton
      v-for="option in binaryOptions"
      :key="option.value"
      :type="isSelected(option.value) ? 'primary' : 'tertiary'"
      size="small"
      @click="vote(option.value)"
    >
      <template #icon>
        <component :is="option.icon" :size="14" />
      </template>
      {{ option.label }}
    </NcButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import { ThumbsUp, ThumbsDown } from 'lucide-vue-next'
import type { SupportData, SupportValue } from '../../Types/index'

const props = defineProps<{
  engineConfig: Record<string, unknown>
  option: any
  userVote?: SupportData
}>()

const emit = defineEmits<{
  vote: [value: SupportValue]
}>()

const binaryOptions = [
  { value: 1, label: t('agora', 'Yes'), icon: ThumbsUp },
  { value: -1, label: t('agora', 'No'), icon: ThumbsDown },
]

const currentValue = computed(() => {
  if (!props.userVote) return null
  const raw = props.userVote.value
  if (typeof raw === 'number') return raw
  if (typeof raw === 'string') return Number(raw)
  return null
})

function isSelected(value: number) {
  return currentValue.value === value
}

function vote(value: number) {
  emit('vote', value)
}
</script>

<style scoped lang="scss">
.vote-input-binary {
  display: flex;
  gap: 6px;
  align-items: center;
}
</style>
