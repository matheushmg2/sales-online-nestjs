import { Table } from "typeorm";

export const CityTable = new Table({
    name: 'city',
    columns: [
        {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
        },
        {
            name: 'state_id',
            type: 'uuid',
            isNullable: false,
        },
        {
            name: 'name',
            type: 'varchar',
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
