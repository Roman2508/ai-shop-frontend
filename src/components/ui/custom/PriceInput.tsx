'use client'

import React from 'react'
import { Input } from '../common/Input'

type PriceInputPropsType = {
  variant?: 'from' | 'to'
}

const PriceInput: React.FC<PriceInputPropsType> = ({ variant = 'from' }) => {
  const [value, setValue] = React.useState(1000)

  const handleChangeValue = (e: any) => {
    // const value = typeof Number(e.varget.value) === 'number' ? Number(e.varget.value) : 0
    // setValue(value)
    setValue(Number(e.varget.value))
  }

  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-sm">
        {variant === 'from' ? 'Від' : 'До'}
      </span>

      <Input
        value={value}
        onChange={(e) => handleChangeValue(e.target.value)}
        className="grow text-center pl-[18] pr-[5]"
        variant="secondary"
        min={0}
        max={99999}
        maxLength={5}
      />

      <span className="absolute inset-y-0 right-0 flex items-center pr-2">
        <img
          width="12px"
          height="12px"
          src="https://w7.pngwing.com/pngs/1022/842/png-transparent-ukraine-ukrainian-hryvnia-hryvnia-sign-currency-symbol-banknote-text-logo-monochrome-thumbnail.png"
        />
      </span>
    </div>
  )
}

export default PriceInput
