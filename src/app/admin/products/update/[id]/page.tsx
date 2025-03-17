'use client'
import React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/common/Breadcrumb'
import { useGetProductByIdQuery } from '@/graphql/generated/output'
import ProductActionsForm from '@/components/features/product-actions-form/ProductActionsForm'

const UpdateProductPage = () => {
  const { id } = useParams()

  const { data: product } = useGetProductByIdQuery({
    variables: { productId: typeof id === 'string' ? id : '' },
  })

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
          <h1 className="text-3xl font-semibold">Оновити товар</h1>

          <div className="flex gap-[10]"></div>
        </div>

        <ProductActionsForm product={product?.getProductById} id={id} />
      </div>
    </div>
  )
}

export default UpdateProductPage
