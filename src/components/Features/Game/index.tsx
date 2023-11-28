'use client'

import { FC, useEffect, useState } from 'react'
import { Camera } from '@/components/Core/Camera'
import { GameCam } from '@/components/Features/GameCam'
import { useCamera } from '@/states/stories/Camera'
import { Button } from '@/components/Core/Button'
import Snake from 'react-simple-snake'

export const Game: FC = () => {
  const [keyGame, setKeyGame] = useState(Math.random())
  const { setCameraConstrains, showCamera } = useCamera()

  const handleReset = () => {
    setKeyGame(Math.random())
  }

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
        <div className="w-[800px]">
          <Snake percentageWidth={60} startSnakeSize={6} key={keyGame} />
        </div>
        <Camera />
      </div>
      <Button onClick={handleReset}>Resetar</Button>
      <GameCam />
    </main>
  )
}
