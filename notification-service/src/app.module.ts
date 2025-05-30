import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://root:example@localhost:27017/notifications?authSource=admin'), NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
