import { MigrationInterface, QueryRunner } from "typeorm";
import { PaymentStatusTable } from "./table-definitions/payment_status.table";

export class CreateTablePaymentStatus1732995120199 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(PaymentStatusTable, true);
      }

      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(PaymentStatusTable);
      }

}
