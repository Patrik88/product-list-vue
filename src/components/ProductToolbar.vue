<script setup lang="ts">
import { defineProps, defineEmits, toRef } from 'vue'
import ToolbarFilters from './ToolbarFilters.vue'
import ToolbarSearch from './ToolbarSearch.vue'
import ToolbarSort from './ToolbarSort.vue'
import { useToolbarFilters } from '../composables/useToolbarFilters'
import type { ProductToolbarProps, ToolbarFiltersType } from '../types'

const props = defineProps<ProductToolbarProps>()

const emit = defineEmits<{
  (e: 'update:search', value: string): void
  (e: 'update:filters', filters: ToolbarFiltersType): void
}>()

const {
  selectedCategory,
  selectedAvailability,
  selectedSort,
  categoryOptions,
  updateCategory,
  updateAvailability,
  updateSort,
} = useToolbarFilters(toRef(props, 'categories'), (filters) => {
  emit('update:filters', filters)
})
</script>

<template>
  <div style="display: flex; flex-direction: row; gap: 2rem; align-items: flex-end;">
    <!-- Filters -->
    <section style="display: flex; flex-direction: row; gap: 1rem; align-items: flex-end; flex-grow: 1;">
      <ToolbarFilters :selectedCategory="selectedCategory" :selectedAvailability="selectedAvailability"
        :categoryOptions="categoryOptions" @update:category="updateCategory"
        @update:availability="updateAvailability" />
      <ToolbarSearch @update:search="(value) => emit('update:search', value)" />
    </section>

    <!-- Sorting -->
    <section style="display: flex; flex-direction: row; gap: 1rem; align-items: flex-end;">
      <ToolbarSort :selectedSort="selectedSort" @update:sort="updateSort" />
    </section>
  </div>
</template>
