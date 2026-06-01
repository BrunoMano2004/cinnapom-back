import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFriendshipTable1780350776565 implements MigrationInterface {
    name = 'CreateFriendshipTable1780350776565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."friendship_status_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TABLE "friendship" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."friendship_status_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "requester_id" uuid, "addressee_id" uuid, CONSTRAINT "UQ_000e49362326e346848d818ff92" UNIQUE ("requester_id", "addressee_id"), CONSTRAINT "PK_dbd6fb568cd912c5140307075cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "friendship" ADD CONSTRAINT "FK_dbc5539de9195a9bed909357ffb" FOREIGN KEY ("requester_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friendship" ADD CONSTRAINT "FK_6964fb6d7c2d7fae5b79c7e0ed0" FOREIGN KEY ("addressee_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friendship" DROP CONSTRAINT "FK_6964fb6d7c2d7fae5b79c7e0ed0"`);
        await queryRunner.query(`ALTER TABLE "friendship" DROP CONSTRAINT "FK_dbc5539de9195a9bed909357ffb"`);
        await queryRunner.query(`DROP TABLE "friendship"`);
        await queryRunner.query(`DROP TYPE "public"."friendship_status_enum"`);
    }

}
