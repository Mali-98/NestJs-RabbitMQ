import { Injectable } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class NotificationService {
  constructor() {
    console.log('🚨 NotificationService initialized'); // Make sure this appears
  }

  @EventPattern('user_created')
  handleUserCreatedEvent(@Payload() data: any) {
    console.log('📥 Received user_created event:', data);
    console.log(`📢 Sending notification to ${data.email}...`);
  }
}
