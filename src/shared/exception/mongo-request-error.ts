import { ErrorReponseData } from '../interfaces/exceptionError.interface'

export class MongoRequestError extends Error {
  constructor (
    readonly message: string = 'Mongo Request Error!',
    readonly statusCode: number = 400,
    readonly code?: string
  ) {
    super()
    this.message = message
    this.statusCode = statusCode
    this.code = code
  }

  toResponseError (): ErrorReponseData {
    return {
      code: this.code,
      message: this.message,
      statusCode: this.statusCode
    }
  }
}
