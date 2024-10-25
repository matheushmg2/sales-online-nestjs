import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";
import { CityTable } from "./table-definitions/city.table";

export class CreateTableCity1729888352140 implements MigrationInterface {

    private stateForeignKey = new TableForeignKey({
        columnNames: ['state_id'],
        referencedTableName: 'state',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(CityTable, true);
        await queryRunner.createForeignKey('city', this.stateForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('city', this.stateForeignKey);
        await queryRunner.dropTable(CityTable);
    }
}
