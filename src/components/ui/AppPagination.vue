<template>
  <slot :data="chunkData[page - 1]"></slot>
  <div class="pagination" v-if="chunkData.length > 0">
    <button
      :disabled="page === 1"
      class="pagination__item pagination__item_nav"
      @click.prevent="page -= 1">&#5176;</button>
    <div :class="['pagination__item', {'pagination__item_active' : page === item}]"
         v-for="item in chunkData.length"
         :key="item"
         @click="page = item">{{ item }}</div>
    <button
      :disabled="page === chunkData.length"
      class="pagination__item pagination__item_nav"
      @click.prevent="page += 1">&#5171;</button>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { chunkArray } from '@/utils/chunk-array'

export default {
  props: {
    data: {
      type: Array
    },
    chunk: {
      type: Number,
      default: 10
    }
  },
  setup (props) {
    const router = useRouter()
    const route = useRoute()
    const chunkData = computed(() => chunkArray(props.chunk, props.data))
    const page = ref(1)

    onMounted(() => {
      const routeQuery = +route.query.page
      if (!routeQuery) {
        router.replace({ query: { page: page.value } })
      } else {
        page.value = routeQuery > chunkData.value.length ? chunkData.value.length : routeQuery
      }
    })

    watch(page, () => {
      router.replace({ query: { page: page.value } })
    })

    return {
      chunkData,
      page
    }
  }
}
</script>

<style lang="scss">
.pagination {
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 35px;
    height: 32px;
    cursor: pointer;
    padding: 5px;
    margin: 0 5px;
    border: 1px solid #3eaf7c;
    color: #3eaf7c;
    border-radius: 3px;
    background-color: transparent;
    transition: all .25s;

    &:focus {
      outline: none;
    }

    &:disabled {
      opacity: .5;
      cursor: not-allowed;
    }

    &:hover:not(&:disabled),
    &_active {
      color: #fff;
      background-color: #3eaf7c;
    }

    &_active {
      cursor: default;
    }

    &_nav {
      border: 0;
      margin: 0;
    }
  }
}
</style>
