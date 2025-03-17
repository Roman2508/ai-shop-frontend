'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

import { useCurrent } from '@/hooks/useCurrent'
import { useWishlist } from '@/hooks/useWishlist'
import { Button } from '@/components/ui/common/Button'
import CatalogCard from '@/components/features/CatalogCard'
import ButtonWithIcon from '@/components/ui/custom/ButtonWithIcon'
import ProfileLayout from '@/components/layout/profile/ProfileLayout'

const WishlistPage = () => {
  const t = useTranslations('profile')

  const { user } = useCurrent()
  const { setWishlistItems } = useWishlist()

  React.useEffect(() => {
    if (!user || !user.favorites) return
    setWishlistItems(user.favorites)
  }, [user])

  return (
    <ProfileLayout>
      <div className="flex justify-between items-center pb-[40]">
        <h1 className="text-3xl font-semibold">{t('wishlist.title')}</h1>

        <div className="flex gap-[10]">
          <ButtonWithIcon
            classNames=""
            iconSrc="/icons/list.png"
            buttonVariant="secondary"
            text={t('orders.ordersButton')}
          />
          <Button size="icon" className="h-[44] w-[44]">
            0
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-[18]">
        {user
          ? user.favorites.map((favourite) => <CatalogCard viewType={'cards'} product={favourite.product} />)
          : 'Loading...'}
      </div>
    </ProfileLayout>
  )
}

export default WishlistPage
