import { ReactNode } from 'react'

type SelectProps = {
  title: string
  children: ReactNode
}

export default function SelectTooltip({ title, children }: SelectProps) {
  return (
    <div className="group relative ml-4  mr-4 h-5 w-0">
      {children}
      <span className="absolute top-10	z-10 min-w-full scale-0 whitespace-nowrap  rounded-lg border-2 border-gray-800 bg-primary p-2 text-xs text-gray-800 group-hover:scale-100">
        {title}
      </span>
    </div>
  )
}
