import React from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { DialogCloseProps } from '@radix-ui/react-dialog'

import { Label } from '@/components/ui/common/Label'
import { Slider } from '@/components/ui/common/Slider'
import { Button } from '@/components/ui/common/Button'
import PriceInput from '@/components/ui/custom/PriceInput'
import { Checkbox } from '@/components/ui/common/Checkbox'
import { productInputFilters } from '@/constants/product-filters'
import { PaginateAndFilterInput } from '@/graphql/generated/output'

interface IProductFilterProps {
  maxPrice: number
  filter: PaginateAndFilterInput
  removeFilter: (key?: keyof PaginateAndFilterInput) => void
  fetchFilteredData: (additionalFilter?: PaginateAndFilterInput) => void
  setFilter: React.Dispatch<React.SetStateAction<PaginateAndFilterInput>>
  handleChangeFilter: (key: keyof PaginateAndFilterInput, value: string) => void
  DrawerClose?: React.ForwardRefExoticComponent<DialogCloseProps & React.RefAttributes<HTMLButtonElement>>
}

const ProductFilter: React.FC<IProductFilterProps> = ({
  filter,
  maxPrice,
  setFilter,
  DrawerClose,
  removeFilter,
  fetchFilteredData,
  handleChangeFilter,
}) => {
  const locale = useLocale()

  const t = useTranslations('catalog')

  return (
    <>
      {productInputFilters.map((f) => (
        <div className="pb-[28px] mb-[28px] border-b-2" key={f.key}>
          <b className="block mb-[20px]">{locale === 'ua' ? f.label_ua : f.label_en}</b>

          <div className="max-h-[230px] overflow-y-auto">
            {f.items.map((el) => {
              const sameKey = Object.keys(filter).find((key) => key === f.key)
              let isSameValue = false
              if (sameKey) {
                /* @ts-ignore */
                const valuesArray = filter[sameKey].toLowerCase().replace(/\s+/g, '').split(';')
                const label = String(el.label_ua).toLowerCase().replace(/\s+/g, '')
                isSameValue = valuesArray.includes(label)

                if (el.label_ua === 'IPhone' && valuesArray.includes('Apple')) {
                  isSameValue = true
                }
              }

              const htmlFor = `${f.key}_${el.label_ua}`

              return (
                <div className="flex items-center space-x-2 mt-[12px]" key={el.key}>
                  <Checkbox checked={isSameValue} id={htmlFor} />
                  <Label
                    htmlFor={htmlFor}
                    className="flex items-center gap-[12px]"
                    onClick={() => {
                      alert(1)
                      handleChangeFilter(f.key, el.key)
                    }}
                  >
                    <p className={f.key === 'color' ? 'first-letter:uppercase' : ''}>
                      {locale === 'ua' ? el.label_ua : el.label_en}
                    </p>
                  </Label>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      <div className="pb-[28px] mb-[28px] border-b-2">
        <b className="block mb-[20px]">{t('filter.price')}</b>

        <Slider
          min={0}
          step={100}
          max={maxPrice}
          defaultValue={[0, maxPrice]}
          value={[filter.priceFrom || 0, filter.priceTo || maxPrice]}
          onValueChange={(e) => {
            handleChangeFilter('priceFrom', String(e[0]))
            handleChangeFilter('priceTo', String(e[1]))
          }}
        />
        <div className="mt-[30px] flex gap-[10px] align-center">
          <PriceInput
            variant="from"
            locale={locale}
            maxPrice={maxPrice}
            price={filter.priceFrom}
            handleChangeFilter={handleChangeFilter}
          />
          <span className="flex align-center"> - </span>
          <PriceInput
            variant="to"
            locale={locale}
            maxPrice={maxPrice}
            price={filter.priceTo}
            handleChangeFilter={handleChangeFilter}
          />
        </div>
      </div>

      {DrawerClose ? (
        <DrawerClose>
          <Button
            variant="default"
            className="w-full mb-[10px]"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
              fetchFilteredData()
            }}
          >
            {t('filter.applyFilters')}
          </Button>
          <Button
            variant="link"
            className="w-full"
            onClick={() => {
              alert('FIX')
              setFilter({})
            }}
          >
            {t('filter.resetFilters')}
          </Button>
        </DrawerClose>
      ) : (
        <>
          <Button
            variant="default"
            className="w-full mb-[10px]"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
              fetchFilteredData()
            }}
          >
            {t('filter.applyFilters')}
          </Button>
          <Button
            variant="link"
            className="w-full"
            onClick={() => {
              removeFilter && removeFilter()
            }}
          >
            {t('filter.resetFilters')}
          </Button>
        </>
      )}
    </>
  )
}

export default ProductFilter
