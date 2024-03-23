'use client'

import { useCallback } from 'react'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import api from '@/services/api'
import { useRouter } from 'next/navigation'
import { useMutation } from 'react-query'
import { useToast } from '@/components/ui/use-toast'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
})

type SignUpSchemaType = z.infer<typeof SignUpSchema>

export default function SignIn() {
  const router = useRouter()
  const { toast } = useToast()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { mutate, error } = useMutation({
    mutationFn: async (data: SignUpSchemaType) => {
      return api.post('/auth', data)
    },
    onSuccess: (e) => {
      if (e.status === 204) {
        const { email } = JSON.parse(e.config.data)

        return router.push(`two-factor-auth?user=${email}`)
      }
      localStorage.setItem('@GoBarber:user', JSON.stringify(e.data.userInfo))
      const user = localStorage.getItem('@GoBarber:user')
      console.log(`🔥 ~ user from localStorage: ${JSON.stringify(user)}`)

      return router.replace('/dashboard')
    },
    onError: (e) => {
      console.log(`❌ ~ line 62 ~ errors: ${JSON.stringify(e)}`)
    },
  })

  const onSubmit: SubmitHandler<SignUpSchemaType> = useCallback(
    async (data) => mutate(data),
    [mutate],
  )

  const getErrorMessage = (error: { message?: string }) => {
    switch (error.message) {
      case 'Incorrect username and password combination':
        return 'Usuário ou senha incorretos'
      case 'User email is not verified. Please verify your email to proceed.':
        return 'Cadastro incompleto. Por favor, verifique seu email para continuar.'
      default:
        return 'Erro no servidor'
    }
  }

  return (
    <main className="flex h-screen items-center justify-center ">
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-80 flex-col items-center justify-center gap-4 rounded-lg p-2"
        >
          <h1 className="mb-1 text-xl font-bold">Faça seu logon</h1>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <>
                <Input placeholder="E-mail" onChange={onChange} value={value} />
                {errors.email && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.email.message}</AlertDescription>
                  </Alert>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  type="password"
                  placeholder="Senha"
                  onChange={onChange}
                  value={value}
                />
                {errors.password && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      {errors.password.message}
                    </AlertDescription>
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
            <AlertDescription>{getErrorMessage(error)}</AlertDescription>
          </Alert>
        )}
      </div>
    </main>
  )
}
