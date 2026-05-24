import { forwardRef, Module } from '@nestjs/common';
import { WatchListMovieController } from './watch-list-movie.controller';
import { WatchListMovieService } from './watch-list-movie.service';
import { WatchListMovieRepository } from './watch-list-movie.repository';
import { UserRepository } from '../user/user.repository';
import { WatchListRepository } from '../watch-list/watch-list.repository';
import { UserModule } from '../user/user.module';
import { WatchListModule } from '../watch-list/watch-list.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WatchListMovie } from './watch-list-movie.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([WatchListMovie]),
    forwardRef(() => WatchListModule),
  ],
  controllers: [WatchListMovieController],
  providers: [
    WatchListMovieService,
    WatchListMovieRepository,
    UserRepository,
    WatchListRepository,
  ],
  exports: [WatchListMovieRepository],
})
export class WatchListMovieModule {}
