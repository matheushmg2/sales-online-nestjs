import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableUnique,
} from 'typeorm';

export class AlterTableUser1730325629455 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'users',
            'type_user',
            new TableColumn({
                name: 'type_user',
                type: 'varchar',
                isNullable: false,
            }),
        );
    
        const hasUniqueConstraint = await queryRunner.hasColumn('users', 'email');
    
        if (!hasUniqueConstraint) {
          await queryRunner.createUniqueConstraint('users', new TableUnique({
            columnNames: ['email'],
          }));
        }
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropUniqueConstraint('users', 'UQ_email');
        await queryRunner.dropColumn('users', 'type_user');
      }
}
