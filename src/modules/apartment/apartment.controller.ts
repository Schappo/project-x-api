import Auth from '../../shared/decorators/authentication.decrator'
import Controller from '../../shared/decorators/http/controller.decorator'
import { Delete, Get, Post, Put } from '../../shared/decorators/http/http-method.decorator'
import { Body, Params } from '../../shared/decorators/http/request-properties.decorator'
import { Apartment } from '../../shared/models'
import { MongoId } from '../../shared/types'
import { ApartmentService } from './apartment.service'

@Controller('/apartment')
export class ApartmentController {
  private readonly apartmentService = new ApartmentService()

  @Post('/')
  @Auth()
  async create (@Body() apartment: Apartment): Promise<Apartment> {
    return await this.apartmentService.create(apartment)
  }

  @Get('/')
  @Auth()
  async findAll (): Promise<Apartment[]> {
    return await this.apartmentService.findAll()
  }

  @Get('/:id')
  @Auth()
  async findById (@Params('id') id: MongoId): Promise<Apartment> {
    return await this.apartmentService.findById(id)
  }

  @Put('/:id')
  @Auth()
  async do (@Params('id') id: MongoId, @Body() apartment: Apartment): Promise<Apartment> {
    return await this.apartmentService.update(id, apartment)
  }

  @Delete('/:id')
  @Auth()
  async delete (@Params('id') id: MongoId): Promise<boolean> {
    return await this.apartmentService.delete(id)
  }
}
