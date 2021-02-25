<template>
  <app-page title="Корзина" title-head="Корзина">
    <app-loader v-if="loader"></app-loader>
    <div class="cart-products" v-else>
      <h3 class="text-center" v-if="products.length === 0">В корзине пока ничего нет</h3>
      <div class="cart-products__body" v-else>
        <cart-table :products="products"></cart-table>
        <hr>
        <p class="text-right"><strong>Всего: {{ currency(totalPrice) }}</strong></p>
        <p v-if="!isAuthenticated">Для оформления заказа вам нужно <a href="" @click.prevent="showAuth">авторизоваться</a></p>
        <p v-else  class="text-right">
          <button class="btn" @click.prevent="order">Оплатить</button>
        </p>
      </div>
    </div>
  </app-page>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { currency } from '@/utils/currency'
import AppPage from '@/components/ui/AppPage'
import AppLoader from '@/components/ui/AppLoader'
import CartTable from '@/components/cart/CartTable'

export default {
  setup () {
    const store = useStore()
    const loader = ref(false)
    const products = computed(() => store.getters['cart/products'])
    const totalPrice = computed(() => store.getters['cart/totalPrice'])
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])

    onMounted(async () => {
      loader.value = true
      await store.dispatch('cart/products')
      loader.value = false
    })

    const showAuth = () => {
      store.commit('auth/showAuth', true)
    }

    const order = () => {
      store.dispatch('cart/order')
    }

    return {
      loader,
      products,
      totalPrice,
      currency,
      isAuthenticated,
      showAuth,
      order
    }
  },
  components: { AppPage, AppLoader, CartTable }
}
</script>
