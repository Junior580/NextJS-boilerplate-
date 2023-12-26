'use client'

import Button from '@/components/Button'
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
import { useEffect, useState } from 'react'
import api from '@/services/api'

export default function Permissions() {
  const [data, setData] = useState<any[]>()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const [page, setPage] = useState(1)
  const [itensPerPage, setItensPerPage] = useState(10)

  const [firstPage, setFirstPage] = useState(1)
  const [lastPage, setLastPage] = useState<number>(0)

  const [totalPages, setTotalPages] = useState<number>(0)

  useEffect(() => {
    setIsLoading(true)
    api
      .get(
        `http://localhost:3000/protected?page=${page}&itemsPerPage=${itensPerPage}`,
      )
      .then((response) => {
        console.log(response.data.users)
        setTotalPages(response.data.totalPages)
        setLastPage(response.data.totalPages)
        setData(response.data.users)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        setIsError(true)
      })

      .finally(() => setIsLoading(false))
  }, [page, itensPerPage, firstPage, lastPage])

  return (
    <main className="h-full w-full rounded-xl bg-t3 p-4 text-left shadow-3xl">
      <section className="flex  w-full items-center justify-between rounded-lg bg-t1 px-4 py-3">
        <h1 className="font-bold">Permissions:</h1>
        <div className="flex h-full items-center justify-center rounded-3xl bg-t1 px-3">
          <input
            type="search"
            placeholder="Search Data..."
            className="w-full border-none bg-transparent px-1 py-2 outline-none"
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
              data.map((item, key) => {
                return (
                  <tr key={key}>
                    <td className="border-collapse text-center">{item.id}</td>
                    <td className="border-collapse">
                      <div className="flex items-center">
                        <Image
                          src="https://avatars.githubusercontent.com/u/93562736?v=4"
                          alt={'username'}
                          width={36}
                          height={36}
                          priority
                          className="mr-2 rounded-full align-middle"
                        />
                        <p>{item.name}</p>
                      </div>
                    </td>
                    <td className="border-collapse p-4">{item.city}</td>
                    <td className="border-collapse p-4">17 Dec, 2022</td>
                    <td className="border-collapse p-4">
                      <p>{item.status}</p>
                    </td>
                    <td className="border-collapse p-4">{item.amount}</td>
                    <td className="border-collapse p-4">
                      <div className="flex items-center justify-center">
                        <button className="cursor-pointer  rounded-lg hover:bg-primary_hover">
                          <FileEdit />
                        </button>
                        <button className="cursor-pointer  rounded-lg hover:bg-primary_hover">
                          <Trash />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}

            {isError && <p className="text-red-600">Error ao obter os dados</p>}
            {isLoading && <p className="text-green-600">Carregando...</p>}
          </tbody>
        </table>
      </section>
      <div className="flex justify-end gap-4 px-4 py-3">
        <select
          className="cursor-pointer rounded-lg border-none outline-none"
          onChange={(e) => setItensPerPage(Number(e.target.value))}
        >
          <option>10</option>
          <option>20</option>
          <option>30</option>
        </select>
        <button
          className={`cursor-pointer rounded-lg ${
            page === 1 ? 'text-gray-300' : 'hover:bg-primary_hover'
          }`}
          onClick={() => {
            setPage(firstPage)
          }}
          disabled={page === 1}
        >
          <ArrowLeftToLine size={20} />
        </button>
        <button
          className={`cursor-pointer rounded-lg ${
            page === 1 ? 'text-gray-300' : 'hover:bg-primary_hover'
          }`}
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          <ArrowLeft size={20} />
        </button>

        {totalPages &&
          Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (item, key) => (
              <button
                onClick={() => setPage(item)}
                key={key}
                className={`cursor-pointer rounded-lg px-1 font-bold hover:bg-primary_hover ${
                  page === item && 'bg-primary_hover'
                }`}
              >
                {item}
              </button>
            ),
          )}

        <button
          className={`cursor-pointer rounded-lg ${
            page === lastPage ? 'text-gray-300' : 'hover:bg-primary_hover'
          }`}
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === lastPage}
        >
          <ArrowRight />
        </button>

        <button
          className={`cursor-pointer rounded-lg ${
            page === lastPage ? 'text-gray-300' : 'hover:bg-primary_hover'
          }`}
          onClick={() => setPage(lastPage)}
          disabled={page === lastPage}
        >
          <ArrowRightToLine size={20} />
        </button>
      </div>
    </main>
  )
}
