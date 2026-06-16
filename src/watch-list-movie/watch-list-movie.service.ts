import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { WatchListMovieRepository } from './watch-list-movie.repository';
import { AddWatchListMovieDto } from './dto/watch-list-movie-add.dto';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { WatchListRepository } from '../watch-list/watch-list.repository';

@Injectable()
export class WatchListMovieService {
  constructor(
    private readonly watchListMovieRepository: WatchListMovieRepository,
    private readonly userRepository: UserRepository,
    private readonly watchListRepository: WatchListRepository,
  ) {}

  private async getUserBd(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      return user;
    }
  }

  private async verifyIfWatchListExistsForUser(
    watchListId: string,
    user: User,
  ): Promise<boolean> {
    const watchList = await this.watchListRepository.findWatchListById(
      watchListId,
      user,
    );

    if (watchList) {
      return true;
    } else {
      return false;
    }
  }

  async addMovieToWatchList(
    dto: AddWatchListMovieDto,
    email: string,
  ): Promise<void> {
    const user = await this.getUserBd(email);

    if (await this.verifyIfWatchListExistsForUser(dto.watchListId, user)) {
      const wl =
        await this.watchListMovieRepository.getWatchMovieListByMovieIdAndWatchListId(
          dto.tmdbMovieId,
          dto.watchListId,
        );

      if (wl) {
        throw new ConflictException(
          'A movie already exists in this watch list',
        );
      }

      await this.watchListMovieRepository.addWatchListMovie(dto);
    } else {
      throw new NotFoundException('Watch List was not found');
    }
  }

  async removeMovieFromWatchList(
    watchListMovieId: string,
    tmdbMovieId: number,
    email: string,
  ): Promise<void> {
    const user = await this.getUserBd(email);

    const wlm =
      await this.watchListMovieRepository.getWatchListMovieById(
        watchListMovieId,
      );

    if (!wlm) {
      throw new NotFoundException('Watch List Movie was not found');
    }

    if (await this.verifyIfWatchListExistsForUser(wlm?.watchList.id, user)) {
      await this.watchListMovieRepository.deleteWatchListMovie(
        watchListMovieId,
        tmdbMovieId,
      );
    } else {
      throw new NotFoundException('Watch List was not found');
    }
  }
}
