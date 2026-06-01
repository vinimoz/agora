<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
    <div
        class="list-row"
        :class="{
            'is-leading': isLeading,
            'user-voted': hasUserVotedFor(option.id),
            'selected-for-vote': isSelected
        }"
        @click="$emit('click', option)"
    >
        <div class="list-cell rank">
            <div class="rank-number">
                <span v-if="rank === 1" class="medal">🥇</span>
                <span v-else-if="rank === 2" class="medal">🥈</span>
                <span v-else-if="rank === 3" class="medal">🥉</span>
                <span v-else>{{ rank }}</span>
            </div>
        </div>

        <div class="list-cell option">
            <div class="option-info">
                <strong class="option-title">{{ option.title }}</strong>
                <span v-if="option.text" class="option-subtitle">{{ truncateText(option.text, 60) }}</span>
            </div>
        </div>

        <div class="list-cell votes">
            <strong>{{ voteCount }}</strong>
        </div>

        <div class="list-cell percentage">
            <div class="percentage-bar">
                <div class="percentage-fill" :style="{ width: percentage + '%' }" />
                <span class="percentage-text">{{ percentage }}%</span>
            </div>
        </div>

        <div class="list-cell action">
            <VoteInput
                v-if="showVoteInput"
                :engine-id="effectiveEngineId"
                :engine-config="engineConfig"
                :option="option"
                :is-selected="isSelected"
                 :disabled="!canVote"
                :current-rank="currentRank"
                :current-grade="currentGrade"
                :can-remove-vote="false"
                @vote="(value) => $emit('vote', option, value)"
                @approval-toggle="() => $emit('approval-toggle', option.id)"
                @change-rank="(rank) => $emit('change-rank', option.id, rank)"
                @change-grade="(grade) => $emit('change-grade', option.id, grade)"
            />
            <div v-else-if="hasUserVotedFor(option.id)" class="voted-icon">
                <CheckCircle :size="16" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CheckCircle } from 'lucide-vue-next'
import VoteInput from './VoteInput.vue'
import type { Option, SupportValue } from '../../Types/index'

const props = defineProps<{
    option: Option
    rank: number
    voteCount: number
    percentage: number
    effectiveEngineId: string
    engineConfig: Record<string, unknown>
    canVote: boolean
    hasUserVoted: boolean
    hasUserVotedFor: (optionId: number) => boolean
    isSelected?: boolean
    currentRank?: number | null
    currentGrade?: string | null
    isLeading?: boolean
}>()

const emit = defineEmits<{
    vote: [option: Option, value: SupportValue]
    'approval-toggle': [optionId: number]
    'change-rank': [optionId: number, rank: number | null]
    'change-grade': [optionId: number, grade: string | null]
    click: [option: Option]
}>()

const showVoteInput = computed(() =>
    props.canVote && !props.hasUserVoted
)

const truncateText = (text: string, maxLength: number) => {
    if (!text || text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
}
</script>

<style scoped lang="scss">
.list-row {
    display: grid;
    grid-template-columns: 80px 1fr 100px 150px 100px;
    padding: 12px 20px;
    border-bottom: 1px solid var(--color-border);
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
        background: var(--color-background-hover);
        transform: translateX(2px);
    }

    &.is-leading {
        background: linear-gradient(90deg, rgba(246, 195, 67, 0.05) 0%, transparent 100%);
    }

    &.user-voted {
        background: linear-gradient(90deg, rgba(66, 184, 131, 0.05) 0%, transparent 100%);
    }

    &.selected-for-vote {
        background: linear-gradient(90deg, rgba(var(--color-primary-element-rgb), 0.08) 0%, transparent 100%);
    }

    .list-cell {
        display: flex;
        align-items: center;

        .rank-number {
            font-weight: 700;
            font-size: 16px;

            .medal {
                font-size: 24px;
            }
        }

        .option-info {
            display: flex;
            flex-direction: column;
            gap: 4px;

            .option-title {
                font-size: 14px;
            }

            .option-subtitle {
                font-size: 12px;
                color: var(--color-text-lighter);
            }
        }

        .percentage-bar {
            flex: 1;
            position: relative;
            height: 28px;
            background: var(--color-background-dark);
            border-radius: 14px;
            overflow: hidden;

            .percentage-fill {
                height: 100%;
                background: linear-gradient(90deg, var(--color-primary-element) 0%, var(--color-primary-element-light) 100%);
                transition: width 0.3s ease;
            }

            .percentage-text {
                position: absolute;
                left: 10px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 11px;
                font-weight: 700;
                color: var(--color-main-text);
                z-index: 1;
            }
        }

        .voted-icon {
            color: #42b883;
        }
    }
}

@media (max-width: 768px) {
    .list-row {
        grid-template-columns: 60px 1fr 80px;

        .list-cell.percentage,
        .list-cell.action {
            display: none;
        }
    }
}
</style>
