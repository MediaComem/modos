import { MigrationInterface, QueryRunner } from "typeorm";

export class initExtensions1593764167708 implements MigrationInterface {
    name = 'initExtensions1593764167708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Use "IF NOT EXISTS" in case the migration user does not have sufficient
        // privileges to create extensions. In that case, they must have been created in
        // advance by a more privileged user.
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
