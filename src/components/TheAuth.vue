<template>
  <div class="auth">
    <component :is="'the-' + type"/>
    <div class="auth__nav">
      <a href="#"
         :class="['auth__nav-link', { 'active': type === 'login'}]"
         @click.prevent="type = 'login'">Авторизация</a>
      <a href="#"
         :class="['auth__nav-link', { 'active': type === 'register'}]"
         @click.prevent="type = 'register'">Регистрация</a>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import TheLogin from '@/components/TheLogin'
import TheRegister from '@/components/TheRegister'

export default {
  setup () {
    const type = ref('login')

    return {
      type
    }
  },
  components: { TheLogin, TheRegister }
}
</script>

<style lang="scss">
.auth {
  &__nav {
    display: flex;
    justify-content: center;
    margin-top: 20px;

    &-link {
      margin: 0 15px;

      &.active {
        font-weight: 700;
        text-decoration: underline;
      }
    }
  }
}
</style>
