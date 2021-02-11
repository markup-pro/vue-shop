<template>
  <form @submit.prevent="onSubmit">
    <app-input
      label="Email"
      id="email"
      v-model="email"
      type="email"
      :error="eError"></app-input>

    <app-input
      label="Пароль"
      id="password"
      v-model="password"
      type="password"
      :error="pError"></app-input>

    <button class="btn primary" type="submit" :disabled="isSubmitting || isTooManyAttempts">Войти</button>
    <div class="text-danger" v-if="isTooManyAttempts">
      Вы слишком часто пытаетесь войти в систему. Попробуйте позже
    </div>
  </form>
</template>

<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { error } from '@/utils/error'
import { useLoginForm } from '@/use/login-form'
import AppInput from '@/components/ui/AppInput'

export default {
  setup () {
    const route = useRoute()
    const store = useStore()

    if (route.query.message) {
      store.dispatch('setMessage', {
        value: error(route.query.message),
        type: 'warning'
      })
    }
    return { ...useLoginForm() }
  },
  components: { AppInput }
}
</script>
