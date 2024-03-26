import { Module } from '@nestjs/common';
import { TracksService } from './track.service';
import { TracksController } from './track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity])],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
