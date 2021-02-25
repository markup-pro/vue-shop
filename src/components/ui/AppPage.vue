<template>
  <div class="breadcrumbs" v-if="back">
    <router-link :to="backLink" class="text-white">{{ backText }}</router-link>
  </div>
  <div class="card">
    <div class="card-title" v-if="title">
      <h1>{{ title }}</h1>
      <slot name="header"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    titleHead: {
      type: String
    },
    back: {
      type: Boolean,
      default: false
    },
    backText: {
      type: String,
      default: ''
    },
    backLink: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    document.title = props.titleHead ? `${props.titleHead} | Shop Food` : 'Shop Food'
  }
}
</script>
