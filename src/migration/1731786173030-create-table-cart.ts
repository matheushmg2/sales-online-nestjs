import { MigrationInterface, QueryRunner } from "typeorm";
import { CartTable } from "./table-definitions/cart.table";

export class CreateTableCart1731786173030 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(CartTable, true);
      }

      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(CartTable);
      }
}
