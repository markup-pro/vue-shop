<template>
  <tr class="cart-product">
    <td>
      <img class="cart-product__img" :src="product.img" :alt="product.title">
    </td>
    <td>{{ product.title }}</td>
    <td>
      <div class="cart-product__amount">
        <app-amount
          @change="updateCartModel"
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
import { computed } from 'vue'
import { useStore } from 'vuex'
import { currency } from '@/utils/currency'
import { useCartModel } from '@/use/cart-model'
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

    function remove () {
      store.dispatch('cart/removeProduct', props.product.id)
    }

    return {
      productCountInCart,
      currency,
      remove,
      ...useCartModel(props.product.id)
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
