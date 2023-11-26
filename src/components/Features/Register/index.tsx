'use client'

import { Button } from '@/components/Core/Button'
import { Form } from '@/components/Core/Form'
import { Input } from '@/components/Core/Form/Input'
import registerScheam from '@/schemas/register'
import { useCamera } from '@/states/stories/Camera'
import { useRegister } from './hook'

export const RegisterForm = () => {
  const { visible: cameraVisible } = useCamera()
  const { handleSubmit } = useRegister()

  if (cameraVisible) return null

  return (
    <Form
      schema={registerScheam}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 items-center"
    >
      <Input label="Nome" placeholder="Digite seu nome aqui..." name="name" />
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

      <Button>Register</Button>
    </Form>
  )
}
