import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { AlbumEntity } from '../albums/album.entity';
import { ApiProperty } from '@nestjs/swagger';

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

  // @OneToMany(() => AlbumEntity, (album) => album.artist) // OneToMany relationship with Album
  // albums: AlbumEntity[];
}

// import { ApiProperty } from '@nestjs/swagger';
// import {
//   Column,
//   Entity,
//   ManyToMany,
//   ManyToOne,
//   OneToMany,
//   PrimaryGeneratedColumn,
// } from 'typeorm';
// import { User } from 'src/users/user.entity';

// @Entity()
// export class ArtistEntity {
//   @ApiProperty({
//     description: 'UUID v4',
//     example: '550e8400-e29b-41d4-a716-446655440001',
//   })
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @ApiProperty({ description: 'Artist name', example: 'Anders Trentemoller' })
//   @Column()
//   name: string;

//   @ApiProperty({ description: 'Has Grammy award', example: true })
//   @Column()
//   grammy: boolean;

//   @ManyToMany(() => User, (user) => user.artists, { lazy: true })
//   users: User[];
// }
