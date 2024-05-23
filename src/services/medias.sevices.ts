import { Request } from 'express'
import path from 'path'
import sharp from 'sharp'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import { getNameFromFullName, handleUploadImage, handleUploadVideo } from '~/utils/file'
import fs from 'fs'
import { isProduction } from '~/constants/config'
import { MediaType } from '~/constants/enum'
import { Media } from '~/models/Other'
class MediasService {
  async UploadImage(req: Request) {
    const files = await handleUploadImage(req)

    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newName = getNameFromFullName(file.newFilename)
        const newPath = path.resolve(UPLOAD_IMAGE_DIR, `${newName}.jpg`)

        sharp.cache(false)
        await sharp(file.filepath).jpeg().toFile(newPath)
        fs.unlinkSync(file.filepath)

        return {
          url: isProduction
            ? `${process.env.HOST}/static/image/${newName}`
            : `http://localhost:${process.env.PORT}/static/image/${newName}`,
          type: MediaType.Image
        }
      })
    )

    return result
  }

  async UploadVideo(req: Request) {
    const files = await handleUploadVideo(req)
    const result: Media[] = files.map((file) => {
      const { newFilename } = file
      return {
        url: isProduction
          ? `${process.env.HOST}/static/video/${newFilename}`
          : `http://localhost:${process.env.PORT}/static/video/${newFilename}`,
        type: MediaType.Video
      }
    })

    return result
    // const newName = getNameFromFullName(newFilename)
  }
}
export const mediasService = new MediasService()
