import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";
import { ProductTable } from "./table-definitions/product.table";

export class CreateTableProduct1730667805436 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Ativa a extensão "uuid-ossp" para geração de UUIDs, caso ainda não esteja ativa
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    
        // Cria a tabela 'product'
        await queryRunner.createTable(ProductTable, true);
    
        // Cria a chave estrangeira para 'category_id'
        await queryRunner.createForeignKey(
          'product',
          new TableForeignKey({
            columnNames: ['category_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'category',
            onDelete: 'CASCADE',  // Ajuste conforme a necessidade
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove a chave estrangeira antes de dropar a tabela
        const table = await queryRunner.getTable('product');
        const foreignKey = table.foreignKeys.find(
          fk => fk.columnNames.indexOf('category_id') !== -1,
        );
        if (foreignKey) await queryRunner.dropForeignKey('product', foreignKey);
    
        // Remove a tabela 'product'
        await queryRunner.dropTable(ProductTable);
      }

}
