'use client'

import Button from '@/components/Button'

export default function Dashboard() {
  return (
    <main className="flex flex-col gap-4 rounded-md bg-white p-5 ">
      <h1 className="font-bold">Users:</h1>

      <table className="w-full overflow-x-auto rounded-md">
        <thead>
          <tr className="bg-green-200">
            <th className="border-2 border-black text-center">Name</th>
            <th className="border-2 border-black text-center">E-mail</th>
            <th className="border-2 border-black text-center">Company</th>
            <th className="border-2 border-black text-center">Position</th>
            <th className="border-2 border-black text-center">Country</th>
            <th className="border-2 border-black text-center">Permissions</th>
            <th className="border-2 border-black text-center">Admin</th>
          </tr>
        </thead>

        <tbody className=" bg-green-100">
          <tr>
            <td className="border-2 border-black px-20 text-center">user2</td>
            <td className=" border-2 border-black px-10 text-center">
              user2@email.com
            </td>
            <td className=" border-2 border-black px-10 text-center">
              Company2
            </td>
            <td className=" border-2 border-black px-10 text-center">
              Engenier
            </td>
            <td className=" border-2 border-black px-10 text-center">Bostil</td>
            <td className=" border-2 border-black text-center">Admin</td>
            <td className=" border-2 border-black text-center">Sim</td>
          </tr>
          <tr>
            <td className=" border-2 border-black px-10 text-center">user3</td>
            <td className=" border-2 border-black px-10 text-center">
              user3@email.com
            </td>
            <td className=" border-2 border-black px-10 text-center">
              Company1
            </td>
            <td className=" border-2 border-black px-10 text-center">
              Engenier
            </td>
            <td className=" border-2 border-black px-10 text-center">Bostil</td>
            <td className=" border-2 border-black text-center">Admin</td>
            <td className=" border-2 border-black text-center">Sim</td>
          </tr>
          <tr>
            <td className=" border-2 border-black px-10 text-center">user4</td>
            <td className=" border-2 border-black px-10 text-center">
              user4@email.com
            </td>
            <td className=" border-2 border-black px-10 text-center">
              Company1
            </td>
            <td className=" border-2 border-black px-10 text-center">
              Engenier
            </td>
            <td className=" border-2 border-black px-10 text-center">Bostil</td>
            <td className=" border-2 border-black text-center">Admin</td>
            <td className=" border-2 border-black text-center">Sim</td>
          </tr>
          <tr>
            <td className=" border-2 border-black px-10 text-center">user5</td>
            <td className=" border-2 border-black px-10 text-center">
              user5@email.com
            </td>
            <td className=" border-2 border-black text-center">Company1</td>
            <td className=" border-2 border-black text-center">Engenier</td>
            <td className=" border-2 border-black text-center">Bostil</td>
            <td className=" border-2 border-black text-center">Admin</td>
            <td className=" border-2 border-black text-center">Sim</td>
          </tr>
          <tr>
            <td className=" border-2 border-black text-center">user6</td>
            <td className=" border-2 border-black text-center">
              user6@email.com
            </td>
            <td className=" border-2 border-black text-center">Company1</td>
            <td className=" border-2 border-black text-center">Engenier</td>
            <td className=" border-2 border-black text-center">Bostil</td>
            <td className=" border-2 border-black text-center">Admin</td>
            <td className=" border-2 border-black text-center">Sim</td>
          </tr>
        </tbody>
      </table>

      <div className="flex  w-48 gap-4 self-end">
        <Button name="Voltar" secondary />

        <Button name="Criar" />
      </div>
    </main>
  )
}
