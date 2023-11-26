'use client'

import { LoginForm } from '@/components/Features/Login'
import { useCamera } from '@/states/stories/Camera'

export default function Login() {
  const { visible } = useCamera()

  return (
    <section className="h-full w-full flex justify-center items-center flex-col gap-8">
      <h1 className="text-2xl font-bold">Login</h1>
      <LoginForm />
      {visible && <span>Aguardando reconhecimento facial ...</span>}
    </section>
  )
}
