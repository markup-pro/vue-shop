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
      <button class="btn" @click.prevent="modalProduct = true">Просмотреть</button>
      <button class="btn danger" @click.prevent="confirm = true">×</button>
    </td>
  </tr>

  <teleport to="body">
    <app-modal
      :open="modalProduct"
      :title="product.title">
      <admin-form-product
        :data="product"
        state="edit"></admin-form-product>
    </app-modal>

    <app-confirm
      :open="confirm"
      title="Удалить товар?"
      @reject="confirm = false"
      @confirm="removeProduct"></app-confirm>
  </teleport>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { currency } from '@/utils/currency'
import AppModal from '@/components/ui/AppModal'
import AppConfirm from '@/components/ui/AppConfirm'
import AdminFormProduct from '@/components/admin/AdminFormProduct'

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
  setup (props) {
    const store = useStore()
    const modalProduct = ref(false)
    const confirm = ref(false)

    const removeProduct = async function () {
      await store.dispatch('admin/productRemove', props.product.id)
      confirm.value = false
    }

    return {
      modalProduct,
      confirm,
      currency,
      removeProduct
    }
  },

  components: { AppModal, AppConfirm, AdminFormProduct }
}
</script>

<style lang="scss">
  .admin-product {
    td {
      height: 70px;
    }

    &__img {
      max-width: 50px;
    }
  }
</style>
