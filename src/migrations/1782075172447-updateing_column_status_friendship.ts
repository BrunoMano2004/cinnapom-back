import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateingColumnStatusFriendship1782075172447 implements MigrationInterface {
  name = 'UpdateingColumnStatusFriendship1782075172447'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "friendship" ALTER COLUMN "status" DROP DEFAULT`);
    await queryRunner.query(`ALTER TYPE "public"."friendship_status_enum" RENAME TO "friendship_status_enum_old"`);
    await queryRunner.query(`CREATE TYPE "public"."friendship_status_enum" AS ENUM('PENDING', 'ACCEPTED', 'BLOCKED')`);
    await queryRunner.query(`
      ALTER TABLE "friendship" 
      ALTER COLUMN "status" TYPE "public"."friendship_status_enum" 
      USING CASE status::text
        WHEN '0' THEN 'PENDING'
        WHEN '1' THEN 'ACCEPTED'
        WHEN '2' THEN 'BLOCKED'
        ELSE status::text
      END::"public"."friendship_status_enum"
    `);
    await queryRunner.query(`ALTER TABLE "friendship" ALTER COLUMN "status" SET DEFAULT 'PENDING'`);
    await queryRunner.query(`DROP TYPE "public"."friendship_status_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "friendship" ALTER COLUMN "status" DROP DEFAULT`);
    await queryRunner.query(`ALTER TYPE "public"."friendship_status_enum" RENAME TO "friendship_status_enum_old"`);
    await queryRunner.query(`CREATE TYPE "public"."friendship_status_enum" AS ENUM('0', '1', '2')`);
    await queryRunner.query(`
      ALTER TABLE "friendship"
      ALTER COLUMN "status" TYPE "public"."friendship_status_enum"
      USING CASE status::text
        WHEN 'PENDING' THEN '0'
        WHEN 'ACCEPTED' THEN '1'
        WHEN 'BLOCKED' THEN '2'
      END::"public"."friendship_status_enum"
    `);
    await queryRunner.query(`DROP TYPE "public"."friendship_status_enum_old"`);
    await queryRunner.query(`ALTER TYPE "public"."friendship_status_enum" RENAME TO "friendship_status_enum"`);
  }
}