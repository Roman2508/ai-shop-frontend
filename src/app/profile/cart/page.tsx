'use client'

import React from 'react'

import { Button } from '@/components/ui/common/Button'
import ButtonWithIcon from '@/components/ui/custom/ButtonWithIcon'
import ProfileLayout from '@/components/layout/profile/ProfileLayout'
import CartItem from '@/components/features/CartItem'

const cartItems = [
  {
    name: 'DS-2CD2423G2-I(2.8мм)',
    description: 'Профессиональная видеокамера IP компактная DS-2CD2423G2-I(2.8мм)',
    price: '10 990,00',
    photo: 'https://www.shutterstock.com/image-vector/no-image-available-icon-template-600nw-1036735678.jpg',
    count: '1',
  },
  {
    name: 'DS-2CD2423G2-I(2.8мм)',
    description: 'Профессиональная видеокамера IP компактная DS-2CD2423G2-I(2.8мм)',
    price: '10 990,00',
    photo: 'https://www.shutterstock.com/image-vector/no-image-available-icon-template-600nw-1036735678.jpg',
    count: '2',
  },
  {
    name: 'DS-2CD2423G2-I(2.8мм)',
    description: 'Профессиональная видеокамера IP компактная DS-2CD2423G2-I(2.8мм)',
    price: '10 990,00',
    photo: 'https://www.shutterstock.com/image-vector/no-image-available-icon-template-600nw-1036735678.jpg',
    count: '5',
  },
]

const CartPage = () => {
  return (
    <ProfileLayout>
      <div className="flex justify-between items-center pb-[40]">
        <h1 className="text-3xl font-semibold">Кошик</h1>

        <div className="flex gap-[10]">
          <ButtonWithIcon iconSrc="/icons/list.png" text="МОЇ ЗАМОВЛЕННЯ" buttonVariant="secondary" classNames="" />
          <Button size="icon" className="h-[44] w-[44]">
            0
          </Button>
        </div>
      </div>

      <div className="px-[50] py-[40] rounded-[5] border border-border">
        <div className="flex items-center justify-between pb-[20] border-b border-dotted">
          <h4 className="font-semibold text-lg">
            {true ? (
              <div>
                <p className="leading-none">Вибрано 1 з 3.</p>
                <p>Загальна сума замовлення: 6 540 грн.</p>
              </div>
            ) : (
              'Вибрано 0 з 3'
            )}
          </h4>
          <Button className="hover:bg-secondary border border-primary hover:text-primary">Оформити замовлення</Button>
        </div>

        {cartItems.map((el, index) => (
          <CartItem {...el} number={index + 1} isEditable />
        ))}
      </div>
    </ProfileLayout>
  )
}

export default CartPage
