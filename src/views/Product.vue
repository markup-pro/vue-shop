<template>
  <app-page
    back
    back-text="Вернуться в каталог"
    back-link="/"
    :title-head="product?.title">
    <app-loader v-if="loader"></app-loader>
    <div class="product" v-else>
      <div class="product__body" v-if="product">
        <figure class="product__figure">
          <img :src="product.img" :alt="product.title" />
        </figure>
        <div class="product__desc">
          <h1 class="product__title">{{ product.title }}</h1>
          <p>
            Категория: <strong>{{ product.category }}</strong>
            <br>
            Описание: <strong>{{ product.desc }}</strong>
          </p>
          <button
            class="btn"
            @click.prevent="updateCartModel(1)"
            v-if="productCountInCart === 0">{{ currency(product.price) }}</button>
          <app-amount
            v-else
            @change="updateCartModel"
            :value="productCountInCart"
            :max-value="product.count"
          ></app-amount>
        </div>
      </div>
      <h3 v-else class="text-center">
        Товара не найден.
      </h3>
    </div>
  </app-page>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { currency } from '@/utils/currency'
import { computed, onMounted, ref } from 'vue'
import { useCartModel } from '@/use/cart-model'
import AppPage from '@/components/ui/AppPage'
import AppLoader from '@/components/ui/AppLoader'
import AppAmount from '@/components/ui/AppAmount'

export default {
  setup () {
    const store = useStore()
    const route = useRoute()

    const loader = ref(false)
    const product = computed(() => store.getters['catalog/product'])
    const productCountInCart = computed(() => store.getters['cart/productCountInCart'](route.params.id))

    onMounted(async () => {
      loader.value = true
      await store.dispatch('catalog/product', route.params.id)
      loader.value = false
    })

    return {
      loader,
      product,
      currency,
      productCountInCart,
      ...useCartModel(route.params.id)
    }
  },
  components: { AppPage, AppLoader, AppAmount }
}
</script>

<style lang="scss">
.product {
  &__body {
    display: flex;
  }

  &__figure {
    width: 50%;
    padding-right: 40px;
    margin: 0;
  }

  &__desc {
    width: 50%;
  }

  &__title {
    margin: 0 0 20px;
  }
}
</style>
