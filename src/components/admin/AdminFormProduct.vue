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
      <button class="btn primary" type="submit" :disabled="isSubmitting">Создать</button>
    </div>
    <div class="btn-holder" v-if="state === 'edit'">
      <button class="btn primary" type="submit" :disabled="!save || isSubmitting">Сохранить</button>
    </div>
  </form>
</template>

<script>
import { reactive, ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useProductCreateForm } from '@/use/product-create-form'
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
    const store = useStore()
    const save = ref(false)
    const product = reactive({ ...props.data })
    const categories = computed(() => store.getters['admin/categories'])

    onMounted(async () => {
      await store.dispatch('admin/categories')
    })

    // const hasChanges = computed(() => {
    //   return Object.keys((initial).reduce((acc, key) => {
    //     return product.value[key] !== initial.key && acc
    //   }), false)
    // })

    return {
      save,
      product,
      categories,
      ...useProductCreateForm(context, product)
    }
  },
  components: { AppInput, AppTextarea, AppSelect }
}
</script>
