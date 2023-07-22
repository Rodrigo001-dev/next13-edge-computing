import { revalidatePath } from 'next/cache'

import { db } from '@/db'
import { users } from '@/db/schema'

export default async function Home() {
  const allUsers = await db.select().from(users)

  async function addUser(data: FormData) {
    'use server'

    const fullName = data.get('full_name')?.toString()
    const phone = data.get('phone')?.toString()

    if (!fullName || !phone) {
      return
    }

    await db.insert(users).values({
      fullName,
      phone,
    })

    revalidatePath('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-950 text-zinc-50">
      <p>{JSON.stringify(allUsers, null, 2)}</p>
      <form action={addUser} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Full name"
          name="full_name"
          className="rounded-sm bg-zinc-800 px-5 py-2"
        />
        <input
          type="text"
          name="phone"
          placeholder="phone"
          className="rounded-sm bg-zinc-800 px-5 py-2"
        />

        <button type="submit">Create</button>
      </form>
    </div>
  )
}
