<template>
  <form @submit.prevent="onSubmit">
    <app-input
      label="Название"
      id="title"
      v-model="title"
      type="text"
      :error="titleError"></app-input>

    <app-input
      label="Тип"
      id="type"
      v-model="type"
      type="text"
      :error="typeError"></app-input>

    <button class="btn primary" type="submit" :disabled="isSubmitting">Создать</button>
  </form>
</template>

<script>
import { useCategoryCreateForm } from '@/use/category-create-form'
import AppInput from '@/components/ui/AppInput'

export default {
  emits: ['closeModal'],
  setup (_, context) {
    return {
      ...useCategoryCreateForm(context)
    }
  },
  components: { AppInput }
}
</script>
