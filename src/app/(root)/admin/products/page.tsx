'use client'
import React from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { Trash2, Edit2 } from 'lucide-react'

import {
  ProductModel,
  useGetAllProductsQuery,
  PaginateAndFilterInput,
  useDeleteProductMutation,
  usePaginateAndFilterProductsQuery,
} from '@/graphql/generated/output'
import {
  Drawer,
  DrawerClose,
  DrawerTitle,
  DrawerHeader,
  DrawerContent,
  DrawerTrigger,
  DrawerDescription,
} from '@/components/ui/common/Drawer'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/common/Breadcrumb'
import getPhotoUrl from '@/utils/get-photo-url'
import getProductTitle from '@/utils/getProductTitle'
import { Button } from '@/components/ui/common/Button'
import { Skeleton } from '@/components/ui/common/Skeleton'
import ProductsPagination from '@/components/features/ProductsPagination'
import ProductFilter from '@/components/features/product-filter/ProductFilter'
import { Table, TableRow, TableBody, TableCell, TableHead, TableHeader } from '@/components/ui/common/Table'
import { useCurrent } from '@/hooks/useCurrent'

const AdminProductsPage = () => {
  const t = useTranslations('admin.products')

  const { user } = useCurrent()

  const [total, setTotal] = React.useState(0)
  const [maxPrice, setMaxPrice] = React.useState(100000)
  const [isLoading, setIsLoading] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [products, setProducts] = React.useState<ProductModel[]>([])
  const [filter, setFilter] = React.useState<PaginateAndFilterInput>({})

  const { data } = useGetAllProductsQuery({ variables: { userId: user ? user.id : '' } })
  const { refetch: refetchFilteredData } = usePaginateAndFilterProductsQuery({
    variables: { query: filter },
    skip: true,
  })

  const [deleteProduct] = useDeleteProductMutation({
    onCompleted() {
      toast.success('Товар було видалено')
    },
    onError(data) {
      if (data) toast.error(data.message)
      else toast.error('Помилка при видаленні товару')
    },
  })

  const handleChangeFilter = (key: keyof PaginateAndFilterInput, value: string) => {
    setFilter((prev: PaginateAndFilterInput) => {
      let newFilters: PaginateAndFilterInput = {}
      const filterKeys = ['priceFrom', 'priceTo', 'sortBy', 'limit', 'skip']

      if (filterKeys.some((el) => el === key)) {
        return { ...prev, [key]: Number(value) }
      }

      if (!prev[key]) {
        newFilters = { ...prev, [key]: value }
      }

      if (key in prev && typeof prev[key] === 'string') {
        const prevSelected = prev[key].split(';')

        if (!prevSelected.length) {
          newFilters = { ...prev, [key]: value }
        }

        if (prevSelected.some((el) => el === value)) {
          const filterSelected = prevSelected.filter((el) => el !== value).join(';')
          newFilters = { ...prev, [key]: filterSelected }
        } else {
          newFilters = { ...prev, [key]: `${prev[key]};${value}` }
        }
      }

      const withoutEmpty: PaginateAndFilterInput = {}

      for (const key in newFilters) {
        if (!!newFilters[key as keyof PaginateAndFilterInput]) {
          // @ts-ignore
          withoutEmpty[key] = newFilters[key as keyof PaginateAndFilterInput]
        }
      }

      return withoutEmpty
    })
  }

  const fetchFilteredData = async (additionalFilter: PaginateAndFilterInput | undefined = {}) => {
    try {
      setIsLoading(true)
      const { data: filteredData } = await refetchFilteredData({ query: { ...filter, ...additionalFilter } })

      const items = filteredData?.paginateAndFilter ? filteredData.paginateAndFilter.products : []
      setProducts(items as ProductModel[])
      const total = filteredData?.paginateAndFilter ? filteredData.paginateAndFilter.total : 0
      setTotal(total)
    } finally {
      setIsLoading(false)
    }
  }

  const onClearFilters = async () => {
    setFilter({})
    const { data: filteredData } = await refetchFilteredData({
      query: {},
    })
    const items = filteredData?.paginateAndFilter ? filteredData.paginateAndFilter.products : []
    setProducts(items as ProductModel[])
  }

  const onDeleteProduct = async (productId: string) => {
    if (!window.confirm('Ви дійсно хочете видалити цей товар?')) return
    await deleteProduct({ variables: { productId } })
    setProducts((prev) => prev.filter((el) => el.id !== productId))
  }

  React.useEffect(() => {
    if (!products.length) {
      const items = data?.getAllProducts ? data.getAllProducts.products : []
      setProducts(items as ProductModel[])
      const total = data?.getAllProducts ? data.getAllProducts.total : 0
      setTotal(total)
    }

    if (!data?.getAllProducts.products.length) return
    let maxPrice = 0

    data.getAllProducts.products.forEach((el) => {
      if (el.price > maxPrice) {
        maxPrice = el.price
      }
    })
    setMaxPrice(maxPrice)
  }, [data])

  return (
    <div className="max-w-[1640px] mx-auto px-[16px]">
      <Breadcrumb className="mb-[45px]">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/">{t('breadcrumbs.home')}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/admin">{t('breadcrumbs.admin')}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{t('breadcrumbs.products')}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-[46px]">
        <div className="flex justify-between items-center flex-wrap flex-col md:flex-row gap-[20]">
          <h1 className="text-3xl font-semibold">{t('title')}</h1>

          <div className="flex gap-[10px]">
            {!!Object.keys(filter).length && (
              <Button variant="link" className="h-[36]" onClick={onClearFilters}>
                {t('buttons.clear')}
              </Button>
            )}

            <Drawer>
              <DrawerTrigger>
                <Button variant="outline" className="h-[36px]">
                  {t('buttons.filter')}
                </Button>
              </DrawerTrigger>

              <DrawerContent>
                <DrawerHeader>
                  <div className="flex justify-between items-center">
                    <DrawerTitle>{t('buttons.filter')}</DrawerTitle>

                    <DrawerClose>
                      <Button variant="secondary" size="icon">
                        X
                      </Button>
                    </DrawerClose>
                  </div>

                  <DrawerDescription>
                    <ProductFilter
                      filter={filter}
                      maxPrice={maxPrice}
                      setFilter={setFilter}
                      DrawerClose={DrawerClose}
                      removeFilter={onClearFilters}
                      fetchFilteredData={fetchFilteredData}
                      handleChangeFilter={handleChangeFilter}
                    />
                  </DrawerDescription>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>

            <Link href="/admin/products/create">
              <Button variant="default" className="h-[36px]">
                + {t('buttons.create')}
              </Button>
            </Link>
          </div>
        </div>

        <Table>
          <TableHeader className="text-xs md:text-sm">
            <TableRow>
              <TableHead className="text-center">{t('table.photo')}</TableHead>
              <TableHead className="text-center">{t('table.title')}</TableHead>
              <TableHead className="text-center">{t('table.price')}</TableHead>
              <TableHead className="text-center">{t('table.count')}</TableHead>
              <TableHead className="text-center">{t('table.status')}</TableHead>
              <TableHead className="text-center">{t('table.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length ? (
              products.map((product) => {
                const productName = getProductTitle(product)

                return (
                  <TableRow key={product.id} className="text-xs md:text-sm">
                    <TableCell className="text-center">
                      <div>
                        <img
                          className="h-[50px] w-[50px] object-cover"
                          src={
                            product.images.length
                              ? getPhotoUrl(product.images[0], 'products')
                              : '/images/empty-image.webp'
                          }
                        />
                      </div>
                    </TableCell>

                    <TableCell className="w-full max-w-[40%]">{productName}</TableCell>

                    <TableCell className="text-center text-primary font-bold">
                      {product.price.toLocaleString('uk-UA')} грн.
                    </TableCell>

                    <TableCell className="text-center">{Math.round(Math.random() * 20)}</TableCell>

                    <TableCell className="text-center">{t('status')}</TableCell>

                    <TableCell className="text-center whitespace-nowrap">
                      <Link href={`/admin/products/update/${product.id}`}>
                        <Button
                          size="icon"
                          variant="outline"
                          disabled={isLoading}
                          className="w-[32px] h-[32px] md:w-[42px] md:h-[42px] mr-[5px] md:mr-[10px]"
                        >
                          <Edit2 />
                        </Button>
                      </Link>

                      <Button
                        size="icon"
                        variant="outline"
                        disabled={isLoading}
                        className="w-[32px] h-[32px] md:w-[42px] md:h-[42px]"
                        onClick={() => onDeleteProduct(product.id)}
                      >
                        <Trash2 />
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
                    <TableRow key={index}>
                      <TableCell className="text-center">
                        <Skeleton className="h-[20px] w-[20px] rounded-[0px]" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Skeleton className="h-[50px] w-[50px] rounded-[0px]" />
                      </TableCell>
                      <TableCell className="w-full max-w-[40%]">
                        <Skeleton className="h-[20px] w-[100%] rounded-[0px]" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Skeleton className="h-[20px] w-[100%] rounded-[0px]" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Skeleton className="h-[20px] w-[100px] rounded-[0px]" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Skeleton className="h-[20px] w-[100px] rounded-[0px]" />
                      </TableCell>
                      <TableCell className="flex justify-center gap-[10px]">
                        <Skeleton className="h-[45px] w-[45px]" />
                        <Skeleton className="h-[45px] w-[45px]" />
                      </TableCell>
                    </TableRow>
                  ))}
              </>
            )}
          </TableBody>
        </Table>

        <ProductsPagination
          total={total}
          filter={filter}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          fetchFilteredData={fetchFilteredData}
        />
      </div>
    </div>
  )
}

export default AdminProductsPage
