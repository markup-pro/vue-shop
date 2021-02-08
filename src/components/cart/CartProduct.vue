<template>
  <tr class="cart-product">
    <td>
      <img class="cart-product__img" :src="product.img" :alt="product.title">
    </td>
    <td>{{ product.title }}</td>
    <td>
      <div class="cart-product__amount">
        <app-amount
          @change="changeAmount"
          :value="productCountInCart"
          :max-value="product.count"></app-amount>
      </div>
    </td>
    <td>{{ currency(product.price) }}</td>
    <td>{{ currency(product.price * productCountInCart) }}</td>
    <td>
      <div class="cart-product__remove" @click="remove">×</div>
    </td>
  </tr>
</template>

<script>
import { useStore } from 'vuex'
import { currency } from '@/utils/currency'
import { computed } from 'vue'
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

    function updateCartModel (count) {
      store.commit('cart/updateCartModel', { id: props.product.id, count })
    }

    const remove = async () => {
      updateCartModel(0)
      store.dispatch('cart/removeProduct', { id: props.product.id })
    }

    const changeAmount = (count) => {
      updateCartModel(count)

      if (count === 0) {
        remove()
      }
    }

    return {
      productCountInCart,
      currency,
      remove,
      changeAmount
    }
  },
  components: { AppAmount }
}
</script>

<style lang="scss">
  .cart-product {
    td {
      height: 104px;
    }

    &__img {
      max-width: 100px;
    }

    &__amount {
      display: flex;
      justify-content: center;
    }

    &__remove {
      font-size: 20px;
      color: #e53935;
      cursor: pointer;
      padding: 5px;
    }
  }
</style>
