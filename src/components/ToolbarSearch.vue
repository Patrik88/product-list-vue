<script setup lang="ts">
import { defineEmits } from 'vue'
import { useDebouncedSearch } from '../composables/useDebouncedSearch'

const emit = defineEmits<{
  (e: 'update:search', value: string): void
}>()

const { searchTerm, emitDebouncedSearch } = useDebouncedSearch(300)

function handleInput() {
  emitDebouncedSearch((value: string) => {
    emit('update:search', value)
  })
}
</script>

<template>
  <form aria-label="Product Search Form" @submit.prevent style="flex-grow: 1;">
    <input type="text" aria-label="Search Products" placeholder="Search products..." v-model="searchTerm"
      @input="handleInput" class="contrast" />
  </form>
</template>