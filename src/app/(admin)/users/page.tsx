'use client'

import Image from 'next/image'
import { Search, FileEdit, Trash } from 'lucide-react'
import { useCallback, useState } from 'react'
import useToggle from '@/hooks/useToggle'
import { Modal } from '@/components/Modal/index'
import PaginationControl from '@/components/PaginationControl'
import { useQuery } from 'react-query'
import { ItemsEntity, getUsers } from '@/services/getUsers'
import { Table, TableBody, TableCell } from '@/components/ui/table'
import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { format, parseISO } from 'date-fns'
import { Badge } from '@/components/ui/badge'

type PaginationProps = {
  page: number
  itemsPerPage: number
  currentPage: number
  lastPage: number
}

export default function Permissions() {
  const [modalOpen, toggleModalOpen] = useToggle(false)
  const [searchFilter, setSearchFilter] = useState<string>('')
  const [selectedUserData, setSelectedUserData] = useState<ItemsEntity | null>(
    null,
  )

  const [pagination, setPagination] = useState<PaginationProps>({
    page: 1,
    itemsPerPage: 10,
    currentPage: 1,
    lastPage: 0,
  })

  const { page, itemsPerPage, currentPage, lastPage } = pagination

  const handleChange = useCallback(
    (key: keyof PaginationProps, value: number) => {
      setPagination((prev) => ({
        ...prev,
        [key]: value,
      }))
    },
    [],
  )

  const formatDate = useCallback((dateProp: string) => {
    return format(dateProp, "dd/MM/yyyy 'às' HH:mm:ss")
  }, [])

  const handleEditClick = (userData: ItemsEntity) => {
    setSelectedUserData(userData)
    toggleModalOpen()
  }

  const { data, isError, isLoading } = useQuery(
    'user-list',
    () => getUsers({ itemsPerPage, page, searchFilter }),
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
    <main className="bg-t3 shadow-3xl h-full w-full rounded-xl p-4 ">
      {selectedUserData && (
        <Modal.Root isOpen={modalOpen}>
          <Modal.Form
            close={toggleModalOpen}
            user={{
              id: selectedUserData.id,
              name: selectedUserData?.name,
              email: selectedUserData?.email,
              isTwoFactorEnabled: selectedUserData.isTwoFactorEnabled,
              role: selectedUserData.role,
            }}
          />
        </Modal.Root>
      )}

      <section className="bg-t1 flex w-full items-center justify-between rounded-lg px-4 py-3">
        <h1 className="font-bold">{isLoading ? 'Carregando...' : 'Users'}</h1>
        <div className="flex h-full w-52 items-center justify-center rounded-3xl bg-slate-100 px-3 duration-300 ease-in-out hover:w-64">
          <input
            type="search"
            placeholder="Search Data..."
            className="w-full border-none bg-transparent px-1 py-2 outline-none"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
          <Search />
        </div>
      </section>
      <section className="rounded-3xlshadow-md relative overflow-x-auto sm:rounded-lg">
        <Table className="mr-7 border-collapse text-left text-sm">
          <TableHeader className="bg-gray-300 text-xs uppercase text-white">
            <TableRow>
              <TableHead className="px-6 py-3">Id</TableHead>
              <TableHead className="px-6 py-3">Name</TableHead>
              <TableHead className="px-6 py-3">E-mail</TableHead>
              <TableHead className="px-6 py-3">Two Factor Auth</TableHead>
              <TableHead className="px-6 py-3 text-center">
                Verified E-mail
              </TableHead>
              <TableHead className="px-6 py-3">Role</TableHead>
              <TableHead className="px-6 py-3">Created At</TableHead>
              <TableHead className="px-6 py-3">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.map((item) => (
              <TableRow
                key={item.id}
                className="whitespace-nowrap bg-gray-200 px-6  py-4 font-medium"
              >
                <TableCell className="font-medium">
                  {item.id.split('-')[0]}
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell className="text-center">
                  <Badge
                    className={
                      item.isTwoFactorEnabled ? 'bg-green-400' : 'bg-red-400'
                    }
                  >
                    {item.isTwoFactorEnabled ? 'Sim' : 'Não'}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  {item.emailVerified ? formatDate(item.emailVerified) : 'Não'}
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
                <TableCell className="flex items-center justify-center">
                  <button
                    className="hover:bg-primary_hover cursor-pointer rounded-lg p-1  duration-150 ease-in-out"
                    onClick={() => handleEditClick(item)}
                  >
                    <FileEdit />
                  </button>
                  <button className="hover:bg-primary_hover cursor-pointer rounded-lg p-1  duration-150 ease-in-out">
                    <Trash />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <PaginationControl
        currentPage={currentPage}
        lastPage={lastPage}
        page={page}
        handleChange={handleChange}
      />
    </main>
  )
}
