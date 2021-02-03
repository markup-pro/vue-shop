<template>
  <div class="amount">
    <button class="amount__btn btn danger" @click.prevent="decrement">-</button>
    <div class="amount__count">{{ count }} шт.</div>
    <button class="amount__btn btn primary" @click.prevent="increment">+</button>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  emits: ['change'],
  props: {
    value: {
      type: Number,
      default: 0,
      required: true
    },
    maxValue: {
      type: Number,
      required: true
    }
  },
  setup (props, context) {
    const count = ref(props.value)
    const changeAmount = () => {
      context.emit('change', count.value)
    }

    const increment = () => {
      if (count.value !== props.maxValue) {
        count.value += 1
        changeAmount()
      }
    }

    const decrement = () => {
      if (count.value !== 0) {
        count.value -= 1
        changeAmount()
      }
    }

    return {
      count,
      increment,
      decrement
    }
  }
}
</script>

<style lang="scss">
  .amount {
    display: flex;
    align-items: center;
    justify-content: center;

    &__btn {
      margin: 0;
    }

    &__count {
      width: 80px;
    }
  }
</style>
