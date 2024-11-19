import { MigrationInterface, QueryRunner } from "typeorm";
import { CartProductTable } from "./table-definitions/cart-product.table";

export class CreateTableCartProduct1731794587358 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(CartProductTable, true);
      }

      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(CartProductTable);
      }

}
