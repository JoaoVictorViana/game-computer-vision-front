import { API_TOKEN } from '@/config/app'
import { login } from '@/fetchers/auth/login'
import { LoginCredentials } from '@/types/api'
import { setCookie } from 'cookies-next'
import { FieldValues } from 'react-hook-form'
import { useMutation } from 'react-query'

export function useLogin() {
  const mutation = useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      login(credentials)
        .then((res) => res.data)
        .then((data) => setCookie(API_TOKEN, data.access_token)),
  })

  const handleSubmit = (credentials: FieldValues) => {
    mutation.mutate(credentials as LoginCredentials)
  }

  return {
    handleSubmit,
  }
}
