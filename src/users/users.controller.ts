import {
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  Req,
  UnauthorizedException,
  ForbiddenException,
  Res,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdatePasswordDto } from './dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAll();
  }

  @Get(':id')
  getUserById(@Req() req: Request, @Param('id') id: string) {
    return this.usersService.getById(req, id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(
    @Req() req: Request,
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ) {
    console.log('Received request body:', createUserDto);
    return this.usersService.create(req, createUserDto);
  }

  @Put(':id')
  updateUserPassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(id, updatePasswordDto);
  }

  @Delete(':id')
  async deleteUser(@Req() req: Request, @Param('id') id: string) {
    if (!this.isAuthenticated(req)) {
      throw new UnauthorizedException('Unauthorized');
    }
    if (!this.isAuthorized(req)) {
      throw new ForbiddenException('Forbidden');
    }

    await this.usersService.delete(id);
    return HttpStatus.NO_CONTENT;
  }

  private isAuthenticated(req: Request): boolean {
    return true;
  }

  private isAuthorized(req: Request): boolean {
    return true;
  }
}
