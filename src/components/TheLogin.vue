<template>
  <form @submit.prevent="onSubmit">
    <h2>Авторизация</h2>
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
import { useAuthForm } from '@/use/auth-form'
import AppInput from '@/components/ui/AppInput'

export default {
  setup () {
    return { ...useAuthForm('login') }
  },
  components: { AppInput }
}
</script>
