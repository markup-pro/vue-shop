<template>
  <div :class="['form-control', { invalid: error }]">
    <label v-if="label" :for="id">{{ label }}</label>
    <input
      :type="type"
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      @input="change">
    <small v-if="error">{{ error }}</small>
  </div>
</template>

<script>
export default {
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: [String, Number]
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
    type: {
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
