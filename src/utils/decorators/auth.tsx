import { API_TOKEN } from '@/config/app'
import { userInfo } from '@/fetchers/auth/me'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { UserProvider } from './context'

export default async function AuthPage(component: () => JSX.Element) {
  const cookieStore = cookies()
  try {
    const { data: user } = await userInfo(
      cookieStore.get(API_TOKEN)?.value ?? ''
    )

    return <UserProvider user={user}>{component()}</UserProvider>
  } catch {
    redirect('/login')
  }
}
