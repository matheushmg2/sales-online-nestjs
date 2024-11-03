import { Table } from 'typeorm';

export const CategoryTable = new Table({
  name: 'category',
  columns: [
    {
      name: 'id',
      type: 'uuid',
      isPrimary: true,
      isGenerated: true,
      generationStrategy: 'uuid',
    },
    {
      name: 'name',
      type: 'varchar',
      length: '255',
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
});