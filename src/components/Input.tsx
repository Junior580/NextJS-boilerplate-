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
      data-isfocused={isFocused}
      data-isfilled={isFilled}
      data-iserror={!!error}
      className="flex  w-full items-center rounded-lg border-2 border-solid  bg-gray-800 p-4 text-zinc-300
    data-[iserror=true]:border-red-600 data-[isfocused=true]:border-primary
    data-[isfilled=true]:text-primary data-[isfocused=true]:text-white"
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
