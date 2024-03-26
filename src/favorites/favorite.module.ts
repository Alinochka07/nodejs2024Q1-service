import { Module } from '@nestjs/common';
import { FavoritesService } from './favorite.service';
import { FavoritesController } from './favorite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteEntity } from './favorite.entity';
import { ArtistsModule } from '../artists/artist.module';
import { AlbumsModule } from '../albums/album.module';
import { TracksModule } from '../tracks/track.module';
import { UsersModule } from '../users/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoriteEntity]),
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    UsersModule,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
