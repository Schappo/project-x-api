
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ApiError } from '../../exception'
import { RedisService } from '../../redis/redis.service'

const Auth = (): MethodDecorator => {
  return function (
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value
    // console.log(descriptor.value?.name || descriptor.value)
    descriptor.value = async function (...args: Express.Application[]) {
      console.log('this: ', this, 'args', args)
      const redisService = new RedisService()
      const { SECRET } = process.env

      const request = args[args.length - 2] as Request

      const response = args[args.length - 1] as Response

      const { authorization } = request.headers

      if (!authorization) {
        response.statusCode = 400
        throw new ApiError('Token is not provided!', 400)
      }

      const accessToken = authorization.replace('Bearer ', '')

      try {
        await jwt.verify(accessToken, SECRET)
        const token = await redisService.getToken(accessToken)
        if (token) throw new Error('invalid')
      } catch (error) {
        response.statusCode = 403
        return new ApiError('Invalid Token', 403)
      }
      return original.apply(this, args)
    }
  }
}

export default Auth
