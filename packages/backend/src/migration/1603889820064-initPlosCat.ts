import { MigrationInterface, QueryRunner } from "typeorm";

export class initPlosCat1603889820064 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS ploscategories(id INTEGER GENERATED ALWAYS AS IDENTITY, category TEXT NOT NULL, "weight" REAL NOT NULL DEFAULT 0.0, time_weight REAL NOT NULL DEFAULT 1.0, CONSTRAINT ploscategories_pkey PRIMARY KEY (id), CONSTRAINT check_categories CHECK (category='obstacle' OR category='step' OR category='coating' OR category='security' OR category='slope' OR category='width' OR category='other-negative' OR category='positive'), CONSTRAINT check_weight CHECK (weight <=1 AND weight>=0), CONSTRAINT check_time_weight CHECK (time_weight <=1 AND time_weight>=0));CREATE TABLE IF NOT EXISTS nodes(id INTEGER GENERATED ALWAYS AS IDENTITY, lat FLOAT NOT NULL, lon FLOAT NOT NULL, osmid BIGINT UNIQUE NOT NULL, highway VARCHAR, data_source text NOT NULL DEFAULT 'osm', geom geometry(Point, 4326) NOT NULL, uuid UUID UNIQUE NOT NULL, CONSTRAINT nodes_pkey PRIMARY KEY (id), CONSTRAINT check_source CHECK (data_source='osm' OR data_source='other'));`, undefined);
        await queryRunner.query(`INSERT INTO ploscategories (category) VALUES ('obstacle'), ('step'), ('coating'), ('security'), ('slope'), ('width'), ('other-negative'), ('positive') ON CONFLICT (id) DO NOTHING;`, undefined);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS impacts (id INTEGER GENERATED ALWAYS AS IDENTITY, impact_name TEXT NOT NULL, CONSTRAINT impact_pkey PRIMARY KEY (id), CONSTRAINT check_impact_name CHECK (impact_name='low' OR impact_name='mild' OR impact_name='moderate' OR impact_name='high' OR impact_name='critical'));`, undefined);
        await queryRunner.query(`INSERT INTO impacts (impact_name) VALUES ('low'), ('mild'), ('moderate'), ('high'), ('critical') ON CONFLICT (id) DO NOTHING;`, undefined);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS descriptions (id INTEGER GENERATED ALWAYS AS IDENTITY, ploscategory_id INT REFERENCES ploscategories(id) NOT NULL, impact_id INT REFERENCES impacts(id) NOT NULL, "freetext" CHARACTER VARYING(4096), CONSTRAINT descriptions_pkey PRIMARY KEY (id));`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        throw new Error("This migration cannot be reversed.");
    }

}
