import { ReactNode } from 'react'
import Button from '../Button'

type ModalProps = {
  isOpen: boolean
  close: () => void
  children: ReactNode
  executeButtonTitle: string
  executeButton: () => void
}

export default function ModalRoot({
  isOpen,
  close,
  children,
  executeButtonTitle,
  executeButton,
}: ModalProps) {
  return (
    <>
      {isOpen && (
        <div className="fixed left-0 top-0 flex  h-screen w-screen items-center justify-center backdrop-filter">
          <div className="flex w-[500px] flex-col  items-center justify-between gap-8 rounded-lg bg-gray-500 p-4 shadow-3xl">
            {children}

            <div className="flex w-full gap-2">
              <Button onClick={executeButton} name={executeButtonTitle} />

              <Button onClick={close} name="Fechar" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
