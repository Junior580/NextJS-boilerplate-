'use client'

import { useCallback } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import z from 'zod'

import api from '@/services/api'
import { useToast } from '@/components/ui/use-toast'
import formatDate from '@/lib/formatDate'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { zodResolver } from '@hookform/resolvers/zod'

const CreateUserSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(5),
})

type CreateUserSchemaType = z.infer<typeof CreateUserSchema>

export default function CreateUser() {
  const { toast } = useToast()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserSchemaType>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const { mutate } = useMutation({
    mutationFn: async (data: CreateUserSchemaType) => {
      return api.post('/create-user', data)
    },
    onSuccess: (e) => {
      reset()

      toast({
        variant: 'default',
        title: 'Usuario cadastrado com sucesso',
        description: 'Link para ativação da conta foi enviado para seu e-mail.',
      })

      return
    },
    onError: (e: any) => {
      if (e.statusCode === 409) {
        toast({
          variant: 'destructive',
          title: 'Erro no cadastro',
          description: 'Usuario já cadastrado',
        })
        return
      }

      toast({
        variant: 'destructive',
        title: 'Erro desconhecido',
        description: 'Tente mais tarde',
      })
      return
    },
  })

  const onSubmit: SubmitHandler<CreateUserSchemaType> = useCallback(
    async (data) => mutate(data),
    [],
  )
  return (
    <main className="p-4">
      <section className="flex w-full items-center justify-between rounded-lg  px-4 py-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/user">Usuarios</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>Novo Usuario</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <Separator className="my-4" />

      <section className="rounded-3xlshadow-md relative   sm:rounded-lg">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Label>Nome</Label>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <>
                <Input onChange={onChange} value={value} />
                {errors.name && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.name?.message}</AlertDescription>
                  </Alert>
                )}
              </>
            )}
          />

          <Label>Email</Label>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <>
                <Input onChange={onChange} value={value} />
                {errors.email && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.email?.message}</AlertDescription>
                  </Alert>
                )}
              </>
            )}
          />

          <Label>Senha</Label>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <>
                <Input type="password" onChange={onChange} value={value} />
                {errors.password && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      {errors.password?.message}
                    </AlertDescription>
                  </Alert>
                )}
              </>
            )}
          />

          <div className="flex gap-2 self-end pt-2">
            <Button variant="destructive" asChild>
              <Link href="/product">Cancelar</Link>
            </Button>
            <Button type="submit">Enviar</Button>
          </div>
        </form>
      </section>
    </main>
  )
}
