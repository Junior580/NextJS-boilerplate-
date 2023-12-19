import { ComponentProps } from 'react'

type ButtonProps = ComponentProps<'button'>

export default function Button({ ...props }: ButtonProps) {
  return (
    <button
      className='bg-orange-500 h-14 rounded-lg w-full py-4 text-slate-700 font-medium hover:bg-orange-400 transition duration-300'
      {...props}
    >
      Entrar
    </button>
  )
}
