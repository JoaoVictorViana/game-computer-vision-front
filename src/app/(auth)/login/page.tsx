'use client'

import { LoginForm } from '@/components/Features/Login'
import { useCamera } from '@/states/stories/Camera'
import { useEffect } from 'react'

export default function Login() {
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
      <h1 className="text-2xl font-bold">Login</h1>
      <LoginForm />
      {visible && <span>Aguardando reconhecimento facial ...</span>}
    </section>
  )
}
