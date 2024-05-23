import { Request, Response, NextFunction, RequestHandler } from 'express'

export const WrapRequestHandler = <P>(func: RequestHandler<P>) => {
  return async (req: Request<P>, res: Response, next: NextFunction) => {
    // Promise.resolve(func(req, res, next)).catch(next)

    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
