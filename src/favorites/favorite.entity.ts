import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { IsArray, IsIn, IsNotEmpty } from 'class-validator';
import { TrackEntity } from '../tracks/track.entity';
import { AlbumEntity } from '../albums/album.entity';
import { ArtistEntity } from '../artists/artist.entity';
import { UserEntity } from '../users/user.entity';

@Entity()
export class FavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => UserEntity)
  @JoinTable({ name: 'favorite_users' })
  users: UserEntity[];

  @ManyToMany(() => TrackEntity)
  @JoinTable({ name: 'favorite_tracks' })
  tracks: TrackEntity[];

  @ManyToMany(() => AlbumEntity)
  @JoinTable({ name: 'favorite_albums' })
  albums: AlbumEntity[];

  @ManyToMany(() => ArtistEntity)
  @JoinTable({ name: 'favorite_artists' })
  artists: ArtistEntity[];
}

// import { Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
// import { User } from '../users/user.entity';
// import { ArtistEntity } from '../artists/artist.entity';
// import { AlbumEntity } from '../albums/album.entity';
// import { TrackEntity } from '../tracks/track.entity';
// import { ApiProperty } from '@nestjs/swagger';
// import { IsIn } from 'class-validator';

// @Entity()
// export class FavoritesEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToMany(() => User, (user) => user.favorites)
//   user: User;

//   @ManyToMany(() => ArtistEntity)
//   artists: ArtistEntity[];

//   @ManyToMany(() => AlbumEntity)
//   albums: AlbumEntity[];

//   @ManyToMany(() => TrackEntity)
//   tracks: TrackEntity[];

// }

export class TypeParamDto {
  @IsIn(['track', 'album', 'artist', 'user'])
  type: string;
}

export type FavoriteEntityType = 'track' | 'artist' | 'album' | 'user';
