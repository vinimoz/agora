<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup>
import { t } from '@nextcloud/l10n'

import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'

import { usePreferencesStore } from '../../../stores/preferences.ts'
const preferencesStore = usePreferencesStore()
</script>

<template>
  <div>
    <b> {{ t('agora', 'The style settings are still experimental!') }}</b>

    <div class="user_settings">
      <NcCheckboxRadioSwitch
        v-model="preferencesStore.user.useNewInquiryDialogInNavigation"
        type="switch"
        @update:model-value="preferencesStore.write()"
      >
        {{
          t('agora', "Use modal 'Add inquiry ' dialog instead of embedded dialog in Navigation bar")
        }}
      </NcCheckboxRadioSwitch>
    </div>

    <div class="user_settings">
      <NcCheckboxRadioSwitch
        v-model="preferencesStore.user.useNewInquiryInInquiryist"
        type="switch"
        @update:model-value="preferencesStore.write()"
      >
        {{
          t(
            'agora',
            "Use 'Add inquiry ' as button in inquiry list instead of inside the navigation"
          )
        }}
      </NcCheckboxRadioSwitch>
    </div>

    <div class="user_settings">
      <NcCheckboxRadioSwitch
        v-model="preferencesStore.user.useCommentsAlternativeStyling"
        type="switch"
        @update:model-value="preferencesStore.write()"
      >
        {{ t('agora', 'Use alternative styling for the comments sidebar') }}
      </NcCheckboxRadioSwitch>
    </div>
    <div class="user_settings">
      <NcCheckboxRadioSwitch
        v-model="preferencesStore.user.useAlternativeStyling"
        type="switch"
        @update:model-value="preferencesStore.write()"
      >
        {{ t('agora', 'Use alternative inquiry page styling') }}
      </NcCheckboxRadioSwitch>
    </div>
  </div>
</template>
