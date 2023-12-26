'use client'

import Image from 'next/image'
import {
  Search,
  FileEdit,
  Trash,
  ArrowLeft,
  ArrowRight,
  ArrowLeftToLine,
  ArrowRightToLine,
} from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import api from '@/services/api'

type PaginationProps = {
  page: number
  itemsPerPage: number
  firstPage: number
  totalPages: number
  teste: string
}

export default function Permissions() {
  const [data, setData] = useState<any[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const [searchFilter, setSearchFilter] = useState<string>('')
  console.log(searchFilter)

  const [pagination, setPagination] = useState<PaginationProps>({
    page: 1,
    itemsPerPage: 10,
    firstPage: 1,
    totalPages: 0,
    teste: '',
  })

  const { page, itemsPerPage, firstPage, totalPages } = pagination

  const handleChange = useCallback(
    (key: keyof PaginationProps, value: number) => {
      setPagination((prev) => ({
        ...prev,
        [key]: value,
      }))
    },
    [],
  )

  useEffect(() => {
    setIsLoading(true)
    api
      .get(
        `http://localhost:3000/protected?page=${page}&itemsPerPage=${itemsPerPage}`,
      )
      .then((response) => {
        handleChange('totalPages', response.data.totalPages)

        setData(response.data.users)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        setIsError(true)
      })
      .finally(() => setIsLoading(false))
  }, [page, itemsPerPage, handleChange])

  return (
    <main className="h-full w-full rounded-xl bg-t3 p-4 text-left shadow-3xl">
      <section className="flex  w-full items-center justify-between rounded-lg bg-t1 px-4 py-3">
        <h1 className="font-bold">Users:</h1>
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
        <table className="w-full">
          <thead className="sticky left-0 top-0 border-collapse bg-secondary">
            <tr>
              <th className="sticky left-0 top-0 border-collapse bg-secondary p-4">
                Id
              </th>
              <th className="sticky left-0 top-0 border-collapse bg-secondary p-4">
                Costumer
              </th>
              <th className="sticky left-0 top-0 border-collapse bg-secondary p-4">
                Location
              </th>
              <th className="sticky left-0 top-0 border-collapse bg-secondary p-4">
                Order Date
              </th>
              <th className="sticky left-0 top-0 border-collapse bg-secondary p-4">
                Status
              </th>
              <th className="sticky left-0 top-0 border-collapse bg-secondary p-4">
                Amount
              </th>
              <th className="sticky left-0 top-0 border-collapse bg-secondary p-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="h-full">
            {data &&
              data
                .filter((item) => {
                  return searchFilter.toLowerCase() === ''
                    ? item
                    : item.name.toLowerCase().includes(searchFilter)
                })
                .map((item, key) => {
                  return (
                    <tr key={key}>
                      <td className="border-collapse text-center">{item.id}</td>
                      <td className=" border-collapse">
                        <td className="flex items-center">
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
                      <td className="border-collapse p-4">{item.city}</td>
                      <td className="border-collapse p-4">17 Dec, 2022</td>
                      <td className="border-collapse p-4">
                        <td>{item.status}</td>
                      </td>
                      <td className="border-collapse p-4">{item.amount}</td>
                      <td className="border-collapse p-4">
                        <td className="flex items-center justify-center">
                          <button className="cursor-pointer rounded-lg p-1 duration-150  ease-in-out hover:bg-primary_hover">
                            <FileEdit />
                          </button>
                          <button className="cursor-pointer rounded-lg p-1 duration-150  ease-in-out hover:bg-primary_hover">
                            <Trash />
                          </button>
                        </td>
                      </td>
                    </tr>
                  )
                })}
          </tbody>
        </table>
      </section>

      {isError && <p className="text-red-600">Error ao obter os dados</p>}
      {isLoading && <p className="text-green-600">Carregando...</p>}

      <div className="flex justify-end gap-4 px-4 py-3">
        <select
          className="cursor-pointer rounded-lg border-none outline-none"
          onChange={(e) => handleChange('itemsPerPage', Number(e.target.value))}
        >
          <option>10</option>
          <option>20</option>
          <option>30</option>
        </select>
        <button
          className={`cursor-pointer rounded-lg p-1 duration-150 ease-in-out ${
            page === 1 ? 'text-gray-300' : 'hover:bg-primary_hover'
          }`}
          onClick={() => handleChange('page', firstPage)}
          disabled={page === 1}
        >
          <ArrowLeftToLine size={20} />
        </button>
        <button
          className={`cursor-pointer rounded-lg p-1 duration-150 ease-in-out ${
            page === 1 ? 'text-gray-300' : 'hover:bg-primary_hover'
          }`}
          disabled={page === 1}
          onClick={() => handleChange('page', page - 1)}
        >
          <ArrowLeft size={20} />
        </button>

        {pagination.totalPages &&
          Array.from(
            { length: pagination.totalPages },
            (_, index) => index + 1,
          ).map((item, key) => (
            <button
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  page: item,
                }))
              }
              key={key}
              className={`cursor-pointer rounded-lg p-1 font-bold duration-150  ease-in-out hover:bg-primary_hover ${
                page === item && 'bg-primary_hover'
              }`}
            >
              {item}
            </button>
          ))}

        <button
          className={`cursor-pointer rounded-lg p-1  duration-150 ease-in-out ${
            page === totalPages ? 'text-gray-300' : 'hover:bg-primary_hover'
          }`}
          onClick={() => handleChange('page', page + 1)}
          disabled={page === totalPages}
        >
          <ArrowRight />
        </button>

        <button
          className={`cursor-pointer rounded-lg p-1  duration-150 ease-in-out ${
            page === totalPages ? 'text-gray-300' : 'hover:bg-primary_hover'
          }`}
          onClick={() => handleChange('page', totalPages)}
          disabled={page === totalPages}
        >
          <ArrowRightToLine size={20} />
        </button>
      </div>
    </main>
  )
}
