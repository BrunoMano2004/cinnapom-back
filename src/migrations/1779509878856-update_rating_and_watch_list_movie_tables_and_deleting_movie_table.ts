import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRatingAndWatchListMovieTablesAndDeletingMovieTable1779509878856 implements MigrationInterface {
    name = 'UpdateRatingAndWatchListMovieTablesAndDeletingMovieTable1779509878856'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_1a3badf27affbca3a224f01f7de"`);
        await queryRunner.query(`ALTER TABLE "watch_list_movie" DROP CONSTRAINT "FK_db452c8fa97c732d991b9b778d2"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "movieId"`);
        await queryRunner.query(`ALTER TABLE "watch_list_movie" DROP COLUMN "movieId"`);
        await queryRunner.query(`ALTER TABLE "watch_list" ADD "imageCoverUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "watch_list" DROP COLUMN "imageCoverUrl"`);
        await queryRunner.query(`ALTER TABLE "watch_list_movie" ADD "movieId" uuid`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "movieId" uuid`);
        await queryRunner.query(`ALTER TABLE "watch_list_movie" ADD CONSTRAINT "FK_db452c8fa97c732d991b9b778d2" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_1a3badf27affbca3a224f01f7de" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
