import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { DatabaseService } from '../db/db.service';
import { Artist } from './artist.entity';
import { CreateArtistDto, UpdateArtistDto } from './dto';

@Injectable()
export class ArtistsService {
  constructor(private readonly db: DatabaseService) {}

  async create(createArtistDto: CreateArtistDto) {
    const artist = await this.db.createArtist(createArtistDto);

    return plainToClass(Artist, artist);
  }

  async findAll() {
    const artists = await this.db.getAllArtists();

    return artists.map((artist) => plainToClass(Artist, artist));
  }

  async findOne(id: string) {
    const artist = await this.db.getArtist(id);

    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return plainToClass(Artist, artist);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.db.getArtist(id);

    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    const updatedArtist: Artist = {
      ...artist,
      ...updateArtistDto,
    };

    const res = await this.db.updateArtist(id, updatedArtist);

    return plainToClass(Artist, res);
  }

  async remove(id: string) {
    const res = await this.db.removeArtist(id);

    if (!res) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
  }
}
