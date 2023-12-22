'use client' // Error components must be Client Components

import { useEffect } from 'react'
import { Frown } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="m-12 flex h-60 w-60 flex-col items-center justify-center bg-transparent shadow-lg transition duration-300 hover:shadow-2xl">
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-t-lg bg-red-500">
        <Frown size={60} className="text-gray-300" />
        <h2 className="font-bold text-gray-300">Error</h2>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-b-lg bg-white">
        <p>Something went wrong!</p>
        <button
          onClick={() => reset()}
          className="rounded-lg bg-red-500 p-2 text-gray-300 hover:bg-red-400 focus:bg-red-600"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
