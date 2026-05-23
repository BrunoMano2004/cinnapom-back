import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { WatchListRepository } from './watch-list.repository';
import { WatchList } from './watch-list.entity';
import { UserRepository } from '../user/user.repository';
import { CreateWatchListDto } from './dto/watch-list-create.dto';
import { User } from '../user/user.entity';
import { ListAllWatchListDto } from './dto/watch-list-list-all.dto';
import { FindOneWatchListDto } from './dto/watch-list-find-one.dto';
import { TmdbApiRepository } from '../movie/tmdb-api.repository';
import { WatchListMovie } from '../watch-list-movie/watch-list-movie.entity';
import { MovieDetailDto } from '../movie/dto/describe-movie.dto';

@Injectable()
export class WatchListService {
  constructor(
    private readonly watchListRepository: WatchListRepository,
    private readonly userRepository: UserRepository,
    private readonly tmdbApiRepository: TmdbApiRepository,
  ) {}

  private async getUserBd(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      return user;
    }
  }

  async create(watchListDto: CreateWatchListDto, email: string): Promise<void> {
    const watchList = await this.watchListRepository.findWatchListByName(
      watchListDto.name,
    );

    if (watchList) {
      throw new ConflictException('WatchList with this name already exists');
    }

    const user = await this.getUserBd(email);
    await this.watchListRepository.createWatchList(
      watchListDto.name,
      user,
      watchListDto?.imageCoverUrl,
    );
  }

  async listAll(email: string): Promise<ListAllWatchListDto[]> {
    const user = await this.getUserBd(email);

    const watchLists = await this.watchListRepository.listAllWatchLists(user);

    if (watchLists.length === 0) {
      return [];
    } else {
      return watchLists.map((watchList) => new ListAllWatchListDto(watchList));
    }
  }

  async getById(
    watchListId: string,
    email: string,
  ): Promise<FindOneWatchListDto> {
    const user = await this.getUserBd(email);

    const watchList = await this.watchListRepository.findWatchListById(
      watchListId,
      user,
    );

    if (!watchList) {
      throw new NotFoundException('Watch list not found');
    } else {
      const wlm = watchList.watchListMovies;
      const movies = await Promise.all(
        wlm.map(async (wlm: WatchListMovie): Promise<MovieDetailDto> => {
          return await this.tmdbApiRepository.getMovieById(wlm.tmdbMovieId);
        }),
      );

      return new FindOneWatchListDto(watchList, movies);
    }
  }
}
