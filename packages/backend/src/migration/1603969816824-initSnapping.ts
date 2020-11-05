import { MigrationInterface, QueryRunner } from "typeorm";

export class initSnapping1603969816824 implements MigrationInterface {
    name = 'initSnapping1603969816824'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS snap_point_biut ON images;`, undefined);
        await queryRunner.query(`DROP TRIGGER IF EXISTS snap_point_biut ON observations;`, undefined);
        await queryRunner.query(`DROP FUNCTION IF EXISTS snap_point();`, undefined);
        await queryRunner.query(`CREATE OR REPLACE FUNCTION snap_point() RETURNS trigger AS $$ DECLARE geomx geometry(Point,4326) := NULL; BEGIN IF to_jsonb(NEW) ? 'geom' THEN geomx := NEW.geom; ELSIF to_jsonb(NEW) ? 'position' THEN geomx := NEW.position; END IF; IF (SELECT ST_Intersects(ST_Transform(geomx, 2056), ST_Transform(network_convex_hull_v.geom, 2056)) FROM network_convex_hull_v) THEN SELECT edges.id AS modos_edge_id, (ST_Transform(edges.geom, 2056) <-> ST_Transform(geomx, 2056))::double precision AS dist_to_nearest_edge, ST_Transform(ST_ClosestPoint(ST_Transform(edges.geom, 2056), ST_Transform(geomx, 2056)), 4326)::geometry(Point, 4326) AS snap_geom FROM edges ORDER BY dist_to_nearest_edge LIMIT 1 INTO NEW.eid, NEW.edist, NEW.snap_geom; END IF; RETURN NEW; END $$ LANGUAGE 'plpgsql';`, undefined);
        await queryRunner.query(`CREATE OR REPLACE FUNCTION snap_point_simple() RETURNS trigger AS $$ DECLARE geomx geometry(Point,4326) := NULL; BEGIN IF to_jsonb(NEW) ? 'geom' THEN geomx := NEW.geom; ELSIF to_jsonb(NEW) ? 'position' THEN geomx := NEW.position; END IF; NEW.snap_geom := (SELECT sub.snap_geom FROM (SELECT edges.id AS modos_edge_id, ST_Distance(ST_Transform(edges.geom, 2056), ST_Transform(geomx, 2056))::double precision AS dist_to_nearest_edge, ST_Transform(ST_ClosestPoint(ST_Transform(edges.geom, 2056), ST_Transform(geomx, 2056)), 4326)::geometry(Point, 4326) AS snap_geom FROM edges ORDER BY dist_to_nearest_edge LIMIT 1) AS sub); RETURN NEW; END $$ LANGUAGE 'plpgsql';`, undefined);
        await queryRunner.query(`CREATE TRIGGER snap_point_biut BEFORE INSERT OR UPDATE ON observation FOR EACH ROW EXECUTE PROCEDURE snap_point();`, undefined);
        await queryRunner.query(`CREATE TRIGGER snap_point_biut BEFORE INSERT OR UPDATE ON images FOR EACH ROW EXECUTE PROCEDURE snap_point();`, undefined);
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_geom_from_latlon_biut ON images;`, undefined);
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_geom_from_latlon_biut ON observation;`, undefined);
        await queryRunner.query(`CREATE OR REPLACE FUNCTION set_geom_from_latlon() RETURNS trigger AS $$ DECLARE latcol TEXT := NULL; loncol TEXT := NULL; lat FLOAT := NULL; lon FLOAT := NULL; BEGIN latcol:= (SELECT column_name FROM information_schema.columns WHERE table_schema = TG_TABLE_SCHEMA AND table_name = TG_TABLE_NAME AND column_name LIKE '%latitude%'); loncol := (SELECT column_name FROM information_schema.columns WHERE table_schema = TG_TABLE_SCHEMA AND table_name = TG_TABLE_NAME AND column_name LIKE '%longitude%'); EXECUTE 'select $1.' || loncol USING NEW INTO lon; EXECUTE 'select $1.' || latcol USING NEW INTO lat; NEW.geom := ST_SetSRID(ST_MakePoint(lon,lat), 4326); RETURN NEW; END $$ LANGUAGE 'plpgsql';`, undefined);
        await queryRunner.query(`CREATE TRIGGER set_geom_from_latlon_biut BEFORE INSERT OR UPDATE ON observation FOR EACH ROW EXECUTE PROCEDURE set_geom_from_latlon();`, undefined);
        await queryRunner.query(`CREATE TRIGGER set_geom_from_latlon_biut BEFORE INSERT OR UPDATE ON images FOR EACH ROW EXECUTE PROCEDURE set_geom_from_latlon();`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        throw new Error("This migration cannot be reversed.");
    }

}
