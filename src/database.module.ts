import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntityRepository } from './albums/album.repository';
import { ArtistEntityRepository } from './artists/artist.repository';
import { TrackEntityRepository } from './tracks/track.repository';
import { UserEntityRepository } from './users/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AlbumEntityRepository,
      ArtistEntityRepository,
      TrackEntityRepository,
      UserEntityRepository,
    ]),
  ],
  exports: [TypeOrmModule],
  providers: [ArtistEntityRepository],
})
export class DatabaseModule {}
