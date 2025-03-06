'use client'
import React from 'react'
import Link from 'next/link'

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableCaption,
} from '@/components/ui/common/Table'
import {
  Pagination,
  PaginationLink,
  PaginationItem,
  PaginationContent,
  PaginationEllipsis,
} from '@/components/ui/common/Pagination'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/common/Breadcrumb'
import { Button } from '@/components/ui/common/Button'
import { Checkbox } from '@/components/ui/common/Checkbox'
import { Card } from '@/components/ui/common/Card'

interface AdminPageProps {}

const AdminPage: React.FC<AdminPageProps> = ({}) => {
  return (
    <div className="max-w-[1640] mx-auto px-[16]">
      <Breadcrumb className="mb-[45]">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/components">Components</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-[46]">
        <div className="flex justify-between align-center">
          <h1 className="font-bold text-lg">Адміністрування</h1>

          <div className="flex gap-[10]">
            <Button variant="outline" className="h-[36]">
              Edit users
            </Button>
            <Button variant="outline" className="h-[36]">
              Edit products
            </Button>
          </div>
        </div>

        <div>
          <div className="flex justify-between gap-[20]">
            <Card className="p-[20] flex-1">
              Виручка
              <br />
              <b>1 411 992 грн</b>
            </Card>

            <Card className="p-[20] flex-1">
              Товари
              <br />
              <b>55</b>
            </Card>

            <Card className="p-[20] flex-1">
              Категорії (бренди)
              <br />
              <b>12</b>
            </Card>

            <Card className="p-[20] flex-1">
              Середній рейтинг
              <br />
              <b>5</b>
            </Card>
          </div>

          <div className="flex justify-between gap-[20] mt-[20]">
            <Card className="p-[20] w-[calc(60%-10px)]">
              Прибуток:
              <br />
              <b>Stats</b>
            </Card>

            <Card className="p-[20] w-[calc(40%-10px)]">
              Покупатели
              <br />
              <b>Buyers list</b>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
