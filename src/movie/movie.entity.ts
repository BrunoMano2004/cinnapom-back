import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Rating } from '../rating/rating.entity';
import { WatchListMovie } from '../watch-list-movie/watch-list-movie.entity';

@Entity('movie')
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false })
  tmdb_id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Rating, (rating) => rating.movie)
  ratings!: Rating[];

  @OneToMany(() => WatchListMovie, (watchListMovie) => watchListMovie.movie)
  watchListMovies!: WatchListMovie[];
}
