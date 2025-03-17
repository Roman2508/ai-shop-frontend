import { useShallow } from 'zustand/react/shallow'

import { cartStore } from '@/store/cart/cart.store'

export const useCart = () => {
  //   const cartItems = cartStore((state) => state.cartItems)
  const {
    cartItems,
    selectedCartItems,
    setCartItems,
    changeCartItemsCount,
    addItemToCart,
    removeItemFromCart,
    changeSelectedCartItemsCount,
    toggleSelectedCartItems,
  } = cartStore(
    useShallow((state) => ({
      cartItems: state.cartItems,
      selectedCartItems: state.selectedCartItems,
      setCartItems: state.setCartItems,
      changeCartItemsCount: state.changeCartItemsCount,
      addItemToCart: state.addItemToCart,
      removeItemFromCart: state.removeItemFromCart,
      changeSelectedCartItemsCount: state.changeSelectedCartItemsCount,
      toggleSelectedCartItems: state.toggleSelectedCartItems,
    }))
  )

  return {
    cartItems,
    selectedCartItems,
    setCartItems,
    changeCartItemsCount,
    addItemToCart,
    removeItemFromCart,
    changeSelectedCartItemsCount,
    toggleSelectedCartItems,
  }
}
