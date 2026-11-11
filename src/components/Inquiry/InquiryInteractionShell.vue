/** * SPDX-FileCopyrightText: 2026 Nextcloud contributors *
SPDX-License-Identifier: AGPL-3.0-or-later */

<template>
  <NcAppSidebar
    v-if="target === 'panel' && isOpen"
    :name="inquiry?.title || t('agora', 'Inquiry')"
    @close="close"
  >
    <InquiryModalBody
      :inquiry="inquiry"
      :mode="mode"
    />
    <template #actions>
      <NcButton
        v-if="mode === 'view' && canEdit"
        @click="mode = 'edit'"
      >
        {{ t("agora", "Edit") }}
      </NcButton>
      <NcButton
        v-else-if="mode === 'edit'"
        @click="mode = 'view'"
      >
        {{ t("agora", "Back to summary") }}
      </NcButton>
    </template>
  </NcAppSidebar>

  <NcDialog
    v-else-if="(target === 'dialog' || target === 'modal') && isOpen"
    :name="inquiry?.title || t('agora', 'Inquiry')"
    size="large"
    @closing="close"
  >
    <InquiryModalBody
      :inquiry="inquiry"
      :mode="mode"
    />

    <template #actions>
      <NcButton
        v-if="mode === 'view' && canEdit"
        @click="mode = 'edit'"
      >
        {{ t("agora", "Edit") }}
      </NcButton>
      <NcButton
        v-else-if="mode === 'edit'"
        @click="mode = 'view'"
      >
        {{ t("agora", "Back to summary") }}
      </NcButton>
      <NcButton
        type="primary"
        @click="close"
      >
        {{ t("agora", "Done") }}
      </NcButton>
    </template>
  </NcDialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { t } from "@nextcloud/l10n";
import NcAppSidebar from "@nextcloud/vue/components/NcAppSidebar";
import NcDialog from "@nextcloud/vue/components/NcDialog";
import NcButton from "@nextcloud/vue/components/NcButton";
import InquiryModalBody from "./InquiryModalBody.vue";
import type { Inquiry } from "../../Types/index.ts";

const isOpen = ref(false);
const target = ref<"panel" | "dialog" | "modal">("dialog");
const inquiry = ref<Inquiry | null>(null);
const mode = ref<"view" | "edit">("view");

// "Can this user edit?" is a prop of the inquiry itself
// (currentUserStatus / permissions are on the object — no store needed).
const canEdit = computed(() => {
  const s = (inquiry.value as any)?.currentUserStatus;
  return !!(s?.isOwner || s?.isEditor || s?.isAdmin);
});

function open(payload: {
  inquiry: Inquiry;
  target: "panel" | "dialog" | "modal";
}) {
  if (!payload?.inquiry) return;
  inquiry.value = payload.inquiry;
  target.value = payload.target;
  mode.value = "view";
  isOpen.value = true;
}

function close() {
  isOpen.value = false;
  inquiry.value = null;
}

defineExpose({ open, close });
</script>
