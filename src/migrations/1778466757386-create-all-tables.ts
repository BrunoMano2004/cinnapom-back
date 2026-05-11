import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAllTables1778466757386 implements MigrationInterface {
    name = 'CreateAllTables1778466757386'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "watch_list" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_5e5c475f53fd3293273aac82956" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rating" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "score" integer NOT NULL, "comment" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "movieId" uuid, CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tmdb_id" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "watch_list_movie" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "movieId" uuid, "watchListId" uuid, CONSTRAINT "PK_d3954363f6e102b3221a604e73b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "watch_list" ADD CONSTRAINT "FK_e5c3bb5fde76c0bbb8f42340a3a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_1a3badf27affbca3a224f01f7de" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "watch_list_movie" ADD CONSTRAINT "FK_db452c8fa97c732d991b9b778d2" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "watch_list_movie" ADD CONSTRAINT "FK_78276e19267f27e1b632dc36a5a" FOREIGN KEY ("watchListId") REFERENCES "watch_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "watch_list_movie" DROP CONSTRAINT "FK_78276e19267f27e1b632dc36a5a"`);
        await queryRunner.query(`ALTER TABLE "watch_list_movie" DROP CONSTRAINT "FK_db452c8fa97c732d991b9b778d2"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_1a3badf27affbca3a224f01f7de"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62"`);
        await queryRunner.query(`ALTER TABLE "watch_list" DROP CONSTRAINT "FK_e5c3bb5fde76c0bbb8f42340a3a"`);
        await queryRunner.query(`DROP TABLE "watch_list_movie"`);
        await queryRunner.query(`DROP TABLE "movie"`);
        await queryRunner.query(`DROP TABLE "rating"`);
        await queryRunner.query(`DROP TABLE "watch_list"`);
    }

}
