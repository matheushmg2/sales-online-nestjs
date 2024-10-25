import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";
import { AddressTable } from "./table-definitions/address.table";

export class CreateTableAddress1729888357078 implements MigrationInterface {

    private userForeignKey = new TableForeignKey({
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
    });

    private cityForeignKey = new TableForeignKey({
        columnNames: ['city_id'],
        referencedTableName: 'city',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(AddressTable, true);
        await queryRunner.createForeignKeys('address', [this.userForeignKey, this.cityForeignKey]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKeys('address', [this.userForeignKey, this.cityForeignKey]);
        await queryRunner.dropTable(AddressTable);
    }
}
