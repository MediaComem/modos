import { MigrationInterface, QueryRunner } from "typeorm";

export class posOnExistingData1605695145000 implements MigrationInterface {
    name = 'posOnExistingData1605695145000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        
        `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        throw new Error("This migration cannot be reversed.");
    }

}
