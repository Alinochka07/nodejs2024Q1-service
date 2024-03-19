import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { Album } from '../albums/album.entity';
import { Artist } from '../artists/artist.entity';
import { Track } from '../tracks/track.entity';
import { ManyToOne } from 'typeorm';
import { User } from 'src/users/users.entity';

export class Favorites {
  @ApiProperty({ type: [Artist] })
  artists: Artist[];

  @ApiProperty({ type: [Album] })
  albums: Album[];

  @ApiProperty({ type: [Track] })
  tracks: Track[];

  @ManyToOne(() => User, { lazy: true })
  user: User;

  @ManyToOne(() => Artist, { lazy: true })
  artist: Artist;

  @ManyToOne(() => Album, { lazy: true })
  album: Album;

  @ManyToOne(() => Track, { lazy: true })
  track: Track;
}

export class TypeParamDto {
  @IsIn(['track', 'album', 'artist'])
  type: string;
}

export type FavoriteEntityType = 'track' | 'artist' | 'album';
