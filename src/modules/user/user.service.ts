import { DocumentType } from '@typegoose/typegoose'
import { ApiError } from '../../shared/exception'
import { User, UserModel } from '../../shared/models/user.model'
import { UserRepository } from '../../shared/repositories/user.repository'
import { MongoId } from '../../shared/types'

export class UserService {
  private readonly userRepository: UserRepository = new UserRepository(UserModel)

  async create (user: User): Promise<User> {
    return await this.userRepository.create(user)
  }

  async findAll (): Promise<User[]> {
    return await this.userRepository.findAll()
  }

  async find (query: object): Promise<User[]> {
    return await this.userRepository.find(query)
  }

  async findById (id: MongoId): Promise<User> {
    const user: User = await this.userRepository.findById(id)

    if (!user) throw new ApiError('User Not Found', 404)

    return user
  }

  async findOne (query: object): Promise<User> {
    return await this.userRepository.findOne(query)
  }

  async delete (id: MongoId): Promise<boolean> {
    await this.findById(id)
    return Boolean(await this.userRepository.delete(id))
  }

  async update (id: MongoId, updatedUser: User): Promise<User> {
    await this.findById(id)
    return await this.userRepository.update(id, updatedUser)
  }
}
