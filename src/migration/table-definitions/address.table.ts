import { Table } from "typeorm";

export const AddressTable = new Table({
    name: 'address',
    columns: [
        {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
        },
        {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
        },
        {
            name: 'complement',
            type: 'varchar',
            isNullable: true,
        },
        {
            name: 'number',
            type: 'integer',
            isNullable: false,
        },
        {
            name: 'cep',
            type: 'varchar',
            isNullable: false,
        },
        {
            name: 'city_id',
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
});
