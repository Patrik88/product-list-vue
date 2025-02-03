import { ref } from 'vue'

export function useDebouncedSearch(delay: number = 300) {
  const searchTerm = ref('')
  let debounceTimer: number | undefined

  function emitDebouncedSearch(callback: (value: string) => void) {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }
    debounceTimer = window.setTimeout(() => {
      callback(searchTerm.value)
    }, delay)
  }

  return {
    searchTerm,
    emitDebouncedSearch,
  }
} 