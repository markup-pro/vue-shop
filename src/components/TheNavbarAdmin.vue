<template>
  <nav class="navbar">
    <h3>Админка <small>Shop Food</small></h3>
    <router-link class="navbar-back" to="/">вернуться в магазин</router-link>

    <ul class="navbar-menu">
      <li>
        <router-link to="/admin/products">Товары</router-link>
      </li>
      <li>
        <router-link to="/admin/categories">Категории</router-link>
      </li>
      <li>
        <a href="" @click.prevent="logout">Выход</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  setup () {
    const router = useRouter()
    const store = useStore()

    return {
      logout: () => {
        store.commit('auth/logout')
        router.push('/')
      }
    }
  }
}
</script>
