<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { ref } from 'vue'
import { debounce } from 'lodash'
import { t } from '@nextcloud/l10n'

import NcSelectUsers from '@nextcloud/vue/components/NcSelectUsers'

import { AppSettingsAPI } from '../../Api/index.ts'
import { Logger } from '../../helpers/index.ts'
import { ISearchType, User, SEARCH_TYPE_ALL } from '../../Types/index.ts'
import { AxiosError } from '@nextcloud/axios'

interface Props {
  placeholder?: string
  ariaLabel?: string
  searchTypes?: ISearchType[]
  closeOnSelect?: boolean
  multiple?: boolean
}

const emit = defineEmits(['userSelected', 'update:modelValue'])

const model = defineModel<User | User[] | string | string[] | undefined>()

const {
  placeholder = t('agora', 'Type to start searching'),
  ariaLabel = t('agora', 'Select users'),
  searchTypes = [SEARCH_TYPE_ALL],
  closeOnSelect = false,
  multiple = false,
} = defineProps<Props>()

const users = ref<User[]>([])
const isLoading = ref(false)
const userSelect = ref()

const debouncedUpdateModel = debounce((value: User | User[]) => {
  emit('update:modelValue', value)
}, 150)


const loadUsersAsync = debounce(async function (query: string) {
  if (!query) {
    users.value = []
    return
  }

  isLoading.value = true

  try {
    const response = await AppSettingsAPI.getUsers(query, searchTypes)
    users.value = response.data.siteusers.map(u => ({
    ...u,
    user: u.displayName,
}))

//    users.value = response.data.siteusers
    isLoading.value = false
  } catch (error) {
    if ((error as AxiosError)?.code === 'ERR_CANCELED') {
      return
    }
    Logger.error('Error loading users', { error })
    isLoading.value = false
  }
}, 250)

async function optionSelected(user: User | User[]) {

   users.value = []

    if (userSelect.value?.search !== undefined) {
        userSelect.value.search = ''
    }

  if (multiple) {
    // For multiple selection, emit the array of users
//    emit('update:modelValue', user as User[])
    debouncedUpdateModel(user as User[])
  } else {
    // For single selection, emit just the user
    emit('userSelected', user as User)
        debouncedUpdateModel(user as User)
    // emit('update:modelValue', user as User)
  }
}

const selectProps = {
  ariaLabelCombobox: ariaLabel,
  multiple: multiple,
  userSelect: true,
  tagWidth: 80,
  loading: isLoading.value,
  filterable: false,
  searchable: true,
  placeholder,
  closeOnSelect,
  dropdownShouldOpen: () => users.value.length > 0,
  label: 'displayName',
}
</script>

<template>
  <NcSelectUsers
    id="ajax"
    v-model="model"
    ref="userSelect"
    v-bind="selectProps"
    :options="users"
    :loading="isLoading"
    @option:selected="optionSelected"
    @search="loadUsersAsync"
  >
    <template #selection="{ values, isOpen }">
      <span v-if="values.length &amp;&amp; !isOpen" class="multiselect__single">
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
