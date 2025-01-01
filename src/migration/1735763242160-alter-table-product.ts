import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableProduct1735763242160 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'product',
            new TableColumn({
                name: 'image_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.query(`
            UPDATE product
            SET image_id = gen_random_uuid()
        `);

        await queryRunner.changeColumn(
            'product',
            'image_id',
            new TableColumn({
                name: 'image_id',
                type: 'uuid',
                isNullable: false,
            }),
        );

        await queryRunner.dropColumn('product', 'image');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'product',
            new TableColumn({
                name: 'image',
                type: 'varchar',
                isNullable: false,
            }),
        );

        await queryRunner.dropColumn('product', 'image_id');
    }
}
