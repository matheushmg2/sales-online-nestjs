import { execSync } from 'child_process';

// Obter o nome da migração do argumento da linha de comando
const migrationType: string | undefined = process.argv[2];
const migrationName: string | undefined = process.argv[3];

console.log(`Migração criada com sucesso: ${migrationName}`);
console.log(`migrationType: ${migrationType}`);
console.log(`process.argv: ${process.argv}`);

if (!migrationType) {
    console.error(
        'Erro: Você deve fornecer um tipo para a migração. (create | alter | insert)',
    );
    process.exit(1);
}

if (!migrationName) {
    console.error('Erro: Você deve fornecer um nome para a migração.');
    process.exit(1);
}

try {
    switch (migrationType) {
        case 'create':
            execSync(
                `typeorm migration:create ./src/migration/${'create-table-' + migrationName}`,
                {
                    stdio: 'inherit',
                },
            );
            break;
        case 'alter':
            execSync(
                `typeorm migration:create ./src/migration/${'alter-table-' + migrationName}`,
                {
                    stdio: 'inherit',
                },
            );
            break;
        case 'insert':
            execSync(
                `typeorm migration:create ./src/migration/${'insert-in-' + migrationName}`,
                {
                    stdio: 'inherit',
                },
            );
            break;

        default:
            break;
    }

    console.log(`Migração criada com sucesso: ${migrationName}`);
} catch (error) {
    if (error instanceof Error) {
        console.error('Erro ao criar a migração:', error.message);
    } else {
        console.error('Erro desconhecido ao criar a migração.');
    }
    process.exit(1);
}
