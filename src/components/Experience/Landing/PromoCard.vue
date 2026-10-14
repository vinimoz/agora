<template>
  <section class="promo-card">
    <div
      v-if="resolvedImage"
      class="promo-illustration"
      :style="{ backgroundImage: `url('${resolvedImage}')` }"
    />
    <div v-else class="promo-illustration promo-illustration--empty" />

    <div class="promo-body">
      <h3 class="promo-title">{{ title }}</h3>
      <p class="promo-text">{{ text }}</p>
      <button class="promo-button" @click="emit('action')">{{ cta }}</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import { generateUrl } from '@nextcloud/router'

const props = withDefaults(
  defineProps<{
    title?: string
    text?: string
    cta?: string
    imageUrl?: string
  }>(),
  {
    title: () => t('agora', 'Together, let’s build tomorrow'),
    text: () => t('agora', 'Participate in the life of your community!'),
    cta: () => t('agora', 'Discover'),
    imageUrl: '',
  },
)

const emit = defineEmits<{ action: [] }>()

/**
 * Accepts:
 *  - full URL / data: / blob:      → as-is
 *  - numeric Nextcloud file id     → preview endpoint
 *  - relative path                 → resolved against the Nextcloud root
 */
function resolveImage(src?: string): string {
  const s = String(src ?? '').trim()
  if (!s) return ''
  if (/^(https?:)?\/\//i.test(s) || /^(data|blob):/i.test(s)) return s
  if (/^\d+$/.test(s)) {
    return generateUrl(`/core/preview?fileId=${s}&x=800&y=800&a=1`)
  }
  return s.startsWith('/') ? s : generateUrl(`/${s}`)
}

const resolvedImage = computed(() => resolveImage(props.imageUrl))
</script>

<style lang="scss" scoped>
.promo-card {
  display: flex;
  background: linear-gradient(135deg, #0891b2, #0e7490);
  color: white;
  border-radius: 14px;
  overflow: hidden;
  position: relative;

  .promo-illustration {
    flex: 0 0 40%;
    min-height: 140px;               /* stop the collapse */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: rgba(0, 0, 0, 0.12);

    &--empty {
      background-image: linear-gradient(135deg, rgba(255,255,255,.12), rgba(0,0,0,.18));
    }
  }

  .promo-body {
    flex: 1;
    min-width: 0;
    padding: 20px 22px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
  }

  .promo-title { margin: 0; font-size: 18px; font-weight: 700; line-height: 1.25; }
  .promo-text  { margin: 0; font-size: 13px; opacity: .9; }

  .promo-button {
    margin-top: 8px;
    padding: 9px 18px;
    border: none;
    border-radius: 10px;
    background: white;
    color: #0e7490;
    font-weight: 700;
    font-size: 13px;
    cursor: pointer;
    align-self: flex-start;
    transition: transform .15s ease, box-shadow .15s ease;

    &:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,.25); }
  }

  @media (max-width: 480px) {
    flex-direction: column;
    .promo-illustration { flex: 0 0 150px; width: 100%; }
  }
}
</style>
