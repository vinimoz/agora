<!-- SPDX-FileCopyrightText: 2024 Nextcloud contributors -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->

<template>
    <div class="vote-header">
        <!-- Top row: Metadata left, Layout switcher right -->
        <div class="header-top-row">
            <div class="vote-metadata">
                <span v-if="voteSession" class="metadata-badge">
                    <Calendar :size="14" />
                    {{ formatDate(voteSession.start_date) }}
                    <span v-if="voteSession.end_date">
                        - {{ formatDate(voteSession.end_date) }}
                    </span>
                </span>
                <span v-if="voteSession?.quorum" class="metadata-badge">
                    <Users :size="14" />
                    {{ t('agora', 'Quorum: {quorum}', { quorum: voteSession.quorum }) }}
                </span>
                <span class="metadata-badge">
                    <Vote :size="14" />
                    {{ t('agora', 'Total votes: {total}', { total: totalVotes }) }}
                </span>
                <span v-if="currentEngine && (currentEngine.voteScope === 'per_option' || currentEngine.voteScope === 'cross_option')" class="metadata-badge">
                    <CheckCircle :size="14" />
                    {{ t('agora', 'Multiple choices allowed') }}
                </span>
            </div>

            <div class="layout-switcher">
                <NcButton
                        v-for="layout in allowedLayouts"
                        :key="layout"
                        :type="currentLayout === layout ? 'primary' : 'tertiary'"
                        size="small"
                        @click="$emit('update:layout', layout)"
                        >
                        <template #icon>
                            <component :is="getLayoutIcon(layout)" :size="16" />
                        </template>
                {{ t('agora', capitalize(layout)) }}
                </NcButton>
            </div>
        </div>

        <!-- Middle row: Engine selector and action buttons -->
        <div class="action-bar">
            <!-- Engine selector - Beautiful display of support engines -->
            <div v-if="availableEngines.length > 0" class="engine-selector">
                <NcSelect
                        :model-value="currentEngine"
                        :options="availableEngines"
                        :placeholder="t('agora', 'Select voting method')"
                        :clearable="false"
                        label="title"
                        :reduce="(engine) => engine"
                        class="engine-select"
                        @update:model-value="handleEngineChange"
                        >
                        <!-- Custom dropdown option rendering -->
                        <template #option="{ option }">
                            <div v-if="option" class="engine-option">
                                <div class="engine-option-icon-wrapper">
                                    <component :is="getEngineIcon(option.engine)" :size="20" class="engine-option-icon" />
                                </div>
                                <div class="engine-option-content">
                                    <div class="engine-option-header">
                                        <span class="engine-option-title">{{ option.title || getEngineLabel(option.engine) }}</span>
                                        <div class="engine-right-badges">
                                            <span v-if="option.purpose" class="engine-purpose-badge">
                                                {{ getPurposeLabel(option.purpose) }}
                                            </span>
                                            <span v-if="option.metadata?.phase" class="engine-phase-badge" :class="`phase-${option.metadata.phase}`">
                                                {{ formatPhase(option.metadata.phase) }}
                                            </span>
                                            <span v-if="option.status" class="engine-status-badge" :class="`status-${option.status}`">
                                                {{ formatStatus(option.status) }}
                                            </span>
                                        </div>
                                    </div>
                                    <div v-if="option.description" class="engine-option-description">
                                        {{ truncateText(option.description, 120) }}
                                    </div>
                                    <div class="engine-option-meta">
                                        <span v-if="option.target_type" class="meta-tag">
                                            <Users :size="10" />
                                            {{ formatTargetType(option.target_type) }}
                                        </span>
                                        <span v-if="option.target_ids?.length" class="meta-tag">
                                            <Hash :size="10" />
                                            {{ option.target_ids.length }} {{ t('agora', 'targets') }}
                                        </span>
                                        <span v-if="option.config?.quorum" class="meta-tag">
                                            <Users :size="10" />
                                            {{ t('agora', 'Quorum: {quorum}', { quorum: option.config.quorum }) }}
                                        </span>
                                        <span v-if="option.config?.max_votes_per_user" class="meta-tag">
                                            <Vote :size="10" />
                                            {{ t('agora', 'Max votes: {max}', { max: option.config.max_votes_per_user }) }}
                                        </span>
                                        <span v-if="option.config?.min !== undefined && option.config?.max !== undefined" class="meta-tag">
                                            <Star :size="10" />
                                            {{ t('agora', 'Range: {min}-{max}', { min: option.config.min, max: option.config.max }) }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <!-- Custom selected option rendering -->
                        <template #selected-option="{ option }">
                            <div v-if="option" class="engine-selected">
                                <component :is="getEngineIcon(option.engine)" :size="16" class="engine-selected-icon" />
                                <div class="engine-selected-info">
                                    <span class="engine-selected-title">{{ option.title || getEngineLabel(option.engine) }}</span>
                                    <span v-if="option.purpose" class="engine-selected-purpose">
                                        {{ getPurposeLabel(option.purpose) }}
                                    </span>
                                </div>
                                <div class="engine-selected-right">
                                    <span v-if="option.metadata?.phase" class="engine-selected-phase" :class="`phase-${option.metadata.phase}`">
                                        {{ formatPhase(option.metadata.phase) }}
                                    </span>
                                    <span v-if="option.status" class="engine-selected-status" :class="`status-${option.status}`">
                                        {{ formatStatus(option.status) }}
                                    </span>
                                </div>
                            </div>
                            <div v-else class="engine-selected-placeholder">
                                <Vote :size="16" />
                                <span>{{ t('agora', 'Select voting method') }}</span>
                            </div>
                        </template>
                </NcSelect>
            </div>

            <!-- Show "Create Method" button when no engines exist OR when user wants to create a new one -->
            <NcButton
                    v-if="!isReadonly && canManageVote"
                    type="primary"
                    size="small"
                    @click="$emit('createEngine')"
                    >
                    <template #icon>
                        <Plus :size="16" />
                    </template>
            {{ availableEngines.length === 0 ? t('agora', 'Create Voting Method') : t('agora', 'New Method') }}
            </NcButton>

            <!-- Add to vote button - only show when there's a current engine -->
            <NcButton
                    v-if="!isReadonly && canManageVote && currentEngine"
                    type="primary"
                    size="small"
                    class="add-to-vote-btn"
                    @click="$emit('addToVote', currentEngine)"
                    >
                    <template #icon>
                        <Plus :size="16" />
                    </template>
            {{ t('agora', 'Add to vote') }}
            </NcButton>
        </div>

        <!-- Current Engine Info Card (when engine is selected) -->
        <div v-if="currentEngine" class="current-engine-card">
            <div class="engine-card-icon">
                <component :is="getEngineIcon(currentEngine.engine)" :size="24" />
            </div>
            <div class="engine-card-content">
                <div class="engine-card-header">
                    <h3 class="engine-card-title">{{ currentEngine.title || getEngineLabel(currentEngine.engine) }}</h3>
                    <div class="engine-card-actions">
                        <!-- Edit button for the current engine -->
                        <NcButton
                                v-if="!isReadonly && canManageVote"
                                type="tertiary"
                                size="small"
                                class="engine-action-btn"
                                @click="$emit('editEngine', currentEngine)"
                                >
                                <template #icon>
                                    <Edit :size="14" />
                                </template>
                        </NcButton>
                        <!-- Delete button for the current engine -->
                        <NcButton
                                v-if="!isReadonly && canManageVote && availableEngines.length > 1"
                                type="tertiary"
                                size="small"
                                class="engine-action-btn delete-btn"
                                @click="$emit('deleteEngine', currentEngine)"
                                >
                                <template #icon>
                                    <Trash2 :size="14" />
                                </template>
                        </NcButton>
                    </div>
                </div>
                <p v-if="currentEngine.description" class="engine-card-description">
                {{ currentEngine.description }}
                </p>
                <div class="engine-card-stats">
                    <div v-if="currentEngine.target_type" class="stat-item">
                        <Users :size="12" />
                        <span>{{ formatTargetType(currentEngine.target_type) }}</span>
                    </div>
                    <div v-if="currentEngine.target_ids?.length" class="stat-item">
                        <Hash :size="12" />
                        <span>{{ currentEngine.target_ids.length }} {{ t('agora', 'targets') }}</span>
                    </div>
                    <div v-if="currentEngine.config?.quorum" class="stat-item">
                        <Users :size="12" />
                        <span>{{ t('agora', 'Quorum: {quorum}', { quorum: currentEngine.config.quorum }) }}</span>
                    </div>
                    <div v-if="currentEngine.config?.max_votes_per_user" class="stat-item">
                        <Vote :size="12" />
                        <span>{{ t('agora', 'Max {max} votes per user', { max: currentEngine.config.max_votes_per_user }) }}</span>
                    </div>
                    <div v-if="currentEngine.config?.min !== undefined && currentEngine.config?.max !== undefined" class="stat-item">
                        <Star :size="12" />
                        <span>{{ t('agora', 'Range: {min} - {max}', { min: currentEngine.config.min, max: currentEngine.config.max }) }}</span>
                    </div>
                    <div v-if="currentEngine.config?.allow_multiple_votes" class="stat-item">
                        <CheckCircle :size="12" />
                        <span>{{ t('agora', 'Multiple votes allowed') }}</span>
                    </div>
                </div>
            </div>
            <!-- Engine purpose, phase, status badges moved to bottom right -->
            <div class="engine-card-bottom-badges">
                <span v-if="currentEngine.purpose" class="card-purpose-badge">
                    {{ getPurposeLabel(currentEngine.purpose) }}
                </span>
                <span v-if="currentEngine.metadata?.phase" class="card-phase-badge" :class="`phase-${currentEngine.metadata.phase}`">
                    {{ formatPhase(currentEngine.metadata.phase) }}
                </span>
                <span v-if="currentEngine.status" class="card-status-badge" :class="`status-${currentEngine.status}`">
                    {{ formatStatus(currentEngine.status) }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcSelect from '@nextcloud/vue/components/NcSelect'
import {
    Plus,
    Edit,
    Trash2,
    Vote,
    Users,
    Calendar,
    CheckCircle,
    LayoutGrid,
    BarChart3,
    ThumbsUp,
    Scale,
    Heart,
    Star,
    TrendingUp,
    Award,
    Brain,
    Gauge,
    Hash,
} from 'lucide-vue-next'

import { ENGINE_DEFINITIONS, type SupportEngine } from '../../../Types/votingType'

interface VoteSession {
    start_date?: string
    end_date?: string
    quorum?: number
}

const props = defineProps<{
    voteSession?: VoteSession
    totalVotes: number
    currentEngine: SupportEngine | null
    availableEngines: SupportEngine[]
    canManageVote: boolean
    isReadonly: boolean
    currentLayout: string
    allowedLayouts: string[]
}>()

const emit = defineEmits<{
    'update:layout': [layout: string]
    'update:engine': [engineId: number | null]
    'createEngine': []
    'editEngine': [engine: SupportEngine]
    'deleteEngine': [engine: SupportEngine]
    'addToVote': [engine: SupportEngine]
}>()

// Handle engine change from NcSelect (receives the full engine object)
const handleEngineChange = (engine: SupportEngine | null) => {
    emit('update:engine', engine ? engine.id : null)
}

// Get icon for engine type
const getEngineIcon = (engineId: string) => {
    if (!engineId) return Vote
    const icons: Record<string, unknown> = {
        binary: ThumbsUp,
        ternary: Scale,
        reaction: Heart,
        star: Star,
        score: Star,
        approval: CheckCircle,
        ranking: TrendingUp,
        borda: Award,
        condorcet: Brain,
        majority_judgment: Gauge,
        none: Vote,
    }
    return icons[engineId] || Vote
}

// Get label for engine type
const getEngineLabel = (engineId: string | number | null): string => {
    if (!engineId) return t('agora', 'Select voting method')
    if (typeof engineId === 'number') {
        const engine = props.availableEngines.find(e => e.id === engineId)
        if (engine) return engine.title || getEngineLabelFromId(engine.engine)
        return t('agora', 'Select voting method')
    }
    return getEngineLabelFromId(engineId)
}

const getEngineLabelFromId = (engineId: string): string =>
    ENGINE_DEFINITIONS[engineId]?.label || engineId

// Get purpose label
const getPurposeLabel = (purpose: string): string => {
    const purposes: Record<string, string> = {
        'consultation': t('agora', 'Consultation'),
        'voting': t('agora', 'Voting'),
        'survey': t('agora', 'Survey'),
        'poll': t('agora', 'Poll'),
        'election': t('agora', 'Election'),
        'referendum': t('agora', 'Referendum'),
        'feedback': t('agora', 'Feedback'),
        'assessment': t('agora', 'Assessment'),
    }
    return purposes[purpose] || purpose.charAt(0).toUpperCase() + purpose.slice(1)
}

// Format phase display
const formatPhase = (phase: string): string => {
    const phases: Record<string, string> = {
        'draft': t('agora', 'Draft'),
        'voting': t('agora', 'Voting'),
        'counting': t('agora', 'Counting'),
        'published': t('agora', 'Published'),
        'closed': t('agora', 'Closed'),
    }
    return phases[phase] || phase
}

// Format target type
const formatTargetType = (targetType: string): string => {
    const types: Record<string, string> = {
        'inquiry': t('agora', 'Inquiry'),
        'option': t('agora', 'Option'),
    }
    return types[targetType] || targetType
}

// Format status
const formatStatus = (status: string): string => {
    const statuses: Record<string, string> = {
        'draft': t('agora', 'Draft'),
        'active': t('agora', 'Active'),
        'closed': t('agora', 'Closed'),
        'pending': t('agora', 'Pending'),
        'completed': t('agora', 'Completed'),
        'cancelled': t('agora', 'Cancelled'),
    }
    return statuses[status] || status
}

// Truncate text
const truncateText = (text: string, maxLength: number): string => {
    if (!text || text.length <= maxLength) return text
    return `${text.substring(0, maxLength)  }...`
}

const formatDate = (date?: string): string =>
    date ? new Date(date).toLocaleDateString() : ''

const capitalize = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1)

const getLayoutIcon = (layout: string): unknown => {
    const icons: Record<string, unknown> = { 
        cards: LayoutGrid, 
        results: BarChart3 
    }
    return icons[layout] || LayoutGrid
}
</script>

<style scoped lang="scss">
.vote-header {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 24px;

    .header-top-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 12px;

        .vote-metadata {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;

            .metadata-badge {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 6px 14px;
                background: linear-gradient(135deg, var(--color-background-dark) 0%, var(--color-background-hover) 100%);
                border-radius: 24px;
                font-size: 13px;
                font-weight: 500;
                color: var(--color-text-lighter);
                backdrop-filter: blur(4px);
                transition: all 0.2s ease;

                &:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }

                svg {
                    opacity: 0.7;
                }
            }
        }

        .layout-switcher {
            display: flex;
            gap: 6px;
            background: var(--color-background-dark);
            padding: 4px;
            border-radius: 16px;
            backdrop-filter: blur(4px);

            :deep(.nc-button) {
                border-radius: 12px;
                transition: all 0.2s ease;

                &:hover {
                    transform: translateY(-1px);
                }
            }
        }
    }

    .action-bar {
        display: flex;
        gap: 12px;
        align-items: center;
        flex-wrap: wrap;

        .engine-selector {
            min-width: 360px;
            max-width: 480px;
            flex: 1;

            .engine-select {
                width: 100%;

                :deep(.vs__dropdown-toggle) {
                    border-radius: 12px;
                    background: var(--color-main-background);
                    border: 1px solid var(--color-border);
                    transition: all 0.2s ease;
                    min-height: 42px;

                    &:hover {
                        border-color: var(--color-primary-element);
                        box-shadow: 0 0 0 2px rgba(var(--color-primary-element-rgb), 0.1);
                    }
                }

                :deep(.vs__selected-options) {
                    padding: 6px 12px;
                    flex-wrap: wrap;
                    gap: 4px;
                }

                :deep(.vs__selected) {
                    margin: 0;
                    padding: 0;
                }

                :deep(.vs__dropdown-menu) {
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    border: 1px solid var(--color-border);
                    max-height: 500px;
                    overflow-y: auto;
                    padding: 8px 0;

                    &::-webkit-scrollbar {
                        width: 6px;
                    }

                    &::-webkit-scrollbar-track {
                        background: var(--color-background-dark);
                        border-radius: 3px;
                    }

                    &::-webkit-scrollbar-thumb {
                        background: var(--color-border-dark);
                        border-radius: 3px;

                        &:hover {
                            background: var(--color-text-lighter);
                        }
                    }
                }

                :deep(.vs__dropdown-option) {
                    padding: 0;

                    &:hover {
                        background: transparent;
                    }
                }
            }

            .engine-option {
                display: flex;
                align-items: flex-start;
                gap: 14px;
                padding: 16px;
                transition: all 0.2s ease;
                border-bottom: 1px solid var(--color-border);
                cursor: pointer;

                &:hover {
                    background: linear-gradient(135deg, var(--color-background-hover) 0%, var(--color-background-dark) 100%);
                    transform: translateX(2px);
                }

                &:last-child {
                    border-bottom: none;
                }

                .engine-option-icon-wrapper {
                    flex-shrink: 0;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, var(--color-primary-element-light) 0%, var(--color-primary-element) 100%);
                    border-radius: 10px;

                    .engine-option-icon {
                        color: white;
                    }
                }

                .engine-option-content {
                    flex: 1;
                    min-width: 0;

                    .engine-option-header {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        gap: 12px;
                        margin-bottom: 8px;
                        flex-wrap: wrap;

                        .engine-option-title {
                            font-weight: 600;
                            font-size: 14px;
                            color: var(--color-text-main);
                            line-height: 1.3;
                        }

                        .engine-right-badges {
                            display: flex;
                            align-items: center;
                            gap: 6px;
                            flex-wrap: wrap;
                        }

                        .engine-purpose-badge {
                            display: inline-flex;
                            align-items: center;
                            font-size: 10px;
                            padding: 3px 8px;
                            background: linear-gradient(135deg, rgba(var(--color-primary-element-rgb), 0.1) 0%, rgba(var(--color-primary-element-rgb), 0.05) 100%);
                            border-radius: 12px;
                            color: var(--color-primary-element);
                            font-weight: 600;
                            letter-spacing: 0.3px;
                        }

                        .engine-phase-badge {
                            display: inline-flex;
                            align-items: center;
                            font-size: 10px;
                            padding: 3px 8px;
                            border-radius: 12px;
                            font-weight: 600;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;

                            &.phase-draft {
                                background: rgba(241, 196, 15, 0.15);
                                color: rgb(241, 196, 15);
                            }

                            &.phase-voting {
                                background: rgba(52, 152, 219, 0.15);
                                color: rgb(52, 152, 219);
                            }

                            &.phase-counting {
                                background: rgba(155, 89, 182, 0.15);
                                color: rgb(155, 89, 182);
                            }

                            &.phase-published {
                                background: rgba(46, 204, 113, 0.15);
                                color: rgb(46, 204, 113);
                            }

                            &.phase-closed {
                                background: rgba(231, 76, 60, 0.15);
                                color: rgb(231, 76, 60);
                            }
                        }

                        .engine-status-badge {
                            display: inline-flex;
                            align-items: center;
                            font-size: 10px;
                            padding: 3px 8px;
                            border-radius: 12px;
                            font-weight: 600;

                            &.status-draft {
                                background: rgba(241, 196, 15, 0.15);
                                color: rgb(241, 196, 15);
                            }

                            &.status-active {
                                background: rgba(46, 204, 113, 0.15);
                                color: rgb(46, 204, 113);
                            }

                            &.status-closed {
                                background: rgba(231, 76, 60, 0.15);
                                color: rgb(231, 76, 60);
                            }

                            &.status-pending {
                                background: rgba(52, 152, 219, 0.15);
                                color: rgb(52, 152, 219);
                            }

                            &.status-completed {
                                background: rgba(46, 204, 113, 0.15);
                                color: rgb(46, 204, 113);
                            }

                            &.status-cancelled {
                                background: rgba(149, 165, 166, 0.15);
                                color: rgb(149, 165, 166);
                            }
                        }
                    }

                    .engine-option-description {
                        font-size: 12px;
                        color: var(--color-text-lighter);
                        line-height: 1.5;
                        margin-bottom: 10px;
                        word-break: break-word;
                    }

                    .engine-option-meta {
                        display: flex;
                        gap: 8px;
                        flex-wrap: wrap;

                        .meta-tag {
                            display: inline-flex;
                            align-items: center;
                            gap: 4px;
                            font-size: 10px;
                            padding: 3px 8px;
                            background: var(--color-background-dark);
                            border-radius: 10px;
                            color: var(--color-text-lighter);

                            svg {
                                opacity: 0.6;
                            }
                        }
                    }
                }
            }

            .engine-selected {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 4px 0;
                width: 100%;

                .engine-selected-icon {
                    flex-shrink: 0;
                    color: var(--color-primary-element);
                }

                .engine-selected-info {
                    flex: 1;
                    display: flex;
                    align-items: baseline;
                    gap: 8px;
                    flex-wrap: wrap;

                    .engine-selected-title {
                        font-weight: 600;
                        font-size: 13px;
                        color: var(--color-text-main);
                    }

                    .engine-selected-purpose {
                        font-size: 11px;
                        color: var(--color-primary-element);
                        font-weight: 500;
                        padding: 2px 6px;
                        background: rgba(var(--color-primary-element-rgb), 0.1);
                        border-radius: 10px;
                    }
                }

                .engine-selected-right {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    flex-shrink: 0;
                }

                .engine-selected-phase {
                    font-size: 10px;
                    padding: 3px 8px;
                    border-radius: 10px;
                    font-weight: 600;
                    text-transform: uppercase;

                    &.phase-draft {
                        background: rgba(241, 196, 15, 0.15);
                        color: rgb(241, 196, 15);
                    }

                    &.phase-voting {
                        background: rgba(52, 152, 219, 0.15);
                        color: rgb(52, 152, 219);
                    }

                    &.phase-counting {
                        background: rgba(155, 89, 182, 0.15);
                        color: rgb(155, 89, 182);
                    }

                    &.phase-published {
                        background: rgba(46, 204, 113, 0.15);
                        color: rgb(46, 204, 113);
                    }

                    &.phase-closed {
                        background: rgba(231, 76, 60, 0.15);
                        color: rgb(231, 76, 60);
                    }
                }

                .engine-selected-status {
                    font-size: 10px;
                    padding: 3px 8px;
                    border-radius: 10px;
                    font-weight: 600;

                    &.status-draft {
                        background: rgba(241, 196, 15, 0.15);
                        color: rgb(241, 196, 15);
                    }

                    &.status-active {
                        background: rgba(46, 204, 113, 0.15);
                        color: rgb(46, 204, 113);
                    }

                    &.status-closed {
                        background: rgba(231, 76, 60, 0.15);
                        color: rgb(231, 76, 60);
                    }
                }
            }

            .engine-selected-placeholder {
                display: flex;
                align-items: center;
                gap: 8px;
                color: var(--color-text-lighter);
                font-size: 13px;

                svg {
                    opacity: 0.6;
                }
            }
        }

        .add-to-vote-btn {
            background: linear-gradient(135deg, var(--color-primary-element-light) 0%, var(--color-primary-element) 100%);
            border: none;
            color: white;
            transition: all 0.2s ease;

            &:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(var(--color-primary-element-rgb), 0.3);
            }
        }
    }

    .current-engine-card {
        display: flex;
        gap: 16px;
        padding: 20px;
        background: linear-gradient(135deg, var(--color-background-dark) 0%, var(--color-background-hover) 100%);
        border-radius: 16px;
        border: 1px solid var(--color-border);
        transition: all 0.3s ease;
        position: relative;

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .engine-card-icon {
            flex-shrink: 0;
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, var(--color-primary-element-light) 0%, var(--color-primary-element) 100%);
            border-radius: 12px;
            color: white;
        }

        .engine-card-content {
            flex: 1;

            .engine-card-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
                flex-wrap: wrap;
                margin-bottom: 12px;

                .engine-card-title {
                    font-size: 16px;
                    font-weight: 600;
                    color: var(--color-text-main);
                    margin: 0;
                }

                .engine-card-actions {
                    display: flex;
                    gap: 4px;

                    .engine-action-btn {
                        opacity: 0.6;
                        transition: opacity 0.2s ease;

                        &:hover {
                            opacity: 1;
                        }

                        &.delete-btn:hover {
                            color: var(--color-error);

                            :deep(svg) {
                                color: var(--color-error);
                            }
                        }
                    }
                }
            }

            .engine-card-description {
                font-size: 13px;
                color: var(--color-text-lighter);
                line-height: 1.5;
                margin-bottom: 16px;
            }

            .engine-card-stats {
                display: flex;
                gap: 16px;
                flex-wrap: wrap;

                .stat-item {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 12px;
                    color: var(--color-text-lighter);
                    padding: 4px 10px;
                    background: var(--color-background-dark);
                    border-radius: 20px;

                    svg {
                        opacity: 0.7;
                    }
                }
            }
        }

        .engine-card-bottom-badges {
            position: absolute;
            bottom: 16px;
            right: 20px;
            display: flex;
            gap: 8px;
            flex-wrap: wrap;

            .card-purpose-badge {
                font-size: 11px;
                padding: 4px 10px;
                background: linear-gradient(135deg, rgba(var(--color-primary-element-rgb), 0.15) 0%, rgba(var(--color-primary-element-rgb), 0.08) 100%);
                border-radius: 12px;
                color: var(--color-primary-element);
                font-weight: 600;
            }

            .card-phase-badge {
                font-size: 11px;
                padding: 4px 10px;
                border-radius: 12px;
                font-weight: 600;
                text-transform: uppercase;

                &.phase-draft {
                    background: rgba(241, 196, 15, 0.15);
                    color: rgb(241, 196, 15);
                }

                &.phase-voting {
                    background: rgba(52, 152, 219, 0.15);
                    color: rgb(52, 152, 219);
                }

                &.phase-counting {
                    background: rgba(155, 89, 182, 0.15);
                    color: rgb(155, 89, 182);
                }

                &.phase-published {
                    background: rgba(46, 204, 113, 0.15);
                    color: rgb(46, 204, 113);
                }

                &.phase-closed {
                    background: rgba(231, 76, 60, 0.15);
                    color: rgb(231, 76, 60);
                }
            }

            .card-status-badge {
                font-size: 11px;
                padding: 4px 10px;
                border-radius: 12px;
                font-weight: 600;

                &.status-draft {
                    background: rgba(241, 196, 15, 0.15);
                    color: rgb(241, 196, 15);
                }

                &.status-active {
                    background: rgba(46, 204, 113, 0.15);
                    color: rgb(46, 204, 113);
                }

                &.status-closed {
                    background: rgba(231, 76, 60, 0.15);
                    color: rgb(231, 76, 60);
                }
            }
        }
    }
}

            @media (max-width: 768px) {
                .vote-header {
                    .header-top-row {
                        flex-direction: column;
                        align-items: stretch;

                        .layout-switcher {
                            justify-content: center;
                        }
                    }

                    .action-bar {
                        width: 100%;
                        justify-content: flex-start;

                        .engine-selector {
                            min-width: 100%;
                            max-width: 100%;
                        }
                    }

                    .current-engine-card {
                        flex-direction: column;
                        padding-bottom: 60px;

                        .engine-card-icon {
                            align-self: flex-start;
                        }

                        .engine-card-bottom-badges {
                            bottom: 16px;
                            right: 16px;
                            left: auto;
                        }
                    }
                }
            }
</style>
