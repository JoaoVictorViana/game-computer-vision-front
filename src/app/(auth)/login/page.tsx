import { LoginForm } from '@/components/Features/Login'

export default function Login() {
  return (
    <section className="h-full w-full flex justify-center items-center flex-col gap-8">
      <h1 className="text-2xl font-bold">Login</h1>
      <LoginForm />
    </section>
  )
}
