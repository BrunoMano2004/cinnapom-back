import { Module } from '@nestjs/common';
import { WatchListMovieController } from './watch-list-movie.controller';
import { WatchListMovieService } from './watch-list-movie.service';

@Module({
  controllers: [WatchListMovieController],
  providers: [WatchListMovieService]
})
export class WatchListMovieModule {}
