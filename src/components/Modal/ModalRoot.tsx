import { ReactElement, cloneElement } from 'react'

type ModalProps = {
  isOpen: boolean
  children: ReactElement
}

export default function ModalRoot({ isOpen, children }: ModalProps) {
  return (
    <>
      {isOpen && (
        <div className="fixed left-0 top-0 flex  h-screen w-screen items-center justify-center backdrop-filter">
          {children}
        </div>
      )}
    </>
  )
}
