'use client'
import { useCallback } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import Link from 'next/link'
import z from 'zod'

import api from '@/services/api'
import { useGetSupplier } from '@/services/getSupplier'
import formatDate from '@/lib/formatDate'
import { capitalizeFirstLetter } from '@/lib/capitalizeFirstLetter'
import { useToast } from '@/components/ui/use-toast'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'

const ProductSchema = z.object({
  name: z.string().min(5),
  description: z.string(),
  quantityStock: z.number(),
  unitPurchasePrice: z.number(),
  unitSalesPrice: z.number(),
  supplier: z.string().optional(),
})

type ProductSchemaType = z.infer<typeof ProductSchema>

export default function CreateProduct() {
  const { toast } = useToast()
  const { data, isLoading } = useQuery(['supplier-list'], () =>
    useGetSupplier({
      itemsPerPage: 0,
      page: 1,
      searchFilter: '',
    }),
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: '',
      description: '',
      quantityStock: '' as any,
      unitPurchasePrice: '' as any,
      unitSalesPrice: '' as any,
      supplier: '',
    },
  })

  const { mutate } = useMutation({
    mutationFn: async (data: ProductSchemaType) => {
      return api.post('/product', {
        ...data,
        name: capitalizeFirstLetter(data.name),
        supplier: data.supplier === '' ? null : data.supplier,
      })
    },
    onSuccess: (e) => {
      reset()

      toast({
        variant: 'default',
        title: 'Produto cadastrado com sucesso',
        description: formatDate(e.data.createdAt),
      })

      return
    },
    onError: (e: any) => {
      if (e.statusCode === 409) {
        toast({
          variant: 'destructive',
          title: 'Erro no cadastro',
          description: 'Produto já cadastrado',
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

  const onSubmit: SubmitHandler<ProductSchemaType> = useCallback(
    async (data) => mutate(data),
    [],
  )

  return (
    <main className="p-4">
      <section className="flex w-full items-center justify-between rounded-lg  px-4 py-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/product">Produtos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>Novo Produto</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <Separator className="my-4" />

      <section className="rounded-3xlshadow-md relative   sm:rounded-lg">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Label>Nome</Label>
          <Input {...register('name')} />
          {errors.name && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.name.message}</AlertDescription>
            </Alert>
          )}

          <Label>Descrição</Label>
          <Input {...register('description')} />
          {errors.description && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.description?.message}</AlertDescription>
            </Alert>
          )}

          <Label>Qtd. em estoque</Label>

          <Input
            type="number"
            {...register('quantityStock', {
              setValueAs(value) {
                parseFloat(value)
              },
            })}
          />
          {errors.quantityStock && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {errors.quantityStock?.message}
              </AlertDescription>
            </Alert>
          )}

          <Label>Preço unitário de compra</Label>
          <Input
            type="number"
            {...register('unitPurchasePrice', {
              setValueAs(value) {
                parseFloat(value)
              },
            })}
          />
          {errors.unitPurchasePrice && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {errors.unitPurchasePrice?.message}
              </AlertDescription>
            </Alert>
          )}

          <Label>Preço unitário de venda</Label>

          <Input
            type="number"
            {...register('unitSalesPrice', {
              setValueAs(value) {
                parseFloat(value)
              },
            })}
          />
          {errors.unitSalesPrice && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {errors.unitSalesPrice?.message}
              </AlertDescription>
            </Alert>
          )}

          {isLoading && <Skeleton className="h-[20px] w-[90px] rounded-md" />}

          {!isLoading && (
            <>
              <Label>Fornecedor</Label>
              <Select {...register('supplier')}>
                <SelectTrigger>
                  <SelectValue placeholder="Fornecedor" />
                </SelectTrigger>
                <SelectContent>
                  {data?.items?.map((item) => (
                    <SelectItem key={item.id} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {errors.supplier && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {errors.supplier?.message}
                  </AlertDescription>
                </Alert>
              )}
            </>
          )}

          <div className="flex gap-2 self-end pt-2">
            <Button variant="destructive" asChild>
              <Link href="/product">Cancelar</Link>
            </Button>
            <Button type="submit">Enviar</Button>
          </div>
        </form>

        <Separator className="my-4" />
      </section>
    </main>
  )
}
