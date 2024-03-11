import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Login must be a string' })
  @IsNotEmpty({ message: 'Login should not be empty' })
  readonly login: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password should not be empty' })
  @MinLength(5, { message: 'Password must be at least 5 characters long' })
  readonly password: string;
}

export interface UpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
}
