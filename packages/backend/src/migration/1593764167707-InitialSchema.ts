import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1593764167707 implements MigrationInterface {
    name = 'InitialSchema1593764167707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "profiles_gender_enum" AS ENUM('m', 'f', '')`, undefined);
        await queryRunner.query(`CREATE TYPE "profiles_helper_enum" AS ENUM('white cane', 'walker', 'wheelchair')`, undefined);
        await queryRunner.query(`CREATE TYPE "profiles_helperfrequency_enum" AS ENUM('rarely', 'sometimes', 'always')`, undefined);
        await queryRunner.query(`CREATE TYPE "profiles_mobility_enum" AS ENUM('perfect', 'good', 'reduced', 'minimal')`, undefined);
        await queryRunner.query(`CREATE TABLE "profiles" ("id" SERIAL NOT NULL, "age" integer NOT NULL, "gender" "profiles_gender_enum" NOT NULL DEFAULT '', "helper" "profiles_helper_enum", "helperFrequency" "profiles_helperfrequency_enum", "mobility" "profiles_mobility_enum" NOT NULL, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "pseudonym" character varying NOT NULL, "age" INT, "user_privileges" CHARACTER VARYING(256) NOT NULL DEFAULT 'limited', "email" CITEXT NOT NULL, "lang_iso_639_3" CHARACTER VARYING(3) DEFAULT 'FRA', "passwordHash" character varying NOT NULL, "profileId" integer, CONSTRAINT "UQ_47d5df0fc19d289038e023774ee" UNIQUE ("pseudonym"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_9466682df91534dd95e4dbaa61" UNIQUE ("profileId"), CONSTRAINT "lang_iso_639_3_check" CHECK (lang_iso_639_3='FRA' OR lang_iso_639_3='DEU' OR lang_iso_639_3='ITA' OR lang_iso_639_3='ROH' OR lang_iso_639_3='ENG' OR lang_iso_639_3='SPA' OR lang_iso_639_3='POR'), CONSTRAINT "user_age" CHECK (age <=140 AND age>0), CONSTRAINT "check_user_privileges" CHECK (user_privileges='restricted' OR user_privileges='limited' OR user_privileges='owner' OR user_privileges='labeller' OR user_privileges='validator' OR user_privileges='admin' OR user_privileges='all'), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TYPE "observations_descriptionobstacle_enum" AS ENUM('coating', 'obstacle', 'security', 'passability', 'slope', 'width', 'other', 'noproblem', 'unlabelled')`, undefined);
        await queryRunner.query(`CREATE TABLE "observations" ("id" SERIAL NOT NULL, "ownerId" integer, "eventId" integer, "descriptionObstacle" "observations_descriptionobstacle_enum" NOT NULL DEFAULT 'unlabelled', "descriptionFreetext" character varying, "descriptionImpact" integer NOT NULL, "imageBasename" character varying NOT NULL, "imageWidth" integer, "imageHeight" integer, "locationLatitude" real, "locationLongitude" real, "locationAltitude" real, CONSTRAINT "PK_77a736edc631a400b788ce302cb" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "events" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "password" character varying, "beginning" TIMESTAMP NOT NULL, "ending" TIMESTAMP NOT NULL, "objective" character varying NOT NULL, "numberOfImages" integer NOT NULL, "ownerId" integer, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "users_events_event" ("userId" integer NOT NULL, "eventId" integer NOT NULL, CONSTRAINT "PK_11948eb9a443f34df93cac35feb" PRIMARY KEY ("userId", "eventId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_507e9d8e231d089b5c4d44cce0" ON "users_events_event" ("userId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_c885fff747e43934134ceb67d3" ON "users_events_event" ("eventId") `, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "observations" ADD CONSTRAINT "FK_9b97a333802a2b7b3c9dc6786a2" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "observations" ADD CONSTRAINT "FK_3b103dc1bb4c103c5e0df5d5069" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_e4abcb418e46db776e920a05a16" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "users_events_event" ADD CONSTRAINT "FK_507e9d8e231d089b5c4d44cce00" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "users_events_event" ADD CONSTRAINT "FK_c885fff747e43934134ceb67d33" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_events_event" DROP CONSTRAINT "FK_c885fff747e43934134ceb67d33"`, undefined);
        await queryRunner.query(`ALTER TABLE "users_events_event" DROP CONSTRAINT "FK_507e9d8e231d089b5c4d44cce00"`, undefined);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_e4abcb418e46db776e920a05a16"`, undefined);
        await queryRunner.query(`ALTER TABLE "observations" DROP CONSTRAINT "FK_3b103dc1bb4c103c5e0df5d5069"`, undefined);
        await queryRunner.query(`ALTER TABLE "observations" DROP CONSTRAINT "FK_9b97a333802a2b7b3c9dc6786a2"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_9466682df91534dd95e4dbaa616"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_c885fff747e43934134ceb67d3"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_507e9d8e231d089b5c4d44cce0"`, undefined);
        await queryRunner.query(`DROP TABLE "users_events_event"`, undefined);
        await queryRunner.query(`DROP TABLE "events"`, undefined);
        await queryRunner.query(`DROP TABLE "observations"`, undefined);
        await queryRunner.query(`DROP TYPE "observations_descriptionobstacle_enum"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
        await queryRunner.query(`DROP TABLE "profiles"`, undefined);
        await queryRunner.query(`DROP TYPE "profiles_mobility_enum"`, undefined);
        await queryRunner.query(`DROP TYPE "profiles_helperfrequency_enum"`, undefined);
        await queryRunner.query(`DROP TYPE "profiles_helper_enum"`, undefined);
        await queryRunner.query(`DROP TYPE "profiles_gender_enum"`, undefined);
    }

}
