<!-- src/components/Settings/AdminSettings/TreeItem.vue -->
<template>
  <div class="tree-item">
    <div class="tree-node" :style="'margin-left: ' + level * 20 + 'px'">
      <span class="tree-label">{{ item.name }}</span>
      <div class="tree-actions">
        <NcButton @click="editItem">
          {{ t('agora', 'Edit') }}
        </NcButton>
        <NcButton @click="deleteItem">
          {{ t('agora', 'Delete') }}
        </NcButton>
      </div>
    </div>
    <div v-if="children.length > 0" class="tree-children">
      <TreeItem
        v-for="child in children"
        :key="child.id"
        :item="child"
        :items="items"
        :level="level + 1"
        :type="type"
        @edit="$emit('edit', $event, type)"
        @delete="$emit('delete', $event, type)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/components/NcButton'

type Item = {
  id: number
  name: string
  children?: Item[]
}

const props = defineProps({
  item: {
    type: Object as PropType<Item>,
    default: () => ({ id: 0, name: '' }),
  },
  items: {
    type: Array as PropType<Item[]>,
    default: () => [],
  },
  level: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    default: 'default',
  },
})

const emit = defineEmits(['edit', 'delete'])

const children = computed(() => props.items.filter((i) => i.parentId === props.item.id))

const editItem = () => {
  emit('edit', props.item, props.type)
}

const deleteItem = () => {
  emit('delete', props.item.id, props.type)
}
</script>

<style scoped>
.tree-item {
  margin-bottom: 8px;
}

.tree-node {
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: var(--color-background-dark);
  border-radius: 8px;
}

.tree-label {
  flex-grow: 1;
  font-weight: bold;
}

.tree-actions {
  display: flex;
  gap: 8px;
}

.tree-children {
  margin-left: 20px;
  margin-top: 8px;
}
</style>
