import { ReturnModelType, DocumentType } from '@typegoose/typegoose'
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types'
import { Apartment } from '../models'
import { BaseRepository } from './base.repository'

export class ApartmentRepository extends BaseRepository<Apartment> {
  constructor (
    protected readonly model: ReturnModelType<AnyParamConstructor<Apartment>>
  ) {
    super(model)
  }
}
