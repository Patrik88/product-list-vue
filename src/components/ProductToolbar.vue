<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue'

interface ProductToolbarProps {
  categories: string[]
}

const props = defineProps<ProductToolbarProps>()

interface ToolbarFilters {
  category: string
  availability: string
  sort: '' | 'asc' | 'desc'
}

const emit = defineEmits<{
  (e: 'update:search', value: string): void
  (e: 'update:filters', filters: ToolbarFilters): void
}>()

// Search
const searchTerm = ref('')
let debounceTimer: number | undefined

function emitDebouncedSearch() {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  debounceTimer = window.setTimeout(() => {
    emit('update:search', searchTerm.value)
  }, 300)
}

// Filters
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
</script>

<template>
  <div style="display: flex; flex-direction: row; gap: 2rem; align-items: flex-end;">
    <!-- Filters -->
    <section style="display: flex; flex-direction: row; gap: 1rem; align-items: flex-end; flex-grow: 1;">

      <!-- Filters -->
      <form @submit.prevent style="display: flex; flex-direction: row; gap: 1rem;">
        <div>
          <label for="categorySelect">Category:</label>
          <select id="categorySelect" v-model="selectedCategory" @change="emitFilters">
            <option value="">All Categories</option>
            <option v-for="option in categoryOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <div>
          <label for="availabilitySelect">Availability:</label>
          <select id="availabilitySelect" v-model="selectedAvailability" @change="emitFilters">
            <option value="">All</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
      </form>

      <!-- Search Field -->
      <form aria-label="Product Search Form" @submit.prevent style="flex-grow: 1;">
        <input type="text" aria-label="Search Products" placeholder="Search products..." v-model="searchTerm"
          @input="emitDebouncedSearch" class="contrast" />
      </form>
    </section>

    <!-- Sorting -->
    <section style="display: flex; flex-direction: row; gap: 1rem; align-items: flex-end;">
      <div>
        <label for="sortSelect">Sort by Price:</label>
        <select id="sortSelect" v-model="selectedSort" @change="emitFilters" style="width: 10rem;">
          <option value="">None</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </section>
  </div>
</template>
