import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useStore } from 'vuex'

export function useProductCreateForm (context) {
  const store = useStore()
  const { handleSubmit, isSubmitting } = useForm()

  const { value: title, errorMessage: titleError, handleBlur: titleBlur } = useField(
    'title',
    yup
      .string()
      .trim()
      .required('Пожалуйста введите название продукта')
  )

  const { value: desc, errorMessage: descError, handleBlur: descBlur } = useField(
    'desc',
    yup
      .string()
      .trim()
      .required('Пожалуйста введите описания продукта')
  )

  const { value: img, errorMessage: imgError, handleBlur: imgBlur } = useField(
    'img',
    yup
      .string()
      .trim()
      .required('Пожалуйста добавьте изображение для продукта')
  )

  const { value: count, errorMessage: countError, handleBlur: countBlur } = useField(
    'count',
    yup
      .number()
      .typeError('Количество должно быть числом')
      .required('Пожалуйста введите доступное количество продукта')
  )

  const { value: price, errorMessage: priceError, handleBlur: priceBlur } = useField(
    'price',
    yup
      .number()
      .typeError('Цена должна быть числом')
      .required('Пожалуйста введите цену продукта')
  )

  const { value: category, errorMessage: categoryError, handleBlur: categoryBlur } = useField(
    'category',
    yup
      .string()
      .trim()
      .required('Пожалуйста выберите категорию продукта')
  )

  const onSubmit = handleSubmit(async values => {
    try {
      await store.dispatch('admin/productCreate', values)
      context.emit('closeModal')
    } catch (e) {
    }
  })

  return {
    title,
    desc,
    img,
    count,
    price,
    category,
    titleError,
    titleBlur,
    descError,
    descBlur,
    imgError,
    imgBlur,
    countError,
    countBlur,
    priceError,
    priceBlur,
    categoryError,
    categoryBlur,
    onSubmit,
    isSubmitting
  }
}
