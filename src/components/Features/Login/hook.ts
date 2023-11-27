'use client'

import { API_TOKEN, TIME_FOR_CAPTURE } from '@/config/app'
import { detectImageFace } from '@/fetchers/auth/images'
import { login } from '@/fetchers/auth/login'
import { userAtom } from '@/states/atoms/user'
import { useCamera } from '@/states/stories/Camera'
import { LoginCredentials } from '@/types/api'
import { setCookie } from 'cookies-next'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FieldValues } from 'react-hook-form'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

type ImageDetect = {
  image: string
}

export const useLogin = () => {
  const [userDetected, setUserDetected] = useState(false)
  const {
    showCamera,
    hideCamera,
    cameraRef,
    visible: cameraVisible,
  } = useCamera()
  const [user, setUser] = useAtom(userAtom)
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      login(credentials)
        .then((res) => res.data)
        .then((data) => {
          setCookie(API_TOKEN, data.access_token)
          setUser(data)
          showCamera()
        })
        .catch(() => hideCamera()),
  })

  const mutationDetectFace = useMutation<void, any, ImageDetect>({
    mutationFn: async (data) =>
      detectImageFace(data.image)
        .then((response) => response.data)
        .then((response) => {
          if (response.data !== user?.id) {
            setUserDetected(false)
            toast('Usuário não identificado', { autoClose: TIME_FOR_CAPTURE })
            return
          }

          setUserDetected(true)
          toast(`Bem vindo!`)
          router.push('/')
          hideCamera()
        })
        .catch(() => {
          setUserDetected(false)
          toast('Usuário não identificado', { autoClose: TIME_FOR_CAPTURE })
        }),
  })

  const handleSubmit = (credentials: FieldValues) => {
    mutation.mutateAsync(credentials as LoginCredentials)
  }

  const handleDetectFace = (image: string) => {
    mutationDetectFace.mutateAsync({ image })
  }

  useEffect(() => {
    if (!cameraVisible) return

    const interval = setInterval(() => {
      const image = cameraRef?.getScreenshot()

      if (!image || userDetected) return

      if (mutationDetectFace.isLoading) return

      handleDetectFace(image)
    }, TIME_FOR_CAPTURE)

    return () => clearInterval(interval)
  }, [cameraVisible, userDetected, cameraRef, mutationDetectFace])

  return {
    handleSubmit,
  }
}
