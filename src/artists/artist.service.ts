import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ArtistEntity } from './artist.entity';
import { CreateArtistDto, UpdateArtistDto } from './dto';
import { ArtistEntityRepository } from './artist.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntityRepository)
    private readonly artistRepository: ArtistEntityRepository,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const artist = await this.artistRepository.create(createArtistDto);
    return plainToClass(ArtistEntity, artist);
  }

  async findAll(): Promise<ArtistEntity[]> {
    const artists = await this.artistRepository.find();
    return artists.map((artist) => plainToClass(ArtistEntity, artist));
  }

  async findOne(id: string): Promise<ArtistEntity> {
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
    const artist = await this.artistRepository.findOne({ where: { id } });

    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    Object.assign(artist, updateArtistDto);
    await this.artistRepository.save(artist);
    return plainToClass(ArtistEntity, artist);
  }

  async remove(id: string): Promise<void> {
    const artist = await this.artistRepository.findOne({
      where: { id },
    });
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    await this.artistRepository.remove(artist);
  }
}
