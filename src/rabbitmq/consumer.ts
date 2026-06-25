import { Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { ReportsService } from '../reports/reports.service';

@Injectable()
export class Consumer implements OnModuleInit {
  constructor(
    private readonly rabbitmqService: RabbitmqService,
    private readonly reportsService: ReportsService,
  ) {}

  async onModuleInit() {
    const channel = await this.rabbitmqService.getChannel();

    await channel.consume(
      'customer.created',
      async (message) => {
        if (!message) return;

        const event = JSON.parse(
          message.content.toString(),
        );

        console.log('📥 Evento recebido:', event);

        await this.reportsService.incrementIndication(
          event.parent_customer_id,
        );

        channel.ack(message);
      },
    );

    console.log('👂 Consumer iniciado');
  }
}