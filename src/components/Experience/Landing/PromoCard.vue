<template>
  <section class="promo-card">
    <div class="promo-illustration" :style="{ backgroundImage: `url(${imageUrl})` }" />
    <div class="promo-body">
      <h3 class="promo-title">{{ title }}</h3>
      <p class="promo-text">{{ text }}</p>
      <button class="promo-button" @click="emit('action')">{{ cta }}</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { t } from '@nextcloud/l10n'

withDefaults(
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
</script>

<style lang="scss" scoped>
.promo-card {
  display: flex;
  gap: 16px;
  background: linear-gradient(135deg, #0891b2, #0e7490);
  color: white;
  border-radius: 14px;
  overflow: hidden;
  position: relative;

  .promo-illustration {
    flex: 0 0 40%;
    background-size: cover;
    background-position: center;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .promo-body {
    flex: 1;
    padding: 20px 22px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
  }

  .promo-title {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.25;
  }

  .promo-text {
    margin: 0;
    font-size: 13px;
    opacity: 0.9;
  }

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
    transition: transform 0.15s ease, box-shadow 0.15s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
    }
  }
}
</style>
