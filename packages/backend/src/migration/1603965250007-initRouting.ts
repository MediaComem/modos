import { MigrationInterface, QueryRunner } from "typeorm";

export class initRouting1603965250007 implements MigrationInterface {
    name = 'initRouting1603965250007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION "modos"."mds_weighted_routing"(
                    IN source_address TEXT,
                    IN target_address TEXT,
                    IN uw FLOAT4[],
                    OUT seq INTEGER,
                    OUT edge BIGINT,
                    OUT name TEXT,
                    OUT cost FLOAT,
                    OUT azimuth FLOAT,
                    OUT route_readable TEXT,
                    OUT route_geom GEOMETRY
                )
                RETURNS SETOF record AS
            $BODY$
                WITH
                dijkstra AS (
                    SELECT * FROM pgr_dijkstra(
                        FORMAT('SELECT
                        id AS id,
                        "source"::bigint as source,
                        "target"::bigint as target,
                        (length/((
                        %s*avg_steps+
                        %s*avg_security+
                        %s*avg_coating+
                        %s*avg_slopes+
                        %s*avg_widths)/5)
                        )::float4 as cost
                        FROM "modos"."edges"',
                        $3[1],
                        $3[2],
                        $3[3],
                        $3[4],
                        $3[5]),
                        (
                        SELECT osmid
                        FROM "modos"."nodes"
                        ORDER BY
                            ST_Distance(
                                ST_Transform(geom, 2056),
                                ST_Transform(ST_GeomFromText($1, 4326), 2056)
                            ) ASC
                        LIMIT 1
                        ),
                        (
                        SELECT osmid
                        FROM "modos"."nodes"
                        ORDER BY
                            ST_Distance(
                                ST_Transform(geom, 2056),
                                ST_Transform(ST_GeomFromText($2, 4326), 2056)
                            ) ASC
                        LIMIT 1
                        ),
                        directed:=false)
                ),
                get_geom AS (
                    SELECT dijkstra.*, modos.edges.name,
                        CASE
                            WHEN dijkstra.node = modos.edges.source::bigint THEN geom
                            ELSE ST_Reverse(geom)
                        END AS route_geom
                    FROM dijkstra JOIN "modos"."edges" ON (edge = id)
                    ORDER BY seq
                )
                SELECT
                    seq,
                    edge,
                    name,
                    cost,
                    degrees(ST_azimuth(ST_StartPoint(route_geom), ST_EndPoint(route_geom)))
                    AS azimuth,
                    ST_AsText(route_geom),
                    route_geom
                FROM get_geom
                ORDER BY seq;
            $BODY$
            LANGUAGE 'sql';
        `, undefined);

        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION "modos"."mds_simple_routing"(
                    IN source TEXT,
                    IN target TEXT,
                    OUT seq INTEGER,
                    OUT gid BIGINT,
                    OUT name TEXT,
                    OUT cost FLOAT,
                    OUT azimuth FLOAT,
                    OUT route_readable TEXT,
                    OUT route_geom GEOMETRY
                )
                RETURNS SETOF record AS
            $BODY$
                WITH
                dijkstra AS (
                    SELECT * FROM pgr_dijkstra(
                        FORMAT('SELECT
                        id AS id,
                        "source"::bigint as source,
                        "target"::bigint as target,
                        (length/((
                        avg_steps+
                        avg_security+
                        avg_coating+
                        avg_slopes+
                        avg_widths)/5)
                        )::float4 as cost
                        FROM "modos"."edges"'),
                        (
                        SELECT osmid
                        FROM "modos"."nodes"
                        ORDER BY
                            ST_Distance(
                                ST_Transform(geom, 2056),
                                ST_Transform(ST_GeomFromText($1, 4326), 2056)
                            ) ASC
                        LIMIT 1
                        ),
                        (
                        SELECT osmid
                        FROM "modos"."nodes"
                        ORDER BY
                            ST_Distance(
                                ST_Transform(geom, 2056),
                                ST_Transform(ST_GeomFromText($2, 4326), 2056)
                            ) ASC
                        LIMIT 1
                        ),
                        directed:=false)
                ),
                get_geom AS (
                    SELECT dijkstra.*, modos.edges.name,
                        CASE
                            WHEN dijkstra.node = modos.edges.source::bigint THEN geom
                            ELSE ST_Reverse(geom)
                        END AS route_geom
                    FROM dijkstra JOIN modos.edges ON (edge = id)
                    ORDER BY seq
                )
                SELECT
                    seq,
                    edge,
                    name,
                    cost,
                    degrees(ST_azimuth(ST_StartPoint(route_geom), ST_EndPoint(route_geom)))
                    AS azimuth,
                    ST_AsText(route_geom),
                    route_geom
                FROM get_geom
                ORDER BY seq;
            $BODY$
            LANGUAGE 'sql';
        `, undefined);

        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION "modos"."mds_shortest_routing"(
                    IN source TEXT,
                    IN target TEXT,
                    OUT seq INTEGER,
                    OUT gid BIGINT,
                    OUT name TEXT,
                    OUT cost FLOAT,
                    OUT azimuth FLOAT,
                    OUT route_readable TEXT,
                    OUT route_geom GEOMETRY
                )
                RETURNS SETOF record AS
            $BODY$
                WITH
                dijkstra AS (
                    SELECT * FROM pgr_dijkstra(
                        FORMAT('SELECT
                        id AS id,
                        "source"::bigint as source,
                        "target"::bigint as target,
                        length::float as cost
                        FROM "modos"."edges"'),
                        (
                        SELECT osmid
                        FROM "modos"."nodes"
                        ORDER BY
                            ST_Distance(
                                ST_Transform(geom, 2056),
                                ST_Transform(ST_GeomFromText($ 1, 4326), 2056)
                            ) ASC
                        LIMIT 1
                        ),
                        (
                        SELECT osmid
                        FROM "modos"."nodes"
                        ORDER BY
                            ST_Distance(
                                ST_Transform(geom, 2056),
                                ST_Transform(ST_GeomFromText($2, 4326), 2056)
                            ) ASC
                        LIMIT 1
                        ),
                        directed:=false)
                ),
                get_geom AS (
                    SELECT dijkstra.*, modos.edges.name,
                        CASE
                            WHEN dijkstra.node = modos.edges.source::bigint THEN geom
                            ELSE ST_Reverse(geom)
                        END AS route_geom
                    FROM dijkstra JOIN modos.edges ON (edge = id)
                    ORDER BY seq
                )
                SELECT
                    seq,
                    edge,
                    name,
                    cost,
                    degrees(ST_azimuth(ST_StartPoint(route_geom), ST_EndPoint(route_geom)))
                    AS azimuth,
                    ST_AsText(route_geom),
                    route_geom
                FROM get_geom
                ORDER BY seq;
            $BODY$
            LANGUAGE 'sql';
        `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP FUNCTION IF EXISTS mds_weighted_routing(text, text, float4[]);`, undefined);
        await queryRunner.query(`DROP FUNCTION IF EXISTS mds_simple_routing(text, text);`, undefined);
        await queryRunner.query(`DROP FUNCTION IF EXISTS mds_shortest_routing(text, text);`, undefined);
    }

}
