import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({ example: 'My Album' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 2004 })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiPropertyOptional({
    example: '485464fe-4c01-4734-b735-b0664f69bb6a',
    nullable: true,
  })
  artistId: string | null;
}

export class UpdateAlbumDto {
  @ApiProperty({ example: 'My album' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 2004 })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiPropertyOptional({
    example: '485464fe-4c01-4734-b735-b0664f69bb6a',
    nullable: true,
  })
  artistId: string | null;
}

export interface GetAlbumDto {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null;
}
