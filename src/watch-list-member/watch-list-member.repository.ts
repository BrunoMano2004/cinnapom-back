import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { WatchListMember } from './watch-list-member.entity';
import { WatchList } from '../watch-list/watch-list.entity';
import { User } from '../user/user.entity';

@Injectable()
export class WatchListMemberRepository extends Repository<WatchListMember> {
  constructor(dataSource: DataSource) {
    super(WatchListMember, dataSource.createEntityManager());
  }

  async addMember(watchList: WatchList, user: User): Promise<void> {
    const member = this.create({ watchList, user });
    await this.save(member);
  }

  async removeMember(watchListId: string, userId: string): Promise<void> {
    await this.delete({
      watchList: { id: watchListId },
      user: { id: userId },
    });
  }

  async findByWatchList(watchListId: string): Promise<WatchListMember[]> {
    return await this.find({
      where: { watchList: { id: watchListId } },
      relations: ['user'],
    });
  }

  async findByUser(userId: string): Promise<WatchListMember[]> {
    return await this.find({
      where: { user: { id: userId } },
      relations: ['watchList'],
    });
  }

  async findMember(
    watchListId: string,
    userId: string,
  ): Promise<WatchListMember | null> {
    return await this.findOne({
      where: {
        watchList: { id: watchListId },
        user: { id: userId },
      },
    });
  }
}
