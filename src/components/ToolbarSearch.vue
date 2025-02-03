<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const emit = defineEmits<{
  (e: 'update:search', value: string): void
}>()

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
</script>

<template>
  <form aria-label="Product Search Form" @submit.prevent style="flex-grow: 1;">
    <input type="text" aria-label="Search Products" placeholder="Search products..." v-model="searchTerm"
      @input="emitDebouncedSearch" class="contrast" />
  </form>
</template>