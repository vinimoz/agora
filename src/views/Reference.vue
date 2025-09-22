<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import NcUserBubble from '@nextcloud/vue/components/NcUserBubble'
import { AgoraAppIcon } from '../components/AppIcons'
import ExpirationIcon from 'vue-material-design-icons/CalendarEnd.vue'
import BadgeSmallDiv from '../components/Base/modules/BadgeSmallDiv.vue'
import { t } from '@nextcloud/l10n'
import { DateTime } from 'luxon'

type RichObject = {
  id: number
  inquiry: {
    id: number
    title: string
    description: string
    ownerDisplayName: string
    ownerId: string
    url: string
    participated: false
    childsList: number
    supportsList: number
    expiry: number
    expired: boolean
  }
}

interface Props {
  richObject?: RichObject
}

const { richObject } = defineProps<Props>()

const expiryClass = richObject?.inquiry?.expiry
  ? DateTime.fromMillis(richObject.inquiry.expiry * 1000).diffNow('hours').hours < 36
    ? 'warning'
    : 'success'
  : ''
</script>

<template>
  <div v-if="richObject" class="agora_widget">
    <div class="widget_header">
      <AgoraAppIcon :size="20" class="title-icon" />
      <a class="title" :href="richObject.inquiry.url" target="_blank">
        {{ richObject.inquiry.title }}
      </a>
      <BadgeSmallDiv v-if="richObject.inquiry.participated" class="success">
        {{ t('agora', 'participated') }}
      </BadgeSmallDiv>
      <BadgeSmallDiv v-else-if="richObject.inquiry.expired" class="error">
        {{ t('agora', 'closed') }}
      </BadgeSmallDiv>
      <BadgeSmallDiv v-else-if="richObject.inquiry.expiry > 0" :class="expiryClass">
        <template #icon>
          <ExpirationIcon :size="16" />
        </template>
        {{ DateTime.fromMillis(richObject.inquiry.expiry * 1000).toRelative() }}
      </BadgeSmallDiv>
    </div>
    <div class="description">
      <span class="clamped">
        {{ richObject.inquiry.description }}
      </span>
    </div>
    <div v-if="richObject.inquiry.ownerId" class="widget_footer">
      <span>{{ t('agora', 'By:') }}</span>
      <NcUserBubble
        :user="richObject.inquiry.ownerId"
        :display-name="richObject.inquiry.ownerDisplayName"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.agora_widget {
  padding: 0.6rem;
}

.widget_header,
.widget_footer {
  display: flex;
  column-gap: 0.3rem;
}

.badge-small {
  flex: 0;
}

.agora_app_icon {
  flex: 0 0 1.4rem;
}

.title {
  flex: 1;
  font-weight: bold;
  padding-inline-start: 0.6rem;
  text-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.description {
  margin-inline-start: 1.4rem;
  padding: 0.6rem;
}

.owner {
  margin-inline-start: 1.4rem;
  padding-inline-start: 0.6rem;
}

.clamped {
  display: -webkit-box !important;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  text-wrap: wrap;
  overflow: clip !important;
  text-overflow: ellipsis !important;
  padding: 0 !important;
}
</style>
