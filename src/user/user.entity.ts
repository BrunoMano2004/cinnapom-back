import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WatchList } from '../watch-list/watch-list.entity';
import { Rating } from '../rating/rating.entity';
import { WatchListMember } from '../watch-list-member/watch-list-member.entity';
import { Friendship } from '../friendship/friendship.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: false })
  avatar!: string;

  @Column({ type: 'varchar' })
  name!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => WatchList, (watchList) => watchList.user)
  watchLists!: WatchList[];

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings!: Rating[];

  @OneToMany(() => WatchListMember, (member) => member.user)
  watchListMembers!: WatchListMember[];

  @OneToMany(() => Friendship, (friendship) => friendship.requester)
  friendshipRequestsSent!: Friendship[];

  @OneToMany(() => Friendship, (friendship) => friendship.addressee)
  friendshipRequestsReceived!: Friendship[];
}
