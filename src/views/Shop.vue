<template>
  <app-loader v-if="loading"></app-loader>
  <div class="card">
    <h1>Магазин</h1>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import AppPage from '@/components/ui/AppPage'
import AppModal from '@/components/ui/AppModal'
import AppLoader from '@/components/ui/AppLoader'

export default {
  setup() {
    const store = useStore()
    const modal = ref(false)
    const loading = ref(false)

    onMounted(async () => {
      loading.value = true
      // await store.dispatch('request/load')
      loading.value = false
    })

    return {
      modal, loading
    }
  },
  components: {
    AppPage, AppModal, AppLoader
  }
}
</script>
