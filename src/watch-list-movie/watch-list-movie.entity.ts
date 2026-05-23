import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WatchList } from '../watch-list/watch-list.entity';

@Entity('watch_list_movie')
export class WatchListMovie {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  tmdbMovieId!: number;

  @ManyToOne(() => WatchList, (watchList) => watchList.watchListMovies)
  watchList!: WatchList;
}
