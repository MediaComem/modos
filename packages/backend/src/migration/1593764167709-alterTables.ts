import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTables1593764167709 implements MigrationInterface {
    name = 'alterTables1593764167709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "modos"."observation" ALTER COLUMN "id" DROP DEFAULT;`, undefined);
        await queryRunner.query(`DROP SEQUENCE "modos"."observation_id_seq";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY;`, undefined);

        await queryRunner.query(`ALTER TABLE "modos"."observation" ADD COLUMN "position" geometry(Point, 4326);`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" ADD COLUMN "inRange" BOOLEAN NOT NULL DEFAULT FALSE;`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" ADD COLUMN "edist" REAL;`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" ADD COLUMN "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW();`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" ADD COLUMN "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW();`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" ADD COLUMN "snap_geom" geometry(Point, 4326);`, undefined);

        await queryRunner.query(`ALTER TABLE "modos"."event" ALTER COLUMN "id" DROP DEFAULT;`, undefined);
        await queryRunner.query(`DROP SEQUENCE "modos"."event_id_seq";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."event" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY;`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."event" ADD COLUMN "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW();`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."event" ADD COLUMN "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW();`, undefined);

        await queryRunner.query(`ALTER TABLE "modos"."profile" ALTER COLUMN "id" DROP DEFAULT;`, undefined);
        await queryRunner.query(`DROP SEQUENCE "modos"."profile_id_seq";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."profile" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY;`, undefined);

        await queryRunner.query(`ALTER TABLE "modos"."user" ALTER COLUMN "id" DROP DEFAULT;`, undefined);
        await queryRunner.query(`DROP SEQUENCE "modos"."user_id_seq";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."user" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY;`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."user" ADD COLUMN "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW();`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."user" ADD COLUMN "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW();`, undefined);

        await queryRunner.query(`ALTER TABLE "modos"."user_events_event" ADD COLUMN "id" INTEGER GENERATED ALWAYS AS IDENTITY;`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        throw new Error("This migration cannot be reversed.");
    }

}
