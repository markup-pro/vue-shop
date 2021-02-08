<template>
  <the-navbar-admin></the-navbar-admin>
  <div class="container with-nav">
    <app-message></app-message>
    <router-view></router-view>
  </div>
</template>

<script>
import TheNavbarAdmin from '@/components/TheNavbarAdmin'
import AppMessage from '@/components/ui/AppMessage'

export default {
  components: { TheNavbarAdmin, AppMessage }
}
</script>
