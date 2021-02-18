<template>
  <app-page title="Каталог">
    <app-loader v-if="loader"></app-loader>
    <div class="products-catalog" v-else>
      <catalog-filter
        :categories="categories"
        v-model="filter"
      ></catalog-filter>
      <div class="products-table">
        <div class="products-table__list" v-if="products.length > 0">
          <catalog-product
            v-for="product in products"
            :product="product"
            :key="product.id"></catalog-product>
        </div>
        <div v-else>Товаров не найдено</div>
      </div>
    </div>
  </app-page>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { currency } from '@/utils/currency'
import AppPage from '@/components/ui/AppPage'
import AppLoader from '@/components/ui/AppLoader'
import CatalogFilter from '@/components/catalog/CatalogFilter'
import CatalogProduct from '@/components/catalog/CatalogProduct'

export default {
  setup () {
    const store = useStore()
    const route = useRoute()
    const loader = ref(false)
    const filter = ref({ search: '', category: '' })
    const products = computed(() => store.getters['catalog/products'](filter.value))
    const categories = computed(() => store.getters['catalog/categories'])

    onMounted(async () => {
      filter.value = { ...filter.value, ...route.query }
      loader.value = true
      await store.dispatch('catalog/products')
      await store.dispatch('catalog/categories')
      loader.value = false
    })

    return {
      loader,
      filter,
      products,
      categories,
      currency
    }
  },
  components: { AppPage, AppLoader, CatalogProduct, CatalogFilter }
}
</script>

<style>
  .products-catalog {
    display: flex;
  }
</style>
