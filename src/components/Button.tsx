import { ComponentProps } from 'react'

type ButtonProps = ComponentProps<'button'> & {
  name: string
  isLoading?: boolean
  secondary?: boolean
}

export default function Button({
  name,
  isLoading,
  secondary = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`h-14 w-full rounded-lg  py-4 font-medium text-slate-700 transition duration-300 ${
        secondary
          ? 'bg-secondary hover:bg-secondary_hover'
          : 'bg-primary hover:bg-primary_hover'
      } `}
      {...props}
    >
      {isLoading ? 'carregando' : name}
    </button>
  )
}
