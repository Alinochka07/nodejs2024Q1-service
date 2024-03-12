import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({ example: 'Adele' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: true })
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}

export class UpdateArtistDto {
  @ApiProperty({ example: 'Adele' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: true })
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}

export interface GetArtistDto {
  id: string;
  name: string;
  grammy: boolean;
}
