import { Module } from '@nestjs/common';
import { ArtistsService } from './artist.service';
import { ArtistsController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './artist.entity';
import { AlbumsModule } from 'src/albums/album.module';
import { TracksModule } from 'src/tracks/track.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArtistEntity]),
    AlbumsModule,
    TracksModule,
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
