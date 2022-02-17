import { Request, Response } from 'express'
import { argumentMetadataKey } from '../../constants'
import { ArgumentsParamDecoratorType } from '../../types'

const functionArgumentDecoratorFactory = (decoratorName: string) => {
  return (paramName?: string) => (target: object, propertyKey: string | symbol, parameterIndex: number) => {
    const existingMetadata: ArgumentsParamDecoratorType[] = Reflect.getOwnMetadata(argumentMetadataKey, target, propertyKey) || []
    existingMetadata.push({
      parameterIndex,
      decoratorName,
      paramName: paramName || decoratorName.toLowerCase()
    })
    Reflect.defineMetadata(argumentMetadataKey, existingMetadata, target, propertyKey)
  }
}

export const handleArgDecorators = (target: object, propertyKey: string, descriptor: PropertyDescriptor) => {
  const method = descriptor.value || null
  descriptor.value = function (...args: object[]) {
    const [req, resp] = args as [Request, Response]

    if (!req && !resp) return method.apply(this, args)

    const mappingArguments = []

    const argumentMetadata: ArgumentsParamDecoratorType[] = Reflect.getOwnMetadata(argumentMetadataKey, target, propertyKey) || []
    if (argumentMetadata.length > 0) {
      for (const item of argumentMetadata) {
        mappingArguments[item.parameterIndex] = req[item.decoratorName][item.paramName] || req[item.decoratorName]
      }
    }

    mappingArguments.push(req)
    mappingArguments.push(resp)

    return method.apply(this, mappingArguments)
  }
}

export const Params = functionArgumentDecoratorFactory('params')
export const Body = functionArgumentDecoratorFactory('body')
export const Query = functionArgumentDecoratorFactory('query')
export const Headers = functionArgumentDecoratorFactory('headers')
