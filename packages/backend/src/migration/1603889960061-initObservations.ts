import { MigrationInterface, QueryRunner } from "typeorm";

export class initObservations1603889960061 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS public.observations (id INTEGER GENERATED ALWAYS AS IDENTITY, user_id INT REFERENCES public.users(id), event_id INT REFERENCES public.events(id), has_image bool NOT NULL DEFAULT FALSE, has_description bool NOT NULL DEFAULT FALSE, description_id INT REFERENCES public.descriptions(id), latitude FLOAT NOT NULL DEFAULT 0.0, longitude FLOAT NOT NULL DEFAULT 0.0, position geometry(Point, 4326) NOT NULL, in_range BOOLEAN NOT NULL DEFAULT FALSE, eid INT REFERENCES public.edges(id), edist REAL NOT NULL, snap_geom geometry(Point, 4326) NOT NULL, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), CONSTRAINT observations_pkey PRIMARY KEY (id));`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        throw new Error("This migration cannot be reversed.");
    }

}
