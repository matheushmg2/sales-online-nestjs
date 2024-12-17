import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentStatusEntity } from './entities/payment-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentStatusService {
    constructor(
        @InjectRepository(PaymentStatusEntity)
        private readonly paymentStatusEntity: Repository<PaymentStatusEntity>,
    ) {}

    async findPaymentStatusByName(
        status: string,
    ) {
        const paymentStatus = await this.paymentStatusEntity.findOne({
            where: {
                name: status,
            },
        });

        if (!paymentStatus) {
            throw new NotFoundException('Payment Status Not Found');
        }

        return paymentStatus.id;
    }
}
