import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { getMenuReqBody, removeItemsReqBody, updateMenuReqBody } from '~/models/requests/Menu.requests'
import { TokenPayload } from '~/models/requests/User.requests'
import Menu from '~/models/schemas/Menu.schema'
import { menusServices } from '~/services/menus.services'

export const updateMenuController = async (req: Request<ParamsDictionary, any, updateMenuReqBody>, res: Response) => {
  const { food_items } = req.body
  const { user_id } = req.decoded_authorization as TokenPayload

  const menu_id = await menusServices.getMenuId(user_id)
  const result = (await menusServices.addFoodItems(menu_id, food_items)) as Menu
  const prices = result.items
    ?.map((item) => item.price)
    .filter((price) => price !== undefined && price !== null) as number[]

  const max_price = prices.reduce((max, price) => (price > max ? price : max), prices[0]) || -1
  const min_price = prices.reduce((min, price) => (price < min ? price : min), prices[0]) || -1
  const user = await menusServices.updateMinMaxPrice(min_price, max_price, new ObjectId(user_id))
  //   console.log(menu_id)
  //   console.log(food_items)
  return res.json({ message: ' ok', result, min_price: user?.min_price, max_price: user?.max_price })

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

export const getMenuController = async (req: Request<ParamsDictionary, any, getMenuReqBody>, res: Response) => {
  const { menu_id } = req.body
  //   const menu = await menusServices.getmenu(user_id)
  const menu = await menusServices.getMenu(menu_id)

  return res.json({ items: menu?.items })
}

export const removeItemsController = async (req: Request<ParamsDictionary, any, removeItemsReqBody>, res: Response) => {
  const { list_id } = req.body
  const { user_id } = req.decoded_authorization as TokenPayload

  const menu_id = await menusServices.getMenuId(user_id)
  const list_Object_id = list_id.map((id) => new ObjectId(id))

  const menu = await menusServices.removeItems(menu_id, list_Object_id)

  return res.json({ menu })
}
