export const MAX_AUTH_UPLOAD_IMAGE = Number(
  process.env.MAX_AUTH_UPLOAD_IMAGE ?? 30
)

export const videoWebcamConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
}
