<template>
  <form @submit.prevent="onSubmit">
    <div :class="['form-control', { invalid: titleError }]">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="title" @blur="titleBlur">
      <small v-if="titleError">{{ titleError }}</small>
    </div>

    <div :class="['form-control', { invalid: typeError }]">
      <label for="type">Тип</label>
      <input type="text" id="type" v-model="type" @blur="typeBlur">
      <small v-if="typeError">{{ typeError }}</small>
    </div>

    <button class="btn primary" type="submit" :disabled="isSubmitting">Создать</button>
  </form>
</template>

<script>
import { useCategoryCreateForm } from '@/use/category-create-form'

export default {
  emits: ['closeModal'],
  setup (_, context) {
    return {
      ...useCategoryCreateForm(context)
    }
  }
}
</script>
