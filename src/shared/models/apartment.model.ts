// @/models.ts
import { prop, getModelForClass } from '@typegoose/typegoose'
import { BaseModel } from './base.model'

export class Apartment extends BaseModel {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  qtdRoom: number;

  @prop({ required: true })
  qtdPerson: number;
}

export const ApartmentModel = getModelForClass(Apartment)
