<template>
  <app-page title="Корзина">
    <h3 class="text-center" v-if="products.length === 0">В корзине пока ничего нет</h3>
    <div class="cart-products" v-else>
      <cart-table :products="products"></cart-table>
      <hr>
      <p class="text-right"><strong>Всего: {{ currency(totalPrice) }}</strong></p>
      <p v-if="!isAuthenticated">Для оформления заказа вам нужно <a href="" @click.prevent="showAuth">авторизоваться</a></p>
      <p v-else  class="text-right">
        <button class="btn" @click.prevent="order">Оплатить</button>
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
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])

    onMounted(async () => {
      // loading.value = true
      await store.dispatch('cart/products')
      // loading.value = false
    })

    const showAuth = () => {
      store.commit('auth/showAuth', true)
    }

    const order = () => {
      store.dispatch('cart/order')
    }

    return {
      products,
      totalPrice,
      currency,
      isAuthenticated,
      showAuth,
      order
    }
  },
  components: { CartTable, AppPage }
}
</script>
