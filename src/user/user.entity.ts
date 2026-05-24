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

@Entity('user')
export class User {
  constructor(email: string, name: string, nickname?: string) {
    this.email = email;
    this.name = name;
    this.nickname = nickname ?? null;
  }

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: false })
  name!: string;

  @Column({ type: 'varchar', nullable: true })
  nickname!: string | null;

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
}
