<template>
  <div :class="['form-control', { invalid: error }]">
    <label :for="id">Описание</label>
    <textarea
      :id="id"
      :placeholder="placeholder"
      @input="change">{{ modelValue }}</textarea>
    <small v-if="error">{{ error }}</small>
  </div>
</template>

<script>
export default {
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String
    },
    label: {
      type: String
    },
    error: {
      type: String
    },
    id: {
      type: String,
      required: true
    },
    placeholder: {
      type: String
    }
  },
  setup (_, context) {
    function change (event) {
      context.emit('update:modelValue', event.target.value)
    }

    return {
      change
    }
  }
}
</script>
