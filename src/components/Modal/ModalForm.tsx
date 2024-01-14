import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../Input/index'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { useCallback } from 'react'
import { useMutation } from 'react-query'
import api from '@/services/api'
import Button from '../Button'

const SignUpSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  emailVerified: z.string(),
  isTwoFactorEnabled: z.string(),
  role: z.string(),
})

type SignUpType = z.infer<typeof SignUpSchema>

type ModalProps = {
  close: () => void
  user: SignUpType
}

export default function ModalForm({ user, close }: ModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      isTwoFactorEnabled: user.isTwoFactorEnabled,
      role: user.role,
    },
  })

  console.log(`🔥 ~ modalForm ~${JSON.stringify(user)}`)

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async (data: SignUpType) => {
      return api.post('/updateuser', data)
    },
    onSuccess: () => close(),
  })

  const onSubmit: SubmitHandler<SignUpType> = useCallback(
    async (data) => {
      console.log(`Submited`)
      mutate(data)
    },
    [mutate],
  )
  return (
    <div className="flex w-[500px] flex-col  items-center justify-between gap-8 rounded-lg bg-gray-500 p-4 shadow-3xl">
      <form
        // onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col  items-center justify-between gap-8  bg-gray-500 "
      >
        <h1 className="text-lg font-bold">Editar informações</h1>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <div className="w-full text-white">
              <label className="ml-1">Name: </label>
              <Input.Root
                placeholder="Name"
                onChange={onChange}
                value={value}
                error={errors.name}
              />
            </div>
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <div className="w-full text-white">
              <label className="ml-1">E-mail: </label>
              <Input.Root
                placeholder="E-mail"
                onChange={onChange}
                value={value}
                error={errors.email}
              />
            </div>
          )}
        />

        <Controller
          control={control}
          name="emailVerified"
          render={({ field: { onChange, value } }) => (
            <div className="w-full text-white">
              <label className="ml-1">Verifed E-mail: </label>
              <Input.Root
                placeholder="Verifed E-mail"
                onChange={onChange}
                value={value}
                error={errors.emailVerified}
              />
            </div>
          )}
        />

        <Controller
          control={control}
          name="isTwoFactorEnabled"
          render={({ field: { onChange, value } }) => (
            <div className="w-full text-white">
              <label className="ml-1">Two Factor Auth: </label>

              <select value={JSON.parse(value)} onChange={onChange}>
                <option value={'true'}>Sim</option>
                <option value={'false'}>Não</option>
              </select>
            </div>
          )}
        />

        <Controller
          control={control}
          name="role"
          render={({ field: { onChange, value } }) => (
            <div className="w-full text-white">
              <label className="ml-1">Permission: </label>
              <Input.Root
                placeholder="Permission"
                onChange={onChange}
                value={value}
                error={errors.emailVerified}
              />
            </div>
          )}
        />
      </form>

      <div className="flex w-full gap-2">
        <Button onSubmit={handleSubmit(onSubmit)} name="Atualizar" />

        <Button onClick={close} name="Fechar" />
      </div>
    </div>
  )
}
