import { NextFunction, Request, Response } from 'express'
import formidable from 'formidable'

import path from 'path'
// import { getNameFromFullName, handleUploadFile } from './utils/files'
// import { Media } from './utils/enum'
// import { UPLOAD_FILE_DIR } from './constants/dir'
import fs from 'fs'
import { ParamsDictionary } from 'express-serve-static-core'
import { LoginReqBody, UploadReqBody } from '~/models/requests/User.requests'

// import { LoginReqBody, UploadReqBody } from './models'
// console.log(path.resolve('uploads'))
// export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
//   const result = await usersService.register(req.body)
//   return res.json({ message: USERS_MESSAGES.Register_SUCCESS, result })
// }

export const uploadFileCodeController = async (
  req: Request<ParamsDictionary, any, UploadReqBody>,
  res: Response,
  next: NextFunction
) => {
  // const files = await handleUploadFile(req)

  // files.map((file) => {
  //   const newName = getNameFromFullName(file.newFilename)
  //   const newPath = path.resolve(UPLOAD_FILE_DIR, `${newName}.jpg`)
  //   const staticPath = path.resolve(UPLOAD_FILE_DIR, `${newName}.jpg`)

  //   // fs.rename(newPath)
  //   console.log(newPath)
  // })
  // const { source_code } = req.body
  // console.log(source_code)
  console.log(req.body)
  return res.json({
    message: 'Upload file success'
  })
  // return res.json({
  //   message: 'Upload file success'
  // })
}
