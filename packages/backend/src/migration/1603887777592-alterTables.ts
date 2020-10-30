import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTables1603887777592 implements MigrationInterface {
    name = 'alterTables1603887777592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "observation" ADD COLUMN eid INT REFERENCES edges(id);`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        throw new Error("This migration cannot be reversed.");
    }

}
