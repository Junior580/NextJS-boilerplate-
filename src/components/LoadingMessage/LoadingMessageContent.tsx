type LoadingMessageContentProps = {
  message?: string
}

export default function LoadingMessageContent({
  message,
}: LoadingMessageContentProps) {
  return (
    <>
      <p className="text-center font-bold text-inherit">Carregando...</p>
      <p className="text-center font-bold text-inherit">{message}</p>
    </>
  )
}
