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
  website?: string // optional
  username?: string // optional
  avatar?: string // optional
  cover_photo?: string // optional

  location?: string // optional
  address?: string
  owner_name?: string
  phone_number?: string
  rating?: number
  max_price?: number
  min_price?: number

  menu_id?: ObjectId
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
  website: string // optional
  username: string // optional
  avatar: string // optional
  cover_photo: string // optional

  location: string // optional
  address: string
  owner_name: string
  phone_number: string
  rating: number
  max_price: number
  min_price: number

  menu_id?: ObjectId

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
    this.website = user.website || ''
    this.username = user.username || ''
    this.avatar = user.avatar || ''
    this.cover_photo = user.cover_photo || ''

    this.location = user.location || ''
    this.address = user.address || ''
    this.min_price = user.min_price || -1
    this.max_price = user.max_price || -1
    this.phone_number = user.phone_number || ''
    this.owner_name = user.owner_name || ''
    this.rating = user.rating || 0

    this.menu_id = user.menu_id
  }
}
