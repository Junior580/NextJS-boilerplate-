import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const buttonStyle = tv({
  base: 'h-14 w-full rounded-lg  py-4 font-medium text-slate-700 transition duration-300',
  variants: {
    color: {
      primary: 'bg-red-500 hover:bg-primary_hover',
      secondary: 'bg-secondary hover:bg-secondary_hover',
      danger: 'bg-red-300 hover:bg-red-500',
    },
  },
  defaultVariants: {
    color: 'secondary',
  },
})

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonStyle> & {
    name: string
    isLoading?: boolean
  }

export default function Button({
  name,
  isLoading,
  color,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonStyle({ color })} {...props}>
      {isLoading ? 'carregando' : name}
    </button>
  )
}
