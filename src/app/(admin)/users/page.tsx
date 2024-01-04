'use client'

import Image from 'next/image'
import { Search, FileEdit, Trash } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import api from '@/services/api'
import ErrorMessage from '@/components/ErrorMessage'
import { ItemsEntity, UsersData } from './users.interface'
import useToggle from '@/hooks/useToggle'
import Modal from '@/components/Modal'
import PaginationCoxntrol from '@/components/PaginationControl'
import Table from '@/components/Table'
import { Button } from '@/components/Button/index'

type PaginationProps = {
  page: number
  itemsPerPage: number
  currentPage: number
  lastPage: number
}

export default function Permissions() {
  // const [data, setData] = useState<ItemsEntity[]>([])
  // const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [isError, setIsError] = useState<boolean>(false)
  // const [modalOpen, toggleModalOpen] = useToggle(false)
  // const [searchFilter, setSearchFilter] = useState<string>('')

  // const [pagination, setPagination] = useState<PaginationProps>({
  //   page: 1,
  //   itemsPerPage: 10,
  //   currentPage: 1,
  //   lastPage: 0,
  // })

  // const { page, itemsPerPage, currentPage, lastPage } = pagination

  // const handleChange = useCallback(
  //   (key: keyof PaginationProps, value: number) => {
  //     setPagination((prev) => ({
  //       ...prev,
  //       [key]: value,
  //     }))
  //   },
  //   [],
  // )

  // useEffect(() => {
  //   setIsLoading(true)
  //   api
  //     .get<UsersData>(
  //       `/list-user?perPage=${itemsPerPage}&page=${page}&filter=${searchFilter}`,
  //     )
  //     .then((response) => {
  //       handleChange('lastPage', response.data.lastPage)
  //       setData(response.data.items as any)
  //       setIsLoading(false)
  //     })
  //     .catch((err) => {
  //       setIsLoading(false)
  //       setIsError(true)
  //     })
  //     .finally(() => setIsLoading(false))
  // }, [page, itemsPerPage, handleChange, searchFilter])

  // if (isError) {
  //   return (
  //     <p className="font-bold text-red-400 shadow-2xl">
  //       Error ao obter os dados
  //     </p>
  //   )
  // }

  return (
    <main className="h-full w-full rounded-xl bg-t3 p-4 text-left shadow-3xl">
      {/* {isError && <ErrorMessage message="Error" />} */}

      {/* {modalOpen && (
        <Modal
          isOpen={modalOpen}
          close={toggleModalOpen}
          user={{
            name: 'data.items[key].name',
            email: 'data.items[key].email',
          }}
        />
      )} */}

      {/* <section className="flex w-full items-center justify-between rounded-lg bg-t1 px-4 py-3">
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
      </section> */}
      {/* <section className="table-body mx-auto my-3 h-4/5 w-full overflow-auto rounded-xl  bg-t2"> */}
      {/* <table className=" w-full">
          <thead className="sticky left-0 top-0 border-collapse bg-secondary">
            <tr>
              <th className="sticky left-0 top-0 border-collapse bg-secondary p-4">
                Id
              </th>
              <th className="sticky left-0 top-0 border-collapse bg-secondary p-4">
                Costumer
              </th>
              <th className="sticky left-0 top-0 border-collapse bg-secondary p-4">
                E-mail
              </th>
              <th className="sticky left-0 top-0 border-collapse bg-secondary p-4">
                Created At Date
              </th>
              <th className="sticky left-0 top-0 border-collapse bg-secondary p-4">
                Status
              </th>
              <th className="sticky left-0 top-0 border-collapse bg-secondary p-4">
                Password
              </th>
              <th className="sticky left-0 top-0 border-collapse bg-secondary p-4">
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
                      <td className="max-w-[150px] border-collapse overflow-auto whitespace-nowrap pl-1 text-center">
                        {item.id}
                      </td>
                      <td className="border-collapse whitespace-nowrap p-0">
                        <td className="flex items-center justify-center">
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
                      <td className="max-w-[120px] border-collapse overflow-auto whitespace-nowrap p-4 text-center">
                        {item.email}
                      </td>
                      <td className="max-w-[1000px] border-collapse overflow-auto whitespace-nowrap  p-4 text-center">
                        {item.createdAt}
                      </td>
                      <td className="max-w-[10px] border-collapse whitespace-nowrap text-center">
                        Active user
                      </td>
                      <td className="max-w-[120px] border-collapse overflow-scroll whitespace-nowrap text-center">
                        {item.password}
                      </td>
                      <td className="border-collapse whitespace-nowrap p-4 text-center">
                        <td className="flex items-center justify-center">
                          <button
                            className="cursor-pointer rounded-lg p-1 duration-150  ease-in-out hover:bg-primary_hover"
                            onClick={() => toggleModalOpen()}
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
        </table> */}

      {/* <Table data={data} /> */}
      {/* </section> */}

      <div className="flex flex-col items-center gap-2 bg-gray-300 p-2">
        <h1>Button Pattern Composition</h1>
        <Button.Root color="secondary" size="lg">
          {' '}
          teste1
        </Button.Root>
        <Button.Root color="neutral" size="md">
          teste2
        </Button.Root>

        <Button.Root size="sm">teste3</Button.Root>
      </div>

      {/* <PaginationControl
        currentPage={currentPage}
        lastPage={lastPage}
        page={page}
        handleChange={handleChange}
      /> */}
    </main>
  )
}
