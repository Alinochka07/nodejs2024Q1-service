import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AlbumEntity } from '../albums/album.entity';

@Entity()
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'UUID v4',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  id: string;

  @Column()
  @ApiProperty({ description: 'Artist name', example: 'Anders Trentemoller' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column()
  @ApiProperty({ description: 'Has Grammy award', example: true })
  grammy: boolean;

  @ApiProperty({
    description: 'Album of the artist',
    enum: () => AlbumEntity,
  })
  album?: AlbumEntity;
}
