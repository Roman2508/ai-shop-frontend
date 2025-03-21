import { ProductModel } from '@/graphql/generated/output'

export interface IOrderItem {
  id: string
  price: number
  product: ProductModel
  quantity: number
}

export interface IOrder {
  id: string
  createdAt: string
  items: IOrderItem[]
  status: 'PAYED' | 'DELIVERED'
  total: number
}

export interface IOrderStore {
  payedOrders: IOrder[]
  deliveredOrders: IOrder[]
  setOrder: (items: IOrder[]) => void
  addOrder: (items: IOrder) => void
}
