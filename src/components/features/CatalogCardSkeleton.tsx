import React from 'react'
import { Card } from '../ui/common/Card'
import { Skeleton } from '../ui/common/Skeleton'

type CatalogCardSkeletonType = {
  viewType?: 'cards' | 'rows'
}

const CatalogCardSkeleton: React.FC<CatalogCardSkeletonType> = ({ viewType = 'cards' }) => {
  return (
    <Card
      className={
        viewType === 'cards' ? 'pb-[30px] pt-[20px] px-[20px]' : 'flex py-[24px] pl-[16px] pr-[30px] gap-[20px]'
      }
    >
      <div className={viewType === 'cards' ? 'flex justify-end gap-[10px]' : 'hidden'}>
        <Skeleton className="h-[40px] w-[40px] rounded-md" />
      </div>

      <div className="my-[10px]">
        <Skeleton className={viewType === 'cards' ? 'h-[260px] w-full' : 'h-[200px] w-[170px]'} />
      </div>

      <div className={viewType === 'cards' ? '' : 'flex justify-between w-full gap-[20px]'}>
        <div className={viewType === 'cards' ? '' : 'w-full'}>
          <div className={viewType === 'cards' ? 'hidden' : 'flex justify-end mb-[10px] gap-[10px]'}>
            <Skeleton className="h-[40px] w-[40px] rounded-md" />
          </div>

          <Skeleton className={viewType === 'cards' ? 'h-[20px] w-full mb-[16px]' : 'h-[20px] w-[50%] mb-[16px]'} />

          <Skeleton className="h-[16px] w-[60%] mb-[4px]" />
          <Skeleton className="h-[16px] w-[90%] mb-[4px]" />
          <Skeleton className="h-[16px] w-[70%] mb-[4px]" />
          <Skeleton className="h-[16px] w-full mb-[4px]" />
        </div>
      </div>

      <div className={viewType === 'cards' ? '' : 'flex flex-col justify-center border-l rounded-r-[5px] pl-[20px]'}>
        <Skeleton className="h-[24px] w-[40%] mb-[16px] mt-[24px]" />

        <div className={viewType === 'cards' ? 'flex mt-auto' : 'flex flex-col w-[230px]'}>
          <div
            className={
              viewType === 'cards'
                ? 'flex items-center rounded-l-[5px] gap-[4px] w-[50%] mb-[16px]'
                : 'flex justify-between items-center rounded-l-[5px] w-[100%] mb-[4px]'
            }
          >
            <Skeleton className="h-[40px] w-[30%]" />
            <Skeleton className="h-[40px] w-[30%]" />
            <Skeleton className="h-[40px] w-[30%]" />
          </div>

          <Skeleton
            className={
              viewType === 'cards' ? 'h-[40px] w-full max-w-[50%] mb-[16px]' : 'h-[40px] w-full max-w-[100%] mb-[16px]'
            }
          />
        </div>
      </div>
    </Card>
  )
}

export default CatalogCardSkeleton
