import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnTmdbMovieId1779589951246 implements MigrationInterface {
    name = 'AddColumnTmdbMovieId1779589951246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "watch_list_movie" ADD "tmdbMovieId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "watch_list_movie" DROP COLUMN "tmdbMovieId"`);
    }

}
