import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { IOrder } from './order.types'
import { IOrderStore } from './order.types'

export const orderStore = create(
  persist<IOrderStore>(
    (set, get) => ({
      payedOrders: [],
      deliveredOrders: [],
      setOrder(order: IOrder[]) {
        const payedOrders = order.filter((el) => el.status === 'PAYED')
        const deliveredOrders = order.filter((el) => el.status === 'DELIVERED')

        set({ payedOrders, deliveredOrders })
      },
      addOrder(item: IOrder) {
        set({ payedOrders: [...get().payedOrders, item] })
      },
    }),
    {
      name: 'order',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
