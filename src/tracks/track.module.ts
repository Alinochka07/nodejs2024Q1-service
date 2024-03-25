import { Module } from '@nestjs/common';
import { TracksService } from './track.service';
import { TracksController } from './track.controller';
// import { DatabaseModule } from '../db/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './track.entity';
import { TrackEntityRepository } from './track.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity, TrackEntityRepository])],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
