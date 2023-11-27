import { axiosApi } from '@/config/app'
import { ApiResource, User } from '@/types/api'

export const userInfo = (token: string): Promise<ApiResource<User>> =>
  axiosApi
    .get('/auth/me', {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .then((res) => res.data)
