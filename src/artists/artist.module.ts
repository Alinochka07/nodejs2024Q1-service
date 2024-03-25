import { Module } from '@nestjs/common';
import { ArtistsService } from './artist.service';
import { ArtistsController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './artist.entity';
import { ArtistEntityRepository } from './artist.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity, ArtistEntityRepository])],
  controllers: [ArtistsController],
  providers: [ArtistsService, ArtistEntityRepository],
  exports: [ArtistsService],
})
export class ArtistsModule {}
