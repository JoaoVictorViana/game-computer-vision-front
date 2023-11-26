import { axiosApi } from '@/config/app'
import { ApiResource, LoginCredentials, User } from '@/types/api'

export const register = (
  $credentials: LoginCredentials
): Promise<ApiResource<User>> =>
  axiosApi.post('/auth/register', $credentials).then((res) => res.data)
