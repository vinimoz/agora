<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { t } from '@nextcloud/l10n'
import { ThumbIcon } from '../AppIcons'
import UserItem from '../User/UserItem.vue'

import { Share } from '../../stores/shares.ts'
import ShareMenu from './ShareMenu.vue'

const emit = defineEmits(['showQrCode'])

const { share } = defineProps<{ share: Share }>()

const label = ref({
  inputValue: '',
  inputProps: {
    success: false,
    error: false,
    showTrailingButton: true,
    labelOutside: false,
    label: t('agora', 'Share label'),
  },
})

const userItemProps = computed(() => ({
  user: share.user,
  label: share.label,
  showEmail: true,
  resolveInfo: true,
  forcedDescription: share.deleted ? `(${t('agora', 'deleted')})` : null,
  showTypeIcon: true,
  icon: true,
}))

onMounted(() => {
  label.value.inputValue = share.label
})
</script>

<template>
  <div :class="{ deleted: share.deleted }">
    <UserItem
      v-bind="userItemProps"
      :delegated-from-group="!share.inquiryId"
      :deleted-state="share.deleted"
      :locked-state="share.locked"
    >
      <template #status>
        <div v-if="share.supported">
          <ThumbIcon
            :supported="true"
            class="support-status supported"
            :name="t('agora', 'Has been supported')"
          />
        </div>
        <div v-else-if="share.groupId || ['public', 'group'].includes(share.type)">
          <div class="support-status empty" />
        </div>
        <div v-else>
          <ThumbIcon
            :supported="false"
            class="support-status unsupported"
            :name="t('agora', 'Has not supported')"
          />
        </div>
      </template>

      <ShareMenu :share="share" @show-qr-code="emit('showQrCode')" />
    </UserItem>
  </div>
</template>

<style lang="scss">
.deleted .user-item .description {
  color: var(--color-error-text);
}

.support-status {
  margin-inline-start: 8px;
  width: 32px;

  &.supported {
    color: var(--color-inquiries-foreground-yes);
  }

  &.unsupported {
    color: var(--color-inquiries-foreground-no);
  }
}
</style>
