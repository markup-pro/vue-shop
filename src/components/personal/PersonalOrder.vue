<template>
  <div :class="['personal-order', { 'personal-order_open': open }]">
    <div class="personal-order__head" @click="open = !open">
      <strong>{{ new Date(order.date).toLocaleString() }}</strong>, сумма заказа: <strong>{{ currency(sumOrder) }}</strong>
    </div>
    <div class="personal-order__content" v-show="open">
      <table class="personal-order__table">
        <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th>Наименование</th>
            <th>Количество</th>
            <th>Цена (шт)</th>
            <th>Сумма</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, idx) in order.list"
            :key="product.id">
            <td>{{ idx + 1 }}</td>
            <td><img :src="product.img" alt="item.title"></td>
            <td>{{ product.title }}</td>
            <td>{{ product.count }}</td>
            <td>{{ currency(product.price) }}</td>
            <td>{{ currency(product.price * product.count) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { currency } from '@/utils/currency'

export default {
  props: {
    order: {
      type: Object
    }
  },
  setup (props) {
    const open = ref(false)

    const sumOrder = computed(() => {
      let sum = 0
      props.order.list.forEach(el => {
        sum += el.count * el.price
      })
      return sum
    })

    return {
      open,
      currency,
      sumOrder
    }
  }
}
</script>

<style lang="scss">
.personal-order {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 3px rgba(0, 0, 0, .5);

  &__head,
  &__content {
    padding: 15px 10px;
  }

  &__head {
    position: relative;
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      top: 17px;
      right: 10px;
      width: 8px;
      height: 8px;
      border: 1px solid #000;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }

  &__table {
    width: 100%;

    tbody {
      td {
        padding: 10px 0;
        text-align: center;

        img {
          width: 60px;
        }
      }
    }
  }

  &_open & {
    &__head {
      &::before {
        top: 22px;
        transform: rotate(-135deg);
      }
    }
  }
}
</style>
