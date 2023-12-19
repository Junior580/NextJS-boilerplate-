export default function Home() {
  return (
    <main className='bg-slate-400 h-screen flex items-stretch'>
      <div className='flex flex-col justify-center items-center w-full max-w-2xl'>
        <form className='bg-white flex flex-col justify-center items-center gap-2 p-2 rounded-lg w-80'>
          <h1>Faça seu logon</h1>

          <input
            placeholder='E-mail'
            className='bg-red-100 w-full rounded-lg text-slate-950 border-solid placeholder-slate-800 p-2'
          />

          <input
            placeholder='Password'
            className='bg-red-100 w-full rounded-lg text-slate-950 border-solid placeholder-slate-800 p-2'
          />

          <button className='bg-orange-500 h-14 rounded-lg w-full py-4 text-slate-700 hover:bg-orange-400 transition duration-300'>
            Entrar
          </button>
        </form>
      </div>
    </main>
  )
}
