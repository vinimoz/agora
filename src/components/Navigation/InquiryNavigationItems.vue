<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { t } from '@nextcloud/l10n';

import NcActionButton from '@nextcloud/vue/components/NcActionButton';
import NcAppNavigationItem from '@nextcloud/vue/components/NcAppNavigationItem';
import { InquiryTypesUI } from '../../helpers/modules/InquiryHelper.ts';

import InquiryItemActions from '../Inquiry/InquiryItemActions.vue';

import { useSessionStore } from '../../stores/session.ts';
import { Inquiry } from '../../Types/index.ts';

const emit = defineEmits(['cloneInquiry', 'toggleArchive', 'deleteInquiry']);
const { inquiry } = defineProps<{ inquiry: Inquiry }>();

const sessionStore = useSessionStore();
</script>

<template>
  <NcAppNavigationItem
    :name="inquiry.title"
    :to="
      inquiry.permissions.view
        ? { name: 'inquiry', params: { id: inquiry.id } }
        : null
    "
    :class="{ closed: inquiry.status.isExpired }"
  >
    <template #icon>
      <div class="type-icon">
        <component :is="InquiryTypesUI[inquiry.type].icon" />
      </div>
    </template>

    <template v-if="sessionStore.currentUser.isOwner || sessionStore.currentUser.isAdmin">
      <InquiryItemActions
        :key="`actions-${inquiry.id}`"
        :inquiry="inquiry"
  style="display: inline-block; position: relative;"
      />
    </template>
  </NcAppNavigationItem>
</template>
