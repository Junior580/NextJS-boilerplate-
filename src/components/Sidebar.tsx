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
import { useState } from 'react'
import { capitalizeFirstLetter } from '@/lib/capitalizeFirstLetter'
import { useAuth } from '@/hooks/auth'

export default function Sidebar() {
  const router = useRouter()

  const { user } = useAuth()

  const [sidebar, toggleValue] = useToggle(true)

  const logout = async () => {
    localStorage.removeItem('@GoBarber:user')
    await api.post('/auth/logout').then(() => router.replace('/signin'))
  }

  return (
    <aside>
      <div
        className={`flex h-screen w-14 ${
          sidebar ? 'md:w-64' : 'md:w-14'
        } relative flex-col items-center  border-r-2 `}
      >
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
              <p className="font-bold text-primary">
                {capitalizeFirstLetter(user?.name)}
              </p>
              <p className="font-semibold text-primary">
                {capitalizeFirstLetter(user?.role)}
              </p>
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
          {user?.role === 'ADMIN' ||
            (user.role === 'USER' && (
              <Link href="/users">
                <div className="hover:text-primary_hover flex  py-1  text-primary duration-150 ease-in-out ">
                  <Users className="ml-4" />
                  {sidebar && (
                    <p className="ml-4 hidden shadow-2xl md:block">Users</p>
                  )}
                </div>
              </Link>
            ))}
          {/* {role === 'USER' && ( */}
          <Link href="/permissions">
            <div className="hover:text-primary_hover flex  py-1 text-primary duration-150 ease-in-out">
              <Unlock className="ml-4" />
              {sidebar && <p className="ml-4 hidden md:block">Permissions</p>}
            </div>
          </Link>
          {/* )} */}
          {/* {role === 'USER' && ( */}
          <Link href="">
            <div className="hover:text-primary_hover flex  py-1 text-primary duration-150 ease-in-out">
              <ClipboardCopy className="ml-4" />
              {sidebar && (
                <p className="ml-4 hidden md:block">Lista de produtos</p>
              )}
            </div>
          </Link>
          {/* )} */}
          {/* {role === 'USER' && ( */}
          <Link href="">
            <div className="hover:text-primary_hover flex  py-1 text-primary duration-150 ease-in-out">
              <ClipboardEdit className="ml-4" />
              {sidebar && (
                <p className="ml-4 hidden md:block">Lista de serviços</p>
              )}
            </div>
          </Link>
          {/* )} */}
        </ul>

        <button
          className="hover:text-primary_hover mb-8 text-primary duration-150 ease-in-out"
          onClick={logout}
        >
          <LogOut />

          {sidebar && <p className="mt-1 hidden md:block">Sair</p>}
        </button>
      </div>
    </aside>
  )
}
