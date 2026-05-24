import { forwardRef, Module } from '@nestjs/common';
import { WatchListService } from './watch-list.service';
import { WatchListController } from './watch-list.controller';
import { UserRepository } from '../user/user.repository';
import { TmdbApiRepository } from '../movie/tmdb-api.repository';
import { UserModule } from '../user/user.module';
import { MovieModule } from '../movie/movie.module';
import { WatchListRepository } from './watch-list.repository';
import { WatchListMovieModule } from '../watch-list-movie/watch-list-movie.module';
import { WatchListMovieRepository } from '../watch-list-movie/watch-list-movie.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WatchList } from './watch-list.entity';
import { WatchListMemberRepository } from '../watch-list-member/watch-list-member.repository';

@Module({
  imports: [
    UserModule,
    MovieModule,
    TypeOrmModule.forFeature([WatchList]),
    forwardRef(() => WatchListMovieModule),
  ],
  providers: [
    WatchListService,
    UserRepository,
    TmdbApiRepository,
    WatchListRepository,
    WatchListMovieRepository,
    WatchListMemberRepository,
  ],
  controllers: [WatchListController],
  exports: [WatchListRepository],
})
export class WatchListModule {}
