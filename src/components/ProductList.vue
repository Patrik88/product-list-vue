<script setup lang="ts">
// Vue and third-party imports
import { ref, computed } from 'vue'
// Composable imports
import { useProducts } from '../composables/useProducts'
// Component imports
import ProductToolbar from './ProductToolbar.vue'
import ProductCard from './ProductCard.vue'
import SkeletonCard from './SkeletonCard.vue'
// Type imports
import type { Product } from '../types'

const { data: products, isLoading, isError } = useProducts()

interface ProductListFilters {
  category: string
  availability: string
  sort: '' | 'asc' | 'desc'
}

const searchTerm = ref('')
const filters = ref<ProductListFilters>({
  category: '',
  availability: '',
  sort: ''
})

function handleSearch(value: string) {
  searchTerm.value = value
}

function handleFilters(newFilters: ProductListFilters) {
  filters.value = newFilters
}

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

  // NEW: Sorting by price ascending/descending
  if (filters.value.sort === 'asc') {
    return [...result].sort((a, b) => a?.price - b?.price)
  } else if (filters.value.sort === 'desc') {
    return [...result].sort((a, b) => b?.price - a?.price)
  }

  return result
})
</script>

<template>
  <section aria-labelledby="product-heading">
    <!-- Combined toolbar -->
    <ProductToolbar :categories="products?.map((p) => p.category) || []" @update:search="handleSearch"
      @update:filters="handleFilters" />

    <!-- Loading State -->
    <div v-if="isLoading" class="grid" role="status" aria-live="polite">
      <SkeletonCard v-for="n in 4" :key="n" />
    </div>

    <!-- Error State -->
    <p v-else-if="isError" style="color: var(--pico-del-color);">
      Failed to load products.
    </p>

    <!-- Product Grid (now using filteredProducts) -->
    <div v-else class="grid" role="list">
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>
  </section>
</template>

<style scoped></style>