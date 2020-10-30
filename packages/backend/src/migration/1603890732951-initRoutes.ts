import { MigrationInterface, QueryRunner } from "typeorm";

export class initRoutes1603890732951 implements MigrationInterface {
    name = 'initRoutes1603890732951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS modos.routes (id INTEGER GENERATED ALWAYS AS IDENTITY, description TEXT, route_wplos FLOAT NOT NULL DEFAULT 1.0, route_plos FLOAT NOT NULL DEFAULT 1.0, geom geometry(MultiLineString, 4326) NOT NULL, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), CONSTRAINT routes_pkey PRIMARY KEY (id));`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        throw new Error("This migration cannot be reversed.");
    }

}
