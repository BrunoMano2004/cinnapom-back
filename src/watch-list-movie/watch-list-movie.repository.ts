import { DataSource, Repository } from 'typeorm';
import { WatchListMovie } from './watch-list-movie.entity';
import { AddWatchListMovieDto } from './dto/watch-list-movie-add.dto';
import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';

@Injectable()
export class WatchListMovieRepository extends Repository<WatchListMovie> {
  constructor(dataSource: DataSource) {
    super(WatchListMovie, dataSource.createEntityManager());
  }

  async addWatchListMovie(dto: AddWatchListMovieDto): Promise<void> {
    const watchListMovie = this.create({
      tmdbMovieId: dto.tmdbMovieId,
      watchList: { id: dto.watchListId },
    });

    await this.save(watchListMovie);
  }

  async deleteWatchListMovie(
    watchListMovieId: string,
    tmdbMovieId: number,
  ): Promise<void> {
    await this.delete({
      id: watchListMovieId,
      tmdbMovieId,
    });
  }

  async getWatchListMovieById(wlmId: string): Promise<WatchListMovie | null> {
    return await this.findOne({ where: { id: wlmId } });
  }

  async getWatchMovieListByMovieIdAndUser(
    tmdbMovieId: number,
    user: User,
  ): Promise<WatchListMovie | null> {
    return await this.findOne({
      where: { tmdbMovieId, watchList: { user: { id: user.id } } },
    });
  }

  async getWatchListMoviesByWatchListId(
    watchListId: string,
  ): Promise<WatchListMovie[]> {
    return await this.find({ where: { watchList: { id: watchListId } } });
  }
}
