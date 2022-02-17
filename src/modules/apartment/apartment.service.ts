import { DocumentType } from '@typegoose/typegoose'
import { ApartmentRepository } from '../../shared/repositories'
import { ApartmentModel, Apartment } from '../../shared/models'
import { MongoId } from 'src/shared/types'
import { ApiError } from 'src/shared/exception'

export class ApartmentService {
  private readonly apartmentRepository: ApartmentRepository = new ApartmentRepository(ApartmentModel)

  async create (apartment: Apartment): Promise<DocumentType<Apartment>> {
    return await this.apartmentRepository.create(apartment)
  }

  async findAll (): Promise<DocumentType<Apartment>[]> {
    return await this.apartmentRepository.findAll()
  }

  async find (query: object): Promise<DocumentType<Apartment>[]> {
    return await this.apartmentRepository.find(query)
  }

  async findById (id: MongoId): Promise<DocumentType<Apartment>> {
    const apartment: Apartment = await this.apartmentRepository.findById(id)

    if (!apartment) throw new ApiError('Apartment Not Found', 404)

    return await this.apartmentRepository.findById(id)
  }

  async findOne (query: object): Promise<DocumentType<Apartment>> {
    return await this.apartmentRepository.findOne(query)
  }

  async delete (id: MongoId): Promise<boolean> {
    await this.findById(id)
    return Boolean(await this.apartmentRepository.delete(id))
  }

  async update (id: MongoId, newApartment: Apartment): Promise<Apartment> {
    await this.findById(id)
    return await this.apartmentRepository.update(id, newApartment)
  }
}
