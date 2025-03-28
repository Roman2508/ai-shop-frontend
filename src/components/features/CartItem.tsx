import React from 'react'
import { Trash2 } from 'lucide-react'
import { useDebouncedCallback } from 'use-debounce'

import { useCart } from '@/hooks/useCart'
import { Input } from '../ui/common/Input'
import { Button } from '../ui/common/Button'
import getPhotoUrl from '@/utils/get-photo-url'
import { Checkbox } from '../ui/common/Checkbox'
import { ProductModel, useChangeCartItemCountMutation, useToggleCartMutation } from '@/graphql/generated/output'
import getProductTitle from '@/utils/getProductTitle'
import { toast } from 'sonner'

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
    <div className="flex items-center gap-[30] py-[20] border-b border-dashed">
      {isEditable ? (
        <Checkbox
          checked={isChecked}
          className="border border-primary"
          onClick={() => toggleSelectedCartItems(id, count, product)}
        />
      ) : (
        <p>{number}</p>
      )}

      <div className="border border-border w-[110] min-w-[110] h-[110] p-[2]">
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

      <div className="flex gap-[15]">
        {isEditable ? (
          <div className={'flex items-center border border-border rounded-full w-[120]'}>
            <Button
              disabled={loading}
              onClick={() => handleCountChange('decrement', id)}
              className="p-[10] pl-[15] bg-transparent text-text"
            >
              -
            </Button>
            <Input value={count} className="border-[0] grow text-center" />
            <Button
              disabled={loading}
              onClick={() => handleCountChange('increment', id)}
              className="p-[10] pr-[15] bg-transparent text-text"
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
            className="w-[42] h-[42]"
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
