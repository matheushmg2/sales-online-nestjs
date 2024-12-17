import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from './payment.service';
import { PaymentEntity } from './entities/payment.entity';
import { PaymentStatusModule } from '../payment-status/payment-status.module';
import { ProductModule } from '../product/product.module';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity]), PaymentStatusModule, ProductModule, CartModule],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}