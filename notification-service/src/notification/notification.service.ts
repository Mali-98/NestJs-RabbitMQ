import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class NotificationService {
  @MessagePattern('user_created') // Listen to "user_created" event from RabbitMQ
  async handleUserCreatedEvent(data: any) {
    console.log('Received user_created event:', data);
    // You can send an email, push notification, etc.
    // For now, just log it as a placeholder
    console.log(`Sending notification to ${data.email}...`);
  }

  create(createNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }

  findAll() {
    return `This action returns all notification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
