import { useShallow } from 'zustand/react/shallow'

import { orderStore } from '@/store/order/order.store'

export const useOrder = () => {
  const { payedOrders, deliveredOrders, setOrder, addOrder } = orderStore(
    useShallow((state) => ({
      payedOrders: state.payedOrders,
      deliveredOrders: state.deliveredOrders,
      setOrder: state.setOrder,
      addOrder: state.addOrder,
    }))
  )

  return { payedOrders, deliveredOrders, setOrder, addOrder }
}
