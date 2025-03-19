import React from 'react'
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationContent,
  PaginationEllipsis,
} from '@/components/ui/common/Pagination'
import { Button } from '../ui/common/Button'
import { useTranslations } from 'next-intl'
import { PaginateAndFilterInput } from '@/graphql/generated/output'

interface IProductsPaginationProps {
  total: number
  currentPage: number
  filter: PaginateAndFilterInput
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  fetchFilteredData: (additionalFilter?: PaginateAndFilterInput | undefined) => Promise<void>
}

const ProductsPagination: React.FC<IProductsPaginationProps> = ({
  total,
  filter,
  currentPage,
  setCurrentPage,
  fetchFilteredData,
}) => {
  const t = useTranslations('catalog')

  return (
    <Pagination className="mt-[40]">
      <PaginationContent>
        <PaginationItem
          className="hidden sm:inline-flex"
          onClick={() => {
            setCurrentPage((prev) => {
              if (prev - 1 > 0) {
                const skip = (filter.limit || 24) * (prev - 1)
                fetchFilteredData({ skip: skip - 1 })
                return prev - 1
              } else {
                return prev
              }
            })
          }}
        >
          <PaginationLink href="#" className="px-[5] w-[100]">
            <Button variant="link">{`< ${t('pagination.prev')}`}</Button>
          </PaginationLink>
        </PaginationItem>

        {Array(Math.ceil(total / (filter.limit || 24)))
          .fill(null)
          .map((_, index) => (
            <PaginationItem
              key={index}
              onClick={() => {
                const skip = (filter.limit || 24) * index + 1
                fetchFilteredData({ skip: skip - 1 })
                setCurrentPage(index + 1)
              }}
            >
              <PaginationLink href="#" isActive={index + 1 === currentPage}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

        <PaginationItem
          className="hidden sm:inline-flex"
          onClick={() => {
            setCurrentPage((prev) => {
              alert(111)
              const pagesCount = Math.ceil(total / (filter.limit || 24))
              if (prev + 1 <= pagesCount) {
                const skip = (filter.limit || 24) * (prev + 1)
                fetchFilteredData({ skip: skip + 1 })
                return prev + 1
              } else {
                return prev
              }
            })
          }}
        >
          <PaginationLink href="#" className="px-[5] w-[100]">
            <Button variant="link" className="px-[5]">
              {`${t('pagination.next')} >`}
            </Button>
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default ProductsPagination
