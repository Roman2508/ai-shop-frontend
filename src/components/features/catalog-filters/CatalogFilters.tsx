'use client'

import React from 'react'
import { useLocale, useTranslations } from 'next-intl'

import {
  Select,
  SelectItem,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from '@/components/ui/common/Select'
import {
  Drawer,
  DrawerClose,
  DrawerTitle,
  DrawerHeader,
  DrawerContent,
  DrawerTrigger,
  DrawerDescription,
} from '@/components/ui/common/Drawer'
import { Button } from '@/components/ui/common/Button'
import ViewCardIcon from '@/components/images/ViewCardIcon'
import ViewRowsIcon from '@/components/images/ViewRowsIcon'
import { PaginateAndFilterInput } from '@/graphql/generated/output'
import ProductFilter from '@/components/features/product-filter/ProductFilter'

interface ICatalogFiltersProps {
  maxPrice: number
  viewType: 'cards' | 'rows'
  filter: PaginateAndFilterInput
  removeFilter: (key?: keyof PaginateAndFilterInput) => void
  setViewType: React.Dispatch<React.SetStateAction<'cards' | 'rows'>>
  fetchFilteredData: (additionalFilter?: PaginateAndFilterInput) => void
  setFilter: React.Dispatch<React.SetStateAction<PaginateAndFilterInput>>
  handleChangeFilter: (key: keyof PaginateAndFilterInput, value: string) => void
}

const CatalogFilters: React.FC<ICatalogFiltersProps> = ({
  filter,
  viewType,
  maxPrice,
  setFilter,
  setViewType,
  removeFilter,
  fetchFilteredData,
  handleChangeFilter,
}) => {
  const t = useTranslations('catalog')

  const locale = useLocale()

  return (
    <div className="flex items-center justify-between gap-[50px] w-full flex-col md:flex-row">
      <div className="flex items-center gap-[10px]">
        <Drawer>
          <DrawerTrigger>
            <Button className="block xl:hidden">{locale === 'ua' ? 'Фільтри' : 'Filters'}</Button>
          </DrawerTrigger>

          <DrawerContent data-vaul-no-drag>
            <DrawerHeader>
              <div className="flex justify-between items-center">
                <DrawerTitle>{locale === 'ua' ? 'Фільтри' : 'Filters'}</DrawerTitle>

                <DrawerClose>
                  <Button variant="secondary" size="icon" className="">
                    X
                  </Button>
                </DrawerClose>
              </div>

              <DrawerDescription>
                <ProductFilter
                  filter={filter}
                  maxPrice={maxPrice}
                  setFilter={setFilter}
                  removeFilter={removeFilter}
                  fetchFilteredData={fetchFilteredData}
                  handleChangeFilter={handleChangeFilter}
                />
              </DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>

        <p className="text-nowrap hidden 2xl:block">{t('filter.sort.title')}</p>

        <Select onValueChange={(value) => fetchFilteredData({ sortBy: value })}>
          <SelectTrigger>
            <SelectValue placeholder={t('filter.sort.byDefault')} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="default">{t('filter.sort.byDefault')}</SelectItem>
              <SelectItem value="new">{t('filter.sort.byNew')}</SelectItem>
              <SelectItem value="price:asc">{t('filter.sort.byPrice:asc')}</SelectItem>
              <SelectItem value="price:desc">{t('filter.sort.byPrice:desc')}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-[30px]">
        <div className="flex items-center gap-[10px]">
          <div className="">{t('filter.itemsPerPage')}</div>
          <Select onValueChange={(value) => fetchFilteredData({ limit: Number(value) })}>
            <SelectTrigger className="w-[75px]">
              <SelectValue placeholder="24" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="24">24</SelectItem>
                <SelectItem value="48">48</SelectItem>
                <SelectItem value="72">72</SelectItem>
                <SelectItem value="94">94</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Button
            size="icon"
            variant="icon"
            className="border-none w-[44px] h-[44px]"
            onClick={() => setViewType('cards')}
          >
            <ViewCardIcon className={viewType === 'cards' ? 'fill-primary' : 'fill-accent-foreground'} />
          </Button>

          <Button
            size="icon"
            variant="icon"
            className="border-none w-[44px] h-[44px]"
            onClick={() => setViewType('rows')}
          >
            <ViewRowsIcon className={viewType === 'rows' ? 'fill-primary' : 'fill-accent-foreground'} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CatalogFilters
