<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface ToolbarFiltersProps {
  selectedCategory: string
  selectedAvailability: string
  categoryOptions: string[]
}

const props = defineProps<ToolbarFiltersProps>()

const emit = defineEmits<{
  (e: 'update:category', value: string): void
  (e: 'update:availability', value: string): void
}>()

function onCategoryChange(event: Event) {
  const target = event.target as HTMLSelectElement
  emit('update:category', target.value)
}

function onAvailabilityChange(event: Event) {
  const target = event.target as HTMLSelectElement
  emit('update:availability', target.value)
}
</script>

<template>
  <form @submit.prevent style="display: flex; flex-direction: row; gap: 1rem;">
    <div>
      <label for="categorySelect">Category:</label>
      <select id="categorySelect" :value="selectedCategory" @change="onCategoryChange">
        <option value="">All Categories</option>
        <option v-for="option in categoryOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>

    <div>
      <label for="availabilitySelect">Availability:</label>
      <select id="availabilitySelect" :value="selectedAvailability" @change="onAvailabilityChange">
        <option value="">All</option>
        <option value="available">Available</option>
        <option value="unavailable">Unavailable</option>
      </select>
    </div>
  </form>
</template>