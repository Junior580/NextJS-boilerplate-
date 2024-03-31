'use client'

import { useCallback, useState } from 'react'
import { FileEdit, Search, Trash } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useGetProducts } from '@/services/getProduct'
import { useQuery } from 'react-query'
import PaginationControl from '@/components/PaginationControl'
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import formatCurrency from '@/lib/formatCurrency'
import formatDate from '@/lib/formatDate'

type PaginationProps = {
  page: number
  itemsPerPage: number
  currentPage: number
  lastPage: number
}

export default function Product() {
  const [searchFilter, setSearchFilter] = useState<string>('')
  const [pagination, setPagination] = useState<PaginationProps>({
    page: 1,
    itemsPerPage: 10,
    currentPage: 1,
    lastPage: 0,
  })

  const handleChange = useCallback(
    (key: keyof PaginationProps, value: number) => {
      setPagination((prev) => ({
        ...prev,
        [key]: value,
      }))
    },
    [],
  )

  const { data, isError, isLoading } = useQuery(
    ['product-list', pagination],
    () =>
      useGetProducts({
        itemsPerPage: pagination.itemsPerPage,
        page: pagination.page,
        searchFilter: searchFilter,
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
        {!isLoading && <h1 className="font-bold">Produtos</h1>}
        <div className="flex h-full w-52 items-center justify-center rounded-3xl  px-3 duration-300 ease-in-out hover:w-64">
          {isLoading && <Skeleton className="h-[20px] w-[100px] rounded-md" />}
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
      </section>
      <section className="rounded-3xlshadow-md relative  sm:rounded-lg">
        <Table className="mr-7 border-collapse text-left text-sm">
          <TableHeader className=" text-xs uppercase ">
            <TableRow>
              <TableHead>
                {isLoading && (
                  <Skeleton className="h-[20px] w-[90px] rounded-md" />
                )}
                {!isLoading && <>Id</>}
              </TableHead>
              <TableHead>
                {isLoading && (
                  <Skeleton className="h-[20px] w-[90px] rounded-md" />
                )}
                {!isLoading && <>Nome</>}
              </TableHead>
              <TableHead>
                {isLoading && (
                  <Skeleton className="h-[20px] w-[90px] rounded-md" />
                )}
                {!isLoading && <>Descrição</>}
              </TableHead>
              <TableHead>
                {isLoading && (
                  <Skeleton className="h-[20px] w-[90px] rounded-md" />
                )}
                {!isLoading && <>Qtd. em estoque</>}
              </TableHead>
              <TableHead>
                {isLoading && (
                  <Skeleton className="h-[20px] w-[90px] rounded-md" />
                )}
                {!isLoading && <>Preço unitário de compra</>}
              </TableHead>
              <TableHead>
                {isLoading && (
                  <Skeleton className="h-[20px] w-[90px] rounded-md" />
                )}
                {!isLoading && <>Preço unitário de venda</>}
              </TableHead>
              <TableHead>
                {isLoading && (
                  <Skeleton className="h-[20px] w-[90px] rounded-md" />
                )}
                {!isLoading && <>Fornecedor</>}
              </TableHead>
              <TableHead>
                {isLoading && (
                  <Skeleton className="h-[20px] w-[90px] rounded-md" />
                )}
                {!isLoading && <>Created At</>}
              </TableHead>
              <TableHead>
                {isLoading && (
                  <Skeleton className="h-[20px] w-[90px] rounded-md" />
                )}
                {!isLoading && <>Actions</>}
              </TableHead>
            </TableRow>
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
                  <TableCell>
                    <Skeleton className="h-[20px] w-[90px] rounded-md" />
                  </TableCell>
                </TableRow>
              </>
            )}
            {data?.items?.map((item) => (
              <TableRow
                key={item.id}
                className="whitespace-nowrap  px-6  py-4 font-medium"
              >
                <TableCell>{item.id.split('-')[0]}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.quantityStock}</TableCell>
                <TableCell>
                  {formatCurrency(String(item.unitPurchasePrice))}
                </TableCell>
                <TableCell>
                  {formatCurrency(`${item.unitSalesPrice}`)}
                </TableCell>
                <TableCell>{item.supplier ?? 'Desconhecido'}</TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>

                <TableCell>
                  <Dialog>
                    <DialogTrigger className="hover:bg-primary_hover cursor-pointer rounded-lg p-1  duration-150 ease-in-out">
                      <FileEdit />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Deseja editar o Produto {item.name} ?
                        </DialogTitle>
                      </DialogHeader>
                      <form className="flex flex-col gap-2">
                        <div className="flex items-center gap-4">
                          <Label className="inline-block w-[90px]">Name</Label>
                          <Input
                            type="text"
                            className="w-full"
                            defaultValue={item.name}
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <Label className="inline-block w-[90px]">
                            Descrição
                          </Label>
                          <Input
                            type="text"
                            className="w-full"
                            defaultValue={item.description}
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <Label className="inline-block w-[90px]">
                            Qtd em estoque
                          </Label>
                          <Input
                            type="text"
                            className="w-full"
                            defaultValue={item.quantityStock}
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <Label className="inline-block w-[90px]">
                            Preço de compra
                          </Label>
                          <Input
                            type="text"
                            className="w-full"
                            defaultValue={item.unitPurchasePrice}
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <Label className="inline-block w-[90px]">
                            Preço de venda
                          </Label>
                          <Input
                            type="text"
                            className="w-full"
                            defaultValue={item.unitSalesPrice}
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <Label className="inline-block w-[90px]">
                            Fornecedor
                          </Label>
                          <Input
                            type="text"
                            className="w-full"
                            defaultValue={item.supplier ?? 'desconhecido'}
                          />
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
                  <Dialog>
                    <DialogTrigger className="hover:bg-primary_hover cursor-pointer rounded-lg p-1  duration-150 ease-in-out">
                      <Trash />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Deletar o usuario {item.name}?
                        </DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
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
