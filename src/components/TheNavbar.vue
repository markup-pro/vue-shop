<template>
  <nav class="navbar">
    <h3><a href="#" @click.prevent="$router.push('/')">Shop Food</a></h3>

    <ul class="navbar-menu">
      <li>
        <router-link to="/">Магазин</router-link>
      </li>
      <li>
        <router-link to="/cart">
          Корзина <span v-if="cartCount" class="badge primary">{{ cartCount }}</span>
        </router-link>
      </li>
      <li v-if="!isAuthenticated">
        <a href="#" @click.prevent="showAuth(true)">Вход</a>
      </li>
      <li v-else>
        <router-link to="/admin">Админка</router-link>
      </li>
    </ul>
  </nav>

  <teleport to="body">
    <app-modal
      :open="modalAuth"
      @close="showAuth(false)"
      title="Войти в систему">
      <the-auth></the-auth>
    </app-modal>
  </teleport>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import AppModal from '@/components/ui/AppModal'
import TheAuth from '@/components/TheAuth'

export default {
  setup () {
    const store = useStore()

    const modalAuth = computed(() => store.getters['auth/isShowAuth'])
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
    const cartCount = computed(() => store.getters['cart/productCountAllInCart'])

    const showAuth = (status) => {
      store.commit('auth/showAuth', status)
    }

    return {
      isAuthenticated,
      modalAuth,
      cartCount,
      showAuth
    }
  },
  components: { TheAuth, AppModal }
}
</script>
