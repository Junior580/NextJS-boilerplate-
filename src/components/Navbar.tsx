import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className='flex justify-around p-2  sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75 '>
      <h1 className='text-lg text-sky-100'>My App</h1>
      <ul className='flex gap-3'>
        <li className='transition ease-in-out delay-50 text-sky-100 hover:text-sky-500'>
          <Link href='/'>Home</Link>
        </li>
        <li className='transition ease-in-out delay-50 text-sky-100 hover:text-sky-500'>
          <a href='about'>Sobre Nós</a>
        </li>
        <li className='transition ease-in-out delay-50 text-sky-100 hover:text-sky-500'>
          <a href='services'>Serviços</a>
        </li>
        <li className='transition ease-in-out delay-50 text-sky-100 hover:text-sky-500'>
          <a href='contact'>Contato</a>
        </li>
      </ul>
    </nav>
  )
}
