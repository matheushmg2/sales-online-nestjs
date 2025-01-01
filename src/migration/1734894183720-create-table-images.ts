import { MigrationInterface, QueryRunner } from "typeorm";
import { ImagesTable } from "./table-definitions/image.table";

export class CreateTableImages1734894183720 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(ImagesTable, true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(ImagesTable);
    }

}
