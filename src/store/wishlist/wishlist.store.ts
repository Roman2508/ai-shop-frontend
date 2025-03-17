import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { IWishlistItem, IWishlistStore } from './wishlist.types'

export const wishlistStore = create(
  persist<IWishlistStore>(
    (set, get) => ({
      wishlistItems: [],
      setWishlistItems: (wishlistItems: IWishlistItem[]) => {
        set({ wishlistItems })
      },
      addItemToWishlist: (item: IWishlistItem) => {
        set((store) => ({ ...store, wishlistItems: [...store.wishlistItems, item] }))
      },
      removeItemFromWishlist: (id: string) => {
        const wishlistItems = get().wishlistItems.filter((el) => el.id !== id)
        set({ wishlistItems })
      },
    }),
    {
      name: 'wishlist',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
