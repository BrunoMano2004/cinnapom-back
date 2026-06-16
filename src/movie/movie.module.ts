import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TmdbApiRepository } from './tmdb-api.repository';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      ttl: 600000,
      isGlobal: true,
    }),
  ],
  providers: [MovieService, TmdbApiRepository],
  controllers: [MovieController],
  exports: [TmdbApiRepository],
})
export class MovieModule {}
