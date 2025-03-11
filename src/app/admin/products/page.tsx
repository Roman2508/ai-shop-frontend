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
import { Skeleton } from '@/components/ui/common/Skeleton'

interface AdminProductsPageProps {}

const AdminProductsPage: React.FC<AdminProductsPageProps> = ({}) => {
  const { data, loading } = useGetAllProductsQuery()

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
          <h1 className="text-3xl font-semibold">Title</h1>

          <div className="flex gap-[10]">
            <Button variant="outline" className="h-[36]">
              Фільтр
            </Button>
            <Button variant="default" className="h-[36]">
              + Додати товар
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <Checkbox />
              </TableHead>
              <TableHead className="text-center">Фото</TableHead>
              <TableHead className="text-center">Заголовок</TableHead>
              <TableHead className="text-center">Ціна</TableHead>
              <TableHead className="text-center">К-ть на складі</TableHead>
              <TableHead className="text-center">Статус</TableHead>
              <TableHead className="text-center">Дії</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data ? (
              data.getAllProducts.products.map((product) => {
                const productName = product
                  ? `${product.brand}, ${product.ram}/${product.builtInMemory} ГБ, ${product.color}`
                  : ''

                return (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      <Checkbox />
                    </TableCell>

                    <TableCell className="text-center">
                      <div>
                        <img
                          className="h-[50] w-[50] object-cover"
                          src="https://www.shutterstock.com/image-vector/no-image-available-icon-template-600nw-1036735678.jpg"
                        />
                      </div>
                      {/* <Image src="" alt="" width={30} height={30} /> */}
                    </TableCell>

                    <TableCell className="w-full max-w-[40%]">{productName}</TableCell>

                    <TableCell className="text-center text-primary font-bold">
                      {product.price.toLocaleString('uk-UA')} грн.
                    </TableCell>

                    <TableCell className="text-center">{Math.round(Math.random() * 20)}</TableCell>

                    <TableCell className="text-center">Credit Card</TableCell>

                    <TableCell className="text-center">
                      <Button size="icon" variant="outline" className="w-[42] h-[42] mr-[10]">
                        Edit
                      </Button>
                      <Button size="icon" variant="outline" className="w-[42] h-[42]">
                        Del
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <>
                {Array(10)
                  .fill(null)
                  .map((_, index) => (
                    <TableRow>
                      <TableCell className="text-center">
                        <Skeleton className="h-[20] w-[20px] rounded-[0]" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Skeleton className="h-[50] w-[50px] rounded-[0]" />
                      </TableCell>
                      <TableCell className="w-full max-w-[40%]">
                        <Skeleton className="h-[20] w-[100%] rounded-[0]" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Skeleton className="h-[20] w-[100%] rounded-[0]" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Skeleton className="h-[20] w-[100px] rounded-[0]" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Skeleton className="h-[20] w-[100px] rounded-[0]" />
                      </TableCell>
                      <TableCell className="flex justify-center gap-[10]">
                        <Skeleton className="h-[45] w-[45]" />
                        <Skeleton className="h-[45] w-[45]" />
                      </TableCell>
                    </TableRow>
                  ))}
              </>
            )}
          </TableBody>
        </Table>

        <Pagination className="mt-[40]">
          <PaginationContent>
            <PaginationItem>
              {/* <PaginationPrevious href="#" /> */}
              <Button variant="link" className="px-[5]">
                {'< Назад'}
              </Button>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              {/* <PaginationNext href="#" /> */}
              <Button variant="link" className="px-[5]">
                {'Вперед >'}
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default AdminProductsPage
