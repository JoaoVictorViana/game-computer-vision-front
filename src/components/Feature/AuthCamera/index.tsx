import { MAX_AUTH_UPLOAD_IMAGE, videoWebcamConstraints } from '@/config/app'
import {
  detectImageFace,
  trainModel,
  uploadTrainImages,
} from '@/fetchers/auth/images'
import { sleep } from '@/utils/app'
import { useEffect, useRef, useState } from 'react'
import { useMutation } from 'react-query'
import Webcam from 'react-webcam'

type ImageTest = {
  image: string
  imageId: number
  userId: number
}

export const AuthCamera = () => {
  const [images, setImages] = useState<Array<string | null>>([])
  const [userId, setUserId] = useState<number>(-1)
  const webCamRef = useRef<Webcam | null>(null)

  const mutationDetectFace = useMutation<void, any, Pick<ImageTest, 'image'>>({
    mutationFn: async (data) =>
      detectImageFace(data.image)
        .then((response) => response.data)
        .then((response) => {
          alert(`Usuário ${response.data} identificado`)
        })
        .catch(() => {
          alert(`Usuário não identificado`)
        }),
  })

  const mutationTrainModel = useMutation({
    mutationFn: trainModel,
  })

  const handleSendImagesForTrain = async () => {
    images.forEach(async (image, index) => {
      if (!image) return
      await uploadTrainImages(image, index, userId)
      await sleep(500)
    })
  }

  const handleResetImages = () => {
    setImages(() => [])

    const intervalScreenshot = setInterval(() => {
      setImages((prev) => {
        if (prev.length >= MAX_AUTH_UPLOAD_IMAGE) {
          clearInterval(intervalScreenshot)
          return prev
        }

        return [...prev, webCamRef.current?.getScreenshot() ?? null]
      })
    }, 500)
  }

  const handleTrainModel = () => mutationTrainModel.mutate()

  const handleDetectFace = () => {
    const image = webCamRef.current?.getScreenshot()

    if (!image) return

    mutationDetectFace.mutate({ image })
  }

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
      <div className="">
        <Webcam
          width={1280}
          height={720}
          ref={webCamRef}
          videoConstraints={videoWebcamConstraints}
          screenshotFormat="image/jpeg"
        />
      </div>

      <input
        name="userId"
        type="number"
        value={userId}
        onChange={(e) => setUserId(Number(e.target.value))}
      />
      <button
        className="border border-gray-800 p-3"
        onClick={handleResetImages}
      >
        Resetar
      </button>
      <button
        className="border border-gray-800 p-3 disabled:bg-gray-500"
        onClick={handleSendImagesForTrain}
        disabled={images.length < MAX_AUTH_UPLOAD_IMAGE}
      >
        Enviar
      </button>
      <button className="border border-gray-800 p-3" onClick={handleTrainModel}>
        Treinar
      </button>

      <button className="border border-gray-800 p-3" onClick={handleDetectFace}>
        Detectar
      </button>
    </section>
  )
}
