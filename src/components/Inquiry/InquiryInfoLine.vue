<!--
	- SPDX-FileCopyrightText: 2018 Nextcloud contributors
	- SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed, ref } from 'vue';
import moment from '@nextcloud/moment';
import { t } from '@nextcloud/l10n';

import { useInquiryStore } from '../../stores/inquiry.ts';
import { useSharesStore } from '../../stores/shares.ts';
import { useSessionStore } from '../../stores/session.ts';
import { showSuccess } from '@nextcloud/dialogs';
import NcUserBubble from '@nextcloud/vue/components/NcUserBubble';
import { StatusIcons, InquiryGeneralIcons } from '../../utils/icons.ts';

// Constnat
const inquiryStore = useInquiryStore();
const sessionStore = useSessionStore();
const sharesStore = useSharesStore();

// Moderation status displayed to be move to helpers ?
const availableStatuses = computed(() =>
  sessionStore.appSettings.moderationStatusTab
    .filter((status) => status.inquiryType === inquiryStore.type)
    .sort((a, b) => a.order - b.order)
);

const currentStatus = computed(
  () =>
    availableStatuses.value.find(
      (status) => status.statusKey === inquiryStore.moderationStatus
    ) || [{
    statusKey: 'draft',
    label: 'Draft',
    icon: 'Draft',
    inquiryType: inquiryStore.type,
    order: 0
  }]
);

const selectedStatusKey = ref(currentStatus.value?.statusKey);

const currentStatusLabel = computed(() => currentStatus.value?.label || 'Draft');

const currentStatusIcon = computed(
  () => StatusIcons[currentStatus.value?.icon]
);

const onStatusChange = async () => {
  try {
    await inquiryStore.setModerationStatus(selectedStatusKey.value);
    showSuccess(' Moderator status of this inquiry has been updated !'); // Call success Message
  } catch (error) {
    console.error('Failed to update status:', error);
    selectedStatusKey.value = currentStatus.value.statusKey;
  }
};

const isNoAccessSet = computed(
  () =>
    inquiryStore.configuration.access === 'private' &&
    !sharesStore.hasShares &&
    inquiryStore.permissions.edit
);

// Subtext function and status
const subTexts = computed(() => {
  const subTexts = [];

  if (inquiryStore.status.isArchived) {
    subTexts.push({
      id: 'deleted',
      text: t('agora', 'Archived'),
      class: 'archived',
      iconComponent: InquiryGeneralIcons.archived
    });
    return subTexts;
  }

  if (isNoAccessSet.value) {
    subTexts.push({
      id: 'no-access',
      text: [t('agora', 'Unpublished')].join('. '),
      class: 'unpublished',
      iconComponent: InquiryGeneralIcons.unpublished
    });
    return subTexts;
  }
  if (inquiryStore.configuration.access === 'private') {
    subTexts.push({
      id: inquiryStore.configuration.access,
      text: t('agora', 'A private inquiry from {name}', {
        name: inquiryStore.owner.displayName
      }),
      class: '',
      iconComponent: InquiryGeneralIcons.private
    });
  } else {
    subTexts.push({
      id: inquiryStore.configuration.access,
      text: t('agora', 'An openly accessible inquiry from {name}', {
        name: inquiryStore.owner.displayName
      }),
      class: '',
      iconComponent: InquiryGeneralIcons.open
    });
  }

  if (inquiryStore.isClosed) {
    subTexts.push({
      id: 'closed',
      text: timeExpirationRelative.value,
      class: 'closed',
      iconComponent: InquiryGeneralIcons.closed
    });
    return subTexts;
  }

  if (!inquiryStore.isClosed && inquiryStore.configuration.expire) {
    subTexts.push({
      id: 'expiring',
      text: t('agora', 'Closing {relativeExpirationTime}', {
        relativeExpirationTime: timeExpirationRelative.value
      }),
      class: closeToClosing.value ? 'closing' : 'open',
      iconComponent: InquiryGeneralIcons.expiration
    });
    return subTexts;
  }

  if (inquiryStore.isSuggestionExpirySet && inquiryStore.isSuggestionExpired) {
    subTexts.push({
      id: 'expired',
      text: t('agora', 'Suggestion period ended {timeRelative}', {
        timeRelative: inquiryStore.suggestionsExpireRelative
      }),
      class: 'suggestion',
      iconComponent: InquiryGeneralIcons.suggestions
    });
    return subTexts;
  }

  if (inquiryStore.isSuggestionExpirySet && !inquiryStore.isSuggestionExpired) {
    subTexts.push({
      id: 'suggestion-open',
      text: t('agora', 'Suggestion period ends {timeRelative}', {
        timeRelative: inquiryStore.suggestionsExpireRelative
      }),
      class: 'suggestion',
      iconComponent: InquiryGeneralIcons.suggestions
    });
    return subTexts;
  }

  if (subTexts.length < 2) {
    subTexts.push({
      id: 'created',
      text: dateCreatedRelative.value,
      class: 'created',
      iconComponent: InquiryGeneralIcons.creation
    });
  }
  return subTexts;
});

const dateCreatedRelative = computed(() =>
  moment.unix(inquiryStore.status.created).fromNow()
);

const closeToClosing = computed(
  () =>
    !inquiryStore.isClosed &&
    inquiryStore.configuration.expire &&
    moment.unix(inquiryStore.configuration.expire).diff() < 86400000
);

const timeExpirationRelative = computed(() => {
  if (inquiryStore.configuration.expire) {
    return moment.unix(inquiryStore.configuration.expire).fromNow();
  }
  return t('agora', 'never');
});
</script>

<template>
  <div class="inquiry-info-line">
    <div class="subtexts-left">
      <component
        :is="NcUserBubble"
        :user="inquiryStore.owner.id"
        :display-name="inquiryStore.owner.displayName"
        :size="32"
      />
      <span
        v-for="subText in subTexts"
        :key="subText.id"
        :class="['sub-text', subText.class]"
      >
        <Component :is="subText.iconComponent" :size="16" />
        <span class="sub-text">{{ subText.text }}</span>
      </span>
    </div>
    <div v-if="inquiryStore.type !== 'official'" class="inquiry-type-status">
      <div class="status-badge">
        <span class="status-prefix">{{
          t('agora', 'Moderation status is:')
        }}</span>
        <template v-if="sessionStore.currentUser.isModerator">
          <select v-model="selectedStatusKey" @change="onStatusChange">
            <option
              v-for="status in availableStatuses"
              :key="status.statusKey"
              :value="status.statusKey"
            >
              {{ t('agora', status.label) }}
            </option>
          </select>
        </template>
        <template v-else>
          <Component :is="currentStatusIcon" :size="20" />
          <span class="status-label">{{ t('agora', currentStatusLabel) }}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.inquiry-info-line {
  display: flex;
  flex-wrap: wrap;
  opacity: 0.7;
  font-size: 1em;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .inquiry-type-status {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
    font-weight: bold;

    .type-icon {
      margin-bottom: 4px;
    }

    .status-label {
      font-weight: 600;
      font-size: 0.9em;
      text-align: center;
    }
    .status-badge {
      display: flex;
      align-items: center;
      gap: 6px;
    }
  }

  .material-design-icon {
    padding: 0 2px;
  }
  .subtexts-left {
    display: flex;
    align-items: center;
    gap: 8px;
    .sub-text {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
  & > span:not(:last-child)::after {
    content: '|';
    padding: 0 2px;
  }

  .closed,
  .archived {
    .sub-text {
      color: var(--color-error);
      font-weight: 700;
    }
  }

  .unpublished,
  .open {
    .sub-text {
      font-weight: 700;
    }
  }

  .closing {
    .sub-text {
      color: var(--color-warning);
      font-weight: 700;
    }
  }

  .created {
    .sub-text {
      color: var(--color-main-text);
    }
  }
}
</style>
