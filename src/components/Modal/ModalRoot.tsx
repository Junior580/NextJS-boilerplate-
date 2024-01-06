import { ReactElement, cloneElement } from 'react'

type ModalProps = {
  isOpen: boolean
  // close: () => void
  children: ReactElement
}

export default function ModalRoot({ isOpen, children }: ModalProps) {
  // const clonedChildren = isOpen ? cloneElement(children, { close }) : null

  return (
    <>
      {isOpen && (
        <div className="fixed left-0 top-0 flex  h-screen w-screen items-center justify-center backdrop-filter">
          {/* {clonedChildren} */}
          {children}
        </div>
      )}
    </>
  )
}
