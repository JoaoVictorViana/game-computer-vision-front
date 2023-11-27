'use client'

import { KeyboardCam } from '@/components/Features/KeyboardCam'
import { useCamera } from '@/states/stories/Camera'
import { useEffect } from 'react'

export default function KeyboardMapping() {
  const { setCameraConstrains } = useCamera()

  useEffect(
    () =>
      setCameraConstrains({
        height: 300,
        width: 300,
        facingMode: 'user',
      }),
    []
  )

  return (
    <section className="h-full w-full flex justify-center items-center flex-col gap-8">
      <h1 className="text-2xl font-bold">Keyboard Mapping</h1>
      <KeyboardCam />
    </section>
  )
}
