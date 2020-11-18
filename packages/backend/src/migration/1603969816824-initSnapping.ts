import { MigrationInterface, QueryRunner } from "typeorm";

export class initSnapping1603969816824 implements MigrationInterface {
    name = 'initSnapping1603969816824'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION "modos"."snap_point"()
            RETURNS trigger AS
            $$
            DECLARE
                geomx geometry(Point,4326) := NULL;
            BEGIN
                IF to_jsonb(NEW) ? 'geom' THEN
                    geomx := NEW.geom;
                ELSIF to_jsonb(NEW) ? 'position' THEN
                    geomx := NEW.position;
                END IF;
                IF (SELECT ST_Intersects(
                    ST_Transform(geomx, 2056),
                    ST_Transform("modos"."network_convex_hull_v".geom, 2056)
                ) FROM "modos"."network_convex_hull_v")
                THEN
                    SELECT
                        ST_Intersects(
                            ST_Transform(geomx, 2056),
                            ST_Transform("modos"."network_convex_hull_v".geom, 2056)
                        ) AS "range",
                        "modos"."edges".id AS modos_edge_id,
                        (
                        ST_Transform("modos"."edges".geom, 2056)
                        <->
                        ST_Transform(geomx, 2056)
                        )::double precision AS dist_to_nearest_edge,
                        ST_Transform(
                            ST_ClosestPoint(
                            ST_Transform("modos"."edges".geom, 2056),
                            ST_Transform(geomx, 2056)
                        ),
                        4326
                    )::geometry(Point, 4326) AS snap_geom
                    FROM
                        "modos"."edges", "modos"."network_convex_hull_v"
                    ORDER BY dist_to_nearest_edge
                    LIMIT 1
                    INTO NEW.in_range, NEW.eid, NEW.edist, NEW.snap_geom;
                ELSE
                    SELECT
                        ST_Intersects(
                            ST_Transform(geomx, 2056),
                            ST_Transform("modos"."network_convex_hull_v".geom, 2056)
                        ) AS "range",
                        "modos"."edges".id AS modos_edge_id,
                        (
                        ST_Transform("modos"."edges".geom, 2056)
                        <->
                        ST_Transform(geomx, 2056)
                        )::double precision AS dist_to_nearest_edge,
                        ST_Transform(
                            ST_ClosestPoint(
                            ST_Transform("modos"."edges".geom, 2056),
                            ST_Transform(geomx, 2056)
                        ),
                        4326
                    )::geometry(Point, 4326) AS snap_geom
                    FROM
                        "modos"."edges", "modos"."network_convex_hull_v"
                    ORDER BY dist_to_nearest_edge
                    LIMIT 1
                    INTO NEW.in_range, NEW.eid, NEW.edist, NEW.snap_geom;
                END IF;
                RETURN NEW;
            END
            $$
        LANGUAGE 'plpgsql';
        `, undefined);
        await queryRunner.query(`CREATE TRIGGER "snap_point_biut" BEFORE INSERT OR UPDATE ON "modos"."observation" FOR EACH ROW EXECUTE PROCEDURE "modos"."snap_point"();`, undefined);
        await queryRunner.query(`CREATE TRIGGER "snap_point_biut" BEFORE INSERT OR UPDATE ON "modos"."images" FOR EACH ROW EXECUTE PROCEDURE "modos"."snap_point"();`, undefined);
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION "modos"."set_geom_from_latlon"()
            RETURNS trigger AS
            $$
            DECLARE
                latcol TEXT := NULL;
                loncol TEXT := NULL;
                lat FLOAT := NULL;
                lon FLOAT := NULL;
            BEGIN
                latcol:= (
                    SELECT column_name
                      FROM information_schema.columns
                     WHERE table_schema = TG_TABLE_SCHEMA
                       AND table_name = TG_TABLE_NAME
                       AND column_name LIKE '%latitude%'
                       AND column_name NOT LIKE '%ref'
                );
                loncol := (
                    SELECT column_name
                      FROM information_schema.columns
                     WHERE table_schema = TG_TABLE_SCHEMA
                       AND table_name = TG_TABLE_NAME
                       AND column_name LIKE '%longitude%'
                       AND column_name NOT LIKE '%ref'
                );
                EXECUTE 'select $1.' || loncol USING NEW INTO lon;
                EXECUTE 'select $1.' || latcol USING NEW INTO lat;
                IF to_jsonb(NEW) ? 'geom' THEN
                    NEW.geom := ST_SetSRID(
                        ST_MakePoint(lon,lat), 4326
                    );
                ELSIF to_jsonb(NEW) ? 'position' THEN
                    NEW.position := ST_SetSRID(
                        ST_MakePoint(lon,lat), 4326
                    );
                END IF;
                RETURN NEW;
            END
            $$
        LANGUAGE 'plpgsql';
        `, undefined);
        await queryRunner.query(`CREATE TRIGGER "set_geom_from_latlon_biut" BEFORE INSERT OR UPDATE ON "modos"."observation" FOR EACH ROW EXECUTE PROCEDURE modos.set_geom_from_latlon();`, undefined);
        await queryRunner.query(`CREATE TRIGGER "set_geom_from_latlon_biut" BEFORE INSERT OR UPDATE ON "modos"."images" FOR EACH ROW EXECUTE PROCEDURE modos.set_geom_from_latlon();`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        throw new Error("This migration cannot be reversed.");
    }

}
