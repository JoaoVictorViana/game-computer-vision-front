import axios from 'axios'
import { getCookie, hasCookie } from 'cookies-next'

export const MAX_AUTH_UPLOAD_IMAGE = Number(
  process.env.NEXT_PUBLIC_MAX_AUTH_UPLOAD_IMAGE ?? 30
)

export const TIME_FOR_CAPTURE = Number(
  process.env.NEXT_PUBLIC_TIME_FOR_CAPTURE ?? 500
)

export const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN ?? ''

export const videoWebcamConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
}

export const axiosIa = axios.create({
  baseURL: 'http://gamevision.loc/ia-service',
})

export const axiosApi = axios.create({
  baseURL: 'http://gamevision.loc/api',
  headers: {
    Accept: 'application/json',
  },
})

axiosApi.interceptors.request.use((config) => {
  if (config.url?.includes('login')) return config

  if (!hasCookie(API_TOKEN)) return config

  config.headers.set('Authorization', `bearer ${getCookie(API_TOKEN)}`)

  return config
})
