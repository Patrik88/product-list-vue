<script setup lang="ts">
// This skeleton component doesn't need props.
</script>

<template>
  <article role="listitem" class="skeleton">
    <figure class="skeleton-image"></figure>
    <h3 class="skeleton-text"></h3>
    <p class="skeleton-text"></p>
    <p class="skeleton-text"></p>
  </article>
</template>

<style scoped>
.skeleton {
  background-color: var(--pico-muted-border-color);
  padding: 1rem;
  height: 500.5px;
}

.skeleton-image {
  width: 100%;
  padding-top: 66.67%;
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
</style>