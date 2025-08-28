<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed, ref } from 'vue';
import { router } from '../../router.ts';

import { NcActionInput  } from '@nextcloud/vue';
import { showError, showInfo } from '@nextcloud/dialogs';
import { t } from '@nextcloud/l10n';
import { InquiryGeneralIcons } from '../../utils/icons.ts';

import NcActions from '@nextcloud/vue/components/NcActions';
import NcActionButton from '@nextcloud/vue/components/NcActionButton';

import { useInquiriesStore } from '../../stores/inquiries.ts';
import { useInquiryGroupsStore } from '../../stores/inquiryGroups.ts';
import { useSessionStore } from '../../stores/session.ts';
import { Inquiry } from '../../stores/inquiry.ts';

import DeleteInquiryDialog from '../Modals/DeleteInquiryDialog.vue';
import TransferInquiryDialog from '../Modals/TransferInquiryDialog.vue';

import { useRoute } from 'vue-router';

const { inquiry } = defineProps<{ inquiry: Inquiry }>();

const route = useRoute();

const inquiriesStore = useInquiriesStore();
const inquiryGroupsStore = useInquiryGroupsStore();
const sessionStore = useSessionStore();

const adminAccess = computed(
  () => !inquiry.permissions.view && sessionStore.currentUser.isAdmin
);

const showDeleteDialog = ref(false);
const showTransferDialog = ref(false);
const subMenu = ref<'addToGroup' | 'removeFromGroup' | null>(null);

const newGroupTitle = ref('');

async function toggleSubMenu(
  action: 'addToGroup' | 'removeFromGroup' | null = null
) {
  subMenu.value = subMenu.value === action ? null : action;
}

async function removeInquiryFromGroup(
  inquiryId: number,
  inquiryGroupId: number
) {
  subMenu.value = null;
  try {
    await inquiryGroupsStore.removeInquiryFromGroup({
      inquiryId,
      inquiryGroupId
    });
    if (!inquiryGroupsStore.currentInquiryGroup) {
      showInfo(
        t('agora', 'The inquiry group was deleted by removing the last member.')
      );
      if (route.name === 'group') {
        router.push({ name: 'root' });
      }
    }
  } catch {
    showError(t('agora', 'Error removing inquiry from group.'));
  }
}

async function addInquiryToInquiryGroup(
  inquiryId: number,
  inquiryGroupId: number
) {
  subMenu.value = null;
  inquiryGroupsStore.addInquiryToInquiryGroup({
    inquiryId,
    inquiryGroupId
  });
}

async function addInquiryToNewInquiryGroup(inquiryId: number) {
  if (!newGroupTitle.value.trim()) {
    return;
  }

  try {
    await inquiryGroupsStore.addInquiryToInquiryGroup({
      inquiryId,
      groupTitle: newGroupTitle.value.trim()
    });
    newGroupTitle.value = '';
    subMenu.value = null;
  } catch {
    showError(t('agora', 'Error creating new inquiry group.'));
  }
}

async function toggleArchive() {
  try {
    await inquiriesStore.toggleArchive({ inquiryId: inquiry.id });
  } catch {
    showError(t('agora', 'Error archiving/restoring inquiry.'));
  }
}
/*
async function takeOverInquiry(): Promise<void> {
  if (!sessionStore.currentUser.isAdmin) {
    return;
  }

  try {
    await inquiriesStore.takeOver({ inquiryId: inquiry.id });
  } catch {
    showError(t('agora', 'Error taking over inquiry.'));
  }*
}*/

</script>

<template>
  <NcActions force-menu>
    <template v-if="subMenu">
      <NcActionButton
        :aria-label="t('agora', 'Back')"
        :name="t('agora', 'Back')"
        @click="subMenu = null"
      >
        <template #icon>
          <component :is="InquiryGeneralIcons.back" :size="16" />
        </template>
      </NcActionButton>
    </template>

    <template v-else>
      <NcActionButton
        v-show="
          (adminAccess || inquiry.permissions.edit) &&
            !inquiry.status.isArchived
        "
        :name="t('agora', 'Archive inquiry')"
        :aria-label="t('agora', 'Archive inquiry')"
        close-after-click
        @click="toggleArchive()"
      >
        <template #icon>
          <component :is="InquiryGeneralIcons.archive" :size="24" />
        </template>
      </NcActionButton>

      <NcActionButton
        v-show="
          (adminAccess || inquiry.permissions.edit) && inquiry.status.isArchived
        "
        :name="t('agora', 'Restore inquiry')"
        :aria-label="t('agora', 'Restore inquiry')"
        close-after-click
        @click="toggleArchive()"
      >
        <template #icon>
          <component :is="InquiryGeneralIcons.restore" :size="24" />
        </template>
      </NcActionButton>

      <NcActionButton
        v-show="adminAccess || inquiry.permissions.edit"
        class="danger"
        :name="t('agora', 'Delete inquiry')"
        :aria-label="t('agora', 'Delete inquiry')"
        close-after-click
        @click="showDeleteDialog = true"
      >
        <template #icon>
          <component :is="InquiryGeneralIcons.delete" :size="24" />
        </template>
      </NcActionButton>

      <NcActionButton
        v-show="adminAccess || inquiry.permissions.edit"
        class="danger"
        :name="t('agora', 'Transfer inquiry ownership')"
        :aria-label="t('agora', 'Transfer inquiry ownership')"
        close-after-click
        @click="showTransferDialog = true"
      >
        <template #icon>
          <component :is="InquiryGeneralIcons.transfer" :size="24" />
        </template>
      </NcActionButton>

      <NcActionButton
        v-show="inquiry.permissions.edit"
        is-menu
        name="Add to group"
        @click="toggleSubMenu('addToGroup')"
      >
        <template #icon>
          <component :is="InquiryGeneralIcons.plus" :size="16" />
        </template>
      </NcActionButton>

      <NcActionButton
        v-show="inquiry.permissions.edit && inquiry.inquiryGroups.length > 0"
        is-menu
        name="Remove from group"
        @click="toggleSubMenu('removeFromGroup')"
      >
        <template #icon>
          <component :is="InquiryGeneralIcons.minus" :size="16" />
        </template>
      </NcActionButton>
    </template>

    <template v-if="subMenu === 'addToGroup'">
      <NcActionButton
        v-for="inquiryGroup in inquiryGroupsStore.addableInquiryGroups(
          inquiry.id
        )"
        :key="`add-${inquiryGroup.id}`"
        :name="inquiryGroup.name"
        @click="addInquiryToInquiryGroup(inquiry.id, inquiryGroup.id)"
      />
      <NcActionInput
        v-if="sessionStore.appPermissions.inquiryCreation"
        v-model="newGroupTitle"
        :name="t('agora', 'Create new group')"
        :aria-label="t('agora', 'Create new group')"
        :placeholder="t('agora', 'New group name')"
        @submit="addInquiryToNewInquiryGroup(inquiry.id)"
      />
    </template>

    <template v-if="subMenu === 'removeFromGroup'">
      <NcActionButton
        v-for="inquiryGroupId in inquiry.inquiryGroups"
        :key="`remove-${inquiryGroupId}`"
        :name="inquiryGroupsStore.getInquiryGroupName(inquiryGroupId)"
        @click="removeInquiryFromGroup(inquiry.id, inquiryGroupId)"
      />
    </template>
  </NcActions>

  <TransferInquiryDialog
    v-model="showTransferDialog"
    :inquiry="inquiry"
    @close="showTransferDialog = false"
  />

  <DeleteInquiryDialog
    v-model="showDeleteDialog"
    :inquiry="inquiry"
    @close="showDeleteDialog = false"
  />
</template>
