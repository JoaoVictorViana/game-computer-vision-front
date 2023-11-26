import { axiosApi } from '@/config/app'
import { ApiResource, LoginCredentials, User } from '@/types/api'

export const login = (
  $credentials: LoginCredentials
): Promise<ApiResource<User>> =>
  axiosApi.post('/auth/login', $credentials).then((res) => res.data)
