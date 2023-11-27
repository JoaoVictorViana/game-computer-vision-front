import { axiosIa } from '@/config/app'
import { Keyboard } from '@/types/app'
import { base64toBlob } from '@/utils/file'
import { AxiosResponse } from 'axios'

export type IAResponse<T = any> = {
  data: T
  message: string
}

export const uploadTrainKeyboardImages = (
  image: string,
  keyboard: Keyboard,
  userId: number
): Promise<AxiosResponse<IAResponse>> => {
  const formData = new FormData()

  formData.append(
    'image',
    base64toBlob(image),
    `image-${new Date().toISOString()}.jpg`
  )
  formData.append('userId', userId.toString())
  formData.append('keyboard', keyboard)

  return axiosIa.post('/upload/keyboard/train', formData, {
    headers: {
      accept: 'application/json',
      'Content-Type': `multipart/form-data`,
    },
  })
}

export const trainModel = (userId: number) =>
  axiosIa.post(
    '/model/keyboard/train',
    { userId },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

export const detectKeyboard = (
  image: string,
  userId: number
): Promise<IAResponse<Keyboard>> => {
  const formData = new FormData()

  formData.append(
    'image',
    base64toBlob(image),
    `image-${new Date().toISOString()}.jpg`
  )
  formData.append('userId', userId.toString())

  return axiosIa
    .post('/detect/keyboard', formData, {
      headers: {
        accept: 'application/json',
        'Content-Type': `multipart/form-data`,
      },
    })
    .then((res) => res.data)
}
