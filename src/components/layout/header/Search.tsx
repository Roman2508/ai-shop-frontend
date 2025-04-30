import React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useDebouncedCallback } from 'use-debounce'

import getPhotoUrl from '@/utils/get-photo-url'
import Loader from '@/components/ui/icons/Loader'
import { Input } from '@/components/ui/common/Input'
import getProductTitle from '@/utils/getProductTitle'
import { Button } from '@/components/ui/common/Button'
import SearchIcon from '@/components/images/SearchIcon'
import { ProductModel, useSearchProductsQuery } from '@/graphql/generated/output'
import { Dialog, DialogTitle, DialogHeader, DialogTrigger, DialogContent } from '@/components/ui/common/Dialog'

interface ISearchProps {
  isMobile?: boolean
}

const Search: React.FC<ISearchProps> = ({ isMobile = false }) => {
  const t = useTranslations('header')

  const [loading, setLoading] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [products, setProducts] = React.useState<ProductModel[]>([])

  const { refetch } = useSearchProductsQuery({ variables: { data: searchQuery }, skip: true })

  const debouncedSearch = useDebouncedCallback((value) => {
    setSearchQuery(value)
  }, 1000)

  const fetchProducts = async (searchQuery: string) => {
    try {
      setLoading(true)
      const { data } = await refetch({ data: searchQuery })
      if (data) {
        setProducts(data.searchProduct as ProductModel[])
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    if (!searchQuery) {
      setProducts([])
    } else {
      fetchProducts(searchQuery)
    }
    //
  }, [searchQuery])

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div>
            {!isMobile ? (
              <div className="relative cursor-pointer hidden 2xs:block">
                <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <SearchIcon />
                </span>

                <Input
                  readOnly
                  variant="static"
                  placeholder={`${t('searchBtn')}...`}
                  className="cursor-pointer pr-10 w-[128px] lg:w-[200px] xl:w-[340px]"
                />
              </div>
            ) : (
              <Button size="icon" variant="icon" className="flex 2xs:hidden">
                <SearchIcon />
              </Button>
            )}
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="mb-[20px]">{t('searchBtn')}</DialogTitle>

            <div className="relative cursor-pointer">
              <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                <SearchIcon className="fill-muted-foreground" />
              </span>

              <Input
                variant="default"
                className="pr-10 w-full"
                placeholder={`${t('searchBtn')}...`}
                onChange={(e) => debouncedSearch(e.target.value)}
              />
            </div>

            <div className="min-h-[400px]">
              {!searchQuery && (
                <div className="flex flex-col items-center mt-[30px]">
                  <div>
                    <h5 className="font-semibold">🔎 Спробуйте шукати:</h5>
                    <ul className="list-disc ml-[45px]">
                      <li>"Бюджетний смартфон до 10 000 грн"</li>
                      <li>"iPhone 16 Pro Max"</li>
                      <li>"Андроїд з гарною камерою"</li>
                    </ul>
                  </div>
                </div>
              )}

              {searchQuery && loading && <Loader />}

              {!loading && searchQuery && !products.length && (
                <p className="text-center pt-[30px]">Нічого не знайдено</p>
              )}

              {!loading && !!products.length && (
                <div className="max-h-[70vh] overflow-auto">
                  {products.map((el) => {
                    const productPhotoUrl = el.images.length
                      ? getPhotoUrl(el.images[0], 'products')
                      : '/images/empty-image.webp'
                    return (
                      <Link
                        key={el.id}
                        href={`/catalog/${el.id}`}
                        onClick={() => {
                          setIsDialogOpen(false)
                          setProducts([])
                        }}
                        className="mb-[10px] py-[10px] px-[15px] flex items-center gap-[10px] border border-border rounded-[20px] cursor-pointer hover:bg-secondary"
                      >
                        <div className="w-[40px] h-[40px] flex justify-center">
                          <img src={productPhotoUrl} className="h-full w-auto" />
                        </div>

                        <h4 className="font-medium flex-1">{getProductTitle(el)}</h4>
                        <p className="font-bold text-primary">{el.price.toLocaleString('uk-UA')} ₴</p>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Search
