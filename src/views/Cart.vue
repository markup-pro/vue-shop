<template>
  <app-page title="Корзина">
    <h3 class="text-center" v-if="products.length === 0">В корзине пока ничего нет</h3>
    <div class="cart-products" v-else>
      <cart-table :products="products"></cart-table>
      <hr>
      <p class="text-right"><strong>Всего: {{ currency(totalPrice) }}</strong></p>
      <p class="text-right">
        <button class="btn">Оплатить</button>
      </p>
    </div>
  </app-page>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { currency } from '@/utils/currency'
import AppPage from '@/components/ui/AppPage'
import CartTable from '@/components/cart/CartTable'

export default {
  setup () {
    const store = useStore()

    const products = computed(() => store.getters['cart/products'])
    const totalPrice = computed(() => store.getters['cart/totalPrice'])

    onMounted(async () => {
      // loading.value = true
      await store.dispatch('cart/products')
      // loading.value = false
    })

    return {
      products,
      totalPrice,
      currency
    }
  },
  components: { CartTable, AppPage }
}
</script>
