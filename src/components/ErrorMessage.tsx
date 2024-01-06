import { Ban } from 'lucide-react'

type ErrorProps = {
  message: string
}

export default function ErrorMessage({ message }: ErrorProps) {
  return (
    <div className="flex gap-2 rounded-lg bg-gray-400 p-2 text-red-500">
      <Ban />
      <p className="whitespace-pre bg-transparent text-center font-bold ">
        {message}
      </p>
    </div>
  )
}
