<template>
  <div class="card">
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
    <div class="text-center" v-else>Товарой не найдено</div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { currency } from '@/utils/currency'
import CatalogFilter from '@/components/catalog/CatalogFilter'
import CatalogProduct from '@/components/catalog/CatalogProduct'

export default {
  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const filter = ref({ search: '', category: '' })
    const products = computed(() => store.getters['catalog/products'](filter.value))
    const categories = computed(() => store.getters['catalog/categories'])

    onMounted(async () => {
      filter.value = { ...filter.value, ...route.query }
      // loading.value = true
      await store.dispatch('catalog/products')
      await store.dispatch('catalog/categories')
      // loading.value = false
    })

    watch(
      () => filter.value,
      (value) => {
        console.log(value)
        const query = {}
        Object.keys(value).forEach((k) => {
          if (value[k]) {
            query[k] = value[k]
          }
        })
        router.replace({ query })
      },
      { deep: true }
    )

    return {
      filter,
      products,
      categories,
      currency
    }
  },
  components: { CatalogProduct, CatalogFilter }
}
</script>

<style scoped>
  .card {
    border-radius: 4px;
    padding: 0;
    display: flex;
  }
</style>
