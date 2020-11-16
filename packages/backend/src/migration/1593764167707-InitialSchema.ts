import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1593764167707 implements MigrationInterface {
    name = 'InitialSchema1593764167707'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`CREATE TYPE "modos"."profile_gender_enum" AS ENUM ('m', 'f', '')`, undefined);
        await queryRunner.query(`CREATE TYPE "modos"."profile_helper_enum" AS ENUM ('white cane', 'walker', 'wheelchair')`, undefined);
        await queryRunner.query(`CREATE TYPE "modos"."profile_helperfrequency_enum" AS ENUM ('rarely', 'sometimes', 'always')`, undefined);
        await queryRunner.query(`CREATE TYPE "modos"."profile_mobility_enum" AS ENUM ('perfect', 'good', 'reduced', 'minimal')`, undefined);

        await queryRunner.query(`CREATE TABLE "modos"."profile" (
            "id" SERIAL NOT NULL,
            "age" integer NOT NULL,
            "gender" "modos"."profile_gender_enum" NOT NULL DEFAULT '',
            "helper" "modos"."profile_helper_enum",
            "helperFrequency" "modos"."profile_helperfrequency_enum",
            "mobility" "modos"."profile_mobility_enum" NOT NULL,
            CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id")
        )`, undefined);

        await queryRunner.query(`CREATE TABLE "modos"."user" (
            "id" SERIAL NOT NULL,
            "pseudonym" character varying NOT NULL,
            "email" character varying NOT NULL,
            "passwordHash" character varying NOT NULL,
            "profileId" integer,
            CONSTRAINT "UQ_47d5df0fc19d289038e023774ee" UNIQUE ("pseudonym"),
            CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
            CONSTRAINT "REL_9466682df91534dd95e4dbaa61" UNIQUE ("profileId"),
            CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
        )`, undefined);

        await queryRunner.query(`CREATE TYPE "modos"."observation_descriptionobstacle_enum" AS ENUM (
            'coating',
            'obstacle',
            'security',
            'passability',
            'slope',
            'width',
            'other',
            'noproblem',
            'unlabelled'
        )`, undefined);

        await queryRunner.query(`CREATE TABLE "modos"."observation" (
            "id" SERIAL NOT NULL,
            "ownerId" integer,
            "eventId" integer,
            "descriptionObstacle" "modos"."observation_descriptionobstacle_enum" NOT NULL DEFAULT 'unlabelled',
            "descriptionFreetext" character varying,
            "descriptionImpact" integer NOT NULL,
            "imageBasename" character varying NOT NULL,
            "imageWidth" integer,
            "imageHeight" integer,
            "locationLatitude" real,
            "locationLongitude" real,
            "locationAltitude" real,
            CONSTRAINT "PK_77a736edc631a400b788ce302cb" PRIMARY KEY ("id")
        )`, undefined);

        await queryRunner.query(`CREATE TABLE "modos"."event" (
            "id" SERIAL NOT NULL,
            "title" character varying NOT NULL,
            "password" character varying,
            "beginning" TIMESTAMP NOT NULL,
            "ending" TIMESTAMP NOT NULL,
            "objective" character varying NOT NULL,
            "numberOfImages" integer NOT NULL,
            "ownerId" integer,
            CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id")
        )`, undefined);

        await queryRunner.query(`CREATE TABLE "modos"."user_events_event" (
            "userId" integer NOT NULL,
            "eventId" integer NOT NULL,
            CONSTRAINT "PK_11948eb9a443f34df93cac35feb" PRIMARY KEY ("userId", "eventId")
        )`, undefined);

        await queryRunner.query(`CREATE INDEX "IDX_507e9d8e231d089b5c4d44cce0" ON "modos"."user_events_event" ("userId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_c885fff747e43934134ceb67d3" ON "modos"."user_events_event" ("eventId") `, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."user" ADD CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES "modos"."profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" ADD CONSTRAINT "FK_9b97a333802a2b7b3c9dc6786a2" FOREIGN KEY ("ownerId") REFERENCES "modos"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" ADD CONSTRAINT "FK_3b103dc1bb4c103c5e0df5d5069" FOREIGN KEY ("eventId") REFERENCES "modos"."event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."event" ADD CONSTRAINT "FK_e4abcb418e46db776e920a05a16" FOREIGN KEY ("ownerId") REFERENCES "modos"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."user_events_event" ADD CONSTRAINT "FK_507e9d8e231d089b5c4d44cce00" FOREIGN KEY ("userId") REFERENCES "modos"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."user_events_event" ADD CONSTRAINT "FK_c885fff747e43934134ceb67d33" FOREIGN KEY ("eventId") REFERENCES "modos"."event"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "modos"."user_events_event" DROP CONSTRAINT "FK_c885fff747e43934134ceb67d33"`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."user_events_event" DROP CONSTRAINT "FK_507e9d8e231d089b5c4d44cce00"`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."event" DROP CONSTRAINT "FK_e4abcb418e46db776e920a05a16"`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" DROP CONSTRAINT "FK_3b103dc1bb4c103c5e0df5d5069"`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" DROP CONSTRAINT "FK_9b97a333802a2b7b3c9dc6786a2"`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."user" DROP CONSTRAINT "FK_9466682df91534dd95e4dbaa616"`, undefined);
        await queryRunner.query(`DROP INDEX "modos"."IDX_c885fff747e43934134ceb67d3"`, undefined);
        await queryRunner.query(`DROP INDEX "modos"."IDX_507e9d8e231d089b5c4d44cce0"`, undefined);
        await queryRunner.query(`DROP TABLE "modos"."user_events_event"`, undefined);
        await queryRunner.query(`DROP TABLE "modos"."event"`, undefined);
        await queryRunner.query(`DROP TABLE "modos"."observation"`, undefined);
        await queryRunner.query(`DROP TYPE "modos"."observation_descriptionobstacle_enum"`, undefined);
        await queryRunner.query(`DROP TABLE "modos"."user"`, undefined);
        await queryRunner.query(`DROP TABLE "modos"."profile"`, undefined);
        await queryRunner.query(`DROP TYPE "modos"."profile_mobility_enum"`, undefined);
        await queryRunner.query(`DROP TYPE "modos"."profile_helperfrequency_enum"`, undefined);
        await queryRunner.query(`DROP TYPE "modos"."profile_helper_enum"`, undefined);
        await queryRunner.query(`DROP TYPE "modos"."profile_gender_enum"`, undefined);
    }

}
