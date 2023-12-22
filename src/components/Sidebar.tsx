'use client'

import { useState } from 'react'
import {
  ClipboardCopy,
  CircleDollarSign,
  Clock4,
  ClipboardEdit,
  LogOut,
} from 'lucide-react'

export default function Sidebar() {
  const [sidebar, setSidebar] = useState(true)

  const showSidebar = () => setSidebar(!sidebar)

  return (
    <>
      <aside
        className={`flex h-screen ${
          sidebar ? 'w-64' : 'w-14'
        } flex-col items-center gap-8 border-r-2 border-gray-400 bg-green-100`}
      >
        <button onClick={showSidebar}>
          <h1 className="mt-4 text-xl font-bold text-green-500">
            Painel Admin
          </h1>
        </button>
        <ul className="flex w-full flex-1 flex-col items-start gap-2">
          <a href="">
            <div className="flex py-1   text-green-600 duration-150 ease-in-out hover:text-green-400">
              <Clock4 className="ml-4" />
              {sidebar && <p className="ml-4">Clock Time</p>}
            </div>
          </a>
          <a href="">
            <div className="flex py-1   text-green-600 duration-150 ease-in-out hover:text-green-400">
              <CircleDollarSign className="ml-4" />
              {sidebar && <p className="ml-4">Tarefas</p>}
            </div>
          </a>
          <a href="">
            <div className="flex py-1   text-green-600 duration-150 ease-in-out hover:text-green-400">
              <ClipboardCopy className="ml-4" />
              {sidebar && <p className="ml-4">Lista de produtos</p>}
            </div>
          </a>
          <a href="">
            <div className="flex py-1   text-green-600 duration-150 ease-in-out hover:text-green-400">
              <ClipboardEdit className="ml-4" />
              {sidebar && <p className="ml-4">Lista de serviços</p>}
            </div>
          </a>
        </ul>
        <button
          className="mb-8 text-green-600 duration-150 ease-in-out hover:text-green-400"
          onClick={() => {}}
        >
          <LogOut />
        </button>
      </aside>
    </>
  )
}
