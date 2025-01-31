import { computed, ref, type Ref } from 'vue'
import type { Product } from '../types'

interface ProductListFilters {
  category: string
  availability: string
  sort: '' | 'asc' | 'desc'
}

export function useProductFilters(products: Ref<Product[] | undefined>) {
  const searchTerm = ref('')
  const filters = ref<ProductListFilters>({
    category: '',
    availability: '',
    sort: ''
  })

  const filteredProducts = computed<Product[]>(() => {
    if (!products.value) return []

    const result = products.value.filter((product) => {
      // Filter by category
      if (filters.value.category && product.category !== filters.value.category) return false

      // Filter by availability
      if (filters.value.availability === 'available' && !product.available) return false
      if (filters.value.availability === 'unavailable' && product.available) return false

      // Filter by search term
      if (
        searchTerm.value &&
        !product.name.toLowerCase().includes(searchTerm.value.toLowerCase())
      ) {
        return false
      }

      return true
    })

    // Sorting by price ascending/descending
    if (filters.value.sort === 'asc') {
      return [...result].sort((a, b) => a.price - b.price)
    } else if (filters.value.sort === 'desc') {
      return [...result].sort((a, b) => b.price - a.price)
    }

    return result
  })

  function handleSearch(value: string) {
    searchTerm.value = value
  }

  function handleFilters(newFilters: ProductListFilters) {
    filters.value = newFilters
  }

  return {
    searchTerm,
    filters,
    filteredProducts,
    handleSearch,
    handleFilters
  }
} 