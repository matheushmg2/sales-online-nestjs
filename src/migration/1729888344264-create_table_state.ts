import { MigrationInterface, QueryRunner } from "typeorm";
import { StateTable } from "./table-definitions/state.table";

export class CreateTableState1729888344264 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(StateTable, true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(StateTable);
    }
}
