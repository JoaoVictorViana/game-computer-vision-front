'use client'

import { MAX_AUTH_UPLOAD_IMAGE, TIME_FOR_CAPTURE } from '@/config/app'
import {
  trainModel,
  uploadTrainKeyboardImages,
} from '@/fetchers/game/keyboards'
import { userAtom } from '@/states/atoms/user'
import { useCamera } from '@/states/stories/Camera'
import { Keyboard } from '@/types/app'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

type ImageDetect = {
  image: string
}

export const useKeyboardMapping = () => {
  const {
    images,
    showCamera,
    hideCamera,
    cameraRef,
    visible: cameraVisible,
    addImage,
    resetImages,
  } = useCamera()
  const router = useRouter()
  const [user] = useAtom(userAtom)
  const [keyboad, setKeyboard] = useState<Keyboard | ''>('')
  const [keyboadMappeds, setKeyboardMappeds] = useState<
    Record<Keyboard, boolean>
  >({
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
  })

  const mutationUploadImages = useMutation<void, any, ImageDetect>({
    mutationFn: async (data) => {
      if (!user?.id) return

      if (!keyboad) return

      uploadTrainKeyboardImages(data.image, keyboad, user.id)
    },
  })

  const handleUploadImages = async () => {
    try {
      await Promise.all(
        images.map(async (image) => mutationUploadImages.mutateAsync({ image }))
      )
      toast('Imagens cadastradas com sucesso!')
      setKeyboardMappeds((prev) => ({ ...prev, [keyboad]: true }))
    } catch {
      toast('Imagens com problemas! Tentando novamente!')
    } finally {
      resetImages()
      hideCamera()
    }
  }

  const handleChoiceKeyboard = (choiced: Keyboard) => {
    setKeyboard((prev) => (prev === choiced ? '' : choiced))
    showCamera()
  }

  const handleTrainModel = async () => {
    if (!user?.id) return

    await trainModel(user.id)
    router.push('/login')
  }

  useEffect(() => {
    if (!cameraVisible) return
    if (!keyboad) return

    const interval = setInterval(() => {
      const image = cameraRef?.getScreenshot()

      if (!image) return

      if (images.length >= MAX_AUTH_UPLOAD_IMAGE) {
        clearInterval(interval)
        return
      }

      addImage(image)
    }, TIME_FOR_CAPTURE)

    return () => clearInterval(interval)
  }, [cameraVisible, cameraRef, images, keyboad])

  useEffect(() => {
    if (images.length < MAX_AUTH_UPLOAD_IMAGE) return

    handleUploadImages()
  }, [images])

  useEffect(() => {
    const allKeyboardMappeds = Object.values(keyboadMappeds).every(
      (mapped) => mapped
    )

    if (!allKeyboardMappeds) return

    if (!user?.id) return

    handleTrainModel()
  }, [keyboadMappeds, user])

  return {
    handleChoiceKeyboard,
    keyboad,
    keyboadMappeds,
  }
}
