<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { t } from '@nextcloud/l10n'
import { showError, showSuccess } from '@nextcloud/dialogs'
import NcSelect from '@nextcloud/vue/components/NcSelect'
import NcButton from '@nextcloud/vue/components/NcButton'
import { useSharesStore } from '../../stores/shares.ts'
import { useInquiryGroupStore } from '../../stores/inquiryGroup.ts'
import SharesList from '../Shares/SharesListInquiryGroup.vue'
import UserSearch from '../User/UserSearch.vue'
import { SEARCH_TYPE_GROUPS, SEARCH_TYPE_USERS } from '../../Types/index.ts'
import type { VisibilityType, PublicationStatus } from '../../stores/inquiryGroup.ts'

// ============================================================
// STORE SETUP
// ============================================================
const inquiryGroupStore = useInquiryGroupStore()
const sharesStore = useSharesStore()

// ============================================================
// COMPUTED - Direct store access
// ============================================================
const canEdit = computed(() => inquiryGroupStore.permissions.edit)
const isLoading = ref(false)
const isSaving = computed(() => inquiryGroupStore.updating)

// Visibility options
const visibilityOptions = [
  { value: 'private', label: t('inquiries', 'Private (Owner only)') },
  { value: 'groups', label: t('inquiries', 'Specific Groups') },
  { value: 'participants', label: t('inquiries', 'Participants Only') },
  { value: 'everyone', label: t('inquiries', 'Everyone') },
]

const visibilityOptionLabels: Record<VisibilityType, string> = {
  private: t('inquiries', 'Private (Owner only)'),
  groups: t('inquiries', 'Specific Groups'),
  participants: t('inquiries', 'Participants Only'),
  everyone: t('inquiries', 'Everyone'),
}

// Publication status options
const publicationStatusOptions = [
  { value: 'draft', label: t('inquiries', 'Draft') },
  { value: 'pending', label: t('inquiries', 'Pending Approval') },
  { value: 'published', label: t('inquiries', 'Published') },
  { value: 'archived', label: t('inquiries', 'Archived') },
  { value: 'deleted', label: t('inquiries', 'Deleted') },
]

const publicationStatusLabels: Record<PublicationStatus, string> = {
  draft: t('inquiries', 'Draft'),
  pending: t('inquiries', 'Pending Approval'),
  published: t('inquiries', 'Published'),
  archived: t('inquiries', 'Archived'),
  deleted: t('inquiries', 'Deleted'),
}

// Participation options
const participationOptions = [
  { value: 'everyone', label: t('inquiries', 'Everyone') },
  { value: 'users', label: t('inquiries', 'Specific Users') },
  { value: 'groups', label: t('inquiries', 'Specific Groups') },
]

const participationOptionLabels: Record<string, string> = {
  everyone: t('inquiries', 'Everyone'),
  users: t('inquiries', 'Specific Users'),
  groups: t('inquiries', 'Specific Groups'),
}

// ============================================================
// COMPUTED - Direct store access with reactive updates
// ============================================================
const selectedVisibility = computed({
  get: () => inquiryGroupStore.visibility,
  set: async (val: VisibilityType) => {
    try {
      await inquiryGroupStore.updateVisibility({ visibility: val })
      showSuccess(t('inquiries', 'Visibility updated'))
    } catch (error) {
      showError(t('inquiries', 'Failed to update visibility'))
    }
  },
})

const selectedPublicationStatus = computed({
  get: () => inquiryGroupStore.publicationStatus,
  set: async (val: PublicationStatus) => {
    try {
      await inquiryGroupStore.updatePublicationStatus(val)
      showSuccess(t('inquiries', 'Publication status updated'))
    } catch (error) {
      showError(t('inquiries', 'Failed to update status'))
    }
  },
})

const selectedParticipation = computed({
  get: () => inquiryGroupStore.participationType,
  set: async (val: 'everyone' | 'users' | 'groups') => {
    try {
      await inquiryGroupStore.updateParticipation({ type: val })
      showSuccess(t('inquiries', 'Participation updated'))
    } catch (error) {
      showError(t('inquiries', 'Failed to update participation'))
    }
  },
})

// ============================================================
// COMPUTED - User/Group selections
// ============================================================
const visibilityGroups = computed({
  get: () => {
    const groups = inquiryGroupStore.visibilityGroups || []
    return groups.map((id: string) => ({ id, displayName: id }))
  },
  set: async (groups: Array<{ id: string; displayName: string }>) => {
    const ids = groups.map(g => g.id)
    try {
      await inquiryGroupStore.updateVisibility({
        visibility: inquiryGroupStore.visibility,
        visibilityGroups: ids,
      })
    } catch (error) {
      showError(t('inquiries', 'Failed to update visibility groups'))
    }
  },
})

const visibilityUsers = computed({
  get: () => {
    const users = inquiryGroupStore.visibilityUsers || []
    return users.map((id: string) => ({ id, displayName: id }))
  },
  set: async (users: Array<{ id: string; displayName: string }>) => {
    const ids = users.map(u => u.id)
    try {
      await inquiryGroupStore.updateVisibility({
        visibility: inquiryGroupStore.visibility,
        visibilityUsers: ids,
      })
    } catch (error) {
      showError(t('inquiries', 'Failed to update visibility users'))
    }
  },
})

const participationGroups = computed({
  get: () => {
    const groups = inquiryGroupStore.participationGroups || []
    return groups.map((id: string) => ({ id, displayName: id }))
  },
  set: async (groups: Array<{ id: string; displayName: string }>) => {
    const ids = groups.map(g => g.id)
    try {
      await inquiryGroupStore.updateParticipation({
        type: inquiryGroupStore.participationType,
        groups: ids,
      })
    } catch (error) {
      showError(t('inquiries', 'Failed to update participation groups'))
    }
  },
})

const participationUsers = computed({
  get: () => {
    const users = inquiryGroupStore.participationUsers || []
    return users.map((id: string) => ({ id, displayName: id }))
  },
  set: async (users: Array<{ id: string; displayName: string }>) => {
    const ids = users.map(u => u.id)
    try {
      await inquiryGroupStore.updateParticipation({
        type: inquiryGroupStore.participationType,
        users: ids,
      })
    } catch (error) {
      showError(t('inquiries', 'Failed to update participation users'))
    }
  },
})

// ============================================================
// INFO TEXT
// ============================================================
const infoText = computed((): string => {
  const visibility = inquiryGroupStore.visibility
  const participation = inquiryGroupStore.participationType
  const pubStatus = inquiryGroupStore.publicationStatus

  const parts: string[] = []

  // Status
  parts.push(t('inquiries', 'Status: {status}', {
    status: publicationStatusLabels[pubStatus] || pubStatus,
  }))

  // Visibility info
  switch (visibility) {
    case 'everyone':
      parts.push(t('inquiries', 'Open to everyone'))
      break
    case 'participants':
      if (inquiryGroupStore.visibilityUsers?.length) {
        parts.push(t('inquiries', 'Visible to {count} participants', {
          count: inquiryGroupStore.visibilityUsers.length,
        }))
      } else {
        parts.push(t('inquiries', 'Visible to participants only'))
      }
      break
    case 'groups':
      if (inquiryGroupStore.visibilityGroups?.length) {
        parts.push(t('inquiries', 'Visible to {count} groups', {
          count: inquiryGroupStore.visibilityGroups.length,
        }))
      } else {
        parts.push(t('inquiries', 'Visible only to the owner'))
      }
      break
    case 'private':
      parts.push(t('inquiries', 'Private (owner only)'))
      break
  }

  // Participation info
  switch (participation) {
    case 'everyone':
      parts.push(t('inquiries', 'Anyone can vote'))
      break
    case 'users':
      if (inquiryGroupStore.participationUsers?.length) {
        parts.push(t('inquiries', '{count} users can vote', {
          count: inquiryGroupStore.participationUsers.length,
        }))
      } else {
        parts.push(t('inquiries', 'No users selected to vote'))
      }
      break
    case 'groups':
      if (inquiryGroupStore.participationGroups?.length) {
        parts.push(t('inquiries', '{count} groups can vote', {
          count: inquiryGroupStore.participationGroups.length,
        }))
      } else {
        parts.push(t('inquiries', 'No groups selected to vote'))
      }
      break
  }

  return parts.join(' • ') || t('inquiries', 'Manage access and voting for this inquiry group')
})

// ============================================================
// ACTIONS
// ============================================================
async function publishGroup() {
  if (!canEdit.value) return
  try {
    await inquiryGroupStore.updatePublicationStatus('published')
    showSuccess(t('inquiries', 'Group published successfully'))
  } catch (error) {
    showError(t('inquiries', 'Failed to publish group'))
  }
}

async function archiveGroup() {
  if (!canEdit.value) return
  try {
    await inquiryGroupStore.archive()
    showSuccess(t('inquiries', 'Group archived successfully'))
  } catch (error) {
    showError(t('inquiries', 'Failed to archive group'))
  }
}

async function resetParticipation() {
  if (!canEdit.value) return
  try {
    await inquiryGroupStore.updateParticipation({
      type: 'everyone',
      groups: [],
      users: [],
    })
    showSuccess(t('inquiries', 'Participation reset to everyone'))
  } catch (error) {
    showError(t('inquiries', 'Failed to reset participation'))
  }
}

// ============================================================
// LIFECYCLE
// ============================================================
onMounted(async () => {
  if (!inquiryGroupStore.id) {
    await inquiryGroupStore.load()
  }
  await sharesStore.load('inquiryGroup')
})
</script>

<template>
  <div class="sidebar-group-access">
    <!-- Header -->
    <div class="access-header">
      <h2>{{ t('inquiries', 'Access & Voting') }}</h2>
      <p class="subtitle">{{ t('inquiries', 'Manage who can view the group and vote on inquiries') }}</p>
    </div>

    <!-- ============================================================
      PUBLICATION STATUS
      ============================================================ -->
    <div class="access-section">
      <div class="section-header">
        <h3>{{ t('inquiries', 'Publication Status') }}</h3>
        <div class="section-badge">
          <span class="badge" :class="inquiryGroupStore.publicationStatus">
            {{ publicationStatusLabels[inquiryGroupStore.publicationStatus] }}
          </span>
        </div>
      </div>
      <p class="section-desc">{{ t('inquiries', 'Control the publication state of this group') }}</p>

      <NcSelect
        :model-value="selectedPublicationStatus"
        :options="publicationStatusOptions"
        :label-outside="true"
        :option-label="(opt: any) => opt.label || opt"
        :option-value="(opt: any) => opt.value || opt"
        :label="t('inquiries', 'Status')"
        :disabled="!canEdit || isSaving"
        @update:model-value="selectedPublicationStatus = $event"
      />

      <!-- Quick actions -->
      <div class="status-actions">
        <NcButton
          v-if="inquiryGroupStore.isDraft || inquiryGroupStore.isPending"
          type="primary"
          :disabled="!canEdit || isSaving"
          @click="publishGroup"
        >
          {{ t('inquiries', 'Publish') }}
        </NcButton>
        <NcButton
          v-if="inquiryGroupStore.isPublished"
          type="warning"
          :disabled="!canEdit || isSaving"
          @click="archiveGroup"
        >
          {{ t('inquiries', 'Archive') }}
        </NcButton>
      </div>
    </div>

    <!-- ============================================================
      VISIBILITY
      ============================================================ -->
    <div class="access-section">
      <div class="section-header">
        <h3>{{ t('inquiries', 'Visibility') }}</h3>
        <div class="section-badge">
          <span class="badge">{{ visibilityOptionLabels[inquiryGroupStore.visibility] }}</span>
        </div>
      </div>
      <p class="section-desc">{{ t('inquiries', 'Who can view this inquiry group and its inquiries') }}</p>

      <NcSelect
        :model-value="selectedVisibility"
        :options="visibilityOptions"
        :label-outside="true"
        :option-label="(opt: any) => opt.label || opt"
        :option-value="(opt: any) => opt.value || opt"
        :label="t('inquiries', 'Visibility')"
        :disabled="!canEdit || isSaving"
        @update:model-value="selectedVisibility = $event"
      />

      <!-- Groups visibility -->
      <div v-if="inquiryGroupStore.visibility === 'groups'" class="config-panel">
        <div class="config-group">
          <label>{{ t('inquiries', 'Visible to specific groups') }}</label>
          <UserSearch
            :model-value="visibilityGroups"
            :search-types="[SEARCH_TYPE_GROUPS]"
            multiple
            :disabled="!canEdit || isSaving"
            :placeholder="t('inquiries', 'Type to search for groups')"
            :aria-label="t('inquiries', 'Select groups that can view this group')"
            @update:model-value="visibilityGroups = $event"
          />
          <span v-if="inquiryGroupStore.visibilityGroups?.length === 0" class="hint">
            {{ t('inquiries', 'No groups selected. Only the owner can view.') }}
          </span>
          <span v-else class="hint">
            {{ t('inquiries', '{count} groups selected', { count: inquiryGroupStore.visibilityGroups?.length || 0 }) }}
          </span>
        </div>
      </div>

      <!-- Participants visibility -->
      <div v-if="inquiryGroupStore.visibility === 'participants'" class="config-panel">
        <div class="config-group">
          <label>{{ t('inquiries', 'Visible to specific participants') }}</label>
          <UserSearch
            :model-value="visibilityUsers"
            :search-types="[SEARCH_TYPE_USERS]"
            multiple
            :disabled="!canEdit || isSaving"
            :placeholder="t('inquiries', 'Type to search for users')"
            :aria-label="t('inquiries', 'Select participants that can view this group')"
            @update:model-value="visibilityUsers = $event"
          />
          <span v-if="inquiryGroupStore.visibilityUsers?.length === 0" class="hint">
            {{ t('inquiries', 'No users selected. Only the owner can view.') }}
          </span>
          <span v-else class="hint">
            {{ t('inquiries', '{count} users selected', { count: inquiryGroupStore.visibilityUsers?.length || 0 }) }}
          </span>
        </div>
      </div>
    </div>

    <!-- ============================================================
      PARTICIPATION
      ============================================================ -->
    <div class="access-section">
      <div class="section-header">
        <h3>{{ t('inquiries', 'Voting Access') }}</h3>
        <div class="section-badge">
          <span class="badge">{{ participationOptionLabels[inquiryGroupStore.participationType] }}</span>
        </div>
      </div>
      <p class="section-desc">{{ t('inquiries', 'Who can vote on inquiries in this group') }}</p>

      <NcSelect
        :model-value="selectedParticipation"
        :options="participationOptions"
        :label-outside="true"
        :option-label="(opt: any) => opt.label || opt"
        :option-value="(opt: any) => opt.value || opt"
        :label="t('inquiries', 'Voting Access')"
        :disabled="!canEdit || isSaving"
        @update:model-value="selectedParticipation = $event"
      />

      <!-- Users participation -->
      <div v-if="inquiryGroupStore.participationType === 'users'" class="config-panel">
        <div class="config-group">
          <label>{{ t('inquiries', 'Select Users') }}</label>
          <UserSearch
            :model-value="participationUsers"
            :search-types="[SEARCH_TYPE_USERS]"
            multiple
            :disabled="!canEdit || isSaving"
            :placeholder="t('inquiries', 'Type to search for users')"
            :aria-label="t('inquiries', 'Select users who can vote')"
            @update:model-value="participationUsers = $event"
          />
          <span v-if="inquiryGroupStore.participationUsers?.length === 0" class="hint">
            {{ t('inquiries', 'No users selected. Only the owner can vote.') }}
          </span>
          <span v-else class="hint">
            {{ t('inquiries', '{count} users selected', { count: inquiryGroupStore.participationUsers?.length || 0 }) }}
          </span>
        </div>
      </div>

      <!-- Groups participation -->
      <div v-if="inquiryGroupStore.participationType === 'groups'" class="config-panel">
        <div class="config-group">
          <label>{{ t('inquiries', 'Select Groups') }}</label>
          <UserSearch
            :model-value="participationGroups"
            :search-types="[SEARCH_TYPE_GROUPS]"
            multiple
            :disabled="!canEdit || isSaving"
            :placeholder="t('inquiries', 'Type to search for groups')"
            :aria-label="t('inquiries', 'Select groups that can vote')"
            @update:model-value="participationGroups = $event"
          />
          <span v-if="inquiryGroupStore.participationGroups?.length === 0" class="hint">
            {{ t('inquiries', 'No groups selected. Only the owner can vote.') }}
          </span>
          <span v-else class="hint">
            {{ t('inquiries', '{count} groups selected', { count: inquiryGroupStore.participationGroups?.length || 0 }) }}
          </span>
        </div>
      </div>

      <!-- Reset button -->
      <div v-if="inquiryGroupStore.participationType !== 'everyone'" class="reset-group">
        <button
          class="reset-button"
          :disabled="!canEdit || isSaving"
          @click="resetParticipation"
        >
          {{ t('inquiries', 'Reset to everyone') }}
        </button>
        <span class="hint">{{ t('inquiries', 'Remove participation restrictions') }}</span>
      </div>
    </div>

    <!-- ============================================================
      SHARES
      ============================================================ -->
    <div class="access-section shares-section">
      <div class="section-header">
        <h3>{{ t('inquiries', 'Public Shares') }}</h3>
        <div class="section-badge">
          <span class="badge">{{ sharesStore.public.length }} {{ t('inquiries', 'links') }}</span>
        </div>
      </div>
      <p class="section-desc">{{ t('inquiries', 'Create public links to share this inquiry group') }}</p>

      <div class="shares-list-wrapper">
        <SharesList class="shares effective" :info="infoText" />
      </div>
    </div>

    <!-- Info text -->
    <div class="info-text">
      <span class="icon">ℹ️</span>
      <span>{{ infoText }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// Keep existing styles - they remain the same
.sidebar-group-access {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 16px;

  .access-header {
    margin-bottom: 4px;

    h2 {
      font-size: 20px;
      font-weight: 700;
      margin: 0;
      color: var(--color-text);
      letter-spacing: -0.3px;
    }

    .subtitle {
      font-size: 14px;
      color: var(--color-text-maxcontrast);
      margin: 4px 0 0;
    }
  }

  .access-section {
    background: var(--color-background-hover);
    border-radius: 12px;
    padding: 18px 20px;
    border: 1px solid var(--color-border);

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 6px;

      h3 {
        font-size: 15px;
        font-weight: 600;
        margin: 0;
        color: var(--color-text);
      }

      .badge {
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        background: var(--color-primary-element);
        color: var(--color-primary-text);
        padding: 2px 12px;
        border-radius: 12px;
        letter-spacing: 0.3px;

        &.draft {
          background: var(--color-warning);
          color: var(--color-text);
        }
        &.pending {
          background: var(--color-warning);
          color: var(--color-text);
        }
        &.published {
          background: var(--color-success);
          color: var(--color-primary-text);
        }
        &.archived {
          background: var(--color-text-maxcontrast);
          color: var(--color-primary-text);
        }
        &.deleted {
          background: var(--color-error);
          color: var(--color-primary-text);
        }
      }
    }

    .section-desc {
      font-size: 13px;
      color: var(--color-text-maxcontrast);
      margin: 0 0 14px;
    }

    .status-actions {
      display: flex;
      gap: 8px;
      margin-top: 12px;
    }
  }

  .config-panel {
    margin-top: 12px;
    padding: 16px;
    background: var(--color-background);
    border-radius: 8px;
    border: 1px solid var(--color-border);

    .config-group {
      margin-bottom: 0;

      label {
        display: block;
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 6px;
        color: var(--color-text);
      }

      .hint {
        display: block;
        font-size: 12px;
        color: var(--color-text-maxcontrast);
        margin-top: 6px;
        opacity: 0.8;
      }
    }
  }

  .reset-group {
    margin-top: 14px;
    padding-top: 14px;
    border-top: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;

    .reset-button {
      background: #856404;
      color: #ffffff;
      border: none;
      padding: 6px 18px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;

      &:hover:not(:disabled) {
        background: #634a03;
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(133, 100, 4, 0.2);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .hint {
      font-size: 12px;
      color: var(--color-text-maxcontrast);
      opacity: 0.8;
    }
  }

  .shares-section {
    .shares-list-wrapper {
      margin-top: 8px;
    }
  }

  .info-text {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 14px 16px;
    background: var(--color-background-dark);
    border-radius: 8px;
    font-size: 13px;
    color: var(--color-text-maxcontrast);
    border: 1px solid var(--color-border);
    line-height: 1.5;

    .icon {
      font-size: 18px;
      flex-shrink: 0;
      margin-top: 1px;
    }
  }

  // Dark mode fixes
  :deep(.vs__search) {
    color: var(--color-text) !important;
  }

  :deep(.vs__dropdown-option) {
    color: var(--color-text) !important;
    background: var(--color-background) !important;

    &:hover {
      background: var(--color-background-hover) !important;
    }
  }

  :deep(.vs__dropdown-option--highlight) {
    background: var(--color-primary-element) !important;
    color: var(--color-primary-text) !important;
  }

  :deep(.vs__selected) {
    color: var(--color-text) !important;
    background: var(--color-background-dark) !important;
  }

  :deep(.vs__dropdown-toggle) {
    background: var(--color-background-dark) !important;
    border-color: var(--color-border) !important;
  }

  :deep(.vs__clear) {
    fill: var(--color-text-maxcontrast) !important;
  }

  :deep(.vs__open-indicator) {
    fill: var(--color-text-maxcontrast) !important;
  }
}
</style>
