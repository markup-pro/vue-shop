<template>
  <tr class="admin-product">
    <td>{{ idx + 1 }}</td>
    <td>{{ product.title }}</td>
    <td>
      <img class="admin-product__img" :src="product.img" :alt="product.title">
    </td>
    <td>{{ currency(product.price) }}</td>
    <td>{{ product.category }}</td>
    <td>{{ product.count }}</td>
    <td>
      <button class="btn">Просмотреть</button>
    </td>
  </tr>
</template>

<script>
import { currency } from '@/utils/currency'

export default {
  props: {
    product: {
      type: Object,
      required: true
    },
    idx: {
      type: Number,
      required: true
    }
  },
  setup () {
    return {
      currency
    }
  }
}
</script>

<style lang="scss">
  .admin-product {
    td {
      height: 104px;
    }

    &__img {
      max-width: 100px;
    }
  }
</style>
