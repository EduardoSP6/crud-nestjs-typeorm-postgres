import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async listAllUsers(@Res() response: Response) {
    const users = await this.usersService.listAllUsers();

    if (users.length === 0)
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);

    return response.status(200).json(users);
  }

  @Post()
  async createUser(@Res() response: Response, @Body() inputDto: CreateUserDto) {
    const user = await this.usersService.createUser(inputDto);
    return response.status(201).json(user);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() inputDto: UpdateUserDto) {
    return await this.usersService.updateUser(inputDto, id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.usersService.deleteUser(user);
  }
}
