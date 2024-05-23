import { Router } from 'express'
import { serveImageController, serveVideoController } from '~/controllers/medias.controllers'
import { WrapRequestHandler } from '~/utils/handlers'

const staticRouter = Router()

staticRouter.get('/image/:name', serveImageController)
staticRouter.get('/video-streaming/:name', serveVideoController)

export default staticRouter
