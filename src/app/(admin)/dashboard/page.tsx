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
  Menu,
} from 'lucide-react'
import Sidebar from '@/components/Sidebar'

export default function Dashboard() {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)
  return (
    <div className="flex flex-row bg-white">
      <Sidebar />

      <h1>Dashboard</h1>
    </div>
  )
}
