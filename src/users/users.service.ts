import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './user.interface';
import { CreateUserDto, UpdatePasswordDto } from './dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAll(): User[] {
    return this.users;
  }

  notUuid(id: string) {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    if (!uuidRegex.test(id)) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }
  }

  getById(id: string): User {
    this.notUuid(id);
    const user = this.users.find((us) => us.id === id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    return newUser;
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto): User {
    this.notUuid(id);
    const userIndex = this.users.findIndex((us) => us.id === id);
    if (userIndex === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const user = this.users[userIndex];

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
    }
    user.password = updatePasswordDto.newPassword;
    user.version++;
    user.updatedAt = Date.now();

    this.users[userIndex] = user;
    return user;
  }

  delete(id: string): void {
    this.notUuid(id);
    const userIndex = this.users.findIndex((us) => us.id === id);
    if (userIndex === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    this.users.splice(userIndex, 1);
  }
}
