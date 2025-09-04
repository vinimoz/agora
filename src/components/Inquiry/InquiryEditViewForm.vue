<!--
	- SPDX-FileCopyrightText: 2018 Nextcloud contributors
	- SPDX-License-Identifier: AGPL-3.0-or-later
-->
<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { subscribe, unsubscribe } from '@nextcloud/event-bus';
import { showSuccess, showError } from '@nextcloud/dialogs';
import { useInquiryStore } from '../../stores/inquiry';
import { useSupportsStore } from '../../stores/supports';
import { useCommentsStore } from '../../stores/comments';
import { useSessionStore } from '../../stores/session';
import { BaseEntry, Event } from '../../Types/index.ts';
import { t } from '@nextcloud/l10n';
import { useInquiryPermissions } from '../../composables/useInquiryPermissions.ts'
import {
  InquiryTypesUI,
  InquiryTypeValues,
  confirmAction
} from '../../helpers/modules/InquiryHelper.ts';
import { DateTime } from 'luxon';
import NcSelect from '@nextcloud/vue/components/NcSelect';
import NcButton from '@nextcloud/vue/components/NcButton';
import InquiryItemActions from './InquiryItemActions.vue';
import NcActions from '@nextcloud/vue/components/NcActions';
import { InputDiv } from '../Base/index.ts';
import { ThumbIcon } from '../AppIcons';
import InquiryEditor from '../Editor/InquiryEditor.vue';
import { NcTextArea, NcRichText } from '@nextcloud/vue';
import { InquiryGeneralIcons } from '../../utils/icons.ts';
import { 
  canEdit,
  canDelete,
  canSupport,
  canComment,
  canViewToggle,
  createPermissionContextForContent, 
  ContentType 
} from '../../utils/permissions.ts'

// The constant store declaration
const sessionStore = useSessionStore();
const commentsStore = useCommentsStore();
const supportsStore = useSupportsStore();
const inquiryStore = useInquiryStore();
const router = useRouter();

const context = computed(() => {
  return createPermissionContextForContent(
    ContentType.Inquiry,
    inquiryStore.owner.id,
    inquiryStore.configuration.access === 'public',
    inquiryStore.status.isLocked,
    inquiryStore.status.isExpired,
    inquiryStore.status.deletionDate > 0,
    inquiryStore.status.isArchived,
    inquiryStore.inquiryGroups.length > 0,
    inquiryStore.inquiryGroups,
    inquiryStore.type
  )
})

// Form fields
const selectedCategory = ref(inquiryStore.categoryId || 0);
const selectedLocation = ref(inquiryStore.locationId || 0);

const isSaving = ref(false);
const isLoaded = ref(false);

const isReadonlyDescription = ref(true) 

const hasSupported = computed(() => {
  const result = supportsStore.hasSupport(
    inquiryStore.id,
    sessionStore.currentUser.id
  );
  return result;
});

// All regarding Location and category
// To display in case of read only category
function getHierarchyPath(items, targetId) {
  const itemMap = {};

  items.forEach((item) => {
    itemMap[item.id] = item;
  });

  if (!itemMap[targetId]) {
    return 'ID not found';
  }

  function buildPath(item) {
    if (item.parentId === 0) {
      return item.name;
    }
    const parent = itemMap[item.parentId];
    if (parent) {
      return `${buildPath(parent)} -> ${item.name}`;
    }
    return item.name;
  }

  return buildPath(itemMap[targetId]);
}

watch(
  selectedLocation,
  (newVal) => {
    const rawValue = toRaw(newVal);

    if (rawValue) {
      inquiryStore.locationId = rawValue.value;
    }
  },
  { deep: true }
);

watch(
  selectedCategory,
  (newVal) => {
    const rawValue = toRaw(newVal);

    if (rawValue) {
      inquiryStore.categoryId = rawValue.value;
    }
  },
  { deep: true }
);

// BUILD AND DISPLAY CORRECT LOCATION AND CATEGORY
function buildHierarchy(list: BaseEntry[], parentId = 0, depth = 0): BaseEntry[] {
  if (!Array.isArray(list)) return [];
  return list
    .filter((item) => item?.parentId === parentId)
    .map((item) => {
      const children = buildHierarchy(list, item.id, depth + 1);
      return {
        ...item,
        depth,
        children
      };
    })
    .flatMap((item) => [item, ...item.children]);
}

const hierarchicalLocation = computed(() => {
  if (!Array.isArray(sessionStore.appSettings.locationTab)) return [];

  return buildHierarchy(sessionStore.appSettings.locationTab).map(item => ({
    value: item.id,
    label: `${'— '.repeat(item.depth ?? 0)}${item.name ?? '[no name]'}`,
    original: item
  }));
});

watch(hierarchicalLocation, (locations) => {
  if (!locations.length) return;

  if (inquiryStore.locationId === 0) {
    selectedLocation.value = locations[0];
    inquiryStore.locationId = locations[0].value;
  } else {
    const selected = locations.find(loc => loc.value === inquiryStore.locationId);
    selectedLocation.value = selected || locations[0];
    inquiryStore.locationId = selected?.value || locations[0].value;
  }
}, { immediate: true });

const hierarchicalCategory = computed(() => {
  if (!Array.isArray(sessionStore.appSettings.categoryTab)) return [];

  return buildHierarchy(sessionStore.appSettings.categoryTab).map(item => ({
    value: item.id,
    label: `${'— '.repeat(item.depth ?? 0)}${item.name ?? '[no name]'}`,
    original: item
  }));
});

watch(hierarchicalCategory, (categories) => {
  if (!categories.length) return;

  if (inquiryStore.categoryId === 0) {
    selectedCategory.value = categories[0];
    inquiryStore.categoryId = categories[0].value;
  } else {
    const selected = categories.find(loc => loc.value === inquiryStore.categoryId);
    selectedCategory.value = selected || categories[0];
    inquiryStore.categoryId = selected?.value || categories[0].value;
  }
}, { immediate: true });


const isReadonly = computed(() => {
  const user = sessionStore.currentUser;
  
  if (!user) return true;
  const ronly=!canEdit(context.value) 
//  const ronly = !(inquiryStore.currentUserStatus.isOwner ||
  //  		user.isAdmin ||
    //		(user.isOfficial && inquiryStore.type === 'official') ||
    //		(user.isModerator && inquiryStore.type !== 'official'));
  
  if (inquiryStore.type === 'debate') {
	   isReadonlyDescription.value=false
  } else isReadonlyDescription.value=ronly

return ronly;
});

watch(
  () => inquiryStore.type,
  (newType) => {
    if (newType === 'debate') {
      isReadonlyDescription.value = false
    } else {
      isReadonlyDescription.value = isReadonly.value
    }
  },
  { immediate: true } 
)


// Toggle thumb
const onToggleSupport = async () => {
  supportsStore.toggleSupport(inquiryStore.id, sessionStore.currentUser.id);
  if (!hasSupported.value)
    showSuccess(t('agora', 'Inquiry supported, thanks for her !'), {
      timeout: 2000
    });
  else showSuccess(t('agora', 'Inquiry support removed !'), { timeout: 2000 });
};

onMounted(() => {
  ///console.log(" CAN  COMMENT ", canComment(context.value))
  ///console.log(" CAN  SUPPORT ", canSupport(context.value))
  subscribe(Event.UpdateComments, () => commentsStore.load());
  subscribe(Event.UpdateSupports, () => supportsStore.load());
  isLoaded.value=true
});

onUnmounted(() => {
  isLoaded.value=false
  unsubscribe(Event.UpdateComments, () => commentsStore.load());
  unsubscribe(Event.UpdateSupports, () => supportsStore.load());
});

/// Toggle the update of the inquiry
const saveChanges = async () => {
  if (isSaving.value) return;

  if (!inquiryStore.title || inquiryStore.title.trim() === '') {
    showError(t('agora', 'Title mandatory'), { timeout: 2000 });
    return;
  }

  isSaving.value = true;

  try {
    await inquiryStore.update({
      id: inquiryStore.id,
      type: inquiryStore.type,
      title: inquiryStore.title,
      description: inquiryStore.description,
      categoryId: inquiryStore.categoryId,
      locationId: inquiryStore.locationId,
      parentId: inquiryStore.parentId
    });
    showSuccess(t('agora', 'The inquiry has been saved'), { timeout: 2000 });
  } catch {
    showError(t('agora', 'Inquiry error during save !'), { timeout: 2000 });
  } finally {
    isSaving.value = false;
  }
};

// Title validation

const timeCreatedRelative = computed(() =>
  inquiryStore.status.created
    ? (DateTime.fromMillis(
      inquiryStore.status.created * 1000
    ).toRelative() as string)
    : ''
);

const timeUpdatedRelative = computed(() =>
  inquiryStore.status.lastInteraction
    ? (DateTime.fromMillis(
      inquiryStore.status.lastInteraction * 1000
    ).toRelative() as string)
    : ''
);

const typeLabel = computed(() =>
  InquiryTypesUI[inquiryStore.type]?.label ?? inquiryStore.type
);

// Determine if category/location should be shown as select or label
const showCategoryAsLabel = computed(() => {
  if (inquiryStore.parentId !== 0) return true;
  if (isReadonly.value) return true;
  return false;
});

const showLocationAsLabel = computed(() => {
  if (inquiryStore.parentId !== 0) return true;
  if (isReadonly.value) return true;
  return false;
});

const createChildInquiry = async (type: InquiryTypeValues): Promise<void> => {
  if (isSaving.value) return;

  const confirmed = await confirmAction(
    `Do you really want to reply to this inquiry with a ${type} ?`
  );
  if (!confirmed) return;

  isSaving.value = true;

  try {
    const inquiry = await inquiryStore.add({
      type,
      title: `${t('agora', 'Response')}: ${inquiryStore.title.trim()}`,
      categoryId: inquiryStore.categoryId,
      locationId: inquiryStore.locationId,
      parentId: inquiryStore.id
    });

    if (inquiry) {
		showSuccess(t('agora', "Inquiry {title} added", { title: inquiry.title }));
      router.push({
        name: 'inquiry',
        params: { id: inquiry.id }
      });
    }
  } catch (error) {
    console.error('Create child inquiry error:', error);
    showError(
      t(
        'agora',
        error instanceof Error ? error.message : 'Inquiry error during save!'
      ),
      { timeout: 2000 }
    );
  } finally {
    isSaving.value = false;
  }
};

const allowedTypesForActions = computed(() => [
  InquiryTypeValues.PROJECT,
  InquiryTypeValues.PROPOSAL,
  InquiryTypeValues.GRIEVANCE
]);

// Check if actions menu should be shown
const showActionsMenu = computed(
  () =>
    isReadonly.value && allowedTypesForActions.value.includes(inquiryStore.type)
);

// Check if response button should be shown
const showResponseButton = computed(
  () =>
    sessionStore.currentUser?.isOfficial &&
    inquiryStore.type !== InquiryTypeValues.OFFICIAL
);

// Check if save button should be shown
const showSaveButton = computed(() => !isReadonlyDescription.value);

</script>

<template>
  <div v-if="isLoaded" class="finalize-form-container">
    <!-- TOP BLOCK: Dates and action buttons -->
    <div class="top-block">
      <div class="date-info">
        <div v-if="inquiryStore.status.created" class="date-item">
          <span class="date-label">{{ t('agora', 'Created at:') }}</span>
          <span class="date-value">{{ timeCreatedRelative }}</span>
        </div>
        <div v-if="inquiryStore.status.lastInteraction" class="date-item">
          <span class="date-label">{{ t('agora', 'Updated at:') }}</span>
          <span class="date-value">{{ timeUpdatedRelative }}</span>
        </div>
      </div>

      <div class="action-buttons">
        <!-- Save button moved to top right -->
        <NcButton
          v-if="showSaveButton"
          :disabled="isSaving"
          type="button"
          color="primary"
          class="save-button"
          @click.prevent="saveChanges"
        >
          {{ t('agora', 'Save') }}
        </NcButton>

        <NcButton
          v-if="showResponseButton"
          class="response-button"
          @click="createChildInquiry(InquiryTypeValues.OFFICIAL)"
        >
          {{ t('agora', 'Official') }}
        </NcButton>
        <div v-if="showActionsMenu">
          <template v-if="inquiryStore.type === InquiryTypeValues.PROJECT">
            <button
              class="icon-button"
              :title="t('agora', 'Create Proposal')"
              @click="createChildInquiry(InquiryTypeValues.PROPOSAL)"
            >
              <component
                :is="InquiryTypesUI[InquiryTypeValues.PROPOSAL].icon"
                class="icon"
              />
            </button>
            <button
              class="icon-button"
              :title="t('agora', 'Create Grievance')"
              @click="createChildInquiry(InquiryTypeValues.GRIEVANCE)"
            >
              <component
                :is="InquiryTypesUI[InquiryTypeValues.GRIEVANCE].icon"
                class="icon"
              />
            </button>
          </template>

          <template
            v-else-if="inquiryStore.type === InquiryTypeValues.PROPOSAL"
          >
            <button
              class="icon-button"
              :title="t('agora', 'Create Suggestion')"
              @click="createChildInquiry(InquiryTypeValues.SUGGESTION)"
            >
              <component
                :is="InquiryTypesUI[InquiryTypeValues.SUGGESTION].icon"
                class="icon"
              />
            </button>
            <button
              class="icon-button"
              :title="t('agora', 'Create Grievance')"
              @click="createChildInquiry(InquiryTypeValues.GRIEVANCE)"
            >
              <component
                :is="InquiryTypesUI[InquiryTypeValues.GRIEVANCE].icon"
                class="icon"
              />
            </button>
          </template>

          <template
            v-else-if="inquiryStore.type === InquiryTypeValues.GRIEVANCE"
          >
            <button
              class="icon-button"
              :title="t('agora', 'Create Suggestion')"
              @click="createChildInquiry(InquiryTypeValues.SUGGESTION)"
            >
              <component
                :is="InquiryTypesUI[InquiryTypeValues.SUGGESTION].icon"
                class="icon"
              />
            </button>
          </template>
        </div>

        <div
          v-if="sessionStore.currentUser.isOwner ||
                sessionStore.currentUser.isAdmin ||
                sessionStore.currentUser.isModerator ||
                (sessionStore.currentUser.isOfficial &&
                inquiryStore.type === 'official')"
	  :style="{ display: 'inline-block', position: 'relative' }">
         <InquiryItemActions
  			:key="`actions-${inquiryStore.id}`"
  			:inquiry="inquiryStore"
	 /> 
        
        </div>
      </div>
    </div>
    <form class="inquiry-form">
      <!-- BLOCK: Basic Information -->
      <div class="form-section">
        <div class="section-header">
          <div class="type-display">
            <component
              :is="InquiryTypesUI[inquiryStore.type].icon"
              class="type-icon"
            />
            <span class="section-title">{{ typeLabel }} :</span>
            <div v-if="inquiryStore.readlonly">
              <span class="type-field inline">{{ inquiryStore.title }}</span>
            </div>
            <div v-else class="form-row">
              <InputDiv
                v-model="inquiryStore.title"
                type="text"
                :disabled="isReadonly"
                :readonly="isReadonly"
                class="form-input"
                @change="emit('change')"
              />
            </div>
          </div>
          <div v-if="canComment(context)" class="counters">
            <div class="counter-item">
              <component :is="InquiryGeneralIcons.comment" :size="24" />
              <span>{{ commentsStore.comments.length || 0 }}</span>
            </div>
	  </div>
          <div v-if="canSupport(context)" class="counter-item" @click="onToggleSupport">
              <ThumbIcon :supported="hasSupported" />
              <span>{{ supportsStore.supports.length || 0 }}</span>
          </div>
        </div>

        <div class="form-row double-columns">
          <div class="form-field">
            <label class="type-label">{{ t('agora', 'Location') }} :</label>
            <NcSelect
              v-if="!showLocationAsLabel"
              v-model="selectedLocation"
              :options="hierarchicalLocation"
              :clearable="false"
              class="select-field location-select narrow-select"
              required
            />
            <div v-else class="readonly-value">
              {{
                getHierarchyPath(
                  sessionStore.appSettings.locationTab,
                  inquiryStore.locationId
                ) || t('agora', 'Inherited from parent')
              }}
            </div>
          </div>
          <div class="form-field">
            <label class="type-label">{{ t('agora', 'Category') }} :</label>
            <NcSelect
              v-if="!showCategoryAsLabel"
              v-model="selectedCategory"
              :options="hierarchicalCategory"
              :clearable="false"
              class="select-field category-select narrow-select"
              required
            />
            <div v-else class="readonly-value">
              {{
                getHierarchyPath(
                  sessionStore.appSettings.categoryTab,
                  inquiryStore.categoryId
                ) || t('agora', 'Inherited from parent')
              }}
            </div>
          </div>
        </div>
      </div>

      <!-- BLOCK: Editor/Description -->
      <div
        v-if="
          sessionStore.appSettings.inquiryTypeRights[inquiryStore.type]
            .editorType === 'wysiwyg'
        "
      >
        <div class="form-section">
          <div class="form-container" style="height: 500px">
            <span class="section-title">{{
              t('agora', 'Detailed Description')
            }}</span>
            <InquiryEditor
              v-model="inquiryStore.description"
              :readonly="isReadonlyDescription"
            />
          </div>
        </div>
      </div>

      <div
        v-else-if="
          sessionStore.appSettings.inquiryTypeRights[inquiryStore.type]
            .editorType === 'texteditor'
        "
      >
        <div class="form-section">
          <div class="form-container">
            <span class="section-title">{{
              t('agora', 'Detailed Description')
            }}</span>
            <NcRichText
              v-model="inquiryStore.description"
              :autolink="autolink"
              :arguments="userMentions"
              :use-markdown="useMarkdown"
              :use-extended-markdown="useExtendedMarkdown"
              :disabled="isReadonlyDescription"
              class="w-full"
              style="min-height: 400px; max-height: 500px"
            />
          </div>
        </div>
      </div>

      <div v-else>
        <div class="form-section">
          <div class="form-container" style="height: 500px">
            <span class="section-title">{{
              t('agora', 'Detailed Description')
            }}</span>
            <NcTextArea
              v-model="inquiryStore.description"
              :disabled="isReadonlyDescription"
              class="w-full"
              style="min-height: 200px; max-height: 300px"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.finalize-form-container {
  padding: 10px;
  background: var(--color-main-background);
  border-radius: var(--border-radius-large);
}

.form-container {
  flex-grow: 1;
  min-height: 200px;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background: var(--color-main-background);
  padding: 1rem;
  overflow: hidden; /* Important pour les transitions */
}

/* Version étendue */
.form-section.expanded .form-container {
  height: 500px;
}

/* Version compacte */
.form-section:not(.expanded) .form-container {
  height: 300px;
}

.inline {
  display: inline;
  margin: 0;
  padding: 0;
}

.top-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
  background: var(--color-background-dark);
  border-radius: var(--border-radius-large);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.date-info {
  display: flex;
  gap: 1.5rem;
  font-size: 0.85rem;
}

.date-item {
  display: flex;
  align-items: center;
}

.date-label {
  color: var(--color-primary);
  font-weight: 500;
  margin-right: 4px;
}

.date-value {
  color: var(--color-text-lighter);
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.save-button {
  background-color: var(--color-primary);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: var(--border-radius);
  font-weight: 500;
}

.response-button {
  background-color: var(--color-primary);
  border-radius: var(--border-radius);
  color: white;
  border: none;
  padding: 8px 16px;
  font-weight: 500;
}

.actions-menu {
  margin-left: 10px;
}

.inquiry-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--color-background-dark);
  border-radius: var(--border-radius-large);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.section-title {
  color: var(--color-primary);
  display: flex;
  font-size: 1rem;
  font-weight: 800;
  display: inline-block;
  margin: 0;
  padding: 0;
  justify-content: space-between;
  align-items: left;
  flex-wrap: wrap;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.type-display {
  display: flex;
  align-items: center;
  gap: 8px;
}

.type-icon {
  width: 24px;
  height: 24px;
  color: var(--color-primary);
}

.type-label {
  font-weight: 600;
  color: var(--color-primary);
  text-transform: capitalize;
}

.counters {
  display: flex;
  gap: 1.5rem;
}

.counter-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  span {
    font-weight: bold;
  }
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &.double-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }
}

.form-field {
  width: 100%;
}

.form-input {
  width: 500px;
}

.readonly-value {
  padding: 8px;
  background: var(--color-background-darker);
  border-radius: var(--border-radius);
  font-size: 0.9rem;
}

/* Select field adjustments */
.select-field {
  width: 100%;

  &.narrow-select {
    max-width: 200px;
  }
}

.link-section {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.link-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: max-content;
  padding: 8px 12px;
}

.html-content {
  padding: 16px;
  background: var(--color-background-darker);
  border-radius: var(--border-radius);
  border: 1px solid var(--color-border);
}

.debate-integration {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.integration-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 8px 12px;
}

@media (max-width: 600px) {
  .top-block {
    flex-direction: column;
    align-items: stretch;
  }

  .date-info {
    flex-direction: column;
    gap: 0.5rem;
  }

  .action-buttons {
    justify-content: flex-end;
    width: 100%;
    margin-top: 10px;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .counters {
    width: 100%;
    justify-content: space-between;
  }

  .link-section,
  .debate-integration {
    flex-direction: column;
    align-items: stretch;
  }

  .link-button,
  .integration-button {
    width: 100%;
  }

  .select-field.narrow-select {
    max-width: 100%;
  }
  .loading-icon {
    display: inline-block;
    animation: spin 1s linear infinite;
    margin-right: 8px;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
