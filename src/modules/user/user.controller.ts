import { Request } from 'express'
import Auth from 'src/shared/decorators/authentication/authentication.decrator'
import Controller from '../../shared/decorators/http/controller.decorator'
import { Delete, Get, Post, Put } from '../../shared/decorators/http/http-method.decorator'
import { Body, Params, Query } from '../../shared/decorators/http/request-properties.decorator'
import { User } from '../../shared/models/user.model'
import { MongoId } from '../../shared/types'

import { UserService } from './user.service'

@Controller('/user')
export class UserController {
  private readonly userService: UserService = new UserService()

  @Post('/')
  @Auth()
  async create (@Body() user: User): Promise<User> {
    return await this.userService.create(user)
  }

  @Get('/')
  @Auth()
  async findAll (): Promise<User[]> {
    return await this.userService.findAll()
  }

  @Get('/:id')
  @Auth()
  async findById (@Params('id') id: MongoId): Promise<User> {
    return await this.userService.findById(id)
  }

  @Post('/find-one')
  @Auth()
  async findOne (@Query() query: object): Promise<User> {
    return await this.userService.findOne(query)
  }

  @Delete('/:id')
  @Auth()
  async delete (@Params('id') id: MongoId): Promise<boolean> {
    return await this.userService.delete(id)
  }

  @Put('/:id')
  @Auth()
  async update (@Params('id') id: MongoId, @Body() user: User): Promise<User> {
    return await this.userService.update(id, user)
  }
}
