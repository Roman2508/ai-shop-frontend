'use client'
import React from 'react'
import { useTranslations } from 'next-intl'

import { useCart } from '@/hooks/useCart'
import { useCurrent } from '@/hooks/useCurrent'
import CartItem from '@/components/features/CartItem'
import CheckoutForm from '@/components/features/checkout/CheckoutForm'
import CheckoutView from '@/components/features/checkout/CheckoutView'
import { CartItemModel } from '@/graphql/generated/output'

const CheckoutPage = () => {
  const t = useTranslations('profile')

  const { user } = useCurrent()
  const { cartItems, setCartItems, selectedCartItems } = useCart()

  const [pageView, setPageView] = React.useState<'view' | 'edit'>('view')

  const totalPrice = selectedCartItems.reduce((acc, curr) => curr.product.price * curr.count + acc, 0)

  const handleChangePageView = () => {
    if (pageView === 'view') {
      setPageView('edit')
    } else {
      setPageView('view')
    }
  }

  React.useEffect(() => {
    if (!user || !user.cart) return
    setCartItems(user.cart as CartItemModel[])
  }, [user])

  if (!user) return

  return (
    <div className="max-w-[1640] mx-auto px-[16]">
      <h1 className="text-3xl font-semibold">Оформлення замовлення</h1>

      <div className="flex gap-[20] mt-[40]">
        <div className="px-[20] py-[20] w-[40%] rounded-[5] border border-border">
          {pageView === 'view' && (
            /* @ts-ignore */
            <CheckoutView user={user} pageView={pageView} handleChangePageView={handleChangePageView} />
          )}
          {pageView === 'edit' && (
            /* @ts-ignore */
            <CheckoutForm user={user} pageView={pageView} handleChangePageView={handleChangePageView} />
          )}
        </div>

        <div className="px-[20] py-[20] w-[60%] rounded-[5] border border-border">
          <div className="flex items-center justify-between mb-[20]">
            <h2 className="text-2xl font-semibold">Ваше замовлення</h2>
            <h2 className="text-2xl font-semibold">{totalPrice.toLocaleString('uk-UA')} ₴</h2>
          </div>

          {cartItems ? (
            cartItems.map((el, index) => (
              <CartItem
                id={el.id}
                key={el.id}
                count={el.count}
                isEditable={false}
                number={index + 1}
                product={el.product}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
