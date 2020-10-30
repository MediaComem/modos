import { MigrationInterface, QueryRunner } from "typeorm";

export class initExtensions1593764167708 implements MigrationInterface {
    name = 'initExtensions1593764167708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS adminpack;`, undefined);
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`, undefined);
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;`, undefined);
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS tablefunc;`, undefined);
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS postgis;`, undefined);
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS postgis_topology;`, undefined);
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS pgrouting;`, undefined);
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS citext;`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        throw new Error("This migration cannot be reversed.");
    }

}
