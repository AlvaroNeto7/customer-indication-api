import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitmqService implements OnModuleInit {
  private connection!: amqp.ChannelModel;
  private channel!: amqp.Channel;

  // Evita conexões simultâneas
  private connecting?: Promise<void>;

  async onModuleInit() {
    await this.connect();
  }

  private async connect(): Promise<void> {
    if (this.channel) {
      return;
    }

    // Se já existe uma conexão em andamento,
    // aguarda ela terminar.
    if (this.connecting) {
      return this.connecting;
    }

    this.connecting = (async () => {
      this.connection = await amqp.connect(
        process.env.RABBITMQ_URI!,
      );

      this.channel = await this.connection.createChannel();

      await this.channel.assertQueue(
        process.env.RABBITMQ_QUEUE!,
      );

      console.log('🐰 RabbitMQ conectado!');
    })();

    await this.connecting;

    this.connecting = undefined;
  }

  async getChannel() {
    await this.connect();
    return this.channel;
  }

  async publishCustomerCreated(event: {
    customer_id: string;
    parent_customer_id: string;
  }) {
    const channel = await this.getChannel();

    channel.sendToQueue(
      process.env.RABBITMQ_QUEUE!,
      Buffer.from(JSON.stringify(event)),
    );

    console.log('📨 Evento enviado para RabbitMQ');
  }
}