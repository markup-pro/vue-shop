<template>
  <app-page title="Продукты">
    <template v-slot:header>
      <button class="btn" @click.prevent="isShowCreateProduct = true">Добавить</button>
    </template>
    <admin-products-table :products="products"></admin-products-table>
  </app-page>

  <teleport to="body">
    <app-modal
      :modal-open="isShowCreateProduct"
      @close="isShowCreateProduct = false"
      title="Создать продукт">
      <admin-product-add @close-modal="isShowCreateProduct = false"></admin-product-add>
    </app-modal>
  </teleport>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import AppPage from '@/components/ui/AppPage'
import AdminProductsTable from '@/components/admin/AdminProductsTable'
import AdminProductAdd from '@/components/admin/AdminProductAdd'
import AppModal from '@/components/ui/AppModal'

export default {
  setup () {
    const store = useStore()
    const isShowCreateProduct = ref(false)

    const products = computed(() => store.getters['admin/products'])

    onMounted(async () => {
      // loading.value = true
      await store.dispatch('admin/products')
      // loading.value = false
    })

    return {
      products,
      isShowCreateProduct
    }
  },
  components: { AppPage, AdminProductsTable, AdminProductAdd, AppModal }
}
</script>
