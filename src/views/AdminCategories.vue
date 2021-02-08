<template>
  <app-page title="Категории">
    <template v-slot:header>
      <button class="btn" @click.prevent="isShowCreateCategory = true">Добавить</button>
    </template>
    <table class="table">
      <thead>
      <tr>
        <th>#</th>
        <th>Название</th>
        <th>Тип</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(category, idx) in categories"
          :key="category.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ category.title }}</td>
        <td>{{ category.type }}</td>
      </tr>
      </tbody>
    </table>
  </app-page>

  <teleport to="body">
    <app-modal
      :modal-open="isShowCreateCategory"
      @close="isShowCreateCategory = false"
      title="Создать категорию">
      <admin-category-add @close-modal="isShowCreateCategory = false"></admin-category-add>
    </app-modal>
  </teleport>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import AppPage from '@/components/ui/AppPage'
import AdminCategoryAdd from '@/components/admin/AdminCategoryAdd'
import AppModal from '@/components/ui/AppModal'

export default {
  setup () {
    const store = useStore()
    const isShowCreateCategory = ref(false)

    const categories = computed(() => store.getters['admin/categories'])

    onMounted(async () => {
      // loading.value = true
      await store.dispatch('admin/categories')
      // loading.value = false
    })

    return {
      categories,
      isShowCreateCategory
    }
  },
  components: { AppPage, AdminCategoryAdd, AppModal }
}
</script>
