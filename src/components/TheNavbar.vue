<template>
  <nav class="navbar">
    <h3><a href="#" @click.preevnt="$router.push('/')">Shop</a></h3>

    <ul class="navbar-menu">
      <li>
        <router-link to="/">Магазин</router-link>
      </li>
      <li>
        <router-link to="/cart">Корзина</router-link>
      </li>
      <li>
        <a href="#" @click.prevent="$router.push('/auth')">Вход</a>
      </li>
      <li>
        <a href="#" @click.prevent="logout">Выход</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  setup() {
    const router = useRouter()
    const store = useStore()

    return {
      logout: () => {
        store.commit('auth/logout')
        router.push('/auth')
      },
      open: () => store.commit('openSidebar')
    }
  }
}
</script>
