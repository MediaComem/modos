import { MigrationInterface, QueryRunner } from "typeorm";

export class fixSequences1607430241919 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("SELECT setval('modos.event_id_seq', (SELECT COALESCE(MAX(id), 1) FROM modos.event));", undefined);
        await queryRunner.query("SELECT setval('modos.observation_id_seq', (SELECT COALESCE(MAX(id), 1) FROM modos.observation));", undefined);
        await queryRunner.query("SELECT setval('modos.profile_id_seq', (SELECT COALESCE(MAX(id), 1) FROM modos.profile));", undefined);
        await queryRunner.query("SELECT setval('modos.user_id_seq', (SELECT COALESCE(MAX(id), 1) FROM modos.user));", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        throw new Error("This migration cannot be reversed.");
    }

}
