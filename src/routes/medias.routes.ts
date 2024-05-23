import { Router } from 'express'
import { uploadImageController, uploadVideoController } from '~/controllers/medias.controllers'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { WrapRequestHandler } from '~/utils/handlers'

const mediasRouter = Router()

mediasRouter.post(
  '/upload-image',
  //   accessTokenValidator,
  //   verifiedUserValidator,
  WrapRequestHandler(uploadImageController)
)

mediasRouter.post(
  '/upload-video',
  //   accessTokenValidator,
  //   verifiedUserValidator,
  WrapRequestHandler(uploadVideoController)
)

export default mediasRouter
