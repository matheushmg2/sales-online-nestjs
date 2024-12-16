import { MigrationInterface, QueryRunner } from 'typeorm';
import { OrderProductTable } from './table-definitions/order_product.table';

export class CreateTableOrderProduct1734123352417
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(OrderProductTable, true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(OrderProductTable);
    }
}
