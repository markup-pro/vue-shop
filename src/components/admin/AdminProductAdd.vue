<template>
  <form @submit.prevent="onSubmit">
    <div :class="['form-control', { invalid: titleError }]">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="title" @blur="titleBlur">
      <small v-if="titleError">{{ titleError }}</small>
    </div>

    <div :class="['form-control', { invalid: descError }]">
      <label for="desc">Описание</label>
      <textarea id="desc" v-model="desc" @blur="descBlur"></textarea>
      <small v-if="descError">{{ descError }}</small>
    </div>

    <div :class="['form-control', { invalid: imgError }]">
      <label for="img">Изображение</label>
      <input type="text" id="img" v-model="img" @blur="imgBlur">
      <small v-if="imgError">{{ imgError }}</small>
    </div>

    <div :class="['form-control', { invalid: countError }]">
      <label for="count">Количество</label>
      <input type="number" min="0" id="count" v-model="count" @blur="countBlur">
      <small v-if="countError">{{ countError }}</small>
    </div>

    <div :class="['form-control', { invalid: priceError }]">
      <label for="price">Цена</label>
      <input type="text" id="price" v-model="price" @blur="priceBlur">
      <small v-if="priceError">{{ priceError }}</small>
    </div>

    <div :class="['form-control', { invalid: categoryError }]">
      <label for="category">Категория</label>
      <select id="category" v-model="category" @blur="categoryBlur">
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.type">{{ category.title }}</option>
      </select>
      <small v-if="categoryError">{{ categoryError }}</small>
    </div>

    <button class="btn primary" type="submit" :disabled="isSubmitting">Создать</button>
  </form>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useProductCreateForm } from '@/use/product-create-form'

export default {
  emits: ['closeModal'],
  setup (_, context) {
    const store = useStore()
    const categories = computed(() => store.getters['admin/categories'])

    onMounted(async () => {
      // loading.value = true
      await store.dispatch('admin/categories')
      // loading.value = false
    })

    return {
      categories,
      ...useProductCreateForm(context)
    }
  }
}
</script>
