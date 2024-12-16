import { Table } from 'typeorm';

export const OrderProductTable = new Table({
    name: 'order_product',
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
            name: 'order_id',
            type: 'uuid',
            isNullable: false,
        },
        {
            name: 'product_id',
            type: 'uuid',
            isNullable: false,
        },
        {
            name: 'amount',
            type: 'integer',
            isNullable: false,
        },
        {
            name: 'price',
            type: 'integer',
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
            columnNames: ['order_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'order',
            onDelete: 'CASCADE',
        },
        {
            columnNames: ['product_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'product',
            onDelete: 'CASCADE',
        },
    ],
});
