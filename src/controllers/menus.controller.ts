import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { updateMenuReqBody } from '~/models/requests/Menu.requests'
import { TokenPayload } from '~/models/requests/User.requests'
import { menusServices } from '~/services/menus.services'

export const updateMenuController = async (req: Request<ParamsDictionary, any, updateMenuReqBody>, res: Response) => {
  const { food_items } = req.body
  const { user_id } = req.decoded_authorization as TokenPayload

  const menu_id = await menusServices.getMenuId(user_id)
  const result = await menusServices.addFoodItems(menu_id, food_items)
  console.log(menu_id)
  console.log(food_items)
  return res.json({ message: ' ok', result })

  // const menu = menusServices.addFoodItems('', food_items)
}

export const updateItemImageController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const menu_id = await menusServices.getMenuId(user_id)
  const { _id, url } = await menusServices.UploadItemImage(req)
  const id = new ObjectId(_id)
  await menusServices.updateFoodItemsImage(menu_id, id, url)
  return res.json({ message: 'ok', url })
}

export const getMenuController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const menu = await menusServices.getMenuByUserId(user_id)

  return res.json({ items: menu?.items })
}
