import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { WatchList } from '../watch-list/watch-list.entity';
import { User } from '../user/user.entity';

@Entity('watch_list_member')
export class WatchListMember {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => WatchList, (watchList) => watchList.watchListMembers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'watch_list_id' })
  watchList!: WatchList;

  @ManyToOne(() => User, (user) => user.watchListMembers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
