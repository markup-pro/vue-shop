<template>
  <app-page back back-text="Вернуться в каталог" back-link="/" v-if="product">
    <div class="product">
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
          @click.prevent="changeAmount(1)"
          v-if="productCountInCart === 0">{{ currency(product.price) }}</button>
        <app-amount
          v-else
          @change="changeAmount"
          :value="productCountInCart"
          :max-value="product.count"
        ></app-amount>
      </div>
    </div>
  </app-page>
  <h3 v-else class="text-center text-white">
    Товара не найден.
  </h3>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { currency } from '@/utils/currency'
import { computed, onMounted } from 'vue'
import AppPage from '@/components/ui/AppPage'
import AppAmount from '@/components/ui/AppAmount'

export default {
  setup () {
    const store = useStore()
    const route = useRoute()

    const product = computed(() => store.getters['catalog/product'])
    const productCountInCart = computed(() => store.getters['cart/productCountInCart'](route.params.id))

    onMounted(async () => {
      // loading.value = true
      await store.dispatch('catalog/product', route.params.id)
      // loading.value = false
    })

    function changeAmount (count) {
      store.commit('cart/updateCartModel', { id: route.params.id, count })
    }

    return {
      product,
      currency,
      productCountInCart,
      changeAmount
    }
  },
  components: { AppPage, AppAmount }
}
</script>

<style lang="scss">
.product {
  display: flex;

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
