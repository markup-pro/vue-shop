<template>
  <component :is="layout + '-layout'" v-if="layout" />
  {{ layout }}
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from './layout/MainLayout'
import AdminLayout from './layout/AdminLayout'
import ErrorLayout from './layout/ErrorLayout'

export default {
  setup () {
    const route = useRoute()

    return {
      layout: computed(() => route.meta.layout)
    }
  },
  components: { MainLayout, AdminLayout, ErrorLayout }
}
</script>
