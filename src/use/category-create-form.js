import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useStore } from 'vuex'

export function useCategoryCreateForm (context) {
  const store = useStore()
  const { handleSubmit, isSubmitting } = useForm()

  const { value: title, errorMessage: titleError } = useField(
    'title',
    yup
      .string()
      .trim()
      .required('Пожалуйста введите название категории')
  )

  const { value: type, errorMessage: typeError } = useField(
    'type',
    yup
      .string()
      .trim()
      .required('Пожалуйста введите тип категории')
  )

  const onSubmit = handleSubmit(async values => {
    try {
      await store.dispatch('admin/categoryCreate', values)
      context.emit('closeModal')
    } catch (e) {
    }
  })

  return {
    title,
    type,
    titleError,
    typeError,
    onSubmit,
    isSubmitting
  }
}
