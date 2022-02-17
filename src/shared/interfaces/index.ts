import { MethodsEnum } from '../enums'
import { MongoId } from '../types'

export * from './authentication.interface'
export * from './exceptionError.interface'

export interface IRouter {
  method: MethodsEnum;
  path: string;
  methodName: string;
}

export interface JwtUser {
  _id: MongoId;
  // roles: RolesEnum[];
  active: boolean;
}
