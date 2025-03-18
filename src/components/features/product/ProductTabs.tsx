'use-client'
import React from 'react'
import { useLocale, useTranslations } from 'next-intl'

import { Button } from '@/components/ui/common/Button'
import { ProductModel, useCreateReviewMutation } from '@/graphql/generated/output'
import { Textarea } from '@/components/ui/common/Textarea'
import { getProductAttributeLabel } from '@/utils/get-product-attribute-label'
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/common/Tabs'
import Review from '../Review'
import { useCurrent } from '@/hooks/useCurrent'

interface IProductTabsProps {
  product?: ProductModel
}

const ProductTabs: React.FC<IProductTabsProps> = ({ product }) => {
  const t = useTranslations('fullProduct')
  const locale = useLocale()

  const { user } = useCurrent()

  const [reviewText, setReviewText] = React.useState('')

  const [createReview, { loading }] = useCreateReviewMutation()

  const onCreateReview = async () => {
    if (!product) return
    try {
      createReview({ variables: { data: { productId: product.id, rating: 5, text: reviewText } } })
    } catch (error) {
      console.log(error)
    } finally {
      setReviewText('')
    }
  }

  if (!product) return

  return (
    <Tabs defaultValue="description">
      <TabsList>
        <TabsTrigger value="description">{t('tabs.description')}</TabsTrigger>
        <TabsTrigger value="technical-specifications">{t('tabs.params')}</TabsTrigger>
        <TabsTrigger value="reviews">
          {t('tabs.reviews')} ({product.reviews.length})
        </TabsTrigger>
      </TabsList>

      {/* description */}
      <TabsContent value="description">{product.title}</TabsContent>

      {/* product specifications */}
      <TabsContent value="technical-specifications">
        {product &&
          (Object.keys(product) as Array<keyof ProductModel>).map((key: keyof ProductModel) => {
            const excludedKeys = ['id', 'title', 'price', 'images', 'createdAt', 'updatedAt', '__typename']

            if (!excludedKeys.includes(key)) {
              return (
                <div className="flex py-[10] border-t border-dashed">
                  <p className="w-[20%]">{getProductAttributeLabel(key, locale as 'ua' | 'en')}</p>
                  <p className="w-[80%]">{product[key]}</p>
                </div>
              )
            }
          })}
      </TabsContent>

      {/* reviews */}
      <TabsContent value="reviews">
        <div className="max-w-full xl:max-w-[800]">
          {product.reviews.length
            ? product.reviews.map((review) => <Review key={review.id} review={review} type="user" />)
            : ''}

          {user && (
            <div className="mb-[10] py-[10] px-[15]  border border-border rounded-[4]">
              <Textarea
                value={reviewText}
                className="rounded-[4]"
                placeholder="Напишить свій відгук сюди"
                onChange={(e) => setReviewText(e.target.value)}
              ></Textarea>

              <div className="flex justify-end mt-[15]">
                <Button className="h-[42]" disabled={!reviewText || loading} onClick={onCreateReview}>
                  Відправити
                </Button>
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default ProductTabs
