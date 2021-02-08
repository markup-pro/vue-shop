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
import { computed, ref, watch } from 'vue'

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
  setup (props, context) {
    const typeCategory = ref('')
    const filter = computed(() => props.modelValue)

    function changeSearch (event) {
      filter.value.search = event.target.value
    }

    function clearSearch () {
      filter.value.search = ''
    }

    function choiceCategory (type) {
      filter.value.category = type || ''
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
