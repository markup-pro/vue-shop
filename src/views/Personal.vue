<template>
  <app-page
    back
    back-text="Вернуться в каталог"
    back-link="/"
    title="Личный кабинет">
    <template v-slot:header>
      <button class="btn" @click.prevent="logout">Выйти</button>
    </template>
    <h2>Заказы</h2>
    <div class="order-list" v-if="orders.length > 0">
      <div class="order-list__item"
           v-for="order in orders"
           :key="order.id">
        <personal-order :order="order"></personal-order>
      </div>
    </div>
    <p v-else>На данный момент нет заказов</p>
  </app-page>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import AppPage from '@/components/ui/AppPage'
import PersonalOrder from '@/components/personal/PersonalOrder'

export default {
  setup () {
    const router = useRouter()
    const store = useStore()

    const orders = computed(() => store.getters['personal/orders'])

    onMounted(async () => {
      await store.dispatch('personal/orders')
    })

    return {
      orders,
      logout: () => {
        store.commit('auth/logout')
        router.push('/')
      }
    }
  },
  components: { AppPage, PersonalOrder }
}
</script>

<style lang="scss">
.order-list {
  &__item {
    margin-bottom: 15px;
  }
}
</style>
