import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto';
import { UpdateUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create(createUserDto);
    const user = await this.userRepository.save(newUser);
    return plainToClass(UserEntity, user);
  }

  async getAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    return users.map((user) => plainToClass(UserEntity, user));
  }

  async getById(id: string): Promise<UserEntity> {
    const user: UserEntity | undefined = await this.userRepository.findOne({
      where: { id },
    } as any);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return plainToClass(UserEntity, user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const { oldPassword, newPassword } = updateUserDto;
    const user = await this.userRepository.findOne({
      where: { id },
    } as any);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== oldPassword) {
      throw new HttpException('Incorrect old password', HttpStatus.FORBIDDEN);
    }

    user.password = newPassword;
    const updatedUser = await this.userRepository.save(user);
    return plainToClass(UserEntity, updatedUser);
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.userRepository.delete(id);
    if (deleted.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }
}
