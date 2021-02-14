<template>
  <div class="products-filter">
    <div class="form-control">
      <input
        type="text"
        :value="modelValue.search"
        placeholder="Найти товар..."
        @input="changeSearch">
      <span
        v-if="modelValue.search.length > 0"
        class="form-control-clear"
        @click="clearSearch">&times;</span>
    </div>

    <ul class="list">
      <li
        :class="['list-item', { 'active': modelValue.category === '' }]"
        @click="choiceCategory('')">Все</li>
      <li
        v-for="category in categories"
        :key="category.id"
        :class="['list-item', { 'active': modelValue.category === category.type }]"
        @click="choiceCategory(category.type)">
        {{ category.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

export default {
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Object
    },
    categories: {
      type: Array,
      required: true
    }
  },
  setup (props, context) {
    const router = useRouter()
    const typeCategory = ref('')
    const search = ref(props.modelValue.search)
    const category = ref(props.modelValue.category)

    function changeSearch (event) {
      search.value = event.target.value
    }

    function clearSearch () {
      search.value = ''
    }

    function choiceCategory (type) {
      category.value = type
    }

    watch([search, category], ([sv, cv]) => {
      const query = {}

      if (sv) {
        query.search = sv
      }
      if (cv) {
        query.category = cv
      }

      router.replace({ query })
      context.emit('update:modelValue', {
        search: sv,
        category: cv
      })
    })

    return {
      search,
      category,
      typeCategory,
      changeSearch,
      clearSearch,
      choiceCategory
    }
  }
}
</script>
