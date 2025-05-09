'use client'

import React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/common/Breadcrumb'
import {
  ProductModel,
  GetAllProductsQuery,
  useGetAllProductsQuery,
  PaginateAndFilterInput,
  usePaginateAndFilterProductsQuery,
} from '@/graphql/generated/output'
import { useAuth } from '@/hooks/useAuth'
import { useCurrent } from '@/hooks/useCurrent'
import { Card } from '@/components/ui/common/Card'
import { Button } from '@/components/ui/common/Button'
import CatalogCard from '@/components/features/CatalogCard'
import ProductsPagination from '@/components/features/ProductsPagination'
import CatalogCardSkeleton from '@/components/features/CatalogCardSkeleton'
import ProductFilter from '@/components/features/product-filter/ProductFilter'
import CatalogFilters from '@/components/features/catalog-filters/CatalogFilters'

const CatalogPage = () => {
  const t = useTranslations('catalog')

  const { user } = useCurrent()
  const { isAuthentificated } = useAuth()

  const [isLoading, setIsLoading] = React.useState(false)
  const [maxPrice, setMaxPrice] = React.useState(100000)
  const [total, setTotal] = React.useState(0)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [filter, setFilter] = React.useState<PaginateAndFilterInput>({})
  const [viewType, setViewType] = React.useState<'cards' | 'rows'>('cards')
  const [data, setData] = React.useState<GetAllProductsQuery | null>(null)

  const [products, setProducts] = React.useState<ProductModel[]>([])

  const { refetch: refetchAllProducts } = useGetAllProductsQuery({
    variables: { userId: user ? user.id : '' },
    skip: true,
  })
  const { refetch: refetchFilteredData } = usePaginateAndFilterProductsQuery({
    variables: { query: filter },
    skip: true,
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

  const fetchFilteredData = async (additionalFilter: PaginateAndFilterInput | undefined = {}, mode?: 'remove-all') => {
    try {
      setIsLoading(true)

      let filteredData = null
      if (mode && mode === 'remove-all') {
        const { data } = await refetchFilteredData({ query: {} })
        filteredData = data
      } else {
        const { data } = await refetchFilteredData({ query: { ...filter, ...additionalFilter } })
        filteredData = data
      }
      const items = filteredData?.paginateAndFilter ? filteredData.paginateAndFilter.products : []
      setProducts(items as ProductModel[])
      const total = filteredData?.paginateAndFilter ? filteredData.paginateAndFilter.total : 0
      setTotal(total)
    } finally {
      setIsLoading(false)
    }
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

  React.useEffect(() => {
    const fetchData = async () => {
      if (isAuthentificated) {
        if (!user) return
        const { data } = await refetchAllProducts({ userId: user.id })
        setData(data)
      } else {
        const { data } = await refetchAllProducts()
        setData(data)
      }
    }
    fetchData()
  }, [isAuthentificated, user])

  const getFilters = (filters: PaginateAndFilterInput) => {
    let filtersArray: { key: keyof PaginateAndFilterInput; value: string }[] = []
    Object.keys(filters).map((key) => {
      // @ts-ignore
      const filterItem = { key: key, value: String(filters[key]).replaceAll(';', ', ') }
      // @ts-ignore
      filtersArray.push(filterItem)
    })
    return filtersArray
  }

  const removeFilter = (key?: keyof typeof filter) => {
    if (key) {
      setFilter((prev) => {
        const { [key]: _, ...rest } = prev
        console.log('rest', { ...rest, [key]: '' })
        fetchFilteredData({ ...rest, [key]: '' })
        return rest
      })
    } else {
      setFilter({})
      fetchFilteredData({}, 'remove-all')
      window.scrollTo({ top: 0 })
    }
  }

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
            <BreadcrumbPage>{t('breadcrumbs.catalog')}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-xl font-semibold mb-[45px]">{t('title')}</h1>

      <div className="flex items-baseline gap-[40px]">
        {/* filters */}
        <Card className="px-[20px] py-[28px] w-[300px] min-w-[300px] hidden xl:block">
          <ProductFilter
            filter={filter}
            maxPrice={maxPrice}
            setFilter={setFilter}
            removeFilter={removeFilter}
            fetchFilteredData={fetchFilteredData}
            handleChangeFilter={handleChangeFilter}
          />
        </Card>

        <div className="flex flex-col gap-[34px] grow">
          {/* catalog filters */}
          <CatalogFilters
            filter={filter}
            maxPrice={maxPrice}
            viewType={viewType}
            setFilter={setFilter}
            setViewType={setViewType}
            removeFilter={removeFilter}
            fetchFilteredData={fetchFilteredData}
            handleChangeFilter={handleChangeFilter}
          />

          {getFilters(filter).length > 0 && (
            <div>
              <h1 className="text-sm font-semibold mb-[15px]">Активні фільтри</h1>
              <div className="flex flex-wrap gap-4">
                {getFilters(filter).map((el) => (
                  <Button variant="outline" onClick={() => removeFilter(el.key)}>
                    {el.key}: {el.value}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* catalog cards */}
          <div
            className={
              viewType === 'cards'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-[18px]'
                : 'grid grid-cols-1 gap-[18px]'
            }
          >
            {!isLoading && data
              ? products.map((product) => <CatalogCard product={product} viewType={viewType} />)
              : [...Array(12)].map((_, index) => <CatalogCardSkeleton key={index} viewType={viewType} />)}
          </div>

          <ProductsPagination
            total={total}
            filter={filter}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            fetchFilteredData={fetchFilteredData}
          />
        </div>
      </div>
    </div>
  )
}

export default CatalogPage
