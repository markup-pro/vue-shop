<template>
  <div class="card">
    <h1>Корзина</h1>

    <h3 class="text-center" v-if="products.length === 0">В корзине пока ничего нет</h3>
    <div class="cart-products" v-else>
      <table class="table">
        <thead>
        <tr>
          <th></th>
          <th>Наименование</th>
          <th>Количество</th>
          <th>Цена (шт)</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
          <cart-product
            v-for="product in products"
            :data="product"
            :key="product.id"></cart-product>
        </tbody>
      </table>
      <hr>
      <p class="text-right"><strong>Всего: {{ currency(totalPrice) }}</strong></p>
      <p class="text-right">
        <button class="btn">Оплатить</button>
      </p>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { currency } from '@/utils/currency'
import CartProduct from '@/components/cart/CartProduct'

const CART_MODEL = {
  2: 3,
  5: 1
}

export default {
  setup () {
    const store = useStore()

    const products = computed(() => store.getters['cart/getProducts'])
    const totalPrice = computed(() => store.getters['cart/getTotalPrice'])

    onMounted(async () => {
      // loading.value = true
      await store.dispatch('cart/products', CART_MODEL)
      // loading.value = false
    })

    return {
      products,
      totalPrice,
      currency
    }
  },
  components: { CartProduct }
}
</script>
