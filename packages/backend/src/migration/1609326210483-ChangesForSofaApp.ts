import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangesForSofaApp1609326210483 implements MigrationInterface {
    name = 'ChangesForSofaApp1609326210483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "sofa_profile_helper_enum" AS ENUM('no helper', 'white cane', 'walker', 'wheelchair')`);
        await queryRunner.query(`CREATE TYPE "sofa_profile_agerange_enum" AS ENUM('- 25', '26 - 45', '46 - 65', '66 +')`);
        await queryRunner.query(`CREATE TABLE "sofa_profile" ("id" SERIAL NOT NULL, "helper" "sofa_profile_helper_enum", "ageRange" "sofa_profile_agerange_enum", CONSTRAINT "PK_fb66098e163c7caf2de3e3bdf15" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "observation_validation" ("id" SERIAL NOT NULL, "oldWeight" integer NOT NULL, "newWeight" integer NOT NULL, "weightOk" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL, "ownerId" integer, "observationId" integer, CONSTRAINT "PK_8396c573a0dc99eecc213c015d3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "observation_evaluation" ("id" SERIAL NOT NULL, "weightNoHelper" integer NOT NULL, "weightWhiteCane" integer NOT NULL, "weightWalker" integer NOT NULL, "weightWheelchair" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL, "ownerId" integer, "observationId" integer, CONSTRAINT "PK_1b245b776de10a9cad192943ebf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "observation_labelisation_obstacle_enum" AS ENUM('coating', 'obstacle', 'security', 'passability', 'slope', 'width', 'other', 'noproblem', 'unlabelled')`);
        await queryRunner.query(`CREATE TABLE "observation_labelisation" ("id" SERIAL NOT NULL, "obstacle" "observation_labelisation_obstacle_enum" NOT NULL DEFAULT 'unlabelled', "createdAt" TIMESTAMP NOT NULL, "ownerId" integer, "observationId" integer, CONSTRAINT "PK_d601e3e0f44c1396fb7537a4eef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "daily_challenge_type_enum" AS ENUM('labelisation', 'evaluation', 'validation')`);
        await queryRunner.query(`CREATE TABLE "daily_challenge" ("id" SERIAL NOT NULL, "points" integer NOT NULL, "type" "daily_challenge_type_enum" NOT NULL DEFAULT 'labelisation', "nbGoal" integer NOT NULL, "nbCrt" integer NOT NULL, "date" TIMESTAMP NOT NULL, "ownerId" integer, CONSTRAINT "PK_3c8785526c5d3e52a62b0b1fc62" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "sofaProfileId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_bbc170c454f1ad2b2dbaffd8fc0" UNIQUE ("sofaProfileId")`);
        await queryRunner.query(`ALTER TABLE "observation_validation" ADD CONSTRAINT "FK_744fc70e718e2fe5e813fda62da" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "observation_validation" ADD CONSTRAINT "FK_dad4cc6ce95c6a6ca3df8de92b3" FOREIGN KEY ("observationId") REFERENCES "observation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "observation_evaluation" ADD CONSTRAINT "FK_d47e76813d11fe39b10e5636c83" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "observation_evaluation" ADD CONSTRAINT "FK_24f54f1d13249fca77df5282e54" FOREIGN KEY ("observationId") REFERENCES "observation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "observation_labelisation" ADD CONSTRAINT "FK_4c1ad3c5fc1efb8df5ea45f60d6" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "observation_labelisation" ADD CONSTRAINT "FK_c458d8dff81a13c19ee9d7aedf8" FOREIGN KEY ("observationId") REFERENCES "observation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_bbc170c454f1ad2b2dbaffd8fc0" FOREIGN KEY ("sofaProfileId") REFERENCES "sofa_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "daily_challenge" ADD CONSTRAINT "FK_2ddd6ceb3fab1c6ad57b785102f" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "observation_labelisation" ADD "freeText" character varying`);
        await queryRunner.query(`CREATE TABLE "modos"."connection_log" ("id" SERIAL NOT NULL, "loggedAt" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "PK_2ff30173c9fcacadbf9ce3beac4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "modos"."connection_log" ADD CONSTRAINT "FK_d78cc8526375ec2aec7fb893278" FOREIGN KEY ("userId") REFERENCES "modos"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sofa_profile" ADD "disabledProfilesMask" integer NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE "sofa_profile" ADD "hidePassModal" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sofa_profile" DROP COLUMN "hidePassModal"`);
        await queryRunner.query(`ALTER TABLE "sofa_profile" DROP COLUMN "disabledProfilesMask"`);
        await queryRunner.query(`ALTER TABLE "modos"."connection_log" DROP CONSTRAINT "FK_d78cc8526375ec2aec7fb893278"`);
        await queryRunner.query(`DROP TABLE "modos"."connection_log"`);
        await queryRunner.query(`ALTER TABLE "observation_labelisation" DROP COLUMN "freeText"`);
        await queryRunner.query(`ALTER TABLE "daily_challenge" DROP CONSTRAINT "FK_2ddd6ceb3fab1c6ad57b785102f"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_bbc170c454f1ad2b2dbaffd8fc0"`);
        await queryRunner.query(`ALTER TABLE "observation_labelisation" DROP CONSTRAINT "FK_c458d8dff81a13c19ee9d7aedf8"`);
        await queryRunner.query(`ALTER TABLE "observation_labelisation" DROP CONSTRAINT "FK_4c1ad3c5fc1efb8df5ea45f60d6"`);
        await queryRunner.query(`ALTER TABLE "observation_evaluation" DROP CONSTRAINT "FK_24f54f1d13249fca77df5282e54"`);
        await queryRunner.query(`ALTER TABLE "observation_evaluation" DROP CONSTRAINT "FK_d47e76813d11fe39b10e5636c83"`);
        await queryRunner.query(`ALTER TABLE "observation_validation" DROP CONSTRAINT "FK_dad4cc6ce95c6a6ca3df8de92b3"`);
        await queryRunner.query(`ALTER TABLE "observation_validation" DROP CONSTRAINT "FK_744fc70e718e2fe5e813fda62da"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_bbc170c454f1ad2b2dbaffd8fc0"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "sofaProfileId"`);
        await queryRunner.query(`DROP TABLE "daily_challenge"`);
        await queryRunner.query(`DROP TYPE "daily_challenge_type_enum"`);
        await queryRunner.query(`DROP TABLE "observation_labelisation"`);
        await queryRunner.query(`DROP TYPE "observation_labelisation_obstacle_enum"`);
        await queryRunner.query(`DROP TABLE "observation_evaluation"`);
        await queryRunner.query(`DROP TABLE "observation_validation"`);
        await queryRunner.query(`DROP TABLE "sofa_profile"`);
        await queryRunner.query(`DROP TYPE "sofa_profile_agerange_enum"`);
        await queryRunner.query(`DROP TYPE "sofa_profile_helper_enum"`);
    }

}
