import { Router } from 'express'
import {
  getMenuController,
  removeItemsController,
  updateItemImageController,
  updateMenuController
} from '~/controllers/menus.controller'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { WrapRequestHandler } from '~/utils/handlers'

const menusRouter = Router()

menusRouter.use((req, res, next) => {
  console.log('Menu query Time: ', Date.now())
  next()
})

menusRouter.post('/update-menu', accessTokenValidator, WrapRequestHandler(updateMenuController))

menusRouter.post('/update-item-image', accessTokenValidator, WrapRequestHandler(updateItemImageController))

menusRouter.post('/get-menu', WrapRequestHandler(getMenuController))

menusRouter.post('/remove-item', accessTokenValidator, WrapRequestHandler(removeItemsController))
export default menusRouter
