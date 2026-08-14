<!--
  - SPDX-FileCopyrightText: 2021 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { useInquiryStore } from '../../stores/inquiry'

import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'

const emit = defineEmits(['change'])

const inquiryStore = useInquiryStore()
</script>

<template>
	<NcCheckboxRadioSwitch
		v-model="inquiryStore.configuration.allowComment"
		type="switch"
		@update:model-value="emit('change')">
		{{ t('agora', 'Allow comments') }}
	</NcCheckboxRadioSwitch>
</template>
