<template>
  <app-page title="Категории" title-head="Категории">
    <template v-slot:header>
      <button class="btn" @click.prevent="modalCreateCategory = true">Добавить</button>
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
      :open="modalCreateCategory"
      @close="modalCreateCategory = false"
      title="Создать категорию">
      <admin-form-category @close-modal="modalCreateCategory = false"></admin-form-category>
    </app-modal>
  </teleport>
</template>

<script>
import { ref } from 'vue'
import { useCategories } from '@/use/categories'
import AppPage from '@/components/ui/AppPage'
import AdminFormCategory from '@/components/admin/AdminFormCategory'
import AppModal from '@/components/ui/AppModal'

export default {
  setup () {
    const modalCreateCategory = ref(false)

    return {
      modalCreateCategory,
      ...useCategories()
    }
  },
  components: { AppPage, AdminFormCategory, AppModal }
}
</script>
