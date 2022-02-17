import { UserService } from '../user/user.service'
import { ApiError } from '../../shared/exception'
import { compareHash } from '../../shared/encryption.functions'
import jwt from 'jsonwebtoken'
import { RedisService } from '../../shared/redis/redis.service'

export class AuthenticationService {
  private readonly userService = new UserService()
  private readonly redisService = new RedisService()
  private readonly SECRET = process.env.SECRET

  async login (username: string, password: string): Promise<{accessToken: string}> {
    const user = await this.userService.findOne({ username })

    if (!user) throw new ApiError('User Not Found!', 400)

    if (!await compareHash(password, user.password)) throw new ApiError('Incorrect Password', 400)

    const payload = {
      id: user.id,
      exp: Math.floor(Date.now() / 1000) + (60 * 60)
    }

    return {
      accessToken: await jwt.sign(payload, this.SECRET)
    }
  }

  async logout (authorization: string): Promise<string> {
    const accessToken = authorization.replace('Bearer ', '')
    const payload = jwt.verify(accessToken, this.SECRET)
    return await this.redisService.setToken(payload.id, accessToken, payload.exp)
  }
}
