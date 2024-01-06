import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const buttonContentStyle = tv({
  base: 'bg-inherit',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

type ButtonContentProps = ComponentProps<'p'> &
  VariantProps<typeof buttonContentStyle> & {
    text: string
  }

export default function ButtonContent({ text, size }: ButtonContentProps) {
  return <p className={buttonContentStyle({ size })}>{text}</p>
}
