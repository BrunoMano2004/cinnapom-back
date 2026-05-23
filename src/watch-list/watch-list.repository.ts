import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { WatchList } from './watch-list.entity';
import { User } from '../user/user.entity';

@Injectable()
export class WatchListRepository extends Repository<WatchList> {
  constructor(dataSource: DataSource) {
    super(WatchList, dataSource.createEntityManager());
  }

  async createWatchList(
    name: string,
    user: User,
    imageCoverUrl?: string,
  ): Promise<void> {
    const wacthList = this.create({ name, user, imageCoverUrl });
    await this.save(wacthList);
  }

  async deleteWatchList(id: string, user: User): Promise<void> {
    await this.delete({ id, user });
  }

  async updateWatchListName(
    name: string,
    id: string,
    user: User,
  ): Promise<void> {
    await this.update({ id, user }, { name });
  }

  async listAllWatchLists(user: User): Promise<WatchList[]> {
    return await this.find({ where: { user } });
  }

  async findWatchListById(id: string, user: User): Promise<WatchList | null> {
    return await this.findOne({ where: { id, user } });
  }

  async findWatchListByName(name: string): Promise<WatchList | null> {
    return await this.findOne({ where: { name } });
  }
}
