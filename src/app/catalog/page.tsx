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
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationContent,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/common/Pagination'
import { Card } from '@/components/ui/common/Card'
import { Input } from '@/components/ui/common/Input'
import { Label } from '@/components/ui/common/Label'
import { Button } from '@/components/ui/common/Button'
import { Checkbox } from '@/components/ui/common/Checkbox'
import { Slider } from '@/components/ui/common/Slider'
import PriceInput from '@/components/ui/custom/PriceInput'
import CatalogCard from '@/components/features/CatalogCard'

type Props = {}

const CatalogPage = (props: Props) => {
  const [viewType, setViewType] = React.useState<'cards' | 'rows'>('cards')

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

      <h1 className="text-xl font-semibold mb-[45]">Средства и системы охранно-пожарной сигнализации</h1>

      <div className="flex gap-[40]">
        <div>
          <Card className="px-[20] py-[28] w-[300]">
            {Array(4)
              .fill(null)
              .map(() => (
                <div className="pb-[28] mb-[28] border-b-2">
                  <b className="block mb-[20]">Бренд</b>

                  <div>
                    {['Apple', 'Samsung', 'Meizu', 'Pocco', 'Xiaomi', 'LG', 'Nokia'].map((el) => (
                      <div className="flex items-center space-x-2 mt-[12]">
                        <Label className="flex items-center gap-[12]">
                          <Checkbox />
                          <p>{el}</p>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

            <div className="pb-[28] mb-[28] border-b-2">
              <b className="block mb-[20]">Ціна</b>

              <Slider defaultValue={[0, 100]} />
              <div className="mt-[30] flex gap-[10] align-center">
                {/* <Input value={1} className="grow text-center" variant="secondary" /> */}
                <PriceInput variant="from" />
                <span className="flex align-center"> - </span>
                <PriceInput variant="to" />
                {/* <Input value={1} className="grow text-center" variant="secondary" /> */}
              </div>
            </div>

            <Button variant="default" className="w-full mb-[10]">
              Застосувати фільтри
            </Button>
            <Button variant="link" className="w-full">
              Скинути фільтри
            </Button>
            {/*  */}
          </Card>
        </div>

        <div className="flex flex-col gap-[34] grow">
          {/* catalog filters */}
          <div className="flex justify-between items-center">
            <div>
              Товаров в категорії: <b>1998</b>
            </div>

            <div className="flex items-center gap-[50]">
              <div className="flex items-center gap-[10]">
                <p>Сортувати</p>
                <Button variant="secondary" className="bg-card text-text-muted-foreground">
                  По умолчанию
                </Button>
              </div>

              <div className="flex items-center gap-[30]">
                <div className="flex items-center gap-[10]">
                  <div className="">Показати на сторінці</div>
                  <Button size="icon" variant="icon" className="text-muted-foreground hover:border-muted-foreground">
                    20
                  </Button>
                </div>

                <div className="">
                  <span onClick={() => setViewType('cards')} className="cursor-pointer">
                    cards
                  </span>
                  {' - '}
                  <span onClick={() => setViewType('rows')} className="cursor-pointer">
                    rows
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* catalog cards */}
          <div>
            <div className={viewType === 'cards' ? 'grid grid-cols-4 gap-[18]' : 'grid grid-cols-1 gap-[18]'}>
              {Array(20)
                .fill(null)
                .map((el) => (
                  <CatalogCard viewType={viewType} />
                ))}
            </div>

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
      </div>
    </div>
  )
}

export default CatalogPage
