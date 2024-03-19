import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { DatabaseService } from '../db/db.service';
import { User } from '../users/users.entity';
import { CreateUserDto } from './dto';
import { UpdateUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly db: DatabaseService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.db.createUser(createUserDto);
    return plainToClass(User, user);
  }

  async getAll() {
    const users = await this.db.getAllUsers();
    return users.map((user) => plainToClass(User, user));
  }

  async getById(id: string) {
    const user = await this.db.getUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return plainToClass(User, user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { oldPassword, newPassword } = updateUserDto;
    const user = await this.db.getUser(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.password !== oldPassword) {
      throw new HttpException('Incorrect old password', HttpStatus.FORBIDDEN);
    }

    // const updatedUser: User = {
    //   ...user,
    //   password: newPassword,
    // };
    const updatedUser = { ...user, password: newPassword };
    const updatedUserFromDb = await this.db.updateUser(id, updatedUser);

    // const res = await this.db.updateUser(id, updatedUser);

    return plainToClass(User, updatedUserFromDb); // plainToClass(User, res);
  }

  async remove(id: string) {
    const deleted = await this.db.removeUser(id);
    if (!deleted) {
      throw new NotFoundException('User not found');
    }
  }
}
