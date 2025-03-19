import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { ICartItem, ICartStore } from './cart.types'
import { ProductModel } from '@/graphql/generated/output'

export const cartStore = create(
  persist<ICartStore>(
    (set, get) => ({
      cartItems: [],
      setCartItems: (items: ICartItem[]) => {
        set({ cartItems: items })
      },
      changeCartItemsCount: (id: string, count: number) => {
        const cartItems = get().cartItems.map((el) => {
          if (el.id === id) {
            return { ...el, count }
          }
          return el
        })
        set({ cartItems })
        // set((store) => {
        //   const cartItems = store.cartItems.map((el) => {
        //     if (el.product.id === id) {
        //       return { ...el, count }
        //     }
        //     return el
        //   })
        //   return { ...store, cartItems }
        // })
      },
      addItemToCart: (item: ICartItem) => {
        console.log('Add')
        set({ cartItems: [...get().cartItems, item] })
      },
      removeItemFromCart: (id: string) => {
        const cartItems = get().cartItems.filter((el) => el.product.id !== id)
        set({ cartItems })
      },

      //

      selectedCartItems: [],
      changeSelectedCartItemsCount: (id: string, count: number) => {
        const selectedCartItems = get().selectedCartItems.map((el) => {
          if (el.id === id) {
            return { ...el, count }
          }
          return el
        })
        set({ selectedCartItems })
      },
      toggleSelectedCartItems: (id: string, count: number, product: ProductModel) => {
        const isAdded = get().selectedCartItems.some((el) => el.product.id === id)
        if (isAdded) {
          const selectedCartItems = get().selectedCartItems.filter((el) => el.product.id !== id)
          set({ selectedCartItems })
        } else {
          const selectedCartItems = [...get().selectedCartItems, { id, count, product }]
          set({ selectedCartItems })
        }
      },
    }),
    {
      name: 'cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
