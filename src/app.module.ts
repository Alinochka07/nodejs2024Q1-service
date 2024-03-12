import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/albums.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [UsersModule, AlbumsModule, ArtistsModule],
})
export class AppModule {}
