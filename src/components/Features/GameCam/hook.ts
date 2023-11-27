'use client'

import { TIME_FOR_CAPTURE } from '@/config/app'
import { detectKeyboard } from '@/fetchers/game/keyboards'
import { userAtom } from '@/states/atoms/user'
import { useCamera } from '@/states/stories/Camera'
import { Keyboard } from '@/types/app'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'

type ImageDetect = {
  image: string
}

const keyboardMapping: Record<Keyboard, number> = {
  ArrowDown: 40,
  ArrowUp: 38,
  ArrowRight: 39,
  ArrowLeft: 37,
}

export const useGameCam = () => {
  const { cameraRef, visible: cameraVisible } = useCamera()
  const [keyboad, setKeyboard] = useState<Keyboard | ''>('')
  const [user] = useAtom(userAtom)

  const mutationDetectKeyboard = useMutation<void, any, ImageDetect>({
    mutationFn: async (data) => {
      if (!user?.id) return

      detectKeyboard(data.image, user.id).then((res) => {
        setKeyboard(res.data)
        window.dispatchEvent(
          new KeyboardEvent('keydown', { keyCode: keyboardMapping[res.data] })
        )
      })
    },
  })

  useEffect(() => {
    if (!cameraVisible) return

    const interval = setInterval(() => {
      const image = cameraRef?.getScreenshot()

      if (!image) return

      mutationDetectKeyboard.mutate({ image })
    }, TIME_FOR_CAPTURE)

    return () => clearInterval(interval)
  }, [cameraVisible, cameraRef])

  return {
    keyboad,
  }
}
