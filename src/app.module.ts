import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { RedisModule } from './redis/redis.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CustomersModule } from './customers/customers.module';
import { ReportsModule } from './reports/reports.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(
      process.env.MONGO_URI ||
        'mongodb://localhost:27017/customer-indication',
    ),

    RedisModule,
    RabbitmqModule,

    CustomersModule,
    ReportsModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}