import { MigrationInterface, QueryRunner } from "typeorm";
import { UsersTable } from "./table-definitions/user.table";

export class CreateTableUser1729882106432 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(UsersTable, true);
      }

      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(UsersTable);
      }

}
