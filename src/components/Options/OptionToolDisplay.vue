<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="option-tool-display">
    <!-- ============================================================ -->
    <!-- SINGLE FAMILY TOOL - When a specific family is requested      -->
    <!-- ============================================================ -->
    <div v-if="specificFamily" class="family-tool-single">
      <component
        :is="getFamilyToolComponent(specificFamily)"
        :options="filteredOptions"
        :inquiry-id="inquiryId"
        :family="specificFamily"
        :family-data="getFamilyData(specificFamily)"
        @view-option="handleViewOption"
        @view-inquiry="handleViewInquiry"
        @add-option="handleAddOption"
        @open-detail="handleOpenDetail"
        @option-status-change="handleOptionStatusChange"
        @propose-option-resolution="handleProposeOptionResolution"
        @resolve-option="handleResolveOption"
        @reopen-option="handleReopenOption"
        @continue-discussion="handleContinueDiscussion"
        @propose-resolution="handleProposeResolution"
        @reopen-inquiry="handleReopenInquiry"
        @action="handleAction"
        @item-family-changed="handleItemFamilyChanged"
      />
    </div>

    <!-- ============================================================ -->
    <!-- MULTIPLE FAMILIES - When multiple families are requested      -->
    <!-- ============================================================ -->
    <div v-else-if="families && families.length > 0" class="family-tools-grid">
      <div
        v-for="family in families"
        :key="family"
        class="family-tool-section"
        :class="`family-${family}`"
      >
        <div class="family-header">
          <component :is="getFamilyIcon(family)" :size="18" />
          <h4 class="family-title">{{ getFamilyLabel(family) }}</h4>
          <span class="family-count">{{ getOptionsForFamily(family).length }}</span>
        </div>
        <div class="family-content">
          <component
            :is="getFamilyToolComponent(family)"
            :options="getOptionsForFamily(family)"
            :inquiry-id="inquiryId"
            :family="family"
            :family-data="getFamilyData(family)"
            @view-option="handleViewOption"
            @view-inquiry="handleViewInquiry"
            @add-option="handleAddOption"
            @open-detail="handleOpenDetail"
            @option-status-change="handleOptionStatusChange"
            @propose-option-resolution="handleProposeOptionResolution"
            @resolve-option="handleResolveOption"
            @reopen-option="handleReopenOption"
          />
        </div>
      </div>
    </div>

    <!-- ============================================================ -->
    <!-- AUTO-GROUPED - When no specific family is requested           -->
    <!-- ============================================================ -->
    <div v-else-if="options && options.length > 0" class="family-tools-auto">
      <div
        v-for="(group, familyKey) in optionsByFamily"
        :key="familyKey"
        class="family-tool-section"
        :class="`family-${familyKey}`"
      >
        <div class="family-header">
          <component :is="getFamilyIcon(familyKey)" :size="18" />
          <h4 class="family-title">{{ getFamilyLabel(familyKey) }}</h4>
          <span class="family-count">{{ group.length }}</span>
        </div>
        <div class="family-content">
          <component
            :is="getFamilyToolComponent(familyKey)"
            :options="group"
            :inquiry-id="inquiryId"
            :family="familyKey"
            :family-data="getFamilyData(familyKey)"
            @view-option="handleViewOption"
            @view-inquiry="handleViewInquiry"
            @add-option="handleAddOption"
            @open-detail="handleOpenDetail"
            @option-status-change="handleOptionStatusChange"
            @propose-option-resolution="handleProposeOptionResolution"
            @resolve-option="handleResolveOption"
            @reopen-option="handleReopenOption"
          />
        </div>
      </div>
    </div>

    <!-- ============================================================ -->
    <!-- EMPTY STATE - No options available                            -->
    <!-- ============================================================ -->
    <div v-else class="empty-state">
      <component :is="Icons.Layers" :size="32" />
      <p>{{ t('agora', 'No options available') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * OptionToolDisplay - Renders family-specific tools for Options
 * 
 * This component is responsible for displaying Options organized by their
 * family (debate, consensus, structure) using the appropriate tool component.
 * 
 * IMPORTANT: This component ONLY handles Option tools (debate, consensus, structure).
 * Tools that can also apply to Inquiries (kanban, timeline, vote) are handled
 * directly in ExperienceRenderer for 'inquiries' content.
 * 
 * @see La séparation est maintenant claire.txt - Section 15: Tools des Options
 */
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import { InquiryGeneralIcons as Icons } from '../../utils/icons'

// Import ONLY Option-family tool components
// These tools are exclusive to Options (family debate, consensus, structure)
import FamilyLayoutConsensusFlow from './FamilyLayouts/FamilyLayoutConsensusFlow.vue'
import FamilyLayoutPaired from './FamilyLayouts/FamilyLayoutPaired.vue'
import FamilyLayoutTree from './FamilyLayouts/FamilyLayoutTree.vue'

// NOTE: FamilyLayoutKanban, FamilyLayoutTimeline, FamilyLayoutVote are NOT imported here
// because they can be used for both Options AND Inquiries.
// They are handled directly in ExperienceRenderer for 'inquiries' content.

import type { Option } from '../../Types'
import { useSessionStore } from '../../stores/session'

const props = defineProps<{
  /** Options to display (filtered by family) */
  options?: Option[]
  /** ID of the parent Inquiry */
  inquiryId?: number
  /** Specific family to display (single tool) */
  specificFamily?: string
  /** List of families to display (multiple tools) */
  families?: string[]
}>()

const emit = defineEmits<{
  /** Emitted when user clicks on an Option to view details */
  viewOption: [option: Option]
  /** Emitted when user clicks on an Inquiry to view details */
  viewInquiry: [inquiryId: number]
  /** Emitted when user wants to add a new Option */
  addOption: [optionType: string, parentId?: number]
  /** Emitted when user wants to open an Option detail */
  openDetail: [option: Option]
  /** Emitted when an Option's status changes */
  optionStatusChange: [optionId: number, status: string]
  /** Emitted when a resolution is proposed for an Option */
  proposeOptionResolution: [optionId: number]
  /** Emitted when an Option is resolved */
  resolveOption: [optionId: number]
  /** Emitted when an Option is reopened */
  reopenOption: [optionId: number]
  /** Emitted to continue discussion on an Inquiry */
  continueDiscussion: []
  /** Emitted to propose a resolution for an Inquiry */
  proposeResolution: []
  /** Emitted to reopen an Inquiry */
  reopenInquiry: []
  /** Emitted for generic actions */
  action: [actionKey: string]
  /** Emitted when an Item's family changes */
  itemFamilyChanged: [payload: { itemId: number, familyKey: string, action: string }]
}>()

const sessionStore = useSessionStore()

// ============================================================
// FAMILY TOOL COMPONENT MAPPING
// ============================================================
/**
 * Mapping of Option family keys to their tool components.
 * 
 * According to the architecture document (Section 15):
 * - consensus -> FamilyLayoutConsensusFlow
 * - debate -> FamilyLayoutPaired
 * - structure -> FamilyLayoutTree
 * 
 * These are EXCLUSIVELY Option tools and should never be used
 * for Inquiries directly.
 */
const familyToolMap: Record<string, any> = {
  consensus: FamilyLayoutConsensusFlow,
  debate: FamilyLayoutPaired,
  structure: FamilyLayoutTree,
}

// ============================================================
// FAMILY ICON MAPPING
// ============================================================
const familyIconMap: Record<string, any> = {
  consensus: Icons.Users,
  debate: Icons.MessageSquare,
  structure: Icons.Book,
  kanban: Icons.Board,
  timeline: Icons.Clock,
  vote: Icons.CheckCircle,
}

// ============================================================
// FAMILY LABELS
// ============================================================
const familyLabelMap: Record<string, string> = {
  consensus: t('agora', 'Consensus'),
  debate: t('agora', 'Debate'),
  structure: t('agora', 'Structure'),
  kanban: t('agora', 'Kanban'),
  timeline: t('agora', 'Timeline'),
  vote: t('agora', 'Vote'),
}

// ============================================================
// HELPERS
// ============================================================

/**
 * Get family data from app settings for a given family key
 * @param family
 */
function getFamilyData(family: string) {
  const familyTab = sessionStore.appSettings?.optionFamilyTab || []
  return familyTab.find(f => f.key === family) || null
}

/**
 * Get the tool component for a specific family
 * Only returns Option-specific tools
 * @param family
 */
function getFamilyToolComponent(family: string) {
  return familyToolMap[family] || FamilyLayoutTree
}

/**
 * Get the icon for a specific family
 * @param family
 */
function getFamilyIcon(family: string) {
  return familyIconMap[family] || Icons.Layers
}

/**
 * Get the human-readable label for a specific family
 * @param family
 */
function getFamilyLabel(family: string) {
  return familyLabelMap[family] || family
}

// ============================================================
// COMPUTED
// ============================================================

/**
 * Group options by their family
 * Used when no specific family is requested
 */
const optionsByFamily = computed(() => {
  const groups: Record<string, Option[]> = {}
  
  if (!props.options) return groups
  
  props.options.forEach(option => {
    const family = option.family || 'default'
    if (!groups[family]) groups[family] = []
    groups[family].push(option)
  })
  
  return groups
})

/**
 * Get options for a specific family
 * @param family
 */
function getOptionsForFamily(family: string): Option[] {
  if (!props.options) return []
  return props.options.filter(o => (o.family || 'default') === family)
}

/**
 * Filtered options for single family mode
 */
const filteredOptions = computed(() => {
  if (!props.specificFamily || !props.options) return []
  return getOptionsForFamily(props.specificFamily)
})

// ============================================================
// EVENT HANDLERS
// ============================================================

function handleViewOption(option: Option) {
  emit('viewOption', option)
}

function handleViewInquiry(inquiryId: number) {
  emit('viewInquiry', inquiryId)
}

function handleAddOption(optionType: string, parentId?: number) {
  emit('addOption', optionType, parentId)
}

function handleOpenDetail(option: Option) {
  emit('openDetail', option)
}

function handleOptionStatusChange(optionId: number, status: string) {
  emit('optionStatusChange', optionId, status)
}

function handleProposeOptionResolution(optionId: number) {
  emit('proposeOptionResolution', optionId)
}

function handleResolveOption(optionId: number) {
  emit('resolveOption', optionId)
}

function handleReopenOption(optionId: number) {
  emit('reopenOption', optionId)
}

function handleContinueDiscussion() {
  emit('continueDiscussion')
}

function handleProposeResolution() {
  emit('proposeResolution')
}

function handleReopenInquiry() {
  emit('reopenInquiry')
}

function handleAction(actionKey: string) {
  emit('action', actionKey)
}

function handleItemFamilyChanged(payload: { itemId: number, familyKey: string, action: string }) {
  emit('itemFamilyChanged', payload)
}
</script>

<style lang="scss" scoped>
.option-tool-display {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.family-tools-grid {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.family-tool-section {
  background: var(--color-main-background);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;

  .family-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: var(--color-background-dark);
    border-bottom: 1px solid var(--color-border);

    .family-title {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
      color: var(--color-main-text);
      flex: 1;
    }

    .family-count {
      font-size: 12px;
      font-weight: 600;
      background: var(--color-background-darker);
      padding: 2px 10px;
      border-radius: 12px;
      color: var(--color-text-lighter);
    }
  }

  .family-content {
    padding: 16px;
  }
}

.family-tool-single {
  .family-content {
    padding: 0;
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: var(--color-text-lighter);

  svg {
    opacity: 0.3;
    margin-bottom: 12px;
  }

  p {
    margin: 0;
    font-style: italic;
  }
}
</style>
