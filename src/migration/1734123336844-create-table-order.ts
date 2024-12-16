import { MigrationInterface, QueryRunner } from 'typeorm';
import { OrderTable } from './table-definitions/order.table';

export class CreateTableOrder1734123336844 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(OrderTable, true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(OrderTable);
    }
}
