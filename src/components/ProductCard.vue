<script setup lang="ts">
interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    category: string
    available: boolean
    image?: string
    formattedPrice?: string
  }
}

const props = defineProps<ProductCardProps>()
</script>

<template>
  <article role="listitem">
    <figure class="image-container">
      <img :src="props.product.image" :alt="`Image of ${props.product.name}`" loading="lazy" />
    </figure>

    <h3 style="--pico-font-size: 1.2rem;">
      {{ props.product.name }}
    </h3>

    <!-- Use formattedPrice if available; fallback to raw price -->
    <p style="color: var(--pico-primary);">
      {{ props.product.formattedPrice || props.product.price }}
    </p>

    <p style="color: var(--pico-secondary);">
      Category: {{ props.product.category }}
    </p>

    <p v-if="!props.product.available" aria-live="polite" style="color: var(--pico-del-color);">
      Not Available
    </p>
  </article>
</template>

<style scoped>
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