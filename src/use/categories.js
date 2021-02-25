import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'

export function useCategories () {
  const store = useStore()

  const categories = computed(() => store.getters['categories/categories'])

  onMounted(async () => {
    if (categories.value.length === 0) {
      await store.dispatch('categories/categories')
    }
  })

  return {
    categories
  }
}
