import { Injectable } from '@nestjs/common';
import { FavoriteEntityType, FavoriteEntity } from './favorite.entity';
import { FavoriteNotFoundException } from './http-exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistsService } from '../artists/artist.service';
import { AlbumsService } from '../albums/album.service';
import { TracksService } from '../tracks/track.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private readonly favoriteRepository: Repository<FavoriteEntity>,
    private readonly artistService: ArtistsService,
    private readonly albumService: AlbumsService,
    private readonly trackService: TracksService,
  ) {}

  async findAll(): Promise<FavoriteEntity[]> {
    return await this.favoriteRepository.find();
  }

  async addFavorite(
    type: FavoriteEntityType,
    id: string,
  ): Promise<{ message: string }> {
    try {
      // Retrieve the entity based on the provided type and id
      const entity = await this.getEntity(type, id);

      // Create a new FavoriteEntity instance and assign the entity to it
      const favorite = new FavoriteEntity();
      favorite[type + 's'] = [entity];

      await this.favoriteRepository.save(favorite);

      return {
        message: `${type} with id: ${id} successfully added to favorites`,
      };
    } catch (error) {
      console.error(`Error adding favorite: ${error}`);
      throw new Error(`Failed to add ${type} with id: ${id} to favorites`);
    }
  }

  async removeFavorite(
    type: FavoriteEntityType,
    id: string,
  ): Promise<{ message: string }> {
    const condition = { [type + 's']: { id } };

    const deleted = await this.favoriteRepository.delete(condition);

    if (deleted.affected === 0) {
      throw new FavoriteNotFoundException(type);
    }

    return {
      message: `${type} with id: ${id} successfully removed from favorites`,
    };
  }

  private async getEntity(type: FavoriteEntityType, id: string): Promise<any> {
    if (type === 'artist') {
      return await this.artistService.findOne(id);
    } else if (type === 'album') {
      return await this.albumService.findOne(id);
    } else if (type === 'track') {
      return await this.trackService.findOne(id);
    }
    throw new Error('Invalid favorite type');
  }
}
