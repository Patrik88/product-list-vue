<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface ToolbarSortProps {
  selectedSort: '' | 'asc' | 'desc'
}

const props = defineProps<ToolbarSortProps>()

const emit = defineEmits<{
  (e: 'update:sort', value: '' | 'asc' | 'desc'): void
}>()

function onSortChange(event: Event) {
  const target = event.target as HTMLSelectElement
  emit('update:sort', target.value as '' | 'asc' | 'desc')
}
</script>

<template>
  <div>
    <label for="sortSelect">Sort by Price:</label>
    <select id="sortSelect" :value="selectedSort" @change="onSortChange" style="width: 10rem;">
      <option value="">None</option>
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  </div>
</template>