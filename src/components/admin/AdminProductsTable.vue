<template>
  <app-pagination
    :data="products"
    :chunk="5">
    <template v-slot:default="slotProps">
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
          v-for="(product, idx) in slotProps.data"
          :product="product"
          :idx="idx"
          :key="product.id"></admin-product>
        </tbody>
      </table>
    </template>
  </app-pagination>
</template>

<script>
import AppPagination from '@/components/ui/AppPagination'
import AdminProduct from '@/components/admin/AdminProduct'

export default {
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  components: { AppPagination, AdminProduct }
}
</script>
