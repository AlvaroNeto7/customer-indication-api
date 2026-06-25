import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema({
  collection: 'customers',
  timestamps: false,
})
export class Customer {
  @Prop({ required: true })
  name!: string;

  @Prop({
    required: true,
    unique: true,
  })
  email!: string;

  @Prop({
    default: 'NORMAL',
  })
  type!: string;

  @Prop({
    default: null,
  })
  parent_customer_id?: string;

  @Prop({
    default: Date.now,
  })
  created_at!: Date;
}

export const CustomerSchema =
  SchemaFactory.createForClass(Customer);