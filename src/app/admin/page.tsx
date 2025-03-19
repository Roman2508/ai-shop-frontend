'use client'
import React from 'react'
import Link from 'next/link'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/common/Breadcrumb'
import { Card } from '@/components/ui/common/Card'
import { Button } from '@/components/ui/common/Button'
import { useTranslations } from 'next-intl'

const AdminPage = () => {
  const t = useTranslations('admin.main')

  return (
    <div className="max-w-[1640] mx-auto px-[16]">
      <Breadcrumb className="mb-[45]">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/">{t('breadcrumbs.home')}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>{t('breadcrumbs.admin')}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-[46]">
        <div className="flex justify-between align-center">
          <h1 className="font-bold text-lg">{t('title')}</h1>

          <div className="flex gap-[10]">
            <Link href="/admin/products">
              <Button variant="outline" className="h-[36] w-[160]">
                {t('editProductsButton')}
              </Button>
            </Link>

            <Link href="/admin/users">
              <Button variant="outline" className="h-[36] w-[160]">
                {t('editUsersButton')}
              </Button>
            </Link>
          </div>
        </div>

        <div>
          <div className="flex justify-between gap-[20]">
            <Card className="p-[20] flex-1">
              <b className="text-lg">{t('income')}</b>
              <p>1 411 992 грн</p>
            </Card>

            <Card className="p-[20] flex-1">
              <b className="text-lg"> {t('products')}</b>
              <p>55</p>
            </Card>

            <Card className="p-[20] flex-1">
              <b className="text-lg"> {t('brands')}</b>
              <p>12</p>
            </Card>

            <Card className="p-[20] flex-1">
              <b className="text-lg"> {t('rating')}</b>
              <p>5</p>
            </Card>
          </div>

          <div className="flex justify-between gap-[20] mt-[20]">
            <Card className="p-[20] w-[calc(60%-10px)]">
              <b className="text-lg"> {t('income_stat')}</b>
              <p>5</p>
            </Card>

            <Card className="p-[20] w-[calc(40%-10px)]">
              <b className="text-lg"> {t('buyers')}</b>
              <p>5</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
