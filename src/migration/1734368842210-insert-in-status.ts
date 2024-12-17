import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertInStatus1734368842210 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
                INSERT INTO public.payment_status(name)	VALUES ('Done');
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
                DELETE FROM public.payment_status;
            `);
    }
}
