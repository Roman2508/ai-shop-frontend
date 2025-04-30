'use client'

import React from 'react'
import Image from 'next/image'

import { Button } from '../common/Button'

type ButtonWithIconProps = {
  text: string
  VectorIcon?: React.ElementType<{ [props: string]: any }>
  iconSize?: number
  iconSrc?: string
  classNames?: string
  onClick?: () => void
  iconClassNames?: string
  vectorIconColor?: string
  wrapperClassNames?: string
  iconVariant?: 'left' | 'right'
  buttonVariant?: 'link' | 'static' | 'default' | 'outline' | 'secondary' | 'icon' | null | undefined
  [restProp: string]: any
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  text,
  iconSrc = '',
  iconSize = 16,
  classNames = '',
  VectorIcon = null,
  onClick = () => {},
  iconClassNames = '',
  iconVariant = 'left',
  wrapperClassNames = '',
  buttonVariant = 'default',
  vectorIconColor = '#ffffff',
  ...restProp
}) => {
  return (
    <div className={`relative ${wrapperClassNames}`} onClick={onClick}>
      <span
        className={
          iconVariant === 'left'
            ? `absolute inset-y-0 left-0 flex items-center px-6 cursor-pointer ${iconClassNames}`
            : `absolute inset-y-0 right-0 flex items-center px-6 cursor-pointer ${iconClassNames}`
        }
      >
        {!VectorIcon ? (
          <Image width={iconSize} height={iconSize} src={iconSrc} alt="button icon" />
        ) : (
          <VectorIcon size={iconSize} color={vectorIconColor} iconClassNames={iconClassNames} />
        )}
      </span>

      <Button
        className={`grow text-center py-[12px] pl-[50px] pr-[20px] ${classNames}`}
        variant={buttonVariant}
        {...restProp}
      >
        {text}
      </Button>
    </div>
  )
}

export default ButtonWithIcon
