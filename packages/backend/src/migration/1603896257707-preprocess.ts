import { MigrationInterface, QueryRunner } from "typeorm";

export class preprocess1603896257707 implements MigrationInterface {
    name = 'preprocess1603896257707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION "modos"."convert_to_integer"(v_input text)
            RETURNS INTEGER AS
            $$
            DECLARE v_int_value INTEGER DEFAULT NULL;
            BEGIN
                BEGIN
                    v_int_value := v_input::INTEGER;
                    EXCEPTION WHEN OTHERS THEN
                    --RAISE NOTICE 'Invalid integer value: "%".  Returning NULL.', v_input;
                    RETURN NULL;
                END;
                RETURN v_int_value;
            END;
            $$
            LANGUAGE plpgsql;
        `, undefined);

        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION "modos"."convert_to_float"(v_input text)
            RETURNS FLOAT AS
            $$
            DECLARE v_int_value FLOAT DEFAULT NULL;
            BEGIN
                BEGIN
                    v_int_value := v_input::FLOAT;
                    EXCEPTION WHEN OTHERS THEN
                    --RAISE NOTICE 'Invalid float value: "%".  Returning NULL.', v_input;
                    RETURN NULL;
                END;
                RETURN v_int_value;
            END;
            $$
            LANGUAGE plpgsql;
        `, undefined);

        await queryRunner.query(`CREATE INDEX "modos_edges_geom_idx" ON "modos"."edges" USING GIST (geom);`, undefined);
        await queryRunner.query(`CREATE INDEX "modos_nodes_geom_idx" ON "modos"."nodes" USING GIST (geom);`, undefined);

        await queryRunner.query(`
            CREATE MATERIALIZED VIEW "modos"."network_convex_hull_v" AS (
                SELECT
                1::INTEGER AS id,
                ST_Multi(
                    ST_Transform(
                    ST_Buffer(
                        ST_Transform(
                        ST_ConvexHull(
                            ST_Collect(geom)
                        ),
                        2056
                        ),
                        100
                    ),
                    4326
                    )
                )::geometry(MultiPolygon, 4326) AS geom
                FROM
                "modos"."edges"
            );
        `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        throw new Error("This migration cannot be reversed.");
    }

}
