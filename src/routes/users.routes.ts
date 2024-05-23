import { Router } from 'express'
import {
  changePasswordController,
  emailVerifyController,
  followController,
  forgotPasswordController,
  getMeController,
  getProfileController,
  loginController,
  logoutController,
  oauthController,
  registerController,
  resendVerifyEmailController,
  resetPasswordController,
  unfollowController,
  verifyForgotPasswordController
} from '~/controllers/users.controllers'
import { updateMeController } from '~/controllers/updateMeController'
import {
  accessTokenValidator,
  changePasswordValidator,
  emailVerifyTokenValidator,
  followValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  unfollowValidator,
  updateMeValidator,
  verifiedUserValidator,
  verifyForgotPasswordTokenValidator
} from '~/middlewares/users.middlewares'
import { WrapRequestHandler } from '~/utils/handlers'
import { filterMiddleware } from '~/middlewares/common.middlewares'
import { UpdateMeReqBody } from '~/models/requests/User.requests'
const usersRouter = Router()

usersRouter.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

/**
 * Description: Login user
 * Path: /Login
 * Method: post
 * body: {email: string, password: string}
 */

usersRouter.post('/login', loginValidator, WrapRequestHandler(loginController))
// usersRouter.post('/login', WrapRequestHandler(loginController))
/**
 * Description. OAuth with Google
 * Path: /oauth/google
 * Method: GET
 * Query: { code: string }
 */

usersRouter.get('/oauth/google', WrapRequestHandler(oauthController))
/**
 * Description: Register user
 * Path: /register
 * Method: Post
 * body: {name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601}
 */
usersRouter.post('/register', registerValidator, WrapRequestHandler(registerController))

/**
 * Description: Logout user
 * Path: /Logout
 * Method: post
 * Header: {Authorization: Bear<access_token>}
 * body: {refresh_token: string}
 */

usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, WrapRequestHandler(logoutController))

/**
 * Description: Verify user
 * Path: /verify-email
 * Method: post
 * body: {email_verify_token: string}
 */

usersRouter.post('/verify-email', emailVerifyTokenValidator, WrapRequestHandler(emailVerifyController))

/**
 * Description: resend user
 * Path: /resend-email
 * Method: post
 * Header: {Authorization: Bear<access_token>}
 */

usersRouter.post('/resend-email', accessTokenValidator, WrapRequestHandler(resendVerifyEmailController))

/**
 * Description: Submit email to reset password
 * Path: /forgot-password
 * Method: post
 * body: {email: string}
 */

usersRouter.post('/forgot-password', forgotPasswordValidator, WrapRequestHandler(forgotPasswordController))

/**
 * Description: Verify link email to reset password
 * Path: /fverify-forgot-password
 * Method: post
 * body: {forgot-password-token: string}
 */

usersRouter.post(
  '/verify-forgot-password',
  verifyForgotPasswordTokenValidator,
  WrapRequestHandler(verifyForgotPasswordController)
)
/**
 * Description: Reset password
 * Path: /reset-password
 * Method: post
 * body: {forgot-password-token: string, password: string, confirm_password: string}
 */

usersRouter.post('/reset-password', resetPasswordValidator, WrapRequestHandler(resetPasswordController))
/**
 * Description: Get user profile
 * Path: /me
 * Method: get
 * Header: {Authorization: Bear<access_token>}
 */

usersRouter.get('/me', accessTokenValidator, WrapRequestHandler(getMeController))

/**
 * Description: Get user profile
 * Path: /:username
 * Method: get
 */

usersRouter.get('/:username', WrapRequestHandler(getProfileController))

/**
 * Description: Update my profile
 * Path: /get-me
 * Method: patch
 * Header: {Authorization: Bear<access_token>}
 */

usersRouter.patch(
  '/me',
  accessTokenValidator,
  updateMeValidator,
  verifiedUserValidator,
  filterMiddleware<UpdateMeReqBody>([
    'name',
    'date_of_birth',
    'bio',
    'location',
    'website',
    'username',
    'avatar',
    'cover_photo'
  ]),
  WrapRequestHandler(updateMeController)
)
/**
 * Description: Change password
 * Path: /change-password
 * Method: PUT
 * Header: {Authorization: Bear<access_token>}
 * Body: {old_password: string, password: string, confirm_password: string}
 */

usersRouter.put(
  '/change-password',
  accessTokenValidator,
  //   verifiedUserValidator,
  changePasswordValidator,
  WrapRequestHandler(changePasswordController)
)

/**
 * Description: Follow user
 * Path: /follow
 * Method: post
 * Body: {followed_user_id: string}
 * Header: {Authorization: Bear<access_token>}
 */

usersRouter.post(
  '/follow',
  accessTokenValidator,
  verifiedUserValidator,
  followValidator,
  WrapRequestHandler(followController)
)

/**
 * Description: Unfollow user
 * Path: /follow/:user_id
 * Method: DELETE
 * Body: {followed_user_id: string}
 */

usersRouter.delete(
  '/follow/:user_id',
  accessTokenValidator,
  verifiedUserValidator,
  unfollowValidator,
  WrapRequestHandler(unfollowController)
)
export default usersRouter
