import { ReactNode } from 'react'

type TooltipProps = {
  title: string
  children: ReactNode
  className?: string
}

export default function Tooltip({ title, className, children }: TooltipProps) {
  return (
    <div className='relative h-5 ml-4'>
      {children}
      <span className='invisible transition-all ease-in-out  hover:visible'>
        {title}
      </span>
    </div>
  )
}
