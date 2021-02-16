<template>
  <app-page title="Каталог">
    <div class="products-catalog">
      <catalog-filter
        :categories="categories"
        v-model="filter"
      ></catalog-filter>
      <div class="products-table" v-if="products.length > 0">
        <catalog-product
          v-for="product in products"
          :product="product"
          :key="product.id"></catalog-product>
      </div>
      <div class="products-table" v-else>Товарой не найдено</div>
    </div>
  </app-page>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { currency } from '@/utils/currency'
import AppPage from '@/components/ui/AppPage'
import CatalogFilter from '@/components/catalog/CatalogFilter'
import CatalogProduct from '@/components/catalog/CatalogProduct'

export default {
  setup () {
    const store = useStore()
    const route = useRoute()
    const filter = ref({ search: '', category: '' })
    const products = computed(() => store.getters['catalog/products'](filter.value))
    const categories = computed(() => store.getters['catalog/categories'])

    onMounted(async () => {
      filter.value = { ...filter.value, ...route.query }
      await store.dispatch('catalog/products')
      await store.dispatch('catalog/categories')
    })

    return {
      filter,
      products,
      categories,
      currency
    }
  },
  components: { AppPage, CatalogProduct, CatalogFilter }
}
</script>

<style scoped>
  .products-catalog {
    display: flex;
  }
</style>
