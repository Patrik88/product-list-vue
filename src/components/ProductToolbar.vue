<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue'
import ToolbarFilters from './ToolbarFilters.vue'
import ToolbarSearch from './ToolbarSearch.vue'
import ToolbarSort from './ToolbarSort.vue'

interface ProductToolbarProps {
  categories: string[]
}

const props = defineProps<ProductToolbarProps>()

interface ToolbarFiltersType {
  category: string
  availability: string
  sort: '' | 'asc' | 'desc'
}

const emit = defineEmits<{
  (e: 'update:search', value: string): void
  (e: 'update:filters', filters: ToolbarFiltersType): void
}>()

// Manage filter state in the parent
const selectedCategory = ref('')
const selectedAvailability = ref('')
const selectedSort = ref<'' | 'asc' | 'desc'>('')

const categoryOptions = computed(() => {
  // Remove duplicates
  const uniqueCategories = new Set(props.categories)
  return Array.from(uniqueCategories)
})

function emitFilters() {
  emit('update:filters', {
    category: selectedCategory.value,
    availability: selectedAvailability.value,
    sort: selectedSort.value
  })
}

function handleCategoryUpdate(value: string) {
  selectedCategory.value = value
  emitFilters()
}

function handleAvailabilityUpdate(value: string) {
  selectedAvailability.value = value
  emitFilters()
}

function handleSortUpdate(value: '' | 'asc' | 'desc') {
  selectedSort.value = value
  emitFilters()
}

function handleSearchUpdate(value: string) {
  // Simply re-emit the search event from the child
  emit('update:search', value)
}
</script>

<template>
  <div style="display: flex; flex-direction: row; gap: 2rem; align-items: flex-end;">
    <section style="display: flex; flex-direction: row; gap: 1rem; align-items: flex-end; flex-grow: 1;">
      <!-- Filters (Category & Availability) -->
      <ToolbarFilters :selectedCategory="selectedCategory" :selectedAvailability="selectedAvailability"
        :categoryOptions="categoryOptions" @update:category="handleCategoryUpdate"
        @update:availability="handleAvailabilityUpdate" />
      <!-- Search Field -->
      <ToolbarSearch @update:search="handleSearchUpdate" />
    </section>

    <!-- Sorting -->
    <section style="display: flex; flex-direction: row; gap: 1rem; align-items: flex-end;">
      <ToolbarSort :selectedSort="selectedSort" @update:sort="handleSortUpdate" />
    </section>
  </div>
</template>
