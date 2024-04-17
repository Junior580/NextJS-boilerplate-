import { useRef, useEffect } from 'react'

function useFocusInput(shouldFocusOnMount = false) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (shouldFocusOnMount && inputRef.current) {
      inputRef.current.focus()
    }
  }, [shouldFocusOnMount])

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return [inputRef, focusInput]
}

export default useFocusInput
