import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { TrackEntity } from './track.entity';
import { CreateTrackDto, UpdateTrackDto } from './dto';
import { TrackEntityRepository } from './track.repository';

@Injectable()
export class TracksService {
  constructor(private readonly trackRepository: TrackEntityRepository) {}

  async create(createTrackDto: CreateTrackDto) {
    const track = await this.trackRepository.save(createTrackDto);
    return plainToClass(TrackEntity, track);
  }

  async findAll() {
    const tracks = await this.trackRepository.find();
    return tracks.map((track) => plainToClass(TrackEntity, track));
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOne({
      where: { id },
    } as any);

    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    return plainToClass(TrackEntity, track);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const existingTrack = await this.trackRepository.findOne({
      where: { id },
    } as any);

    if (!existingTrack) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    const updatedTrack = await this.trackRepository.save({
      ...existingTrack,
      ...updateTrackDto,
    });
    return plainToClass(TrackEntity, updatedTrack);
  }

  async remove(id: string) {
    const deleted = await this.trackRepository.delete(id);

    if (deleted.affected === 0) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
  }
}
