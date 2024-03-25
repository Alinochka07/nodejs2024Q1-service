import { Injectable } from '@nestjs/common';
import { FavoriteEntityType, FavoriteEntity } from './favorite.entity';
import { FavoriteNotFoundException } from './http-exceptions';
import { FavoriteRepository } from './favorite.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistEntity } from '../artists/artist.entity';
import { AlbumEntity } from '../albums/album.entity';
import { TrackEntity } from '../tracks/track.entity';
import { UserEntity } from '../users/user.entity';
import { ArtistEntityRepository } from '../artists/artist.repository';
import { AlbumEntityRepository } from '../albums/album.repository';
import { TrackEntityRepository } from '../tracks/track.repository';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoriteRepository)
    private readonly favoriteRepository: Repository<FavoriteEntity>,
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: ArtistEntityRepository,
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: AlbumEntityRepository,
    @InjectRepository(TrackEntity)
    private readonly trackRepository: TrackEntityRepository,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    return await this.favoriteRepository.find();
  }

  async addFavorite(type: FavoriteEntityType, id: string) {
    const favorite = new FavoriteEntity();

    switch (type) {
      case 'user':
        const user = await this.userRepository.findOne({ where: { id } });
        favorite.users = [user];
        break;
      case 'artist':
        const artist = await this.artistRepository.findOne({ where: { id } });
        favorite.artists = [artist];
        break;
      case 'album':
        const album = await this.albumRepository.findOne({ where: { id } });
        favorite.albums = [album];
        break;
      case 'track':
        const track = await this.trackRepository.findOne({ where: { id } });
        favorite.tracks = [track];
        break;
      default:
        throw new Error('Invalid favorite type');
    }
    const savedFavorite = await this.favoriteRepository.save(favorite);
    return {
      message: `${type} with id: ${id} successfully added to favorites`,
    };
  }

  async removeFavorite(type: FavoriteEntityType, id: string) {
    let condition: Record<string, unknown>;

    switch (type) {
      case 'artist':
        condition = { artists: { id } };
        break;
      case 'album':
        condition = { albums: { id } };
        break;
      case 'track':
        condition = { tracks: { id } };
        break;
      default:
        throw new Error('Invalid favorite type');
    }

    const deleted = await this.favoriteRepository.delete(condition);

    if (deleted.affected === 0) {
      throw new FavoriteNotFoundException(type);
    }

    return {
      message: `${type} with id: ${id} successfully removed from favorites`,
    };
  }
}
