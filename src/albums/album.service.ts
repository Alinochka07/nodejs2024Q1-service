import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AlbumEntity } from './album.entity';
import { CreateAlbumDto, UpdateAlbumDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    const album = await this.albumRepository.save(createAlbumDto);
    return plainToClass(AlbumEntity, album);
  }

  async findAll(): Promise<AlbumEntity[]> {
    const albums = await this.albumRepository.find();
    return albums.map((album) => plainToClass(AlbumEntity, album));
  }

  async findOne(id: string): Promise<AlbumEntity | null> {
    const album = await this.albumRepository.findOne({
      where: { id },
    });

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return plainToClass(AlbumEntity, album);
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    const album = await this.albumRepository.findOne({
      where: { id },
    });

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    Object.assign(album, updateAlbumDto);
    await this.albumRepository.save(album);
    return plainToClass(AlbumEntity, album);
  }

  async remove(id: string): Promise<void> {
    const album = await this.albumRepository.findOne({
      where: { id },
    });
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    await this.albumRepository.remove(album);
  }
}
