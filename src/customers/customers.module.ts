import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from '../redis/redis.module';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

import {
  Customer,
  CustomerSchema,
} from './schemas/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
    ]),

    RedisModule,
    RabbitmqModule,
  ],

  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}