import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReportDocument = HydratedDocument<Report>;

@Schema({
  timestamps: {
    createdAt: false,
    updatedAt: 'updated_at',
  },
})
export class Report {
  @Prop({
    required: true,
    unique: true,
  })
  customer_id!: string;

  @Prop({
    default: 0,
  })
  total_indications!: number;
}

export const ReportSchema =
  SchemaFactory.createForClass(Report);