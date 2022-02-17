// @/models.ts
import { prop, getModelForClass, pre } from '@typegoose/typegoose'
import { generateHash } from '../encryption.functions'
import { BaseModel } from './base.model'

@pre('save', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const currentUser: any = this

  if (!this.isModified('password')) return next()

  const hashedPassword = generateHash(currentUser.password)

  if (hashedPassword) currentUser.password = hashedPassword

  next()
})
export class User extends BaseModel {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true, select: false })
  public password: string;

  @prop({ required: true, unique: true })
  public username!: string;

  @prop({ required: false })
  public age!: number;
}

export const UserModel = getModelForClass(User)
