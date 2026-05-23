import { MovieDetailDto } from '../../movie/dto/describe-movie.dto';
import { WatchList } from '../watch-list.entity';

export class FindOneWatchListDto {
  constructor(watchListDb: WatchList, movies?: MovieDetailDto[]) {
    this.id = watchListDb.id;
    this.name = watchListDb.name;
    this.imageCoverUrl = watchListDb.imageCoverUrl;
    this.createdAt = watchListDb.createdAt;
    this.movies = movies;
  }

  id: string;

  name: string;

  imageCoverUrl?: string;

  createdAt: Date;

  movies?: MovieDetailDto[];
}
