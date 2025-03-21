'use client'

import React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { useOrder } from '@/hooks/useOrder'
import { useCurrent } from '@/hooks/useCurrent'
import { useWishlist } from '@/hooks/useWishlist'
import { Button } from '@/components/ui/common/Button'
import { ProductModel } from '@/graphql/generated/output'
import CatalogCard from '@/components/features/CatalogCard'
import { IWishlistItem } from '@/store/wishlist/wishlist.types'
import ButtonWithIcon from '@/components/ui/custom/ButtonWithIcon'
import ProfileLayout from '@/components/layout/profile/ProfileLayout'

const WishlistPage = () => {
  const t = useTranslations('profile')

  const { user } = useCurrent()
  const { payedOrders } = useOrder()
  const { setWishlistItems } = useWishlist()

  React.useEffect(() => {
    if (!user || !user.favorites) return
    setWishlistItems(user.favorites as IWishlistItem[])
  }, [user])

  return (
    <ProfileLayout>
      <div className="flex justify-between items-center pb-[40]">
        <h1 className="text-3xl font-semibold">{t('wishlist.title')}</h1>

        <div className="flex gap-[10]">
          <Link href="/profile/orders">
            <ButtonWithIcon
              classNames=""
              iconSrc="/icons/list.png"
              buttonVariant="secondary"
              text={t('orders.ordersButton')}
            />
          </Link>
          <Button size="icon" className="h-[44] w-[44]">
            {payedOrders.length}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-[18]">
        {user
          ? user.favorites.map((favourite) => (
              <CatalogCard viewType={'cards'} product={favourite.product as ProductModel} />
            ))
          : 'Loading...'}
      </div>
    </ProfileLayout>
  )
}

export default WishlistPage
