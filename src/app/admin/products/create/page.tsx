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
import { useGetAllProductsQuery } from '@/graphql/generated/output'
import CreateProductForm from '@/components/features/CreateProductForm'

interface AdminProductsPageProps {}

const AdminProductsPage: React.FC<AdminProductsPageProps> = ({}) => {
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
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Створити новий товар</h1>

          <div className="flex gap-[10]">
            <Button variant="outline" className="h-[36]">
              Фільтр
            </Button>
            <Button variant="default" className="h-[36]">
              + Додати товар
            </Button>
          </div>
        </div>

        <CreateProductForm />
      </div>
    </div>
  )
}

export default AdminProductsPage
