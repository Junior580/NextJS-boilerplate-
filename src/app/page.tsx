import Button from '@/components/Button'
import Input from '@/components/Input'

export default function Home() {
  return (
    <main className='bg-slate-400 h-screen flex items-stretch'>
      <div className='flex flex-col justify-center items-center w-full max-w-2xl'>
        <form className='bg-white flex flex-col justify-center items-center gap-2 p-2 rounded-lg w-80'>
          <h1>Faça seu logon</h1>

          <Input placeholder='E-mail' />

          <Input type='password' placeholder='Senha' />

          <Button />
        </form>
      </div>
    </main>
  )
}
