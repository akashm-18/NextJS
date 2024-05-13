import getUser from "@/lib/getUser"
import getUserPosts from "@/lib/getUserPosts"
import { Suspense } from "react"
import UserPosts from "./components/UserPosts"
import { Metadata } from "next"


type Params = {
  params: {
    userId: string
  }
}

export async function generateMetadata({params : {userId}} : Params) : Promise<Metadata> {
  const userData : Promise<User> = getUser(userId)
  const user : User = await userData

  return {
    title : user.name,
    description : `This is the Page of Mr.${user.name}`
  }
}

export default async function UserPage({ params: { userId } }: Params) {
  const userData: Promise<User> = getUser(userId)
  const userPostsData: Promise<Post[]> = getUserPosts(userId)

  // We can do this Apporach . But this is not recommended in the NextJs Docs
  // const [user , userPosts] = await Promise.all([userData , userPostsData])

  // This Apporach is Recommeded in the NextJs Docs
  const user = await userData

  return (
    <>
    <h2>{user.name}</h2>
    <br />
    <Suspense fallback={<h2>Loading...</h2>}>
      <UserPosts promise = {userPostsData} />
    </Suspense>
    </>
  )
}
