import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { WatchListMovie } from '../watch-list-movie/watch-list-movie.entity';
import { WatchListMember } from '../watch-list-member/watch-list-member.entity';

@Entity('watch_list')
export class WatchList {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: true })
  imageCoverUrl?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.watchLists)
  user!: User;

  @OneToMany(() => WatchListMovie, (watchListMovie) => watchListMovie.watchList)
  watchListMovies!: WatchListMovie[];

  @OneToMany(() => WatchListMember, (member) => member.watchList)
  watchListMembers!: WatchListMember[];
}
