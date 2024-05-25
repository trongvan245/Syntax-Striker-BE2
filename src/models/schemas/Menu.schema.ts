import { ObjectId } from 'mongodb'

export interface FootItemType {
  _id?: ObjectId
  name?: string
  price?: number
  rating?: number
  menu_id?: ObjectId
  avatar?: string
  description?: string
}
interface MenuType {
  _id?: ObjectId
  items: FootItemType[]
}

export default class Menu {
  _id?: ObjectId
  items?: FootItemType[]
  constructor({ _id, items }: MenuType) {
    this._id = _id
    this.items = items
  }
}
