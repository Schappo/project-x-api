/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Express, Request, Response } from 'express'
import { controllers } from './modules/controllers'
import { RouteDefinition } from './shared/decorators/http/http-method.decorator'
import { MetadataKeysEnum } from './shared/enums'
import { ApiError } from './shared/exception'

class App {
  private readonly _instance: Express;

  get instance (): Express {
    return this._instance
  }

  constructor () {
    this._instance = express()
    this._instance.use(express.json())
    this.registerRouters()
  }

  private registerRouters () {
    controllers.forEach((ControllerClass) => {
      const controllersInstance = new ControllerClass() as any

      const prefix: string = Reflect.getMetadata(MetadataKeysEnum.PREFIX, ControllerClass)
      const routes: Array<RouteDefinition> = Reflect.getMetadata(MetadataKeysEnum.ROUTES, ControllerClass)

      routes.forEach((route) => {
        this.instance[route.requestMethod](
          `${prefix}${route.path}`,
          (async (req: Request, res: Response): Promise<Response> => {
            try {
              const response = await controllersInstance[route.methodName](req, res)
              return res.send(response)
            } catch (error) {
              console.log(error)
              res.statusCode = error.statusCode || 500
              return res.send(new ApiError(error.message, error.statusCode))
            }
          }) as Application)
      })
    })
  }
}
export default new App().instance
