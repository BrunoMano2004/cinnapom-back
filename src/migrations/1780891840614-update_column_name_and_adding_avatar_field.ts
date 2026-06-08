import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColumnNameAndAddingAvatarField1780891840614 implements MigrationInterface {
    name = 'UpdateColumnNameAndAddingAvatarField1780891840614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "nickname" TO "avatar"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "avatar" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "avatar" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "avatar" TO "nickname"`);
    }

}
