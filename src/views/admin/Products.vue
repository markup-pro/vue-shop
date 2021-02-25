<template>
  <app-page title="Продукты" title-head="Продукты">
    <template v-slot:header>
      <button
        class="btn"
        @click.prevent="modalCreateProduct = true">Добавить</button>
    </template>
    <admin-products-table
      v-if="products.length > 0"
      :products="products"></admin-products-table>
    <div class="text-center" v-else>Товарой не найдено</div>
  </app-page>

  <teleport to="body">
    <app-modal
      :open="modalCreateProduct"
      @close="modalCreateProduct = false"
      title="Создать продукт">
      <admin-form-product
        @close-modal="modalCreateProduct = false"
        state="create"></admin-form-product>
    </app-modal>
  </teleport>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import AppPage from '@/components/ui/AppPage'
import AdminProductsTable from '@/components/admin/AdminProductsTable'
import AdminFormProduct from '@/components/admin/AdminFormProduct'
import AppModal from '@/components/ui/AppModal'

export default {
  setup () {
    const store = useStore()
    const modalCreateProduct = ref(false)

    const products = computed(() => store.getters['admin/products'])

    onMounted(async () => {
      // loading.value = true
      await store.dispatch('admin/products')
      // loading.value = false
    })

    return {
      products,
      modalCreateProduct
    }
  },
  components: { AppPage, AdminProductsTable, AdminFormProduct, AppModal }
}
</script>
