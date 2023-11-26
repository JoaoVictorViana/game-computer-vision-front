'use client'

import { MAX_AUTH_UPLOAD_IMAGE, TIME_FOR_CAPTURE } from '@/config/app'
import { trainModel, uploadTrainImages } from '@/fetchers/auth/images'
import { register } from '@/fetchers/auth/register'
import { userAtom } from '@/states/atoms/user'
import { useCamera } from '@/states/stories/Camera'
import { LoginCredentials } from '@/types/api'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FieldValues } from 'react-hook-form'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

type ImageDetect = {
  image: string
}

export const useRegister = () => {
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
  const [user, setUser] = useAtom(userAtom)

  const mutation = useMutation({
    mutationFn: (credentials: LoginCredentials & { name: string }) =>
      register(credentials)
        .then((res) => {
          setUser(res.data)
          showCamera()
        })
        .catch(() => hideCamera()),
  })

  const mutationUploadImages = useMutation<void, any, ImageDetect>({
    mutationFn: async (data) => {
      if (!user?.id) return

      uploadTrainImages(data.image, user.id)
    },
  })

  const handleSubmit = (credentials: FieldValues) => {
    mutation.mutateAsync(credentials as LoginCredentials & { name: string })
  }

  const handleUploadImages = async () => {
    try {
      await Promise.all(
        images.map(async (image) => mutationUploadImages.mutateAsync({ image }))
      )
      await trainModel()
      toast('Imagens cadastradas com sucesso!')
      setUser(null)
      router.push('/login')
    } catch {
      toast('Imagens com problemas! Tentando novamente!')
      resetImages()
    }
  }

  useEffect(() => {
    if (!cameraVisible) return

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
  }, [cameraVisible, cameraRef, images])

  useEffect(() => {
    if (images.length < MAX_AUTH_UPLOAD_IMAGE) return

    handleUploadImages()
  }, [images])

  return {
    handleSubmit,
  }
}
