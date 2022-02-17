import { MetadataKeysEnum, MethodsEnum } from '../../enums'
import { handleArgDecorators } from './request-properties.decorator'
export interface RouteDefinition {
  // Path to our route
  path: string;
  // HTTP Request method (get, post, ...)
  requestMethod: MethodsEnum;
  // Method name within our class responsible for this route
  methodName: string;
}

const methodDecoratorFactory = (method: MethodsEnum) => {
  return (path = '/'): MethodDecorator => {
    return (
      target: object | any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) => {
      const controllerClass = target.constructor
      if (!Reflect.hasMetadata(MetadataKeysEnum.ROUTES, controllerClass)) {
        Reflect.defineMetadata('routes', [], target.constructor)
      }
      const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>
      console.log(method, path, propertyKey)
      routes.push({
        requestMethod: method,
        path,
        methodName: propertyKey
      })
      Reflect.defineMetadata(MetadataKeysEnum.ROUTES, routes, controllerClass)
      handleArgDecorators(target, propertyKey, descriptor)
    }
  }
}

export const Get = methodDecoratorFactory(MethodsEnum.GET)
export const Post = methodDecoratorFactory(MethodsEnum.POST)
export const Delete = methodDecoratorFactory(MethodsEnum.DELETE)
export const Path = methodDecoratorFactory(MethodsEnum.PATH)
export const Put = methodDecoratorFactory(MethodsEnum.PUT)
export const Head = methodDecoratorFactory(MethodsEnum.HEAD)
export const Options = methodDecoratorFactory(MethodsEnum.OPTIONS)
