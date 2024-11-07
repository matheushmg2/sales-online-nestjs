import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { ProductTable } from './table-definitions/product.table';

export class CreateTableProduct1730667805436 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.createTable(ProductTable, true);

        await queryRunner.createForeignKey(
            'product',
            new TableForeignKey({
                columnNames: ['category_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'category',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('product');
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('category_id') !== -1,
        );
        if (foreignKey) await queryRunner.dropForeignKey('product', foreignKey);

        await queryRunner.dropTable(ProductTable);
    }
}
