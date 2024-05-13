import type { Metadata } from 'next'
import getUsers from '@/lib/getUsers'
import Link from 'next/link'

export const metadata : Metadata = {
    title : "Users"
}

export default async function UsersPage() {
  const userData : Promise<User[]> = getUsers()

  const users = await userData
  console.log('Hello')

  const content = (
    <section>
      <h2>
        <Link href="/"> Back to  Home Page</Link>
      </h2>
      <br />
      {users.map((user) =>  {
        return (
          <>
          <p key={user.id}>
            <Link href={`/users/${user.id}`}>{user.name}</Link>
          </p>
          <br />
          </>
        )
      })}
    </section>
  )

  return content
}