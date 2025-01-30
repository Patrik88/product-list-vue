<script setup lang="ts">
import { useProducts } from '../composables/useProducts'

const { data: products, isLoading, isError } = useProducts()
</script>

<template>
  <section aria-labelledby="product-heading">
    <h2>Products</h2>

    <!-- Loading State -->
    <p v-if="isLoading" role="status" aria-live="polite" style="color: var(--pico-muted-color);">
      Loading products, please wait...
    </p>

    <!-- Error State -->
    <p v-else-if="isError" style="color: var(--pico-del-color);">
      Failed to load products.
    </p>

    <!-- Product Grid -->
    <div v-else class="grid" role="list">
      <article v-for="product in products" :key="product.id" role="listitem">
        <figure>
          <img :src="product.image" :alt="`Image of ${product.name}`" loading="lazy" />
        </figure>
        <h3>{{ product.name }}</h3>
        <p style="color: var(--pico-primary);">{{ product.formattedPrice }}</p>
        <p style="color: var(--pico-secondary);">Category: {{ product.category }}</p>
        <p v-if="!product.available" aria-live="polite" style="color: var(--pico-del-color);">
          Not Available
        </p>
      </article>
    </div>
  </section>
</template>

<!-- No custom CSS is added here, relying on PicoCSS classes like .grid and .container -->
<style scoped></style>