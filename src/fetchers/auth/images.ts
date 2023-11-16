import { axiosIa } from '@/config/app'
import { base64toBlob } from '@/utils/file'
import { AxiosResponse } from 'axios'

export type IAResponse = {
  data: any
  message: string
}

export const uploadTrainImages = (
  image: string,
  imageId: number,
  userId: number
): Promise<AxiosResponse<IAResponse>> => {
  const formData = new FormData()

  formData.append(
    'image',
    base64toBlob(image),
    `image-${new Date().toISOString()}.jpg`
  )
  formData.append('imageId', imageId.toString())
  formData.append('userId', userId.toString())

  return axiosIa.post('/upload/train', formData, {
    headers: {
      accept: 'application/json',
      'Content-Type': `multipart/form-data`,
    },
  })
}

export const trainModel = () => axiosIa.post('/model/train')

export const detectImageFace = (
  image: string
): Promise<AxiosResponse<IAResponse>> => {
  const formData = new FormData()

  formData.append(
    'image',
    base64toBlob(image),
    `image-${new Date().toISOString()}.jpg`
  )

  return axiosIa.post('/detect', formData, {
    headers: {
      accept: 'application/json',
      'Content-Type': `multipart/form-data`,
    },
  })
}
