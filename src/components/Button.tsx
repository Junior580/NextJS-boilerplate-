import { ComponentProps } from 'react'

type ButtonProps = ComponentProps<'button'> & {
  name: string
  isLoading: boolean
}

export default function Button({ name, isLoading, ...props }: ButtonProps) {
  return (
    <button
      className="h-14 w-full rounded-lg bg-orange-500 py-4 font-medium text-slate-700 transition duration-300 hover:bg-orange-400"
      {...props}
    >
      {isLoading ? 'carregando' : name}
    </button>
  )
}
