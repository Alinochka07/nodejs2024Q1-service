import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'UUID v4',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'john_doe' })
  @IsNotEmpty()
  @IsString()
  login: string;

  @Column()
  @ApiHideProperty()
  @Exclude()
  @IsNotEmpty()
  @MinLength(3)
  password: string;

  @Column({ default: 0 })
  @ApiProperty({
    description: 'Integer number, increments on update',
    example: 1,
  })
  version: number;

  @Column({ type: 'bigint' })
  @ApiProperty({ description: 'Timestamp of creation', example: 1646880000 })
  createdAt: number;

  @Column({
    type: 'bigint',
    default: () => 'EXTRACT(epoch FROM CURRENT_TIMESTAMP) * 1000',
  })
  updatedAt: number | null;
}

// import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
// import { Exclude } from 'class-transformer';
// import { AlbumEntity } from 'src/albums/album.entity';
// import { ArtistEntity } from 'src/artists/artist.entity';
// import { FavoritesEntity } from 'src/favorites/favorite.entity';
// import { TrackEntity } from 'src/tracks/track.entity';
// import {
//   Column,
//   Entity,
//   ManyToMany,
//   OneToMany,
//   PrimaryGeneratedColumn,
// } from 'typeorm';

// @Entity()
// export class User {
//   @ApiProperty({
//     description: 'UUID v4',
//     example: '550e8400-e29b-41d4-a716-446655440000',
//   })
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @ApiProperty({ example: 'john_doe' })
//   @Column()
//   login: string;

//   @ApiHideProperty()
//   @Exclude()
//   @Column({ select: false })
//   password: string;

//   @ApiProperty({
//     description: 'Integer number, increments on update',
//     example: 1,
//     type: 'integer',
//   })
//   @Column({ default: 1 })
//   version: number;

//   @ApiProperty({ description: 'Timestamp of creation', example: 1646880000 })
//   @Column({
//     type: 'timestamp with time zone',
//     default: 'now()',
//   })
//   createdAt: number;

//   @ApiProperty({ description: 'Timestamp of last update', example: 1646881000 })
//   @Column({
//     type: 'timestamp with time zone',
//     default: 'now()',
//   })
//   updatedAt: number;

//   @OneToMany(() => AlbumEntity, (album) => album.user, { lazy: true })
//   albums: AlbumEntity[];

//   @ManyToMany(() => ArtistEntity, (artist) => artist.users, { lazy: true })
//   artists: ArtistEntity[];

//   @OneToMany(() => TrackEntity, (track) => track.user, { lazy: true })
//   tracks?: TrackEntity[];

//   @OneToMany(() => FavoritesEntity, (favorite) => favorite.user, { lazy: true })
//   favorites?: FavoritesEntity[];
// }
