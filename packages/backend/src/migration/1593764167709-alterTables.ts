import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTables1593764167709 implements MigrationInterface {
    name = 'alterTables1593764167709'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE "modos"."profile" RENAME COLUMN "helperFrequency" to "helper_frequency";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."user" RENAME COLUMN "passwordHash" to "password_hash";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."user" RENAME COLUMN "profileId" to "profile_id";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."user" DROP CONSTRAINT IF EXISTS "REL_9466682df91534dd95e4dbaa61";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."user" ADD CONSTRAINT " user_profileid_unique" UNIQUE ("profile_id"),`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" RENAME COLUMN "ownerId" to "owner_id";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" RENAME COLUMN "eventId" to "event_id";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" RENAME COLUMN "descriptionObstacle" to "description_obstacle";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" RENAME COLUMN "descriptionFreetext" to "description_freetext";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" RENAME COLUMN "descriptionImpact" to "description_impact";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" RENAME COLUMN "imageBasename" to "image_basename";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" RENAME COLUMN "imageWidth" to "image_width";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" RENAME COLUMN "imageHeight" to "image_height";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" RENAME COLUMN "locationLatitude" to "location_latitude";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" RENAME COLUMN "locationLongitude" to "location_longitude";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" RENAME COLUMN "locationAltitude" to "location_altitude";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."event" RENAME COLUMN "numberOfImages" to "number_of_images";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."event" RENAME COLUMN "ownerId" to "owner_id";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."user_events_event" RENAME COLUMN "userId" to "user_id";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."user_events_event" RENAME COLUMN "eventId" to "event_id";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."user_events_event" DROP CONSTRAINT IF EXISTS "PK_11948eb9a443f34df93cac35feb";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."user_events_event" ADD CONSTRAINT "user_events_unique" PRIMARY KEY ("user_id", "event_id");`, undefined);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_507e9d8e231d089b5c4d44cce0";`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_507e9d8e231d089b5c4d44cce0" ON "modos"."user_events_event" ("user_id");`, undefined);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_c885fff747e43934134ceb67d3";`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_c885fff747e43934134ceb67d3" ON "modos"."user_events_event" ("event_id");`, undefined);

        await queryRunner.query(`ALTER TABLE "modos"."user" DROP CONSTRAINT IF EXISTS "FK_9466682df91534dd95e4dbaa616";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."user" ADD CONSTRAINT "FK_profileid" FOREIGN KEY ("profile_id") REFERENCES "modos"."profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;`, undefined);

        await queryRunner.query(`ALTER TABLE "modos"."observation" DROP CONSTRAINT IF EXISTS "FK_9b97a333802a2b7b3c9dc6786a2";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" ADD CONSTRAINT "FK_ownerid" FOREIGN KEY ("owner_id") REFERENCES "modos"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;`, undefined);

        await queryRunner.query(`ALTER TABLE "modos"."observation" DROP CONSTRAINT IF EXISTS "FK_3b103dc1bb4c103c5e0df5d5069";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" ADD CONSTRAINT "FK_eventid" FOREIGN KEY ("event_id") REFERENCES "modos"."event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;`, undefined);

        await queryRunner.query(`ALTER TABLE "modos"."event" DROP CONSTRAINT IF EXISTS "FK_e4abcb418e46db776e920a05a16";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."event" ADD CONSTRAINT "FK_ownerid" FOREIGN KEY ("owner_id") REFERENCES "modos"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;`, undefined);

        await queryRunner.query(`ALTER TABLE "modos"."user_events_event" DROP CONSTRAINT IF EXISTS "FK_507e9d8e231d089b5c4d44cce00";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."user_events_event" ADD CONSTRAINT "FK_userid" FOREIGN KEY ("user_id") REFERENCES "modos"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;`, undefined);

        await queryRunner.query(`ALTER TABLE "modos"."user_events_event" DROP CONSTRAINT IF EXISTS "FK_c885fff747e43934134ceb67d33";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."user_events_event" ADD CONSTRAINT "FK_userid" FOREIGN KEY ("event_id") REFERENCES "modos"."event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;`, undefined);


        await queryRunner.query(`ALTER TABLE "modos"."observation" ALTER COLUMN "id" DROP DEFAULT;`, undefined);
        await queryRunner.query(`DROP SEQUENCE "modos"."observation_id_seq";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY;`, undefined);

        await queryRunner.query(`ALTER TABLE "modos"."observation" ADD COLUMN "position" geometry(Point, 4326);`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" ADD COLUMN "in_range" BOOLEAN NOT NULL DEFAULT FALSE;`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" ADD COLUMN "edist" REAL;`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" ADD COLUMN "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW();`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" ADD COLUMN "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW();`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."observation" ADD COLUMN "snap_geom" geometry(Point, 4326)`, undefined);

        await queryRunner.query(`ALTER TABLE "modos"."event" ALTER COLUMN "id" DROP DEFAULT;`, undefined);
        await queryRunner.query(`DROP SEQUENCE "modos"."event_id_seq";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."event" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY;`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."event" ADD COLUMN "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW();`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."event" ADD COLUMN "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW();`, undefined);

        await queryRunner.query(`ALTER TABLE "modos"."profile" ALTER COLUMN "id" DROP DEFAULT;`, undefined);
        await queryRunner.query(`DROP SEQUENCE "modos"."profile_id_seq";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."profile" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY;`, undefined);

        await queryRunner.query(`ALTER TABLE "modos"."user" ALTER COLUMN "id" DROP DEFAULT;`, undefined);
        await queryRunner.query(`DROP SEQUENCE "modos"."user_id_seq";`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."user" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY;`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."user" ADD COLUMN "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW();`, undefined);
        await queryRunner.query(`ALTER TABLE "modos"."user" ADD COLUMN "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW();`, undefined);

        await queryRunner.query(`ALTER TABLE "modos"."user_events_event" ADD COLUMN "id" INTEGER GENERATED ALWAYS AS IDENTITY;`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        throw new Error("This migration cannot be reversed.");
    }

}
