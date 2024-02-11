import { Input } from '@/components/Input'
import api from '@/services/api'
import { useRouter } from 'next/router'
import { Controller } from 'react-hook-form'
import { useMutation } from 'react-query'
import { z } from 'zod'

export default function TwoFactorAuth() {
  const router = useRouter()
  const TwoFactorAuthSchema = z.object({
    pin: z.string().length(6),
  })

  type TwoFactorAuthType = z.infer<typeof TwoFactorAuthSchema>

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async (data: TwoFactorAuthType) => {
      return api.post('/auth/2faaa', data)
    },
    onSuccess: () => {
      return router.replace('/dashboard')
    },
  })
  return (
    <main className="flex h-screen items-center justify-center bg-slate-400">
      <h1>Digite seu pin</h1>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <Input.Root
            type="password"
            placeholder="Senha"
            onChange={onChange}
            value={value}
            error={errors.password}
          />
        )}
      />

      <Button type="submit" name="Entrar" isLoading={isLoading} />
    </main>
  )
}
