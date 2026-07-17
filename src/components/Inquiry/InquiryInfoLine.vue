<!--
	- SPDX-FileCopyrightText: 2018 Nextcloud Contributors
	- SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed, ref } from 'vue'
import moment from '@nextcloud/moment'
import { t } from '@nextcloud/l10n'

import { useInquiryStore } from '../../stores/inquiry.ts'
import { useSharesStore } from '../../stores/shares.ts'
import { useSessionStore } from '../../stores/session.ts'
import { showSuccess } from '@nextcloud/dialogs'
import { InquiryGeneralIcons, StatusIcons } from '../../utils/icons.ts'
import { NcSelect } from '@nextcloud/vue'
import {
  getInquiryTypeData,
} from '../../helpers/modules/InquiryHelper.ts'


// Store initialization
const inquiryStore = useInquiryStore()
const sessionStore = useSessionStore()
const sharesStore = useSharesStore()


const inquiryTypeData = computed(() => 
  getInquiryTypeData(inquiryStore.type, sessionStore.appSettings.inquiryTypeTab || [])
)

// Inquiry status displayed to be move to helpers ?
const availableInquiryStatuses = computed(() =>
  sessionStore.appSettings.inquiryStatusTab
    ?.filter((status) => status.inquiryType === inquiryStore.type)
    ?.sort((a, b) => a.order - b.order) || []
)

const currentInquiryStatus = computed(
  () =>
    availableInquiryStatuses.value.find(
      (status) => status.statusKey === inquiryStore.status.inquiryStatus
    ) || {
      statusKey: 'draft',
      label: 'Draft',
      icon: 'draft',
      inquiryType: inquiryStore.type,
      order: 0,
    }
)

const selectedInquiryStatus = computed({
  get: () => statusOptions.value.find(option => option.id === selectedInquiryStatusKey.value),
  set: (newValue) => {
    if (newValue) {
      selectedInquiryStatusKey.value = newValue.id
    }
  }
})

const selectedInquiryStatusKey = ref(currentInquiryStatus.value?.statusKey)
const currentInquiryStatusLabel = computed(() => currentInquiryStatus.value?.label || 'Draft')
const currentInquiryStatusIcon = computed(() => {
  const iconName = currentInquiryStatus.value?.icon?.toLowerCase() || 'draft'
  return StatusIcons[iconName] || StatusIcons.Draft
})


const onStatusChange = async (newStatus: string) => {
  try {
   const statusId = newStatus?.id || newStatus

    await inquiryStore.setInquiryStatus(statusId)
    showSuccess(t('agora', 'Inquiry status of this inquiry has been updated'))
  } catch (error) {
    console.error('Failed to update status:', error)
    selectedInquiryStatusKey.value = currentInquiryStatus.value.statusKey
  }
}

const isNoAccessSet = computed(
  () =>
    inquiryStore.configuration.visibility === 'private' &&
    !sharesStore.hasShares &&
    inquiryStore.permissions.edit
)

// Subtext function and status
const subTexts = computed(() => {
  const subTexts = []

  if (inquiryStore.status.isArchived) {
    subTexts.push({
      id: 'deleted',
      text: t('agora', 'Archived'),
      class: 'archived',
      iconComponent: InquiryGeneralIcons.Archived,
    })
    return subTexts
  }

  if (isNoAccessSet.value) {
    subTexts.push({
      id: 'no-access',
      text: [t('agora', 'Unpublished')].join('. '),
      class: 'unpublished',
      iconComponent: InquiryGeneralIcons.Unpublished,
    })
    return subTexts
  }
  if (inquiryStore.configuration.visibility === 'private') {
    subTexts.push({
      id: inquiryStore.configuration.visibility,
      text: t('agora', 'A private inquiry from {name}', {
        name: inquiryStore.owner.displayName,
      }),
      class: '',
      iconComponent: InquiryGeneralIcons.Private,
    })
  } else {
    subTexts.push({
      id: inquiryStore.configuration.visibility,
      text: t('agora', 'An openly accessible inquiry from {name}', {
        name: inquiryStore.owner.displayName,
      }),
      class: '',
      iconComponent: InquiryGeneralIcons.Open,
    })
  }

  if (inquiryStore.isClosed) {
    subTexts.push({
      id: 'closed',
      text: timeExpirationRelative.value,
      class: 'closed',
      iconComponent: InquiryGeneralIcons.Closed,
    })
    return subTexts
  }

  if (subTexts.length < 2) {
    subTexts.push({
      id: 'created',
      text: dateCreatedRelative.value,
      class: 'created',
      iconComponent: InquiryGeneralIcons.Creation,
    })
  }
  return subTexts
})

const dateCreatedRelative = computed(() => moment.unix(inquiryStore.status.created).fromNow())

const timeExpirationRelative = computed(() => {
  if (inquiryStore.configuration.expire) {
    return moment.unix(inquiryStore.configuration.expire).fromNow()
  }
  return t('agora', 'never')
})

const statusInquiryOptions = computed(() => 
  availableInquiryStatuses.value.map(status => ({
    id: status.statusKey,
    label: t('agora', status.label),
  }))
)

const statusOptions = computed(() => 
  availableStatuses.value.map(status => ({
    id: status.statusKey,
    label: t('agora', status.label),
  }))
)
</script>

<template>
  <div class="inquiry-info-line">
    <div class="subtexts-left">
      <component
        :is="inquiryTypeData.icon"
        :size="20"
      />
      <span class="type-label">
        {{ inquiryTypeData.label }}
      </span>
      <span v-for="subText in subTexts" :key="subText.id" :class="['sub-text', subText.class]">
        <Component :is="subText.iconComponent" :size="16" />
        <span class="sub-text">{{ subText.text }}</span>
      </span>
    </div>
    <div class="status-right">
      <div v-if="inquiryStore.type !== 'official'" class="inquiry-type-status">
        <div class="status-badge">
          <span class="status-prefix">{{ t('agora', 'Inquiry status') }}</span>
          <template v-if="sessionStore.currentUser.isModerator">
            <NcSelect
              v-model="selectedInquiryStatus"
              :options="statusInquiryOptions"
              :clearable="false"
              @update:model-value="onStatusChange"
            />
          </template>
          <template v-else>
            <Component :is="currentInquiryStatusIcon" :size="20" />
            <span class="status-label">{{ t('agora', currentInquiryStatusLabel) }}</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.type-label {
  color: var(--color-primary);
  display: flex;
  font-size: 1rem;
  font-weight: 800;
}

.inquiry-info-line {
  display: flex;
  flex-wrap: wrap;
  opacity: 0.7;
  font-size: 1em;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .status-right {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-left: auto;
  }

  .inquiry-type-status {
    display: flex;
    align-items: center;
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
