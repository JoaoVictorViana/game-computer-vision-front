'use client'

import { User } from '@/types/api'
import { FC, useEffect, useState } from 'react'
import { Camera } from '@/components/Core/Camera'
import { GameCam } from '@/components/Features/GameCam'
import Pacman from 'react-pacman'
import { useRouter } from 'next/navigation'
import { useAtom } from 'jotai'
import { userAtom } from '@/states/atoms/user'
import { useCamera } from '@/states/stories/Camera'
import { Button } from '@/components/Core/Button'

export const Game: FC<{ user: User }> = ({ user }) => {
  const [, setUser] = useAtom(userAtom)
  const [keyGame, setKeyGame] = useState(Math.random())
  const { setCameraConstrains, showCamera } = useCamera()
  const router = useRouter()

  const handleReset = () => {
    setKeyGame(Math.random())
  }

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    setUser(user)
  }, [user])

  useEffect(() => {
    setCameraConstrains({
      height: 300,
      width: 300,
      facingMode: 'user',
    })
    showCamera()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-primary-800">
      <div className="flex gap-10">
        <Pacman key={keyGame} />
        <Camera />
      </div>
      <Button onClick={handleReset}>Resetar</Button>
      <GameCam />
    </main>
  )
}
