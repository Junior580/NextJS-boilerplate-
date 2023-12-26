'use client'

import {
  ClipboardCopy,
  CircleDollarSign,
  Clock4,
  ClipboardEdit,
  LogOut,
  ArrowRight,
  ArrowLeft,
  Users,
  Unlock,
} from 'lucide-react'
import useToggle from '@/hooks/useToggle'
import api from '@/services/api'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function Sidebar() {
  const router = useRouter()

  const [sidebar, toggleValue] = useToggle(true)

  const logout = async () => {
    await api.post('/auth/logout').then(() => router.replace('/signin'))
  }

  return (
    <aside>
      <div
        className={`flex h-screen w-14 ${
          sidebar ? 'md:w-64' : 'md:w-14'
        } relative flex-col items-center  border-r-2 border-gray-400 bg-green-100`}
      >
        {/* <h1 className="mt-4 flex flex-col items-center gap-1 text-xl font-bold text-green-500">
        <LockKeyhole size={30} />
        {sidebar && <p className="hidden md:block">Painel Admin</p>}
      </h1> */}

        <section className="mt-4 hidden flex-col items-center justify-center md:flex ">
          {sidebar && (
            <>
              <Image
                src="https://avatars.githubusercontent.com/u/93562736?v=4"
                alt={'username'}
                width={100}
                height={100}
                priority
                className="hidden rounded-full border-2 border-primary md:block"
              />
              <p className="font-bold text-primary">user name</p>
              <p className="font-semibold text-primary">position</p>
            </>
          )}
        </section>

        <button onClick={toggleValue} className="hidden md:block">
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
          <Link href="/users">
            <div className="flex py-1  text-primary  duration-150 ease-in-out hover:text-primary_hover ">
              <Users className="ml-4" />
              {sidebar && (
                <p className="ml-4 hidden shadow-2xl md:block">Users</p>
              )}
            </div>
          </Link>
          <Link href="/permissions">
            <div className="flex py-1  text-primary duration-150 ease-in-out hover:text-primary_hover">
              <Unlock className="ml-4" />
              {sidebar && <p className="ml-4 hidden md:block">Permissions</p>}
            </div>
          </Link>
          <Link href="">
            <div className="flex py-1  text-primary duration-150 ease-in-out hover:text-primary_hover">
              <ClipboardCopy className="ml-4" />
              {sidebar && (
                <p className="ml-4 hidden md:block">Lista de produtos</p>
              )}
            </div>
          </Link>
          <Link href="">
            <div className="flex py-1   text-green-600 duration-150 ease-in-out hover:text-green-400">
              <ClipboardEdit className="ml-4" />
              {sidebar && (
                <p className="ml-4 hidden md:block">Lista de serviços</p>
              )}
            </div>
          </Link>
        </ul>

        <button
          className="mb-8 text-primary duration-150 ease-in-out hover:text-primary_hover"
          onClick={logout}
        >
          <LogOut />

          {sidebar && <p className="mt-1 hidden md:block">Sair</p>}
        </button>
      </div>
    </aside>
  )
}
