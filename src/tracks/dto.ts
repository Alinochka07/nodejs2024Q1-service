import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({ example: 'My track' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'UUID or null' })
  @IsNotEmpty()
  @IsOptional()
  artistId: any;

  @ApiProperty({ example: 'UUID or null' })
  @IsNotEmpty()
  @IsOptional()
  albumId: any;

  @ApiProperty({ example: 1444, type: 'integer' })
  @IsNotEmpty()
  @IsInt()
  duration: number;
}

export class UpdateTrackDto {
  @ApiProperty({ example: 'My Track' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'UUID or null' })
  @IsOptional()
  artistId: string | null;

  @ApiPropertyOptional({ example: 'UUID or null' })
  @IsOptional()
  albumId: string | null;

  @ApiProperty({ example: 777, type: 'integer' })
  @IsInt()
  duration: number;
}

export interface GetTrackDto {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}
