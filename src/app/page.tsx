'use client'

import { AuthCamera } from '@/components/Feature/AuthCamera'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthCamera />
    </main>
  )
}
