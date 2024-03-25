import { Module } from '@nestjs/common';
import { FavoritesService } from './favorite.service';
import { FavoritesController } from './favorite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteRepository } from './favorite.repository';
import { ArtistEntityRepository } from '../artists/artist.repository';
import { TrackEntityRepository } from '../tracks/track.repository';
import { AlbumEntityRepository } from '../albums/album.repository';
import { UserEntityRepository } from '../users/user.repository';
import { ArtistsModule } from 'src/artists/artist.module';
import { ArtistsService } from 'src/artists/artist.service';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteRepository])],
  controllers: [FavoritesController],
  providers: [FavoritesService, , FavoriteRepository],
  exports: [FavoritesService],
})
export class FavoritesModule {}
