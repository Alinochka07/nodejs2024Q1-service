import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FavoritesService } from './favorite.service';
import { FavoriteEntity, FavoriteEntityType } from './favorite.entity';
import { TrackEntity } from '../tracks/track.entity';
import { AlbumEntity } from '../albums/album.entity';
import { ArtistEntity } from '../artists/artist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all favorites',
    description: 'Retrieve a list of all favorites.',
  })
  @ApiResponse({
    status: 200,
    description: 'Get favorites',
    type: FavoriteEntity,
  })
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('/:type/:id')
  @ApiOperation({
    summary: 'Add item to favorites',
    description: 'Add an item to favorites.',
  })
  @ApiResponse({ status: 201, description: 'Add item to favorites' })
  @ApiResponse({ status: 400, description: 'Invalid id' })
  @ApiResponse({ status: 422, description: 'Item does not exist' })
  addItemToFavorites(
    @Param('type') type: FavoriteEntityType,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.favoritesService.addFavorite(type, id);
  }

  @Delete('/:type/:id')
  @ApiOperation({
    summary: 'Remove item from favorites',
    description: 'Remove an item from favorites.',
  })
  @ApiResponse({ status: 204, description: 'Remove item from favorites' })
  @ApiResponse({ status: 400, description: 'Invalid id' })
  @ApiResponse({ status: 404, description: 'Item not found in favorites' })
  @HttpCode(204)
  removeItemFromFavorites(
    @Param('type') type: FavoriteEntityType,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.favoritesService.removeFavorite(type, id);
  }
}
