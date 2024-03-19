import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Album } from 'src/albums/album.entity';
import { Artist } from 'src/artists/artist.entity';
import { Favorites } from 'src/favorites/favorite.entity';
import { Track } from 'src/tracks/track.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({
    description: 'UUID v4',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'john_doe' })
  @Column()
  login: string;

  @ApiHideProperty()
  @Exclude()
  @Column({ select: false })
  password: string;

  @ApiProperty({
    description: 'Integer number, increments on update',
    example: 1,
    type: 'integer',
  })
  @Column({ default: 1 })
  version: number;

  @ApiProperty({ description: 'Timestamp of creation', example: 1646880000 })
  @Column({
    type: 'bigint',
    default: () => 'EXTRACT(epoch FROM CURRENT_TIMESTAMP)',
  })
  createdAt: number;

  @ApiProperty({ description: 'Timestamp of last update', example: 1646881000 })
  @Column({
    type: 'bigint',
    default: () => 'EXTRACT(epoch FROM CURRENT_TIMESTAMP)',
  })
  updatedAt: number;

  @OneToMany(() => Album, (album) => album.user, { lazy: true })
  albums: Album[];

  @OneToMany(() => Artist, (artist) => artist.user, { lazy: true })
  artists: Artist[];

  @OneToMany(() => Track, (track) => track.user, { lazy: true })
  tracks: Track[];

  @OneToMany(() => Favorites, (favorites) => favorites.user, { lazy: true })
  favorites: Favorites[];
}
