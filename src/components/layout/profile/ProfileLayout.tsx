'use client'

import React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/common/Tabs'
import { Heart, ListOrdered, MessageCircle, ShoppingCart, User, Wrench } from 'lucide-react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/common/Breadcrumb'
import { useCurrent } from '@/hooks/useCurrent'
import { Card } from '@/components/ui/common/Card'

const ProfileLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathname = usePathname()

  const t = useTranslations('profile')

  const { user } = useCurrent()

  const linksList = [
    {
      label: t('links.profile'),
      icon: <User className="p-[2]" />,
      iconActive: <User className="p-[2] text-primary" />,
      link: '/profile/personal-information',
    },
    {
      label: t('links.orders'),
      icon: <ListOrdered className="p-[2]" />,
      iconActive: <ListOrdered className="p-[2] text-primary" />,
      link: '/profile/orders',
    },
    {
      label: t('links.cart'),
      icon: <ShoppingCart className="p-[2]" />,
      iconActive: <ShoppingCart className="p-[2] text-primary" />,
      link: '/profile/cart',
    },
    {
      label: t('links.wishlist'),
      icon: <Heart className="p-[2]" />,
      iconActive: <Heart className="p-[2] text-primary" />,
      link: '/profile/wishlist',
    },
    {
      label: t('links.reviws'),
      icon: <MessageCircle className="p-[2]" />,
      iconActive: <MessageCircle className="p-[2] text-primary" />,
      link: '/profile/reviws',
    },
    {
      label: t('links.admin'),
      icon: <Wrench className="p-[2]" />,
      iconActive: <Wrench className="p-[2] text-primary" />,
      link: '/admin',
    },
  ]

  return (
    <div className="max-w-[1640px] mx-auto px-[16px]">
      <Breadcrumb className="mb-[45px]">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/">{t('personalInformation.breadcrumbs.home')}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>{t('personalInformation.breadcrumbs.profile')}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="block xl:hidden flex justify-center mb-[40px]">
        <Tabs defaultValue="description">
          <TabsList className="grid grid-cols-3 gap-[40px] h-[150px] sm:h-[60px] sm:block">
            {linksList.map((el) => {
              const isAdminPage = el.link.includes('admin')
              if (isAdminPage && (!user || user?.role === 'USER')) return

              return (
                <TabsTrigger
                  key={el.label}
                  value={el.label}
                  className="text-sm p-[5px] md:px-[10px] md:py-[5px] h-[40px]"
                >
                  <Link
                    key={el.link}
                    href={el.link}
                    className="flex items-center gap-[5px] pb-[10px] mb-[10px] border-b border-dashed flex-col"
                  >
                    {pathname === el.link ? el.iconActive : el.icon}
                    <p className={pathname === el.link ? 'text-primary font-semibold' : ''}>{el.label}</p>
                  </Link>
                </TabsTrigger>
              )
            })}
          </TabsList>
        </Tabs>
      </div>

      <div className="flex items-baseline gap-[46px]">
        <Card className="w-[300px] py-[20px] px-[25px] sticky top-[100px] hidden xl:block">
          {linksList.map((el) => {
            const isAdminPage = el.link.includes('admin')
            if (isAdminPage && (!user || user?.role === 'USER')) return

            return (
              <Link
                key={el.link}
                href={el.link}
                className="flex items-center gap-[15px] pb-[10px] mb-[10px] border-b border-dashed"
              >
                {pathname === el.link ? el.iconActive : el.icon}
                <p className={pathname === el.link ? 'text-primary font-semibold' : ''}>{el.label}</p>
              </Link>
            )
          })}
        </Card>

        <div className="w-full">{children}</div>
      </div>
    </div>
  )
}

export default ProfileLayout
