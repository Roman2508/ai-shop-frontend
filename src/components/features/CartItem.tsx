import React from 'react'
import { Button } from '../ui/common/Button'
import { Checkbox } from '../ui/common/Checkbox'
import { Input } from '../ui/common/Input'

type CartItemPropsType = {
  number: number
  photo: string
  name: string
  description: string
  price: string
  count: string
  isEditable?: boolean
  buttonCallback?: (...args: any) => void
}

const CartItem: React.FC<CartItemPropsType> = (props) => {
  const { number, photo, name, description, price, count, isEditable = false, buttonCallback = () => {} } = props

  return (
    <div className="flex items-center gap-[30] py-[20] border-b border-dashed">
      {isEditable ? <Checkbox className="border border-primary" /> : <p>{number}</p>}

      <div className="border border-border w-[110] h-[110] p-[10]">
        <img src={photo} />
      </div>
      
      <div className="grow">
        <p className="text-primary font-semibold">{name}</p>
        <p className="">{description}</p>
        <b className="text-xl">{price} / шт.</b>
      </div>

      <div className="flex gap-[15]">
        {isEditable ? (
          <div className={'flex items-center border border-border rounded-full w-[120]'}>
            <Button className="p-[10] pl-[15] bg-transparent text-text">-</Button>
            <Input value={count} className="border-[0] grow text-center" />
            <Button className="p-[10] pr-[15] bg-transparent text-text">+</Button>
          </div>
        ) : (
          <p>К-сть: {count}</p>
        )}

        {isEditable && (
          <Button size="icon" variant="outline" className="w-[42] h-[42]" onClick={() => buttonCallback(props)}>
            Del
          </Button>
        )}
      </div>
    </div>
  )
}

export default CartItem
