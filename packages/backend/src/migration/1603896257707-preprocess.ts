import { MigrationInterface, QueryRunner } from "typeorm";

export class preprocess1603896257707 implements MigrationInterface {
    name = 'preprocess1603896257707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE OR REPLACE FUNCTION convert_to_integer(v_input text) RETURNS INTEGER AS $$ DECLARE v_int_value INTEGER DEFAULT NULL; BEGIN BEGIN v_int_value := v_input::INTEGER; EXCEPTION WHEN OTHERS THEN RETURN NULL; END; RETURN v_int_value; END; $$ LANGUAGE plpgsql; CREATE OR REPLACE FUNCTION convert_to_float(v_input text) RETURNS FLOAT AS $$ DECLARE v_int_value FLOAT DEFAULT NULL; BEGIN BEGIN v_int_value := v_input::FLOAT; EXCEPTION WHEN OTHERS THEN RETURN NULL; END; RETURN v_int_value; END; $$ LANGUAGE plpgsql;`, undefined);
        await queryRunner.query(`CREATE TABLE nodes (id INTEGER GENERATED ALWAYS AS IDENTITY, lat DOUBLE PRECISION, lon DOUBLE PRECISION, osmid BIGINT, highway TEXT, geom GEOMETRY(Point, 4326), uuid UUID);`, undefined);
        await queryRunner.query(`CREATE TABLE edges(id INTEGER GENERATED ALWAYS AS IDENTITY, source BIGINT, target BIGINT, key SMALLINT, osmid BIGINT, name TEXT, length FLOAT, width FLOAT, surface TEXT, incline TEXT, smoothness TEXT, crossing TEXT, lit TEXT, tactile_paving TEXT, wheelchair TEXT, handrail TEXT, description TEXT, step_count TEXT, sidewalk TEXT, footway TEXT, foot TEXT, kerb TEXT, bicycle TEXT, cycleway TEXT, highway TEXT, access TEXT, oneway TEXT, service TEXT, maxspeed TEXT, noexit TEXT, horse TEXT, tracktype TEXT, bridge TEXT, tunnel TEXT, layer TEXT, vehicle TEXT, motor_vehicle TEXT, motorcycle TEXT, railway TEXT, train TEXT, geom GEOMETRY(LineString, 4326), uuid UUID;`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS modos_edges_geom_idx ON edges USING GIST (geom);`, undefined);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS modos_nodes_geom_idx ON nodes USING GIST (geom);`, undefined);
        await queryRunner.query(`DROP MATERIALIZED VIEW IF EXISTS network_convex_hull_v;`, undefined);
        await queryRunner.query(`CREATE MATERIALIZED VIEW network_convex_hull_v AS ( SELECT 1::INTEGER AS id, ST_Multi(ST_Transform(ST_Buffer(ST_Transform(ST_ConvexHull(ST_Collect(geom)), 2056), 100), 4326))::geometry(MultiPolygon, 4326) AS geom FROM edges);`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        throw new Error("This migration cannot be reversed.");
    }

}
