import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableUnique,
} from 'typeorm';

export class AlterTableUser1730325629455 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Adicionar a coluna type_user
        await queryRunner.changeColumn(
            'users',
            'type_user',
            new TableColumn({
                name: 'type_user',
                type: 'varchar',
                isNullable: false,
            }),
        );
    
        // Verifique se a restrição já existe antes de criar
        const hasUniqueConstraint = await queryRunner.hasColumn('users', 'email');
    
        if (!hasUniqueConstraint) {
          await queryRunner.createUniqueConstraint('users', new TableUnique({
            columnNames: ['email'],
          }));
        }
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropUniqueConstraint('users', 'UQ_email'); // Ajuste conforme necessário
        await queryRunner.dropColumn('users', 'type_user');
      }
}
