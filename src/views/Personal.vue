<template>
  <app-page
    back
    back-text="Вернуться в каталог"
    back-link="/"
    title="Личный кабинет">
    <template v-slot:header>
      <button class="btn" @click.prevent="logout">Выйти</button>
    </template>
  </app-page>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
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
  },
  components: { AppPage }
}
</script>
