import { config } from 'dotenv'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { TokenPayload } from '~/models/requests/User.requests'
import { menusServices } from '~/services/menus.services'
config()

export const getPublicUsers = async (req: Request, res: Response) => {
  // const user = menu
  const users = await menusServices.getPublicUsers()

  return res.json({ message: 'ok', data: users })
}

export const updateUserAvatar = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload

  const { url } = await menusServices.UploadItemImage(req)

  const user = await menusServices.updateUserAvatar(new ObjectId(user_id), url)

  return res.json({ message: 'ok', url: user?.avatar })
}
