<template>
  <form @submit.prevent="onSubmit">
    <app-input
      label="Название"
      id="title"
      v-model="title"
      type="text"
      :error="titleError"></app-input>

    <app-textarea
      label="Описание"
      id="desc"
      v-model="desc"
      :error="descError"></app-textarea>

    <app-input
      label="Изображение"
      id="img"
      v-model="img"
      type="text"
      :error="imgError"></app-input>

    <app-input
      label="Количество"
      id="count"
      v-model="count"
      type="number"
      :error="countError"></app-input>

    <app-input
      label="Цена"
      id="price"
      v-model="price"
      type="number"
      :error="priceError"></app-input>

    <app-select
      label="Категория"
      id="category"
      v-model="category"
      placeholder="Выберите категорию"
      :options="categories"
      :error="categoryError"></app-select>

    <div class="btn-holder" v-if="state === 'create'">
      <button
        class="btn primary"
        type="submit"
        :disabled="isSubmitting">Создать</button>
    </div>
    <div class="btn-holder" v-if="state === 'edit'">
      <button
        class="btn primary"
        type="submit"
        :disabled="isSubmitting">Сохранить</button>
      <button
        class="btn danger"
        type="button"
        :disabled="isSubmitting"
        @click.prevent="cancel">Отменить</button>
    </div>
  </form>
</template>

<script>
import { reactive } from 'vue'
import { useProductForm } from '@/use/product-form'
import { useCategories } from '@/use/categories'
import AppInput from '@/components/ui/AppInput'
import AppTextarea from '@/components/ui/AppTextarea'
import AppSelect from '@/components/ui/AppSelect'

export default {
  emits: ['closeModal'],
  props: {
    data: {
      type: Object
    },
    state: {
      type: String
    }
  },
  setup (props, context) {
    const product = reactive({ ...props.data })

    const cancel = () => {
      context.emit('closeModal')
    }

    return {
      product,
      cancel,
      ...useCategories(),
      ...useProductForm(context, product, props.state)
    }
  },
  components: { AppInput, AppTextarea, AppSelect }
}
</script>
