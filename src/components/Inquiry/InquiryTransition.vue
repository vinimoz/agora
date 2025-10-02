<!--
	- SPDX-FileCopyrightText: 2018 Nextcloud contributors
	- SPDX-License-Identifier: AGPL-3.0-or-later
-->
<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { ref, computed, onMounted } from 'vue'
import { showError } from '@nextcloud/dialogs'
import { useRouter } from 'vue-router'
import { Inquiry, useInquiryStore } from '../../stores/inquiry.ts'
import InquiryItem from './InquiryItem.vue'
import { InquiryTypeValues } from '../../helpers/modules/InquiryHelper.ts'
import NcButton from '@nextcloud/vue/components/NcButton'
import HomeIcon from 'vue-material-design-icons/Home.vue'
import { useCommentsStore } from '../../stores/comments'
import { usePreferencesStore } from '../../stores/preferences.ts'

const props = defineProps({
  isLoadedParent: {
    type: Boolean,
    required: true,
  },
})

const inquiryParent = ref({
  id: null,
  title: '',
  type: '',
  parentId: 0,
  created: null,
  lastInteraction: null,
  owner: '',
  inquiryGroups: [],
  participatedCount: 0,
  commentCount: 0,
  supportCount: 0,
})

const router = useRouter()
const inquiryStore = useInquiryStore()
const commentsStore = useCommentsStore()
const preferencesStore = usePreferencesStore()

const isLoadedLocal = ref(false)

// Declare refs
const inquiry = ref<Inquiry | null>(null)
const hoveredInquiry = ref<Inquiry | null>(null)
const suggestions = ref<Inquiry[]>([])
const grievances = ref<Inquiry[]>([])
const proposals = ref<Inquiry[]>([])
const officials = ref<Inquiry[]>([])
const isMobile = ref(window.innerWidth < 768)

const isGridView = computed(() => preferencesStore.user.defaultViewInquiry === 'table-view')

const emit = defineEmits(['editParent', 'routeChild'])

const editParent = () => {
  emit('editParent')
}

const routeChild = (inquiryId: number) => {
  emit('routeChild', inquiryId)
}

onMounted(async () => {
  if (props.isLoadedParent) {
    try {
      isLoadedLocal.value = false
      await loadInquiryData()
    } catch (error) {
      showError('Failed to load inquiry:', error)
    } finally {
      inquiryParent.value.id = inquiryStore.id
      inquiryParent.value.parentId = inquiryStore.parentId
      inquiryParent.value.title = inquiryStore.title
      inquiryParent.value.type = inquiryStore.type
      inquiryParent.value.owner = inquiryStore.owner
      inquiryParent.value.moderationStatus = inquiryStore.moderationStatus
      inquiryParent.value.status = inquiryStore.status
      inquiryParent.value.configuration = inquiryStore.configuration
      inquiryParent.value.currentUserStatus = inquiryStore.currentUserStatus
      inquiryParent.value.commentCount = commentsStore.comments.length
      inquiryParent.value.supportCount = inquiryStore.status.countSupports
      inquiryParent.value.inquiryGroups = inquiryStore.inquiryGroups

      isLoadedLocal.value = true
    }
  }

  window.addEventListener('resize', handleResize)
})

const handleResize = () => {
  isMobile.value = window.innerWidth < 768
}

// Need to transform the actual to fit the inquiries tab, need to be fxied.
function transformOwner(obj) {
  if (obj.owner && typeof obj.owner === 'string') {
    obj.owner = {
      id: obj.owner,
      displayName: obj.owner,
    }
  }
  return obj
}

const loadInquiryData = async () => {
  // Filter children by type
  suggestions.value = inquiryStore.childs
    .filter((c) => c.type === InquiryTypeValues.SUGGESTION)
    .map(transformOwner)
  grievances.value = inquiryStore.childs
    .filter((c) => c.type === InquiryTypeValues.GRIEVANCE)
    .map(transformOwner)
  proposals.value = inquiryStore.childs
    .filter((c) => c.type === InquiryTypeValues.PROPOSAL)
    .map(transformOwner)
  officials.value = inquiryStore.childs
    .filter((c) => c.type === InquiryTypeValues.OFFICIAL)
    .map(transformOwner)

  // Redirect if needed (for simple non-participated types)
  if (shouldRedirect.value) {
    router.replace({ name: 'inquiry', params: { id: inquiryStore.id } })
  }
  return true
}

// Check if we should redirect to participation form
const shouldRedirect = computed(() => {
  if (!inquiryStore) return false

  const simpleTypes = [
    InquiryTypeValues.SUGGESTION,
    InquiryTypeValues.DEBATE,
    InquiryTypeValues.PETITION,
  ]

  return inquiryStore.participated === 0 && simpleTypes.includes(inquiryStore.type)
})

// Go to home page
const navigateToRoot = () => {
  router.push({ name: 'root' })
}
</script>

<template>
  <div v-if="!isLoadedLocal" class="loading-container">
    <div class="loading-spinner" />
    <p>{{ t('agora', 'Loading inquiry') }}</p>
  </div>

  <div v-else class="transition-form-container">
    <!-- Navigation -->
    <div class="navigation-controls">
      <NcButton @click="navigateToRoot">
        <HomeIcon /><span v-if="!isMobile">{{ t('agora', 'Home') }}</span>
      </NcButton>
    </div>

    <!-- Parent Inquiry -->
    <Transition name="fade">
      <div v-if="isLoadedLocal" class="parent-block">
        <div class="divider" />
        <h3 class="block-title">
          {{ t('agora', 'Main Inquiry') }}
        </h3>
        <div class="divider" />
        <div class="parent-inquiry-container">
          <InquiryItem
            :key="inquiryParent.id"
            :inquiry="inquiryParent"
            :no-link="false"
            :grid-view="false"
            @click="editParent"
            @mouseover="hoveredInquiry = inquiry"
          />
        </div>
      </div>
    </Transition>

    <!-- Children Blocks -->
    <TransitionGroup name="list" tag="div" class="children-blocks">
      <!-- Suggestions -->
      <div v-if="suggestions.length" key="suggestions" class="block-container">
        <div class="divider" />
        <h3 class="block-title">
          {{ t('agora', 'Suggestions') }}
        </h3>
        <div class="divider" />
        <TransitionGroup
          name="list-inner"
          tag="div"
          :class="isGridView ? 'inquiry-list__grid' : 'inquiry-list__list'"
        >
          <InquiryItem
            v-for="child in suggestions"
            :key="child.id"
            :inquiry="child"
            :no-link="false"
            :grid-view="isGridView"
            @click="routeChild(child.id)"
          />
        </TransitionGroup>
      </div>

      <!-- Grievances -->
      <div v-if="grievances.length" key="grievances" class="block-container">
        <div class="divider" />
        <h3 class="block-title">
          {{ t('agora', 'Grievance') }}
        </h3>
        <div class="divider" />
        <TransitionGroup
          name="list-inner"
          tag="div"
          :class="isGridView ? 'inquiry-list__grid' : 'inquiry-list__list'"
        >
          <InquiryItem
            v-for="child in grievances"
            :key="child.id"
            :inquiry="child"
            :no-link="false"
            :grid-view="isGridView"
            @click="routeChild(child.id)"
          />
        </TransitionGroup>
      </div>

      <!-- Proposals -->
      <div v-if="proposals.length" key="proposals" class="block-container">
        <div class="divider" />
        <h3 class="block-title">
          {{ t('agora', 'Proposals') }}
        </h3>
        <div class="divider" />
        <TransitionGroup
          name="list-inner"
          tag="div"
          :class="isGridView ? 'inquiry-list__grid' : 'inquiry-list__list'"
        >
          <InquiryItem
            v-for="child in proposals"
            :key="child.id"
            :inquiry="child"
            :no-link="false"
            :grid-view="isGridView"
            @click="routeChild(child.id)"
          />
        </TransitionGroup>
      </div>
    </TransitionGroup>

    <!-- Official Block -->
    <Transition name="fade">
      <div v-if="officials.length" class="official-block">
        <div class="divider" />
        <h3 class="block-title">
          {{ t('agora', 'Official Response') }}
        </h3>
        <div class="divider" />
        <TransitionGroup
          name="list-inner"
          tag="div"
          :class="isGridView ? 'inquiry-list__grid' : 'inquiry-list__list'"
        >
          <InquiryItem
            v-for="child in officials"
            :key="child.id"
            :inquiry="child"
            :no-link="false"
            :grid-view="false"
            @click="routeChild(child.id)"
          />
        </TransitionGroup>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.transition-form-container {
  padding: 10px;
  background: var(--color-main-background);
  border-radius: var(--border-radius-large);
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;

  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 5px solid var(--color-background-darker);
    border-top: 5px solid var(--color-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  p {
    color: var(--color-text-lighter);
  }
}

/* Transition effects */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}

.list-inner-move {
  transition: all 0.3s ease;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.navigation-controls {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;

  .back-button,
  .home-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 8px 16px;
    background: var(--color-background-dark);
    border-radius: var(--border-radius);

    &:hover {
      background: var(--color-primary-element-light);
    }
  }
}

.block-container {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 2rem;

  &.parent-block {
    margin-bottom: 2rem;
  }
}

.parent-block :deep(.inquiry-item) {
  &.list-view {
    min-height: 180px !important;
    align-items: center;
  }

  &.grid-view .grid-card {
    min-height: 250px !important;
  }
}

.block-title {
  margin: 0;
  color: var(--color-primary);
  font-weight: 600;
  font-size: 1.3rem;
  text-align: center;
}

.divider {
  height: 2px;
  background: var(--color-border);
  width: 100%;
  margin: 0.5rem 0;
}

.children-blocks {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
}

.inquiry-list__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
  align-items: stretch;
}

.inquiry-list__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.official-block {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 2px solid var(--color-border);
}

/* Mobile styles */
@media (max-width: 768px) {
  .transition-form-container {
    padding: 1rem;
  }

  .navigation-controls {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--color-main-background);
    padding: 0.8rem 0.5rem;
    margin: -0.5rem -0.5rem 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .children-blocks {
    gap: 1.8rem;
  }

  .inquiry-list__grid {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 12px;
  }
}

@media (max-width: 1024px) {
  .inquiry-list__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1400px) {
  .inquiry-list__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1600px) {
  .inquiry-list__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
