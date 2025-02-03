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
  <article role="listitem" class="product-card">
    <figure class="image-container">
      <img :src="props.product.image" :alt="`Image of ${props.product.name}`" loading="lazy" />
    </figure>

    <hgroup>
      <h3>{{ props.product.name }}</h3>
      <p>Category: {{ props.product.category }}</p>
    </hgroup>

    <div class="price-button-container">
      <strong :class="{ 'available': props.product.available, 'unavailable': !props.product.available }">
        <span>{{ props.product.formattedPrice || props.product.price }}</span>
      </strong>

      <button :class="{ 'secondary outline': !props.product.available }" :disabled="!props.product.available"
        aria-disabled="!props.product.available">
        <span v-if="!props.product.available" style="color: var(--pico-del-color)">Out of Stock</span>
        <span v-else>Add to Cart</span>
      </button>
    </div>
  </article>
</template>

<style scoped>
h3 {
  font-size: 1.15rem;
}

.product-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.image-container {
  position: relative;
  width: 100%;
  padding-top: 66.67%;
  /* 6:4 aspect ratio */
  background-color: var(--pico-muted-border-color);
  border-radius: 0.125rem;
  overflow: hidden;
  margin-bottom: var(--pico-spacing);
}

.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.price-button-container {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
}

strong.available {
  color: var(--pico-primary);
  font-size: 1.2rem;
}

strong.unavailable {
  color: var(--pico-muted-color);
  font-size: 1.2rem;
}
</style>