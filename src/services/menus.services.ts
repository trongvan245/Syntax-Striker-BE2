import { ObjectId } from 'mongodb'
import databaseService from './databse.services'
import Menu, { FootItemType } from '~/models/schemas/Menu.schema'
import User from '~/models/schemas/User.schema'
import { getNameFromFullName, handleUploadImage } from '~/utils/file'
import { Request } from 'express'
import { Media } from '~/models/Other'
import path from 'path'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import sharp from 'sharp'
import fs from 'fs'
import { isProduction } from '~/constants/config'
import { MediaType } from '~/constants/enum'

class MenusServices {
  async getMenuId(user_id: string) {
    const { menu_id } = (await databaseService.users.findOne(
      { _id: new ObjectId(user_id) },
      { projection: { menu_id: 1 } }
    )) as User
    return menu_id as ObjectId
  }
  async getMenu(menu_id: string) {
    const menu = (await databaseService.menus.findOne({ _id: new ObjectId(menu_id) })) as Menu
    return menu
  }
  async getMenuByUserId(user_id: string) {
    const menu_id = await this.getMenuId(user_id)

    const menu = await databaseService.menus.findOne({ _id: new ObjectId(menu_id) })
    return menu
  }

  async addFoodItems(menu_id: ObjectId, FootItems: FootItemType[]) {
    const menu = (await databaseService.menus.findOne({ _id: menu_id })) as Menu
    const filteredNewItems = FootItems.filter(
      (newItem) => !menu.items?.some((existingItem) => existingItem.name === newItem.name)
    )
    filteredNewItems.forEach((item, index) => {
      if (item._id == null) item._id = new ObjectId()
    })
    //new menu
    const result = await databaseService.menus.findOneAndUpdate(
      { _id: menu_id },
      { $push: { items: { $each: filteredNewItems } } },
      { returnDocument: 'after' }
    )

    return result
  }

  async updateFoodItemsImage(menu_id: ObjectId, _id: ObjectId, url: string) {
    const menu = (await databaseService.menus.findOne({ _id: menu_id })) as Menu
    // const items = menu.items?.filter((item) => item._id == _id)
    menu.items?.map((item) => {
      if (item._id?.equals(_id)) {
        item.avatar = url
      }
      return item
    })

    await databaseService.menus.updateOne({ _id: menu_id }, { $set: { items: menu.items } })
  }

  async removeFootItem(menu_id: string, name: string) {
    const menu = await databaseService.menus.findOneAndUpdate(
      {
        menu_id: new ObjectId(menu_id)
      },
      { $pull: { items: { name } } },
      { returnDocument: 'after' }
    )
  }

  async UploadItemImage(req: Request) {
    const { _id, files } = await handleUploadImage(req)
    console.log(_id)

    const file = files[0]

    const newName = getNameFromFullName(file.newFilename)
    const newPath = path.resolve(UPLOAD_IMAGE_DIR, `${newName}.jpg`)

    sharp.cache(false)
    await sharp(file.filepath).jpeg().toFile(newPath)
    fs.unlinkSync(file.filepath)

    return {
      _id,
      url: isProduction
        ? `${process.env.HOST}/static/image/${newName}`
        : `http://localhost:${process.env.PORT}/static/image/${newName}`,
      type: MediaType.Image
    }

    // const result: Media[] = await Promise.all(
    //   files.map(async (file) => {
    //     const newName = getNameFromFullName(file.newFilename)
    //     const newPath = path.resolve(UPLOAD_IMAGE_DIR, `${newName}.jpg`)

    //     sharp.cache(false)
    //     await sharp(file.filepath).jpeg().toFile(newPath)
    //     fs.unlinkSync(file.filepath)

    //     return {
    //       _id,
    //       url: isProduction
    //         ? `${process.env.HOST}/static/image/${newName}`
    //         : `http://localhost:${process.env.PORT}/static/image/${newName}`,
    //       type: MediaType.Image
    //     }
    //   })
    // )

    // return result
  }

  async updateMinMaxPrice(min_price: number, max_price: number, user_id: ObjectId) {
    const user = databaseService.users.findOneAndUpdate(
      { _id: user_id },
      {
        $set: {
          min_price,
          max_price
        }
      },
      { returnDocument: 'after' }
    )

    return user
  }

  async getPublicUsers() {
    const cursor = databaseService.users.find(
      {},
      {
        projection: {
          name: 1,
          rating: 1,
          min_price: 1,
          max_price: 1,
          phone_number: 1,
          location: 1,
          address: 1,
          menu_id: 1,
          owner_name: 1,
          avatar: 1
        }
      }
    )
    const user = (await cursor.toArray()) as User[]

    return user
  }

  async updateUserAvatar(user_id: ObjectId, url: string) {
    const user = await databaseService.users.findOneAndUpdate(
      { _id: user_id },
      {
        $set: {
          avatar: url
        }
      },
      { returnDocument: 'after' }
    )

    return user
  }

  async removeItems(menu_id: ObjectId, list_id: ObjectId[]) {
    const menu = await databaseService.menus.findOneAndUpdate(
      { _id: menu_id },
      { $pull: { items: { _id: { $in: list_id } } } },
      { returnDocument: 'after' }
    )

    return menu
  }
}

export const menusServices = new MenusServices()
