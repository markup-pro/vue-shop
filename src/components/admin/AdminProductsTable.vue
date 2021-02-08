<template>
  <table class="table">
    <thead>
      <tr>
        <th>#</th>
        <th>Название</th>
        <th>Изображение</th>
        <th>Цена</th>
        <th>Категория</th>
        <th>Количество</th>
        <th>Действие</th>
      </tr>
    </thead>
    <tbody>
      <admin-product
        v-for="(product, idx) in products"
        :product="product"
        :idx="idx"
        :key="product.id"></admin-product>
    </tbody>
  </table>
</template>

<script>
import AdminProduct from '@/components/admin/AdminProduct'

export default {
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  components: { AdminProduct }
}
</script>
