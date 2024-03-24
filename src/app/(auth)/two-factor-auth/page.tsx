'use client'

import { Input } from '@/components/Input'
import api from '@/services/api'
import { useRouter } from 'next/navigation'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { z } from 'zod'

import { useSearchParams } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import ErrorMessage from '@/components/ErrorMessage'
import { Button } from '@/components/ui/button'

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

const TwoFactorAuthSchema = z.object({
  pin: z.string().length(6),
})

type TwoFactorAuthType = z.infer<typeof TwoFactorAuthSchema>

interface TwoFactorAuthProps {
  params: {
    email: string
  }
}

export default function TwoFactorAuth({ params }: TwoFactorAuthProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('user')

  if (!email) return router.replace('/signin')

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TwoFactorAuthType>({
    resolver: zodResolver(TwoFactorAuthSchema),
    defaultValues: { pin: '' },
  })

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async ({ pin }: TwoFactorAuthType) => {
      return api.post('/auth/2fa', {
        email,
        code: pin,
      })
    },
    onSuccess: (e) => {
      if (e.status === 204) {
        const { email } = JSON.parse(e.config.data)

        return router.push(`two-factor-auth?user=${email}`)
      }
      localStorage.setItem('@user', JSON.stringify(e.data.userInfo))
      localStorage.setItem('@token', JSON.stringify(e.data.refresh_token))

      return router.replace('/users')
    },
  })

  const onSubmit: SubmitHandler<TwoFactorAuthType> = useCallback(
    async (data) => mutate(data),
    [mutate],
  )
  return (
    <main className="flex h-screen items-center justify-center">
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-80 flex-col items-center justify-center gap-4 rounded-lg p-2"
        >
          <h1 className="mb-1 text-xl font-bold">Digite seu pin:</h1>

          <Controller
            control={control}
            name="pin"
            render={({ field: { onChange, value } }) => (
              <>
                <InputOTP
                  onChange={onChange}
                  value={value}
                  maxLength={6}
                  render={({ slots }) => (
                    <>
                      <InputOTPGroup>
                        {slots.slice(0, 3).map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}{' '}
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        {slots.slice(3).map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}
                      </InputOTPGroup>
                    </>
                  )}
                />

                {errors.pin && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.pin.message}</AlertDescription>
                  </Alert>
                )}
              </>
            )}
          />

          <Button type="submit">Entrar</Button>
        </form>
        {!!error && (
          <Alert variant="destructive" className="w-80">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{`Erro no servidor: ${error}`}</AlertDescription>
          </Alert>
        )}
      </div>
    </main>
  )
}
