import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import type { ToolbarFiltersType } from '../types'

export function useToolbarFilters(
  categories: Ref<string[]>,
  onUpdate: (filters: ToolbarFiltersType) => void
) {
  const selectedCategory = ref('')
  const selectedAvailability = ref('')
  const selectedSort = ref<'' | 'asc' | 'desc'>('')

  const categoryOptions = computed(() => Array.from(new Set(categories.value)))

  function updateFilters() {
    const filters: ToolbarFiltersType = {
      category: selectedCategory.value,
      availability: selectedAvailability.value,
      sort: selectedSort.value,
    }
    onUpdate(filters)
  }

  function updateCategory(value: string) {
    selectedCategory.value = value
    updateFilters()
  }

  function updateAvailability(value: string) {
    selectedAvailability.value = value
    updateFilters()
  }

  function updateSort(value: '' | 'asc' | 'desc') {
    selectedSort.value = value
    updateFilters()
  }

  return {
    selectedCategory,
    selectedAvailability,
    selectedSort,
    categoryOptions,
    updateCategory,
    updateAvailability,
    updateSort,
  }
} 