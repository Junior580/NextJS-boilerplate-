import { ComponentProps, ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const buttonStyle = tv({
  base: 'rounded-lg',
  variants: {
    default: {
      primaryLg: '',
    },
    size: {
      sm: 'h-9 w-24 px-3 py-2',
      md: 'h-12 w-32 px-4 py-3',
      lg: 'h-14 w-36 px-5 py-4',
    },
    color: {
      primary:
        'bg-buttonDefault hover:bg-buttonDefaultHover active:bg-buttonDefaultActive disabled:buttonDefaultDisabled',
      secondary:
        'bg-buttonSecondary hover:bg-buttonSecondaryHover active:bg-buttonSecondaryActive disabled:buttonSecondaryDisabled',
      neutral:
        'bg-buttonNeutral hover:bg-buttonNeutralActive active:bg-buttonNeutralActive disabled:buttonNeutralDisabled',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
})

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonStyle> & {
    children: ReactNode
  }

export default function ButtonRoot({ children, color, size }: ButtonProps) {
  return <button className={buttonStyle({ color, size })}>{children}</button>
}
