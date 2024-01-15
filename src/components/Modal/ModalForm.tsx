import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../Input/index'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { useCallback } from 'react'
import { useMutation } from 'react-query'
import api from '@/services/api'
import Button from '../Button'
import { Select } from '../Select'

const SignUpSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  emailVerified: z.string(),
  isTwoFactorEnabled: z.boolean(),
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

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async (data: SignUpType) => {
      return api.post('/updateuser', data)
    },
    onSuccess: () => close(),
  })

  console.log(
    `🔥 ~ Error submit ~ ${JSON.stringify(error)}  ${JSON.stringify(isError)}`,
  )

  const onSubmit: SubmitHandler<SignUpType> = useCallback(
    async (data) => {
      console.log(`🔥 ~ Submited ${JSON.stringify(data)}`)
      mutate(data)
    },
    [mutate],
  )

  // get options
  const roleOptions = ['USER', 'ADMIN']

  return (
    <div
      data-iserror={isError}
      className="flex w-[500px] flex-col  items-center justify-between gap-8 rounded-lg bg-gray-500 p-4 shadow-3xl data-[iserror=true]:border-2 data-[iserror=true]:border-solid data-[iserror=true]:border-red-600"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
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

              <Select.Root
                error={errors.isTwoFactorEnabled}
                value={String(value)}
                onChange={(e) => onChange(e.target.value === 'true')}
              >
                <option value={'true'}>Sim</option>
                <option value={'false'}>Não</option>
              </Select.Root>
            </div>
          )}
        />

        <Controller
          control={control}
          name="role"
          render={({ field: { onChange, value } }) => (
            <div className="w-full text-white">
              <label className="ml-1">Permission: </label>
              <Select.Root
                onChange={onChange}
                value={value}
                error={errors.emailVerified}
              >
                {roleOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select.Root>
            </div>
          )}
        />

        <div className="flex w-full gap-2">
          <Button type="submit" name="Atualizar" isLoading={isLoading} />

          <Button onClick={close} name="Fechar" />
        </div>
      </form>
      {isError && (
        <p className="font-bold text-red-500">Error ao enviar dados</p>
      )}
    </div>
  )
}
