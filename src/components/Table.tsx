import useToggle from '@/hooks/useToggle'
import { FileEdit, Trash } from 'lucide-react'
import { ComponentProps, useEffect, useMemo, useRef, useState } from 'react'
import Modal from './Modal'

type TableProps<T> = ComponentProps<'table'> & {
  data: T[]
  actions?: boolean
}

export default function Table<T extends Record<string, any>>({
  data,
  actions = false,
}: TableProps<T>) {
  const [modalOpen, toggleModalOpen] = useToggle(false)
  const [modalValue, setModalValue] = useState({ name: '', email: '' })

  // const dataTable = useMemo(() => data, [data])
  const [dataTable, setDataTable] = useState<any[]>([])

  let keys: string[] = []
  useEffect(() => {
    setDataTable(data)
    keys = Object.keys(data[0])
  }, [data])

  return (
    <>
      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          close={toggleModalOpen}
          user={{
            name: modalValue.name,
            email: modalValue.email,
          }}
        />
      )}
      {dataTable && (
        <section className="table-body mx-auto my-3 h-4/5 w-full overflow-auto rounded-xl  bg-t2">
          <table className=" w-full">
            <thead className="sticky left-0 top-0 border-collapse bg-secondary">
              <tr>
                {keys.map((key) => {
                  return (
                    <th
                      key={key}
                      className="sticky left-0 top-0 border-collapse bg-secondary p-4"
                    >
                      {key}
                    </th>
                  )
                })}
                {actions && (
                  <th className="sticky left-0 top-0 border-collapse bg-secondary p-4">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="h-full">
              {dataTable.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="max-h-full max-w-full flex-col items-center overflow-auto "
                  >
                    {keys.map((key) => {
                      return (
                        <td
                          key={key}
                          className="border-collapse whitespace-nowrap p-2"
                        >
                          {item[key]}
                        </td>
                      )
                    })}

                    {actions && (
                      <td className="flex items-center justify-center">
                        <button
                          className="cursor-pointer rounded-lg p-1 duration-150  ease-in-out hover:bg-primary_hover"
                          onClick={() => {
                            console.log(
                              `🚀 ~ actions modal ~ : ${JSON.stringify(item)}`,
                            )
                            setModalValue((prev) => ({
                              ...prev,
                              name: item.name,
                              email: item.email,
                            }))
                            toggleModalOpen()
                          }}
                        >
                          <FileEdit />
                        </button>
                        <button
                          className="cursor-pointer rounded-lg p-1 duration-150  ease-in-out hover:bg-primary_hover"
                          onClick={() => {}}
                        >
                          <Trash />
                        </button>
                      </td>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>
      )}
    </>
  )
}
