import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ArtistEntity } from './artist.entity';
import { CreateArtistDto, UpdateArtistDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const artist = this.artistRepository.create(createArtistDto);
    await this.artistRepository.save(artist);
    return plainToClass(ArtistEntity, artist);
  }

  async findAll(): Promise<ArtistEntity[]> {
    const artists = await this.artistRepository.find();
    return artists.map((artist) => plainToClass(ArtistEntity, artist));
  }

  async findOne(id: string): Promise<ArtistEntity | undefined> {
    const artist = await this.artistRepository.findOne({ where: { id } });

    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return plainToClass(ArtistEntity, artist);
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    const artist = await this.findOne(id);

    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    await this.artistRepository.update(id, updateArtistDto);

    return plainToClass(ArtistEntity, { ...artist, ...updateArtistDto });
  }

  async remove(id: string): Promise<void> {
    const result = await this.artistRepository.delete(id);

    if (result.affected === 0) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
  }
}
