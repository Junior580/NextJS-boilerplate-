type ErrorContentProps = {
  message?: string
}

export default function ErrorMessageContent({ message }: ErrorContentProps) {
  return (
    <>
      <p className="bg-inherit text-center font-bold ">Error</p>
      <p className="bg-inherit text-center font-bold ">{message}</p>
    </>
  )
}
