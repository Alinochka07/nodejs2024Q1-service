import { Injectable, HttpException, HttpStatus, Req } from '@nestjs/common';
import { User } from './user.interface';
import { CreateUserDto, UpdatePasswordDto } from './dto';
import { v4 as uuidv4 } from 'uuid';

const disableAuthChecks = false;

@Injectable()
export class UsersService {
  private users: User[] = [];

  isAuthenticated(req: any): boolean {
    return disableAuthChecks || this.originalIsAuthenticated(req);
  }
  isAuthorized(_req: any): boolean {
    return true;
  }

  originalIsAuthenticated(req: any): boolean {
    const token = req?.headers?.authorization;
    return token !== undefined;
  }

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

  getById(@Req() req: any, id: string): User | undefined {
    console.log('Received ID from URL:', id);

    if (!this.isAuthenticated(req)) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    if (!this.isUuid(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }

    const user = this.users.find((us) => us.id === id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return {
      ...user,
      password: undefined,
    };
  }

  private isUuid(id: string): boolean {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  }

  create(req: any, createUserDto: CreateUserDto): User {
    if (!this.isAuthenticated(req)) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    if (!this.isAuthorized(req) && !disableAuthChecks) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const forbiddenKeyword = 'password';

    if (createUserDto.password.toLowerCase().includes(forbiddenKeyword)) {
      throw new HttpException(
        'The password should not contain the word "password"',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser: User = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(newUser);
    return {
      ...newUser,
      password: undefined,
    };
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
