import React from 'react'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'
import { useDebouncedCallback } from 'use-debounce'

import { useCart } from '@/hooks/useCart'
import { Input } from '../ui/common/Input'
import { Button } from '../ui/common/Button'
import getPhotoUrl from '@/utils/get-photo-url'
import { Checkbox } from '../ui/common/Checkbox'
import getProductTitle from '@/utils/getProductTitle'
import { ProductModel, useChangeCartItemCountMutation, useToggleCartMutation } from '@/graphql/generated/output'

type CartItemPropsType = {
  id: string
  number: number
  count: number
  isEditable?: boolean
  product: ProductModel
}

const CartItem: React.FC<CartItemPropsType> = ({ id, number, product, count, isEditable = false }) => {
  const [changeCartItemCount] = useChangeCartItemCountMutation()
  const [toggleCart, { loading }] = useToggleCartMutation({
    onCompleted() {
      toast.success('Товар було видалено з корзини')
    },
    onError(error, clientOptions) {
      toast.error('Помилка при видаленні товару з корзини')
      console.log(error, clientOptions)
    },
  })

  const {
    selectedCartItems,
    removeItemFromCart,
    changeCartItemsCount,
    toggleSelectedCartItems,
    changeSelectedCartItemsCount,
  } = useCart()

  const isChecked = selectedCartItems.some((el) => el.id === id)

  const debouncedCountChange = useDebouncedCallback(() => {
    changeCartItemCount({ variables: { input: { id, count } } })
  }, 1000)

  const handleCountChange = (action: 'increment' | 'decrement', id: string) => {
    let currentCount = count
    if (action === 'increment') currentCount = count + 1
    else if (count - 1 !== 0) currentCount = count - 1

    changeSelectedCartItemsCount(id, currentCount)
    changeCartItemsCount(id, currentCount)
    debouncedCountChange()
  }

  const onDeleteItemFromCart = async (productId: string, count: number) => {
    if (!window.confirm('Ви дійсно хочете видалити товар з корзини:?')) return
    await toggleCart({ variables: { input: { productId, count } } })
    removeItemFromCart(productId)
  }

  return (
    <div className="flex items-center gap-[30px] py-[20px] border-b border-dashed">
      {isEditable ? (
        <Checkbox
          checked={isChecked}
          className="border border-primary"
          onClick={() => toggleSelectedCartItems(id, count, product)}
        />
      ) : (
        <p>{number}</p>
      )}

      <div className="border border-border w-[110px] min-w-[110px] h-[110px] p-[2px]">
        <img
          className="h-[100%] object-cover"
          src={product.images.length ? getPhotoUrl(product.images[0], 'products') : '/images/empty-image.webp'}
        />
      </div>

      <div className="grow">
        <p className="text-primary font-semibold">{getProductTitle(product)}</p>
        <p className="line-clamp-[2]">{product.title}</p>
        <b className="text-xl">{product.price.toLocaleString('uk-UA')} / шт.</b>
      </div>

      <div className="flex gap-[15px]">
        {isEditable ? (
          <div className={'flex items-center border border-border rounded-full w-[120px]'}>
            <Button
              disabled={loading}
              onClick={() => handleCountChange('decrement', id)}
              className="p-[10px] pl-[15px] bg-transparent text-text"
            >
              -
            </Button>
            <Input value={count} className="border-[0] grow text-center" />
            <Button
              disabled={loading}
              onClick={() => handleCountChange('increment', id)}
              className="p-[10px] pr-[15px] bg-transparent text-text"
            >
              +
            </Button>
          </div>
        ) : (
          <p className="whitespace-nowrap font-semibold">К-сть: {count}</p>
        )}

        {isEditable && (
          <Button
            size="icon"
            variant="outline"
            disabled={loading}
            className="w-[42px] h-[42px]"
            onClick={() => onDeleteItemFromCart(product.id, count)}
          >
            <Trash2 />
          </Button>
        )}
      </div>
    </div>
  )
}

export default CartItem
