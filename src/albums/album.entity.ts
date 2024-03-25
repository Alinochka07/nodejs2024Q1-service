import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ArtistEntity } from '../artists/artist.entity';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'UUID v4',
    example: '485464fe-4c01-4734-b735-b0664f69bb6a',
  })
  id: string;

  @Column()
  @ApiProperty({ description: 'Album name', example: 'My Album' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Year the album was released', example: 2010 })
  year: number | null;

  @ApiProperty({
    description: 'UUID v4 [Ref to Artist]',
    example: '485464fe-4c01-4734-b735-b0664f69bb6a',
    nullable: true,
  })
  @ApiProperty({
    description: 'Artist of the album (through Artist.albums)',
    enum: () => ArtistEntity,
  })
  artist?: ArtistEntity;
}

// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// import { ArtistEntity } from 'src/artists/artist.entity';
// import { User } from 'src/users/user.entity';
// import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// @Entity()
// export class AlbumEntity {
//   @ApiProperty({
//     description: 'UUID v4',
//     example: '485464fe-4c01-4734-b735-b0664f69bb6a',
//   })
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @ApiProperty({ description: 'Album name', example: 'My Album' })
//   @Column()
//   name: string;

//   @ApiProperty({ description: 'Description to Album', example: 2010 })
//   @Column()
//   year: number;

//   @ApiProperty({
//     description: 'UUID v4 [Ref to Artist]',
//     example: '485464fe-4c01-4734-b735-b0664f69bb6a',
//     nullable: true,
//   })
//   artistId: string | null;

//   @ManyToOne(() => User, (user) => user.albums, { lazy: true })
//   @ApiProperty({ enum: () => User })
//   user: User;
// }
