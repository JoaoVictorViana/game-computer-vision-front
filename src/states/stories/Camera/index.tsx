'use client'

import Webcam from 'react-webcam'
import { create } from 'zustand'

type CameraStory = {
  images: Array<string | null>
  visible: boolean
  cameraConstrains: MediaTrackConstraints
  cameraRef: Webcam | null
  showCamera: () => void
  hideCamera: () => void
  setCameraRef: (ref: Webcam | null) => void
  setCameraConstrains: (config: MediaTrackConstraints) => void
  addImage: (image: string) => void
  removeImage: (index: number) => void
}

export const useCamera = create<CameraStory>((set) => ({
  images: [],
  cameraConstrains: {
    width: 1280,
    height: 720,
    facingMode: 'user',
  },
  cameraRef: null,
  visible: false,
  setCameraRef: (ref: Webcam | null) =>
    set((prev) => ({ ...prev, cameraRef: ref })),
  setCameraConstrains: (config: MediaTrackConstraints) =>
    set((prev) => ({ ...prev, cameraConstrains: config })),
  addImage: (image: string) =>
    set((prev) => ({
      ...prev,
      images: [...prev.images, image],
    })),
  removeImage: (index: number) =>
    set((prev) => ({
      ...prev,
      images: [...prev.images.slice(0, index), ...prev.images.slice(index + 1)],
    })),
  showCamera: () => set((prev) => ({ ...prev, visible: true })),
  hideCamera: () => set((prev) => ({ ...prev, visible: false })),
}))
