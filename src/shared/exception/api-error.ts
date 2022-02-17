import { ErrorReponseData } from '../interfaces/exceptionError.interface'

export class ApiError extends Error {
  constructor (
    readonly message: string = 'Internal Server Error!',
    readonly statusCode: number = 500
  ) {
    super()
    this.message = message
    this.statusCode = statusCode
  }

  toResponseError (): ErrorReponseData {
    return {
      message: this.message,
      statusCode: this.statusCode
    }
  }
}
