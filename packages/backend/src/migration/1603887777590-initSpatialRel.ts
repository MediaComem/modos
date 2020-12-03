import { MigrationInterface, QueryRunner } from "typeorm";

export class initSpatialRel1603887777590 implements MigrationInterface {
    name = 'initSpatialRel1603887777590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "modos"."edges" (
            id INTEGER GENERATED ALWAYS AS IDENTITY,
            "source" BIGINT NOT NULL,
            "target" BIGINT NOT NULL,
            key SMALLINT NOT NULL,
            osmid BIGINT NOT NULL,
            wplos REAL NOT NULL DEFAULT 1.0,
            plos REAL NOT NULL DEFAULT 1.0,
            "avg_obstacles" REAL NOT NULL DEFAULT 1.0,
            "avg_steps" REAL NOT NULL DEFAULT 1.0,
            "avg_coating" REAL NOT NULL DEFAULT 1.0,
            "avg_security" REAL NOT NULL DEFAULT 1.0,
            "avg_slopes" REAL NOT NULL DEFAULT 1.0,
            "avg_widths" REAL NOT NULL DEFAULT 1.0,
            "avg_other_negatives" REAL NOT NULL DEFAULT 1.0,
            "avg_positives" REAL NOT NULL DEFAULT 1.0,
            name VARCHAR,
            length REAL,
            width REAL,
            surface VARCHAR,
            incline VARCHAR,
            smoothness VARCHAR,
            crossing VARCHAR,
            lit VARCHAR,
            tactile_paving VARCHAR,
            wheelchair VARCHAR,
            handrail VARCHAR,
            description VARCHAR,
            step_count VARCHAR,
            sidewalk VARCHAR,
            footway VARCHAR,
            foot VARCHAR,
            kerb VARCHAR,
            bicycle VARCHAR,
            cycleway VARCHAR,
            highway VARCHAR,
            access VARCHAR,
            oneway VARCHAR,
            service VARCHAR,
            maxspeed VARCHAR,
            noexit VARCHAR,
            horse VARCHAR,
            tracktype VARCHAR,
            bridge VARCHAR,
            tunnel VARCHAR,
            layer VARCHAR,
            vehicle VARCHAR,
            motor_vehicle VARCHAR,
            motorcycle VARCHAR,
            railway VARCHAR,
            train VARCHAR,
            data_source text NOT NULL DEFAULT 'osm',
            uuid UUID NOT NULL,
            geom geometry(LineString, 4326) NOT NULL,
            CONSTRAINT edges_pkey PRIMARY KEY (id),
            CONSTRAINT check_source CHECK (data_source='osm' OR data_source='other')
        );`, undefined);

        await queryRunner.query(`CREATE TABLE "modos"."nodes" (
            id INTEGER GENERATED ALWAYS AS IDENTITY,
            lat FLOAT NOT NULL,
            lon FLOAT NOT NULL,
            osmid BIGINT UNIQUE NOT NULL,
            highway VARCHAR,
            data_source text NOT NULL DEFAULT 'osm',
            geom geometry(Point, 4326) NOT NULL,
            uuid UUID UNIQUE NOT NULL,
            CONSTRAINT nodes_pkey PRIMARY KEY (id),
            CONSTRAINT check_source CHECK (data_source='osm' OR data_source='other')
        );`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        throw new Error("This migration cannot be reversed.");
    }

}
