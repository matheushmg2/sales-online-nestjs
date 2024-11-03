import { MigrationInterface, QueryRunner } from "typeorm";
import { CategoryTable } from "./table-definitions/category.table";

export class CreateTableCategory1730667792072 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(CategoryTable, true);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(CategoryTable);
      }

}
