<template>
  <app-page title="Заказ успешно оформлен!">
    <p>Историю заказов можете посмотреть в <router-link to="/personal">личном кабинете</router-link></p>
  </app-page>
</template>

<script>
import AppPage from '@/components/ui/AppPage'

export default {
  components: { AppPage }
}
</script>
