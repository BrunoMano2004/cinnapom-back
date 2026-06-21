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
import { WatchListMemberRepository } from '../watch-list-member/watch-list-member.repository';

@Injectable()
export class WatchListMovieService {
  constructor(
    private readonly watchListMovieRepository: WatchListMovieRepository,
    private readonly userRepository: UserRepository,
    private readonly watchListRepository: WatchListRepository,
    private readonly watchListMemberRepository: WatchListMemberRepository,
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

    const isOwner = await this.watchListRepository.findWatchListById(
      dto.watchListId,
      user,
    );

    const isMember = isOwner
      ? null
      : await this.watchListMemberRepository.findMember(
          dto.watchListId,
          user.id,
        );

    if (!isOwner && !isMember) {
      throw new NotFoundException('Watch List was not found');
    }

    const existing =
      await this.watchListMovieRepository.getWatchMovieListByMovieIdAndWatchListId(
        dto.tmdbMovieId,
        dto.watchListId,
      );
    if (existing)
      throw new ConflictException('A movie already exists in this watch list');

    await this.watchListMovieRepository.addWatchListMovie(dto);
  }

  async removeMovieFromWatchList(
    watchListId: string,
    tmdbMovieId: number,
    email: string,
  ): Promise<void> {
    const user = await this.getUserBd(email);

    if (await this.verifyIfWatchListExistsForUser(watchListId, user)) {
      await this.watchListMovieRepository.deleteWatchListMovie(
        watchListId,
        tmdbMovieId,
      );
    } else {
      throw new NotFoundException('Watch List was not found');
    }
  }
}
