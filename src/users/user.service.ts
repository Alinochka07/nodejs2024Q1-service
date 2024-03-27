import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const newUser = this.userRepository.create({
        ...createUserDto,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      });
      const savedUser = await this.userRepository.save(newUser);
      return plainToClass(UserEntity, savedUser);
    } catch (error) {
      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll(): Promise<UserEntity[]> {
    try {
      const users = await this.userRepository.find();
      return users.map((user) => plainToClass(UserEntity, user));
    } catch (error) {
      throw new HttpException(
        'Failed to fetch users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(id: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return plainToClass(UserEntity, user);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    try {
      const { oldPassword, newPassword } = updateUserDto;
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      if (user.password !== oldPassword) {
        throw new HttpException('Incorrect old password', HttpStatus.FORBIDDEN);
      }

      user.password = newPassword;
      user.updatedAt = Date.now();
      const updatedUser = await this.userRepository.save(user);
      return plainToClass(UserEntity, updatedUser);
    } catch (error) {
      throw new HttpException(
        'Failed to update user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.userRepository.delete(id);

      if (result.affected === 0) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(
        'Failed to delete user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
