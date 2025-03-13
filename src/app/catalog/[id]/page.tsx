'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { useParams } from 'next/navigation'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/common/Breadcrumb'
import { Card } from '@/components/ui/common/Card'
import SaveIcon from '@/components/images/SaveIcon'
import { Input } from '@/components/ui/common/Input'
import { Button } from '@/components/ui/common/Button'
import { Skeleton } from '@/components/ui/common/Skeleton'
import CatalogCard from '@/components/features/CatalogCard'
import ButtonWithIcon from '@/components/ui/custom/ButtonWithIcon'
import ProductTabs from '@/components/features/product/ProductTabs'
import CatalogCardSkeleton from '@/components/features/CatalogCardSkeleton'
import { getProductAttributeLabel } from '@/utils/get-product-attribute-label'
import { ProductModel, useGetAllProductsQuery, useGetProductByIdQuery } from '@/graphql/generated/output'
import getPhotoUrl from '@/utils/get-photo-url'

const mainCharacteristicsKeys = [
  { key: 'screenDiagonal', label_ua: 'Діагональ екрану', label_en: 'Screen diagonal' },
  { key: 'os', label_ua: 'Операційна система', label_en: 'OS' },
  { key: 'frontCamera', label_ua: 'Фронтальна камера', label_en: 'Front camera' },
  { key: 'mainCamera', label_ua: 'Головна камера', label_en: 'Main camera' },
  { key: 'proccessorName', label_ua: 'Назва процесора', label_en: 'Processor name' },
  { key: 'processorCores', label_ua: 'Кількість ядер процесора', label_en: 'Processor cores' },
]

const ProductPage = () => {
  const { id } = useParams()

  const locale = useLocale()

  const [mainPhotoName, setMainPhotoName] = React.useState('')

  const { data } = useGetAllProductsQuery()
  const { data: product } = useGetProductByIdQuery({
    variables: { productId: typeof id === 'string' ? id : '' },
    // variables: { productId: String('router.query.id') },
  })

  const productName = product
    ? `${product.getProductById.brand}, ${product.getProductById.ram}/${product.getProductById.builtInMemory} ГБ, ${product.getProductById.color}`
    : ''

  React.useEffect(() => {
    if (product) {
      if (product.getProductById.images.length) {
        const firstPhotoName = product.getProductById.images[0]
        setMainPhotoName(firstPhotoName)
      }
    }
  }, [product])

  return (
    <div className="max-w-[1640] mx-auto px-[16]">
      <Breadcrumb className="mb-[45]">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/">Головна</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/catalog">Каталог</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product ? productName : ''}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <p className="text-right mb-[20] opacity-[60%]">
          {product ? `Артикул: ${product.getProductById.id.slice(2, 8)}` : '...'}
        </p>

        {/* main */}
        <div className="flex gap-[40] mb-[75]">
          <Card className="p-[10] w-[40%]">
            <div className="h-[100%] w-[100%]">
              {product?.getProductById ? (
                <div className="flex flex-col h-full">
                  <div className="h-[80%]">
                    <img
                      className="w-full h-full block"
                      src={getPhotoUrl(mainPhotoName, 'products')}
                      // src="https://www.shutterstock.com/image-vector/no-image-available-icon-template-600nw-1036735678.jpg"
                    />
                  </div>

                  <div className="h-[20%] flex gap-[10] mt-[10] overflow-y-auto">
                    {product.getProductById.images.map((imgName) => {
                      return (
                        <img
                          src={getPhotoUrl(imgName, 'products')}
                          onClick={() => setMainPhotoName(imgName)}
                          className="w-[100] h-[100] block cursor-pointer"
                        />
                      )
                    })}
                  </div>
                </div>
              ) : (
                <Skeleton className="w-full h-full" />
              )}
            </div>
          </Card>

          <div className="flex flex-col justify-between items-start gap-[20] w-[60%]">
            {product?.getProductById ? (
              <h1 className="text-3xl font-semibold">{productName}</h1>
            ) : (
              <Skeleton className="w-[70%] h-[36]" />
            )}

            {product?.getProductById ? (
              <>
                {false ? (
                  <ButtonWithIcon
                    text="Зберегти"
                    VectorIcon={SaveIcon}
                    wrapperClassNames="w-[140]"
                    iconClassNames="!text-border fill-current text-inherit stroke-current"
                    classNames="w-full bg-border text-text-muted-foreground rounded-[5] justify-end pr-5"
                  />
                ) : (
                  <ButtonWithIcon
                    text="Збережено"
                    VectorIcon={SaveIcon}
                    buttonVariant="outline"
                    wrapperClassNames="w-[150]"
                    classNames="w-full text-primary rounded-[5] justify-end px-4"
                    iconClassNames="!text-primary fill-current text-inherit stroke-current"
                  />
                )}
              </>
            ) : (
              <Skeleton className="w-[150] h-[46]" />
            )}

            <div className="flex gap-[30]">
              <Card className="p-[30] w-[60%]">
                {product?.getProductById ? (
                  <b className="mb-[10] block">Короткий опис</b>
                ) : (
                  <Skeleton className="mb-10 w-[120] h-[20]" />
                )}

                {product?.getProductById ? (
                  <p className="mb-[25] line-clamp-[4]">{product?.getProductById.title}</p>
                ) : (
                  <>
                    <Skeleton className="mb-2 w-full h-[16]" />
                    <Skeleton className="mb-2 w-full h-[16]" />
                    <Skeleton className="mb-2 w-full h-[16]" />
                    <Skeleton className="mb-[25] w-full h-[16]" />
                  </>
                )}

                {product?.getProductById ? (
                  <b className="mb-[10] block">Головні характеристики</b>
                ) : (
                  <Skeleton className="mb-10 w-[180] h-[20]" />
                )}

                {product?.getProductById ? (
                  <>
                    {(Object.keys(product.getProductById) as Array<keyof ProductModel>).map(
                      (key: keyof ProductModel) => {
                        const keys = mainCharacteristicsKeys.map((el) => el.key)

                        if (keys.includes(key)) {
                          return (
                            <div className="flex py-[10] border-t border-dashed">
                              <p className="w-[60%]">{getProductAttributeLabel(key, locale as 'ua' | 'en')}</p>
                              <p className="w-[40%]">{product.getProductById[key]}</p>
                            </div>
                          )
                        }
                      }
                    )}
                  </>
                ) : (
                  <>
                    {[...Array(4).fill(null)].map((_, index) => (
                      <div className="flex py-[10] border-t border-dashed" key={index}>
                        <div className="w-[60%]">
                          <Skeleton className="w-[100] h-[20]" />
                        </div>

                        <div className="w-[40%]">
                          <Skeleton className="w-[80%] h-[20]" />
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </Card>

              <Card className="flex flex-col justify-between w-[40%]">
                <div className="p-[30]">
                  {product?.getProductById ? (
                    <p className="flex items-center gap-[6] pb-[15] mb-[30] border-b border-dashed text-sm">
                      <Image src="/icons/check.png" width={13} height={10} alt="check icon" />
                      <span>Є в наявності</span>
                    </p>
                  ) : (
                    <Skeleton className="w-[40%] h-[20] pb-[15] mb-[30] border-b border-dashed text-sm" />
                  )}

                  <div className="flex flex-col items-center gap-[15]">
                    {product?.getProductById ? (
                      <div className="text-center">
                        <p className="text-sm opacity-[70%]">Ціна</p>
                        <b className="text-xl">{product.getProductById.price.toLocaleString('uk-UA')} грн.</b>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Skeleton className="w-[60] h-[20] mb-[4]" />
                        <Skeleton className="w-[120] h-[24]" />
                      </div>
                    )}

                    {product?.getProductById ? (
                      <>
                        <div className={'flex items-center border border-border rounded-full w-[100%]'}>
                          <Button className="p-[10] pl-[40] bg-transparent text-text">-</Button>
                          <Input value={1} className="border-[0] grow text-center" />
                          <Button className="p-[10] pr-[40] bg-transparent text-text">+</Button>
                        </div>

                        <ButtonWithIcon
                          text="В корзину"
                          iconVariant="left"
                          classNames="w-full"
                          buttonVariant="default"
                          wrapperClassNames="w-full"
                          iconSrc="/icons/shopping-bag.png"
                        />

                        <ButtonWithIcon
                          iconVariant="left"
                          classNames="w-full"
                          text="Купити в 1 клік"
                          buttonVariant="secondary"
                          wrapperClassNames="w-full"
                          iconSrc="/icons/wallet.png"
                        />
                      </>
                    ) : (
                      <div className="w-full max-w-[300] flex flex-col gap-[15]">
                        <Skeleton className="w-full min-w-full h-[42] rounded-full" />
                        <Skeleton className="w-full h-[42] rounded-full" />
                        <Skeleton className="w-full h-[42] rounded-full" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-[15] bg-secondary mt-auto px-[35] py-[30] rounded-t-[10]">
                  <Image src="/images/box.png" alt="box icon" width={47} height={47} className="w-[47] h-[47]" />
                  <p className="text-sm">Безкоштовна доставка при замовленні від 10 000 грн., а також при самовивозі</p>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* more info */}
        <div className="mb-[75]">
          {/* tabs */}
          <ProductTabs product={product?.getProductById} />
        </div>

        {/* popular */}
        <div>
          <div className="flex justify-between mb-[50]">
            <h2 className="text-2xl font-semibold">Популярні товари</h2>
            <div className="flex gap-[10]">
              <Button size="icon" variant="outline" className="border-destructive text-destructive">
                {'<'}
              </Button>

              <Button size="icon" variant="outline">
                {'>'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-[18] grid-flow-col">
            {data
              ? data.getAllProducts.products
                  .slice(0, 5)
                  .map((product) => <CatalogCard product={product} viewType="cards" />)
              : [
                  ...Array(5)
                    .fill(null)
                    .map((_, index) => <CatalogCardSkeleton key={index} viewType="cards" />),
                ]}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
