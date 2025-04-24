import { Injectable } from '@nestjs/common';
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
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'user_queue',
        queueOptions: { durable: false },
      },
    });
  }
  async createUser(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto); // Use DTO here
    const savedUser = await this.userRepo.save(user);
    this.client.emit('user_created', savedUser); // Send event to RabbitMQ
    return savedUser;
  }
}
