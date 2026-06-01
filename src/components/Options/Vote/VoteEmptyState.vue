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
import { Plus, Info, Vote, Settings } from 'lucide-vue-next'

const props = defineProps<{
    canManageVote?: boolean
    isReadonly?: boolean
    showAddButton?: boolean
    noEngine?: boolean
    noOptionsLinked?: boolean
}>()

const emit = defineEmits<{
    configure: []
    'add-option': []
    'add-to-vote': []
}>()

const iconComponent = computed(() => {
    if (props.noEngine) return Settings
    if (props.noOptionsLinked) return Vote
    if (props.showAddButton) return Vote
    return Info
})

const iconSize = computed(() => props.noEngine ? 48 : 64)

const title = computed(() => {
    if (props.noEngine) return t('agora', 'No Voting Method Configured')
     if (props.noOptionsLinked) return t('agora', 'No Options Linked to Vote')
    if (props.showAddButton) return t('agora', 'No options to vote on yet')
    return t('agora', 'No voting data available')
})

const description = computed(() => {
    if (props.noEngine) return t('agora', 'A voting method needs to be configured before voting can begin.')
    if (props.noOptionsLinked) return t('agora', 'The voting method is configured but no options have been added to the vote yet.')
    if (props.showAddButton) return t('agora', 'Add options to start the voting process')
    return t('agora', 'There are no voting options available at this time.')
})

const showButton = computed(() => {
    if (props.noEngine) return props.canManageVote && !props.isReadonly
    if (props.showAddButton) return props.canManageVote && !props.isReadonly
    return false
})

const showConfigureButton = computed(() => 
    props.noEngine && props.canManageVote && !props.isReadonly
)

const showAddToVoteButton = computed(() => 
    props.noOptionsLinked && props.canManageVote && !props.isReadonly
)

const showAddOptionButton = computed(() => 
    props.showAddButton && props.canManageVote && !props.isReadonly
)

const buttonType = computed(() => props.noEngine ? 'primary' : 'primary')
const buttonText = computed(() => {
    if (props.noEngine) return t('agora', 'Configure Voting Method')
    
    if (props.showAddButton) return t('agora', 'Add Option')
    return ''
})

const handleClick = () => {
    if (props.noEngine) {
        emit('configure')
    } else if (props.showAddButton) {
        emit('add-option')
    } else if (props.showAddToVoteButton) {
        emit('add-to-vote')
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
