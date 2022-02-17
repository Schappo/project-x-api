/* eslint-disable no-return-assign */
import bcrypt from 'bcrypt'
import { Request } from 'express'
import { ApiError } from './exception'

const { SALT_WORK_FACTOR } = process.env

export function generateHash (password: string): string {
  const salt = bcrypt.genSaltSync(parseInt(SALT_WORK_FACTOR))
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

export async function compareHash (reqPass: string, savedPass: string): Promise<boolean> {
  try {
    return await bcrypt.compare(reqPass, savedPass)
  } catch (error) {
    throw new ApiError('Password Incorect', 400)
  }
}

export function getAccessTokenFromRequest (req: Request): string {
  const token = req.headers.authorization
  if (!token) throw new ApiError('token not provided', 400)
  return token.split(' ')[1]
}
