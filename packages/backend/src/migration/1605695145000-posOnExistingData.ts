import { MigrationInterface, QueryRunner } from "typeorm";

export class posOnExistingData1605695145000 implements MigrationInterface {
    name = 'posOnExistingData1605695145000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`UPDATE "modos"."observation" SET "updated_at"=NOW();`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" ALTER COLUMN "position" SET NOT NULL;`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" ALTER COLUMN "edist" SET NOT NULL;`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" ALTER COLUMN "snap_geom" SET NOT NULL;`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        throw new Error("This migration cannot be reversed.");
    }

}
