import { config } from 'dotenv'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { pick } from 'lodash'
import { ObjectId } from 'mongodb'
import { UserVerifyStatus } from '~/constants/enum'
import { HTTP_STATUS } from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/Errors'
import {
  ChangePasswordReqBody,
  EmailVerifyReqBody,
  FollowReqBody,
  ForgotPasswordReqBody,
  GetProfileReqParams,
  LoginReqBody,
  LogoutReqBody,
  RegisterReqBody,
  ResetPasswordReqBody,
  TokenPayload,
  UnfollowReqParams,
  UpdateMeReqBody,
  VerifyForgotPasswordReqBody
} from '~/models/requests/User.requests'
import User from '~/models/schemas/User.schema'
import databaseService from '~/services/databse.services'
import usersService from '~/services/users.services'
config()

export const loginController = async (req: Request<ParamsDictionary, any, LoginReqBody>, res: Response) => {
  console.log(req.body)
  const user = req.user as User
  const user_id = user._id as ObjectId

  const result = await usersService.login({ user_id: user_id.toString(), verify: user.verify })

  return res.json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
}
export const oauthController = async (req: Request, res: Response) => {
  const { code } = req.query
  const result = await usersService.oauth(code as string)
  const urlRedirect = `${process.env.CLIENT_REDIRECT_CALLBACK}?access_token=${result.access_token}&refresh_token=${result.refresh_token}
  &new_user=${result.newUser}&verify=${result.verify}`
  return res.redirect(urlRedirect)
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  console.log(req.body)
  const result = await usersService.register(req.body)
  return res.json({ message: USERS_MESSAGES.Register_SUCCESS, result })
}

export const logoutController = async (req: Request<ParamsDictionary, any, LogoutReqBody>, res: Response) => {
  const { refresh_token } = req.body
  const result = await usersService.logout(refresh_token)

  return res.json({ message: USERS_MESSAGES.LOGOUT_SUCCESS, result })
}

export const emailVerifyController = async (req: Request<ParamsDictionary, any, EmailVerifyReqBody>, res: Response) => {
  const { user_id } = req.decoded_email_verify_token as TokenPayload
  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })

  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: USERS_MESSAGES.USER_NOT_FOUND })
  }

  //Da verify thi bang rong, chua thi co token
  if (user.email_verify_token == '') {
    return res.json({ message: USERS_MESSAGES.EMAIL_ALREADY_VERIFIED })
  }

  const result = await usersService.verifyEmail(user_id)

  return res.json({ message: USERS_MESSAGES.EMAIL_VERIFIED_SUCCESS, result })
}

export const resendVerifyEmailController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })

  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: USERS_MESSAGES.USER_NOT_FOUND
    })
  }

  console.log(user.verify)
  if (user.verify == UserVerifyStatus.Verified) {
    return res.json({ message: USERS_MESSAGES.EMAIL_ALREADY_VERIFIED })
  }
  await usersService.resendVerifyEmail(user_id)

  return res.json({ message: USERS_MESSAGES.RESEND_VERIFY_EMAIL_SUCCESS })
}

export const forgotPasswordController = async (
  req: Request<ParamsDictionary, any, ForgotPasswordReqBody>,
  res: Response
) => {
  const { _id, verify } = req.user as User

  const result = await usersService.forgotPassword({ user_id: (_id as ObjectId).toString(), verify })
  return res.json(result)
}

export const verifyForgotPasswordController = async (
  req: Request<ParamsDictionary, any, VerifyForgotPasswordReqBody>,
  res: Response
) => {
  return res.json({ message: USERS_MESSAGES.VERIFY_FORGOT_PASSWORD_SUCCESS })
}

export const resetPasswordController = async (
  req: Request<ParamsDictionary, any, ResetPasswordReqBody>,
  res: Response
) => {
  const { user_id } = req.decoded_forgot_password_token as TokenPayload
  const { password } = req.body
  const result = await usersService.resetPassword(user_id, password)
  return res.json(result)
}

export const getMeController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const user = await usersService.getMe(user_id)

  return res.json({
    message: USERS_MESSAGES.GET_MY_PROFILE_SUCCESS,
    user
  })
}
export const getProfileController = async (req: Request<GetProfileReqParams>, res: Response) => {
  const { username } = req.params

  const user = await usersService.getProfile(username)

  if (user == null) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGES.USER_NOT_FOUND,
      status: HTTP_STATUS.NOT_FOUND
    })
  }

  return res.json({
    message: USERS_MESSAGES.GET_PROFILE_SUCCESS,
    user
  })
}

export const updateMeController = async (req: Request<ParamsDictionary, any, UpdateMeReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload

  const { body } = req

  const user = await usersService.updateMe(user_id, body)
  return res.json({ message: USERS_MESSAGES.UPDATE_ME_SUCCESS, user })
}
export const changePasswordController = async (
  req: Request<ParamsDictionary, any, ChangePasswordReqBody>,
  res: Response
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { password } = req.body

  const result = await usersService.changePassword(user_id, password)
  return res.json(result)
}

export const followController = async (req: Request<ParamsDictionary, any, FollowReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload

  const { followed_user_id } = req.body

  const result = await usersService.follow(user_id, followed_user_id)
  return res.json(result)
}

export const unfollowController = async (req: Request<UnfollowReqParams>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload

  const { user_id: followed_user_id } = req.params
  console.log(user_id, followed_user_id)

  const result = await usersService.unfollow(user_id, followed_user_id)
  return res.json(result)
}
