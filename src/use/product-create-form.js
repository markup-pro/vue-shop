import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useStore } from 'vuex'

export function useProductCreateForm (context, product) {
  const store = useStore()
  const { handleSubmit, isSubmitting } = useForm()

  const { value: title, errorMessage: titleError } = useField(
    'title',
    yup
      .string()
      .trim()
      .required('Пожалуйста введите название продукта')
  )

  const { value: desc, errorMessage: descError } = useField(
    'desc',
    yup
      .string()
      .trim()
      .required('Пожалуйста введите описания продукта')
  )

  const { value: img, errorMessage: imgError } = useField(
    'img',
    yup
      .string()
      .trim()
      .required('Пожалуйста добавьте изображение для продукта')
  )

  const { value: count, errorMessage: countError } = useField(
    'count',
    yup
      .number()
      .typeError('Количество должно быть числом')
      .required('Пожалуйста введите доступное количество продукта')
  )

  const { value: price, errorMessage: priceError } = useField(
    'price',
    yup
      .number()
      .typeError('Цена должна быть числом')
      .required('Пожалуйста введите цену продукта')
  )

  const { value: category, errorMessage: categoryError } = useField(
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

  title.value = product.title
  desc.value = product.desc
  img.value = product.img
  count.value = product.count
  price.value = product.price
  category.value = product.category

  return {
    title,
    desc,
    img,
    count,
    price,
    category,
    titleError,
    descError,
    imgError,
    countError,
    priceError,
    categoryError,
    onSubmit,
    isSubmitting
  }
}
