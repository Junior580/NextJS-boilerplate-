'use client'

import { Input } from '@/components/Input'
import api from '@/services/api'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { z } from 'zod'

import Button from '@/components/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'

const TwoFactorAuthSchema = z.object({
  pin: z.string().length(6),
})

type TwoFactorAuthType = z.infer<typeof TwoFactorAuthSchema>

export default function TwoFactorAuth() {
  const router = useRouter()
  console.log(`🔥 ~TwoFactorAuth page ~ ${JSON.stringify('')} `)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TwoFactorAuthType>({
    resolver: zodResolver(TwoFactorAuthSchema),
  })

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async (data: TwoFactorAuthType) => {
      return api.post('/auth/2fa', data)
    },
    onSuccess: () => {
      // return router.replace('/dashboard')
    },
  })

  const onSubmit: SubmitHandler<TwoFactorAuthType> = useCallback(
    async (data) => mutate(data),
    [mutate],
  )
  return (
    <main className="flex h-screen items-center justify-center bg-slate-400">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-80 flex-col items-center justify-center gap-2 rounded-lg bg-white p-2"
      >
        <h1 className="mb-1 text-xl font-bold">Digite o pin</h1>

        <Controller
          control={control}
          name="pin"
          render={({ field: { onChange, value } }) => (
            <Input.Root
              placeholder="6 dig pin"
              onChange={onChange}
              value={value}
              error={errors.pin}
            />
          )}
        />

        <Button type="submit" name="Entrar" isLoading={isLoading} />
      </form>
    </main>
  )
}
