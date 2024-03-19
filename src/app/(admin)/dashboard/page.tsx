'use client'

export default function Dashboard() {
  const data = [
    { name: 'user1', email: 'user1@email.com' },
    { name: 'user2', email: 'user2@email.com' },
    { name: 'user3', email: 'user3@email.com' },
    { name: 'user4', email: 'user4@email.com' },
    { name: 'user5', email: 'user5@email.com' },
    { name: 'user6', email: 'user6@email.com' },
    { name: 'user7', email: 'user7@email.com' },
    { name: 'user8', email: 'user8@email.com' },
    { name: 'user9', email: 'user9@email.com' },
  ]

  return (
    <main className="flex flex-col gap-4 rounded-md p-5 ">
      <h1 className="font-bold">Dashboard:</h1>
    </main>
  )
}
