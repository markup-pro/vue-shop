import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export function useLoginForm () {
  const store = useStore()
  const router = useRouter()
  const { handleSubmit, isSubmitting, submitCount } = useForm()

  const { value: email, errorMessage: eError } = useField(
    'email',
    yup
      .string()
      .trim()
      .required('Пожалуйста введите email')
      .email('Необходимо ввести корректный email')
  )

  const MIN_LENGTH = 6

  const { value: password, errorMessage: pError } = useField(
    'password',
    yup
      .string()
      .trim()
      .required('Пожалуйста введите пароль')
      .min(MIN_LENGTH, `Пароль не может быть меньше ${MIN_LENGTH} символов`)
  )

  const isTooManyAttempts = computed(() => submitCount.value >= 3)

  watch(isTooManyAttempts, val => {
    if (val) {
      setTimeout(() => {
        submitCount.value = 0
      }, 1500)
    }
  })

  const onSubmit = handleSubmit(async values => {
    try {
      await store.dispatch('auth/login', values)
      store.commit('auth/showAuth', false)
      await router.push('/admin')
    } catch (e) {
    }
  })

  return {
    email,
    password,
    eError,
    pError,
    onSubmit,
    isSubmitting,
    isTooManyAttempts
  }
}
