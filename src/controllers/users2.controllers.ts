import { config } from 'dotenv'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { menusServices } from '~/services/menus.services'
config()

export const getPublicUsers = async (req: Request, res: Response) => {
  // const user = menu
  const users = await menusServices.getPublicUsers()

  return res.json({ message: 'ok', data: users })
}
