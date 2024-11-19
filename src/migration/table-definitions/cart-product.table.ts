import { Table } from 'typeorm';

export const CartProductTable = new Table({
  name: 'cart_product',
  columns: [
    {
      name: 'id',
      type: 'uuid',
      isPrimary: true,
      default: 'uuid_generate_v4()', // Usando uuid_generate_v4() para gerar UUIDs automaticamente
    },
    {
      name: 'cart_id',
      type: 'uuid', // Alterando para UUID
      isNullable: false,
    },
    {
      name: 'product_id',
      type: 'uuid', // Alterando para UUID
      isNullable: false,
    },
    {
      name: 'amount',
      type: 'integer',
      isNullable: false,
    },
    {
      name: 'created_at',
      type: 'timestamp',
      isNullable: false,
      default: 'now()',
    },
    {
      name: 'updated_at',
      type: 'timestamp',
      isNullable: false,
      default: 'now()',
    },
  ],
  foreignKeys: [
    {
      columnNames: ['cart_id'],
      referencedTableName: 'cart',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    {
      columnNames: ['product_id'],
      referencedTableName: 'product',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  ],
  indices: [
    {
      columnNames: ['cart_id', 'product_id'],
      isUnique: true, // Garantir que a combinação cart_id e product_id seja única
    },
  ],
});
