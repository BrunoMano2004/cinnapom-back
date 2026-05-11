import { Module } from '@nestjs/common';
import { WatchListService } from './watch-list.service';
import { WatchListController } from './watch-list.controller';

@Module({
  providers: [WatchListService],
  controllers: [WatchListController]
})
export class WatchListModule {}
