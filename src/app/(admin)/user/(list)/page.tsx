'use client'

import { useCallback, useState } from 'react'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { getUsers } from '@/services/getUser'
import api from '@/services/api'
import formatDate from '@/lib/formatDate'

import PaginationControl from '@/components/PaginationControl'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { withAuth } from '@/components/WithAuth'

import { Search, FileEdit, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { zodResolver } from '@hookform/resolvers/zod'

type PaginationProps = {
  page: number
  itemsPerPage: number
  currentPage: number
  lastPage: number
}

const SignUpSchema = z.object({
  id: z.string(),
  name: z.string().min(5).optional(),
  email: z.string().email().optional(),
  isTwoFactorEnabled: z.boolean().optional(),
  role: z.string().optional(),
})

type SignUpType = z.infer<typeof SignUpSchema>

function ListUser() {
  const [searchFilter, setSearchFilter] = useState<string>('')
  const [pagination, setPagination] = useState<PaginationProps>({
    page: 1,
    itemsPerPage: 10,
    currentPage: 1,
    lastPage: 0,
  })
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [sort, setSort] = useState<'name' | 'createdAt'>('name')

  const handleChange = useCallback(
    (key: keyof PaginationProps, value: number) => {
      setPagination((prev) => ({
        ...prev,
        [key]: value,
      }))
    },
    [],
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
  })

  const { data, isError, isLoading, refetch } = useQuery(
    ['user-list', pagination],
    () =>
      getUsers({
        itemsPerPage: pagination.itemsPerPage,
        page: pagination.page,
        searchFilter: searchFilter,
        sortDir: sortDir,
        sort: sort,
      }),
    { keepPreviousData: true, staleTime: 5000 },
  )

  if (isError) {
    return (
      <p className="font-bold text-red-400 shadow-2xl">
        Error ao obter os dados
      </p>
    )
  }

  return (
    <main className="p-4">
      <section className="flex w-full items-center justify-between rounded-lg px-4 py-3">
        {isLoading && <Skeleton className="h-[20px] w-[100px] rounded-md" />}
        {!isLoading && (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Usuarios</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}
        <div className="mr-6 flex w-52 flex-col items-center gap-4">
          <div className="flex h-full w-52 items-center justify-center rounded-3xl  px-3 duration-300 ease-in-out hover:w-64">
            {isLoading && (
              <Skeleton className="h-[20px] w-[100px] rounded-md" />
            )}
            {!isLoading && (
              <>
                <input
                  type="search"
                  placeholder="Search Data..."
                  className="w-full rounded-xl border-none bg-transparent px-1 py-2 outline-none"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
                <Search />
              </>
            )}
          </div>
          <div>
            {isLoading && (
              <Skeleton className="h-[20px] w-[100px] rounded-md" />
            )}
            {!isLoading && (
              <Button asChild>
                <Link href="/user/create">Cadastrar Usuario</Link>
              </Button>
            )}
          </div>
        </div>
      </section>
      <section className="relative max-h-[75vh] overflow-y-auto  rounded-3xl shadow-md sm:rounded-lg">
        <Table className="mr-7 border-collapse text-left text-sm">
          <TableHeader>
            {isLoading && (
              <TableRow>
                <TableHead>
                  <Skeleton className="h-[20px] w-[90px] rounded-md" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-[20px] w-[90px] rounded-md" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-[20px] w-[90px] rounded-md" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-[20px] w-[90px] rounded-md" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-[20px] w-[90px] rounded-md" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-[20px] w-[90px] rounded-md" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-[20px] w-[90px] rounded-md" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-[20px] w-[90px] rounded-md" />
                </TableHead>
              </TableRow>
            )}
            {!isLoading && (
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead
                  onClick={() => {
                    setSort('name')
                    if (sortDir === 'asc') {
                      setSortDir('desc')
                    }
                    if (sortDir === 'desc') {
                      setSortDir('asc')
                    }
                    refetch()
                  }}
                >
                  Name
                </TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Verified E-mail</TableHead>
                <TableHead>Two Factor Auth</TableHead>
                <TableHead>Role</TableHead>
                <TableHead
                  onClick={() => {
                    setSort('createdAt')
                    if (sortDir === 'asc') {
                      setSortDir('desc')
                    }
                    if (sortDir === 'desc') {
                      setSortDir('asc')
                    }
                    refetch()
                  }}
                >
                  Created At
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            )}
          </TableHeader>

          <TableBody>
            {isLoading && (
              <>
                <TableRow>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[90px] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[90px] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[90px] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[90px] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[90px] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[90px] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[90px] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[90px] rounded-md" />
                  </TableCell>
                </TableRow>
                <TableRow className="whitespace-nowrap  px-6  py-4 font-medium">
                  <TableCell>
                    <Skeleton className="h-[20px] w-[90px] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[90px] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[90px] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[90px] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[90px] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[90px] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[90px] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[90px] rounded-md" />
                  </TableCell>
                </TableRow>
              </>
            )}
            {data?.items?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id.split('-')[0]}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>

                <TableCell>
                  {item.emailVerified ? formatDate(item.emailVerified) : 'Não'}
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      item.isTwoFactorEnabled ? 'bg-green-400' : 'bg-red-400'
                    }
                  >
                    {item.isTwoFactorEnabled ? 'Sim' : 'Não'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      item.role === 'ADMIN' ? 'bg-green-400' : 'bg-blue-400'
                    }
                  >
                    {item.role}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger className="hover:bg-primary_hover cursor-pointer rounded-lg p-1  duration-150 ease-in-out">
                      <FileEdit />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Editar o usuario {item.name} ?
                        </DialogTitle>
                      </DialogHeader>
                      <form className="flex flex-col gap-2">
                        <div className="flex items-center gap-4">
                          <Label className="inline-block w-[60px]">Name</Label>
                          <Input
                            type="text"
                            className="w-full"
                            defaultValue={item.name}
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <Label className="inline-block w-[60px]">Email</Label>
                          <Input
                            type="text"
                            className="w-full"
                            defaultValue={item.email}
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <Label className="inline-block w-[60px]">2FA</Label>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue
                                placeholder={
                                  item.isTwoFactorEnabled ? 'Sim' : 'Não'
                                }
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">Sim</SelectItem>
                              <SelectItem value="false">Não</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center gap-4">
                          <Label className="inline-block w-[60px]">Role</Label>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue
                                placeholder={
                                  item.role === 'ADMIN' ? 'Admin' : 'User'
                                }
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ADMIN">Admin</SelectItem>
                              <SelectItem value="USER">User</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <DialogFooter className="mt-2 flex w-full justify-between gap-2">
                          <Button
                            type="submit"
                            variant="default"
                            className="w-full"
                            onClick={() => console.log('usuario editado')}
                          >
                            Salvar
                          </Button>
                          <DialogClose asChild>
                            <Button variant="outline" className="w-full">
                              Cancelar
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Trash />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Deletar o usuario {item.name} ?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Essa ação não pode ser desfeita. Isto irá
                          permanentemente exclua sua conta e remova seus dados
                          de nosso servidores.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => console.log(`❌ usuario ex cluido`)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <PaginationControl
        currentPage={data?.currentPage ?? 1}
        lastPage={data?.lastPage ?? 0}
        page={data?.currentPage ?? 1}
        handleChange={handleChange}
        isLoading={isLoading}
      />
    </main>
  )
}

export default withAuth(ListUser, ['ADMIN', 'USER'])
