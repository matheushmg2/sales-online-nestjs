import { Table } from 'typeorm';

export const CartTable = new Table({
  name: 'cart',
  columns: [
    {
      name: 'id',
      type: 'uuid',
      isPrimary: true,
      default: 'uuid_generate_v4()',
    },
    {
      name: 'user_id',
      type: 'uuid',
      isNullable: false,
    },
    {
      name: 'created_at',
      type: 'timestamptz',
      isNullable: false,
      default: 'now()',
    },
    {
      name: 'updated_at',
      type: 'timestamptz',
      isNullable: false,
      default: 'now()',
    },
  ],
  foreignKeys: [
    {
      columnNames: ['user_id'],
      referencedTableName: 'users',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  ],
});
