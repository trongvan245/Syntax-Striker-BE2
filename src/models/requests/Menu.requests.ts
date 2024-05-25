import { ObjectId } from 'mongodb'
import { FootItemType } from '../schemas/Menu.schema'

export interface updateMenuReqBody {
  food_items: FootItemType[]
}

export interface getMenuReqBody {
  menu_id: string
}
