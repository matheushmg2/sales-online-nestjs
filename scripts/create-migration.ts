import { execSync } from 'child_process';

// Obter o nome da migração do argumento da linha de comando
const migrationName: string | undefined = process.argv[2];

if (!migrationName) {
    console.error('Erro: Você deve fornecer um nome para a migração.');
    process.exit(1);
}

try {
    // Executar o comando TypeORM com o caminho fixo e o nome da migração
    execSync(`typeorm migration:create ./src/migration/${migrationName}`, {
        stdio: 'inherit',
    });
    console.log(`Migração criada com sucesso: ${migrationName}`);
} catch (error) {
    // Verificação de erro com tipo
    if (error instanceof Error) {
        console.error('Erro ao criar a migração:', error.message);
    } else {
        console.error('Erro desconhecido ao criar a migração.');
    }
    process.exit(1);
}
