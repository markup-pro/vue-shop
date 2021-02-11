<template>
  <div :class="['form-control', { invalid: error }]">
    <label :for="id">{{ label }}</label>
    <select :id="id" @input="change">
      <option selected>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.id"
        :selected="modelValue === option.type"
        :value="option.type">{{ option.title }}</option>
    </select>
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
    options: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String
    }
  },
  setup (_, context) {
    function change (event) {
      console.log(event)
      context.emit('update:modelValue', event.target.value)
    }

    return {
      change
    }
  }
}
</script>
