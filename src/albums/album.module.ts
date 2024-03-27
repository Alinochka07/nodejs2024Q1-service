import { Module } from '@nestjs/common';
import { AlbumsService } from './album.service';
import { AlbumsController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity';
import { TracksModule } from '../tracks/track.module';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity]), TracksModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
