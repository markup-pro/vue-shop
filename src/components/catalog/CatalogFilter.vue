<template>
  <div class="products-filter">
    {{modelValue}}
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
import { ref, reactive, watch } from 'vue'

export default {
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  setup (_, context) {
    const typeCategory = ref('')
    const filter = reactive({
      search: '',
      category: ''
    })

    function changeSearch (event) {
      filter.search = event.target.value
    }

    function clearSearch () {
      filter.search = ''
    }

    function choiceCategory (type) {
      filter.category = type || ''
    }

    watch(filter, (value) => {
      context.emit('update:modelValue', value)
    })

    return {
      filter,
      typeCategory,
      changeSearch,
      clearSearch,
      choiceCategory
    }
  }
}
</script>
