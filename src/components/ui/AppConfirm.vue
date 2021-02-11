<template>
  <app-modal
    :open="open"
    :icon-close="false"
    :title="title"
    :z-index="210">
    <button class="btn primary" @click.prevent="$emit('confirm')">Да</button>
    <button class="btn danger" @click.prevent="$emit('reject')">Нет</button>
  </app-modal>
</template>

<script>
import AppModal from '@/components/ui/AppModal'

export default {
  emits: ['confirm', 'reject'],
  props: {
    open: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },

  components: { AppModal }
}
</script>
