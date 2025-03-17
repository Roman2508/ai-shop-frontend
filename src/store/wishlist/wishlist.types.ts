import { ProductModel } from '@/graphql/generated/output'

export interface IWishlistItem {
  product: ProductModel
}

export interface IWishlistStore {
  wishlistItems: IWishlistItem[]
  setWishlistItems: (items: IWishlistItem[]) => void
  addItemToWishlist: (item: IWishlistItem) => void
  removeItemFromWishlist: (id: string) => void
}
