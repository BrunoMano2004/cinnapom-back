import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFieldUpdatedAtAndNullableNickname1778458908409 implements MigrationInterface {
    name = 'CreateFieldUpdatedAtAndNullableNickname1778458908409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "nickname" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "nickname" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
    }

}
