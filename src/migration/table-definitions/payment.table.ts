import { Table } from 'typeorm';

export const PaymentTable = new Table({
    name: 'payment',
    columns: [
        {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
        },
        {
            name: 'status_id',
            type: 'uuid',
            isNullable: false,
        },
        {
            name: 'price',
            type: 'double precision',
            isNullable: false,
        },
        {
            name: 'discount',
            type: 'double precision',
            isNullable: false,
        },
        {
            name: 'final_price',
            type: 'double precision',
            isNullable: false,
        },
        {
            name: 'type',
            type: 'varchar',
            isNullable: false,
        },
        {
            name: 'amount_payments',
            type: 'integer',
            isNullable: false,
        },
        {
            name: 'code',
            type: 'varchar',
            isNullable: false,
        },
        {
            name: 'date_payment',
            type: 'timestamp',
            isNullable: true,
        },
        {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
        },
        {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
        },
    ],
});
