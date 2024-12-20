import { Column } from 'typeorm';

export class Correio {
    @Column({ nullable: false })
    cep: string;

    @Column({ nullable: false })
    logradouro: string;

    @Column({ nullable: false })
    complemento: string;

    @Column({ nullable: false })
    unidade: string;

    @Column({ nullable: false })
    bairro: string;

    @Column({ nullable: false })
    localidade: string;

    @Column({ nullable: false })
    uf: string;

    @Column({ nullable: false })
    estado: string;

    @Column({ nullable: false })
    regiao: string;

    @Column({ nullable: false })
    ddd: string;

    error?: string;
}

