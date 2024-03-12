import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { DatabaseService } from '../db/db.service';
import { Track } from './track.entity';
import { CreateTrackDto, UpdateTrackDto } from './dto';

@Injectable()
export class TracksService {
  constructor(private readonly db: DatabaseService) {}

  async create(createTrackDto: CreateTrackDto) {
    const track = await this.db.createTrack(createTrackDto);

    return plainToClass(Track, track);
  }

  async findAll() {
    const tracks = await this.db.getAllTracks();

    return tracks.map((track) => plainToClass(Track, track));
  }

  async findOne(id: string) {
    const track = await this.db.getTrack(id);

    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    return plainToClass(Track, track);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.db.getTrack(id);

    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    const updatedTrack: Track = {
      ...track,
      ...updateTrackDto,
    };

    const res = await this.db.updateTrack(id, updatedTrack);

    return plainToClass(Track, res);
  }

  async remove(id: string) {
    const res = await this.db.removeTrack(id);

    if (!res) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
  }
}
