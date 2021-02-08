<template>
  <table class="table">
    <thead>
      <tr>
        <th></th>
        <th>Наименование</th>
        <th>Количество</th>
        <th>Цена (шт)</th>
        <th>Сумма</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <cart-product
        v-for="product in products"
        :product="product"
        :key="product.id"></cart-product>
    </tbody>
  </table>
</template>

<script>
import CartProduct from '@/components/cart/CartProduct'

export default {
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  components: { CartProduct }
}
</script>
