import { Module } from '@nestjs/common';
import { AlbumsService } from './album.service';
import { AlbumsController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity';
import { AlbumEntityRepository } from './album.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntityRepository])],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
