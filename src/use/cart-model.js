import { useStore } from 'vuex'

export function useCartModel (id) {
  const store = useStore()

  function updateCartModel (count) {
    store.dispatch('cart/updateCartModel', { id, count })
  }

  return {
    updateCartModel
  }
}
