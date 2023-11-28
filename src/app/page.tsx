import { Game } from '@/components/Features/Game'
import AuthPage from '@/utils/decorators/auth'

function Home() {
  return <Game />
}

export default async () => AuthPage(Home)
