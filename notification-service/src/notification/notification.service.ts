import { Injectable } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class NotificationService {
  constructor() {
  }

  printEvent(@Payload() data: any) {
    console.log('📥 Received user_created event:', data);
  }

  printReturnEvent(@Payload() data: any) {
    console.log('📥 Received users_returned event:', data);
  }
}
