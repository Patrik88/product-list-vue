<script setup lang="ts">
// Composable imports
import { useProductData } from '../composables/useProductData'
import { useProductFilters } from '../composables/useProductFilters'
// Component imports
import ProductToolbar from './ProductToolbar.vue'
import ProductCard from './ProductCard.vue'
import SkeletonCard from './SkeletonCard.vue'

// Data fetching  
const { data: products, isLoading, isError } = useProductData()

// Product filtering
const {
  filteredProducts,
  handleSearch,
  handleFilters
} = useProductFilters(products)
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