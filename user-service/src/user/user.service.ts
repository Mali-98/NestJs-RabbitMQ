import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  private client: ClientProxy;
  constructor(@Inject("USER_SERVICE") private rabbitClient: ClientProxy, @InjectRepository(User) private userRepo: Repository<User>) { }
  async createUser(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto); // Use DTO here
    const savedUser = await this.userRepo.save(user);
    this.rabbitClient.emit('user_created', savedUser); // Send event to RabbitMQ
    return savedUser;
  }

  async findAll() {
    const returnedUsers = await this.userRepo.find();
    this.rabbitClient.emit('users_returned', returnedUsers);
    return returnedUsers;
  }
}
