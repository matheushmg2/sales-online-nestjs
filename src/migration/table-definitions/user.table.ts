import { Table } from 'typeorm';

export const UsersTable = new Table({
  name: 'users',
  columns: [
    {
      name: 'id',
      type: 'uuid',
      isPrimary: true,
      default: 'uuid_generate_v4()',
    },
    {
      name: 'name',
      type: 'varchar',
      length: '255',
      isNullable: false,
    },
    {
      name: 'email',
      type: 'varchar',
      length: '255',
      isUnique: true,
      isNullable: false,
    },
    {
      name: 'cpf',
      type: 'varchar',
      length: '14',
      isUnique: true,
      isNullable: false,
    },
    {
      name: 'type_user',
      type: 'int',
      isNullable: false,
    },
    {
      name: 'phone',
      type: 'varchar',
      length: '15',
      isNullable: false,
    },
    {
      name: 'password',
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
