<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { ref } from 'vue'
import { debounce } from 'lodash'
import { t } from '@nextcloud/l10n'
import { AxiosError } from '@nextcloud/axios'

import NcSelectUsers from '@nextcloud/vue/components/NcSelectUsers'

import { AppSettingsAPI } from '../../Api/index.ts'
import { Logger } from '../../helpers/index.ts'
import { ISearchType, User, SEARCH_TYPE_ALL } from '../../Types/index.ts'

interface Props {
  placeholder?: string
  ariaLabel?: string
  searchTypes?: ISearchType[]
  closeOnSelect?: boolean
  inputLabel?: string
  multiple?: boolean
  disabled?: boolean          // ← ADDED
}

const emit = defineEmits<{
  (e: 'userSelected', user: User): void
}>()

const model = defineModel<User | User[] | string | string[] | undefined>()

const props = withDefaults(defineProps<Props>(), {
  placeholder: t('agora', 'Type to start searching'),
  ariaLabel: t('agora', 'Select users'),
  searchTypes: () => [SEARCH_TYPE_ALL],
  closeOnSelect: false,
  multiple: false,
  disabled: false,            // ← ADDED (prevents undefined in template)
})

const users = ref<User[]>([])
const isLoading = ref(false)
const userSelect = ref()

const loadUsersAsync = debounce(async function (query: string) {
  if (!query) {
    users.value = []
    return
  }
  isLoading.value = true
  try {
    const response = await AppSettingsAPI.getUsers(query, props.searchTypes)
    users.value = response.data.siteusers.map(u => ({
      ...u,
      user: u.displayName,
    }))
  } catch (error) {
    if ((error as AxiosError)?.code === 'ERR_CANCELED') return
    Logger.error('Error loading users', { error })
  } finally {
    isLoading.value = false
  }
}, 250)

function optionSelected(user: User | User[]) {
  users.value = []
  if (userSelect.value?.search !== undefined) {
    userSelect.value.search = ''
  }
  if (props.multiple) {
    model.value = user as User[]
  } else {
    emit('userSelected', user as User)
    model.value = user as User
  }
}
</script>

<template>
  <NcSelectUsers
    ref="userSelect"
    v-bind="$attrs"
    v-model="model"
    :placeholder="placeholder"
    :input-label="inputLabel || ariaLabel || placeholder"
    :label-outside="true"
    :disabled="disabled"
    :multiple="multiple"
    :close-on-select="closeOnSelect"
    :loading="isLoading"
    :options="users"
    :filterable="false"
    :searchable="true"
    label="displayName"
    :aria-label-combobox="ariaLabel"
    @search="loadUsersAsync"
    @option:selected="optionSelected"
  >
    <template #selection="{ values, isOpen }">
      <span v-if="values.length && !isOpen" class="multiselect__single">
        {{ values.length }} {{ multiple ? 'items selected' : 'item selected' }}
      </span>
    </template>
  </NcSelectUsers>
</template>

<style lang="scss">
.multiselect {
  width: 100% !important;
  max-width: 100% !important;
  margin-top: 4px !important;
  margin-bottom: 4px !important;
}
// TODO: temp hack, remove this when the bug is fixed
.vs--single.vs--searching:not(.vs--open):not(.vs--loading) .vs__search {
  opacity: 1 !important;
}
</style>
