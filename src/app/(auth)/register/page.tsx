'use client'

import { RegisterForm } from '@/components/Features/Register'
import { useCamera } from '@/states/stories/Camera'
import { useEffect } from 'react'

export default function Register() {
  const { visible, setCameraConstrains } = useCamera()

  useEffect(
    () =>
      setCameraConstrains({
        height: 500,
        width: 400,
        facingMode: 'user',
      }),
    []
  )

  return (
    <section className="h-full w-full flex justify-center items-center flex-col gap-8">
      <h1 className="text-2xl font-bold">Register</h1>
      <RegisterForm />
      {visible && (
        <div>
          <span>Cadastro facial</span>
          <span>Não faça movimentos muito bruscos</span>
          <span>
            Olhar para frente e inclinar-se um pouco pode melhorar o cadastro
            facial
          </span>
        </div>
      )}
    </section>
  )
}
