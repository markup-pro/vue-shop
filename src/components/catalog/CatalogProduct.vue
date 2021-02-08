<template>
  <div class="product-card">
    <div class="product-img" @click="$router.push(`/product/${ product.id }`)">
      <img :src="product.img" :alt="product.title">
    </div>
    <h4 class="product-title" @click="$router.push(`/product/${ product.id }`)">{{ product.title }}</h4>
    <div class="text-center" v-if="product.count !== 0">
      <button
        class="btn"
        @click.prevent="changeAmount(1)"
        v-if="productCountInCart === 0">{{ currency(product.price) }}</button>
      <div class="product-amount" v-else>
        <app-amount
          @change="changeAmount"
          :value="productCountInCart"
          :max-value="product.count"
        ></app-amount>
      </div>
    </div>
    <div class="text-center" v-else>Нет в наличии</div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { currency } from '@/utils/currency'
import AppAmount from '@/components/ui/AppAmount'

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const store = useStore()

    const productCountInCart = computed(() => store.getters['cart/productCountInCart'](props.product.id))

    function changeAmount (count) {
      store.commit('cart/updateCartModel', { id: props.product.id, count })
    }

    return {
      currency,
      productCountInCart,
      changeAmount
    }
  },
  components: { AppAmount }
}
</script>
