import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertInState1729977754230 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
                INSERT INTO state("name", "uf") VALUES ('Acre', 'AC');
                INSERT INTO state("name", "uf") VALUES ('Alagoas', 'AL');
                INSERT INTO state("name", "uf") VALUES ('Amazonas', 'AM');
                INSERT INTO state("name", "uf") VALUES ('Amapá', 'AP');
                INSERT INTO state("name", "uf") VALUES ('Bahia', 'BA');
                INSERT INTO state("name", "uf") VALUES ('Ceará', 'CE');
                INSERT INTO state("name", "uf") VALUES ('Distrito Federal', 'DF');
                INSERT INTO state("name", "uf") VALUES ('Espírito Santo', 'ES');
                INSERT INTO state("name", "uf") VALUES ('Goiás', 'GO');
                INSERT INTO state("name", "uf") VALUES ('Maranhão', 'MA');
                INSERT INTO state("name", "uf") VALUES ('Minas Gerais', 'MG');
                INSERT INTO state("name", "uf") VALUES ('Mato Grosso do Sul', 'MS');
                INSERT INTO state("name", "uf") VALUES ('Mato Grosso', 'MT');
                INSERT INTO state("name", "uf") VALUES ('Pará', 'PA');
                INSERT INTO state("name", "uf") VALUES ('Paraíba', 'PB');
                INSERT INTO state("name", "uf") VALUES ('Pernambuco', 'PE');
                INSERT INTO state("name", "uf") VALUES ('Piauí', 'PI');
                INSERT INTO state("name", "uf") VALUES ('Paraná', 'PR');
                INSERT INTO state("name", "uf") VALUES ('Rio de Janeiro', 'RJ');
                INSERT INTO state("name", "uf") VALUES ('Rio Grande do Norte', 'RN');
                INSERT INTO state("name", "uf") VALUES ('Rondônia', 'RO');
                INSERT INTO state("name", "uf") VALUES ('Roraima', 'RR');
                INSERT INTO state("name", "uf") VALUES ('Rio Grande do Sul', 'RS');
                INSERT INTO state("name", "uf") VALUES ('Santa Catarina', 'SC');
                INSERT INTO state("name", "uf") VALUES ('Sergipe', 'SE');
                INSERT INTO state("name", "uf") VALUES ('São Paulo', 'SP');
                INSERT INTO state("name", "uf") VALUES ('Tocantins', 'TO');
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
                DELETE FROM public.state;
            `);
    }

}
