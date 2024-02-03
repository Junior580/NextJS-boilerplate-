import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../Input/index'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { useCallback } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import api from '@/services/api'
import Button from '../Button'
import { Select } from '../Select'

const SignUpSchema = z.object({
  id: z.string(),
  name: z.string().min(5).optional(),
  email: z.string().email().optional(),
  isTwoFactorEnabled: z.boolean().optional(),
  role: z.string().optional(),
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
      id: user.id,
      name: user.name,
      email: user.email,
      isTwoFactorEnabled: user.isTwoFactorEnabled,
      role: user.role,
    },
  })

  const queryClient = useQueryClient()

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async (data: SignUpType) => {
      console.log(`useMutation ~ submited ${JSON.stringify(data)}`)
      try {
        const post = await api.post('/update-user', data)
        return post
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('user-list')
      close()
    },
  })

  const onSubmit: SubmitHandler<SignUpType> = useCallback(
    async (data) => {
      const propertiesToRemove: Array<keyof SignUpType> = []

      if (data.name === user.name) {
        propertiesToRemove.push('name')
      }

      if (data.email === user.email) {
        propertiesToRemove.push('email')
      }

      if (data.isTwoFactorEnabled === user.isTwoFactorEnabled) {
        propertiesToRemove.push('isTwoFactorEnabled')
      }

      if (data.role === user.role) {
        propertiesToRemove.push('role')
      }

      propertiesToRemove.forEach((property) => delete data[property])

      console.log(`🔥 ~ Submited ${JSON.stringify(data)}`)
      return mutate(data)
    },
    [mutate, user],
  )

  // get options
  const roleOptions = ['USER', 'ADMIN']

  return (
    <div
      data-iserror={isError}
      className="shadow-3xl flex w-[500px]  flex-col items-center justify-between gap-8 rounded-lg bg-gray-500 p-4 data-[iserror=true]:border-2 data-[iserror=true]:border-solid data-[iserror=true]:border-red-600"
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
          name="isTwoFactorEnabled"
          render={({ field: { onChange, value } }) => (
            <div className="w-full text-white">
              <label className="ml-1">Two Factor Auth: </label>

              <Select.Root
                error={errors.isTwoFactorEnabled}
                value={String(value)}
                onChange={(e) => onChange(e.target.value === 'true')}
                defaultValue={user.isTwoFactorEnabled ? 'true' : 'false'}
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
                error={errors.role}
                defaultValue={user.role}
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
      {/* {isError && (
        <p className="font-bold text-red-500">Error ao enviar dados</p>
      )} */}
      {error === 'Error: "Email already in use!"' && (
        <p className="font-bold text-red-500">Error ao enviaraa dados</p>
      )}
    </div>
  )
}
