import { MAX_AUTH_UPLOAD_IMAGE, videoWebcamConstraints } from '@/config/app'
import { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'

export const AuthCamera = () => {
  const [images, setImages] = useState<Array<string | null>>([])
  const [userId, setUserId] = useState<number>(-1)
  const webCamRef = useRef<Webcam | null>(null)

  useEffect((): any => {
    if (!webCamRef.current) return null

    const intervalScreenshot = setInterval(() => {
      setImages((prev) => {
        if (prev.length >= MAX_AUTH_UPLOAD_IMAGE) {
          clearInterval(intervalScreenshot)
          return prev
        }

        return [...prev, webCamRef.current?.getScreenshot() ?? null]
      })
    }, 500)

    return () => {
      clearInterval(intervalScreenshot)
    }
  }, [webCamRef.current])

  useEffect(() => {
    if (images.length < MAX_AUTH_UPLOAD_IMAGE) return

    alert('Imagens selecionadas')
  }, [images])

  return (
    <section className="">
      <div className="w-[500px] h-[500px]">
        <Webcam
          width={500}
          height={500}
          ref={webCamRef}
          videoConstraints={videoWebcamConstraints}
        />
      </div>

      <input
        name="userId"
        type="number"
        value={userId}
        onChange={(e) => setUserId(Number(e.target.value))}
      />
      <button className="border border-gray-800 p-3">Enviar</button>
      <button className="border border-gray-800 p-3">Treinar</button>

      <button className="border border-gray-800 p-3">Detectar</button>
    </section>
  )
}
