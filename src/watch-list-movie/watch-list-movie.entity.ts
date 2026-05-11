import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Movie } from '../movie/movie.entity';
import { WatchList } from '../watch-list/watch-list.entity';

@Entity('watch_list_movie')
export class WatchListMovie {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Movie, (movie) => movie.watchListMovies)
  movie!: Movie;

  @ManyToOne(() => WatchList, (watchList) => watchList.watchListMovies)
  watchList!: WatchList;
}
