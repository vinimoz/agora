<!-- SPDX-FileCopyrightText: 2024 Nextcloud contributors -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<template>
  <NcModal size="large" :name="modalTitle" @close="$emit('close')">
    <div class="supports-modal">
      <div class="modal-header">
        <h3>{{ option?.title }}</h3>
        <p v-if="option?.text" class="option-text">{{ option.text }}</p>
      </div>

      <div v-if="loading" class="loading-state">
        <NcLoadingIcon :size="32" />
        <span>{{ t('agora', 'Loading supports...') }}</span>
      </div>

      <div v-else-if="supports.length === 0" class="empty-state">
        <Info :size="32" />
        <p>{{ t('agora', 'No votes yet for this option.') }}</p>
      </div>

      <div v-else class="supports-list">
        <div v-for="support in supports" :key="support.id" class="support-item">
          <div class="support-user">
            <NcAvatar :user="support.userId" :display-name="support.userId" :size="32" />
            <span class="user-name">{{ support.userId }}</span>
          </div>
          <div class="support-value">
            <strong>{{ formatSupportValue(support) }}</strong>
          </div>
          <div class="support-meta">
            <span class="engine-badge">{{ getEngineName(support.supportEngineId) }}</span>
            <span class="timestamp">{{ formatDate(support.created) }}</span>
          </div>
        </div>
      </div>
    </div>

    <template #actions>
      <NcButton @click="$emit('close')">
        {{ t('agora', 'Close') }}
      </NcButton>
    </template>
  </NcModal>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { t } from '@nextcloud/l10n'
import NcModal from '@nextcloud/vue/components/NcModal'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcLoadingIcon from '@nextcloud/vue/components/NcLoadingIcon'
import NcAvatar from '@nextcloud/vue/components/NcAvatar'
import { Info } from 'lucide-vue-next'
import { useSupportsStore } from '../../stores/supports'
import { useSupportEngineStore } from '../../stores/supportEngine'
import type { Support } from '../../stores/supports'

const props = defineProps<{
  optionId: number
  inquiryId: number
}>()

const emit = defineEmits<{
  close: []
}>()

const supportsStore = useSupportsStore()
const engineStore = useSupportEngineStore()

const supports = ref<Support[]>([])
const loading = ref(true)
const option = ref<any>(null)

const modalTitle = computed(() => t('agora', 'Votes for {option}', { option: option.value?.title || t('agora', 'Option') }))

function formatSupportValue(support: Support): string {
  const value = support.value
  if (typeof value === 'number') {
    if (value === 1) return `👍 ${  t('agora', 'Yes')}`
    if (value === -1) return `👎 ${  t('agora', 'No')}`
    if (value === 0) return `⚪ ${  t('agora', 'Abstain')}`
    return `${value}`
  }
  if (typeof value === 'string') {
    return value
  }
  if (Array.isArray(value)) {
    return value.join(', ')
  }
  return t('agora', 'Voted')
}

function getEngineName(engineId?: number): string {
  if (!engineId) return t('agora', 'Unknown')
  const engine = engineStore.getEngineById(engineId)
  return engine?.title || engine?.engine || t('agora', 'Voting method')
}

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString()
}

async function loadOption() {
  const { useOptionsStore } = await import('../../stores/options')
  const optionsStore = useOptionsStore()
  option.value = optionsStore.options.find(o => o.id === props.optionId)
}

async function loadSupports() {
  loading.value = true
  try {
    await supportsStore.loadSupports(props.inquiryId)
    supports.value = supportsStore.getOptionSupports(props.inquiryId, props.optionId)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await Promise.all([loadOption(), loadSupports()])
})
</script>

<style scoped lang="scss">
.supports-modal {
  padding: 0;
  max-width: 700px;

  .modal-header {
    padding: 24px;
    border-bottom: 1px solid var(--color-border);
    h3 { margin: 0 0 8px 0; }
    .option-text { margin: 0; color: var(--color-text-lighter); }
  }

  .loading-state, .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 48px;
    color: var(--color-text-lighter);
  }

  .supports-list {
    max-height: 500px;
    overflow-y: auto;
    padding: 16px;

    .support-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px;
      border-bottom: 1px solid var(--color-border);
      gap: 16px;
      flex-wrap: wrap;

      .support-user {
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 150px;
      }

      .support-value {
        flex: 1;
        font-size: 14px;
      }

      .support-meta {
        display: flex;
        gap: 12px;
        font-size: 11px;
        color: var(--color-text-lighter);
        
        .engine-badge {
          background: var(--color-background-dark);
          padding: 2px 8px;
          border-radius: 20px;
        }
      }
    }
  }
}
</style>
