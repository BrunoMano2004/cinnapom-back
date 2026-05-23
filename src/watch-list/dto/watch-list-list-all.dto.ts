import { WatchList } from '../watch-list.entity';

export class ListAllWatchListDto {
  constructor(watchListDb: WatchList) {
    this.id = watchListDb.id;
    this.name = watchListDb.name;
    this.imageCoverUrl = watchListDb.imageCoverUrl;
    this.createdAt = watchListDb.createdAt;
  }

  id: string;

  name: string;

  imageCoverUrl?: string;

  createdAt: Date;
}
