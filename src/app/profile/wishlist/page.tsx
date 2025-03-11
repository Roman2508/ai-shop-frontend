'use client'

import React from 'react'

import { Button } from '@/components/ui/common/Button'
import CatalogCard from '@/components/features/CatalogCard'
import ButtonWithIcon from '@/components/ui/custom/ButtonWithIcon'
import ProfileLayout from '@/components/layout/profile/ProfileLayout'

const WishlistPage = () => {
  return (
    <ProfileLayout>
      <div className="flex justify-between items-center pb-[40]">
        <h1 className="text-3xl font-semibold">Список бажань</h1>

        <div className="flex gap-[10]">
          <ButtonWithIcon iconSrc="/icons/list.png" text="МОЇ ЗАМОВЛЕННЯ" buttonVariant="secondary" classNames="" />
          <Button size="icon" className="h-[44] w-[44]">
            0
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-[18]">
        {[...Array(10)].map((_) => (
          <CatalogCard viewType={'cards'} />
        ))}
      </div>
    </ProfileLayout>
  )
}

export default WishlistPage
