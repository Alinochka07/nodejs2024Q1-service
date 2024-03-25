import { HttpException, HttpStatus } from '@nestjs/common';
import { FavoriteEntityType, FavoriteEntity } from './favorite.entity';

export class FavoriteNotFoundException extends HttpException {
  constructor(private readonly favoriteType: FavoriteEntityType) {
    super(`Favorite not found: ${favoriteType}`, HttpStatus.NOT_FOUND);
  }
}

export class EntityNotFoundException extends HttpException {
  constructor(entityType: FavoriteEntity) {
    super(`${entityType} not found`, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
