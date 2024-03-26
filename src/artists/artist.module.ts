import { Module } from '@nestjs/common';
import { ArtistsService } from './artist.service';
import { ArtistsController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './artist.entity';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
  controllers: [ArtistsController],
  providers: [ArtistsService, Repository<ArtistEntity>],
})
export class ArtistsModule {}
