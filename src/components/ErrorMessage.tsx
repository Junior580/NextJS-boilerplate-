type ErrorProps = {
  message: string
}

export default function ErrorMessage({ message }: ErrorProps) {
  return (
    <p className="whitespace-pre bg-transparent text-center font-bold text-red-600">
      {message}
    </p>
  )
}
