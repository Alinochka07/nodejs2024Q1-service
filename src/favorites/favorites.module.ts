import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { DatabaseModule } from '../db/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from './favorite.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Favorites])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
