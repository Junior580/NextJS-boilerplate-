'use client'

import { useState } from 'react'
import {
  ClipboardCopy,
  CircleDollarSign,
  Clock4,
  ClipboardEdit,
  LogOut,
  LockKeyhole,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react'

export default function Sidebar() {
  const [sidebar, setSidebar] = useState(true)

  const showSidebar = () => setSidebar(!sidebar)

  return (
    <aside
      className={`flex h-screen w-14 ${
        sidebar ? 'md:w-64' : 'md:w-14'
      } relative flex-col items-center  border-r-2 border-gray-400 bg-green-100`}
    >
      <h1 className="mt-4 flex flex-col items-center gap-1 text-xl font-bold text-green-500">
        <LockKeyhole size={30} />
        {sidebar && <p className="hidden md:block">Painel Admin</p>}
      </h1>

      <button onClick={showSidebar} className="hidden md:block">
        {sidebar ? (
          <ArrowLeft
            className="absolute -right-2 top-16 rounded-full border-2 border-solid border-gray-400 bg-white"
            size={15}
          />
        ) : (
          <ArrowRight
            className="absolute -right-2 top-16 rounded-full border-2 border-solid border-gray-400 bg-white"
            size={15}
          />
        )}
      </button>

      <ul className=" mt-8 flex w-full flex-1 flex-col items-start gap-2">
        <a href="">
          <div className="text-primary hover:text-primary_hover  flex  py-1 duration-150 ease-in-out ">
            <Clock4 className="ml-4" />
            {sidebar && (
              <p className="ml-4 hidden shadow-2xl md:block">Clock Time</p>
            )}
          </div>
        </a>
        <a href="">
          <div className="text-primary hover:text-primary_hover  flex py-1 duration-150 ease-in-out">
            <CircleDollarSign className="ml-4" />
            {sidebar && <p className="ml-4 hidden md:block">Tarefas</p>}
          </div>
        </a>
        <a href="">
          <div className="text-primary hover:text-primary_hover  flex py-1 duration-150 ease-in-out">
            <ClipboardCopy className="ml-4" />
            {sidebar && (
              <p className="ml-4 hidden md:block">Lista de produtos</p>
            )}
          </div>
        </a>
        <a href="">
          <div className="flex py-1   text-green-600 duration-150 ease-in-out hover:text-green-400">
            <ClipboardEdit className="ml-4" />
            {sidebar && (
              <p className="ml-4 hidden md:block">Lista de serviços</p>
            )}
          </div>
        </a>
      </ul>
      <button
        className="text-primary hover:text-primary_hover mb-8 duration-150 ease-in-out"
        onClick={() => {}}
      >
        <LogOut />

        {sidebar && <p className="mt-1 hidden md:block">Sair</p>}
      </button>
    </aside>
  )
}
