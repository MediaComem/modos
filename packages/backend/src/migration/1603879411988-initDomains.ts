import { MigrationInterface, QueryRunner } from "typeorm";
import { promises as fs } from "fs";

export class initDomains1603879411988 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE DOMAIN modos.uint2 AS SMALLINT CHECK(VALUE >= 0 AND VALUE < 65535);`, undefined);
        await queryRunner.query(`CREATE DOMAIN modos.angle AS FLOAT CHECK(VALUE >= 0 AND VALUE < 360);`, undefined);
        await queryRunner.query(`CREATE DOMAIN modos.cam_make AS TEXT CHECK(VALUE IN ('apple','canon','dji','casio','fujifilm','garmin','google','gopro','hasselblad','hewlett-packard','htc','huawei','jvc','kodak','konica','leica','lg','logitech','microsoft','minolta','motorola','nikon','nintendo','nokia','olympus','panasonic','parrot','pentax','polaroid','ricoh','rollei','samsung','sanyo','seiko-epson','sigma','sony','sony-ericsson','toshiba','vodafone','xiaomi','other'));`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        throw new Error("This migration cannot be reversed.");
    }

}
