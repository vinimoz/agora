<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { t } from '@nextcloud/l10n'

import NcEmptyContent from '@nextcloud/vue/components/NcEmptyContent'

import CommentAdd from '../Comments/CommentAdd.vue'
import Comments from '../Comments/Comments.vue'
import CommentsIcon from 'vue-material-design-icons/CommentProcessingOutline.vue'

import { useInquiryStore } from '../../stores/inquiry'
import { useCommentsStore } from '../../stores/comments'
import ConfigBox from '../Base/modules/ConfigBox.vue'
import CardDiv from '../Base/modules/CardDiv.vue'

defineOptions({
  inheritAttrs: false
})


const inquiryStore = useInquiryStore()
const commentsStore = useCommentsStore()

const emptyContentProps = {
	name: t('agora', 'No comments'),
	description: t('agora', 'Be the first.'),
}

const showEmptyContent = computed(() => commentsStore.comments.length === 0)

onMounted(() => {
	commentsStore.load(inquiryStore.id)
})

onBeforeRouteUpdate(async () => {
	commentsStore.load(inquiryStore.id)
})

onBeforeRouteLeave(() => {
	commentsStore.$reset()
})

watch(
	[() => inquiryStore.permissions.comment, () => inquiryStore.permissions.seeUsernames],
	() => {
		commentsStore.load(inquiryStore.id)
	},
)
</script>

<template>
	<ConfigBox v-if="inquiryStore.permissions.edit" :name="t('agora', 'Configuration')">
	<!--	<ConfigAllowComment @change="inquiryStore.write" />
    <ConfigForceConfidentialComments @change="inquiryStore.write" /> -->
		<CardDiv v-if="!inquiryStore.configuration.allowComment" type="warning">
			{{
				t(
					'agora',
					'Comments are disabled, except for owner and delegated inquiry administration.',
				)
			}}
		</CardDiv>
	</ConfigBox>

	<CommentAdd />
	<Comments v-if="!showEmptyContent" :inquiry-only='true' />
	<NcEmptyContent v-else v-bind="emptyContentProps">
		<template #icon>
			<CommentsIcon />
		</template>
	</NcEmptyContent>
</template>
