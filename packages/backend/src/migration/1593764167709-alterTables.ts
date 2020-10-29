import { MigrationInterface, QueryRunner } from "typeorm";

export class initObservations1603889960061 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`BEGIN; ALTER TABLE "observation" ALTER COLUMN id DROP DEFAULT; DROP SEQUENCE observation_id_seq; ALTER TABLE "observation" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY; COMMIT;`, undefined);
        await queryRunner.query(`ALTER TABLE "observation" SET SCHEMA "modos"`, undefined);
        await queryRunner.query(`ALTER TABLE modos."observation" ADD COLUMN "position" geometry(Point, 4326) NOT NULL;`, undefined); await queryRunner.query(`ALTER TABLE modos."observation" ADD COLUMN "in_range" BOOLEAN NOT NULL DEFAULT FALSE;`, undefined);
        await queryRunner.query(`ALTER TABLE modos."observation" ADD COLUMN eid INT REFERENCES modos.edges(id);`, undefined);
        await queryRunner.query(`ALTER TABLE modos."observation" ADD COLUMN edist REAL NOT NULL;`, undefined);
        await queryRunner.query(`ALTER TABLE modos."observation" ADD COLUMN snap_geom geometry(Point, 4326) NOT NULL`, undefined);
        await queryRunner.query(`BEGIN; ALTER TABLE "event" ALTER COLUMN id DROP DEFAULT; DROP SEQUENCE event_id_seq; ALTER TABLE "event" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY; COMMIT;`, undefined);
        await queryRunner.query(`ALTER TABLE "event" SET SCHEMA "modos"`, undefined);
        await queryRunner.query(`BEGIN; ALTER TABLE "profile" ALTER COLUMN id DROP DEFAULT; DROP SEQUENCE profile_id_seq; ALTER TABLE "profile" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY; COMMIT;`, undefined);
        await queryRunner.query(`ALTER TABLE "profile" SET SCHEMA "modos"`, undefined);
        await queryRunner.query(`BEGIN; ALTER TABLE "user" ALTER COLUMN id DROP DEFAULT; DROP SEQUENCE user_id_seq; ALTER TABLE "user" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY; COMMIT;`, undefined);
        await queryRunner.query(`ALTER TABLE "user" SET SCHEMA "modos"`, undefined);
        await queryRunner.query(`BEGIN; ALTER TABLE "user_events_event" ADD COLUMN id INTEGER GENERATED ALWAYS AS IDENTITY; COMMIT;`, undefined);
        await queryRunner.query(`ALTER TABLE "user_events_event" SET SCHEMA "modos"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        throw new Error("This migration cannot be reversed.");
    }

}
