export const USERS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Name must be from 1 to 100',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',
  USER_NOT_FOUND: 'User not found',
  PASSWORD_IS_WRONG: 'Password is wrong',
  PASSWORD_IS_REQUIRED: 'PASSWORD is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Password length must be from 6 to 50',
  PASSWORD_MUST_BE_STRONG:
    'Password must be at least 6 characters long and contain at least 1 lowercase letter, 1 uppercase letter and 1 number',
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Confirm password length must be from 6 to 50',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Confirm password must be at least 6 characters long and contain at least 1 lowercase letter, 1 uppercase letter and 1 number',
  CONFIRM_PASSWORD_MUST_BE_THE_SAME: 'Password confirmation must be the same',
  DATE_OF_BIRTH_MUST_BE_ISO8601: 'Date of birth must be ISO8601',

  LOGIN_SUCCESS: 'Login success',
  Register_SUCCESS: 'Register success',
  LOGOUT_SUCCESS: 'Logout success',

  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required',
  ACCESS_TOKEN_IS_INVALID: 'Access token is invalid',
  REFRESH_TOKEN_IS_INVALID: 'Refresh token is invalid',
  USED_REFRESH_TOKEN_OR_NOT_EXIST: 'Used refresh token or not exist',

  EMAIL_VERIFIED_SUCCESS: 'Email is now verified!',
  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verify token is required',
  EMAIL_ALREADY_VERIFIED: 'Email already verified before',

  RESEND_VERIFY_EMAIL_SUCCESS: 'Resend verify email success',

  CHECK_EMAIL_TO_RESET_PASSWORD: 'Please check email to reset password',

  FORGOT_PASSWORD_TOKEN_IS_REQUIRED: 'Forgot password token is required',
  INVALID_FORGOT_PASSWORD_TOKEN: 'Invalid forgot password token, SECRETKEY MAYBE LEAKED!!!!!',
  VERIFY_FORGOT_PASSWORD_SUCCESS: 'Verify forgot password success',

  RESET_PASSWORD_SUCESS: 'Reset password success',

  GET_MY_PROFILE_SUCCESS: 'Get profile success',

  USER_NOT_VERIFIED: 'User not verified',

  BIO_MUST_BE_A_STRING: 'Bio must be a string',
  BIO_LENGTH: 'Bio length must be from 1 to 200',

  LOCATION_MUST_BE_A_STRING: 'Location must be a string',
  LOCATION_LENGTH: 'Location length must be from 1 to 200',

  WEBSITE_MUST_BE_A_STRING: 'Website must be a string',
  WEBSITE_LENGTH: 'Website length must be from 1 to 200',

  USERNAME_MUST_BE_A_STRING: 'Username must be a string',
  USERNAME_LENGTH: 'Username length must be from 1 to 100',
  USERNAME_INVALID: 'Username must be 4-15 characters long and contain only letters, numbers, and underscores',
  USERNAME_EXISTED: 'Username already existed',
  OLD_PASSWORD_NOT_MATCH: 'Old password does not match',
  CHANGE_PASSWORD_SUCCESS: 'Change password success',

  IMAGE_URL_MUST_BE_A_STRING: 'Image URL must be a string',
  IMAGE_URL_LENGTH: 'Image URL length must be from 1 to 400',
  UPDATE_ME_SUCCESS: 'Update me success',

  GET_PROFILE_SUCCESS: 'Get profile success',

  FOLLOW_SUCCESS: 'Follow success',
  UNFOLLOW_SUCCESS: 'Unfollow success',
  INVALID_USER_ID: 'Invalid user id',
  ALREADY_FOLLOWED: 'Already followed',
  ALREADY_UNFOLLOWED: 'Already unfollowed',

  GOOGLE_EMAIL_NOT_VERIFIED: 'Gmail not verified',

  UPLOAD_SUCCESS: 'Upload success'
} as const
