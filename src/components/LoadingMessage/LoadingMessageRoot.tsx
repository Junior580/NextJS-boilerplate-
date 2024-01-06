import { ComponentProps, ReactNode } from 'react'

type LoadingMessageRootProps = ComponentProps<'p'> & {
  children: ReactNode
}

export default function LoadingMessageRoot({
  children,
}: LoadingMessageRootProps) {
  return (
    <div className="mb-2 flex gap-2 rounded-lg bg-gray-400 p-2 font-bold text-green-600">
      {children}
    </div>
  )
}
