<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { Spinner } from '../../AppIcons/index.ts'
import { onMounted, ref, watch } from 'vue'

const {
  show = false,
  name = t('agora', 'Loading'),
  loadingTexts = '',
  teleportTo = '',            // no implicit '#content-vue'
} = defineProps<{
  show: boolean
  name: string
  loadingTexts?: string | string[]
  teleportTo?: string
}>()

// ✅ top-level ref → visible to the template
const description = ref(t('agora', 'Please wait'))

// null = don't teleport; string/HTMLElement = resolved target
const resolvedTarget = ref<string | HTMLElement | null>(null)

function resolveTarget() {
  resolvedTarget.value = teleportTo
    ? document.querySelector(teleportTo)
    : null
}

const sequentialDescriptionOutput = () => {
  // primitive string check
  if (typeof loadingTexts === 'string') {
    description.value = loadingTexts
    return
  }

  if (loadingTexts.length === 0) {
    description.value = ''
    return
  }

  if (loadingTexts.length === 1) {
    description.value = loadingTexts[0]
    return
  }

  let index = 0
  const showDescription = () => {
    if (show === false) return
    if (index < loadingTexts.length) {
      description.value = loadingTexts[index]
      index++
      const delay = 1500 + Math.floor(Math.random() * 1001) - 500
      setTimeout(showDescription, delay)
    } else {
      description.value = loadingTexts[loadingTexts.length - 1]
    }
  }
  showDescription()
}

watch(
  () => show,
  (newValue) => {
    if (newValue === true) {
      resolveTarget()
      if (loadingTexts.length > 0) sequentialDescriptionOutput()
    }
  }
)

onMounted(() => {
  resolveTarget()
  if (show) sequentialDescriptionOutput()
})
</script>

<template>
  <!-- Teleport only when a real target is available -->
  <Teleport v-if="resolvedTarget" :to="resolvedTarget">
    <div v-show="show" class="loading-overlay">
      <div class="loading-overlay__inner">
        <Spinner class="loading-overlay__spinner" :size="70" />
        <span class="loading-overlay__name">{{ name }}</span>
        <p class="loading-overlay__description">{{ description }}</p>
      </div>
    </div>
  </Teleport>

  <!-- Fallback: render in place if no valid target -->
  <div v-else v-show="show" class="loading-overlay">
    <div class="loading-overlay__inner">
      <Spinner class="loading-overlay__spinner" :size="70" />
      <span class="loading-overlay__name">{{ name }}</span>
      <p class="loading-overlay__description">{{ description }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.loading-overlay {
  position: absolute;
  inset-inline-start: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: var(--color-main-background);
  opacity: 0.9;
  z-index: 9999;

  .loading-overlay__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .loading-overlay__name {
    margin-bottom: 10px;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    line-height: 30px;
  }

  .loading-overlay__description {
    color: var(--color-text-maxcontrast);
    text-align: center;
    text-wrap-style: balance;
  }

  .loading-overlay__spinner {
    inset-inline-start: 50%;
  }
}
</style>
