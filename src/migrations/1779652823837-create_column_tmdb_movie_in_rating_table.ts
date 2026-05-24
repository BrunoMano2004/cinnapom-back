import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateColumnTmdbMovieInRatingTable1779652823837 implements MigrationInterface {
    name = 'CreateColumnTmdbMovieInRatingTable1779652823837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rating" ADD "tmdbMovieId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "tmdbMovieId"`);
    }

}
