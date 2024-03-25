import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserEntityRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserEntityRepository])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
