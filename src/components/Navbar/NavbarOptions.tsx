import Link from 'next/link'

export default function NavbarOptions() {
  return (
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
  )
}
