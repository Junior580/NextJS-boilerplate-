import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="supports-backdrop-blur:bg-white/95 sticky top-0  z-40 flex w-full flex-none justify-around bg-white p-2 backdrop-blur transition-colors duration-500 dark:border-slate-50/[0.06] dark:bg-slate-900/75 lg:z-50 lg:border-b lg:border-slate-900/10 ">
      <h1 className="text-lg text-sky-100">My App</h1>
      <ul className="flex gap-3">
        <li className="delay-50 text-sky-100 transition ease-in-out hover:text-sky-500">
          <Link href="/">Home</Link>
        </li>
        <li className="delay-50 text-sky-100 transition ease-in-out hover:text-sky-500">
          <a href="about">Sobre Nós</a>
        </li>
        <li className="delay-50 text-sky-100 transition ease-in-out hover:text-sky-500">
          <a href="services">Serviços</a>
        </li>
        <li className="delay-50 text-sky-100 transition ease-in-out hover:text-sky-500">
          <a href="contact">Contato</a>
        </li>
      </ul>
    </nav>
  )
}
