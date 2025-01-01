import { Table } from "typeorm";

export const ImagesTable = new Table({
    name: 'images',
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
            isNullable: false,
        },
        {
            name: 'size',
            type: 'integer',
            isNullable: false,
        },
        {
            name: 'key',
            type: 'varchar',
            isNullable: false,
        },
        {
            name: 'url',
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
