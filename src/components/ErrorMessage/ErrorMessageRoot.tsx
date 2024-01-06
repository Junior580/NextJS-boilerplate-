import { ReactNode } from 'react'

type ErrorRootProps = {
  children: ReactNode
}

export default function ErrorMessageRoot({ children }: ErrorRootProps) {
  return (
    <div className="flex gap-2 rounded-lg bg-gray-400 p-2 text-red-500">
      {children}
    </div>
  )
}
