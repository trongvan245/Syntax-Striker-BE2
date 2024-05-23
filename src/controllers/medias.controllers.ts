import { NextFunction, Request, Response } from 'express'
import path from 'path'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR, UPLOAD_VIDEO_TEMP_DIR } from '~/constants/dir'
import { USERS_MESSAGES } from '~/constants/message'
import { mediasService } from '~/services/medias.sevices'

export const uploadImageController = async (req: Request, res: Response, next: NextFunction) => {
  const url = await mediasService.UploadImage(req)
  return res.json({ message: USERS_MESSAGES.UPLOAD_SUCCESS, result: url })
}

export const uploadVideoController = async (req: Request, res: Response, next: NextFunction) => {
  const url = await mediasService.UploadVideo(req)
  return res.json({ message: USERS_MESSAGES.UPLOAD_SUCCESS, result: url })
}

export const serveImageController = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params
  return res.sendFile(path.resolve(UPLOAD_IMAGE_DIR, name + '.jpg'), (err) => {
    if (err) {
      return res.status((err as any).status).send('Not found')
    }
  })
}

export const serveVideoController = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params
  return res.sendFile(path.resolve(UPLOAD_VIDEO_DIR, name + '.mp4'), (err) => {
    // return
    if (err) {
      return res
        .status((err as any).status)
        .send('Not found')
        .end()
    }
  })
}
