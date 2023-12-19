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
    bg-gray-800  rounded-lg p-4 w-full border-2 border-solid  flex items-center 
    ${isFocused ? 'text-orange-500 border-orange-500' : 'text-zinc-300'}
    ${isFilled ? 'text-orange-500' : ''}
    ${!!error ? 'border-red-600' : ''}
    `}
    >
      <input
        className='flex-1 border-0 placeholder:text-zinc-400 bg-transparent focus:outline-none'
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...props}
      />
      {!!error && (
        <Tooltip title={error.message as string}>
          <AlertCircle color='#c53030' size={20} className='m-0' />
        </Tooltip>
      )}
    </div>
  )
}
