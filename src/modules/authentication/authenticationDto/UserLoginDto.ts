import { IsNotEmpty, IsString, Max, Min } from 'class-validator'

export class UserLoginDto {
  @IsNotEmpty()
  @IsString()
  username: string

  @IsNotEmpty()
  @IsString()
  @Min(6)
  password: string
}
