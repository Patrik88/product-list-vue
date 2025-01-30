<script setup lang="ts">
import { useProducts } from '../composables/useProducts'
import { ref, computed } from 'vue'
import ProductToolbar from './ProductToolbar.vue'

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

const filteredProducts = computed(() => {
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
    <h2>Products</h2>

    <!-- Combined toolbar -->
    <ProductToolbar :categories="products?.map((p) => p.category) || []" @update:search="handleSearch"
      @update:filters="handleFilters" />

    <!-- Loading State -->
    <div v-if="isLoading" class="grid" role="status" aria-live="polite">
      <article v-for="n in 4" :key="n" role="listitem" class="skeleton">
        <figure class="skeleton-image"></figure>
        <h3 class="skeleton-text"></h3>
        <p class="skeleton-text"></p>
        <p class="skeleton-text"></p>
      </article>
    </div>

    <!-- Error State -->
    <p v-else-if="isError" style="color: var(--pico-del-color);">
      Failed to load products.
    </p>

    <!-- Product Grid (now using filteredProducts) -->
    <div v-else class="grid" role="list">
      <article v-for="product in filteredProducts" :key="product.id" role="listitem">
        <figure class="image-container">
          <img :src="product.image" :alt="`Image of ${product.name}`" loading="lazy" />
        </figure>
        <h3 style="--pico-font-size: 1.2rem;">{{ product.name }}</h3>
        <p style="color: var(--pico-primary);">{{ product.formattedPrice }}</p>
        <p style="color: var(--pico-secondary);">Category: {{ product.category }}</p>
        <p v-if="!product.available" aria-live="polite" style="color: var(--pico-del-color);">
          Not Available
        </p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.skeleton {
  background-color: var(--pico-muted-border-color);
  padding: 1rem;
  /* border-radius: 0.5rem; */
  height: 500.5px;
}

.skeleton-image {
  width: 100%;
  padding-top: 66.67%;
  /* Maintain the 6:4 aspect ratio */
  background-color: var(--pico-secondary-hover-background);
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
}

.skeleton-text {
  height: 1rem;
  background-color: var(--pico-secondary-hover-background);
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
}

.image-container {
  position: relative;
  width: 100%;
  padding-top: 66.67%;
  /* 6:4 aspect ratio */
  background-color: var(--pico-muted-border-color);
  border-radius: 0.5rem;
  overflow: hidden;
}

.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>