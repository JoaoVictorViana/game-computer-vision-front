import { userInfo } from '@/fetchers/auth/me'
import { Game } from '@/components/Features/Game'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { API_TOKEN } from '@/config/app'

export default async function Home() {
  try {
    const cookieStore = cookies()
    const { data: user } = await userInfo(
      cookieStore.get(API_TOKEN)?.value ?? ''
    )
    return <Game user={user} />
  } catch {
    redirect('/login')
  }
}
