import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { pick } from 'lodash'
import { USERS_MESSAGES } from '~/constants/message'
import { TokenPayload, UpdateMeReqBody } from '~/models/requests/User.requests'
import usersService from '~/services/users.services'

export const updateMeController = async (req: Request<ParamsDictionary, any, UpdateMeReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload

  const { body } = req
  const user = await usersService.updateMe(user_id, body)
  return res.json({ message: USERS_MESSAGES.UPDATE_ME_SUCCESS, user })
}
