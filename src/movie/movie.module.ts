import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TmdbApiRepository } from './tmdb-api.repository';

@Module({
  providers: [MovieService, TmdbApiRepository],
  controllers: [MovieController],
  exports: [TmdbApiRepository],
})
export class MovieModule {}
