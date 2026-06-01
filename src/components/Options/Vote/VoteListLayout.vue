<!-- SPDX-FileCopyrightText: 2024 Nextcloud contributors -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->

<template>
    <div class="list-layout">
        <div class="list-header">
            <div class="list-cell rank">{{ t('agora', 'Rank') }}</div>
            <div class="list-cell option">{{ t('agora', 'Option') }}</div>
            <div class="list-cell votes">{{ t('agora', 'Votes') }}</div>
            <div class="list-cell percentage">{{ t('agora', 'Percentage') }}</div>
            <div class="list-cell action">{{ t('agora', 'Action') }}</div>
        </div>

        <VoteRow
            v-for="(option, index) in rankedOptions"
            :key="option.id"
            :option="option"
            :rank="index + 1"
            :vote-count="getOptionVoteCount(option.id)"
            :percentage="getPercentage(option)"
            :effective-engine-id="effectiveEngineId"
            :engine-config="activeEngine?.config || {}"
            :can-vote="canVote"
            :has-user-voted="hasUserVoted"
            :has-user-voted-for="hasUserVotedFor"
            :is-selected="isSelectedForVote(option.id)"
            :current-rank="rankings[option.id]"
            :current-grade="scores[option.id]?.toString()"
            :class="{
                'is-leading': option.metadata?.status === 'leading',
                'selected-for-vote': isSelectedForVote(option.id)
            }"
            @vote="(option, value) => $emit('vote', option, value)"
            @approval-toggle="(optionId) => $emit('toggle-selection', optionId)"
            @change-rank="(optionId, rank) => $emit('update:rankings', { ...rankings, [optionId]: rank })"
            @change-grade="(optionId, grade) => $emit('update:scores', { ...scores, [optionId]: grade ? parseInt(grade) : null })"
            @click="$emit('select-option', option)"
        />

        <div v-if="showSubmitButton" class="submit-vote-section list-submit">
            <NcButton
                type="primary"
                size="medium"
                :disabled="!canSubmitMultiVote"
                @click="$emit('submit-multi-vote')"
            >
                <Vote :size="18" />
                {{ getSubmitButtonText() }}
            </NcButton>
            <span v-if="voteSelectionInfo" class="selection-info">{{ voteSelectionInfo }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import { Vote } from 'lucide-vue-next'
import VoteRow from './VoteRow.vue'
import type { Option } from '../../Types/index'

const props = defineProps<{
    options: Option[]
    rankedOptions: Option[]
    currentEngine?: any
    effectiveEngineId: string
    activeEngine?: any
    canVote?: boolean
    hasUserVoted: boolean
    rankings: Record<number, number>
    scores: Record<number, number>
    selectedOptions: Set<number>
    maxRank: number
    scoreMin: number
    scoreMax: number
    canSubmitMultiVote: boolean
    voteSelectionInfo: string | null
    getOptionVoteCount: (optionId: number) => number
    getPercentage: (option: Option) => number
    hasUserVotedFor: (optionId: number) => boolean
    isSelectedForVote: (optionId: number) => boolean
    inquiryId?: number
    familyType?: string
}>()

const emit = defineEmits<{
    'toggle-selection': [optionId: number]
    'update:rankings': [rankings: Record<number, number>]
    'update:scores': [scores: Record<number, number>]
    'vote': [option: Option, value: any]
    'submit-multi-vote': []
    'select-option': [option: Option]
}>()

const showSubmitButton = computed(() => 
    (props.currentEngine?.behavior === 'multi' || props.currentEngine?.behavior === 'flex') &&
    props.canVote && !props.hasUserVoted && props.activeEngine?.status === 'active'
)

const getSubmitButtonText = (): string => {
    if (props.effectiveEngineId === 'approval') return t('agora', 'Submit selections')
    if (props.effectiveEngineId === 'ranking') return t('agora', 'Submit ranking')
    if (props.effectiveEngineId === 'score') return t('agora', 'Submit scores')
    if (props.effectiveEngineId === 'star') return t('agora', 'Submit ratings')
    return t('agora', 'Submit vote')
}
</script>

<style scoped lang="scss">
.list-layout {
    background: var(--color-main-background);
    border-radius: 20px;
    border: 1px solid var(--color-border);
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    .list-header {
        display: grid;
        grid-template-columns: 80px 1fr 100px 150px 100px;
        background: linear-gradient(135deg, var(--color-background-dark) 0%, var(--color-background-hover) 100%);
        padding: 14px 20px;
        font-weight: 700;
        border-bottom: 1px solid var(--color-border);

        .list-cell {
            font-size: 12px;
            text-transform: uppercase;
            color: var(--color-text-lighter);
            letter-spacing: 0.5px;
        }
    }

    .submit-vote-section.list-submit {
        padding: 20px;
        text-align: center;
        border-top: 1px solid var(--color-border);
        background: var(--color-background-dark);
    }
}

@media (max-width: 768px) {
    .list-layout {
        .list-header {
            grid-template-columns: 60px 1fr 80px;
            
            .list-cell.percentage,
            .list-cell.action {
                display: none;
            }
        }
    }
}
</style>
