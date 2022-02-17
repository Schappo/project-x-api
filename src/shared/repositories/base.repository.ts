import { ReturnModelType, DocumentType } from '@typegoose/typegoose'
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types'
import { MongoRequestError } from '../exception/mongo-request-error'
import { BaseModel } from '../models/base.model'
import { MongoId } from '../types'

export abstract class BaseRepository<T extends BaseModel> {
  protected model: ReturnModelType<AnyParamConstructor<T>>;

  constructor (model: ReturnModelType<AnyParamConstructor<T>>) {
    this.model = model
  }

  private throwMongoError (e: MongoRequestError) {
    throw new MongoRequestError(e.message, e.statusCode, e.code)
  }

  async create (item: T): Promise<DocumentType<T>> {
    try {
      return await this.model.create(item)
    } catch (error) {
      this.throwMongoError(error)
    }
  }

  async findAll (): Promise<DocumentType<T>[]> {
    return await this.model.find()
  }

  async find (query: object): Promise<DocumentType<T>[]> {
    return this.model.find(query)
  }

  async findById (id: MongoId): Promise<DocumentType<T>> {
    return this.model.findById(id)
  }

  async update (id: MongoId, obj: T): Promise<DocumentType<T>> {
    return await this.model.findByIdAndUpdate(id, obj, { new: true })
  }

  async findOne (query: object): Promise<DocumentType<T>> {
    return this.model.findOne(query)
  }

  async delete (id: MongoId): Promise<any> {
    try {
      return this.model.findByIdAndDelete(id)
    } catch (error) {
      this.throwMongoError(error)
    }
  }
}
