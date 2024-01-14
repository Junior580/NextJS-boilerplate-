'use client'

import Image from 'next/image'
import { Search, FileEdit, Trash } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import api from '@/services/api'
import { ErrorMessage } from '@/components/ErrorMessage/index'
import { ItemsEntity, UsersData } from './users.interface'
import useToggle from '@/hooks/useToggle'
// import Modal from '@/components/Modal'
import PaginationCoxntrol from '@/components/PaginationControl'
import Table from '@/components/Table'
import { Button } from '@/components/Button/index'
import { Input } from '@/components/Input/index'
import { FieldError } from 'react-hook-form'
import { LoadingMessage } from '@/components/LoadingMessage/index'
import { Modal } from '@/components/Modal/index'
import PaginationControl from '@/components/PaginationControl'
import ModalForm from '@/components/Modal/ModalForm'

type PaginationProps = {
  page: number
  itemsPerPage: number
  currentPage: number
  lastPage: number
}

export default function Permissions() {
  const [modalOpen, toggleModalOpen] = useToggle(false)

  const [data, setData] = useState<ItemsEntity[] | null>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
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
    const date = new Date(dateProp)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }, [])

  const handleEditClick = (userData: ItemsEntity) => {
    setSelectedUserData(userData)
    toggleModalOpen()
  }

  useEffect(() => {
    setIsLoading(true)
    api
      .get<UsersData>(
        `/list-user?perPage=${itemsPerPage}&page=${page}&filter=${searchFilter}`,
      )
      .then((response) => {
        handleChange('lastPage', response.data.lastPage)
        setData(response.data.items)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        setIsError(true)
      })
      .finally(() => setIsLoading(false))
  }, [page, itemsPerPage, handleChange, searchFilter])

  if (isError) {
    return (
      <p className="font-bold text-red-400 shadow-2xl">
        Error ao obter os dados
      </p>
    )
  }

  return (
    <main className="h-full w-full rounded-xl bg-t3 p-4 text-left shadow-3xl">
      {isError && <p>bumbum</p>}

      {selectedUserData && (
        <Modal.Root isOpen={modalOpen}>
          <Modal.Form
            close={toggleModalOpen}
            user={{
              name: selectedUserData?.name,
              email: selectedUserData?.email,
              emailVerified: formatDate(selectedUserData?.emailVerified),
              isTwoFactorEnabled: selectedUserData.isTwoFactorEnabled,
              role: selectedUserData.role,
            }}
          />
        </Modal.Root>
      )}

      <section className="flex w-full items-center justify-between rounded-lg bg-t1 px-4 py-3">
        <h1 className="font-bold">{isLoading ? 'Carregando...' : 'Users'}</h1>
        <div className="flex h-full w-52 items-center justify-center rounded-3xl bg-t1 px-3 duration-300 ease-in-out hover:w-64">
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
      <section className="table-body mx-auto my-3 h-4/5 w-full overflow-auto rounded-xl  bg-t2">
        <table className=" w-full">
          <thead className=" left-0 top-0 border-collapse bg-secondary">
            <tr>
              <th className=" left-0 top-0 border-collapse bg-secondary p-4 text-center">
                Id
              </th>
              <th className=" left-0 top-0 border-collapse bg-secondary p-4 text-center">
                Name
              </th>
              <th className=" left-0 top-0 border-collapse bg-secondary p-4 text-center">
                E-mail
              </th>
              <th className=" left-0 top-0 border-collapse bg-secondary p-4 text-center">
                Password
              </th>
              <th className=" left-0 top-0 border-collapse bg-secondary p-4 text-center">
                Two Factor Auth
              </th>
              <th className=" left-0 top-0 border-collapse bg-secondary p-4 text-center">
                Verified E-mail
              </th>
              <th className=" left-0 top-0 border-collapse bg-secondary p-4 text-center">
                Role
              </th>
              <th className=" left-0 top-0 border-collapse bg-secondary p-4 text-center">
                Created At
              </th>
              <th className=" left-0 top-0 border-collapse bg-secondary p-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="h-full">
            {data &&
              data.map((item, key) => {
                return (
                  <>
                    <tr
                      key={key}
                      className="max-h-full max-w-full flex-col items-center overflow-auto"
                    >
                      <td className=" whitespace-nowrap text-center">
                        {item.id.substring(0, 10)}...
                      </td>
                      <td>
                        <td className="flex items-center justify-center px-2">
                          <Image
                            src="https://avatars.githubusercontent.com/u/93562736?v=4"
                            alt={'username'}
                            width={36}
                            height={36}
                            priority
                            className="mr-2 rounded-full align-middle"
                          />
                          <td>{item.name}</td>
                        </td>
                      </td>
                      <td className="px-2 text-center">{item.email}</td>
                      <td className="px-2 text-center">
                        {item.password.substring(0, 10)}...
                      </td>
                      <td className="px-2 text-center">
                        {item.isTwoFactorEnabled ? (
                          <p>Ativado</p>
                        ) : (
                          <p>Desativado</p>
                        )}
                      </td>
                      <td className="px-2 text-center">
                        {item.emailVerified ? (
                          <p>{formatDate(item.emailVerified)}</p>
                        ) : (
                          <p>Não</p>
                        )}
                      </td>
                      <td className="px-2 text-center">{item.role}</td>
                      <td className="px-2 text-center">
                        {formatDate(item.createdAt)}
                      </td>

                      <td className="border-collapse whitespace-nowrap p-4 text-center">
                        <td className="flex items-center justify-center">
                          <button
                            className="cursor-pointer rounded-lg p-1 duration-150  ease-in-out hover:bg-primary_hover"
                            onClick={() => handleEditClick(item)}
                          >
                            <FileEdit />
                          </button>
                          <button className="cursor-pointer rounded-lg p-1 duration-150  ease-in-out hover:bg-primary_hover">
                            <Trash />
                          </button>
                        </td>
                      </td>
                    </tr>
                  </>
                )
              })}
          </tbody>
        </table>

        {/* <Table data={data} /> */}
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
