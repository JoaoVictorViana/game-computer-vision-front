import { axiosIa } from '@/config/app'
import { base64toBlob } from '@/utils/file'
import { AxiosResponse } from 'axios'

export type IAResponse = {
  data: any
  message: string
}

export const uploadTrainImages = (
  image: string,
  userId: number
): Promise<AxiosResponse<IAResponse>> => {
  const formData = new FormData()

  formData.append(
    'image',
    base64toBlob(image),
    `image-${new Date().toISOString()}.jpg`
  )
  formData.append('userId', userId.toString())

  return axiosIa.post('/upload/face/train', formData, {
    headers: {
      accept: 'application/json',
      'Content-Type': `multipart/form-data`,
    },
  })
}

export const trainModel = () => axiosIa.post('/model/face/train')

export const detectImageFace = (
  image: string
): Promise<AxiosResponse<IAResponse>> => {
  const formData = new FormData()

  formData.append(
    'image',
    base64toBlob(image),
    `image-${new Date().toISOString()}.jpg`
  )

  return axiosIa.post('/detect/face', formData, {
    headers: {
      accept: 'application/json',
      'Content-Type': `multipart/form-data`,
    },
  })
}
