import * as redis from 'redis'
import dotenv from 'dotenv'
dotenv.config()

export class RedisService {
  private readonly redisClient = redis.createClient({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST
  } as any)

  private async openConnetion (): Promise<void> {
    await this.redisClient.connect()
  }

  private async closeConnetion (): Promise<void> {
    await this.redisClient.disconnect()
  }

  async setToken (id: string, token: string, expTimestamp?: number): Promise<string> {
    await this.openConnetion()
    const expireSeconds = expTimestamp ? expTimestamp - Math.floor(Date.now() / 1000) : 3600
    const result = await this.redisClient.set(token, id, { EX: expireSeconds })
    await this.closeConnetion()
    return result
  }

  async getToken (id): Promise<any> {
    await this.openConnetion()
    const result = await this.redisClient.get(id)
    await this.closeConnetion()
    return result
  }
}
