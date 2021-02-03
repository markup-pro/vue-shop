<template>
  <tr class="cart-product">
    <img class="cart-product__img" :src="data.img" :alt="data.title">
    <td>{{ data.title }}</td>
    <td>
      <app-amount
        @change="changeAmount"
        :value="data.quantity"
        :max-value="data.count"></app-amount>
    </td>
    <td>{{ currency(data.price * data.quantity) }}</td>
    <td>
      <div class="cart-product__remove" @click="remove">×</div>
    </td>
  </tr>
</template>

<script>
import { useStore } from 'vuex'
import { currency } from '@/utils/currency'
import AppAmount from '@/components/ui/AppAmount'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const store = useStore()
    const remove = async (count) => {
      store.dispatch('cart/removeProduct', {
        id: props.data.id,
        quantity: count
      })
    }

    const changeAmount = (count) => {
      if (count !== 0) {
        store.dispatch('cart/updateProduct', {
          id: props.data.id,
          quantity: count
        })
      } else {
        remove()
      }
    }

    return {
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

    &__remove {
      font-size: 20px;
      color: #e53935;
      cursor: pointer;
      padding: 5px;
    }
  }
</style>
