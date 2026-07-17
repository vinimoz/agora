<!-- SPDX-FileCopyrightText: 2024 Nextcloud contributors -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->

<template>
    <div class="empty-state" :class="{ 'no-engine': !showAddButton }">
        <component :is="iconComponent" :size="iconSize" />
        <h4>{{ title }}</h4>
        <p>{{ description }}</p>
        <NcButton
            v-if="showButton"
            :type="buttonType"
            @click="handleClick"
        >
            <template #icon>
                <Plus :size="16" />
            </template>
            {{ buttonText }}
        </NcButton>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import { Plus, Info, Vote, Settings, Link } from 'lucide-vue-next'

const props = defineProps<{
    canManageVote?: boolean
    isReadonly?: boolean
    showAddButton?: boolean
    noEngine?: boolean
    noItemsLinked?: boolean
}>()

const emit = defineEmits<{
    configure: []
    'addOption': []
    'addToVote': []
}>()

const iconComponent = computed(() => {
    if (props.noEngine) return Settings
    if (props.noItemsLinked) return Link
    if (props.showAddButton) return Vote
    return Info
})

const iconSize = computed(() => props.noEngine ? 48 : 64)

const title = computed(() => {
    if (props.noEngine) return t('agora', 'No Voting Method Configured')
    if (props.noItemsLinked) return t('agora', 'No Items Linked to Vote')
    if (props.showAddButton) return t('agora', 'No items to vote on yet')
    return t('agora', 'No voting data available')
})

const description = computed(() => {
    if (props.noEngine) return t('agora', 'A voting method needs to be configured before voting can begin.')
    if (props.noItemsLinked) {
        if (props.canManageVote && !props.isReadonly) {
            return t('agora', 'The voting method is configured but no items have been added to the vote yet. Click the button below to add items.')
        }
        return t('agora', 'The voting method is configured but no items have been added to the vote yet.')
    }
    if (props.showAddButton) return t('agora', 'Add items to start the voting process')
    return t('agora', 'There are no voting items available at this time.')
})

const showButton = computed(() => {
    if (props.noEngine) return props.canManageVote && !props.isReadonly
    if (props.noItemsLinked) return props.canManageVote && !props.isReadonly
    if (props.showAddButton) return props.canManageVote && !props.isReadonly
    return false
})

const buttonType = computed(() => {
    if (props.noEngine) return 'primary'
    if (props.noItemsLinked) return 'primary'
    return 'primary'
})

const buttonText = computed(() => {
    if (props.noEngine) return t('agora', 'Configure Voting Method')
    if (props.noItemsLinked) return t('agora', 'Add Items to Vote')
    if (props.showAddButton) return t('agora', 'Add Item')
    return ''
})

const handleClick = () => {
    if (props.noEngine) {
        emit('configure')
    } else if (props.noItemsLinked || props.showAddButton) {
        emit('addToVote')
    } else if (props.showAddButton) {
        emit('addOption')
    }
}
</script>

<style scoped lang="scss">
.empty-state {
    text-align: center;
    padding: 80px 40px;
    background: linear-gradient(135deg, var(--color-background-dark) 0%, var(--color-background-hover) 100%);
    border: 2px dashed var(--color-border);
    border-radius: 24px;
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        border-color: var(--color-primary-element-light);
    }

    svg {
        color: var(--color-primary-element);
        margin-bottom: 24px;
        opacity: 0.8;
    }

    h4 {
        margin: 0 0 12px 0;
        font-size: 20px;
        font-weight: 700;
        color: var(--color-text);
    }

    p {
        margin: 0 0 28px 0;
        color: var(--color-text-lighter);
        font-size: 14px;
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
    }

    :deep(.nc-button) {
        min-width: 200px;
        transition: all 0.2s ease;

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(var(--color-primary-element-rgb), 0.3);
        }
    }
}
</style>
