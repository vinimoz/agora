<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { NcLoadingIcon } from '@nextcloud/vue'
</script>

<template>
	<div class="importing-step">
		<div class="importing-content">
			<NcLoadingIcon :size="80" />
			<h2>{{ t('agora', 'Importing Template') }}</h2>
			<p class="importing-message">
				{{ t('agora', 'Please wait while the template is being imported...') }}
			</p>
			<p class="importing-submessage">
				{{ t('agora', 'This may take a few moments depending on the template size.') }}
			</p>
		</div>
	</div>
</template>

<style scoped lang="scss">
.importing-step {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 400px;
	padding: 40px;
}

.importing-content {
	text-align: center;
	max-width: 500px;

	h2 {
		font-size: 24px;
		font-weight: 600;
		margin: 24px 0 16px;
	}

	.importing-message {
		font-size: 16px;
		color: var(--color-text-maxcontrast);
		margin-bottom: 8px;
	}

	.importing-submessage {
		font-size: 14px;
		color: var(--color-text-maxcontrast);
	}
}
</style>
