import { wishlistStore } from '@/store/wishlist/wishlist.store'
import { useShallow } from 'zustand/react/shallow'

export const useWishlist = () => {
  const { wishlistItems, setWishlistItems, addItemToWishlist, removeItemFromWishlist } = wishlistStore(
    useShallow((state) => ({
      wishlistItems: state.wishlistItems,
      setWishlistItems: state.setWishlistItems,
      addItemToWishlist: state.addItemToWishlist,
      removeItemFromWishlist: state.removeItemFromWishlist,
    }))
  )

  return { wishlistItems, setWishlistItems, addItemToWishlist, removeItemFromWishlist }
}
