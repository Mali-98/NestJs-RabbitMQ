import { Injectable } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './entities/notification.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
  ) { }

  printEvent(@Payload() data: any) {
    console.log('📥 Received user_created event:', data);
  }

  async printReturnEvent(@Payload() data: any) {
    //console.log('📥 Received users_returned event:', data);
    // Save to MongoDB
    await this.notificationModel.create({
      email: data[0].email,
      message: `Welcome, Users!`,
    });

  }
}
