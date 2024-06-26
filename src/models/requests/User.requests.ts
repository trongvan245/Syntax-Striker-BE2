import { JwtPayload } from 'jsonwebtoken'
import { TokenType } from '~/constants/enum'
import { ParamsDictionary } from 'express-serve-static-core'

export interface UpdateMeReqBody {
  name?: string
  //   date_of_birth?: string
  bio?: string
  website?: string
  username?: string
  avatar?: string
  cover_photo?: string

  location?: string
  address?: string
  phone_number?: string
  owner_name?: string

  rating?: number
}
export interface ChangePasswordReqBody {
  old_password: string
  password: string
  confirm_password: string
}

export interface FollowReqBody {
  followed_user_id: string
}

export interface UploadReqBody {
  code: string
}
export interface LoginReqBody {
  email: string
  password: string
}

export interface RegisterReqBody {
  name: string
  email: string
  password: string
  confirm_password: string
  //   date_of_birth: string
  owner_name: string
  phone_number: string
}

export interface LogoutReqBody {
  refresh_token: string
}

export interface EmailVerifyReqBody {
  email_verify_token: string
}

export interface ForgotPasswordReqBody {
  email: string
}
export interface VerifyForgotPasswordReqBody {
  forgot_password_token: string
}
export interface ResetPasswordReqBody {
  password: string
  confirm_password: string
  forgot_password_token: string
}

export interface GetProfileReqParams {
  username: string
}
export interface UnfollowReqParams extends ParamsDictionary {
  user_id: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType //hnhu ông được dev đang ko xài cái này//nvm o signToken co dinh dang roi
}
