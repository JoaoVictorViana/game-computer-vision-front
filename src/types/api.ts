export type LoginCredentials = {
  email: string
  password: string
  [key: string]: any
}

export type User = {
  id: number
  name: string
  email: string
  access_token: string
}

export type ApiResource<T = any> = {
  data: T
}
