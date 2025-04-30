import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../../utils/tw-merge'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-background font-semibold',
        outline: 'border border-primary bg-background text-primary font-semibold hover:bg-secondary',
        secondary: 'bg-secondary text-primary font-semibold',
        link: 'text-accent-foreground opacity-60 font-semibold underline-offset-4 hover:underline',
        icon: 'border border-muted-foreground bg-transparent text-muted font-semibold hover:border-muted',
        static: 'border border-muted-foreground bg-transparent text-white font-semibold hover:border-muted',
      },
      size: {
        default: 'px-[32px] py-[12px] rounded-full',
        icon: 'h-9 w-9 rounded-full',
        full: 'px-[32px] py-[12px] w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
