<!--
  - SPDX-FileCopyrightText: 2021 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed } from 'vue'

import NcUserBubble from '@nextcloud/vue/components/NcUserBubble'
import NcRichText from '@nextcloud/vue/components/NcRichText'

import { GuestBubble, SimpleLink } from '../../helpers/index.ts'

const props = defineProps({
  activity: {
    type: Object,
    default: null,
  },
})

const dateActivityRelative = computed(() => {
    const date = new Date(props.activity.datetime)
    const now = new Date()
    const diffSeconds = (now.getTime() - date.getTime()) / 1000

    // Simple relative time formatter
    if (diffSeconds < 60) {
        return 'just now'
    } else if (diffSeconds < 3600) {
        const minutes = Math.floor(diffSeconds / 60)
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    } else if (diffSeconds < 86400) {
        const hours = Math.floor(diffSeconds / 3600)
        return `${hours} hour${hours > 1 ? 's' : ''} ago`
    } else if (diffSeconds < 604800) {
        const days = Math.floor(diffSeconds / 86400)
        return `${days} day${days > 1 ? 's' : ''} ago`
    } else {
        // Fallback to locale date string
        return date.toLocaleDateString()
    }
})


const message = computed(() => {
  const subject = props.activity.subject_rich[0]
  const parameters = JSON.parse(JSON.stringify(props.activity.subject_rich[1]))
if (parameters.after && typeof parameters.after.id === 'string' && parameters.after.id.startsWith('dt:')) {
    const dateTime = parameters.after.id.slice(3)
    const date = new Date(dateTime)
    parameters.after.name = date.toLocaleString()
}

  Object.keys(parameters).forEach(function (key) {
    const { type } = parameters[key]

    switch (type) {
      case 'highlight':
        parameters[key] = parameters[key].link
          ? {
              component: SimpleLink,
              props: {
                href: parameters[key].link,
                name: parameters[key].name,
              },
            }
          : `${parameters[key].name}`
        break
      case 'user':
        parameters[key] = {
          component: NcUserBubble,
          props: {
            user: parameters[key].id,
            displayName: parameters[key].name,
          },
        }
        break
      case 'circle':
        parameters[key] = {
          component: SimpleLink,
          props: {
            href: parameters[key].link,
            name: parameters[key].name,
          },
        }
        break
      case 'addressbook-contact':
      case 'email':
      case 'guest':
        parameters[key] = {
          component: GuestBubble,
          props: {
            user: parameters[key].id,
            displayName: parameters[key].name,
          },
        }
        break
      default:
        parameters[key] = `{${key}}`
    }
  })

  return {
    subject,
    parameters,
  }
})
</script>

<template>
  <div class="activity-item">
    <div class="activity-item__content">
      <span class="activity-item__date">{{ dateActivityRelative }}</span>
      <NcRichText :text="message.subject" :arguments="message.parameters" />
    </div>
  </div>
</template>

<style lang="scss">
.activity-item {
  display: flex;
  align-items: start;
  margin-bottom: 24px;
}

.activity-item__date {
  opacity: 0.5;
  font-size: 0.8em;
  text-align: end;
  &::before {
    content: ' ~ ';
  }
}

.activity-item__content {
  margin-inline-start: 8px;
  flex: 1 1;
  padding-top: 2px;
}
</style>
