import { ApartmentController } from './apartment/apartment.controller'
import { AuthenticationController } from './authentication/authentication.controller'
import { UserController } from './user/user.controller'

export const controllers = [
  UserController,
  AuthenticationController,
  ApartmentController
]
