import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Report,
  ReportDocument,
} from './schemas/report.schema';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report.name)
    private readonly reportModel: Model<ReportDocument>,
  ) {}

  async incrementIndication(customerId: string) {
    const report = await this.reportModel.findOne({
      customer_id: customerId,
    });

    if (!report) {
      return this.reportModel.create({
        customer_id: customerId,
        total_indications: 1,
      });
    }

    report.total_indications++;

    return report.save();
  }

  async findAll() {
    return this.reportModel.find();
  }
}