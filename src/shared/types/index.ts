import { ObjectId } from 'mongoose'

export type Projection<T> = Partial<Record<keyof T, 0 | 1>>;

export type MongoId = ObjectId | string;

export type Nullable<T> = T | null;

export type UserLogin = {
  username: string,
  password: string
}

export type ArgumentsParamDecoratorType = {
  parameterIndex: number,
  decoratorName: string,
  paramName: string
}
