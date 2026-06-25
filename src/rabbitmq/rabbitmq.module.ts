import { Module } from '@nestjs/common';

import { RabbitmqService } from './rabbitmq.service';
import { Consumer } from './consumer';
import { ReportsModule } from '../reports/reports.module';

@Module({
  imports: [ReportsModule],

  providers: [
    RabbitmqService,
    Consumer,
  ],

  exports: [RabbitmqService],
})
export class RabbitmqModule {}