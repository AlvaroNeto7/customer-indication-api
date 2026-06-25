import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  parent_customer_id?: string;
}