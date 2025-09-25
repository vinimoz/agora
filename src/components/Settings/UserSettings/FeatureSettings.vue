<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup>
import { computed } from 'vue'
import { InputDiv } from '../../Base/index.ts'
import { t } from '@nextcloud/l10n'

import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'

import { usePreferencesStore } from '../../../stores/preferences.ts'

const preferencesStore = usePreferencesStore()

const defaultViewInquiry = computed({
  get() {
    return preferencesStore.user.defaultViewInquiry === 'list-view'
  },
  set(value) {
    preferencesStore.user.defaultViewInquiry = value ? 'list-view' : 'table-view'
  },
})
</script>

<template>
  <div>
    <div class="user_settings">
      <NcCheckboxRadioSwitch
        v-model="defaultViewInquiry"
        type="switch"
        @update:model-value="preferencesStore.write()"
      >
        {{ t('agora', 'Proposal agora inquiry default view to list view') }}
      </NcCheckboxRadioSwitch>
      <div class="settings_details">
        {{
          t(
            'agora',
            'Check this, if you prefer to display text inquiry in grid view. The initial default is list view.'
          )
        }}
      </div>
    </div>

    <div class="user_settings">
      <NcCheckboxRadioSwitch
        v-model="preferencesStore.user.verboseInquiriesList"
        type="switch"
        @update:model-value="preferencesStore.write()"
      >
        {{ t('agora', 'Verbose inquiry list') }}
      </NcCheckboxRadioSwitch>
      <div class="settings_details">
        {{ t('agora', 'Check this for more inquiry information in the overview.') }}
      </div>
    </div>

    <div class="user_settings">
      <InputDiv
        v-model="preferencesStore.user.relevantOffset"
        type="number"
        inputmode="numeric"
        use-num-modifiers
        :label="
          t(
            'agora',
            'Enter the amount of days, inquiries without activity stay in the relevant list:'
          )
        "
        @change="preferencesStore.write()"
      />
    </div>
  </div>
</template>
