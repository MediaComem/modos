import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1593764167707 implements MigrationInterface {
    name = 'InitialSchema1593764167707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "profiles_gender_enum" AS ENUM('m', 'f', '')`, undefined);
        await queryRunner.query(`CREATE TYPE "profiles_helper_enum" AS ENUM('white cane', 'walker', 'wheelchair')`, undefined);
        await queryRunner.query(`CREATE TYPE "profiles_helperfrequency_enum" AS ENUM('rarely', 'sometimes', 'always')`, undefined);
        await queryRunner.query(`CREATE TYPE "profiles_mobility_enum" AS ENUM('perfect', 'good', 'reduced', 'minimal')`, undefined);
        await queryRunner.query(`CREATE TABLE modos."profiles" ("id" INTEGER GENERATED ALWAYS AS IDENTITY, "age" integer NOT NULL, "gender" "profiles_gender_enum" NOT NULL DEFAULT '', "helper" "profiles_helper_enum", "helperFrequency" "profiles_helperfrequency_enum", "mobility" "profiles_mobility_enum" NOT NULL, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE modos."users" ("id" INTEGER GENERATED ALWAYS AS IDENTITY, "pseudonym" character varying NOT NULL, "age" INT, "user_privileges" CHARACTER VARYING(256) NOT NULL DEFAULT 'limited', "email" citext NOT NULL, "lang_iso_639_3" CHARACTER VARYING(3) DEFAULT 'FRA', "passwordHash" character varying NOT NULL, "profileId" integer, CONSTRAINT "UQ_47d5df0fc19d289038e023774ee" UNIQUE ("pseudonym"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_9466682df91534dd95e4dbaa61" UNIQUE ("profileId"), CONSTRAINT "lang_iso_639_3_check" CHECK (lang_iso_639_3='FRA' OR lang_iso_639_3='DEU' OR lang_iso_639_3='ITA' OR lang_iso_639_3='ROH' OR lang_iso_639_3='ENG' OR lang_iso_639_3='SPA' OR lang_iso_639_3='POR'), CONSTRAINT "user_age" CHECK (age <=140 AND age>0), CONSTRAINT "check_user_privileges" CHECK (user_privileges='restricted' OR user_privileges='limited' OR user_privileges='owner' OR user_privileges='labeller' OR user_privileges='validator' OR user_privileges='admin' OR user_privileges='all'), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TYPE "observations_descriptionobstacle_enum" AS ENUM('coating', 'obstacle', 'security', 'passability', 'slope', 'width', 'other', 'noproblem', 'unlabelled')`, undefined);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS modos.edges (id INTEGER GENERATED ALWAYS AS IDENTITY, "source" BIGINT NOT NULL, "target" BIGINT NOT NULL, key SMALLINT NOT NULL, osmid BIGINT NOT NULL, wplos REAL NOT NULL DEFAULT 1.0, plos REAL NOT NULL DEFAULT 1.0, avg_obstacles REAL NOT NULL DEFAULT 1.0, avg_steps REAL NOT NULL DEFAULT 1.0, avg_coating REAL NOT NULL DEFAULT 1.0, avg_security REAL NOT NULL DEFAULT 1.0, avg_slopes REAL NOT NULL DEFAULT 1.0, avg_widths REAL NOT NULL DEFAULT 1.0, "avg_other-negatives" REAL NOT NULL DEFAULT 1.0, avg_positives REAL NOT NULL DEFAULT 1.0, name VARCHAR, length REAL, width REAL, surface VARCHAR, incline VARCHAR, smoothness VARCHAR, crossing VARCHAR, lit VARCHAR, tactile_paving VARCHAR, wheelchair VARCHAR, handrail VARCHAR, description VARCHAR, step_count VARCHAR, sidewalk VARCHAR, footway VARCHAR, foot VARCHAR, kerb VARCHAR, bicycle VARCHAR, cycleway VARCHAR, highway VARCHAR, access VARCHAR, oneway VARCHAR, service VARCHAR, maxspeed VARCHAR, noexit VARCHAR, horse VARCHAR, tracktype VARCHAR, bridge VARCHAR, tunnel VARCHAR, layer VARCHAR, vehicle VARCHAR, motor_vehicle VARCHAR, motorcycle VARCHAR, railway VARCHAR, train VARCHAR, data_source text NOT NULL DEFAULT 'osm', uuid UUID NOT NULL, geom geometry(LineString, 4326) NOT NULL, CONSTRAINT edges_pkey PRIMARY KEY (id), CONSTRAINT check_source CHECK (data_source='osm' OR data_source='other'));`, undefined);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS modos.nodes (id INTEGER GENERATED ALWAYS AS IDENTITY, lat FLOAT NOT NULL, lon FLOAT NOT NULL, osmid BIGINT UNIQUE NOT NULL, highway VARCHAR, data_source text NOT NULL DEFAULT 'osm', geom geometry(Point, 4326) NOT NULL, uuid UUID UNIQUE NOT NULL, CONSTRAINT nodes_pkey PRIMARY KEY (id), CONSTRAINT check_source CHECK (data_source='osm' OR data_source='other'));`, undefined);
        await queryRunner.query(`CREATE TABLE modos."observations" ("id" INTEGER GENERATED ALWAYS AS IDENTITY, "ownerId" integer, "eventId" integer, "descriptionObstacle" "observations_descriptionobstacle_enum" NOT NULL DEFAULT 'unlabelled', "descriptionFreetext" character varying, "descriptionImpact" integer NOT NULL, "imageBasename" character varying NOT NULL, "imageWidth" integer, "imageHeight" integer, "locationLatitude" real, "locationLongitude" real, "locationAltitude" real, "position" geometry(Point, 4326) NOT NULL, "in_range" BOOLEAN NOT NULL DEFAULT FALSE, eid INT REFERENCES modos.edges(id), edist REAL NOT NULL, snap_geom geometry(Point, 4326) NOT NULL, CONSTRAINT "PK_77a736edc631a400b788ce302cb" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE modos."events" ("id" INTEGER GENERATED ALWAYS AS IDENTITY, "title" character varying NOT NULL, "password" character varying, "beginning" TIMESTAMP NOT NULL, "ending" TIMESTAMP NOT NULL, "objective" character varying NOT NULL, "numberOfImages" integer NOT NULL, "ownerId" integer, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE modos."users_events_event" ("userId" integer NOT NULL, "eventId" integer NOT NULL, CONSTRAINT "PK_11948eb9a443f34df93cac35feb" PRIMARY KEY ("userId", "eventId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_507e9d8e231d089b5c4d44cce0" ON modos."users_events_event" ("userId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_c885fff747e43934134ceb67d3" ON modos."users_events_event" ("eventId") `, undefined);
        await queryRunner.query(`ALTER TABLE modos."users" ADD CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES modos."profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE modos."observations" ADD CONSTRAINT "FK_9b97a333802a2b7b3c9dc6786a2" FOREIGN KEY ("ownerId") REFERENCES modos."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE modos."observations" ADD CONSTRAINT "FK_3b103dc1bb4c103c5e0df5d5069" FOREIGN KEY ("eventId") REFERENCES modos."events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE modos."events" ADD CONSTRAINT "FK_e4abcb418e46db776e920a05a16" FOREIGN KEY ("ownerId") REFERENCES modos."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE modos."users_events_event" ADD CONSTRAINT "FK_507e9d8e231d089b5c4d44cce00" FOREIGN KEY ("userId") REFERENCES modos."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE modos."users_events_event" ADD CONSTRAINT "FK_c885fff747e43934134ceb67d33" FOREIGN KEY ("eventId") REFERENCES modos."events"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`DROP INDEX IF EXISTS modos_observation_position_idx;`, undefined);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS modos_observation_position_idx ON modos.observations USING GIST (position);`, undefined);
        await queryRunner.query(`DROP INDEX IF EXISTS modos_observation_snap_geom_idx;`, undefined);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS modos_observation_snap_geom_idx ON modos.observations USING GIST (snap_geom);`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE modos."users_events_event" DROP CONSTRAINT "FK_c885fff747e43934134ceb67d33"`, undefined);
        await queryRunner.query(`ALTER TABLE modos."users_events_event" DROP CONSTRAINT "FK_507e9d8e231d089b5c4d44cce00"`, undefined);
        await queryRunner.query(`ALTER TABLE modos."events" DROP CONSTRAINT "FK_e4abcb418e46db776e920a05a16"`, undefined);
        await queryRunner.query(`ALTER TABLE modos."observations" DROP CONSTRAINT "FK_3b103dc1bb4c103c5e0df5d5069"`, undefined);
        await queryRunner.query(`ALTER TABLE modos."observations" DROP CONSTRAINT "FK_9b97a333802a2b7b3c9dc6786a2"`, undefined);
        await queryRunner.query(`ALTER TABLE modos."users" DROP CONSTRAINT "FK_9466682df91534dd95e4dbaa616"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_c885fff747e43934134ceb67d3"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_507e9d8e231d089b5c4d44cce0"`, undefined);
        await queryRunner.query(`DROP TABLE modos."users_events_event"`, undefined);
        await queryRunner.query(`DROP TABLE modos."events"`, undefined);
        await queryRunner.query(`DROP TABLE modos."observations"`, undefined);
        await queryRunner.query(`DROP TYPE "observations_descriptionobstacle_enum"`, undefined);
        await queryRunner.query(`DROP TABLE modos."users"`, undefined);
        await queryRunner.query(`DROP TABLE modos."profiles"`, undefined);
        await queryRunner.query(`DROP TYPE "profiles_mobility_enum"`, undefined);
        await queryRunner.query(`DROP TYPE "profiles_helperfrequency_enum"`, undefined);
        await queryRunner.query(`DROP TYPE "profiles_helper_enum"`, undefined);
        await queryRunner.query(`DROP TYPE "profiles_gender_enum"`, undefined);
    }

}
