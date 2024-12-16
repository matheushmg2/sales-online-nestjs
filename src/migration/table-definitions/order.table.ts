import { Table } from 'typeorm';

export const OrderTable = new Table({
    name: 'order',
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
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
        },
        {
            name: 'address_id',
            type: 'uuid',
            isNullable: false,
        },
        {
            name: 'date',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
        },
        {
            name: 'payment_id',
            type: 'uuid',
            isNullable: false,
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
    foreignKeys: [
        {
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
        },
        {
            columnNames: ['address_id'],
            referencedTableName: 'address',
            referencedColumnNames: ['id'],
        },
        {
            columnNames: ['payment_id'],
            referencedTableName: 'payment',
            referencedColumnNames: ['id'],
        },
    ],
});
