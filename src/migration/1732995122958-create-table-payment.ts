import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { PaymentTable } from './table-definitions/payment.table';

export class CreateTablePayment1732995122958 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(PaymentTable, true);
        await queryRunner.createForeignKey(
            'payment',
            new TableForeignKey({
                columnNames: ['status_id'],
                referencedTableName: 'payment_status',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE', // Opcional: comportamento ao deletar um registro em payment_status
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(PaymentTable);
    }
}
