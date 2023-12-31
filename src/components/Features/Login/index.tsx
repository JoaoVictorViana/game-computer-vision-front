'use client'

import { Button } from '@/components/Core/Button'
import { Form } from '@/components/Core/Form'
import { Input } from '@/components/Core/Form/Input'
import loginScheam from '@/schemas/login'
import { useCamera } from '@/states/stories/Camera'
import { useLogin } from './hook'

export const LoginForm = () => {
  const { visible: cameraVisible } = useCamera()
  const { handleSubmit } = useLogin()

  if (cameraVisible) return null

  return (
    <Form
      schema={loginScheam}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 items-center"
    >
      <Input
        label="E-mail"
        placeholder="Digite seu e-mail aqui..."
        name="email"
      />
      <Input
        label="Senha"
        placeholder="Digite sua senha aqui..."
        name="password"
        type="password"
      />

      <Button>Login</Button>
    </Form>
  )
}
