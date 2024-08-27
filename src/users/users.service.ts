import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async listAllUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async createUser(inputDto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.save(inputDto);

    return user;
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async updateUser(inputDto: UpdateUserDto, id: string): Promise<User> {
    const toUpdate = await this.usersRepository.findOne({ where: { id } });
    const updated = Object.assign(toUpdate, inputDto);

    return await this.usersRepository.save(updated);
  }

  async deleteUser(user: User): Promise<void> {
    await this.usersRepository.delete(user.id);
  }
}
