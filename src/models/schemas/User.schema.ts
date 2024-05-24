import { ObjectId } from 'mongodb'
import { UserVerifyStatus } from '~/constants/enum'

interface UserType {
  _id?: ObjectId
  email: string
  password: string
  name: string
  //   date_of_birth?: Date
  created_at?: Date
  updated_at?: Date
  email_verify_token?: string // jwt hoặc '' nếu đã xác thực email
  forgot_password_token?: string // jwt hoặc '' nếu đã xác thực email
  verify?: UserVerifyStatus

  bio?: string // optional
  location?: string // optional
  website?: string // optional
  username?: string // optional
  avatar?: string // optional
  cover_photo?: string // optional

  menu_id?: ObjectId
  owner_name: string
  phone_number: string
}

export default class User {
  _id?: ObjectId
  name: string
  email: string
  //   date_of_birth?: Date
  password: string
  created_at: Date
  updated_at: Date
  email_verify_token: string // jwt hoặc '' nếu đã xác thực email
  forgot_password_token: string // jwt hoặc '' nếu đã xác thực email
  verify: UserVerifyStatus

  bio: string // optional
  location: string // optional
  website: string // optional
  username: string // optional
  avatar: string // optional
  cover_photo: string // optional

  menu_id?: ObjectId
  owner_name: string
  phone_number: string

  constructor(user: UserType) {
    const date = new Date()
    this._id = user._id

    this.email = user.email
    this.password = user.password

    this.name = user.name || ''
    // this.date_of_birth = user.date_of_birth || new Date()
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
    this.email_verify_token = user.email_verify_token || ''
    this.forgot_password_token = user.forgot_password_token || ''
    this.verify = user.verify || UserVerifyStatus.Unverified
    // this.twitter_circle = user.twitter_circle || []
    this.bio = user.bio || ''
    this.location = user.location || ''
    this.website = user.website || ''
    this.username = user.username || ''
    this.avatar = user.avatar || ''
    this.cover_photo = user.cover_photo || ''

    this.menu_id = user.menu_id
    this.phone_number = user.phone_number
    this.owner_name = user.owner_name
  }
}
