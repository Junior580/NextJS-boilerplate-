'use client'

import { ComponentProps, useCallback, useState } from 'react'
import { FieldError } from 'react-hook-form'
import { AlertCircle } from 'lucide-react'
import Tooltip from './Tooltip'

type InputProps = ComponentProps<'input'> & {
  error: FieldError | undefined
}

export default function Input({ error, ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isFilled, setIsFilled] = useState<boolean>(false)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])
  const handleInputBlur = useCallback(() => {
    setIsFocused(false)
    setIsFilled(!!props.value)
  }, [props.value])

  return (
    <div
      className={`
    flex  w-full items-center rounded-lg border-2 border-solid  bg-gray-800 p-4 
    ${isFocused ? 'border-primary text-white' : 'text-zinc-300'}
    ${isFilled ? 'text-primary' : ''}
    ${!!error ? 'border-red-600' : ''}
    `}
    >
      <input
        className="flex-1
        border-0  bg-transparent
          placeholder:text-zinc-400 focus:outline-none"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...props}
      />
      {!!error && (
        <Tooltip title={error.message as string}>
          <AlertCircle color="#c53030" size={20} className="m-0" />
        </Tooltip>
      )}
    </div>
  )
}
