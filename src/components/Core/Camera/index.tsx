'use client'

import { useCamera } from '@/states/stories/Camera'
import { useEffect, useRef } from 'react'
import Webcam from 'react-webcam'

export const Camera = () => {
  const cameraRef = useRef<Webcam | null>(null)

  const { setCameraRef, cameraConstrains, visible } = useCamera()

  useEffect(() => setCameraRef(cameraRef.current), [cameraRef])

  return (
    <Webcam
      className={visible ? '' : 'hidden'}
      width={cameraConstrains.width?.toString() ?? 1280}
      height={cameraConstrains.height?.toString() ?? 720}
      ref={cameraRef}
      videoConstraints={cameraConstrains}
      screenshotFormat="image/jpeg"
    />
  )
}
