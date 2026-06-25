import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RedisService } from '../redis/redis.service';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';

import { CreateCustomerDto } from './dto/create-customer.dto';
import {
  Customer,
  CustomerDocument,
} from './schemas/customer.schema';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>,

    private readonly redisService: RedisService,

    private readonly rabbitmqService: RabbitmqService,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const redis = this.redisService.getClient();

    // Validação do customer indicador (Cache Aside)
    if (createCustomerDto.parent_customer_id) {
      const cacheKey = `customer:${createCustomerDto.parent_customer_id}`;

      const parentCache = await redis.get(cacheKey);

      if (parentCache) {
        console.log('✅ Parent encontrado no Redis');
      } else {
        const parent = await this.customerModel.findById(
          createCustomerDto.parent_customer_id,
        );

        if (!parent) {
          throw new BadRequestException(
            'Parent customer não encontrado',
          );
        }

        await redis.set(
          cacheKey,
          JSON.stringify(parent),
        );

        console.log('✅ Parent salvo no Redis');
      }
    }

    // Cria o customer
    const customer = await this.customerModel.create(
      createCustomerDto,
    );

    // Salva o customer no Redis
    await redis.set(
      `customer:${customer.id}`,
      JSON.stringify(customer),
    );

    console.log('✅ Customer salvo no Redis');

    // Publica evento somente se houver indicação
    if (customer.parent_customer_id) {
      await this.rabbitmqService.publishCustomerCreated({
        customer_id: customer.id,
        parent_customer_id: customer.parent_customer_id,
      });
    }

    return customer;
  }
}