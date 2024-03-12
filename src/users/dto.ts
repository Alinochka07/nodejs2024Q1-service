import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'User1' })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  password: string;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'OldPassword' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  oldPassword: string;

  @ApiProperty({ example: 'NewPassword' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  newPassword: string;
}

export interface GetUserDto {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
