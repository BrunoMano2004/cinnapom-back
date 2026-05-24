import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableWatchListMembers1779655104098 implements MigrationInterface {
    name = 'CreateTableWatchListMembers1779655104098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "watch_list_member" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "watch_list_id" uuid, "user_id" uuid, CONSTRAINT "PK_5bc4d355ea8b42b4b2f2968ec3f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "watch_list_member" ADD CONSTRAINT "FK_9c0cbe2459fab4bfd6a9d1c0c23" FOREIGN KEY ("watch_list_id") REFERENCES "watch_list"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "watch_list_member" ADD CONSTRAINT "FK_3c4ecf426d386f2cb620969ad2c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "watch_list_member" DROP CONSTRAINT "FK_3c4ecf426d386f2cb620969ad2c"`);
        await queryRunner.query(`ALTER TABLE "watch_list_member" DROP CONSTRAINT "FK_9c0cbe2459fab4bfd6a9d1c0c23"`);
        await queryRunner.query(`DROP TABLE "watch_list_member"`);
    }

}
